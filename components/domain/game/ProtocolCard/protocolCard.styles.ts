import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const protocolCardStyles = StyleSheet.create({
  container: {
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    overflow: "hidden",
  },
  statusIcon: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
  },
  header: {
    gap: spacing.xs,
  },
  efficiencyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  efficiencyValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  efficiencyValue: {
    color: colors.yellow400,
    fontSize: typography.size.xl,
    lineHeight: typography.lineHeight.xl,
    fontFamily: typography.fontFamily.bold,
  },
  efficiencyLabel: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
  },
  requirements: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  sectionLabel: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
    textTransform: "uppercase",
  },
  requirementsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
    backgroundColor: colors.blackAlpha30,
    borderRadius: layout.borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  requirementValue: {
    color: colors.white,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.bold,
  },
  effect: {
    marginTop: spacing.md,
    backgroundColor: colors.blackAlpha30,
    borderRadius: layout.borderRadius.sm,
    padding: spacing.sm,
  },
  effectLabel: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
  },
  effectValue: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  claimedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.blackAlpha70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: layout.borderRadius.lg,
    gap: spacing.xs,
  },
  claimedLabel: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  compactContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    borderRadius: layout.borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  compactLabel: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
    flex: 1,
  },
  compactValue: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  compactValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
});
