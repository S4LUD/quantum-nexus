import { createContext, useContext } from 'react';
import { BotDifficulty, GameState, Player } from '../types/game';

export interface GameContextValue {
  gameState: GameState | null;
  initializeGame: (
    playerCount: number,
    botCount?: number,
    botDifficulty?: BotDifficulty,
  ) => void;
  updateGameState: (nextState: GameState) => void;
  endGame: (winner: Player) => void;
  resetGame: () => void;
}

export const GameContext = createContext<GameContextValue | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
