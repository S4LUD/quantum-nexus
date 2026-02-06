import {
  BotDifficulty,
  EnergyType,
  GameState,
  Node,
  Player,
  Protocol,
} from "@/types";
import {
  applyEnergyCollection,
  applyEnergyDiscard,
  applyExchangeEnergy,
  applyNodePurchase,
  applyNodeReservation,
  applyProtocolClaim,
  applyDrawEffect,
  applySwapEffect,
  canAffordNode,
  canExchangeEnergy,
  calculateNodeCost,
  canClaimProtocol,
  generateNodePayment,
  checkWinConditions,
  getDrawOptions,
  mustDiscardEnergy,
} from "@/logic/gameEngine";
import {
  ENERGY_LIMIT,
  MAX_RESERVED_NODES,
  getWinNodesThreshold,
  WIN_TURN_THRESHOLD,
  WIN_EFFICIENCY_THRESHOLD,
  WIN_PROTOCOLS_THRESHOLD,
} from "@/logic/rules";
import { calculatePlayerOutputs, getTotalEnergy } from "@/logic/selectors";
import { logBotDecision } from "@/services/botLogger";

const BASE_ENERGY_TYPES: Exclude<EnergyType, "flux">[] = [
  "solar",
  "hydro",
  "plasma",
  "neural",
];

const BOT_EFFICIENCY_BUFFER = 2;
const BOT_DENY_THRESHOLD = 1;
const BOT_PROTOCOL_PRESSURE = 2;
const BOT_COST_WEIGHT = 0.6;
const BOT_EFFECT_WEIGHT = 1.2;
const BOT_OUTPUT_WEIGHT = 1.5;
const BOT_PROTOCOL_WEIGHT = 2.5;
const BOT_DEBUG_ENABLED = false;

type BotPlan = "efficiency" | "network" | "protocol";

interface BotPlanDecision {
  plan: BotPlan;
  reason: string;
}

interface BotDecision {
  nextState: GameState;
  notice: string;
  debug: string;
}

interface BotResult {
  nextState: GameState;
  winner: Player | null;
  notice: string;
}

export function selectBotMove(
  gameState: GameState,
  difficulty: BotDifficulty,
): BotResult {
  const currentPlayer = gameState.players[gameState.currentPlayerIndex];
  if (!currentPlayer.isBot) {
    return { nextState: gameState, winner: null, notice: "" };
  }

  const { nextState, notice, debug } = chooseBotAction(
    gameState,
    currentPlayer,
    difficulty,
  );
  if (BOT_DEBUG_ENABLED) {
    console.log(`[Bot] ${debug}`);
  }
  void logBotDecision({
    playerId: currentPlayer.id,
    playerName: currentPlayer.name,
    difficulty,
    turn: gameState.turnCount,
    message: debug,
  });
  const winner = checkWinConditions(nextState);
  if (winner) {
    return { nextState, winner, notice };
  }

  const advancedState = advanceTurn(nextState);
  return { nextState: advancedState, winner: null, notice };
}

