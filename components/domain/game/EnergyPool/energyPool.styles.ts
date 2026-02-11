import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createEnergyPoolStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      gap: spacing.sm,
    },
    titleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    energyRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    energyButton: {
      borderRadius: 13,
      opacity: 1,
    },
    energyButtonSelected: {
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.text,
      backgroundColor: theme.colors.surfaceAlt,
    },
  });
