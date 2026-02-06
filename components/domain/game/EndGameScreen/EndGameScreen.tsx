import { ScrollView, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { Trophy, Star } from "lucide-react-native";
import {
  WIN_EFFICIENCY_THRESHOLD,
  WIN_PROTOCOLS_THRESHOLD,
  getWinNodesThreshold,
} from "../../../../logic/rules";
import { Player } from "../game.types";
import { createEndGameStyles } from "./endGame.styles";
import { layout } from "@/constants/layout";
import { colors } from "@/constants/colors";
import { Icon } from "@/components/ui/Icon/Icon";
import { Text } from "@/components/ui/Text/Text";
import { Button } from "@/components/ui/Button/Button";
import { useTheme } from "@/hooks/useTheme";
import { useMemo, useEffect } from "react";
import { useSound } from "@/hooks/useSound";

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
  const { theme } = useTheme();
  const { play } = useSound();
  const endGameStyles = useMemo(() => createEndGameStyles(theme), [theme]);
  const safeAreaEdges: Edge[] = ["top"];
  const standings = [...players].sort((a, b) => b.efficiency - a.efficiency);
  const winNodesThreshold = getWinNodesThreshold(players.length);
  const victoryReason = getVictoryReason(winner, winNodesThreshold);

  useEffect(() => {
    play("victory");
  }, [play]);

  return (
    <SafeAreaView style={endGameStyles.safeArea} edges={safeAreaEdges}>
      <ScrollView
        style={endGameStyles.container}
        contentContainerStyle={endGameStyles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={endGameStyles.body}>
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
                  <Text style={endGameStyles.statValue}>
                    {winner.efficiency}
                  </Text>
                  <Icon
                    icon={Star}
                    size={layout.icon.sm}
                    color={colors.yellow400}
                    fill="none"
                  />
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
                    <Text style={endGameStyles.rankValue}>
                      {player.efficiency}
                    </Text>
                    <Icon
                      icon={Star}
                      size={layout.icon.sm}
                      color={colors.yellow400}
                      fill="none"
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={endGameStyles.actions}>
          <Button label="Play Again" onPress={onReplay} />
          <Button label="Main Menu" onPress={onMainMenu} variant="secondary" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getVictoryReason(winner: Player, winNodesThreshold: number) {
  if (winner.efficiency >= WIN_EFFICIENCY_THRESHOLD) {
    return `Efficiency Threshold (${WIN_EFFICIENCY_THRESHOLD})`;
  }
  if (winner.nodes.length >= winNodesThreshold) {
    return `Network Size (${winNodesThreshold}+ Nodes)`;
  }
  if (winner.protocols.length >= WIN_PROTOCOLS_THRESHOLD) {
    return `Protocol Mastery (${WIN_PROTOCOLS_THRESHOLD}+ Protocols)`;
  }
  return "Unknown";
}
