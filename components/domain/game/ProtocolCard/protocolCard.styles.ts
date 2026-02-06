import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";
import { colors } from "@/constants/colors";

export const createProtocolCardStyles = (theme: Theme) =>
  StyleSheet.create({
  container: {
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    overflow: "hidden",
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 4,
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
    color: theme.colors.textMuted,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
  },
  requirements: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  sectionLabel: {
    color: theme.colors.textMuted,
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
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: layout.borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  requirementValue: {
    color: theme.colors.text,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.bold,
  },
  effect: {
    marginTop: spacing.md,
    backgroundColor: theme.colors.surfaceAlt,
    borderRadius: layout.borderRadius.sm,
    padding: spacing.sm,
  },
  effectLabel: {
    color: theme.colors.textMuted,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
  },
  effectValue: {
    color: theme.colors.text,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  claimedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.overlayStrong,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: layout.borderRadius.lg,
    gap: spacing.xs,
  },
  claimedLabel: {
    color: theme.colors.text,
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
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 4,
  },
  compactLabel: {
    color: theme.colors.text,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
    flex: 1,
  },
  compactValue: {
    color: theme.colors.text,
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
