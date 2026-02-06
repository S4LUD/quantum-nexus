export type MatchPhase = "lobby" | "playing" | "ended";

export type EnergyType = "solar" | "hydro" | "plasma" | "neural" | "flux";
export type BaseEnergyType = Exclude<EnergyType, "flux">;
export type NodeCategory = "research" | "production" | "network" | "control";

export type NodeDefinition = {
  id: string;
  category: NodeCategory;
  efficiency: number;
  outputType: BaseEnergyType;
  cost: Partial<Record<BaseEnergyType, number>>;
  effectType?: "multiplier" | "discount" | "draw" | "swap";
  effectValue?: number;
  effectTarget?: EnergyType;
};

export type ProtocolDefinition = {
  id: string;
  name: string;
  efficiency: number;
  requirements: Partial<Record<BaseEnergyType, number>>;
  effect: string;
  claimedByPlayerId: string | null;
};

export type MatchPlayerState = {
  playerId: string;
  name: string;
  connected: boolean;
  isReady: boolean;
  energy: Record<EnergyType, number>;
  nodeIds: string[];
  reservedNodeIds: string[];
  protocolIds: string[];
  efficiency: number;
};

export type MatchBoardState = {
  energyPool: Record<EnergyType, number>;
  marketNodeIds: (string | null)[][];
  decksByCategory: Record<NodeCategory, string[]>;
  protocols: ProtocolDefinition[];
  winnerPlayerId: string | null;
};

export type PublicMatchState = {
  matchId: string;
  phase: MatchPhase;
  hostPlayerId: string;
  players: MatchPlayerState[];
  currentTurnPlayerId: string | null;
  turnCount: number;
  stateVersion: number;
  updatedAt: string;
  board: MatchBoardState | null;
};

export type CollectEnergyAction = {
  type: "COLLECT_ENERGY";
  energy: EnergyType[];
};

export type BuildNodeAction = {
  type: "BUILD_NODE";
  nodeId: string;
};

export type ReserveNodeAction = {
  type: "RESERVE_NODE";
  nodeId: string;
  fromMarket: boolean;
};

export type ClaimProtocolAction = {
  type: "CLAIM_PROTOCOL";
  protocolId: string;
};

export type ExchangeEnergyAction = {
  type: "EXCHANGE_ENERGY";
  takeType: BaseEnergyType;
  takeCount: 1 | 2;
  give: BaseEnergyType[];
};

export type EndTurnAction = {
  type: "END_TURN";
};

export type RealtimeAction =
  | CollectEnergyAction
  | BuildNodeAction
  | ReserveNodeAction
  | ClaimProtocolAction
  | ExchangeEnergyAction
  | EndTurnAction;

export type MatchStatePatch = {
  matchId: string;
  stateVersion: number;
  turnCount: number;
  currentTurnPlayerId: string | null;
  updatedAt: string;
  lastActionId: string;
  actorPlayerId: string;
  action: RealtimeAction;
  phase: MatchPhase;
  board: MatchBoardState | null;
};

export type EventError = {
  code:
    | "UNAUTHORIZED"
    | "MATCH_NOT_FOUND"
    | "MATCH_FULL"
    | "ALREADY_JOINED"
    | "INVALID_ACTION"
    | "OUT_OF_TURN"
    | "DUPLICATE_ACTION"
    | "BAD_REQUEST"
    | "INTERNAL_ERROR";
  message: string;
};

export type MatchCreateResult = {
  playerId: string;
  state: PublicMatchState;
};

export type MatchQuickResult = {
  playerId: string;
  state: PublicMatchState;
};

export type MatchJoinResult = {
  playerId: string;
  state: PublicMatchState;
};

export type MatchLeaveResult = {
  state: PublicMatchState;
};

export type MatchStartResult = {
  state: PublicMatchState;
};

export type MatchReadyResult = {
  state: PublicMatchState;
};


export type ActionSubmitResult = {
  acceptedActionId: string;
  patch: MatchStatePatch;
  state: PublicMatchState;
};

export type ResyncRequestResult = {
  state: PublicMatchState;
};

export type MultiplayerSession = {
  active: boolean;
  matchId: string | null;
  playerId: string | null;
  playerName: string | null;
  hostPlayerId: string | null;
  isConnected: boolean;
};
