import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Animated, Pressable, ScrollView, View, Platform } from "react-native";
import {
  X,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Palette,
  Type,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react-native";
import Constants from "expo-constants";
import { useTranslation } from "react-i18next";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { Icon } from "@/components/ui/Icon/Icon";
import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { createSettingsModalStyles } from "./settingsModal.styles";
import { useTheme } from "@/hooks/useTheme";
import { SupportedLanguage, languageLabels } from "@/i18n";
import { AnimationIntensity } from "@/state/ThemeContext";

interface SettingsModalProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  isFontScalingEnabled: boolean;
  onToggleFontScaling: () => void;
  isColorBlind: boolean;
  onToggleColorBlind: () => void;
  animationIntensity: AnimationIntensity;
  onSelectAnimationIntensity: (intensity: AnimationIntensity) => void;
  language: SupportedLanguage;
  onSelectLanguage: (language: SupportedLanguage) => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onClose: () => void;
}

export function SettingsModal({
  isDarkMode,
  onToggleDarkMode,
  isSoundEnabled,
  onToggleSound,
  isFontScalingEnabled,
  onToggleFontScaling,
  isColorBlind,
  onToggleColorBlind,
  animationIntensity,
  onSelectAnimationIntensity,
  language,
  onSelectLanguage,
  onOpenTerms,
  onOpenPrivacy,
  onClose,
}: SettingsModalProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const settingsModalStyles = useMemo(
    () => createSettingsModalStyles(theme),
    [theme],
  );
  const toggleAnim = useRef(new Animated.Value(isDarkMode ? 1 : 0)).current;
  const soundToggleAnim = useRef(
    new Animated.Value(isSoundEnabled ? 1 : 0),
  ).current;
  const fontScalingToggleAnim = useRef(
    new Animated.Value(isFontScalingEnabled ? 1 : 0),
  ).current;
  const colorBlindToggleAnim = useRef(
    new Animated.Value(isColorBlind ? 1 : 0),
  ).current;
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isAnimationOpen, setIsAnimationOpen] = useState(false);

  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isDarkMode ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isDarkMode, toggleAnim]);

  useEffect(() => {
    Animated.timing(soundToggleAnim, {
      toValue: isSoundEnabled ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isSoundEnabled, soundToggleAnim]);

  useEffect(() => {
    Animated.timing(fontScalingToggleAnim, {
      toValue: isFontScalingEnabled ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [fontScalingToggleAnim, isFontScalingEnabled]);

  useEffect(() => {
    Animated.timing(colorBlindToggleAnim, {
      toValue: isColorBlind ? 1 : 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [isColorBlind, colorBlindToggleAnim]);

  const translateX = useMemo(() => {
    const travel =
      layout.toggle.width - layout.toggle.thumb - layout.toggle.padding * 2;
    return toggleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, travel],
    });
  }, [toggleAnim]);

  const soundTranslateX = useMemo(() => {
    const travel =
      layout.toggle.width - layout.toggle.thumb - layout.toggle.padding * 2;
    return soundToggleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, travel],
    });
  }, [soundToggleAnim]);

  const fontScalingTranslateX = useMemo(() => {
    const travel =
      layout.toggle.width - layout.toggle.thumb - layout.toggle.padding * 2;
    return fontScalingToggleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, travel],
    });
  }, [fontScalingToggleAnim]);

  const colorBlindTranslateX = useMemo(() => {
    const travel =
      layout.toggle.width - layout.toggle.thumb - layout.toggle.padding * 2;
    return colorBlindToggleAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, travel],
    });
  }, [colorBlindToggleAnim]);

  const handleToggle = () => {
    onToggleDarkMode();
  };

  const handleSoundToggle = () => {
    onToggleSound();
  };

  const handleFontScalingToggle = () => {
    onToggleFontScaling();
  };

  const handleColorBlindToggle = () => {
    onToggleColorBlind();
  };
  const handleSelectAnimationFull = useCallback(() => {
    onSelectAnimationIntensity("full");
    setIsAnimationOpen(false);
  }, [onSelectAnimationIntensity]);
  const handleSelectAnimationReduced = useCallback(() => {
    onSelectAnimationIntensity("reduced");
    setIsAnimationOpen(false);
  }, [onSelectAnimationIntensity]);
  const handleSelectAnimationOff = useCallback(() => {
    onSelectAnimationIntensity("off");
    setIsAnimationOpen(false);
  }, [onSelectAnimationIntensity]);
  const handleToggleAnimationDropdown = useCallback(() => {
    setIsAnimationOpen((prev) => !prev);
    setIsLanguageOpen(false);
  }, []);

  const handleSelectEnglish = useCallback(() => {
    onSelectLanguage("en");
    setIsLanguageOpen(false);
  }, [onSelectLanguage]);
  const handleSelectChinese = useCallback(() => {
    onSelectLanguage("zh");
    setIsLanguageOpen(false);
  }, [onSelectLanguage]);
  const handleSelectJapanese = useCallback(() => {
    onSelectLanguage("ja");
    setIsLanguageOpen(false);
  }, [onSelectLanguage]);
  const handleSelectKorean = useCallback(() => {
    onSelectLanguage("ko");
    setIsLanguageOpen(false);
  }, [onSelectLanguage]);
  const handleSelectThai = useCallback(() => {
    onSelectLanguage("th");
    setIsLanguageOpen(false);
  }, [onSelectLanguage]);
  const handleSelectIndonesian = useCallback(() => {
    onSelectLanguage("id");
    setIsLanguageOpen(false);
  }, [onSelectLanguage]);
  const handleSelectRussian = useCallback(() => {
    onSelectLanguage("ru");
    setIsLanguageOpen(false);
  }, [onSelectLanguage]);
  const handleToggleLanguageDropdown = useCallback(() => {
    setIsLanguageOpen((prev) => !prev);
    setIsAnimationOpen(false);
  }, []);

  const handleOpenTerms = useCallback(() => {
    onOpenTerms();
  }, [onOpenTerms]);

  const handleOpenPrivacy = useCallback(() => {
    onOpenPrivacy();
  }, [onOpenPrivacy]);

  const handleClose = () => {
    onClose();
  };

  const appVersion = Constants.expoConfig?.version ?? "1.0.0";
  const platformLabel =
    Platform.OS === "ios"
      ? "iOS"
      : Platform.OS === "android"
        ? "Android"
        : "Web";

  return (
    <View style={settingsModalStyles.wrapper}>
      <View style={settingsModalStyles.header}>
        <Text style={settingsModalStyles.title}>{t("settings.title")}</Text>
        <Pressable
          onPress={handleClose}
          style={settingsModalStyles.closeButton}
        >
          <Icon icon={X} size={layout.icon.lg} color={theme.colors.text} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={settingsModalStyles.content}
        style={settingsModalStyles.contentScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={settingsModalStyles.row}>
          <View style={settingsModalStyles.rowLeft}>
            <Icon
              icon={isDarkMode ? Moon : Sun}
              size={layout.icon.lg}
              color={isDarkMode ? colors.purple400 : colors.yellow400}
              fill="none"
            />
            <View>
              <Text style={settingsModalStyles.rowTitle}>
                {t("settings.darkMode")}
              </Text>
              <Text style={settingsModalStyles.rowSubtitle}>
                {isDarkMode ? t("settings.enabled") : t("settings.disabled")}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={handleToggle}
            style={[
              settingsModalStyles.toggle,
              isDarkMode ? settingsModalStyles.toggleActive : null,
            ]}
          >
            <Animated.View
              style={[
                settingsModalStyles.toggleThumb,
                isDarkMode ? settingsModalStyles.toggleThumbActive : null,
                { transform: [{ translateX }] },
              ]}
            />
          </Pressable>
        </View>

        <View style={settingsModalStyles.row}>
          <View style={settingsModalStyles.rowLeft}>
            <Icon
              icon={isSoundEnabled ? Volume2 : VolumeX}
              size={layout.icon.lg}
              color={colors.cyan400}
              fill="none"
            />
            <View>
              <Text style={settingsModalStyles.rowTitle}>
                {t("settings.soundEffects")}
              </Text>
              <Text style={settingsModalStyles.rowSubtitle}>
                {isSoundEnabled
                  ? t("settings.enabled")
                  : t("settings.disabled")}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={handleSoundToggle}
            style={[
              settingsModalStyles.toggle,
              isSoundEnabled ? settingsModalStyles.toggleActive : null,
            ]}
          >
            <Animated.View
              style={[
                settingsModalStyles.toggleThumb,
                isSoundEnabled ? settingsModalStyles.toggleThumbActive : null,
                { transform: [{ translateX: soundTranslateX }] },
              ]}
            />
          </Pressable>
        </View>

        <View style={settingsModalStyles.row}>
          <View style={settingsModalStyles.rowLeft}>
            <Icon
              icon={Type}
              size={layout.icon.lg}
              color={colors.blue500}
              fill="none"
            />
            <View>
              <Text style={settingsModalStyles.rowTitle}>
                {t("settings.fontScaling")}
              </Text>
              <Text style={settingsModalStyles.rowSubtitle}>
                {isFontScalingEnabled
                  ? t("settings.enabled")
                  : t("settings.disabled")}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={handleFontScalingToggle}
            style={[
              settingsModalStyles.toggle,
              isFontScalingEnabled ? settingsModalStyles.toggleActive : null,
            ]}
          >
            <Animated.View
              style={[
                settingsModalStyles.toggleThumb,
                isFontScalingEnabled
                  ? settingsModalStyles.toggleThumbActive
                  : null,
                { transform: [{ translateX: fontScalingTranslateX }] },
              ]}
            />
          </Pressable>
        </View>

        <View style={settingsModalStyles.row}>
          <View style={settingsModalStyles.rowLeft}>
            <Icon
              icon={Palette}
              size={layout.icon.lg}
              color={colors.pink400}
              fill="none"
            />
            <View>
              <Text style={settingsModalStyles.rowTitle}>
                {t("settings.colorBlindMode")}
              </Text>
              <Text style={settingsModalStyles.rowSubtitle}>
                {isColorBlind ? t("settings.enabled") : t("settings.disabled")}
              </Text>
            </View>
          </View>
          <Pressable
            onPress={handleColorBlindToggle}
            style={[
              settingsModalStyles.toggle,
              isColorBlind ? settingsModalStyles.toggleActive : null,
            ]}
          >
            <Animated.View
              style={[
                settingsModalStyles.toggleThumb,
                isColorBlind ? settingsModalStyles.toggleThumbActive : null,
                { transform: [{ translateX: colorBlindTranslateX }] },
              ]}
            />
          </Pressable>
        </View>

        <View style={settingsModalStyles.section}>
          <View style={settingsModalStyles.rowLeft}>
            <Icon
              icon={Zap}
              size={layout.icon.lg}
              color={colors.orange400}
              fill="none"
            />
            <View>
              <Text style={settingsModalStyles.rowTitle}>
                {t("settings.animationIntensity")}
              </Text>
              <Text style={settingsModalStyles.rowSubtitle}>
                {animationIntensity === "full"
                  ? t("settings.animationFull")
                  : animationIntensity === "reduced"
                    ? t("settings.animationReduced")
                    : t("settings.animationOff")}
              </Text>
            </View>
          </View>
          <View style={settingsModalStyles.dropdownSection}>
            <Pressable
              onPress={handleToggleAnimationDropdown}
              style={settingsModalStyles.dropdownTrigger}
            >
              <Text style={settingsModalStyles.dropdownValue}>
                {animationIntensity === "full"
                  ? t("settings.animationFull")
                  : animationIntensity === "reduced"
                    ? t("settings.animationReduced")
                    : t("settings.animationOff")}
              </Text>
              <Icon
                icon={isAnimationOpen ? ChevronUp : ChevronDown}
                size={layout.icon.md}
                color={theme.colors.textMuted}
                fill="none"
              />
            </Pressable>
            {isAnimationOpen ? (
              <View style={settingsModalStyles.dropdownPanel}>
                <Pressable
                  onPress={handleSelectAnimationFull}
                  style={[
                    settingsModalStyles.dropdownOption,
                    animationIntensity === "full"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {t("settings.animationFull")}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSelectAnimationReduced}
                  style={[
                    settingsModalStyles.dropdownOption,
                    animationIntensity === "reduced"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {t("settings.animationReduced")}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSelectAnimationOff}
                  style={[
                    settingsModalStyles.dropdownOption,
                    animationIntensity === "off"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {t("settings.animationOff")}
                  </Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        </View>

        <View style={settingsModalStyles.section}>
          <Text style={settingsModalStyles.sectionTitle}>
            {t("settings.language")}
          </Text>
          <View style={settingsModalStyles.dropdownSection}>
            <Pressable
              onPress={handleToggleLanguageDropdown}
              style={settingsModalStyles.dropdownTrigger}
            >
              <Text style={settingsModalStyles.dropdownValue}>
                {languageLabels[language]}
              </Text>
              <Icon
                icon={isLanguageOpen ? ChevronUp : ChevronDown}
                size={layout.icon.md}
                color={theme.colors.textMuted}
                fill="none"
              />
            </Pressable>
            {isLanguageOpen ? (
              <View style={settingsModalStyles.dropdownPanel}>
                <Pressable
                  onPress={handleSelectEnglish}
                  style={[
                    settingsModalStyles.dropdownOption,
                    language === "en"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {languageLabels.en}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSelectChinese}
                  style={[
                    settingsModalStyles.dropdownOption,
                    language === "zh"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {languageLabels.zh}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSelectJapanese}
                  style={[
                    settingsModalStyles.dropdownOption,
                    language === "ja"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {languageLabels.ja}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSelectKorean}
                  style={[
                    settingsModalStyles.dropdownOption,
                    language === "ko"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {languageLabels.ko}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSelectThai}
                  style={[
                    settingsModalStyles.dropdownOption,
                    language === "th"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {languageLabels.th}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSelectIndonesian}
                  style={[
                    settingsModalStyles.dropdownOption,
                    language === "id"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {languageLabels.id}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleSelectRussian}
                  style={[
                    settingsModalStyles.dropdownOption,
                    language === "ru"
                      ? settingsModalStyles.dropdownOptionActive
                      : null,
                  ]}
                >
                  <Text style={settingsModalStyles.dropdownOptionLabel}>
                    {languageLabels.ru}
                  </Text>
                </Pressable>
              </View>
            ) : null}
          </View>
        </View>

        <View style={settingsModalStyles.infoCard}>
          <View style={settingsModalStyles.infoRow}>
            <Text style={settingsModalStyles.infoLabel}>
              {t("settings.version")}
            </Text>
            <Text style={settingsModalStyles.infoValue}>{appVersion}</Text>
          </View>
          <View style={settingsModalStyles.infoRow}>
            <Text style={settingsModalStyles.infoLabel}>
              {t("settings.gameMode")}
            </Text>
            <Text style={settingsModalStyles.infoValue}>{t("home.title")}</Text>
          </View>
          <View style={settingsModalStyles.infoRow}>
            <Text style={settingsModalStyles.infoLabel}>
              {t("settings.platform")}
            </Text>
            <Text style={settingsModalStyles.infoValue}>{platformLabel}</Text>
          </View>
        </View>

        <View style={settingsModalStyles.legal}>
          <Text style={settingsModalStyles.legalText}>{t("legal.title")}</Text>
          <Text style={settingsModalStyles.legalText}>
            {t("legal.subtitle")}
          </Text>
          <View style={settingsModalStyles.legalActions}>
            <Pressable
              onPress={handleOpenTerms}
              style={settingsModalStyles.legalButton}
            >
              <Text style={settingsModalStyles.legalButtonText}>
                {t("legal.terms.title")}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleOpenPrivacy}
              style={settingsModalStyles.legalButton}
            >
              <Text style={settingsModalStyles.legalButtonText}>
                {t("legal.privacy.title")}
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={settingsModalStyles.footer}>
        <Button label={t("settings.close")} onPress={handleClose} />
      </View>
    </View>
  );
}
