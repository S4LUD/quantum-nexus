import { Pressable, View } from "react-native";
import { ArrowLeft, Star } from "lucide-react-native";
import { gameHeaderStyles } from "./gameHeader.styles";
import { Icon } from "@/components/ui/Icon/Icon";
import { colors } from "@/constants/colors";
import { Text } from "@/components/ui/Text/Text";

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
  const handleBack = () => {
    onBack();
  };

  return (
    <View style={gameHeaderStyles.container}>
      <View style={gameHeaderStyles.left}>
        <Pressable onPress={handleBack} style={gameHeaderStyles.backButton}>
          <Icon icon={ArrowLeft} size={16} color={colors.white} />
        </Pressable>
        <Text variant="caption">Turn {turnCount}</Text>
      </View>
      <View style={gameHeaderStyles.center}>
        <Text variant="title">{title}</Text>
      </View>
      <View style={gameHeaderStyles.right}>
        <Text variant="caption">{playerName}</Text>
        <View style={gameHeaderStyles.efficiencyRow}>
          <Text variant="caption">{efficiency}</Text>
          <Icon icon={Star} size={12} color={colors.yellow400} />
        </View>
      </View>
    </View>
  );
}

export default GameHeader;
