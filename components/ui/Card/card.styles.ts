import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createCardStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surfaceAlt,
      padding: spacing.md,
    },
  });
