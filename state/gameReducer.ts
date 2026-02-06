import { GameState } from "../types/game";

export type GameActionType =
  | { type: "INIT"; payload: GameState }
  | { type: "UPDATE"; payload: GameState }
  | { type: "END"; payload: GameState }
  | { type: "RESET" };

export function gameReducer(
  state: GameState | null,
  action: GameActionType,
): GameState | null {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "UPDATE":
      return action.payload;
    case "END":
      return { ...action.payload, phase: "ended" };
    case "RESET":
      return null;
    default:
      return state;
  }
}
