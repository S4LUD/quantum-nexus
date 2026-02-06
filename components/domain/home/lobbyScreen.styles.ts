import { StyleSheet } from "react-native";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { layout } from "@/constants/layout";
import { Theme } from "@/constants/theme";
import { colors } from "@/constants/colors";

export const createLobbyScreenStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: spacing.mdTight,
      paddingVertical: spacing.mdTight,
      gap: spacing.md,
    },
    title: {
      color: theme.colors.text,
      fontSize: typography.size.xl,
      lineHeight: typography.lineHeight.xl,
      fontFamily: typography.fontFamily.bold,
    },
    lobbyCard: {
      gap: spacing.sm,
      borderRadius: layout.borderRadius.lg,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      backgroundColor: theme.colors.surfaceAlt,
      padding: spacing.md,
    },
    sectionLabel: {
      color: theme.colors.text,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    sectionLabelCentered: {
      color: theme.colors.textSubtle,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
      textAlign: "center",
    },
    lobbyIdValue: {
      color: theme.colors.text,
      fontSize: typography.size.xxl,
      lineHeight: typography.lineHeight.xxl,
      fontFamily: typography.fontFamily.bold,
      textAlign: "center",
      letterSpacing: spacing.xxxs,
    },
    lobbyPlayers: {
      gap: spacing.xxs,
    },
    playerCard: {
      borderRadius: layout.borderRadius.md,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      backgroundColor: theme.colors.surfaceMuted,
      paddingVertical: spacing.xxs,
      paddingHorizontal: spacing.xs,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.xs,
    },
    playerName: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.medium,
      flex: 1,
    },
    playerActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    playerStatus: {
      color: theme.colors.textSubtle,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    waitingText: {
      color: theme.colors.textSubtle,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
    },
    errorText: {
      color: colors.red400,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
    },
  });
