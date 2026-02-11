import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";
import { MARKET_NODE_BOTTOM_PADDING } from "./gameBoard.constants";

export const createGameBoardStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    disabledOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: theme.colors.overlay,
      zIndex: 20,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: spacing.lg,
    },
    disabledOverlayContent: {
      width: "100%",
      maxWidth: 320,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: spacing.md,
      backgroundColor: theme.colors.surfaceStrong,
      borderWidth: 1,
      borderColor: theme.colors.borderSubtle,
    },
    disabledOverlayText: {
      color: theme.colors.text,
      textAlign: "center",
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.medium,
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
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    helpHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    row: {
      gap: spacing.sm,
      paddingHorizontal: spacing.md,
    },
    marketNodeWrapper: {
      paddingBottom: MARKET_NODE_BOTTOM_PADDING,
    },
  });

export type GameBoardStyles = ReturnType<typeof createGameBoardStyles>;
