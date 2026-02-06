import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createNodeCardStyles = (theme: Theme) =>
  StyleSheet.create({
    pressable: {
      borderRadius: layout.borderRadius.lg,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.16,
      shadowRadius: 10,
      elevation: 4,
    },
    cardWrapper: {
      position: "relative",
    },
    affordable: {
      borderWidth: 5,
      borderColor: colors.green400,
      borderRadius: layout.borderRadius.xl - 3,
    },
    cardBase: {
      borderRadius: layout.borderRadius.lg,
      overflow: "hidden",
      flex: 1,
    },
    cardSmall: {
      width: layout.nodeCard.widthSm,
      minHeight: layout.nodeCard.minHeightSm,
    },
    cardMedium: {
      width: layout.nodeCard.widthMd,
      minHeight: layout.nodeCard.minHeightMd,
    },
    cardInner: {
      flex: 1,
      padding: spacing.xs,
    },
    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    categoryBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxxs,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxxs,
      borderRadius: layout.borderRadius.sm,
      backgroundColor:
        theme.mode === "light"
          ? theme.colors.surfaceStrong
          : colors.blackAlpha30,
    },
    categoryLabel: {
      color: theme.mode === "light" ? theme.colors.text : colors.white,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
      textTransform: "uppercase",
    },
    efficiencyBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxxs,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxxs,
      borderRadius: layout.borderRadius.sm,
      backgroundColor: colors.yellow400,
    },
    efficiencyText: {
      color: colors.black,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
    },
    centerIcon: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.sm,
    },
    costPanel: {
      borderRadius: layout.borderRadius.md,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      backgroundColor:
        theme.mode === "light"
          ? theme.colors.surfaceStrong
          : colors.blackAlpha50,
      gap: spacing.xxxs,
    },
    costRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xxs,
    },
    costItem: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: spacing.xxs,
      backgroundColor:
        theme.mode === "light" ? theme.colors.surfaceAlt : colors.blackAlpha30,
      borderRadius: layout.borderRadius.sm,
      paddingVertical: spacing.xxxs,
    },
    costValue: {
      color: theme.mode === "light" ? theme.colors.text : colors.white,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
    },
    effectPill: {
      alignSelf: "center",
      borderRadius: layout.borderRadius.lg,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xxxs,
      backgroundColor: colors.purple600,
    },
    effectPillFloat: {
      position: "absolute",
      left: spacing.md,
      right: spacing.md,
      bottom: -(spacing.xs + 1),
      alignItems: "center",
    },
    effectText: {
      color: theme.colors.buttonText,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
      textTransform: "uppercase",
    },
  });
