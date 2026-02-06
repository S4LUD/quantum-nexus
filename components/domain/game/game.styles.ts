import { spacing } from "@/constants/spacing";
import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createGameStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: spacing.md,
    },
    paddedSection: {
      paddingHorizontal: spacing.lg,
    },
    footerPanel: {
      backgroundColor:
        theme.mode === "light"
          ? theme.colors.surfaceStrong
          : theme.colors.overlayStrong,
      paddingTop: spacing.sm,
      paddingBottom: spacing.sm,
      overflow: "visible",
    },
    footerOverlay: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 10,
      overflow: "visible",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    overlayPanel: {
      backgroundColor:
        theme.mode === "light"
          ? theme.colors.surfaceStrong
          : theme.colors.overlayStrong,
      paddingTop: spacing.xxxl,
    },
    centerContent: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
    },
  });
