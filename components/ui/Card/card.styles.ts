import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const cardStyles = StyleSheet.create({
  container: {
    borderRadius: layout.borderRadius.lg,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha20,
    backgroundColor: colors.blackAlpha30,
    padding: spacing.md,
  },
});
