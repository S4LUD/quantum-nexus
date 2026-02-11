import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "expo-router";
import { Screen } from "@/components/layout/Screen";
import { MultiplayerScreen as MultiplayerView } from "@/components/domain/home/MultiplayerScreen";
import { useGame } from "@/state/GameContext";
import { useTranslation } from "react-i18next";
import * as SecureStore from "expo-secure-store";
import { reportRuntimeError } from "@/utils/runtimeError";

const DEFAULT_MAX_PLAYERS = 4;
const PLAYER_NAME_STORAGE_KEY = "quantum_nexus_player_name";
const HOME_ROUTE = "/(screens)/Home/HomeScreen";

export function MultiplayerScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    gameState,
    multiplayerSession,
    createMultiplayerMatch,
    quickMultiplayerMatch,
    joinMultiplayerMatch,
  } = useGame();
  const [playerName, setPlayerName] = useState("");
  const [matchId, setMatchId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastPhaseRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;
    SecureStore.getItemAsync(PLAYER_NAME_STORAGE_KEY)
      .then((stored) => {
        if (!mounted || !stored) {
          return;
        }
        setPlayerName(stored);
      })
      .catch((error) => {
        reportRuntimeError(
          {
            scope: "MultiplayerScreen",
            action: "load_player_name",
          },
          error,
        );
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!multiplayerSession.active || !gameState) {
      return;
    }
    if (lastPhaseRef.current === gameState.phase) {
      return;
    }
    lastPhaseRef.current = gameState.phase;
    if (gameState.phase === "lobby") {
      router.replace("/(screens)/Lobby");
      return;
    }
    if (gameState.phase === "playing") {
      router.replace("/(screens)/Game");
    }
  }, [gameState, multiplayerSession.active, router]);

  const handlePlayerNameChange = useCallback((value: string) => {
    setPlayerName(value);
    SecureStore.setItemAsync(PLAYER_NAME_STORAGE_KEY, value).catch((error) => {
      reportRuntimeError(
        {
          scope: "MultiplayerScreen",
          action: "save_player_name",
        },
        error,
      );
    });
  }, []);

  const handleMatchIdChange = useCallback((value: string) => {
    const normalized = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6);
    setMatchId(normalized);
  }, []);

  const handleCreateLobby = useCallback(async () => {
    if (playerName.trim().length === 0) {
      setErrorMessage(t("multiplayer.errors.enterName"));
      return;
    }
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await createMultiplayerMatch(playerName.trim(), DEFAULT_MAX_PLAYERS);
      setMatchId("");
      router.replace("/(screens)/Lobby");
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t("multiplayer.errors.create"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [createMultiplayerMatch, playerName, router, t]);

  const handleQuickMatch = useCallback(async () => {
    if (playerName.trim().length === 0) {
      setErrorMessage(t("multiplayer.errors.enterName"));
      return;
    }
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await quickMultiplayerMatch(playerName.trim(), DEFAULT_MAX_PLAYERS);
      setMatchId("");
      router.replace("/(screens)/Lobby");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : t("multiplayer.errors.quickMatch"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [playerName, quickMultiplayerMatch, router, t]);

  const handleJoinLobby = useCallback(async () => {
    if (playerName.trim().length === 0) {
      setErrorMessage(t("multiplayer.errors.enterName"));
      return;
    }
    if (matchId.trim().length === 0) {
      setErrorMessage(t("multiplayer.errors.enterLobbyId"));
      return;
    }
    try {
      setIsSubmitting(true);
      setErrorMessage("");
      await joinMultiplayerMatch(matchId.trim(), playerName.trim());
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : t("multiplayer.errors.join"),
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [joinMultiplayerMatch, matchId, playerName, t]);

  const handleBack = useCallback(() => {
    router.replace(HOME_ROUTE);
  }, [router]);

  return (
    <Screen disableTopPadding>
      <MultiplayerView
        playerName={playerName}
        matchId={matchId}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        onChangePlayerName={handlePlayerNameChange}
        onChangeMatchId={handleMatchIdChange}
        onQuickMatch={handleQuickMatch}
        onCreateLobby={handleCreateLobby}
        onJoinLobby={handleJoinLobby}
        onBack={handleBack}
      />
    </Screen>
  );
}

export default MultiplayerScreen;
