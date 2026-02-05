import {
  GameState,
  Player,
  EnergyType,
  Protocol,
  Node,
  NodeCategory,
  BotDifficulty,
} from "@/types";
import {
  createShuffledDeck,
  researchNodes,
  productionNodes,
  networkNodes,
  controlNodes,
  protocols as protocolCatalog,
} from "./gameData";
import {
  ENERGY_POOL_BY_PLAYERS,
  INITIAL_FLUX,
  WIN_TURN_THRESHOLD,
  WIN_EFFICIENCY_THRESHOLD,
  WIN_NODES_THRESHOLD,
  WIN_PROTOCOLS_THRESHOLD,
  MAX_RESERVED_NODES,
  ENERGY_LIMIT,
} from "./rules";
import { calculatePlayerOutputs, getTotalEnergy } from "./selectors";

export function createInitialGameState(
  playerCount: number,
  botCount = 0,
  botDifficulty: BotDifficulty = "easy",
): GameState {
  const playerAvatars = ["P1", "P2", "P3", "P4"];
  const playerNames = ["You", "Player 2", "Player 3", "Player 4"];

  const players: Player[] = Array.from({ length: playerCount }, (_, index) => {
    const isBot = index > 0 && index <= botCount;
    return {
      id: `player-${index}`,
      name: playerNames[index],
      avatar: playerAvatars[index],
      energy: {
        solar: 0,
        hydro: 0,
        plasma: 0,
        neural: 0,
        flux: 0,
      },
      nodes: [],
      reservedNodes: [],
      protocols: [],
      efficiency: 0,
      isReady: index === 0,
      isBot,
      botDifficulty,
      pendingEffects: {
        discount: {},
        multiplier: {},
        draw: 0,
        swap: 0,
      },
    };
  });

  const energyCount =
    ENERGY_POOL_BY_PLAYERS[playerCount] || ENERGY_POOL_BY_PLAYERS[4];

  const deck0 = createShuffledDeck(researchNodes);
  const deck1 = createShuffledDeck(productionNodes);
  const deck2 = createShuffledDeck(networkNodes);
  const deck3 = createShuffledDeck(controlNodes);

  const marketNodes: (Node | null)[][] = [
    [
      deck0.pop() || null,
      deck0.pop() || null,
      deck0.pop() || null,
      deck0.pop() || null,
    ],
    [
      deck1.pop() || null,
      deck1.pop() || null,
      deck1.pop() || null,
      deck1.pop() || null,
    ],
    [
      deck2.pop() || null,
      deck2.pop() || null,
      deck2.pop() || null,
      deck2.pop() || null,
    ],
    [
      deck3.pop() || null,
      deck3.pop() || null,
      deck3.pop() || null,
      deck3.pop() || null,
    ],
  ];

  const shuffledProtocols = [...protocolCatalog].sort(
    () => Math.random() - 0.5,
  );
  const selectedProtocols = shuffledProtocols.slice(0, playerCount + 1);

  return {
    players,
    currentPlayerIndex: 0,
    energyPool: {
      solar: energyCount,
      hydro: energyCount,
      plasma: energyCount,
      neural: energyCount,
      flux: INITIAL_FLUX,
    },
    marketNodes,
    decks: [deck0, deck1, deck2, deck3],
    protocols: selectedProtocols,
    phase: "playing",
    winner: null,
    selectedEnergy: [],
    selectedNode: null,
    turnCount: 0,
    winCondition: null,
  };
}

export function calculateNodeCost(
  node: Node,
  player: Player,
): Record<EnergyType, number> {
  const cost: Record<EnergyType, number> = {
    solar: node.cost.solar || 0,
    hydro: node.cost.hydro || 0,
    plasma: node.cost.plasma || 0,
    neural: node.cost.neural || 0,
    flux: 0,
  };

  const outputs = calculatePlayerOutputs(player);
  (Object.entries(outputs) as [Exclude<EnergyType, "flux">, number][]).forEach(
    ([energyType, value]) => {
      if (value > 0) {
        cost[energyType] = Math.max(0, cost[energyType] - value);
      }
    },
  );

  const pendingDiscounts = player.pendingEffects?.discount || {};
  (Object.entries(pendingDiscounts) as [
    Exclude<EnergyType, "flux">,
    number,
  ][]).forEach(([energyType, value]) => {
    if (value > 0) {
      cost[energyType] = Math.max(0, cost[energyType] - value);
    }
  });

  player.protocols.forEach((protocol) => {
    if (protocol.effect.includes("cost -1")) {
      (["solar", "hydro", "plasma", "neural"] as const).forEach(
        (energyType) => {
          cost[energyType] = Math.max(0, cost[energyType] - 1);
        },
      );
    }
  });

  return cost;
}

