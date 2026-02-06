import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { Theme } from "@/constants/theme";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

type GameHeaderStyles = {
  container: ViewStyle;
  left: ViewStyle;
  center: ViewStyle;
  right: ViewStyle;
  efficiencyRow: ViewStyle;
  backButton: ViewStyle;
  title: TextStyle;
  caption: TextStyle;
  captionMuted: TextStyle;
};

export const createGameHeaderStyles = (theme: Theme) =>
  StyleSheet.create<GameHeaderStyles>({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: spacing.sm,
    },
    left: {
      width: layout.headerSideWidth,
      gap: spacing.xs,
    },
    center: {
      flex: 1,
      alignItems: "center",
    },
    right: {
      width: layout.headerSideWidth,
      alignItems: "flex-end",
      gap: spacing.xxs,
    },
    efficiencyRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
    },
    backButton: {
      paddingVertical: spacing.xxs,
    },
    title: {
      color: theme.colors.text,
    },
    caption: {
      color: theme.colors.text,
    },
    captionMuted: {
      color: theme.colors.textMuted,
    },
  });
