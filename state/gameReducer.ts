import { GameState, Player } from '../types/game';

export type GameActionType =
  | { type: 'INIT'; payload: GameState }
  | { type: 'UPDATE'; payload: GameState }
  | { type: 'END'; payload: Player }
  | { type: 'RESET' };

export function gameReducer(state: GameState | null, action: GameActionType): GameState | null {
  switch (action.type) {
    case 'INIT':
      return action.payload;
    case 'UPDATE':
      return action.payload;
    case 'END':
      if (!state) {
        return state;
      }
      return { ...state, winner: action.payload, phase: 'ended' };
    case 'RESET':
      return null;
    default:
      return state;
  }
}
