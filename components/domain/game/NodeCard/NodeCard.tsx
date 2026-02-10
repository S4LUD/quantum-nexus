import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Zap,
  TrendingUp,
  ArrowRightLeft,
  Eye,
  Star,
} from "lucide-react-native";
import { useCallback, useMemo } from "react";
import { colors, gradients, GradientTuple } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { Text } from "@/components/ui/Text/Text";
import { Icon } from "@/components/ui/Icon/Icon";
import { EnergyIcon } from "../EnergyPool/EnergyIcon";
import { EnergyType, Node, NodeCategory } from "../game.types";
import { createNodeCardStyles } from "./nodeCard.styles";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

interface NodeCardProps {
  node: Node;
  onPress?: () => void;
  isAffordable?: boolean;
  size?: "sm" | "md";
  showCost?: boolean;
  showTitle?: boolean;
}

const categoryConfigBase: Record<
  NodeCategory,
  { gradient: GradientTuple; icon: typeof Eye; accent: string }
> = {
  research: {
    gradient: gradients.research,
    icon: Eye,
    accent: colors.cyan400,
  },
  production: {
    gradient: gradients.production,
    icon: TrendingUp,
    accent: colors.pink400,
  },
  network: {
    gradient: gradients.network,
    icon: Zap,
    accent: colors.orange400,
  },
  control: {
    gradient: gradients.control,
    icon: ArrowRightLeft,
    accent: colors.green400,
  },
};

export function NodeCard({
  node,
  onPress,
  isAffordable = false,
  size = "md",
  showCost = true,
  showTitle = false,
}: NodeCardProps) {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const nodeCardStyles = useMemo(() => createNodeCardStyles(theme), [theme]);
  const config = useMemo(
    () => ({
      ...categoryConfigBase[node.category],
      label: t(`categories.${node.category}`),
    }),
    [node.category, t],
  );
  const CategoryIcon = config.icon;
  const sizeStyle =
    size === "sm" ? nodeCardStyles.cardSmall : nodeCardStyles.cardMedium;
  const effectText = useMemo(() => {
    if (!node.effectType) {
      return null;
    }
    if (node.effectType === "multiplier") {
      return t("nodeCard.effect.multiplier", { value: node.effectValue });
    }
    if (node.effectType === "discount") {
      return t("nodeCard.effect.discount", { value: node.effectValue });
    }
    if (node.effectType === "reclaim") {
      return t("nodeCard.effect.reclaim", { value: node.effectValue });
    }
    if (node.effectType === "swap") {
      return t("nodeCard.effect.swap");
    }
    return null;
  }, [node.effectType, node.effectValue, t]);
  const costEntries = useMemo(
    () =>
      (Object.entries(node.cost) as [EnergyType, number][]).filter(
        ([type, count]) => type !== "flux" && count > 0,
      ),
    [node.cost],
  );
  const renderCostItem = useCallback(
    ([type, count]: [EnergyType, number]) => (
      <View key={type} style={nodeCardStyles.costItem}>
        <EnergyIcon type={type} size="sm" colored />
        <Text style={nodeCardStyles.costValue}>{String(count)}</Text>
      </View>
    ),
    [nodeCardStyles.costItem, nodeCardStyles.costValue],
  );

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={nodeCardStyles.pressable}
    >
      <View
        style={[
          nodeCardStyles.cardWrapper,
          sizeStyle,
          isAffordable ? nodeCardStyles.affordable : null,
        ]}
      >
        <LinearGradient
          colors={config.gradient}
          style={nodeCardStyles.cardBase}
        >
          <View style={nodeCardStyles.cardInner}>
            <View style={nodeCardStyles.topRow}>
              <View style={nodeCardStyles.categoryBadge}>
                <CategoryIcon
                  color={config.accent}
                  size={size === "sm" ? layout.icon.sm : layout.icon.md}
                />
                {showTitle ? (
                  <Text style={nodeCardStyles.categoryLabel}>
                    {config.label}
                  </Text>
                ) : null}
              </View>
              {node.efficiency > 0 ? (
                <View style={nodeCardStyles.efficiencyBadge}>
                  <Text style={nodeCardStyles.efficiencyText}>
                    {String(node.efficiency)}
                  </Text>
                  <Icon
                    icon={Star}
                    size={layout.icon.sm}
                    color={colors.black}
                  />
                </View>
              ) : null}
            </View>

            <View style={nodeCardStyles.centerIcon}>
              <EnergyIcon type={node.outputType} size="xl" colored />
            </View>

            {showCost ? (
              <View style={nodeCardStyles.costPanel}>
                <View style={nodeCardStyles.costRow}>
                  {costEntries.map(renderCostItem)}
                </View>
              </View>
            ) : null}
          </View>
        </LinearGradient>
        {effectText ? (
          <View style={nodeCardStyles.effectPillFloat}>
            <View style={nodeCardStyles.effectPill}>
              <Text style={nodeCardStyles.effectText}>{effectText}</Text>
            </View>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
