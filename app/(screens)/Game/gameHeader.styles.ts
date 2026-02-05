import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const gameHeaderStyles = StyleSheet.create({
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
});

export default gameHeaderStyles;