export function canAffordNode(node: Node, player: Player): boolean {
  const cost = calculateNodeCost(node, player);
  const playerEnergy = { ...player.energy };

  (["solar", "hydro", "plasma", "neural"] as const).forEach((energyType) => {
    if (playerEnergy[energyType] < cost[energyType]) {
      const shortage = cost[energyType] - playerEnergy[energyType];
      if (playerEnergy.flux >= shortage) {
        playerEnergy.flux -= shortage;
        playerEnergy[energyType] = 0;
      } else {
        playerEnergy[energyType] = -1;
      }
    } else {
      playerEnergy[energyType] -= cost[energyType];
    }
  });

  return (["solar", "hydro", "plasma", "neural"] as const).every(
    (energyType) => playerEnergy[energyType] >= 0,
  );
}

export function generateNodePayment(
  node: Node,
  player: Player,
): Record<EnergyType, number> | null {
  const cost = calculateNodeCost(node, player);
  const payment: Record<EnergyType, number> = {
    solar: 0,
    hydro: 0,
    plasma: 0,
    neural: 0,
    flux: 0,
  };

  const playerEnergy = { ...player.energy };

  (["solar", "hydro", "plasma", "neural"] as const).forEach((energyType) => {
    if (cost[energyType] > 0) {
      const available = playerEnergy[energyType];
      const needed = cost[energyType];

      if (available >= needed) {
        payment[energyType] = needed;
        playerEnergy[energyType] -= needed;
      } else {
        payment[energyType] = available;
        const shortage = needed - available;

        if (playerEnergy.flux >= shortage) {
          payment.flux += shortage;
          playerEnergy.flux -= shortage;
          playerEnergy[energyType] = 0;
        } else {
          payment[energyType] = 0;
        }
      }
    }
  });

  const canPay = (["solar", "hydro", "plasma", "neural"] as const).every(
    (energyType) => cost[energyType] <= payment[energyType] + payment.flux,
  );

  return canPay ? payment : null;
}

export function canClaimProtocol(protocol: Protocol, player: Player): boolean {
  const outputs = calculatePlayerOutputs(player);

  return (["solar", "hydro", "plasma", "neural"] as const).every(
    (energyType) => {
      const required = protocol.requirements[energyType] || 0;
      return outputs[energyType] >= required;
    },
  );
}

export function checkWinConditions(gameState: GameState): Player | null {
  const { players, turnCount } = gameState;

  if (turnCount >= WIN_TURN_THRESHOLD) {
    const highestEfficiency = Math.max(
      ...players.map((player) => player.efficiency),
    );
    if (highestEfficiency >= WIN_EFFICIENCY_THRESHOLD) {
      return (
        players.find((player) => player.efficiency === highestEfficiency) ||
        null
      );
    }
  }

  const networkWinner = players.find(
    (player) => player.nodes.length >= WIN_NODES_THRESHOLD,
  );
  if (networkWinner) {
    return networkWinner;
  }

  const protocolWinner = players.find(
    (player) => player.protocols.length >= WIN_PROTOCOLS_THRESHOLD,
  );
  if (protocolWinner) {
    return protocolWinner;
  }

  return null;
}

export function checkProtocolAvailability(
  player: Player,
  protocols: Protocol[],
): Protocol[] {
  return protocols.filter(
    (protocol) => !protocol.claimed && canClaimProtocol(protocol, player),
  );
}

