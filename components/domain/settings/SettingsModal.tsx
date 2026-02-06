import { useCallback, useEffect, useMemo, useRef } from "react";
import { Animated, Pressable, ScrollView, View, Platform } from "react-native";
import { X, Moon, Sun, Volume2, VolumeX, Palette } from "lucide-react-native";
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

interface SettingsModalProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  isColorBlind: boolean;
  onToggleColorBlind: () => void;
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
  isColorBlind,
  onToggleColorBlind,
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
  const colorBlindToggleAnim = useRef(
    new Animated.Value(isColorBlind ? 1 : 0),
  ).current;

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

  const handleColorBlindToggle = () => {
    onToggleColorBlind();
  };

  const handleSelectEnglish = useCallback(() => {
    onSelectLanguage("en");
  }, [onSelectLanguage]);
  const handleSelectChinese = useCallback(() => {
    onSelectLanguage("zh");
  }, [onSelectLanguage]);
  const handleSelectJapanese = useCallback(() => {
    onSelectLanguage("ja");
  }, [onSelectLanguage]);
  const handleSelectKorean = useCallback(() => {
    onSelectLanguage("ko");
  }, [onSelectLanguage]);
  const handleSelectThai = useCallback(() => {
    onSelectLanguage("th");
  }, [onSelectLanguage]);
  const handleSelectIndonesian = useCallback(() => {
    onSelectLanguage("id");
  }, [onSelectLanguage]);
  const handleSelectRussian = useCallback(() => {
    onSelectLanguage("ru");
  }, [onSelectLanguage]);

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
          <Text style={settingsModalStyles.sectionTitle}>
            {t("settings.language")}
          </Text>
          <View style={settingsModalStyles.languageGrid}>
            <Pressable
              onPress={handleSelectEnglish}
              style={[
                settingsModalStyles.languageChip,
                language === "en"
                  ? settingsModalStyles.languageChipActive
                  : null,
              ]}
            >
              <Text style={settingsModalStyles.languageLabel}>
                {languageLabels.en}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSelectChinese}
              style={[
                settingsModalStyles.languageChip,
                language === "zh"
                  ? settingsModalStyles.languageChipActive
                  : null,
              ]}
            >
              <Text style={settingsModalStyles.languageLabel}>
                {languageLabels.zh}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSelectJapanese}
              style={[
                settingsModalStyles.languageChip,
                language === "ja"
                  ? settingsModalStyles.languageChipActive
                  : null,
              ]}
            >
              <Text style={settingsModalStyles.languageLabel}>
                {languageLabels.ja}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSelectKorean}
              style={[
                settingsModalStyles.languageChip,
                language === "ko"
                  ? settingsModalStyles.languageChipActive
                  : null,
              ]}
            >
              <Text style={settingsModalStyles.languageLabel}>
                {languageLabels.ko}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSelectThai}
              style={[
                settingsModalStyles.languageChip,
                language === "th"
                  ? settingsModalStyles.languageChipActive
                  : null,
              ]}
            >
              <Text style={settingsModalStyles.languageLabel}>
                {languageLabels.th}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSelectIndonesian}
              style={[
                settingsModalStyles.languageChip,
                language === "id"
                  ? settingsModalStyles.languageChipActive
                  : null,
              ]}
            >
              <Text style={settingsModalStyles.languageLabel}>
                {languageLabels.id}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSelectRussian}
              style={[
                settingsModalStyles.languageChip,
                language === "ru"
                  ? settingsModalStyles.languageChipActive
                  : null,
              ]}
            >
              <Text style={settingsModalStyles.languageLabel}>
                {languageLabels.ru}
              </Text>
            </Pressable>
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
