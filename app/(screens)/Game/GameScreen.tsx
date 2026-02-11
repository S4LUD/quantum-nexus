import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, Vibration, View } from "react-native";
import { useRouter } from "expo-router";
import { GameTab, GameTabs } from "@/components/domain/game/GameTabs";
import { useGame } from "@/state/GameContext";
import { Screen } from "@/components/layout/Screen";
import { createGameStyles } from "@/components/domain/game/game.styles";
import { GameHeader } from "@/components/domain/game/GameHeader";
import { EndGameScreen } from "@/components/domain/game/EndGameScreen/EndGameScreen";
import { GameBoard } from "@/components/domain/game/GameBoard";
import { LeaveGameModal } from "@/components/domain/game/LeaveGameModal";
import { PlayerArea } from "@/components/domain/game/PlayerArea/PlayerArea";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { useBotTurn } from "@/hooks/useBotTurn";
import {
  BotNotice,
  BotNoticeItem,
} from "@/components/domain/game/BotNotice/BotNotice";
import { animations } from "@/constants/animations";
import { useTheme } from "@/hooks/useTheme";
import { canAffordNode, canClaimProtocol } from "@/logic/gameEngine";
import { useSound } from "@/hooks/useSound";
import { useTranslation } from "react-i18next";
import { getLocalizedPlayerName } from "@/utils/helpers";
import { RealtimeAction } from "@/types/realtime";

const BOT_NOTICE_DURATION_MS = Math.round(animations.botNotice * 1);
const TURN_VIBRATION_MS = 60;
const QUICK_MATCH_RECONNECT_MS = 60000;
const LOBBY_RECONNECT_MS = 180000;
const HOME_ROUTE = "/(screens)/Home/HomeScreen";
const MULTIPLAYER_ACTION_NOTICE_KEYS: Record<
  RealtimeAction["type"],
  string | null
> = {
  COLLECT_ENERGY: "botNotice.collectedEnergy",
  RESERVE_NODE: "botNotice.reservedNode",
  BUILD_NODE: "botNotice.builtNode",
  CLAIM_PROTOCOL: "botNotice.claimedProtocol",
  EXCHANGE_ENERGY: "botNotice.exchangedEnergy",
  END_TURN: null,
  APPLY_RECLAIM: null,
  SKIP_RECLAIM: null,
  APPLY_SWAP: null,
  SKIP_SWAP: null,
};

