import { ReactNode, useMemo, useReducer } from 'react';
import { GameContext } from './GameContext';
import { gameReducer } from './gameReducer';
import { BotDifficulty, GameState, Player } from '../types/game';
import { createInitialGameState } from '../logic/gameEngine';

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [gameState, dispatch] = useReducer(gameReducer, null as GameState | null);

  const initializeGame = (
    playerCount: number,
    botCount = 0,
    botDifficulty: BotDifficulty = 'easy',
  ) => {
    dispatch({
      type: 'INIT',
      payload: createInitialGameState(playerCount, botCount, botDifficulty),
    });
  };

  const updateGameState = (nextState: GameState) => {
    dispatch({ type: 'UPDATE', payload: nextState });
  };

  const endGame = (winner: Player) => {
    dispatch({ type: 'END', payload: winner });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET' });
  };

  const value = useMemo(
    () => ({
      gameState,
      initializeGame,
      updateGameState,
      endGame,
      resetGame,
    }),
    [gameState]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
