import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createBeginnerHelpModalStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      width: "100%",
      maxWidth: 360,
      maxHeight: 440,
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      backgroundColor: theme.colors.surfaceStrong,
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      gap: spacing.md,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontFamily: typography.fontFamily.bold,
    },
    bodyScroll: {
      maxHeight: 300,
    },
    body: {
      gap: spacing.sm,
    },
    line: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.regular,
    },
  });
