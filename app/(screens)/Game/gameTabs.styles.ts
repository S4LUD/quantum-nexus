import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const gameTabsStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.sm,
    borderRadius: spacing.xs,
    backgroundColor: colors.whiteAlpha10,
  },
  tabActive: {
    backgroundColor: colors.whiteAlpha20,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
});

export default gameTabsStyles;
