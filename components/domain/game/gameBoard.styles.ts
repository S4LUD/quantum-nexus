import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const gameBoardStyles = StyleSheet.create({
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
    color: colors.whiteAlpha70,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.medium,
    textTransform: "uppercase",
  },
  row: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  disabledBlock: {
    opacity: 0.5,
  },
});
