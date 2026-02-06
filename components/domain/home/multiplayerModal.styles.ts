import { StyleSheet } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";
import { colors } from "@/constants/colors";

export const createMultiplayerModalStyles = (theme: Theme) =>
  StyleSheet.create({
    gradient: {
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      overflow: "hidden",
    },
    container: {
      padding: spacing.lg,
      gap: spacing.md,
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
    },
    section: {
      gap: spacing.xs,
    },
    label: {
      color: theme.colors.text,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    actions: {
      gap: spacing.sm,
    },
    errorText: {
      color: colors.red400,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
    },
  });
