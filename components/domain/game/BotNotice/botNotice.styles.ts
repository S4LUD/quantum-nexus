import { StyleSheet } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";
import { colors } from "@/constants/colors";

export const createBotNoticeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      top: spacing.xxxl + spacing.md,
      left: spacing.lg,
      right: spacing.lg,
      gap: spacing.xs,
      zIndex: 20,
      elevation: 20,
    },
    card: {
      backgroundColor: theme.colors.surfaceStrong,
      borderRadius: layout.borderRadius.lg,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: colors.cyan500,
      shadowColor: colors.cyan500,
      shadowOpacity: 0.4,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 4 },
    },
    text: {
      color: theme.colors.text,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.bold,
      textAlign: "center",
    },
});
