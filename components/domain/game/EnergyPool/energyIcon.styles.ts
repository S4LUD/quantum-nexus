import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const energyIconStyles = StyleSheet.create({
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  badge: {
    borderRadius: layout.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
  },
  badgeCount: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
});

export const energyIconSizes = {
  sm: layout.energyBadge.iconSm,
  md: layout.energyBadge.iconMd,
  lg: layout.energyBadge.iconLg,
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
