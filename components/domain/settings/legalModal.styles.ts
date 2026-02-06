import { StyleSheet } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";

export const createLegalModalStyles = (theme: Theme) =>
  StyleSheet.create({
    wrapper: {
      width: "100%",
      maxHeight: LEGAL_MODAL_MAX_HEIGHT,
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      overflow: "hidden",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: spacing.lg,
      borderBottomWidth: layout.borderWidth.thin,
      borderBottomColor: theme.colors.borderSubtle,
      gap: spacing.md,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontFamily: typography.fontFamily.bold,
    },
    updated: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      marginTop: spacing.xxs,
    },
    notice: {
      color: theme.colors.textSubtle,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      marginTop: spacing.xxs,
    },
    closeButton: {
      padding: spacing.xxs,
    },
    content: {
      padding: spacing.lg,
      gap: spacing.lg,
    },
    intro: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.medium,
    },
    section: {
      gap: spacing.xs,
    },
    sectionTitle: {
      color: theme.colors.text,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.bold,
    },
    sectionBody: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.md,
    },
    footer: {
      padding: spacing.lg,
      borderTopWidth: layout.borderWidth.thin,
      borderTopColor: theme.colors.borderSubtle,
    },
  });

const LEGAL_MODAL_MAX_HEIGHT = "85%";
