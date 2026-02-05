import { checkWinConditions } from "@/logic/gameEngine";
import { GameState, Player } from "@/types";
import { useCallback } from "react";

interface TurnManagerParams {
  gameState: GameState;
  onUpdate: (nextState: GameState) => void;
  onEnd: (winner: Player) => void;
}

export function useTurnManager({
  gameState,
  onUpdate,
  onEnd,
}: TurnManagerParams) {
  const endTurn = useCallback(() => {
    const winner = checkWinConditions(gameState);
    if (winner) {
      onEnd(winner);
      return;
    }

    const nextState = { ...gameState };
    nextState.currentPlayerIndex =
      (nextState.currentPlayerIndex + 1) % nextState.players.length;
    nextState.turnCount = (nextState.turnCount || 0) + 1;

    onUpdate(nextState);
  }, [gameState, onEnd, onUpdate]);

  return { endTurn };
}
