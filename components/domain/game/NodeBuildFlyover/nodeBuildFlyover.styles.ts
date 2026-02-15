import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createNodeBuildFlyoverStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 30,
      pointerEvents: "none",
    },
    flyoverNode: {
      position: "absolute",
      width: 148,
      borderRadius: spacing.sm,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor:
        theme.mode === "light" ? colors.whiteAlpha90 : colors.blackAlpha70,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      gap: spacing.xs,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.24,
      shadowRadius: 10,
      elevation: 8,
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    badgeWrap: {
      width: 26,
      height: 26,
      borderRadius: 13,
      overflow: "hidden",
      alignItems: "center",
      justifyContent: "center",
    },
    efficiencyPill: {
      minWidth: 28,
      borderRadius: spacing.xs,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxxs,
      backgroundColor: theme.colors.surfaceMuted,
      alignItems: "center",
      justifyContent: "center",
    },
    efficiencyValue: {
      color: theme.colors.text,
    },
    nodeId: {
      color: theme.colors.textMuted,
    },
  });
