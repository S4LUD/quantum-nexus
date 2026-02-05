import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
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

export default homeStyles;