export function applyNodePurchase(
  gameState: GameState,
  player: Player,
  node: Node,
  payment: Record<EnergyType, number>,
): GameState {
  const newState = {
    ...gameState,
    energyPool: { ...gameState.energyPool },
    players: [...gameState.players],
    marketNodes: gameState.marketNodes.map((row) => [...row]),
    decks: gameState.decks.map((deck) => [...deck]),
  };
  const playerIndex = newState.players.findIndex((p) => p.id === player.id);
  const newPlayer = { ...newState.players[playerIndex] };

  Object.entries(payment).forEach(([type, amount]) => {
    newPlayer.energy[type as EnergyType] -= amount;
  });

  newPlayer.nodes = [...newPlayer.nodes, node];
  newPlayer.efficiency += node.efficiency;

  if (Object.keys(newPlayer.pendingEffects.discount).length > 0) {
    newPlayer.pendingEffects.discount = {};
  }

  if (
    node.effectType === "discount" &&
    node.effectTarget &&
    node.effectTarget !== "flux" &&
    node.effectValue
  ) {
    const existing =
      newPlayer.pendingEffects.discount[node.effectTarget] || 0;
    newPlayer.pendingEffects.discount[node.effectTarget] =
      existing + node.effectValue;
  }

  if (
    node.effectType === "multiplier" &&
    node.effectTarget &&
    node.effectTarget !== "flux" &&
    node.effectValue
  ) {
    const existing =
      newPlayer.pendingEffects.multiplier[node.effectTarget] || 0;
    newPlayer.pendingEffects.multiplier[node.effectTarget] =
      existing + Math.max(node.effectValue - 1, 0);
  }

  if (node.effectType === "draw" && node.effectValue) {
    newPlayer.pendingEffects.draw += node.effectValue;
  }

  if (node.effectType === "swap" && node.effectValue) {
    newPlayer.pendingEffects.swap += node.effectValue;
  }

  Object.entries(payment).forEach(([type, amount]) => {
    newState.energyPool[type as EnergyType] += amount;
  });

  const isReserved = newPlayer.reservedNodes.some(
    (reserved) => reserved.id === node.id,
  );
  if (isReserved) {
    newPlayer.reservedNodes = newPlayer.reservedNodes.filter(
      (reserved) => reserved.id !== node.id,
    );
  } else {
    for (let i = 0; i < newState.marketNodes.length; i += 1) {
      const rowIndex = newState.marketNodes[i].findIndex(
        (marketNode) => marketNode?.id === node.id,
      );
      if (rowIndex !== -1) {
        const replacement = newState.decks[i].pop() || null;
        newState.marketNodes[i][rowIndex] = replacement;
        break;
      }
    }
  }

  newState.players[playerIndex] = newPlayer;
  return newState;
}

export function applyEnergyCollection(
  gameState: GameState,
  player: Player,
  energyTypes: EnergyType[],
): GameState {
  const newState = {
    ...gameState,
    energyPool: { ...gameState.energyPool },
    players: [...gameState.players],
  };
  const playerIndex = newState.players.findIndex((p) => p.id === player.id);
  const newPlayer = { ...newState.players[playerIndex] };

  energyTypes.forEach((type) => {
    if (newState.energyPool[type] > 0) {
      newPlayer.energy[type] += 1;
      newState.energyPool[type] -= 1;
    }
  });

  newState.players[playerIndex] = newPlayer;
  return newState;
}

export function applyNodeReservation(
  gameState: GameState,
  player: Player,
  node: Node,
  fromMarket: boolean,
): GameState {
  const newState = {
    ...gameState,
    energyPool: { ...gameState.energyPool },
    players: [...gameState.players],
    marketNodes: gameState.marketNodes.map((row) => [...row]),
    decks: gameState.decks.map((deck) => [...deck]),
  };
  if (newState.energyPool.flux <= 0) {
    return newState;
  }
  const playerIndex = newState.players.findIndex((p) => p.id === player.id);
  const newPlayer = { ...newState.players[playerIndex] };

  if (newPlayer.reservedNodes.length < MAX_RESERVED_NODES) {
    newPlayer.reservedNodes = [...newPlayer.reservedNodes, node];

    newPlayer.energy.flux += 1;
    newState.energyPool.flux -= 1;

    if (fromMarket) {
      for (let i = 0; i < newState.marketNodes.length; i += 1) {
        const rowIndex = newState.marketNodes[i].findIndex(
          (marketNode) => marketNode?.id === node.id,
        );
        if (rowIndex !== -1) {
          const replacement = newState.decks[i].pop() || null;
          newState.marketNodes[i][rowIndex] = replacement;
          break;
        }
      }
    }
  }

  newState.players[playerIndex] = newPlayer;
  return newState;
}

export function getDrawOptions(
  gameState: GameState,
  category: NodeCategory,
  count: number,
): Node[] {
  const categoryIndexMap: Record<NodeCategory, number> = {
    research: 0,
    production: 1,
    network: 2,
    control: 3,
  };
  const index = categoryIndexMap[category];
  const deck = gameState.decks[index] || [];
  return deck.slice(0, count);
}

