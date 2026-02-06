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
import { useTranslation } from "react-i18next";
import { getLocalizedPlayerName } from "@/utils/helpers";

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
  const { t } = useTranslation();
  const endGameStyles = useMemo(() => createEndGameStyles(theme), [theme]);
  const safeAreaEdges: Edge[] = ["top"];
  const standings = [...players].sort((a, b) => b.efficiency - a.efficiency);
  const winNodesThreshold = getWinNodesThreshold(players.length);
  const victoryReason = getVictoryReason(t, winner, winNodesThreshold);
  const winnerName = useMemo(
    () => getLocalizedPlayerName(winner.name, t),
    [t, winner.name],
  );

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
            <Text variant="title">{t("endgame.networkComplete")}</Text>
            <Text variant="subtitle">
              {winnerName} {t("game.wins")}
            </Text>
          </View>

          <View style={endGameStyles.winnerCard}>
            <Text variant="subtitle">{winnerName}</Text>
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
                <Text variant="caption">{t("game.efficiency")}</Text>
              </View>
              <View style={endGameStyles.statCard}>
                <Text style={endGameStyles.statValue}>{winner.nodes.length}</Text>
                <Text variant="caption">{t("game.nodes")}</Text>
              </View>
              <View style={endGameStyles.statCard}>
                <Text style={endGameStyles.statValue}>
                  {winner.protocols.length}
                </Text>
                <Text variant="caption">{t("game.protocols")}</Text>
              </View>
            </View>
            <View style={endGameStyles.victoryReason}>
              <Text variant="caption">{t("game.victoryAchievedBy")}</Text>
              <Text>{victoryReason}</Text>
            </View>
          </View>

          <View style={endGameStyles.rankings}>
            <Text variant="subtitle">{t("game.finalRankings")}</Text>
            <View style={endGameStyles.rankList}>
              {standings.map((player, index) => (
                <View key={player.id} style={endGameStyles.rankRow}>
                  <Text style={endGameStyles.rankIndex}>{index + 1}</Text>
                  <Text style={endGameStyles.rankName}>
                    {getLocalizedPlayerName(player.name, t)}
                  </Text>
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
          <Button label={t("endgame.playAgain")} onPress={onReplay} />
          <Button
            label={t("endgame.mainMenu")}
            onPress={onMainMenu}
            variant="secondary"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getVictoryReason(
  t: (key: string, options?: Record<string, unknown>) => string,
  winner: Player,
  winNodesThreshold: number,
) {
  if (winner.efficiency >= WIN_EFFICIENCY_THRESHOLD) {
    return t("game.efficiencyThreshold", {
      count: WIN_EFFICIENCY_THRESHOLD,
    });
  }
  if (winner.nodes.length >= winNodesThreshold) {
    return t("game.networkSize", { count: winNodesThreshold });
  }
  if (winner.protocols.length >= WIN_PROTOCOLS_THRESHOLD) {
    return t("game.protocolMastery", { count: WIN_PROTOCOLS_THRESHOLD });
  }
  return t("game.victory");
}
