import { createContext, useContext } from "react";
import { BotDifficulty, GameState } from "../types/game";
import { MatchStatePatch, MultiplayerSession, RealtimeAction } from "@/types/realtime";

export interface GameContextValue {
  gameState: GameState | null;
  multiplayerSession: MultiplayerSession;
  lastActionPatch: MatchStatePatch | null;
  initializeGame: (
    playerCount: number,
    botCount?: number,
    botDifficulty?: BotDifficulty,
  ) => void;
  updateGameState: (nextState: GameState) => void;
  endGame: (finalState: GameState) => void;
  resetGame: () => void;
  createMultiplayerMatch: (name: string, maxPlayers?: number) => Promise<void>;
  quickMultiplayerMatch: (name: string, maxPlayers?: number) => Promise<void>;
  joinMultiplayerMatch: (matchId: string, name: string) => Promise<void>;
  leaveMultiplayerMatch: () => Promise<void>;
  submitMultiplayerAction: (action: RealtimeAction) => Promise<boolean>;
  startMultiplayerMatch: () => Promise<void>;
  setLobbyReady: (ready: boolean) => Promise<void>;
}

export const GameContext = createContext<GameContextValue | null>(null);

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within GameProvider");
  }
  return context;
}
