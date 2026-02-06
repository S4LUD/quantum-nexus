import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createEnergyIconStyles = (theme: Theme) =>
  StyleSheet.create({
    iconRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
    },
  badge: {
    borderRadius: layout.borderRadius.md,
    position: "relative",
  },
  badgeIcon: {
    position: "absolute",
  },
  badgeIconSm: {
    top: 4,
    left: 4,
  },
  badgeIconMd: {
    top: 8,
    left: 8,
  },
  badgeIconLg: {
    top: 10,
    left: 10,
  },
  badgeCount: {
    position: "absolute",
    color: theme.colors.buttonText,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  badgeCountSm: {
    right: 4,
    bottom: 4,
  },
  badgeCountMd: {
    right: 8,
    bottom: 8,
  },
  badgeCountLg: {
    right: 10,
    bottom: 10,
  },
  });

export const energyIconSizes = {
  sm: layout.energyBadge.iconSm,
  md: layout.energyBadge.iconMd,
  lg: layout.energyBadge.iconLg,
  xl: layout.icon.xxl,
};

export const energyBadgeSizes = {
  sm: {
    container: {
      width: layout.energyBadge.sizeSm,
      height: layout.energyBadge.sizeSm,
    },
    icon: layout.energyBadge.iconSm,
  },
  md: {
    container: {
      width: layout.energyBadge.sizeMd,
      height: layout.energyBadge.sizeMd,
    },
    icon: layout.energyBadge.iconMd,
  },
  lg: {
    container: {
      width: layout.energyBadge.sizeLg,
      height: layout.energyBadge.sizeLg,
    },
    icon: layout.energyBadge.iconLg,
  },
};
