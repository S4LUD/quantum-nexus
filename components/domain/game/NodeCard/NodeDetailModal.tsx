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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
  > = useMemo(
    () => ({
      research: {
        label: t("categories.research"),
        gradient: gradients.research,
        icon: Eye,
        description: t("categoryDescriptions.research"),
        accent: colors.cyan400,
      },
      production: {
        label: t("categories.production"),
        gradient: gradients.production,
        icon: TrendingUp,
        description: t("categoryDescriptions.production"),
        accent: colors.pink400,
      },
      network: {
        label: t("categories.network"),
        gradient: gradients.network,
        icon: Zap,
        description: t("categoryDescriptions.network"),
        accent: colors.orange400,
      },
      control: {
        label: t("categories.control"),
        gradient: gradients.control,
        icon: ArrowRightLeft,
        description: t("categoryDescriptions.control"),
        accent: colors.green400,
      },
    }),
    [t],
  );

  const effectDescriptions = useMemo(
    () => ({
      multiplier: t("effects.multiplier", {
        target: t(`energy.${node.effectTarget}`),
        value: node.effectValue,
      }),
      discount: t("effects.discount", {
        target: t(`energy.${node.effectTarget}`),
        value: node.effectValue,
      }),
      draw: t("effects.draw", { value: node.effectValue }),
      swap: t("effects.swap", { value: node.effectValue }),
    }),
    [node.effectTarget, node.effectValue, t],
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
                      {config.label} {t("game.node")}
                    </Text>
                  </View>
                  {node.efficiency > 0 ? (
                    <View style={nodeDetailStyles.efficiencyBadge}>
                      <Text style={nodeDetailStyles.badgeText}>
                        {node.efficiency} {t("game.efficiency")}
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View style={nodeDetailStyles.hero}>
                  <EnergyIcon type={node.outputType} size="lg" colored />
                  <Text style={nodeDetailStyles.heroTitle}>
                    {t(`energy.${node.outputType}`)}
                  </Text>
                  <Text style={nodeDetailStyles.heroSubtitle}>
                    {t("game.providesOutput")}
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
                        {t("game.specialEffect")}
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
                            {t(`effectsTitle.${node.effectType}`)}
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
                      {t("game.energyCost")}
                    </Text>
                    <View style={nodeDetailStyles.energyRow}>
                      {costEntries.map(renderCostItem)}
                    </View>
                    {discountsApplied ? (
                      <View style={nodeDetailStyles.discountNote}>
                        <Text style={nodeDetailStyles.discountTitle}>
                          {t("game.discountsApplied")}
                        </Text>
                        <View style={nodeDetailStyles.discountList}>
                          {discountEntries.map(renderDiscountLine)}
                        </View>
                      </View>
                    ) : null}
                  </View>

                  <View style={nodeDetailStyles.section}>
                    <Text style={nodeDetailStyles.sectionLabel}>
                      {t("game.yourEnergy")}
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
                    {isAffordable
                      ? t("game.buildNode")
                      : t("game.insufficientEnergy")}
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
                      {t("game.reserveNode")}
                    </Text>
                  </Pressable>
                ) : (
                  <Text style={nodeDetailStyles.reservedNote}>
                    {t("game.alreadyReserved")}
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
