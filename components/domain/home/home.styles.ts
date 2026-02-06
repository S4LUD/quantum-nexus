import { spacing } from "@/constants/spacing";
import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createHomeStyles = (_theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "space-between",
    },
    header: {
      alignItems: "center",
      paddingTop: spacing.xl,
      gap: spacing.xs,
    },
  });
