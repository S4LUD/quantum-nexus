import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createNodeDetailStyles = (theme: Theme) =>
  StyleSheet.create({
    screen: {
      flex: 1,
    },
    backdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.overlay,
    },
    sheetContainer: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.lg,
    },
    sheetWrapper: {
      width: "100%",
      height: layout.modal.maxHeightPx,
    },
    sheet: {
      width: "100%",
      flex: 1,
      borderRadius: layout.borderRadius.xl,
      overflow: "hidden",
      backgroundColor: theme.colors.surface,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 8,
    },
    sheetGradient: {
      padding: spacing.md,
      gap: spacing.sm,
    },
    sheetScroll: {
      flex: 1,
      backgroundColor: theme.colors.surface,
    },
    sheetContent: {
      paddingBottom: spacing.lg,
    },
    closeButton: {
      position: "absolute",
      top: spacing.sm,
      right: spacing.sm,
      padding: spacing.xxs,
      borderRadius: layout.borderRadius.lg,
      backgroundColor: theme.colors.surfaceMuted,
    },
    badgeRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    categoryBadge: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: layout.borderRadius.md,
      backgroundColor: theme.colors.surfaceMuted,
    },
    badgeText: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.bold,
    },
    efficiencyBadge: {
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: layout.borderRadius.md,
      backgroundColor: theme.colors.surface,
      alignItems: "center",
    },
    efficiencyValue: {
      color: theme.colors.text,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.bold,
    },
    efficiencyLabel: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
    },
    hero: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: spacing.sm,
      gap: spacing.xxxs,
    },
    heroTitle: {
      color: theme.colors.text,
      fontSize: typography.size.xl,
      lineHeight: typography.lineHeight.xl,
      fontFamily: typography.fontFamily.bold,
      textTransform: "capitalize",
    },
    heroSubtitle: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
    },
    body: {
      padding: spacing.lg,
      gap: spacing.lg,
      backgroundColor: theme.colors.surface,
    },
    section: {
      gap: spacing.sm,
    },
    sectionLabel: {
      color: theme.colors.text,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.bold,
    },
    costList: {
      gap: spacing.xs,
    },
    costItemRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: spacing.sm,
      borderRadius: layout.borderRadius.lg,
      backgroundColor: theme.colors.surfaceAlt,
    },
    costLeft: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    costName: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.medium,
      textTransform: "capitalize",
    },
    costRight: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
    },
    costMeta: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
    },
    costValue: {
      color: theme.colors.text,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontFamily: typography.fontFamily.bold,
    },
    costValueGood: {
      color: colors.green600,
    },
    costValueBad: {
      color: colors.red500,
    },
    costStrike: {
      color: theme.colors.textSubtle,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      textDecorationLine: "line-through",
    },
    discountNote: {
      marginTop: spacing.xs,
      gap: spacing.xxs,
    },
    discountTitle: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.medium,
      textTransform: "uppercase",
    },
    discountList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
    },
    discountLine: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: layout.borderRadius.sm,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxxs,
    },
    discountLabel: {
      color: theme.colors.textMuted,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      textTransform: "capitalize",
    },
    discountValue: {
      color: theme.colors.text,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
    },
    effectRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: spacing.sm,
      padding: spacing.sm,
      borderRadius: layout.borderRadius.lg,
      backgroundColor: theme.colors.surfaceAlt,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
    },
    effectIcon: {
      backgroundColor:
        theme.mode === "light" ? colors.gray100 : theme.colors.surfaceMuted,
      borderRadius: layout.borderRadius.md,
      padding: spacing.xs,
    },
    effectContent: {
      flex: 1,
      gap: spacing.xxs,
    },
    effectTitle: {
      color: theme.colors.text,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.bold,
      textTransform: "capitalize",
    },
    effectText: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
    },
    descriptionCard: {
      backgroundColor:
        theme.mode === "light" ? colors.gray100 : theme.colors.surfaceAlt,
      borderRadius: layout.borderRadius.lg,
      padding: spacing.sm,
      overflow: "hidden",
    },
    descriptionText: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontStyle: "italic",
    },
    energyRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacing.xs,
    },
    energyItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xxs,
      borderRadius: layout.borderRadius.sm,
      backgroundColor: theme.colors.surfaceAlt,
      paddingHorizontal: spacing.xs,
      paddingVertical: spacing.xxs,
      borderWidth: layout.borderWidth.thin,
      borderColor: theme.colors.borderSubtle,
    },
    energyCount: {
      color: theme.colors.text,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
    },
    energyItemAlert: {
      borderWidth: layout.borderWidth.thin,
      borderColor: colors.red400,
    },
    footer: {
      padding: spacing.lg,
      gap: spacing.sm,
      backgroundColor: theme.colors.surface,
      borderTopWidth: layout.borderWidth.thin,
      borderTopColor: theme.colors.border,
    },
    primaryButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
      backgroundColor: colors.green600,
      borderRadius: layout.borderRadius.lg,
      paddingVertical: spacing.sm,
      minHeight: 46,
    },
    primaryButtonDisabled: {
      backgroundColor:
        theme.mode === "light" ? colors.gray100 : theme.colors.surfaceMuted,
    },
    primaryButtonText: {
      color: theme.colors.buttonText,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.bold,
    },
    primaryButtonTextDisabled: {
      color: theme.colors.textSubtle,
    },
    secondaryButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: spacing.sm,
      backgroundColor: colors.purple600,
      borderRadius: layout.borderRadius.lg,
      paddingVertical: spacing.sm,
      minHeight: 46,
    },
    secondaryButtonDisabled: {
      backgroundColor: colors.gray400,
    },
    secondaryButtonText: {
      color: colors.white,
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontFamily: typography.fontFamily.bold,
    },
    secondaryButtonSuffix: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
    },
    reservedNote: {
      color: theme.colors.textMuted,
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      textAlign: "center",
    },
  });
