import { StyleSheet } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";

export const createQuickPlayModalStyles = (theme: Theme) =>
  StyleSheet.create({
    gradient: {
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      overflow: "hidden",
    },
    container: {
      padding: spacing.lg,
      gap: spacing.lg,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontFamily: typography.fontFamily.bold,
    },
    section: {
      gap: spacing.sm,
    },
    sectionLabel: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    optionsRow: {
      flexDirection: "row",
      gap: spacing.sm,
      flexWrap: "wrap",
    },
    optionButton: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: layout.borderRadius.md,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surfaceAlt,
    },
    optionButtonActive: {
      borderColor: theme.colors.text,
      backgroundColor: theme.colors.surfaceMuted,
    },
    optionText: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.medium,
    },
  });
