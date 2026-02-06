import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { GameTab, GameTabs } from "@/components/domain/game/GameTabs";
import { useGame } from "@/state/GameContext";
import { Screen } from "@/components/layout/Screen";
import { createGameStyles } from "@/components/domain/game/game.styles";
import { GameHeader } from "@/components/domain/game/GameHeader";
import { EndGameScreen } from "@/components/domain/game/EndGameScreen/EndGameScreen";
import { GameBoard } from "@/components/domain/game/GameBoard";
import { PlayerArea } from "@/components/domain/game/PlayerArea/PlayerArea";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { useBotTurn } from "@/hooks/useBotTurn";
import { BotNotice } from "@/components/domain/game/BotNotice/BotNotice";
import { animations } from "@/constants/animations";
import { useTheme } from "@/hooks/useTheme";
import { canAffordNode, canClaimProtocol } from "@/logic/gameEngine";
import { useSound } from "@/hooks/useSound";

export function GameScreen() {
  const router = useRouter();
  const { gameState, resetGame, updateGameState, endGame, initializeGame } =
    useGame();
  const [selectedTab, setSelectedTab] = useState<GameTab>("market");
  const [botNotice, setBotNotice] = useState("");
  const { runBotTurn } = useBotTurn();
  const lastBotKeyRef = useRef<string | null>(null);
  const botNoticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const botTurnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startNoticeShownRef = useRef(false);
  const turnKeyRef = useRef<string | null>(null);
  const { theme } = useTheme();
  const { play } = useSound();
  const gameStyles = useMemo(() => createGameStyles(theme), [theme]);

  const tabBadges = useMemo(() => {
    if (!gameState) {
      return { market: 0, protocols: 0, players: 0 };
    }
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    if (currentPlayer.isBot) {
      return { market: 0, protocols: 0, players: 0 };
    }

    const marketNodes = gameState.marketNodes
      .flat()
      .filter((node) => node !== null);
    const market = marketNodes.filter((node) =>
      canAffordNode(node, currentPlayer),
    ).length;
    const protocols = gameState.protocols.filter(
      (protocol) =>
        !protocol.claimed && canClaimProtocol(protocol, currentPlayer),
    ).length;
    const players = currentPlayer.reservedNodes.filter((node) =>
      canAffordNode(node, currentPlayer),
    ).length;

    return { market, protocols, players };
  }, [gameState]);

  const handleBack = useCallback(() => {
    resetGame();
    router.back();
  }, [resetGame, router]);

  const handleTabChange = useCallback((tab: GameTab) => {
    setSelectedTab(tab);
  }, []);

  const handleReplay = useCallback(() => {
    const count = gameState ? gameState.players.length : 2;
    const bots = gameState
      ? gameState.players.filter((player) => player.isBot).length
      : 1;
    const difficulty = gameState
      ? gameState.players.find((player) => player.isBot)?.botDifficulty ||
        "easy"
      : "easy";
    initializeGame(count, bots, difficulty);
  }, [gameState, initializeGame]);

  const clearBotNotice = useCallback(() => {
    setBotNotice("");
  }, []);

  useEffect(() => {
    if (!gameState) {
      startNoticeShownRef.current = false;
      return;
    }
    if (gameState.turnCount !== 0 || startNoticeShownRef.current) {
      return;
    }
    const starter = gameState.players[gameState.currentPlayerIndex];
    startNoticeShownRef.current = true;
    setBotNotice(`Starting player: ${starter.name}`);
    if (botNoticeTimerRef.current) {
      clearTimeout(botNoticeTimerRef.current);
    }
    botNoticeTimerRef.current = setTimeout(
      clearBotNotice,
      animations.botNotice,
    );
  }, [clearBotNotice, gameState]);

  useEffect(() => {
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
      if (result.notice) {
        setBotNotice(result.notice);
        if (botNoticeTimerRef.current) {
          clearTimeout(botNoticeTimerRef.current);
        }
        botNoticeTimerRef.current = setTimeout(
          clearBotNotice,
          animations.botNotice,
        );
      }
      if (result.winner) {
        endGame(result.winner);
        return;
      }
      updateGameState(result.nextState);
    }, animations.botTurnDelay);
  }, [clearBotNotice, endGame, gameState, runBotTurn, updateGameState]);

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
  }, [gameState, play]);

  useEffect(() => {
    return () => {
      if (botNoticeTimerRef.current) {
        clearTimeout(botNoticeTimerRef.current);
      }
      if (botTurnTimerRef.current) {
        clearTimeout(botTurnTimerRef.current);
      }
    };
  }, []);

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
            <BotNotice message={botNotice} />
            {!gameState.winner ? (
              <View style={gameStyles.overlay} pointerEvents="box-none">
                <View
                  style={[gameStyles.paddedSection, gameStyles.overlayPanel]}
                >
                  <GameHeader
                    title="Quantum Nexus"
                    turnCount={gameState.turnCount}
                    playerName={
                      gameState.players[gameState.currentPlayerIndex].name
                    }
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
          </>
        ) : (
          <View style={gameStyles.centerContent}>
            <Text>No active game.</Text>
            <Button label="Back" onPress={handleBack} variant="secondary" />
          </View>
        )}
      </View>
    </Screen>
  );
}

export default GameScreen;
