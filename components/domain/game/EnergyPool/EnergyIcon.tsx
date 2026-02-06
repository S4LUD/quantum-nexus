import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Zap, Droplet, Flame, Brain, Sparkles } from "lucide-react-native";
import {
  energyBadgeSizes,
  energyIconSizes,
  createEnergyIconStyles,
} from "./energyIcon.styles";
import { Text } from "@/components/ui/Text/Text";
import { EnergyType } from "../game.types";
import { useTheme } from "@/hooks/useTheme";
import { useMemo } from "react";

interface EnergyIconProps {
  type: EnergyType;
  size?: "sm" | "md" | "lg" | "xl" | number;
  count?: number;
  colored?: boolean;
}

const iconMap: Record<EnergyType, { icon: typeof Zap; label: string }> = {
  solar: { icon: Zap, label: "Solar" },
  hydro: { icon: Droplet, label: "Hydro" },
  plasma: { icon: Flame, label: "Plasma" },
  neural: { icon: Brain, label: "Neural" },
  flux: { icon: Sparkles, label: "Flux" },
};

export function EnergyIcon({
  type,
  size = "md",
  count,
  colored = false,
}: EnergyIconProps) {
  const { theme } = useTheme();
  const energyIconStyles = useMemo(
    () => createEnergyIconStyles(theme),
    [theme],
  );
  const config = iconMap[type];
  const Icon = config.icon;
  const iconSize =
    typeof size === "number" ? size : energyIconSizes[size];
  const iconColor = colored ? theme.energy.colors[type] : theme.colors.text;

  return (
    <View style={energyIconStyles.iconRow}>
      <Icon color={iconColor} size={iconSize} />
      {count !== undefined ? (
        <Text variant="caption">{String(count)}</Text>
      ) : null}
    </View>
  );
}

interface EnergyBadgeProps {
  type: EnergyType;
  count: number;
  size?: "sm" | "md" | "lg";
}

export function EnergyBadge({ type, count, size = "md" }: EnergyBadgeProps) {
  const { theme } = useTheme();
  const energyIconStyles = useMemo(
    () => createEnergyIconStyles(theme),
    [theme],
  );
  const config = iconMap[type];
  const Icon = config.icon;
  const badgeStyle = energyBadgeSizes[size];
  const iconColor =
    theme.mode === "light" ? theme.colors.buttonText : theme.colors.text;
  const iconPositionStyle =
    size === "sm"
      ? energyIconStyles.badgeIconSm
      : size === "lg"
        ? energyIconStyles.badgeIconLg
        : energyIconStyles.badgeIconMd;
  const countPositionStyle =
    size === "sm"
      ? energyIconStyles.badgeCountSm
      : size === "lg"
        ? energyIconStyles.badgeCountLg
        : energyIconStyles.badgeCountMd;

  return (
    <LinearGradient
      colors={theme.energy.gradients[type]}
      style={[energyIconStyles.badge, badgeStyle.container]}
    >
      <Icon
        color={iconColor}
        size={badgeStyle.icon}
        fill="none"
        style={[energyIconStyles.badgeIcon, iconPositionStyle]}
      />
      <Text
        style={[energyIconStyles.badgeCount, countPositionStyle]}
      >
        {String(count)}
      </Text>
    </LinearGradient>
  );
}
