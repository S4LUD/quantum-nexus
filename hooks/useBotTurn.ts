import { selectBotMove } from "@/logic/botEngine";
import { BotDifficulty, GameState } from "@/types";
import { useCallback } from "react";

export function useBotTurn() {
  const runBotTurn = useCallback(
    (gameState: GameState, difficulty: BotDifficulty) => {
      return selectBotMove(gameState, difficulty);
    },
    [],
  );

  return { runBotTurn };
}
