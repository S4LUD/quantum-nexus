import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Zap, TrendingUp, ArrowRightLeft, Eye, Star } from "lucide-react-native";
import { colors, gradients, GradientTuple } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { EnergyIcon } from "../EnergyPool/EnergyIcon";
import { EnergyType, Node, NodeCategory } from "../game.types";
import { nodeCardStyles } from "./nodeCard.styles";
import { Text } from "@/components/ui/Text/Text";
import { Icon } from "@/components/ui/Icon/Icon";

interface NodeCardProps {
  node: Node;
  onPress?: () => void;
  isAffordable?: boolean;
  size?: "sm" | "md";
  showCost?: boolean;
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
  isAffordable = true,
  size = "md",
  showCost = true,
}: NodeCardProps) {
  const config = categoryConfig[node.category];
  const CategoryIcon = config.icon;
  const sizeStyle =
    size === "sm" ? nodeCardStyles.cardSmall : nodeCardStyles.cardMedium;
  const effectText = getEffectText(node);

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={[
        nodeCardStyles.pressable,
        !isAffordable ? nodeCardStyles.disabled : null,
      ]}
    >
      <LinearGradient
        colors={config.gradient}
        style={[nodeCardStyles.cardBase, sizeStyle]}
      >
        <View style={nodeCardStyles.header}>
          <View style={nodeCardStyles.headerLeft}>
            <CategoryIcon
              color={config.accent}
              size={size === "sm" ? layout.icon.sm : layout.icon.md}
            />
            <Text style={nodeCardStyles.headerLabel}>{config.label}</Text>
          </View>
          {node.efficiency > 0 ? (
            <View style={nodeCardStyles.efficiencyBadge}>
              <View style={nodeCardStyles.efficiencyRow}>
                <Text style={nodeCardStyles.efficiencyText}>
                  {String(node.efficiency)}
                </Text>
                <Icon
                  icon={Star}
                  size={layout.icon.sm}
                  color={colors.black}
                />
              </View>
            </View>
          ) : null}
        </View>

        <View style={nodeCardStyles.output}>
          <EnergyIcon
            type={node.outputType}
            size={size === "sm" ? "sm" : "md"}
            colored
          />
          <Text style={nodeCardStyles.outputLabel}>Output</Text>
        </View>

        {showCost ? (
          <View style={nodeCardStyles.costSection}>
            <Text style={nodeCardStyles.costLabel}>Cost</Text>
            <View style={nodeCardStyles.costRow}>
              {Object.entries(node.cost).map(([type, count]) => (
                <View key={type} style={nodeCardStyles.costItem}>
                  <EnergyIcon type={type as EnergyType} size="sm" colored />
                  <Text style={nodeCardStyles.costValue}>{String(count)}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        {effectText ? (
          <View style={nodeCardStyles.effect}>
            <Text style={nodeCardStyles.effectText}>{effectText}</Text>
          </View>
        ) : null}
      </LinearGradient>
    </Pressable>
  );
}

function getEffectText(node: Node) {
  if (!node.effectType) {
    return null;
  }

  if (node.effectType === "multiplier") {
    return `x${node.effectValue} ${node.effectTarget}`;
  }
  if (node.effectType === "discount") {
    return `-${node.effectValue} cost`;
  }
  if (node.effectType === "draw") {
    return `+${node.effectValue} draw`;
  }
  if (node.effectType === "swap") {
    return `Swap ${node.effectValue}`;
  }
  return null;
}
