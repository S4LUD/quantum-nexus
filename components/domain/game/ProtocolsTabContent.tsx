import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { ProtocolCard } from "./ProtocolCard/ProtocolCard";
import { GameState, Protocol } from "./game.types";
import { GameBoardStyles } from "./gameBoard.styles";
import { BeginnerHelpTrigger } from "./BeginnerHelpTrigger";

interface ProtocolsTabContentProps {
  protocols: Protocol[];
  currentPlayer: GameState["players"][number];
  onProtocolClaim: (protocol: Protocol) => void;
  onOpenProtocolsHelp: () => void;
  isPlayerTurn: boolean;
  gameBoardStyles: GameBoardStyles;
}

export function ProtocolsTabContent({
  protocols,
  currentPlayer,
  onProtocolClaim,
  onOpenProtocolsHelp,
  isPlayerTurn,
  gameBoardStyles,
}: ProtocolsTabContentProps) {
  const { t } = useTranslation();
  const pointerEvents = isPlayerTurn ? "auto" : "none";

  const renderProtocol = (protocol: Protocol) => {
    const handlePress = () => onProtocolClaim(protocol);
    return (
      <View key={protocol.id} pointerEvents={pointerEvents}>
        <ProtocolCard
          protocol={protocol}
          player={currentPlayer}
          onPress={isPlayerTurn ? handlePress : undefined}
        />
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={gameBoardStyles.scrollContent}
    >
      <View style={gameBoardStyles.helpHeaderRow}>
        <Text style={gameBoardStyles.sectionLabel}>
          {t("beginnerHelp.protocols.sectionLabel")}
        </Text>
        <BeginnerHelpTrigger
          onPress={onOpenProtocolsHelp}
          accessibilityLabel={t("beginnerHelp.protocols.buttonLabel")}
        />
      </View>
      {protocols.map(renderProtocol)}
    </ScrollView>
  );
}
