import { useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BotDifficulty } from "@/types";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { quickPlayModalStyles } from "./quickPlayModal.styles";
import { gradients } from "@/constants/colors";

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
            {String(count)} Bot{count > 1 ? "s" : ""}
          </Text>
        </Pressable>
      );
    },
    [botCount, onSelectBotCount],
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
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Text>
        </Pressable>
      );
    },
    [botDifficulty, onSelectDifficulty],
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
      colors={gradients.modalBackground}
      style={quickPlayModalStyles.gradient}
    >
      <View style={quickPlayModalStyles.container}>
        <Text style={quickPlayModalStyles.title}>Quick Play Setup</Text>

        <View style={quickPlayModalStyles.section}>
          <Text style={quickPlayModalStyles.sectionLabel}>Bot Count</Text>
          <View style={quickPlayModalStyles.optionsRow}>{botCountOptions}</View>
        </View>

        <View style={quickPlayModalStyles.section}>
          <Text style={quickPlayModalStyles.sectionLabel}>Difficulty</Text>
          <View style={quickPlayModalStyles.optionsRow}>{difficultyOptions}</View>
        </View>

        <Button label="Start Game" onPress={handleStart} />
      </View>
    </LinearGradient>
  );
}
