import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Platform, StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createInputStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: layout.borderRadius.md,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surfaceAlt,
      paddingHorizontal: Platform.OS === "android" ? spacing.xs : spacing.md,
      paddingVertical: Platform.OS === "android" ? spacing.xxxs : spacing.sm,
    },
    input: {
      color: theme.colors.text,
      fontSize: Platform.OS === "android" ? typography.size.sm : typography.size.md,
      fontFamily: typography.fontFamily.regular,
    },
  });