function chooseBotAction(
  gameState: GameState,
  player: Player,
  difficulty: BotDifficulty,
): BotDecision {
  const protocols = getClaimableProtocols(gameState, player);
  const marketNodes = getMarketNodes(gameState);
  const reservedNodes = player.reservedNodes;
  const buildable = getAffordableNodes(marketNodes, player);
  const buildableReserved = getAffordableNodes(reservedNodes, player);
  const bestMarketTarget = pickBestValueNode(marketNodes, player);
  const planDecision = pickPlan(gameState, player, difficulty);
  const plan = planDecision.plan;
  const opponent = getPrimaryOpponent(gameState, player);
  const denyTypes = opponent
    ? getProtocolDenyTypes(gameState, opponent, BOT_DENY_THRESHOLD)
    : [];
  const debugLines = [
    `${player.name} [${difficulty}] plan=${plan} (${planDecision.reason})`,
  ];

  if (marketNodes.length > 0) {
    debugLines.push(`Market top: ${formatTopNodes(marketNodes, player, 3)}`);
  }
  if (buildable.length > 0) {
    debugLines.push(`Buildable top: ${formatTopNodes(buildable, player, 3)}`);
  }

  if (difficulty === "easy") {
    if (protocols.length > 0) {
      const target = protocols[0];
      return makeDecision(
        applyProtocolClaim(gameState, player, target),
        `${player.name} claimed a protocol.`,
        [...debugLines, `Chosen protocol: ${formatProtocol(target)}`].join(
          " | ",
        ),
      );
    }
    if (buildable.length > 0) {
      const target = buildable[0];
      return buildNodeWithEffects(
        gameState,
        player,
        target,
        `${player.name} built a node.`,
        [...debugLines, `Chosen node: ${formatNode(target)}`].join(" | "),
      );
    }
    if (buildableReserved.length > 0) {
      const target = buildableReserved[0];
      return buildNodeWithEffects(
        gameState,
        player,
        target,
        `${player.name} built a reserved node.`,
        [...debugLines, `Chosen reserved: ${formatNode(target)}`].join(" | "),
      );
    }
    const collectResult = collectEnergyTurn(
      gameState,
      player,
      difficulty,
      bestMarketTarget,
    );
    if (collectResult.nextState !== gameState) {
      return mergeDebug(collectResult, debugLines);
    }
    const reserveTarget =
      bestMarketTarget || getReserveTarget(gameState, player);
    if (reserveTarget) {
      return makeDecision(
        applyNodeReservation(gameState, player, reserveTarget, true),
        `${player.name} reserved a node.`,
        [...debugLines, `Reserved: ${formatNode(reserveTarget)}`].join(" | "),
      );
    }
    return mergeDebug(collectResult, debugLines);
  }

  if (difficulty === "medium") {
    if (buildable.length > 0 || buildableReserved.length > 0) {
      const target = pickBestBuildCandidate(
        buildable,
        buildableReserved,
        player,
        gameState,
        plan,
        denyTypes,
      );
      return buildNodeWithEffects(
        gameState,
        player,
        target,
        `${player.name} built a node.`,
        [...debugLines, `Chosen node: ${formatNode(target)}`].join(" | "),
      );
    }
    if (protocols.length > 0) {
      const target = protocols[0];
      return makeDecision(
        applyProtocolClaim(gameState, player, target),
        `${player.name} claimed a protocol.`,
        [...debugLines, `Chosen protocol: ${formatProtocol(target)}`].join(
          " | ",
        ),
      );
    }
    const exchangePlan = planExchange(gameState, player, bestMarketTarget);
    if (exchangePlan) {
      const nextState = applyExchangeEnergy(
        gameState,
        player,
        exchangePlan.takeType,
        exchangePlan.takeCount,
        exchangePlan.give,
      );
      return makeDecision(
        nextState,
        `${player.name} exchanged energy.`,
        [
          ...debugLines,
          `Exchange: take=${exchangePlan.takeType}x${exchangePlan.takeCount}`,
        ].join(" | "),
      );
    }

    const collectResult = collectEnergyTurn(
      gameState,
      player,
      difficulty,
      bestMarketTarget,
    );
    if (collectResult.nextState !== gameState) {
      return mergeDebug(collectResult, debugLines);
    }
    const reserveTarget =
      bestMarketTarget || getReserveTarget(gameState, player);
    if (reserveTarget) {
      return makeDecision(
        applyNodeReservation(gameState, player, reserveTarget, true),
        `${player.name} reserved a node.`,
        [...debugLines, `Reserved: ${formatNode(reserveTarget)}`].join(" | "),
      );
    }
    return mergeDebug(collectResult, debugLines);
  }

  const denyTarget = opponent
    ? getDenyNodeTarget(gameState, opponent, player, BOT_DENY_THRESHOLD)
    : null;
  const opponentRace = opponent
    ? isOpponentNearWin(gameState, opponent)
    : false;
  if (opponent) {
    debugLines.push(
      `Deny check: opp=${opponent.name} types=${denyTypes.join(",") || "none"} target=${denyTarget ? denyTarget.id : "none"}`,
    );
  }

  const closeToProtocolWin =
    player.protocols.length >= WIN_PROTOCOLS_THRESHOLD - 1 &&
    protocols.length > 0;
  const closeToNetworkWin =
    player.nodes.length >= getWinNodesThreshold(gameState.players.length) - 1;
  const efficiencyPush =
    gameState.turnCount >= WIN_TURN_THRESHOLD &&
    player.efficiency >= WIN_EFFICIENCY_THRESHOLD - BOT_EFFICIENCY_BUFFER;
  if (closeToProtocolWin && protocols.length > 0) {
    const target = pickBestProtocol(protocols);
    return makeDecision(
      applyProtocolClaim(gameState, player, target),
      `${player.name} claimed a protocol.`,
      [...debugLines, `Chosen protocol: ${formatProtocol(target)}`].join(" | "),
    );
  }
  if (opponentRace && denyTarget) {
    if (canAffordNode(denyTarget, player)) {
      return buildNodeWithEffects(
        gameState,
        player,
        denyTarget,
        `${player.name} built a node.`,
        [...debugLines, `Race deny build: ${formatNode(denyTarget)}`].join(
          " | ",
        ),
      );
    }
    if (canReserveNode(gameState, player, denyTarget)) {
      return makeDecision(
        applyNodeReservation(gameState, player, denyTarget, true),
        `${player.name} reserved a node.`,
        [...debugLines, `Race deny reserve: ${formatNode(denyTarget)}`].join(
          " | ",
        ),
      );
    }
  }

  if (denyTarget) {
    if (canAffordNode(denyTarget, player)) {
      return buildNodeWithEffects(
        gameState,
        player,
        denyTarget,
        `${player.name} built a node.`,
        [...debugLines, `Deny build: ${formatNode(denyTarget)}`].join(" | "),
      );
    }
    if (canReserveNode(gameState, player, denyTarget)) {
      return makeDecision(
        applyNodeReservation(gameState, player, denyTarget, true),
        `${player.name} reserved a node.`,
        [...debugLines, `Deny reserve: ${formatNode(denyTarget)}`].join(" | "),
      );
    }
  }
  if (efficiencyPush && buildable.length > 0) {
    const target = pickPlannedNode(buildable, player, "efficiency", gameState);
    return buildNodeWithEffects(
      gameState,
      player,
      target,
      `${player.name} built a node.`,
      [...debugLines, `Chosen node: ${formatNode(target)}`].join(" | "),
    );
  }
  if (buildable.length > 0 || buildableReserved.length > 0) {
    const target = pickBestBuildCandidate(
      buildable,
      buildableReserved,
      player,
      gameState,
      plan,
      denyTypes,
    );
    return buildNodeWithEffects(
      gameState,
      player,
      target,
      `${player.name} built a node.`,
      [...debugLines, `Chosen node: ${formatNode(target)}`].join(" | "),
    );
  }
  if (closeToNetworkWin && buildable.length > 0) {
    const target = buildable[0];
    return buildNodeWithEffects(
      gameState,
      player,
      target,
      `${player.name} built a node.`,
      [...debugLines, `Chosen node: ${formatNode(target)}`].join(" | "),
    );
  }
  if (protocols.length > 0) {
    const target = pickBestProtocol(protocols);
    return makeDecision(
      applyProtocolClaim(gameState, player, target),
      `${player.name} claimed a protocol.`,
      [...debugLines, `Chosen protocol: ${formatProtocol(target)}`].join(" | "),
    );
  }
  const exchangePlan = findExchangeForUpgrade(
    gameState,
    player,
    bestMarketTarget,
    denyTypes,
  );
  if (exchangePlan) {
    const nextState = applyExchangeEnergy(
      gameState,
      player,
      exchangePlan.takeType,
      exchangePlan.takeCount,
      exchangePlan.give,
    );
    return makeDecision(
      nextState,
      `${player.name} exchanged energy.`,
      [
        ...debugLines,
        `Exchange: take=${exchangePlan.takeType}x${exchangePlan.takeCount}`,
      ].join(" | "),
    );
  }

  const collectResult = collectEnergyTurn(
    gameState,
    player,
    difficulty,
    bestMarketTarget,
  );
  if (collectResult.nextState !== gameState) {
    return mergeDebug(collectResult, debugLines);
  }
  const reserveTarget =
    denyTarget || bestMarketTarget || getReserveTarget(gameState, player);
  if (reserveTarget) {
    return makeDecision(
      applyNodeReservation(gameState, player, reserveTarget, true),
      `${player.name} reserved a node.`,
      [...debugLines, `Reserved: ${formatNode(reserveTarget)}`].join(" | "),
    );
  }
  return mergeDebug(collectResult, debugLines);
}

