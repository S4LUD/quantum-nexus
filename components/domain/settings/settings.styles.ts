import { spacing } from "@/constants/spacing";
import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createSettingsStyles = (_theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
    },
  });
