import { StyleSheet } from "react-native";
import { gradients } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";

export const createAlertModalStyles = (theme: Theme) =>
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
      maxWidth: layout.maxWidth,
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      backgroundColor: theme.colors.surface,
      overflow: "hidden",
    },
    content: {
      padding: spacing.lg,
      gap: spacing.xs,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontFamily: typography.fontFamily.bold,
    },
    message: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.medium,
    },
    footer: {
      padding: spacing.md,
      borderTopWidth: layout.borderWidth.thin,
      borderTopColor: theme.colors.borderSubtle,
    },
    button: {
      borderRadius: layout.borderRadius.md,
      paddingVertical: spacing.sm,
      alignItems: "center",
      backgroundColor: gradients.protocolActive[0],
    },
    buttonText: {
      color: theme.colors.buttonText,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.bold,
    },
  });
