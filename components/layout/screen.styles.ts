import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const screenStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.slate950,
  },
  gradient: {
    flex: 1,
    alignSelf: "center",
    width: "100%",
    maxWidth: layout.maxWidth,
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
