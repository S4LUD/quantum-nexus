import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const nodeCardStyles = StyleSheet.create({
  pressable: {
    borderRadius: layout.borderRadius.lg,
  },
  disabled: {
    opacity: 0.5,
  },
  cardBase: {
    borderRadius: layout.borderRadius.lg,
    overflow: "hidden",
  },
  cardSmall: {
    width: layout.nodeCard.widthSm,
    minHeight: layout.nodeCard.minHeightSm,
  },
  cardMedium: {
    width: layout.nodeCard.widthMd,
    minHeight: layout.nodeCard.minHeightMd,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.blackAlpha30,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    minHeight: layout.nodeCard.headerHeight,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  headerLabel: {
    color: colors.white,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.bold,
    textTransform: "uppercase",
  },
  efficiencyBadge: {
    backgroundColor: colors.yellow400,
    borderRadius: layout.borderRadius.sm,
    paddingHorizontal: spacing.xxs,
    paddingVertical: spacing.xxs,
  },
  efficiencyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxxs,
  },
  efficiencyText: {
    color: colors.black,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.bold,
  },
  output: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.xxs,
    backgroundColor: colors.blackAlpha20,
    minHeight: layout.nodeCard.outputHeight,
  },
  outputLabel: {
    color: colors.white,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
  },
  costSection: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    gap: spacing.xxs,
  },
  costLabel: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
    textTransform: "uppercase",
  },
  costRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xxs,
  },
  costItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
    backgroundColor: colors.blackAlpha30,
    borderRadius: layout.borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  costValue: {
    color: colors.white,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.bold,
  },
  effect: {
    position: "absolute",
    left: spacing.xs,
    right: spacing.xs,
    bottom: spacing.xs,
    backgroundColor: colors.blackAlpha50,
    borderRadius: layout.borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  effectText: {
    color: colors.white,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
  },
});
