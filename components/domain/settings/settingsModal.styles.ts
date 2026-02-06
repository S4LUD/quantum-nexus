import { StyleSheet } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";

export const createSettingsModalStyles = (theme: Theme) => {
  const panelBackground =
    theme.mode === "light" ? "rgba(15,23,43,0.06)" : theme.colors.surfaceMuted;
  const toggleBackground =
    theme.mode === "light" ? "#E5E7EB" : theme.colors.surfaceMuted;

  return StyleSheet.create({
  wrapper: {
    width: "100%",
    borderRadius: layout.borderRadius.lg,
    borderWidth: layout.borderWidth.thin,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.lg,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: theme.colors.borderSubtle,
  },
  title: {
    color: theme.colors.text,
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
    color: theme.colors.text,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  rowSubtitle: {
    color: theme.colors.textMuted,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  toggle: {
    width: layout.toggle.width,
    height: layout.toggle.height,
    borderRadius: layout.toggle.height / 2,
    backgroundColor: toggleBackground,
    padding: layout.toggle.padding,
    justifyContent: "center",
    borderWidth: 0,
  },
  toggleActive: {
    backgroundColor: "#4ADE80",
  },
  toggleThumb: {
    width: layout.toggle.thumb,
    height: layout.toggle.thumb,
    borderRadius: layout.toggle.thumb / 2,
    backgroundColor: theme.colors.text,
  },
  toggleDisabled: {
    width: layout.toggle.width,
    height: layout.toggle.height,
    borderRadius: layout.toggle.height / 2,
    backgroundColor: toggleBackground,
    padding: layout.toggle.padding,
    justifyContent: "center",
  },
  toggleThumbDisabled: {
    width: layout.toggle.thumb,
    height: layout.toggle.thumb,
    borderRadius: layout.toggle.thumb / 2,
    backgroundColor: theme.colors.textSubtle,
  },
  disabledRow: {
    opacity: 0.5,
  },
  infoCard: {
    backgroundColor: panelBackground,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoLabel: {
    color: theme.colors.textMuted,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  infoValue: {
    color: theme.colors.text,
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
    color: theme.colors.textSubtle,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: theme.colors.borderSubtle,
  },
  });
};
