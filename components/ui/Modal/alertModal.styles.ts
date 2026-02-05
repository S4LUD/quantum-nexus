import { StyleSheet } from "react-native";
import { colors, gradients } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

export const alertModalStyles = StyleSheet.create({
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
  content: {
    padding: spacing.lg,
    gap: spacing.xs,
  },
  title: {
    color: colors.white,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontFamily: typography.fontFamily.bold,
  },
  message: {
    color: colors.whiteAlpha75,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.whiteAlpha10,
  },
  button: {
    borderRadius: layout.borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
    backgroundColor: gradients.protocolActive[0],
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.semibold,
  },
});
