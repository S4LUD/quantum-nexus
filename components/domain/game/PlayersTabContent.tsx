import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { PlayerArea } from "./PlayerArea/PlayerArea";
import { GameState, Node } from "./game.types";
import { GameBoardStyles } from "./gameBoard.styles";
import { BeginnerHelpTrigger } from "./BeginnerHelpTrigger";

interface PlayersTabContentProps {
  players: GameState["players"];
  currentPlayerId: string;
  onReservedNodePress?: (node: Node) => void;
  onOpenPlayersHelp: () => void;
  isPlayerTurn: boolean;
  gameBoardStyles: GameBoardStyles;
}

export function PlayersTabContent({
  players,
  currentPlayerId,
  onReservedNodePress,
  onOpenPlayersHelp,
  isPlayerTurn,
  gameBoardStyles,
}: PlayersTabContentProps) {
  const { t } = useTranslation();

  const renderPlayerArea = (player: GameState["players"][number]) => {
    const isCurrentPlayer = player.id === currentPlayerId;
    return (
      <PlayerArea
        key={player.id}
        player={player}
        isCurrentPlayer={isCurrentPlayer}
        onReservedNodePress={
          isCurrentPlayer && isPlayerTurn ? onReservedNodePress : undefined
        }
        disabled={!isPlayerTurn}
      />
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={gameBoardStyles.scrollContent}
    >
      <View style={gameBoardStyles.helpHeaderRow}>
        <Text style={gameBoardStyles.sectionLabel}>
          {t("beginnerHelp.players.sectionLabel")}
        </Text>
        <BeginnerHelpTrigger
          onPress={onOpenPlayersHelp}
          accessibilityLabel={t("beginnerHelp.players.buttonLabel")}
        />
      </View>
      {players.map(renderPlayerArea)}
    </ScrollView>
  );
}
