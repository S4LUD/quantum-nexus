import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createBeginnerHelpTriggerStyles = (theme: Theme) =>
  StyleSheet.create({
    button: {
      width: spacing.xl,
      height: spacing.xl,
      borderRadius: spacing.xl / 2,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      backgroundColor: theme.colors.surfaceAlt,
      alignItems: "center",
      justifyContent: "center",
    },
    label: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.bold,
      marginTop: -1,
    },
  });
