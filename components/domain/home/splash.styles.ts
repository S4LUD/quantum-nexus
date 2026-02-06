import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createSplashStyles = (theme: Theme) =>
  StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
  },
  gridLineHorizontal: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(139,92,246,0.3)",
  },
  gridLineVertical: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: "rgba(139,92,246,0.3)",
  },
  logoRow: {
    width: layout.icon.xxl,
    height: layout.icon.xxl,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  logoBolt: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: typography.size.xxxl,
    lineHeight: typography.lineHeight.xxxl,
    fontFamily: typography.fontFamily.bold,
    color: theme.colors.text,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontFamily: typography.fontFamily.medium,
  },
  tagline: {
    color: theme.colors.textMuted,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.regular,
  },
  actions: {
    marginTop: spacing.lg,
    width: "45%",
  },
  shadowWrapper: {
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  particleLayer: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: "none",
  },
  particle: {
    position: "absolute",
    borderRadius: 999,
  },
});
