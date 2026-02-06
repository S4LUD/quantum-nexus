import { GameState, Node, Player, Protocol } from "@/types/game";
import { PublicMatchState } from "@/types/realtime";
import {
  researchNodes,
  productionNodes,
  networkNodes,
  controlNodes,
} from "@/logic/gameData";

const fallbackPlayerNames = ["Player 1", "Player 2", "Player 3", "Player 4"];
const avatarTokens = ["P1", "P2", "P3", "P4"];
const nodeMap = new Map(
  [...researchNodes, ...productionNodes, ...networkNodes, ...controlNodes].map(
    (node) => [node.id, node],
  ),
);

export function mapRealtimeStateToGameState(
  state: PublicMatchState,
): GameState {
  const players = state.players.map((player, index) =>
    mapPlayer(player, state, index),
  );
  const winner = state.board?.winnerPlayerId
    ? players.find((player) => player.id === state.board?.winnerPlayerId) ||
      null
    : null;
  const currentPlayerIndex = Math.max(
    0,
    state.players.findIndex(
      (player) => player.playerId === state.currentTurnPlayerId,
    ),
  );
  const marketNodes = state.board
    ? state.board.marketNodeIds.map((row) =>
        row.map((nodeId) => mapNode(nodeId)),
      )
    : [[], [], [], []];
  const decks = state.board
    ? [
        state.board.decksByCategory.research
          .map((nodeId) => mapNode(nodeId))
          .filter(isNode),
        state.board.decksByCategory.production
          .map((nodeId) => mapNode(nodeId))
          .filter(isNode),
        state.board.decksByCategory.network
          .map((nodeId) => mapNode(nodeId))
          .filter(isNode),
        state.board.decksByCategory.control
          .map((nodeId) => mapNode(nodeId))
          .filter(isNode),
      ]
    : [[], [], [], []];
  const protocols: Protocol[] = state.board
    ? state.board.protocols.map((protocol) => ({
        id: protocol.id,
        name: protocol.name,
        efficiency: protocol.efficiency,
        requirements: protocol.requirements,
        effect: protocol.effect,
        claimed: Boolean(protocol.claimedByPlayerId),
      }))
    : [];

  return {
    players,
    currentPlayerIndex,
    energyPool: state.board
      ? state.board.energyPool
      : { solar: 0, hydro: 0, plasma: 0, neural: 0, flux: 0 },
    marketNodes,
    decks,
    protocols,
    phase: state.phase,
    winner,
    selectedEnergy: [],
    selectedNode: null,
    turnCount: state.turnCount,
    winCondition: null,
  };
}

function mapPlayer(
  player: PublicMatchState["players"][number],
  state: PublicMatchState,
  index: number,
): Player {
  const resolvedName =
    player.name || fallbackPlayerNames[index] || `Player ${index + 1}`;
  const protocols: Protocol[] = state.board
    ? state.board.protocols
        .filter((protocol) => protocol.claimedByPlayerId === player.playerId)
        .map((protocol) => ({
          id: protocol.id,
          name: protocol.name,
          efficiency: protocol.efficiency,
          requirements: protocol.requirements,
          effect: protocol.effect,
          claimed: true,
        }))
    : [];

  return {
    id: player.playerId,
    name: resolvedName,
    avatar: avatarTokens[index] || `P${index + 1}`,
    energy: player.energy,
    nodes: player.nodeIds.map((nodeId) => mapNode(nodeId)).filter(isNode),
    reservedNodes: player.reservedNodeIds
      .map((nodeId) => mapNode(nodeId))
      .filter(isNode),
    protocols,
    efficiency: player.efficiency,
    isReady: player.isReady,
    isBot: false,
    botDifficulty: "easy",
    pendingEffects: {
      discount: {},
      multiplier: {},
      draw: 0,
      swap: 0,
    },
  };
}

function mapNode(nodeId: string | null): Node | null {
  if (!nodeId) {
    return null;
  }
  const node = nodeMap.get(nodeId);
  return node ? { ...node } : null;
}

function isNode(value: Node | null): value is Node {
  return value !== null;
}
