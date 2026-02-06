import { StyleSheet } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";

export const createDrawModalStyles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.lg,
    },
    card: {
      width: "100%",
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      backgroundColor: theme.colors.surface,
      overflow: "hidden",
    },
    header: {
      padding: spacing.lg,
      gap: spacing.xxs,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontFamily: typography.fontFamily.bold,
    },
    subtitle: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.medium,
    },
    optionsRow: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.lg,
      gap: spacing.md,
    },
    footer: {
      borderTopWidth: layout.borderWidth.thin,
      borderTopColor: theme.colors.borderSubtle,
      padding: spacing.md,
      alignItems: "flex-end",
    },
    skipButton: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      borderRadius: layout.borderRadius.md,
      backgroundColor: theme.colors.surfaceMuted,
    },
    skipText: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.bold,
    },
  });
