import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";
import { colors } from "@/constants/colors";

export const createPlayerAreaStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      borderRadius: layout.borderRadius.lg,
      padding: spacing.md,
      backgroundColor: theme.colors.surfaceAlt,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
      gap: spacing.md,
    },
    activeContainer: {
      borderColor: colors.yellow400,
    },
    containerDisabled: {
      backgroundColor: theme.colors.surfaceAlt,
    },
    header: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
    },
    turnTag: {
      marginTop: spacing.xxs,
      backgroundColor: colors.yellow400,
      color: colors.black,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs,
      borderRadius: layout.borderRadius.md,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
    },
    efficiencyBlock: {
      alignItems: "center",
    },
    efficiencyValue: {
      color: colors.yellow400,
      fontSize: typography.size.xxl,
      lineHeight: typography.lineHeight.xxl,
      fontFamily: typography.fontFamily.bold,
    },
    efficiencyLabel: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
    },
    statsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: spacing.sm,
    },
    statCard: {
      flex: 1,
      backgroundColor:
        theme.mode === "light" ? colors.gray100 : theme.colors.surfaceMuted,
      borderRadius: layout.borderRadius.md,
      paddingVertical: spacing.sm,
      alignItems: "center",
      gap: spacing.xxs,
    },
    section: {
      gap: spacing.xs,
    },
    sectionLabel: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    badgeRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
    },
    outputRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
    },
    outputItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
      backgroundColor:
        theme.mode === "light" ? colors.gray100 : theme.colors.surfaceAlt,
      borderRadius: layout.borderRadius.sm,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs,
    },
    outputValue: {
      color: theme.colors.text,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
    },
    horizontalRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.sm,
    },
    protocolList: {
      gap: spacing.xs,
    },
    compactContainer: {
      borderRadius: layout.borderRadius.lg,
      padding: spacing.sm,
      backgroundColor: theme.colors.surfaceMuted,
      gap: spacing.sm,
    },
    compactActive: {
      borderColor: theme.colors.border,
    },
    compactDisabled: {
      backgroundColor: theme.colors.surfaceAlt,
    },
    compactHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: 10,
    },
    compactEfficiencyRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
    },
    compactEnergyRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
    },
  });
