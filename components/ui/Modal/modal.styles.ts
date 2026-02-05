import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.blackAlpha70,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  backdropPress: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    width: "100%",
    alignSelf: "stretch",
    pointerEvents: "box-none",
  },
});
