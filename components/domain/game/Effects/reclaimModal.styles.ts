import { StyleSheet } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";
import { colors } from "@/constants/colors";

export const createReclaimModalStyles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.lg,
    },
    card: {
      width: "100%",
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      backgroundColor: theme.colors.surface,
      overflow: "hidden",
    },
    header: {
      padding: spacing.lg,
      gap: spacing.xxs,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontFamily: typography.fontFamily.bold,
    },
    subtitle: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.medium,
    },
    section: {
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
      gap: spacing.xs,
    },
    sectionTitle: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    energyRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    energyButton: {
      alignItems: "center",
      padding: spacing.xs,
      borderRadius: layout.borderRadius.md,
      backgroundColor: theme.colors.surfaceMuted,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
    },
    energyButtonSelected: {
      borderColor: theme.colors.text,
      backgroundColor: theme.colors.surfaceAlt,
    },
    energyButtonDisabled: {
      opacity: 0.4,
    },
    selectedCount: {
      marginTop: spacing.xxs,
      color: theme.colors.text,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
    },
    footer: {
      borderTopWidth: layout.borderWidth.thin,
      borderTopColor: theme.colors.borderSubtle,
      padding: spacing.md,
      flexDirection: "row",
      justifyContent: "space-between",
      gap: spacing.sm,
    },
    skipButton: {
      flex: 1,
      paddingVertical: spacing.sm,
      borderRadius: layout.borderRadius.md,
      backgroundColor:
        theme.mode === "light" ? colors.gray200 : theme.colors.surfaceMuted,
      alignItems: "center",
    },
    skipText: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.bold,
    },
    confirmButton: {
      flex: 1,
      paddingVertical: spacing.sm,
      borderRadius: layout.borderRadius.md,
      backgroundColor: colors.purple600,
      alignItems: "center",
    },
    confirmButtonDisabled: {
      backgroundColor: colors.gray400,
    },
    confirmText: {
      color: colors.white,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.bold,
    },
  });
