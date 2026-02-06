import { StyleSheet } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";

export const createBotNoticeStyles = (theme: Theme) =>
  StyleSheet.create({
  container: {
    position: "absolute",
    top: "50%",
    transform: [{ translateY: -24 }],
    left: spacing.md,
    right: spacing.md,
    backgroundColor: theme.colors.surfaceStrong,
    borderRadius: layout.borderRadius.md,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: layout.borderWidth.thin,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
    zIndex: 10,
  },
  text: {
    color: theme.colors.text,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
    textAlign: "center",
  },
});
