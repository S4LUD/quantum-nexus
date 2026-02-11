import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createLeaveGameModalStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      width: "100%",
      maxWidth: 360,
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
      textAlign: "center",
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontFamily: typography.fontFamily.medium,
    },
    message: {
      color: theme.colors.textMuted,
      textAlign: "center",
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.regular,
    },
    actions: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    actionButton: {
      flex: 1,
    },
  });
