import { useCallback, useMemo } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import {
  X,
  Zap,
  TrendingUp,
  Eye,
  ArrowRightLeft,
  Lock,
  CheckCircle,
} from "lucide-react-native";
import { Text } from "@/components/ui/Text/Text";
import { Icon } from "@/components/ui/Icon/Icon";
import { LinearGradient } from "expo-linear-gradient";
import { colors, gradients, GradientTuple } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { canAffordNode, calculateNodeCost } from "@/logic/gameEngine";
import { EnergyIcon } from "../EnergyPool/EnergyIcon";
import { EnergyType, Node, NodeCategory, Player } from "../game.types";
import { createNodeDetailStyles } from "./nodeDetail.styles";
import { useTheme } from "@/hooks/useTheme";

interface NodeDetailModalProps {
  node: Node;
  player: Player;
  isOpen: boolean;
  onClose: () => void;
  onBuild: (node: Node) => void;
  onReserve: (node: Node) => void;
}

export function NodeDetailModal({
  node,
  player,
  isOpen,
  onClose,
  onBuild,
  onReserve,
}: NodeDetailModalProps) {
  const { theme } = useTheme();
  const nodeDetailStyles = useMemo(
    () => createNodeDetailStyles(theme),
    [theme],
  );
  const isAffordable = canAffordNode(node, player);
  const actualCost = calculateNodeCost(node, player);
  const isReserved = player.reservedNodes.some(
    (reserved) => reserved.id === node.id,
  );

  const categoryConfig: Record<
    NodeCategory,
    {
      label: string;
      gradient: GradientTuple;
      icon: typeof Eye;
      description: string;
      accent: string;
    }
  > = {
    research: {
      label: "Research",
      gradient: gradients.research,
      icon: Eye,
      description:
        "Research nodes provide special abilities and efficiency boosts.",
      accent: colors.cyan400,
    },
    production: {
      label: "Production",
      gradient: gradients.production,
      icon: TrendingUp,
      description: "Production nodes offer high efficiency with greater costs.",
      accent: colors.pink400,
    },
    network: {
      label: "Network",
      gradient: gradients.network,
      icon: Zap,
      description:
        "Network nodes are complex, high-value additions to your system.",
      accent: colors.orange400,
    },
    control: {
      label: "Control",
      gradient: gradients.control,
      icon: ArrowRightLeft,
      description: "Control nodes provide utility effects and flexibility.",
      accent: colors.green400,
    },
  };

  const effectDescriptions = useMemo(
    () => ({
      multiplier: `Multiplies ${node.effectTarget} output generation by ${node.effectValue}x`,
      discount: `Reduces ${node.effectTarget} costs by ${node.effectValue} when building nodes`,
      draw: `Allows viewing ${node.effectValue} additional node(s) from deck`,
      swap: `Enables swapping up to ${node.effectValue} energy types`,
    }),
    [node.effectTarget, node.effectValue],
  );

  const config = categoryConfig[node.category];
  const CategoryIcon = config.icon;

  const energyEntries = useMemo(
    () => Object.entries(player.energy) as [EnergyType, number][],
    [player.energy],
  );

  const costEntries = useMemo(
    () =>
      (Object.entries(actualCost) as [EnergyType, number][]).filter(
        ([type, count]) => type !== "flux" && count > 0,
      ),
    [actualCost],
  );

  const baseCost = node.cost;
  const baseCostByType = useMemo(() => {
    const record: Record<EnergyType, number> = {
      solar: 0,
      hydro: 0,
      plasma: 0,
      neural: 0,
      flux: 0,
    };
    (
      Object.entries(baseCost) as [Exclude<EnergyType, "flux">, number][]
    ).forEach(([type, value]) => {
      record[type] = value;
    });
    return record;
  }, [baseCost]);

  const discountsApplied = useMemo(() => {
    return (Object.entries(actualCost) as [EnergyType, number][]).some(
      ([type, count]) => {
        if (type === "flux") {
          return false;
        }
        return count !== baseCostByType[type];
      },
    );
  }, [actualCost, baseCostByType]);
  const discountEntries = useMemo(
    () =>
      (Object.entries(actualCost) as [EnergyType, number][])
        .filter(([type, count]) => {
          if (type === "flux") {
            return false;
          }
          return count < baseCostByType[type];
        })
        .map(([type, count]) => ({
          type,
          amount: baseCostByType[type] - count,
        })),
    [actualCost, baseCostByType],
  );

  const handleBuild = useCallback(() => {
    onBuild(node);
  }, [node, onBuild]);

  const handleReserve = useCallback(() => {
    onReserve(node);
  }, [node, onReserve]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleBackdropPress = useCallback(() => {
    onClose();
  }, [onClose]);

  const renderCostItem = useCallback(
    ([type, count]: [EnergyType, number]) => {
      return (
        <View key={type} style={nodeDetailStyles.energyItem}>
          <EnergyIcon type={type} size="sm" colored />
          <Text style={nodeDetailStyles.energyCount}>{String(count)}</Text>
        </View>
      );
    },
    [nodeDetailStyles.energyCount, nodeDetailStyles.energyItem],
  );

  const renderEnergyItem = useCallback(
    ([type, count]: [EnergyType, number]) => {
      const needed = actualCost[type] || 0;
      const needsMore = count < needed;
      return (
        <View
          key={type}
          style={[
            nodeDetailStyles.energyItem,
            needsMore ? nodeDetailStyles.energyItemAlert : null,
          ]}
        >
          <EnergyIcon type={type} size="sm" colored />
          <Text style={nodeDetailStyles.energyCount}>{String(count)}</Text>
        </View>
      );
    },
    [
      actualCost,
      nodeDetailStyles.energyCount,
      nodeDetailStyles.energyItem,
      nodeDetailStyles.energyItemAlert,
    ],
  );
  const renderDiscountLine = useCallback(
    ({ type, amount }: { type: EnergyType; amount: number }) => (
      <View key={type} style={nodeDetailStyles.discountLine}>
        <EnergyIcon type={type} size="sm" colored />
        <Text style={nodeDetailStyles.discountValue}>-{amount}</Text>
      </View>
    ),
    [nodeDetailStyles.discountLine, nodeDetailStyles.discountValue],
  );

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View style={nodeDetailStyles.screen}>
        <Pressable
          style={nodeDetailStyles.backdrop}
          onPress={handleBackdropPress}
        />
        <View style={nodeDetailStyles.sheetContainer}>
          <View style={nodeDetailStyles.sheetWrapper}>
            <View style={nodeDetailStyles.sheet}>
              <LinearGradient
                colors={config.gradient}
                style={nodeDetailStyles.sheetGradient}
              >
                <Pressable
                  onPress={handleClose}
                  style={nodeDetailStyles.closeButton}
                >
                  <Icon icon={X} size={layout.icon.md} color={colors.white} />
                </Pressable>

                <View style={nodeDetailStyles.badgeRow}>
                  <View style={nodeDetailStyles.categoryBadge}>
                    <CategoryIcon color={config.accent} size={layout.icon.sm} />
                    <Text style={nodeDetailStyles.badgeText}>
                      {config.label} Node
                    </Text>
                  </View>
                  {node.efficiency > 0 ? (
                    <View style={nodeDetailStyles.efficiencyBadge}>
                      <Text style={nodeDetailStyles.badgeText}>
                        {node.efficiency} Efficiency
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View style={nodeDetailStyles.hero}>
                  <EnergyIcon type={node.outputType} size="lg" colored />
                  <Text style={nodeDetailStyles.heroTitle}>
                    {node.outputType}
                  </Text>
                  <Text style={nodeDetailStyles.heroSubtitle}>
                    Provides output
                  </Text>
                </View>
              </LinearGradient>

              <ScrollView
                style={nodeDetailStyles.sheetScroll}
                contentContainerStyle={nodeDetailStyles.sheetContent}
                showsVerticalScrollIndicator={false}
              >
                <View style={nodeDetailStyles.body}>
                  {node.effectType ? (
                    <View style={nodeDetailStyles.section}>
                      <Text style={nodeDetailStyles.sectionLabel}>
                        Special Effect
                      </Text>
                      <View style={nodeDetailStyles.effectRow}>
                        <View style={nodeDetailStyles.effectIcon}>
                          <Icon
                            icon={Zap}
                            size={layout.icon.md}
                            color={config.accent}
                          />
                        </View>
                        <View style={nodeDetailStyles.effectContent}>
                          <Text style={nodeDetailStyles.effectTitle}>
                            {node.effectType}
                          </Text>
                          <Text style={nodeDetailStyles.effectText}>
                            {effectDescriptions[node.effectType]}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : null}

                  <View style={nodeDetailStyles.descriptionCard}>
                    <Text style={nodeDetailStyles.descriptionText}>
                      {config.description}
                    </Text>
                  </View>

                  <View style={nodeDetailStyles.section}>
                    <Text style={nodeDetailStyles.sectionLabel}>
                      Energy Cost
                    </Text>
                    <View style={nodeDetailStyles.energyRow}>
                      {costEntries.map(renderCostItem)}
                    </View>
                    {discountsApplied ? (
                      <View style={nodeDetailStyles.discountNote}>
                        <Text style={nodeDetailStyles.discountTitle}>
                          Discounts Applied
                        </Text>
                        <View style={nodeDetailStyles.discountList}>
                          {discountEntries.map(renderDiscountLine)}
                        </View>
                      </View>
                    ) : null}
                  </View>

                  <View style={nodeDetailStyles.section}>
                    <Text style={nodeDetailStyles.sectionLabel}>
                      Your Energy
                    </Text>
                    <View style={nodeDetailStyles.energyRow}>
                      {energyEntries.map(renderEnergyItem)}
                    </View>
                  </View>
                </View>
              </ScrollView>

              <View style={nodeDetailStyles.footer}>
                <Pressable
                  onPress={handleBuild}
                  disabled={!isAffordable}
                  style={[
                    nodeDetailStyles.primaryButton,
                    !isAffordable
                      ? nodeDetailStyles.primaryButtonDisabled
                      : null,
                  ]}
                >
                  <Icon
                    icon={isAffordable ? CheckCircle : Lock}
                    size={layout.icon.md}
                    color={
                      isAffordable
                        ? theme.colors.buttonText
                        : theme.colors.textSubtle
                    }
                  />
                  <Text
                    style={[
                      nodeDetailStyles.primaryButtonText,
                      !isAffordable
                        ? nodeDetailStyles.primaryButtonTextDisabled
                        : null,
                    ]}
                  >
                    {isAffordable ? "Build Node" : "Insufficient Energy"}
                  </Text>
                </Pressable>

                {!isReserved ? (
                  <Pressable
                    onPress={handleReserve}
                    disabled={player.reservedNodes.length >= 3}
                    style={[
                      nodeDetailStyles.secondaryButton,
                      player.reservedNodes.length >= 3
                        ? nodeDetailStyles.secondaryButtonDisabled
                        : null,
                    ]}
                  >
                    <Text style={nodeDetailStyles.secondaryButtonText}>
                      Reserve Node
                    </Text>
                  </Pressable>
                ) : (
                  <Text style={nodeDetailStyles.reservedNote}>
                    Already in your reserved nodes
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
