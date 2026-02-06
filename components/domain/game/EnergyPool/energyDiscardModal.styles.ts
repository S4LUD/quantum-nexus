import { StyleSheet } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { Theme } from "@/constants/theme";
import { colors } from "@/constants/colors";

export const createEnergyDiscardModalStyles = (theme: Theme) =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.lg,
    },
    modal: {
      width: "100%",
      backgroundColor: theme.colors.surface,
      borderRadius: layout.borderRadius.lg,
      padding: spacing.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
    },
    header: {
      marginBottom: spacing.md,
      gap: spacing.xxs,
    },
    title: {
      color: theme.colors.text,
      fontSize: 20,
      fontWeight: "700",
    },
    subtitle: {
      color: theme.colors.textMuted,
      fontSize: 13,
      lineHeight: 18,
    },
    energyRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
      marginBottom: spacing.lg,
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
      fontSize: 12,
      fontWeight: "600",
    },
    footer: {
      marginTop: spacing.xs,
    },
    confirmButton: {
      backgroundColor: colors.purple600,
      borderRadius: layout.borderRadius.md,
      paddingVertical: spacing.sm,
      alignItems: "center",
    },
    confirmButtonDisabled: {
      backgroundColor: theme.colors.surfaceMuted,
    },
    confirmText: {
      color: theme.colors.buttonText,
      fontSize: 14,
      fontWeight: "600",
    },
  });
