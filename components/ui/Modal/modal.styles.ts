import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export function createModalStyles(theme: Theme) {
  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: theme.colors.overlay,
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
}