function isOpponentNearWin(gameState: GameState, opponent: Player): boolean {
  const nodesThreshold = getWinNodesThreshold(gameState.players.length);
  if (opponent.nodes.length >= nodesThreshold - 1) {
    return true;
  }
  if (opponent.protocols.length >= WIN_PROTOCOLS_THRESHOLD - 1) {
    return true;
  }
  if (
    gameState.turnCount >= WIN_TURN_THRESHOLD &&
    opponent.efficiency >= WIN_EFFICIENCY_THRESHOLD - 1
  ) {
    return true;
  }
  return false;
}

function getClaimableProtocols(
  gameState: GameState,
  player: Player,
): Protocol[] {
  return gameState.protocols.filter(
    (protocol) => !protocol.claimed && canClaimProtocol(protocol, player),
  );
}

function getMarketNodes(gameState: GameState): Node[] {
  return gameState.marketNodes.flatMap((row) => row.filter(Boolean) as Node[]);
}

function getAffordableNodes(nodes: Node[], player: Player): Node[] {
  return nodes.filter((node) => canAffordNode(node, player));
}

function pickPlan(
  gameState: GameState,
  player: Player,
  difficulty: BotDifficulty,
): BotPlanDecision {
  const protocols = getClaimableProtocols(gameState, player);
  const efficiencyRemaining = Math.max(
    WIN_EFFICIENCY_THRESHOLD - player.efficiency,
    0,
  );
  const winNodesThreshold = getWinNodesThreshold(gameState.players.length);
  const networkRemaining = Math.max(winNodesThreshold - player.nodes.length, 0);
  const protocolRemaining = Math.max(
    WIN_PROTOCOLS_THRESHOLD - player.protocols.length,
    0,
  );

  if (protocolRemaining <= 1 && protocols.length > 0) {
    return { plan: "protocol", reason: "protocol win close" };
  }

  const pressureTypes = getProtocolPressureTypes(gameState, player);
  if (protocolRemaining <= BOT_PROTOCOL_PRESSURE && pressureTypes.length > 0) {
    return { plan: "protocol", reason: "protocol pressure" };
  }

  if (
    gameState.turnCount >= WIN_TURN_THRESHOLD &&
    efficiencyRemaining <= BOT_EFFICIENCY_BUFFER
  ) {
    return { plan: "efficiency", reason: "efficiency push" };
  }

  if (networkRemaining <= 1) {
    return { plan: "network", reason: "network close" };
  }

  if (difficulty === "easy") {
    return { plan: "efficiency", reason: "easy bias" };
  }

  const efficiencyProgress =
    player.efficiency / Math.max(WIN_EFFICIENCY_THRESHOLD, 1);
  const networkProgress = player.nodes.length / Math.max(winNodesThreshold, 1);
  const protocolProgress =
    player.protocols.length / Math.max(WIN_PROTOCOLS_THRESHOLD, 1);

  let bestPlan: BotPlan = "efficiency";
  let bestScore = efficiencyProgress;

  if (networkProgress > bestScore) {
    bestScore = networkProgress;
    bestPlan = "network";
  }
  if (protocolProgress > bestScore) {
    bestScore = protocolProgress;
    bestPlan = "protocol";
  }

  if (difficulty === "hard" && pressureTypes.length > 0) {
    return { plan: "protocol", reason: "hard pressure bias" };
  }

  return { plan: bestPlan, reason: "progress lead" };
}

