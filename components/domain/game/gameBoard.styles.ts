import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createGameBoardStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      paddingTop:
        spacing.xxxl + spacing.xxxl + spacing.xxxl + spacing.xxxl + spacing.xxl,
      paddingBottom: spacing.xxxl + spacing.xxxl + spacing.xxxl + spacing.xxl,
      paddingHorizontal: spacing.md,
      gap: spacing.lg,
    },
    sectionRow: {
      marginHorizontal: -spacing.md,
    },
    section: {
      gap: spacing.sm,
    },
    sectionLabel: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    row: {
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
    },
  });
