import { useCallback, useMemo } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { Screen } from "@/components/layout/Screen";
import { createSettingsStyles } from "@/components/domain/settings/settings.styles";
import { SettingsModal } from "@/components/domain/settings/SettingsModal";
import { useSound } from "@/hooks/useSound";

export function SettingsScreen() {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const { isSoundEnabled, toggleSound } = useSound();
  const settingsStyles = useMemo(() => createSettingsStyles(theme), [theme]);
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleToggleSound = useCallback(() => {
    toggleSound();
  }, [toggleSound]);

  return (
    <Screen>
      <View style={settingsStyles.container}>
        <SettingsModal
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleTheme}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={handleToggleSound}
          onClose={handleBack}
        />
      </View>
    </Screen>
  );
}

export default SettingsScreen;
