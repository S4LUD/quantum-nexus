export type EnergyType = 'solar' | 'hydro' | 'plasma' | 'neural' | 'flux';

export type NodeCategory = 'research' | 'production' | 'network' | 'control';

export type BotDifficulty = 'easy' | 'medium' | 'hard';

export interface Node {
  id: string;
  category: NodeCategory;
  efficiency: number;
  outputType: Exclude<EnergyType, 'flux'>;
  cost: Partial<Record<Exclude<EnergyType, 'flux'>, number>>;
  effectType?: 'multiplier' | 'discount' | 'reclaim' | 'swap';
  effectValue?: number;
  effectTarget?: EnergyType;
}

export interface Protocol {
  id: string;
  name: string;
  efficiency: number;
  requirements: Partial<Record<Exclude<EnergyType, 'flux'>, number>>;
  effect: string;
  claimed: boolean;
}

export interface Player {
  id: string;
  name: string;
  avatar: string;
  connected: boolean;
  disconnectedAt: string | null;
  energy: Record<EnergyType, number>;
  nodes: Node[];
  reservedNodes: Node[];
  protocols: Protocol[];
  efficiency: number;
  isReady: boolean;
  isBot: boolean;
  botDifficulty: BotDifficulty;
  pendingEffects: {
    discount: Partial<Record<Exclude<EnergyType, "flux">, number>>;
    multiplier: Partial<Record<Exclude<EnergyType, "flux">, number>>;
    reclaim: number;
    swap: number;
  };
}

export type GameAction =
  | { type: 'COLLECT_ENERGY'; types: EnergyType[] }
  | { type: 'BUILD_NODE'; node: Node; payment: Record<EnergyType, number> }
  | { type: 'RESERVE_NODE'; node: Node; fromMarket: boolean }
  | { type: 'CLAIM_PROTOCOL'; protocol: Protocol };

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  energyPool: Record<EnergyType, number>;
  marketNodes: (Node | null)[][];
  decks: Node[][];
  protocols: Protocol[];
  phase: 'splash' | 'menu' | 'lobby' | 'playing' | 'ended';
  winner: Player | null;
  selectedEnergy: EnergyType[];
  selectedNode: Node | null;
  turnCount: number;
  winCondition: 'efficiency' | 'network' | 'protocol' | null;
  updatedAt: string;
}
