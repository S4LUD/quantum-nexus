import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const inputStyles = StyleSheet.create({
  container: {
    borderRadius: layout.borderRadius.md,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha20,
    backgroundColor: colors.blackAlpha30,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  input: {
    color: colors.white,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.regular,
  },
});
