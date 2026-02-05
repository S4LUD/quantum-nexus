import { useCallback } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { Screen } from "@/components/layout/Screen";
import { settingsStyles } from "./settings.styles";
import { SettingsModal } from "@/components/domain/settings/SettingsModal";

export function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <Screen>
      <View style={settingsStyles.container}>
        <SettingsModal
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleTheme}
          onClose={handleBack}
        />
      </View>
    </Screen>
  );
}

export default SettingsScreen;
