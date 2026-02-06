import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export function createTextStyles(theme: Theme) {
  return StyleSheet.create({
    body: {
      color: theme.colors.text,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.regular,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.xl,
      lineHeight: typography.lineHeight.xl,
      fontFamily: typography.fontFamily.bold,
    },
    subtitle: {
      color: theme.colors.textMuted,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontFamily: typography.fontFamily.medium,
    },
    caption: {
      color: theme.colors.textSubtle,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.regular,
    },
  });
}