export function applyDrawEffect(
  gameState: GameState,
  player: Player,
  category: NodeCategory,
  chosenNode: Node,
): GameState {
  const newState = {
    ...gameState,
    players: [...gameState.players],
    marketNodes: gameState.marketNodes.map((row) => [...row]),
    decks: gameState.decks.map((deck) => [...deck]),
  };
  const playerIndex = newState.players.findIndex((p) => p.id === player.id);
  const newPlayer = { ...newState.players[playerIndex] };

  const categoryIndexMap: Record<NodeCategory, number> = {
    research: 0,
    production: 1,
    network: 2,
    control: 3,
  };
  const index = categoryIndexMap[category];

  const deck = newState.decks[index];
  const chosenIndex = deck.findIndex((node) => node.id === chosenNode.id);
  if (chosenIndex !== -1) {
    deck.splice(chosenIndex, 1);
  } else {
    return newState;
  }

  const row = newState.marketNodes[index];
  const replaceIndex = row.length > 0 ? row.length - 1 : 0;
  const replaced = row[replaceIndex];
  row[replaceIndex] = chosenNode;
  if (replaced) {
    deck.push(replaced);
  }

  newPlayer.pendingEffects.draw = 0;
  newState.players[playerIndex] = newPlayer;
  return newState;
}

export function applySwapEffect(
  gameState: GameState,
  player: Player,
  give: EnergyType[],
  take: EnergyType[],
): GameState {
  const newState = {
    ...gameState,
    energyPool: { ...gameState.energyPool },
    players: [...gameState.players],
  };
  const playerIndex = newState.players.findIndex((p) => p.id === player.id);
  const newPlayer = { ...newState.players[playerIndex] };

  if (
    give.length !== take.length ||
    give.length === 0 ||
    give.includes("flux") ||
    take.includes("flux")
  ) {
    return newState;
  }

  const giveCounts: Partial<Record<EnergyType, number>> = {};
  const takeCounts: Partial<Record<EnergyType, number>> = {};

  give.forEach((type) => {
    if (type === "flux") {
      return;
    }
    giveCounts[type] = (giveCounts[type] || 0) + 1;
  });
  take.forEach((type) => {
    if (type === "flux") {
      return;
    }
    takeCounts[type] = (takeCounts[type] || 0) + 1;
  });

  const giveValid = (Object.entries(giveCounts) as [EnergyType, number][]).every(
    ([type, count]) => newPlayer.energy[type] >= count,
  );
  const takeValid = (Object.entries(takeCounts) as [EnergyType, number][]).every(
    ([type, count]) => newState.energyPool[type] >= count,
  );

  if (!giveValid || !takeValid) {
    return newState;
  }

  give.forEach((type) => {
    if (type === "flux") {
      return;
    }
    newPlayer.energy[type] -= 1;
    newState.energyPool[type] += 1;
  });

  take.forEach((type) => {
    if (type === "flux") {
      return;
    }
    newState.energyPool[type] -= 1;
    newPlayer.energy[type] += 1;
  });

  newPlayer.pendingEffects.swap = 0;
  newState.players[playerIndex] = newPlayer;
  return newState;
}

export function applyProtocolClaim(
  gameState: GameState,
  player: Player,
  protocol: Protocol,
): GameState {
  const newState = {
    ...gameState,
    players: [...gameState.players],
    protocols: [...gameState.protocols],
  };
  const playerIndex = newState.players.findIndex((p) => p.id === player.id);
  const newPlayer = { ...newState.players[playerIndex] };

  newPlayer.protocols = [
    ...newPlayer.protocols,
    { ...protocol, claimed: true },
  ];
  newPlayer.efficiency += protocol.efficiency;
  newPlayer.pendingEffects.multiplier = {};

  const protocolIndex = newState.protocols.findIndex(
    (p) => p.id === protocol.id,
  );
  if (protocolIndex !== -1) {
    newState.protocols[protocolIndex] = { ...protocol, claimed: true };
  }

  newState.players[playerIndex] = newPlayer;
  return newState;
}

export function applyEnergyDiscard(
  gameState: GameState,
  player: Player,
  discards: EnergyType[],
): GameState {
  const newState = {
    ...gameState,
    energyPool: { ...gameState.energyPool },
    players: [...gameState.players],
  };
  const playerIndex = newState.players.findIndex((p) => p.id === player.id);
  const newPlayer = { ...newState.players[playerIndex] };

  discards.forEach((type) => {
    if (newPlayer.energy[type] > 0) {
      newPlayer.energy[type] -= 1;
      newState.energyPool[type] += 1;
    }
  });

  newState.players[playerIndex] = newPlayer;
  return newState;
}

