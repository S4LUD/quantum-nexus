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

interface NodeCardProps {
  node: Node;
  onPress?: () => void;
  isAffordable?: boolean;
  size?: "sm" | "md";
  showCost?: boolean;
  showTitle?: boolean;
}

const categoryConfig: Record<
  NodeCategory,
  { label: string; gradient: GradientTuple; icon: typeof Eye; accent: string }
> = {
  research: {
    label: "Research",
    gradient: gradients.research,
    icon: Eye,
    accent: colors.cyan400,
  },
  production: {
    label: "Production",
    gradient: gradients.production,
    icon: TrendingUp,
    accent: colors.pink400,
  },
  network: {
    label: "Network",
    gradient: gradients.network,
    icon: Zap,
    accent: colors.orange400,
  },
  control: {
    label: "Control",
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
  const nodeCardStyles = useMemo(() => createNodeCardStyles(theme), [theme]);
  const config = categoryConfig[node.category];
  const CategoryIcon = config.icon;
  const sizeStyle =
    size === "sm" ? nodeCardStyles.cardSmall : nodeCardStyles.cardMedium;
  const effectText = getEffectText(node);
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

function getEffectText(node: Node) {
  if (!node.effectType) {
    return null;
  }

  if (node.effectType === "multiplier") {
    return `x${node.effectValue} Mult`;
  }
  if (node.effectType === "discount") {
    return `-${node.effectValue} Cost`;
  }
  if (node.effectType === "draw") {
    return `+${node.effectValue} Draw`;
  }
  if (node.effectType === "swap") {
    return "Swap";
  }
  return null;
}
