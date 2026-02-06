import { Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

export const layout = {
  maxWidth: 428,
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  borderWidth: {
    thin: 1,
  },
  headerSideWidth: 80,
  nodeCard: {
    widthSm: 128,
    widthMd: 160,
    minHeightSm: 140,
    minHeightMd: 180,
    headerHeight: 36,
    outputHeight: 36,
  },
  energyBadge: {
    sizeSm: 36,
    sizeMd: 48,
    sizeLg: 64,
    iconSm: 14,
    iconMd: 18,
    iconLg: 22,
  },
  exchangeButton: {
    minWidth: 84,
  },
  icon: {
    sm: 12,
    md: 16,
    lg: 22,
    xl: 36,
    xxl: 56,
  },
  toggle: {
    width: 56,
    height: 32,
    padding: 4,
    thumb: 24,
  },
  modal: {
    minHeight: 240,
    maxHeight: "85%",
    maxHeightPx: screenHeight * 0.8,
  },
};
