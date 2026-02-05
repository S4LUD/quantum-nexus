import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

export const drawModalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.blackAlpha70,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  card: {
    width: "100%",
    maxWidth: layout.maxWidth,
    borderRadius: layout.borderRadius.lg,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha10,
    backgroundColor: colors.slate900,
    overflow: "hidden",
  },
  header: {
    padding: spacing.lg,
    gap: spacing.xxs,
  },
  title: {
    color: colors.white,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontFamily: typography.fontFamily.bold,
  },
  subtitle: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
  },
  optionsRow: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  footer: {
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.whiteAlpha10,
    padding: spacing.md,
    alignItems: "flex-end",
  },
  skipButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.whiteAlpha10,
  },
  skipText: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.semibold,
  },
});
