import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

export const settingsModalStyles = StyleSheet.create({
  wrapper: {
    width: "100%",
    borderRadius: layout.borderRadius.lg,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha20,
    backgroundColor: colors.slate900,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.whiteAlpha10,
  },
  title: {
    color: colors.white,
    fontSize: typography.size.xl,
    lineHeight: typography.lineHeight.xl,
    fontFamily: typography.fontFamily.bold,
  },
  closeButton: {
    padding: spacing.xxs,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rowTitle: {
    color: colors.white,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  rowSubtitle: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  toggle: {
    width: layout.toggle.width,
    height: layout.toggle.height,
    borderRadius: layout.toggle.height / 2,
    backgroundColor: colors.whiteAlpha20,
    padding: layout.toggle.padding,
    justifyContent: "center",
  },
  toggleActive: {
    backgroundColor: colors.purple600,
  },
  toggleThumb: {
    width: layout.toggle.thumb,
    height: layout.toggle.thumb,
    borderRadius: layout.toggle.thumb / 2,
    backgroundColor: colors.white,
  },
  toggleDisabled: {
    width: layout.toggle.width,
    height: layout.toggle.height,
    borderRadius: layout.toggle.height / 2,
    backgroundColor: colors.whiteAlpha20,
    padding: layout.toggle.padding,
    justifyContent: "center",
  },
  toggleThumbDisabled: {
    width: layout.toggle.thumb,
    height: layout.toggle.thumb,
    borderRadius: layout.toggle.thumb / 2,
    backgroundColor: colors.whiteAlpha50,
  },
  disabledRow: {
    opacity: 0.5,
  },
  infoCard: {
    backgroundColor: colors.whiteAlpha10,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  infoValue: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  legal: {
    alignItems: "center",
    gap: spacing.xxs,
    paddingTop: spacing.md,
  },
  legalText: {
    color: colors.whiteAlpha50,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.whiteAlpha10,
  },
});
