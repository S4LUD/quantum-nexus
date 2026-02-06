import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Zap, Droplet, Flame, Brain, Sparkles } from "lucide-react-native";
import { colors, gradients } from "@/constants/colors";
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

type GradientTuple = readonly [string, string, ...string[]];

const iconConfig: Record<
  EnergyType,
  { icon: typeof Zap; gradient: GradientTuple; label: string; color: string }
> = {
  solar: {
    icon: Zap,
    gradient: gradients.energySolar as GradientTuple,
    label: "Solar",
    color: colors.yellow400,
  },
  hydro: {
    icon: Droplet,
    gradient: gradients.energyHydro as GradientTuple,
    label: "Hydro",
    color: colors.cyan400,
  },
  plasma: {
    icon: Flame,
    gradient: gradients.energyPlasma as GradientTuple,
    label: "Plasma",
    color: colors.pink400,
  },
  neural: {
    icon: Brain,
    gradient: gradients.energyNeural as GradientTuple,
    label: "Neural",
    color: colors.green400,
  },
  flux: {
    icon: Sparkles,
    gradient: gradients.energyFlux as GradientTuple,
    label: "Flux",
    color: colors.purple400,
  },
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
  const config = iconConfig[type];
  const Icon = config.icon;
  const iconSize =
    typeof size === "number" ? size : energyIconSizes[size];
  const iconColor = colored ? config.color : theme.colors.text;

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
  const config = iconConfig[type];
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
      colors={config.gradient}
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
