import { useMemo } from "react";
import { Pressable, View } from "react-native";
import { ArrowLeft, Star } from "lucide-react-native";
import { createGameHeaderStyles } from "./gameHeader.styles";
import { Icon } from "@/components/ui/Icon/Icon";
import { Text } from "@/components/ui/Text/Text";
import { useTheme } from "@/hooks/useTheme";
import { colors } from "@/constants/colors";
import { useTranslation } from "react-i18next";

interface GameHeaderProps {
  title: string;
  turnCount: number;
  playerName: string;
  efficiency: number;
  onBack: () => void;
}

export function GameHeader({
  title,
  turnCount,
  playerName,
  efficiency,
  onBack,
}: GameHeaderProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const gameHeaderStyles = useMemo(
    () => createGameHeaderStyles(theme),
    [theme],
  );
  const handleBack = () => {
    onBack();
  };

  return (
    <View style={gameHeaderStyles.container}>
      <View style={gameHeaderStyles.left}>
        <Pressable onPress={handleBack} style={gameHeaderStyles.backButton}>
          <Icon icon={ArrowLeft} size={16} color={theme.colors.text} />
        </Pressable>
        <Text variant="caption" style={gameHeaderStyles.captionMuted}>
          {t("game.turnLabel", { count: turnCount })}
        </Text>
      </View>
      <View style={gameHeaderStyles.center}>
        <Text variant="title" style={gameHeaderStyles.title}>
          {title}
        </Text>
      </View>
      <View style={gameHeaderStyles.right}>
        <Text variant="caption" style={gameHeaderStyles.caption}>
          {playerName}
        </Text>
        <View style={gameHeaderStyles.efficiencyRow}>
          <Text variant="caption" style={gameHeaderStyles.caption}>
            {efficiency}
          </Text>
          <Icon icon={Star} size={12} color={colors.yellow400} fill="none" />
        </View>
      </View>
    </View>
  );
}

export default GameHeader;
