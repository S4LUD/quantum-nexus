import { StyleSheet } from "react-native";
import { spacing } from "@/constants/spacing";
import { layout } from "@/constants/layout";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";

export const createMainMenuStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: spacing.xl,
      paddingVertical: spacing.xl,
    },
    gridOverlay: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.2,
    },
    gridLineHorizontal: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: theme.colors.borderSubtle,
    },
    gridLineVertical: {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: 1,
      backgroundColor: theme.colors.borderSubtle,
    },
    particleLayer: {
      ...StyleSheet.absoluteFillObject,
      pointerEvents: "none",
    },
    particle: {
      position: "absolute",
      borderRadius: 999,
    },
    header: {
      alignItems: "center",
      gap: spacing.xs,
      marginTop: spacing.lg,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.xxxl,
      lineHeight: typography.lineHeight.xxxl,
      fontFamily: typography.fontFamily.bold,
    },
    subtitle: {
      color: theme.colors.textMuted,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.medium,
    },
    actions: {
      flex: 1,
      justifyContent: "center",
      gap: spacing.md,
    },
    actionButton: {
      borderRadius: layout.borderRadius.xl,
      overflow: "hidden",
    },
    actionButtonGlass: {
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.border,
    },
    actionButtonDisabled: {
      opacity: 0.7,
    },
    actionGradient: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.md,
      minHeight: 64,
    },
    actionText: {
      flex: 1,
      gap: spacing.xxs,
    },
  actionTitle: {
    color: theme.colors.buttonText,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  actionSubtitle: {
    color: theme.colors.buttonText,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.regular,
  },
  actionTitleGlass: {
    color: theme.colors.text,
  },
  actionSubtitleGlass: {
    color: theme.colors.textMuted,
  },
    inProgressBadge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxs,
      borderRadius: layout.borderRadius.md,
      backgroundColor: theme.colors.surfaceMuted,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.border,
    },
    inProgressText: {
      color: theme.colors.text,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
    },
    bottomActions: {
      flexDirection: "row",
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    bottomButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.xs,
      paddingVertical: spacing.sm,
      borderRadius: layout.borderRadius.lg,
      backgroundColor: theme.colors.surfaceMuted,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.border,
      minHeight: 52,
    },
    bottomLabel: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.medium,
    },
  });
