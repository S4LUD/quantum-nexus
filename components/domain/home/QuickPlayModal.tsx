import { useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BotDifficulty } from "@/types";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { createQuickPlayModalStyles } from "./quickPlayModal.styles";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

interface QuickPlayModalProps {
  botCount: number;
  botDifficulty: BotDifficulty;
  onSelectBotCount: (count: number) => void;
  onSelectDifficulty: (difficulty: BotDifficulty) => void;
  onStart: () => void;
}

const BOT_COUNTS = [1, 2, 3];
const DIFFICULTIES: BotDifficulty[] = ["easy", "medium", "hard"];

export function QuickPlayModal({
  botCount,
  botDifficulty,
  onSelectBotCount,
  onSelectDifficulty,
  onStart,
}: QuickPlayModalProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const quickPlayModalStyles = useMemo(
    () => createQuickPlayModalStyles(theme),
    [theme],
  );
  const handleStart = useCallback(() => {
    onStart();
  }, [onStart]);

  const renderBotCount = useCallback(
    (count: number) => {
      const isActive = count === botCount;
      const handlePress = () => {
        onSelectBotCount(count);
      };
      return (
        <Pressable
          key={`bot-count-${count}`}
          onPress={handlePress}
          style={[
            quickPlayModalStyles.optionButton,
            isActive ? quickPlayModalStyles.optionButtonActive : null,
          ]}
        >
          <Text style={quickPlayModalStyles.optionText}>
            {t("quickPlay.botLabel", { count })}
          </Text>
        </Pressable>
      );
    },
    [botCount, onSelectBotCount, quickPlayModalStyles, t],
  );

  const renderDifficulty = useCallback(
    (difficulty: BotDifficulty) => {
      const isActive = difficulty === botDifficulty;
      const handlePress = () => {
        onSelectDifficulty(difficulty);
      };
      return (
        <Pressable
          key={`bot-difficulty-${difficulty}`}
          onPress={handlePress}
          style={[
            quickPlayModalStyles.optionButton,
            isActive ? quickPlayModalStyles.optionButtonActive : null,
          ]}
        >
          <Text style={quickPlayModalStyles.optionText}>
            {t(`difficulty.${difficulty}`)}
          </Text>
        </Pressable>
      );
    },
    [botDifficulty, onSelectDifficulty, quickPlayModalStyles, t],
  );

  const botCountOptions = useMemo(
    () => BOT_COUNTS.map(renderBotCount),
    [renderBotCount],
  );
  const difficultyOptions = useMemo(
    () => DIFFICULTIES.map(renderDifficulty),
    [renderDifficulty],
  );

  return (
    <LinearGradient
      colors={theme.gradients.modalBackground}
      style={quickPlayModalStyles.gradient}
    >
      <View style={quickPlayModalStyles.container}>
        <Text style={quickPlayModalStyles.title}>{t("quickPlay.title")}</Text>

        <View style={quickPlayModalStyles.section}>
          <Text style={quickPlayModalStyles.sectionLabel}>
            {t("quickPlay.bots")}
          </Text>
          <View style={quickPlayModalStyles.optionsRow}>{botCountOptions}</View>
        </View>

        <View style={quickPlayModalStyles.section}>
          <Text style={quickPlayModalStyles.sectionLabel}>
            {t("quickPlay.difficulty")}
          </Text>
          <View style={quickPlayModalStyles.optionsRow}>{difficultyOptions}</View>
        </View>

        <Button label={t("quickPlay.start")} onPress={handleStart} />
      </View>
    </LinearGradient>
  );
}
