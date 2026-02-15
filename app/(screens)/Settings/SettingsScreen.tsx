import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { Screen } from "@/components/layout/Screen";
import { createSettingsStyles } from "@/components/domain/settings/settings.styles";
import { SettingsModal } from "@/components/domain/settings/SettingsModal";
import {
  LegalModal,
  LegalModalType,
} from "@/components/domain/settings/LegalModal";
import { BaseModal } from "@/components/ui/Modal/BaseModal";
import { useModal } from "@/hooks/useModal";
import { useSound } from "@/hooks/useSound";
import { useLocaleSettings } from "@/hooks/useLocale";

const HOME_ROUTE = "/(screens)/Home/HomeScreen";

export function SettingsScreen() {
  const {
    isDarkMode,
    toggleTheme,
    isColorBlind,
    toggleColorBlind,
    isFontScalingEnabled,
    toggleFontScaling,
    animationIntensity,
    setAnimationIntensity,
    theme,
  } = useTheme();
  const { isSoundEnabled, toggleSound } = useSound();
  const { language, setLanguage } = useLocaleSettings();
  const settingsStyles = useMemo(() => createSettingsStyles(theme), [theme]);
  const router = useRouter();
  const {
    isOpen: isLegalOpen,
    open: openLegal,
    close: closeLegal,
  } = useModal(false);
  const [legalType, setLegalType] = useState<LegalModalType>("terms");

  const handleBack = useCallback(() => {
    router.replace(HOME_ROUTE);
  }, [router]);

  const handleToggleSound = useCallback(() => {
    toggleSound();
  }, [toggleSound]);

  const handleOpenTerms = useCallback(() => {
    setLegalType("terms");
    openLegal();
  }, [openLegal]);

  const handleOpenPrivacy = useCallback(() => {
    setLegalType("privacy");
    openLegal();
  }, [openLegal]);

  const handleCloseLegal = useCallback(() => {
    closeLegal();
  }, [closeLegal]);

  return (
    <Screen>
      <View style={settingsStyles.container}>
        <SettingsModal
          isDarkMode={isDarkMode}
          onToggleDarkMode={toggleTheme}
          isSoundEnabled={isSoundEnabled}
          onToggleSound={handleToggleSound}
          isFontScalingEnabled={isFontScalingEnabled}
          onToggleFontScaling={toggleFontScaling}
          isColorBlind={isColorBlind}
          onToggleColorBlind={toggleColorBlind}
          animationIntensity={animationIntensity}
          onSelectAnimationIntensity={setAnimationIntensity}
          language={language}
          onSelectLanguage={setLanguage}
          onOpenTerms={handleOpenTerms}
          onOpenPrivacy={handleOpenPrivacy}
          onClose={handleBack}
        />
      </View>

      <BaseModal isOpen={isLegalOpen} onClose={handleCloseLegal}>
        <LegalModal type={legalType} onClose={handleCloseLegal} />
      </BaseModal>
    </Screen>
  );
}

export default SettingsScreen;
