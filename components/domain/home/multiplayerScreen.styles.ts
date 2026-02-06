import { StyleSheet } from "react-native";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { layout } from "@/constants/layout";
import { Theme } from "@/constants/theme";
import { colors } from "@/constants/colors";

export const createMultiplayerScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingVertical: spacing.xl,
      gap: spacing.md,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.xl,
      lineHeight: typography.lineHeight.xl,
      fontFamily: typography.fontFamily.bold,
    },
    subtitle: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
    },
    actionsCard: {
      gap: spacing.md,
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      backgroundColor: theme.colors.surfaceAlt,
      padding: spacing.md,
    },
    section: {
      gap: spacing.xs,
    },
    sectionLabel: {
      color: theme.colors.text,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    errorText: {
      color: colors.red400,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
    },
  });
