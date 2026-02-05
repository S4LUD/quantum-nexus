import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
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
    backgroundColor: colors.purple600,
  },
  secondary: {
    backgroundColor: colors.cyan600,
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    color: colors.white,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.medium,
  },
});
