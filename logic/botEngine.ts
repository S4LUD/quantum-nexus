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
  WIN_NODES_THRESHOLD,
  WIN_TURN_THRESHOLD,
  WIN_EFFICIENCY_THRESHOLD,
  WIN_PROTOCOLS_THRESHOLD,
} from "@/logic/rules";
import { calculatePlayerOutputs, getTotalEnergy } from "@/logic/selectors";

const BASE_ENERGY_TYPES: Exclude<EnergyType, "flux">[] = [
  "solar",
  "hydro",
  "plasma",
  "neural",
];

const BOT_EFFICIENCY_BUFFER = 2;

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

  const { nextState, notice } = chooseBotAction(gameState, currentPlayer, difficulty);
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
): { nextState: GameState; notice: string } {
  const protocols = getClaimableProtocols(gameState, player);
  const marketNodes = getMarketNodes(gameState);
  const reservedNodes = player.reservedNodes;
  const buildable = getAffordableNodes(marketNodes, player);
  const buildableReserved = getAffordableNodes(reservedNodes, player);
  const bestMarketTarget = pickBestValueNode(marketNodes, player);

  if (difficulty === "easy") {
    if (protocols.length > 0) {
      return { nextState: applyProtocolClaim(gameState, player, protocols[0]), notice: `${player.name} claimed a protocol.` };
    }
    if (buildable.length > 0) {
      return buildNodeWithEffects(gameState, player, buildable[0], `${player.name} built a node.`);
    }
    if (buildableReserved.length > 0) {
      return buildNodeWithEffects(gameState, player, buildableReserved[0], `${player.name} built a reserved node.`);
    }
    const reserveTarget =
      bestMarketTarget || getReserveTarget(gameState, player);
    if (reserveTarget) {
      return {
        nextState: applyNodeReservation(gameState, player, reserveTarget, true),
        notice: `${player.name} reserved a node.`,
      };
    }
    return collectEnergyTurn(gameState, player, difficulty, bestMarketTarget);
  }

  if (difficulty === "medium") {
    if (buildable.length > 0) {
      const target = pickBestEfficiencyNode(buildable, player);
      return buildNodeWithEffects(gameState, player, target, `${player.name} built a node.`);
    }
    if (buildableReserved.length > 0) {
      const target = pickBestEfficiencyNode(buildableReserved, player);
      return buildNodeWithEffects(gameState, player, target, `${player.name} built a reserved node.`);
    }
    if (protocols.length > 0) {
      return { nextState: applyProtocolClaim(gameState, player, protocols[0]), notice: `${player.name} claimed a protocol.` };
    }
    const reserveTarget =
      bestMarketTarget || getReserveTarget(gameState, player);
    if (reserveTarget) {
      return {
        nextState: applyNodeReservation(gameState, player, reserveTarget, true),
        notice: `${player.name} reserved a node.`,
      };
    }
    return collectEnergyTurn(gameState, player, difficulty, bestMarketTarget);
  }

  const opponent = getPrimaryOpponent(gameState, player);
  const denyTarget = opponent
    ? getDenyNodeTarget(gameState, opponent, player)
    : null;

  const closeToProtocolWin =
    player.protocols.length >= WIN_PROTOCOLS_THRESHOLD - 1 &&
    protocols.length > 0;
  const closeToNetworkWin =
    player.nodes.length >= WIN_NODES_THRESHOLD - 1;
  const efficiencyPush =
    gameState.turnCount >= WIN_TURN_THRESHOLD &&
    player.efficiency >= WIN_EFFICIENCY_THRESHOLD - BOT_EFFICIENCY_BUFFER;
  if (closeToProtocolWin && protocols.length > 0) {
    const target = pickBestProtocol(protocols);
    return {
      nextState: applyProtocolClaim(gameState, player, target),
      notice: `${player.name} claimed a protocol.`,
    };
  }
  if (denyTarget) {
    if (canAffordNode(denyTarget, player)) {
      return buildNodeWithEffects(
        gameState,
        player,
        denyTarget,
        `${player.name} built a node.`,
      );
    }
    if (canReserveNode(gameState, player, denyTarget)) {
      return {
        nextState: applyNodeReservation(gameState, player, denyTarget, true),
        notice: `${player.name} reserved a node.`,
      };
    }
  }
  if (efficiencyPush && buildable.length > 0) {
    const target = pickBestEfficiencyNode(buildable, player);
    return buildNodeWithEffects(
      gameState,
      player,
      target,
      `${player.name} built a node.`,
    );
  }
  if (buildable.length > 0) {
    const target = pickBestEfficiencyPerCost(buildable, player);
    return buildNodeWithEffects(gameState, player, target, `${player.name} built a node.`);
  }
  if (buildableReserved.length > 0) {
    const target = pickBestEfficiencyPerCost(buildableReserved, player);
    return buildNodeWithEffects(gameState, player, target, `${player.name} built a reserved node.`);
  }
  if (closeToNetworkWin && buildable.length > 0) {
    return buildNodeWithEffects(gameState, player, buildable[0], `${player.name} built a node.`);
  }
  if (protocols.length > 0) {
    const target = pickBestProtocol(protocols);
    return {
      nextState: applyProtocolClaim(gameState, player, target),
      notice: `${player.name} claimed a protocol.`,
    };
  }
  const reserveTarget =
    bestMarketTarget || getReserveTarget(gameState, player);
  if (reserveTarget) {
    return {
      nextState: applyNodeReservation(gameState, player, reserveTarget, true),
      notice: `${player.name} reserved a node.`,
    };
  }
  return collectEnergyTurn(gameState, player, difficulty, bestMarketTarget);
}