function pickPlannedNode(
  nodes: Node[],
  player: Player,
  plan: BotPlan,
  gameState: GameState,
): Node {
  if (nodes.length === 1) {
    return nodes[0];
  }
  if (plan === "efficiency") {
    return pickBestEfficiencyPerCost(nodes, player);
  }
  if (plan === "network") {
    return pickLowestCostNode(nodes, player);
  }
  if (plan === "protocol") {
    const needed = getProtocolPressureTypes(gameState, player);
    if (needed.length > 0) {
      const candidates = nodes.filter(
        (node) => node.outputType && needed.includes(node.outputType),
      );
      if (candidates.length > 0) {
        return pickBestValueNode(candidates, player) ?? nodes[0];
      }
    }
    return pickBestValueNode(nodes, player) ?? nodes[0];
  }
  return pickBestValueNode(nodes, player) ?? nodes[0];
}

function pickBestBuildCandidate(
  market: Node[],
  reserved: Node[],
  player: Player,
  gameState: GameState,
  plan: BotPlan,
  denyTypes: Exclude<EnergyType, "flux">[],
): Node {
  const all = [...market, ...reserved];
  if (all.length === 1) {
    return all[0];
  }
  const scored = all.map((node) => ({
    node,
    score: getNodeScore(node, player, gameState, plan, denyTypes),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored[0].node;
}

function getReserveTarget(gameState: GameState, player: Player): Node | null {
  if (player.reservedNodes.length >= MAX_RESERVED_NODES) {
    return null;
  }
  if (gameState.energyPool.flux <= 0) {
    return null;
  }
  const nodes = getMarketNodes(gameState);
  if (nodes.length === 0) {
    return null;
  }
  return nodes[0];
}

function canReserveNode(
  gameState: GameState,
  player: Player,
  node: Node,
): boolean {
  if (player.reservedNodes.length >= MAX_RESERVED_NODES) {
    return false;
  }
  if (gameState.energyPool.flux <= 0) {
    return false;
  }
  const reservedByOthers = gameState.players.some((current) =>
    current.reservedNodes.some((reserved) => reserved.id === node.id),
  );
  if (reservedByOthers) {
    return false;
  }
  return true;
}

function pickBestEfficiencyPerCost(nodes: Node[], player: Player): Node {
  return [...nodes].sort((a, b) => {
    const ratioA = getEfficiencyRatio(a, player);
    const ratioB = getEfficiencyRatio(b, player);
    if (ratioB !== ratioA) {
      return ratioB - ratioA;
    }
    return getNodeCostTotal(a, player) - getNodeCostTotal(b, player);
  })[0];
}

function pickLowestCostNode(nodes: Node[], player: Player): Node {
  return [...nodes].sort((a, b) => {
    const costDelta = getNodeCostTotal(a, player) - getNodeCostTotal(b, player);
    if (costDelta !== 0) {
      return costDelta;
    }
    return b.efficiency - a.efficiency;
  })[0];
}

function getNodeCostTotal(node: Node, player: Player): number {
  const cost = calculateNodeCost(node, player);
  return BASE_ENERGY_TYPES.reduce((sum, type) => sum + (cost[type] || 0), 0);
}

function getEfficiencyRatio(node: Node, player: Player): number {
  const total = getNodeCostTotal(node, player);
  if (total === 0) {
    return node.efficiency;
  }
  return node.efficiency / total;
}

function pickBestValueNode(nodes: Node[], player: Player): Node | null {
  if (nodes.length === 0) {
    return null;
  }
  return [...nodes].sort(
    (a, b) => getNodeScore(b, player) - getNodeScore(a, player),
  )[0];
}

function getNodeScore(
  node: Node,
  player: Player,
  gameState?: GameState,
  plan: BotPlan = "efficiency",
  denyTypes: Exclude<EnergyType, "flux">[] = [],
): number {
  const cost = getNodeCostTotal(node, player);
  const outputValue = node.outputType ? BOT_OUTPUT_WEIGHT : 0;
  const effectBoost = node.effectType
    ? (node.effectValue || 0) * BOT_EFFECT_WEIGHT
    : 0;
  const efficiencyValue = node.efficiency * 2.2;
  const planBonus =
    plan === "efficiency" ? node.efficiency * 1.5 : plan === "network" ? 1 : 0;
  const protocolBonus =
    gameState && node.outputType
      ? getProtocolContributionBonus(gameState, player, node.outputType)
      : 0;
  const denyBonus =
    node.outputType && denyTypes.includes(node.outputType)
      ? BOT_PROTOCOL_WEIGHT
      : 0;
  const costPenalty = cost * BOT_COST_WEIGHT;
  const affordableBonus = canAffordNode(node, player) ? 1.5 : 0;
  return (
    efficiencyValue +
    outputValue +
    effectBoost +
    planBonus +
    protocolBonus +
    denyBonus +
    affordableBonus -
    costPenalty
  );
}

function getProtocolContributionBonus(
  gameState: GameState,
  player: Player,
  outputType: Exclude<EnergyType, "flux">,
): number {
  const outputs = calculatePlayerOutputs(player);
  let bonus = 0;
  gameState.protocols.forEach((protocol) => {
    if (protocol.claimed) {
      return;
    }
    const required = protocol.requirements[outputType] || 0;
    if (required <= 0) {
      return;
    }
    const missing = Math.max(required - (outputs[outputType] || 0), 0);
    if (missing > 0 && missing <= BOT_PROTOCOL_PRESSURE) {
      bonus += BOT_PROTOCOL_WEIGHT;
    }
  });
  return bonus;
}

function pickBestProtocol(protocols: Protocol[]): Protocol {
  return [...protocols].sort((a, b) => b.efficiency - a.efficiency)[0];
}

function getPrimaryOpponent(
  gameState: GameState,
  player: Player,
): Player | null {
  const opponents = gameState.players.filter(
    (current) => current.id !== player.id,
  );
  if (opponents.length === 0) {
    return null;
  }
  const humans = opponents.filter((current) => !current.isBot);
  const pool = humans.length > 0 ? humans : opponents;
  return [...pool].sort((a, b) => b.efficiency - a.efficiency)[0];
}

function getDenyNodeTarget(
  gameState: GameState,
  opponent: Player,
  botPlayer: Player,
  threshold: number,
): Node | null {
  const neededTypes = getProtocolDenyTypes(gameState, opponent, threshold);
  if (neededTypes.length === 0) {
    return null;
  }
  const candidates = getMarketNodes(gameState).filter((node) =>
    neededTypes.includes(node.outputType),
  );
  if (candidates.length === 0) {
    return null;
  }
  return pickBestValueNode(candidates, botPlayer);
}

function getProtocolDenyTypes(
  gameState: GameState,
  player: Player,
  threshold: number,
): Exclude<EnergyType, "flux">[] {
  const outputs = calculatePlayerOutputs(player);
  const targets = new Set<Exclude<EnergyType, "flux">>();
  gameState.protocols.forEach((protocol) => {
    if (protocol.claimed) {
      return;
    }
    const required = protocol.requirements;
    let missingTotal = 0;
    (
      Object.entries(required) as [Exclude<EnergyType, "flux">, number][]
    ).forEach(([type, amount]) => {
      const missing = Math.max(amount - (outputs[type] || 0), 0);
      if (missing > 0) {
        missingTotal += missing;
        targets.add(type);
      }
    });
    if (missingTotal > threshold) {
      return;
    }
    (
      Object.entries(required) as [Exclude<EnergyType, "flux">, number][]
    ).forEach(([type, amount]) => {
      if ((outputs[type] || 0) < amount) {
        targets.add(type);
      }
    });
  });
  return [...targets];
}

function getProtocolPressureTypes(
  gameState: GameState,
  player: Player,
): Exclude<EnergyType, "flux">[] {
  return getProtocolDenyTypes(gameState, player, BOT_PROTOCOL_PRESSURE);
}

function buildNodeWithEffects(
  gameState: GameState,
  player: Player,
  node: Node,
  notice: string,
  debug: string,
): BotDecision {
  const payment = generateNodePayment(node, player);
  if (!payment) {
    return makeDecision(gameState, notice, debug);
  }
  const nextState = applyNodePurchase(gameState, player, node, payment);
  const updatedPlayer = nextState.players[nextState.currentPlayerIndex];
  if (updatedPlayer.pendingEffects.draw > 0) {
    const options = getDrawOptions(
      nextState,
      node.category,
      updatedPlayer.pendingEffects.draw,
    );
    if (options.length > 0) {
      const drawState = applyDrawEffect(
        nextState,
        updatedPlayer,
        node.category,
        options[0],
      );
      return resolveSwapIfNeeded(drawState, notice, debug);
    }
  }
  return resolveSwapIfNeeded(nextState, notice, debug);
}

function resolveSwapIfNeeded(
  gameState: GameState,
  notice: string,
  debug: string,
): BotDecision {
  const player = gameState.players[gameState.currentPlayerIndex];
  if (player.pendingEffects.swap <= 0) {
    return makeDecision(gameState, notice, debug);
  }
  const swapPlan = planSwap(
    player,
    gameState.energyPool,
    player.pendingEffects.swap,
  );
  if (!swapPlan) {
    const nextState = {
      ...gameState,
      players: gameState.players.map((p, index) =>
        index === gameState.currentPlayerIndex
          ? { ...p, pendingEffects: { ...p.pendingEffects, swap: 0 } }
          : p,
      ),
    };
    return makeDecision(nextState, notice, debug);
  }
  const nextState = applySwapEffect(
    gameState,
    player,
    swapPlan.give,
    swapPlan.take,
  );
  return makeDecision(nextState, `${notice} Swapped energy.`, debug);
}

function planSwap(
  player: Player,
  pool: Record<EnergyType, number>,
  maxSwaps: number,
): { give: EnergyType[]; take: EnergyType[] } | null {
  const give: EnergyType[] = [];
  const take: EnergyType[] = [];
  const playerCounts = { ...player.energy };
  const poolCounts = { ...pool };

  for (let i = 0; i < maxSwaps; i += 1) {
    const giveType = pickHighestCountType(playerCounts, BASE_ENERGY_TYPES);
    const takeType = pickLowestCountType(
      playerCounts,
      poolCounts,
      giveType,
      BASE_ENERGY_TYPES,
    );
    if (!giveType || !takeType) {
      break;
    }
    if (playerCounts[giveType] <= 0 || poolCounts[takeType] <= 0) {
      break;
    }
    playerCounts[giveType] -= 1;
    poolCounts[takeType] -= 1;
    give.push(giveType);
    take.push(takeType);
  }

  if (give.length === 0 || give.length !== take.length) {
    return null;
  }
  return { give, take };
}

function pickHighestCountType<T extends string>(
  counts: Record<T, number>,
  types: T[],
): T | null {
  let best: T | null = null;
  let bestValue = 0;
  types.forEach((type) => {
    if (counts[type] > bestValue) {
      bestValue = counts[type];
      best = type;
    }
  });
  return best;
}

function pickLowestCountType(
  playerCounts: Record<EnergyType, number>,
  poolCounts: Record<EnergyType, number>,
  excludeType: EnergyType | null,
  types: EnergyType[],
): EnergyType | null {
  let best: EnergyType | null = null;
  let bestValue = Infinity;
  types.forEach((type) => {
    if (excludeType && type === excludeType) {
      return;
    }
    if (poolCounts[type] <= 0) {
      return;
    }
    if (playerCounts[type] < bestValue) {
      bestValue = playerCounts[type];
      best = type;
    }
  });
  return best;
}

function collectEnergyTurn(
  gameState: GameState,
  player: Player,
  difficulty: BotDifficulty,
  targetNode: Node | null,
): BotDecision {
  const desired =
    difficulty === "easy"
      ? []
      : getDesiredEnergies(gameState, player, targetNode);
  const desiredSummary = desired.length > 0 ? desired.join(",") : "none";
  const selection = chooseCollectEnergy(gameState.energyPool, desired);
  if (difficulty === "hard") {
    const improved = findTwoTurnCollect(
      gameState,
      player,
      targetNode,
      selection,
    );
    if (improved.length > 0) {
      selection.length = 0;
      selection.push(...improved);
    }
  }
  if (selection.length === 0) {
    const reserveTarget = getReserveTarget(gameState, player);
    if (reserveTarget) {
      return makeDecision(
        applyNodeReservation(gameState, player, reserveTarget, true),
        `${player.name} reserved a node.`,
        `${player.name} [${difficulty}] action=reserve ${formatNode(reserveTarget)}`,
      );
    }
    const exchangePlan = planExchange(gameState, player, targetNode);
    if (exchangePlan) {
      const nextState = applyExchangeEnergy(
        gameState,
        player,
        exchangePlan.takeType,
        exchangePlan.takeCount,
        exchangePlan.give,
      );
      return makeDecision(
        nextState,
        `${player.name} exchanged energy.`,
        `Energy reason=exchange desired=${desiredSummary} take=${formatEnergyList(Array(exchangePlan.takeCount).fill(exchangePlan.takeType))} give=${formatEnergyList(exchangePlan.give)}`,
      );
    }
    return makeDecision(
      gameState,
      `${player.name} had no legal action.`,
      `Energy reason=none desired=${desiredSummary}`,
    );
  }
  const nextState = applyEnergyCollection(gameState, player, selection);
  const updatedPlayer = nextState.players[nextState.currentPlayerIndex];
  if (mustDiscardEnergy(updatedPlayer)) {
    const discardCount = Math.max(
      getTotalEnergy(updatedPlayer) - ENERGY_LIMIT,
      0,
    );
    const discards = chooseDiscards(updatedPlayer, discardCount);
    const discardedState = applyEnergyDiscard(
      nextState,
      updatedPlayer,
      discards,
    );
    return makeDecision(
      discardedState,
      `${player.name} collected energy.`,
      `Energy reason=collect desired=${desiredSummary} selected=${formatEnergyList(selection)} discard=${formatEnergyList(discards)}`,
    );
  }
  return makeDecision(
    nextState,
    `${player.name} collected energy.`,
    `Energy reason=collect desired=${desiredSummary} selected=${formatEnergyList(selection)}`,
  );
}

function findTwoTurnCollect(
  gameState: GameState,
  player: Player,
  targetNode: Node | null,
  currentSelection: EnergyType[],
): EnergyType[] {
  const pool = gameState.energyPool;
  const baseTypes = BASE_ENERGY_TYPES.filter((type) => pool[type] > 0);
  if (baseTypes.length < 2) {
    return currentSelection;
  }
  const candidates: EnergyType[][] = [];
  const unique = baseTypes.slice(0, 3);
  if (unique.length >= 3) {
    candidates.push(unique.slice(0, 3));
  }
  const sameType = baseTypes.find((type) => pool[type] >= 4);
  if (sameType) {
    candidates.push([sameType, sameType]);
  }
  if (candidates.length === 0) {
    return currentSelection;
  }
  const marketNodes = getMarketNodes(gameState);
  const target = targetNode || pickBestValueNode(marketNodes, player);
  if (!target) {
    return currentSelection;
  }

  let bestScore = -Infinity;
  let best: EnergyType[] = currentSelection;
  candidates.forEach((pick) => {
    const simulatedPlayer: Player = {
      ...player,
      energy: {
        ...player.energy,
      },
    };
    pick.forEach((type) => {
      simulatedPlayer.energy[type] += 1;
    });
    const cost = calculateNodeCost(target, simulatedPlayer);
    const remaining = BASE_ENERGY_TYPES.reduce(
      (sum, type) =>
        sum + Math.max(cost[type] - simulatedPlayer.energy[type], 0),
      0,
    );
    const score = -remaining - getNodeCostTotal(target, simulatedPlayer) * 0.1;
    if (score > bestScore) {
      bestScore = score;
      best = pick;
    }
  });
  return best;
}

function chooseCollectEnergy(
  pool: Record<EnergyType, number>,
  preferred: EnergyType[],
): EnergyType[] {
  const available = BASE_ENERGY_TYPES.filter((type) => pool[type] > 0);

  if (preferred.length > 0) {
    const preferredAvailable = preferred.filter((type) => pool[type] > 0);
    if (preferredAvailable.length >= 3) {
      return preferredAvailable.slice(0, 3);
    }
    if (preferredAvailable.length >= 1) {
      const same = preferredAvailable.find((type) => pool[type] >= 4);
      if (same) {
        return [same, same];
      }
    }
  }

  const sameType = available.find((type) => pool[type] >= 4);
  if (sameType) {
    return [sameType, sameType];
  }

  if (available.length >= 3) {
    return available.slice(0, 3);
  }

  return [];
}

function getDesiredEnergies(
  gameState: GameState,
  player: Player,
  targetNode: Node | null,
): EnergyType[] {
  const nodes = getMarketNodes(gameState);
  if (nodes.length === 0) {
    return [];
  }
  const target = targetNode || pickBestValueNode(nodes, player) || nodes[0];
  const cost = calculateNodeCost(target, player);
  const desired = BASE_ENERGY_TYPES.filter(
    (type) => cost[type] > player.energy[type],
  );
  const pressure = getProtocolPressureTypes(gameState, player);
  return [...new Set([...pressure, ...desired])];
}

function chooseDiscards(player: Player, count: number): EnergyType[] {
  const discards: EnergyType[] = [];
  const energyCounts = { ...player.energy };
  for (let i = 0; i < count; i += 1) {
    const type = pickHighestCountType(energyCounts, BASE_ENERGY_TYPES);
    if (!type || energyCounts[type] <= 0) {
      break;
    }
    energyCounts[type] -= 1;
    discards.push(type);
  }
  return discards;
}

function planExchange(
  gameState: GameState,
  player: Player,
  targetNode: Node | null,
): {
  takeType: Exclude<EnergyType, "flux">;
  takeCount: number;
  give: Exclude<EnergyType, "flux">[];
} | null {
  const baseTypes = BASE_ENERGY_TYPES;
  const pool = gameState.energyPool;
  const giveCandidates = baseTypes.filter((type) => player.energy[type] > 0);
  if (giveCandidates.length === 0) {
    return null;
  }

  const oneTake = baseTypes.find((type) => pool[type] > 0);
  if (oneTake) {
    for (let i = 0; i < giveCandidates.length; i += 1) {
      const oneGive = giveCandidates[i];
      if (!canExchangeEnergy(gameState, player, oneTake, 1, [oneGive])) {
        continue;
      }
      if (targetNode) {
        const simulated = {
          ...player,
          energy: {
            ...player.energy,
            [oneGive]: player.energy[oneGive] - 1,
            [oneTake]: player.energy[oneTake] + 1,
          },
        };
        if (!canAffordNode(targetNode, simulated)) {
          continue;
        }
      }
      return { takeType: oneTake, takeCount: 1, give: [oneGive] };
    }
  }

  const twoTake = baseTypes.find((type) => pool[type] >= 2);
  if (!twoTake) {
    return null;
  }
  const giveThree = buildGiveList(player, 3);
  if (giveThree.length < 3) {
    return null;
  }
  if (canExchangeEnergy(gameState, player, twoTake, 2, giveThree)) {
    if (targetNode) {
      const updatedEnergy = { ...player.energy };
      giveThree.forEach((type) => {
        updatedEnergy[type] -= 1;
      });
      updatedEnergy[twoTake] += 2;
      const simulated = { ...player, energy: updatedEnergy };
      if (!canAffordNode(targetNode, simulated)) {
        return null;
      }
    }
    return { takeType: twoTake, takeCount: 2, give: giveThree };
  }
  return null;
}

function findExchangeForUpgrade(
  gameState: GameState,
  player: Player,
  targetNode: Node | null,
  denyTypes: Exclude<EnergyType, "flux">[],
): {
  takeType: Exclude<EnergyType, "flux">;
  takeCount: number;
  give: Exclude<EnergyType, "flux">[];
} | null {
  const candidates = getMarketNodes(gameState)
    .filter((node) => !canAffordNode(node, player))
    .sort(
      (a, b) =>
        getNodeScore(b, player, gameState, "protocol", denyTypes) -
        getNodeScore(a, player, gameState, "protocol", denyTypes),
    );
  const target = targetNode || candidates[0];
  if (!target) {
    return null;
  }
  const plan = planExchange(gameState, player, target);
  if (plan) {
    return plan;
  }
  return null;
}

function buildGiveList(
  player: Player,
  count: number,
): Exclude<EnergyType, "flux">[] {
  const result: Exclude<EnergyType, "flux">[] = [];
  const counts: Record<Exclude<EnergyType, "flux">, number> = {
    solar: player.energy.solar,
    hydro: player.energy.hydro,
    plasma: player.energy.plasma,
    neural: player.energy.neural,
  };
  for (let i = 0; i < count; i += 1) {
    const type = pickHighestCountType(counts, BASE_ENERGY_TYPES);
    if (!type || counts[type] <= 0) {
      break;
    }
    counts[type] -= 1;
    result.push(type);
  }
  return result;
}

function formatEnergyList(items: EnergyType[]): string {
  if (items.length === 0) {
    return "none";
  }
  const counts = items.reduce<Record<string, number>>((acc, type) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(counts)
    .map(([type, count]) => `${type}x${count}`)
    .join(",");
}

function formatNode(node: Node): string {
  const output = node.outputType ? ` output=${node.outputType}` : "";
  const efficiency = node.efficiency ? ` eff=${node.efficiency}` : "";
  return `node=${node.id} cat=${node.category}${output}${efficiency}`;
}

function formatProtocol(protocol: Protocol): string {
  const req = Object.entries(protocol.requirements)
    .map(([type, count]) => `${type}x${count}`)
    .join(",");
  return `protocol=${protocol.id} eff=${protocol.efficiency} req=${req}`;
}

function formatTopNodes(nodes: Node[], player: Player, limit: number): string {
  const ranked = [...nodes].sort(
    (a, b) => getNodeScore(b, player) - getNodeScore(a, player),
  );
  return ranked
    .slice(0, limit)
    .map((node) => `${node.id}:${getNodeScore(node, player).toFixed(2)}`)
    .join(", ");
}

function mergeDebug(result: BotDecision, debugLines: string[]): BotDecision {
  return {
    ...result,
    debug: [...debugLines, result.debug].join(" | "),
  };
}

function makeDecision(
  nextState: GameState,
  notice: string,
  debug: string,
): BotDecision {
  return { nextState, notice, debug };
}

function advanceTurn(gameState: GameState): GameState {
  const nextState = { ...gameState };
  nextState.currentPlayerIndex =
    (nextState.currentPlayerIndex + 1) % nextState.players.length;
  nextState.turnCount = (nextState.turnCount || 0) + 1;
  return nextState;
}
