import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const energyPoolStyles = StyleSheet.create({
  container: {
    width: "100%",
    gap: spacing.sm,
  },
  containerDisabled: {
    opacity: 0.5,
  },
  energyRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  energyButton: {
    borderRadius: layout.borderRadius.md,
    opacity: 1,
  },
  energyButtonSelected: {
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.white,
  },
});
