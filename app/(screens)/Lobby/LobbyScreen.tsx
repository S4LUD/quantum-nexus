import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { LobbyScreen as LobbyView } from "@/components/domain/home/LobbyScreen";
import { useGame } from "@/state/GameContext";
import { useTranslation } from "react-i18next";

export function LobbyScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    gameState,
    multiplayerSession,
    leaveMultiplayerMatch,
    startMultiplayerMatch,
    setLobbyReady,
  } = useGame();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastPhaseRef = useRef<string | null>(null);

  useEffect(() => {
    if (!multiplayerSession.active) {
      router.replace("/(screens)/Multiplayer");
      return;
    }
    if (!gameState) {
      return;
    }
    if (lastPhaseRef.current === gameState.phase) {
      return;
    }
    lastPhaseRef.current = gameState.phase;
    if (gameState.phase === "playing") {
      router.replace("/(screens)/Game");
    }
  }, [gameState, multiplayerSession.active, router]);

  const handleLeaveLobby = useCallback(async () => {
    try {
      setIsSubmitting(true);
      await leaveMultiplayerMatch();
      if (router.canGoBack?.()) {
        router.back();
      } else {
        router.replace("/(screens)/Multiplayer");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t("lobby.errors.leave"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [leaveMultiplayerMatch, router, t]);

  const handleStartMatch = useCallback(async () => {
    try {
      setIsSubmitting(true);
      await startMultiplayerMatch();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t("lobby.errors.start"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [startMultiplayerMatch, t]);

  const handleToggleReady = useCallback(async () => {
    if (isSubmitting || !gameState || !multiplayerSession.playerId) {
      return;
    }
    const localPlayer = gameState.players.find(
      (player) => player.id === multiplayerSession.playerId,
    );
    const nextReady = !localPlayer?.isReady;
    try {
      setIsSubmitting(true);
      await setLobbyReady(nextReady);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t("lobby.errors.ready"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [gameState, isSubmitting, multiplayerSession.playerId, setLobbyReady, t]);


  return (
    <Screen>
      <LobbyView
        activeMatchId={multiplayerSession.matchId}
        lobbyPlayers={gameState?.players || []}
        hostPlayerId={multiplayerSession.hostPlayerId}
        localPlayerId={multiplayerSession.playerId}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onStartMatch={handleStartMatch}
        onLeaveLobby={handleLeaveLobby}
        onToggleReady={handleToggleReady}
      />
    </Screen>
  );
}

export default LobbyScreen;
