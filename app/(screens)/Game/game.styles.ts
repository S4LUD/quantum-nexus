import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
    gap: spacing.md,
  },
  paddedSection: {
    paddingHorizontal: spacing.lg,
  },
  footerPanel: {
    backgroundColor: "rgba(2, 6, 24, 0.95)",
    paddingTop: spacing.sm,
    paddingBottom: spacing.sm,
  },
  footerOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  overlayPanel: {
    backgroundColor: "rgba(2, 6, 24, 0.95)",
    paddingTop: spacing.xxxl,
  },
  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
});

export default gameStyles;