export function GameScreen() {
  const router = useRouter();
  const {
    gameState,
    resetGame,
    updateGameState,
    endGame,
    initializeGame,
    multiplayerSession,
    submitMultiplayerAction,
    leaveMultiplayerMatch,
    lastActionPatch,
    lastRejectedError,
    lastRejectedAt,
  } = useGame();
  const [selectedTab, setSelectedTab] = useState<GameTab>("market");
  const [botNotices, setBotNotices] = useState<BotNoticeItem[]>([]);
  const { runBotTurn } = useBotTurn();
  const lastBotKeyRef = useRef<string | null>(null);
  const botNoticeTimersRef = useRef<
    Record<number, ReturnType<typeof setTimeout>>
  >({});
  const nextBotNoticeIdRef = useRef(1);
  const botTurnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startNoticeShownRef = useRef(false);
  const turnKeyRef = useRef<string | null>(null);
  const lastPatchRef = useRef<string | null>(null);
  const lastRejectedRef = useRef(0);
  const playerConnectionRef = useRef<Record<string, boolean>>({});
  const serverClockRef = useRef<{ serverMs: number; localMs: number } | null>(
    null,
  );
  const { theme } = useTheme();
  const { play } = useSound();
  const { t } = useTranslation();
  const gameStyles = useMemo(() => createGameStyles(theme), [theme]);
  const hasDisconnectedPlayers = useMemo(
    () =>
      Boolean(
        multiplayerSession.active &&
          gameState?.players.some((player) => !player.connected),
      ),
    [gameState?.players, multiplayerSession.active],
  );
  const [nowMs, setNowMs] = useState(Date.now());
  const [isLeaveGameModalOpen, setIsLeaveGameModalOpen] = useState(false);
  const [localDisconnectAtMs, setLocalDisconnectAtMs] = useState<number | null>(
    null,
  );
  useEffect(() => {
    if (!gameState?.updatedAt) {
      return;
    }
    const parsed = Date.parse(gameState.updatedAt);
    if (Number.isNaN(parsed)) {
      return;
    }
    serverClockRef.current = { serverMs: parsed, localMs: Date.now() };
  }, [gameState?.updatedAt]);

  useEffect(() => {
    if (multiplayerSession.isConnected) {
      setLocalDisconnectAtMs(null);
      return;
    }
    setLocalDisconnectAtMs((prev) => prev ?? Date.now());
  }, [multiplayerSession.isConnected]);

  useEffect(() => {
    if (!hasDisconnectedPlayers) {
      return;
    }
    const interval = setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [hasDisconnectedPlayers]);

  const reconnectGraceMs = multiplayerSession.isQuickMatch
    ? QUICK_MATCH_RECONNECT_MS
    : LOBBY_RECONNECT_MS;
  const disconnectedPlayer = useMemo(
    () => gameState?.players.find((player) => !player.connected) || null,
    [gameState?.players],
  );
  const reconnectCountdown = useMemo(() => {
    if (!disconnectedPlayer) {
      return null;
    }
    const clock = serverClockRef.current;
    const disconnectedAtMs = disconnectedPlayer.disconnectedAt
      ? Date.parse(disconnectedPlayer.disconnectedAt)
      : Number.NaN;
    const hasServerTime = clock && !Number.isNaN(disconnectedAtMs);
    const serverNowMs = hasServerTime
      ? clock.serverMs + (nowMs - clock.localMs)
      : nowMs;
    const baseDisconnectedAtMs =
      hasServerTime
        ? disconnectedAtMs
        : localDisconnectAtMs ?? disconnectedAtMs;
    if (!Number.isFinite(baseDisconnectedAtMs)) {
      return null;
    }
    const remainingMs = Math.max(
      reconnectGraceMs - (serverNowMs - baseDisconnectedAtMs),
      0,
    );
    return Math.ceil(remainingMs / 1000);
  }, [
    disconnectedPlayer,
    localDisconnectAtMs,
    nowMs,
    reconnectGraceMs,
  ]);

  const tabBadges = useMemo(() => {
    if (!gameState) {
      return { market: 0, protocols: 0, players: 0 };
    }
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (
      multiplayerSession.active &&
      gameState.players.some((player) => !player.connected)
    ) {
      return { market: 0, protocols: 0, players: 0 };
    }
    if (
      multiplayerSession.active &&
      multiplayerSession.playerId &&
      currentPlayer.id !== multiplayerSession.playerId
    ) {
      return { market: 0, protocols: 0, players: 0 };
    }
    const badgePlayer =
      multiplayerSession.active && multiplayerSession.playerId
        ? gameState.players.find(
            (player) => player.id === multiplayerSession.playerId,
          ) || currentPlayer
        : currentPlayer;
    if (badgePlayer.isBot) {
      return { market: 0, protocols: 0, players: 0 };
    }

    const marketNodes = gameState.marketNodes
      .flat()
      .filter((node) => node !== null);
    const market = marketNodes.filter((node) =>
      canAffordNode(node, badgePlayer),
    ).length;
    const protocols = gameState.protocols.filter(
      (protocol) =>
        !protocol.claimed && canClaimProtocol(protocol, badgePlayer),
    ).length;
    const players = badgePlayer.reservedNodes.filter((node) =>
      canAffordNode(node, badgePlayer),
    ).length;

    return { market, protocols, players };
  }, [gameState, multiplayerSession.active, multiplayerSession.playerId]);

  const isInProgressGame = Boolean(
    gameState && !gameState.winner && gameState.phase === "playing",
  );

  const handleExitToHome = useCallback(() => {
    if (multiplayerSession.active) {
      void leaveMultiplayerMatch();
    }
    resetGame();
    router.replace(HOME_ROUTE);
  }, [leaveMultiplayerMatch, multiplayerSession.active, resetGame, router]);

  const handleBack = useCallback(() => {
    if (!isInProgressGame) {
      handleExitToHome();
      return;
    }
    setIsLeaveGameModalOpen(true);
  }, [handleExitToHome, isInProgressGame]);

  const handleCancelLeaveGame = useCallback(() => {
    setIsLeaveGameModalOpen(false);
  }, []);

  const handleConfirmLeaveGame = useCallback(() => {
    setIsLeaveGameModalOpen(false);
    handleExitToHome();
  }, [handleExitToHome]);

  const handleTabChange = useCallback((tab: GameTab) => {
    setSelectedTab(tab);
  }, []);

  const handleReplay = useCallback(() => {
    if (multiplayerSession.active) {
      return;
    }
    const count = gameState ? gameState.players.length : 2;
    const bots = gameState
      ? gameState.players.filter((player) => player.isBot).length
      : 1;
    const difficulty = gameState
      ? gameState.players.find((player) => player.isBot)?.botDifficulty ||
        "easy"
      : "easy";
    initializeGame(count, bots, difficulty);
  }, [gameState, initializeGame, multiplayerSession.active]);

  const removeBotNotice = useCallback((noticeId: number) => {
    setBotNotices((prev) => prev.filter((notice) => notice.id !== noticeId));
    const timer = botNoticeTimersRef.current[noticeId];
    if (timer) {
      clearTimeout(timer);
      delete botNoticeTimersRef.current[noticeId];
    }
  }, []);

  const pushBotNotice = useCallback(
    (message: string) => {
      const noticeId = nextBotNoticeIdRef.current;
      nextBotNoticeIdRef.current += 1;
      setBotNotices((prev) => {
        const next = [...prev, { id: noticeId, message }];
        if (next.length > 3) {
          const [removed] = next;
          if (removed) {
            const oldTimer = botNoticeTimersRef.current[removed.id];
            if (oldTimer) {
              clearTimeout(oldTimer);
              delete botNoticeTimersRef.current[removed.id];
            }
          }
          return next.slice(1);
        }
        return next;
      });
      botNoticeTimersRef.current[noticeId] = setTimeout(
        () => removeBotNotice(noticeId),
        BOT_NOTICE_DURATION_MS,
      );
    },
    [removeBotNotice],
  );

  const handleSubmitMultiplayerAction = useCallback(
    async (action: RealtimeAction) => {
      const ok = await submitMultiplayerAction(action);
      if (!ok) {
        if (!multiplayerSession.isConnected) {
          pushBotNotice(t("game.connectionLost"));
        } else {
          pushBotNotice(t("game.actionFailed"));
        }
      }
      return ok;
    },
    [multiplayerSession.isConnected, pushBotNotice, submitMultiplayerAction, t],
  );

  useEffect(() => {
    if (!gameState) {
      startNoticeShownRef.current = false;
      return;
    }
    if (gameState.turnCount !== 0 || startNoticeShownRef.current) {
      return;
    }
    const starter = gameState.players[gameState.currentPlayerIndex];
    const starterName = getLocalizedPlayerName(starter.name, t);
    startNoticeShownRef.current = true;
    pushBotNotice(t("game.startingPlayerNotice", { name: starterName }));
  }, [gameState, pushBotNotice, t]);

  useEffect(() => {
    if (!lastActionPatch || !gameState) {
      return;
    }
    if (lastPatchRef.current === lastActionPatch.lastActionId) {
      return;
    }
    lastPatchRef.current = lastActionPatch.lastActionId;
    const noticeKey =
      MULTIPLAYER_ACTION_NOTICE_KEYS[lastActionPatch.action.type];
    if (!noticeKey) {
      return;
    }
    const actor = gameState.players.find(
      (player) => player.id === lastActionPatch.actorPlayerId,
    );
    const actorName = actor
      ? getLocalizedPlayerName(actor.name, t)
      : t("game.player");
    const message = t(noticeKey, { name: actorName });
    if (message !== noticeKey) {
      pushBotNotice(message);
    }
  }, [gameState, lastActionPatch, pushBotNotice, t]);

  useEffect(() => {
    if (!multiplayerSession.active || !gameState) {
      return;
    }
    const previousConnections = playerConnectionRef.current;
    const nextConnections: Record<string, boolean> = {};
    const hasPrevious = Object.keys(previousConnections).length > 0;
    gameState.players.forEach((player) => {
      nextConnections[player.id] = player.connected;
      const wasConnected = previousConnections[player.id];
      if (!hasPrevious && !player.connected) {
        pushBotNotice(
          t("game.playerDisconnected", {
            name: getLocalizedPlayerName(player.name, t),
          }),
        );
        pushBotNotice(
          t("game.waitingForReconnect", {
            name: getLocalizedPlayerName(player.name, t),
          }),
        );
        return;
      }
      if (wasConnected === undefined) {
        return;
      }
      if (wasConnected && !player.connected) {
        pushBotNotice(
          t("game.playerDisconnected", {
            name: getLocalizedPlayerName(player.name, t),
          }),
        );
        pushBotNotice(
          t("game.waitingForReconnect", {
            name: getLocalizedPlayerName(player.name, t),
          }),
        );
      }
      if (!wasConnected && player.connected) {
        pushBotNotice(
          t("game.playerReconnected", {
            name: getLocalizedPlayerName(player.name, t),
          }),
        );
      }
    });
    playerConnectionRef.current = nextConnections;
  }, [gameState, multiplayerSession.active, pushBotNotice, t]);


  useEffect(() => {
    if (!lastRejectedError || lastRejectedAt === 0) {
      return;
    }
    if (lastRejectedRef.current === lastRejectedAt) {
      return;
    }
    lastRejectedRef.current = lastRejectedAt;
    if (lastRejectedError.message) {
      pushBotNotice(lastRejectedError.message);
    }
  }, [lastRejectedAt, lastRejectedError, pushBotNotice]);

  useEffect(() => {
    if (multiplayerSession.active) {
      return;
    }
    if (!gameState || gameState.winner || gameState.phase !== "playing") {
      return;
    }
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (!currentPlayer.isBot) {
      return;
    }
    const botKey = `${gameState.currentPlayerIndex}-${gameState.turnCount}`;
    if (lastBotKeyRef.current === botKey) {
      return;
    }
    lastBotKeyRef.current = botKey;

    if (botTurnTimerRef.current) {
      clearTimeout(botTurnTimerRef.current);
    }
    botTurnTimerRef.current = setTimeout(() => {
      const result = runBotTurn(gameState, currentPlayer.botDifficulty);
      if (result.notice.length > 0) {
        const message = result.notice
          .map((notice) => {
            const params = notice.params?.name
              ? {
                  ...notice.params,
                  name: getLocalizedPlayerName(String(notice.params.name), t),
                }
              : notice.params;
            const primary = t(notice.key, params);
            if (primary !== notice.key) {
              return primary;
            }
            if (notice.key.startsWith("botNotice.")) {
              const fallbackKey = `bot.${notice.key.split(".")[1]}`;
              const fallback = t(fallbackKey, params);
              if (fallback !== fallbackKey) {
                return fallback;
              }
            }
            return primary;
          })
          .join(" · ");
        pushBotNotice(message);
      }
      if (result.winner) {
        const finalState = { ...result.nextState, winner: result.winner };
        endGame(finalState);
        return;
      }
      updateGameState(result.nextState);
    }, animations.botTurnDelay);
  }, [
    endGame,
    gameState,
    multiplayerSession.active,
    pushBotNotice,
    runBotTurn,
    t,
    updateGameState,
  ]);

  useEffect(() => {
    if (!gameState || gameState.winner || gameState.phase !== "playing") {
      return;
    }
    const turnKey = `${gameState.currentPlayerIndex}-${gameState.turnCount}`;
    if (turnKeyRef.current === turnKey) {
      return;
    }
    turnKeyRef.current = turnKey;
    play("secondary_click");
    if (multiplayerSession.active) {
      const activePlayer = gameState.players[gameState.currentPlayerIndex];
      const isLocalTurn =
        multiplayerSession.playerId &&
        activePlayer.id === multiplayerSession.playerId;
      const message = isLocalTurn
        ? t("game.yourTurnNotice")
        : t("game.playerTurnNotice", {
            name: getLocalizedPlayerName(activePlayer.name, t),
          });
      if (message) {
        pushBotNotice(message);
      }
      if (isLocalTurn) {
        Vibration.vibrate(TURN_VIBRATION_MS);
      }
    }
  }, [
    gameState,
    multiplayerSession.active,
    multiplayerSession.playerId,
    play,
    pushBotNotice,
    t,
  ]);

  useEffect(() => {
    return () => {
      const noticeTimers = Object.values(botNoticeTimersRef.current);
      noticeTimers.forEach(clearTimeout);
      botNoticeTimersRef.current = {};
      if (botTurnTimerRef.current) {
        clearTimeout(botTurnTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const onHardwareBackPress = () => {
      handleBack();
      return true;
    };
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      onHardwareBackPress,
    );
    return () => {
      subscription.remove();
    };
  }, [handleBack]);

  return (
    <Screen
      disableHorizontalPadding
      disableTopPadding
      disableBottomPadding
      disableTopSafeArea
    >
      <View style={gameStyles.container}>
        {gameState ? (
          <>
            <BotNotice messages={botNotices} />
            {!gameState.winner ? (
              <View style={gameStyles.overlay} pointerEvents="box-none">
                <View
                  style={[gameStyles.paddedSection, gameStyles.overlayPanel]}
                >
                  <GameHeader
                    title={t("home.title")}
                    turnCount={gameState.turnCount}
                    playerName={getLocalizedPlayerName(
                      gameState.players[gameState.currentPlayerIndex].name,
                      t,
                    )}
                    efficiency={
                      gameState.players[gameState.currentPlayerIndex].efficiency
                    }
                    onBack={handleBack}
                  />
                  <GameTabs
                    selectedTab={selectedTab}
                    onTabChange={handleTabChange}
                    marketBadgeCount={tabBadges.market}
                    protocolsBadgeCount={tabBadges.protocols}
                    playersBadgeCount={tabBadges.players}
                  />
                </View>
              </View>
            ) : null}
            {gameState.winner ? (
              <EndGameScreen
                players={gameState.players}
                winner={gameState.winner}
                onReplay={handleReplay}
                onMainMenu={handleBack}
              />
            ) : (
              <>
                <GameBoard
                  gameState={gameState}
                  selectedTab={selectedTab}
                  onUpdateGameState={updateGameState}
                  onEndGame={endGame}
                  isMultiplayer={multiplayerSession.active}
                  localPlayerId={multiplayerSession.playerId}
                  isConnected={multiplayerSession.isConnected}
                  reconnectingLabel={
                    reconnectCountdown !== null
                      ? t("game.reconnectingCountdown", {
                          seconds: reconnectCountdown,
                        })
                      : t("game.reconnecting")
                  }
                  pauseLabel={
                    hasDisconnectedPlayers
                      ? t("game.gamePausedReconnect", {
                          name: disconnectedPlayer
                            ? getLocalizedPlayerName(disconnectedPlayer.name, t)
                            : t("game.player"),
                          seconds:
                            reconnectCountdown ??
                            Math.ceil(reconnectGraceMs / 1000),
                        })
                      : null
                  }
                  onSubmitMultiplayerAction={handleSubmitMultiplayerAction}
                />
                <View style={gameStyles.footerOverlay} pointerEvents="box-none">
                  <View
                    style={[gameStyles.paddedSection, gameStyles.footerPanel]}
                  >
                    <PlayerArea
                      player={gameState.players[gameState.currentPlayerIndex]}
                      isCurrentPlayer
                      compact
                    />
                  </View>
                </View>
              </>
            )}
            <LeaveGameModal
              isOpen={isLeaveGameModalOpen}
              title={t("game.leaveGameTitle")}
              message={t("game.leaveGameMessage")}
              confirmLabel={t("game.leaveGameConfirm")}
              cancelLabel={t("game.leaveGameCancel")}
              onConfirm={handleConfirmLeaveGame}
              onCancel={handleCancelLeaveGame}
            />
          </>
        ) : (
          <View style={gameStyles.centerContent}>
            <Text>{t("game.noActiveGame")}</Text>
            <Button
              label={t("common.back")}
              onPress={handleBack}
              variant="secondary"
            />
          </View>
        )}
      </View>
    </Screen>
  );
}

export default GameScreen;
