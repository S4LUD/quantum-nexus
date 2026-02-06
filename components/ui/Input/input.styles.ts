import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createInputStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: layout.borderRadius.md,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surfaceAlt,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    input: {
      color: theme.colors.text,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.regular,
    },
  });