function getClaimableProtocols(gameState: GameState, player: Player): Protocol[] {
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

function pickBestEfficiencyNode(nodes: Node[], player: Player): Node {
  return [...nodes].sort((a, b) => {
    if (b.efficiency !== a.efficiency) {
      return b.efficiency - a.efficiency;
    }
    return getNodeCostTotal(a, player) - getNodeCostTotal(b, player);
  })[0];
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
  return [...nodes].sort((a, b) => getNodeScore(b, player) - getNodeScore(a, player))[0];
}

function getNodeScore(node: Node, player: Player): number {
  const cost = getNodeCostTotal(node, player);
  const outputValue = node.outputType ? 1 : 0;
  const effectValue = node.effectValue || 0;
  const effectBoost = node.effectType ? effectValue : 0;
  const efficiencyValue = node.efficiency * 2;
  const costPenalty = cost * 0.4;
  return efficiencyValue + outputValue + effectBoost - costPenalty;
}

function pickBestProtocol(protocols: Protocol[]): Protocol {
  return [...protocols].sort((a, b) => b.efficiency - a.efficiency)[0];
}

function getPrimaryOpponent(gameState: GameState, player: Player): Player | null {
  const opponents = gameState.players.filter((current) => current.id !== player.id);
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
): Node | null {
  const neededTypes = getProtocolPressureTypes(gameState, opponent);
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

function getProtocolPressureTypes(
  gameState: GameState,
  player: Player,
): Exclude<EnergyType, "flux">[] {
  const outputs = calculatePlayerOutputs(player);
  const targets = new Set<Exclude<EnergyType, "flux">>();
  gameState.protocols.forEach((protocol) => {
    if (protocol.claimed) {
      return;
    }
    const required = protocol.requirements;
    let missingTotal = 0;
    (Object.entries(required) as [Exclude<EnergyType, "flux">, number][]).forEach(
      ([type, amount]) => {
        const missing = Math.max(amount - (outputs[type] || 0), 0);
        if (missing > 0) {
          missingTotal += missing;
          if (missing <= 1) {
            targets.add(type);
          }
        }
      },
    );
    if (missingTotal <= 2) {
      (Object.entries(required) as [Exclude<EnergyType, "flux">, number][]).forEach(
        ([type, amount]) => {
          if ((outputs[type] || 0) < amount) {
            targets.add(type);
          }
        },
      );
    }
  });
  return [...targets];
}

function buildNodeWithEffects(
  gameState: GameState,
  player: Player,
  node: Node,
  notice: string,
): { nextState: GameState; notice: string } {
  const payment = generateNodePayment(node, player);
  if (!payment) {
    return { nextState: gameState, notice };
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
      return resolveSwapIfNeeded(drawState, notice);
    }
  }
  return resolveSwapIfNeeded(nextState, notice);
}

function resolveSwapIfNeeded(
  gameState: GameState,
  notice: string,
): { nextState: GameState; notice: string } {
  const player = gameState.players[gameState.currentPlayerIndex];
  if (player.pendingEffects.swap <= 0) {
    return { nextState: gameState, notice };
  }
  const swapPlan = planSwap(player, gameState.energyPool, player.pendingEffects.swap);
  if (!swapPlan) {
    const nextState = {
      ...gameState,
      players: gameState.players.map((p, index) =>
        index === gameState.currentPlayerIndex
          ? { ...p, pendingEffects: { ...p.pendingEffects, swap: 0 } }
          : p,
      ),
    };
    return { nextState, notice };
  }
  const nextState = applySwapEffect(
    gameState,
    player,
    swapPlan.give,
    swapPlan.take,
  );
  return { nextState, notice: `${notice} Swapped energy.` };
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

function pickHighestCountType(
  counts: Record<EnergyType, number>,
  types: EnergyType[],
): EnergyType | null {
  let best: EnergyType | null = null;
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
): { nextState: GameState; notice: string } {
  const desired =
    difficulty === "easy"
      ? []
      : getDesiredEnergies(gameState, player, targetNode);
  const selection = chooseCollectEnergy(gameState.energyPool, desired);
  if (selection.length === 0) {
    const reserveTarget = getReserveTarget(gameState, player);
    if (reserveTarget) {
      return {
        nextState: applyNodeReservation(gameState, player, reserveTarget, true),
        notice: `${player.name} reserved a node.`,
      };
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
      return { nextState, notice: `${player.name} exchanged energy.` };
    }
    return {
      nextState: gameState,
      notice: `${player.name} had no legal action.`,
    };
  }
  const nextState = applyEnergyCollection(gameState, player, selection);
  const updatedPlayer = nextState.players[nextState.currentPlayerIndex];
  if (mustDiscardEnergy(updatedPlayer)) {
    const discardCount = Math.max(getTotalEnergy(updatedPlayer) - ENERGY_LIMIT, 0);
    const discards = chooseDiscards(updatedPlayer, discardCount);
    const discardedState = applyEnergyDiscard(nextState, updatedPlayer, discards);
    return { nextState: discardedState, notice: `${player.name} collected energy.` };
  }
  return { nextState, notice: `${player.name} collected energy.` };
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
  return BASE_ENERGY_TYPES.filter((type) => cost[type] > player.energy[type]);
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

function buildGiveList(
  player: Player,
  count: number,
): Exclude<EnergyType, "flux">[] {
  const result: Exclude<EnergyType, "flux">[] = [];
  const counts = { ...player.energy };
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

function advanceTurn(gameState: GameState): GameState {
  const nextState = { ...gameState };
  nextState.currentPlayerIndex =
    (nextState.currentPlayerIndex + 1) % nextState.players.length;
  nextState.turnCount = (nextState.turnCount || 0) + 1;
  return nextState;
}
