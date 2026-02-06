import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export function createButtonStyles(theme: Theme) {
  return StyleSheet.create({
    container: {
      borderRadius: layout.borderRadius.md,
    },
    gradient: {
      borderRadius: layout.borderRadius.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      alignItems: "center",
      justifyContent: "center",
    },
    primary: {
      backgroundColor: theme.gradients.primaryButton[0],
    },
    secondary: {
      backgroundColor: theme.gradients.secondaryButton[0],
    },
    disabled: {
      opacity: 0.6,
    },
    label: {
      color: theme.colors.buttonText,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.medium,
    },
  });
}
