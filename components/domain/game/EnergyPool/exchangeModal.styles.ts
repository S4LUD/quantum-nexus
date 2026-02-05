import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

export const exchangeModalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.blackAlpha70,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  card: {
    width: "100%",
    maxWidth: layout.maxWidth,
    borderRadius: layout.borderRadius.lg,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha10,
    backgroundColor: colors.slate900,
    overflow: "hidden",
  },
  header: {
    padding: spacing.lg,
    gap: spacing.xxs,
  },
  title: {
    color: colors.white,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontFamily: typography.fontFamily.bold,
  },
  subtitle: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
  },
  modeRow: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  modeButton: {
    flex: 1,
    paddingVertical: spacing.xs,
    borderRadius: layout.borderRadius.md,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha20,
    backgroundColor: colors.blackAlpha20,
    alignItems: "center",
  },
  modeButtonActive: {
    borderColor: colors.purple400,
    backgroundColor: colors.whiteAlpha10,
  },
  modeText: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  sectionLabel: {
    color: colors.whiteAlpha75,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
    textTransform: "uppercase",
  },
  energyRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  energyButton: {
    alignItems: "center",
    padding: spacing.xs,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.whiteAlpha05,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha10,
    minWidth: layout.exchangeButton.minWidth,
  },
  energyButtonActive: {
    borderColor: colors.purple400,
    backgroundColor: colors.whiteAlpha10,
  },
  energyLabel: {
    marginTop: spacing.xxs,
    color: colors.whiteAlpha80,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
    textTransform: "capitalize",
  },
  selectedCount: {
    marginTop: spacing.xxs,
    color: colors.white,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.bold,
  },
  footer: {
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.whiteAlpha10,
    padding: spacing.md,
    flexDirection: "row",
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.whiteAlpha10,
    alignItems: "center",
  },
  cancelText: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
  },
  confirmButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.purple600,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: colors.whiteAlpha10,
  },
  confirmText: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
});