export function validateEnergyCollection(
  energyTypes: EnergyType[],
  energyPool: Record<EnergyType, number>,
): { valid: boolean; error?: string } {
  if (energyTypes.length === 2) {
    if (energyTypes[0] !== energyTypes[1]) {
      return {
        valid: false,
        error: "Must collect 2 of the same type or 3 different types",
      };
    }
    if (energyTypes[0] === "flux") {
      return { valid: false, error: "Cannot collect 2 flux" };
    }
    if (energyPool[energyTypes[0]] < 4) {
      return {
        valid: false,
        error: "Need 4+ in pool to collect 2 of the same type",
      };
    }
  } else if (energyTypes.length === 3) {
    const uniqueTypes = new Set(energyTypes);
    if (uniqueTypes.size !== 3) {
      return { valid: false, error: "Must collect 3 different energy types" };
    }
    if (energyTypes.includes("flux")) {
      return { valid: false, error: "Cannot collect flux this way" };
    }
  } else if (energyTypes.length === 1 && energyTypes[0] === "flux") {
    return { valid: true };
  } else {
    return { valid: false, error: "Must collect 2 same or 3 different" };
  }

  return { valid: true };
}

export function mustDiscardEnergy(player: Player): boolean {
  return getTotalEnergy(player) > ENERGY_LIMIT;
}

export function getEnergyPoolMax(
  gameState: GameState,
): Record<Exclude<EnergyType, "flux">, number> {
  const playerCount = gameState.players.length;
  const energyCount =
    ENERGY_POOL_BY_PLAYERS[playerCount] || ENERGY_POOL_BY_PLAYERS[4];
  return {
    solar: energyCount,
    hydro: energyCount,
    plasma: energyCount,
    neural: energyCount,
  };
}

export function canExchangeEnergy(
  gameState: GameState,
  player: Player,
  takeType: Exclude<EnergyType, "flux">,
  takeCount: number,
  give: Exclude<EnergyType, "flux">[],
): boolean {
  if (takeCount <= 0) {
    return false;
  }
  if (give.length !== (takeCount === 2 ? 3 : 1)) {
    return false;
  }

  const poolMax = getEnergyPoolMax(gameState);
  if ((gameState.energyPool[takeType] || 0) < takeCount) {
    return false;
  }

  const giveCounts: Partial<Record<Exclude<EnergyType, "flux">, number>> = {};
  give.forEach((type) => {
    giveCounts[type] = (giveCounts[type] || 0) + 1;
  });

  const hasEnergy = (Object.entries(giveCounts) as [
    Exclude<EnergyType, "flux">,
    number,
  ][]).every(([type, count]) => player.energy[type] >= count);
  if (!hasEnergy) {
    return false;
  }

  const poolAfterTake = {
    ...gameState.energyPool,
    [takeType]: gameState.energyPool[takeType] - takeCount,
  };
  const poolAfterGive = { ...poolAfterTake };
  (Object.entries(giveCounts) as [
    Exclude<EnergyType, "flux">,
    number,
  ][]).forEach(([type, count]) => {
    poolAfterGive[type] += count;
  });

  return (Object.entries(poolMax) as [
    Exclude<EnergyType, "flux">,
    number,
  ][]).every(([type, max]) => poolAfterGive[type] <= max);
}

export function applyExchangeEnergy(
  gameState: GameState,
  player: Player,
  takeType: Exclude<EnergyType, "flux">,
  takeCount: number,
  give: Exclude<EnergyType, "flux">[],
): GameState {
  if (!canExchangeEnergy(gameState, player, takeType, takeCount, give)) {
    return gameState;
  }

  const newState = {
    ...gameState,
    energyPool: { ...gameState.energyPool },
    players: [...gameState.players],
  };
  const playerIndex = newState.players.findIndex((p) => p.id === player.id);
  const newPlayer = { ...newState.players[playerIndex] };

  give.forEach((type) => {
    newPlayer.energy[type] -= 1;
    newState.energyPool[type] += 1;
  });

  newState.energyPool[takeType] -= takeCount;
  newPlayer.energy[takeType] += takeCount;

  newState.players[playerIndex] = newPlayer;
  return newState;
}
