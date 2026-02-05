import { ScrollView, View } from "react-native";
import { Trophy, Star } from "lucide-react-native";
import {
  WIN_EFFICIENCY_THRESHOLD,
  WIN_NODES_THRESHOLD,
  WIN_PROTOCOLS_THRESHOLD,
} from "../../../../logic/rules";
import { Player } from "../game.types";
import { endGameStyles } from "./endGame.styles";
import { layout } from "@/constants/layout";
import { colors } from "@/constants/colors";
import { Icon } from "@/components/ui/Icon/Icon";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";

interface EndGameScreenProps {
  players: Player[];
  winner: Player;
  onReplay: () => void;
  onMainMenu: () => void;
}

export function EndGameScreen({
  players,
  winner,
  onReplay,
  onMainMenu,
}: EndGameScreenProps) {
  const standings = [...players].sort((a, b) => b.efficiency - a.efficiency);
  const victoryReason = getVictoryReason(winner);

  return (
    <ScrollView
      style={endGameStyles.container}
      contentContainerStyle={endGameStyles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={endGameStyles.hero}>
        <Icon icon={Trophy} size={layout.icon.xxl} color={colors.yellow400} />
        <Text variant="title">Network Complete</Text>
        <Text variant="subtitle">{winner.name} Wins</Text>
      </View>

      <View style={endGameStyles.winnerCard}>
        <Text variant="subtitle">{winner.name}</Text>
        <View style={endGameStyles.statsRow}>
          <View style={endGameStyles.statCard}>
            <View style={endGameStyles.statValueRow}>
              <Text style={endGameStyles.statValue}>{winner.efficiency}</Text>
              <Icon icon={Star} size={layout.icon.sm} color={colors.yellow400} />
            </View>
            <Text variant="caption">Efficiency</Text>
          </View>
          <View style={endGameStyles.statCard}>
            <Text style={endGameStyles.statValue}>{winner.nodes.length}</Text>
            <Text variant="caption">Nodes</Text>
          </View>
          <View style={endGameStyles.statCard}>
            <Text style={endGameStyles.statValue}>
              {winner.protocols.length}
            </Text>
            <Text variant="caption">Protocols</Text>
          </View>
        </View>
        <View style={endGameStyles.victoryReason}>
          <Text variant="caption">Victory Achieved By</Text>
          <Text>{victoryReason}</Text>
        </View>
      </View>

      <View style={endGameStyles.rankings}>
        <Text variant="subtitle">Final Rankings</Text>
        <View style={endGameStyles.rankList}>
          {standings.map((player, index) => (
            <View key={player.id} style={endGameStyles.rankRow}>
              <Text style={endGameStyles.rankIndex}>{index + 1}</Text>
              <Text style={endGameStyles.rankName}>{player.name}</Text>
              <View style={endGameStyles.rankValueRow}>
                <Text style={endGameStyles.rankValue}>{player.efficiency}</Text>
                <Icon icon={Star} size={layout.icon.sm} color={colors.yellow400} />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={endGameStyles.actions}>
        <Button label="Play Again" onPress={onReplay} />
        <Button label="Main Menu" onPress={onMainMenu} variant="secondary" />
      </View>
    </ScrollView>
  );
}

function getVictoryReason(winner: Player) {
  if (winner.efficiency >= WIN_EFFICIENCY_THRESHOLD) {
    return `Efficiency Threshold (${WIN_EFFICIENCY_THRESHOLD})`;
  }
  if (winner.nodes.length >= WIN_NODES_THRESHOLD) {
    return `Network Size (${WIN_NODES_THRESHOLD}+ Nodes)`;
  }
  if (winner.protocols.length >= WIN_PROTOCOLS_THRESHOLD) {
    return `Protocol Mastery (${WIN_PROTOCOLS_THRESHOLD}+ Protocols)`;
  }
  return "Unknown";
}
