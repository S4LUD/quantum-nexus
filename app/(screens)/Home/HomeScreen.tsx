import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useGame } from "@/state/GameContext";
import { useModal } from "@/hooks/useModal";
import { Screen } from "@/components/layout/Screen";
import { createHomeStyles } from "@/components/domain/home/home.styles";
import { SplashScreen } from "@/components/domain/home/SplashScreen";
import { MainMenu } from "@/components/domain/home/MainMenu";
import { BaseModal } from "@/components/ui/Modal/BaseModal";
import { TutorialPager } from "@/components/domain/tutorial/TutorialPager";
import { SettingsModal } from "@/components/domain/settings/SettingsModal";
import { useTheme } from "@/hooks/useTheme";
import { BotDifficulty } from "@/types";
import { QuickPlayModal } from "@/components/domain/home/QuickPlayModal";
import { useSound } from "@/hooks/useSound";

export function HomeScreen() {
  const router = useRouter();
  const { initializeGame } = useGame();
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const { isSoundEnabled, toggleSound } = useSound();
  const homeStyles = useMemo(() => createHomeStyles(theme), [theme]);
  const [phase, setPhase] = useState<"splash" | "menu">("splash");
  const [botCount, setBotCount] = useState(1);
  const [botDifficulty, setBotDifficulty] =
    useState<BotDifficulty>("easy");
  const {
    isOpen: isTutorialOpen,
    open: openTutorial,
    close: closeTutorial,
  } = useModal(false);
  const {
    isOpen: isSettingsOpen,
    open: openSettings,
    close: closeSettings,
  } = useModal(false);
  const {
    isOpen: isQuickPlayOpen,
    open: openQuickPlay,
    close: closeQuickPlay,
  } = useModal(false);

  const handleStart = useCallback(() => {
    const playerCount = botCount + 1;
    initializeGame(playerCount, botCount, botDifficulty);
    router.push("/(screens)/Game");
    closeQuickPlay();
  }, [botCount, botDifficulty, closeQuickPlay, initializeGame, router]);

  const handleOpenMenu = useCallback(() => {
    setPhase("menu");
  }, []);

  const handleQuickPlay = useCallback(() => {
    openQuickPlay();
  }, [openQuickPlay]);

  const handleOpenTutorial = useCallback(() => {
    openTutorial();
  }, [openTutorial]);

  const handleCloseTutorial = useCallback(() => {
    closeTutorial();
  }, [closeTutorial]);

  const handleSettings = useCallback(() => {
    openSettings();
  }, [openSettings]);

  const handleToggleTheme = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  const handleToggleSound = useCallback(() => {
    toggleSound();
  }, [toggleSound]);

  const handleBotCountChange = useCallback((count: number) => {
    setBotCount(count);
  }, []);

  const handleDifficultyChange = useCallback((difficulty: BotDifficulty) => {
    setBotDifficulty(difficulty);
  }, []);

  return (
    <Screen>
      <View style={homeStyles.container}>
        {phase === "splash" ? (
          <SplashScreen onStart={handleOpenMenu} />
        ) : (
          <MainMenu
            onQuickPlay={handleQuickPlay}
            onTutorial={handleOpenTutorial}
            onSettings={handleSettings}
          />
        )}
      </View>

      <BaseModal isOpen={isQuickPlayOpen} onClose={closeQuickPlay}>
        <QuickPlayModal
          botCount={botCount}
          botDifficulty={botDifficulty}
          onSelectBotCount={handleBotCountChange}
          onSelectDifficulty={handleDifficultyChange}
          onStart={handleStart}
        />
      </BaseModal>

      <BaseModal isOpen={isTutorialOpen} onClose={handleCloseTutorial}>
        <TutorialPager onDone={handleCloseTutorial} />
      </BaseModal>

      <BaseModal isOpen={isSettingsOpen} onClose={closeSettings}>
        <SettingsModal
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleTheme}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={handleToggleSound}
          onClose={closeSettings}
        />
      </BaseModal>
    </Screen>
  );
}

export default HomeScreen;
