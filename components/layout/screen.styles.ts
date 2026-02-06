import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export function createScreenStyles(theme: Theme) {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    gradient: {
      flex: 1,
      alignSelf: "center",
      width: "100%",
    },
    content: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.lg,
    },
    contentNoHorizontalPadding: {
      paddingHorizontal: 0,
    },
    contentNoTopPadding: {
      paddingTop: 0,
    },
    contentNoBottomPadding: {
      paddingBottom: 0,
    },
  });
}
