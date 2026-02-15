import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { Theme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createEnergyCollectFlyoverStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 28,
      pointerEvents: "none",
    },
    tokenWrap: {
      position: "absolute",
      width: 28,
      height: 28,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor:
        theme.mode === "light" ? colors.whiteAlpha90 : colors.blackAlpha50,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.xxxs,
    },
  });
