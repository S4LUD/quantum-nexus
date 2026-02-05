import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const textStyles = StyleSheet.create({
  body: {
    color: colors.white,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.regular,
  },
  title: {
    color: colors.white,
    fontSize: typography.size.xl,
    lineHeight: typography.lineHeight.xl,
    fontFamily: typography.fontFamily.bold,
  },
  subtitle: {
    color: colors.whiteAlpha75,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontFamily: typography.fontFamily.medium,
  },
  caption: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.regular,
  },
});
