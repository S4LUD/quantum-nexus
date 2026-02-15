import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "@/components/ui/Text/Text";
import { EnergyPool } from "./EnergyPool/EnergyPool";
import { NodeCard } from "./NodeCard/NodeCard";
import { EnergyType, GameState, Node } from "./game.types";
import { GameBoardStyles } from "./gameBoard.styles";
import { BeginnerHelpTrigger } from "./BeginnerHelpTrigger";
import { useTranslation } from "react-i18next";

type MarketRow = {
  category: Node["category"];
  nodes: (Node | null | undefined)[];
};

interface MarketTabContentProps {
  energyPool: GameState["energyPool"];
  selectedEnergy: EnergyType[];
  onToggleEnergy: (type: EnergyType) => void;
  onCollectEnergy: () => void;
  onOpenExchange: () => void;
  onOpenEnergyPoolHelp: () => void;
  onEnergyPoolMeasured?: (coords: { centerX: number; centerY: number }) => void;
  onOpenMarketNodesHelp: () => void;
  isPlayerTurn: boolean;
  marketRows: MarketRow[];
  onNodePress: (node: Node) => void;
  isNodeAffordable: (node: Node) => boolean;
  gameBoardStyles: GameBoardStyles;
  getCategoryLabel: (category: Node["category"]) => string;
}

export function MarketTabContent({
  energyPool,
  selectedEnergy,
  onToggleEnergy,
  onCollectEnergy,
  onOpenExchange,
  onOpenEnergyPoolHelp,
  onEnergyPoolMeasured,
  onOpenMarketNodesHelp,
  isPlayerTurn,
  marketRows,
  onNodePress,
  isNodeAffordable,
  gameBoardStyles,
  getCategoryLabel,
}: MarketTabContentProps) {
  const { t } = useTranslation();
  const pointerEvents = isPlayerTurn ? "auto" : "none";

  const renderNode = (node: Node | null | undefined): ReactNode => {
    if (!node) {
      return null;
    }
    const handlePress = () => onNodePress(node);
    return (
      <View
        key={node.id}
        style={gameBoardStyles.marketNodeWrapper}
        pointerEvents={pointerEvents}
      >
        <NodeCard
          node={node}
          onPress={isPlayerTurn ? handlePress : undefined}
          showTitle={false}
          isAffordable={isPlayerTurn ? isNodeAffordable(node) : false}
        />
      </View>
    );
  };

  const renderMarketSection = (row: MarketRow) => {
    const marketNodes = row.nodes.map(renderNode);
    return (
      <View key={row.category} style={gameBoardStyles.section}>
        <Text style={gameBoardStyles.sectionLabel}>{getCategoryLabel(row.category)}</Text>
        <View style={gameBoardStyles.sectionRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={gameBoardStyles.row}
          >
            {marketNodes}
          </ScrollView>
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={gameBoardStyles.scrollContent}
    >
      <EnergyPool
        energyPool={energyPool}
        selectedEnergy={selectedEnergy}
        onToggleEnergy={onToggleEnergy}
        onCollect={onCollectEnergy}
        onExchange={onOpenExchange}
        onOpenHelp={onOpenEnergyPoolHelp}
        onMeasured={onEnergyPoolMeasured}
        disabled={!isPlayerTurn}
      />
      <View style={gameBoardStyles.helpHeaderRow}>
        <Text style={gameBoardStyles.sectionLabel}>
          {t("beginnerHelp.marketNodes.sectionLabel")}
        </Text>
        <BeginnerHelpTrigger
          onPress={onOpenMarketNodesHelp}
          accessibilityLabel={t("beginnerHelp.marketNodes.buttonLabel")}
        />
      </View>
      {marketRows.map(renderMarketSection)}
    </ScrollView>
  );
}
