import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const nodeDetailStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.blackAlpha70,
  },
  sheetContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "stretch",
  },
  sheetWrapper: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "stretch",
    paddingBottom: 0,
  },
  sheet: {
    width: "100%",
    height: "80%",
    borderTopLeftRadius: layout.borderRadius.xl,
    borderTopRightRadius: layout.borderRadius.xl,
    overflow: "hidden",
    backgroundColor: colors.slate900,
  },
  sheetGradient: {
    borderTopLeftRadius: layout.borderRadius.xl,
    borderTopRightRadius: layout.borderRadius.xl,
    overflow: "hidden",
    flex: 1,
  },
  sheetScroll: {
    flex: 1,
  },
  sheetContent: {
    paddingBottom: spacing.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    backgroundColor: colors.blackAlpha30,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.whiteAlpha20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  headerTitle: {
    color: colors.white,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontFamily: typography.fontFamily.bold,
  },
  headerSubtitle: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
  },
  closeButton: {
    padding: spacing.xxs,
  },
  body: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  efficiencyCard: {
    alignItems: "center",
    backgroundColor: colors.yellow400,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xxs,
  },
  efficiencyValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  efficiencyValue: {
    color: colors.black,
    fontSize: typography.size.xxxl,
    lineHeight: typography.lineHeight.xxxl,
    fontFamily: typography.fontFamily.bold,
  },
  efficiencyLabel: {
    color: colors.black,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  section: {
    gap: spacing.sm,
  },
  sectionLabel: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    fontFamily: typography.fontFamily.bold,
    textTransform: "uppercase",
  },
  sectionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.blackAlpha30,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
  },
  sectionPanel: {
    backgroundColor: colors.blackAlpha30,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  sectionTitle: {
    color: colors.white,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontFamily: typography.fontFamily.bold,
    textTransform: "capitalize",
  },
  sectionSubtitle: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  costRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  costItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    backgroundColor: colors.blackAlpha30,
    borderRadius: layout.borderRadius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  costCount: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  costStrike: {
    color: colors.whiteAlpha60,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    textDecorationLine: "line-through",
  },
  discountNote: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.xs,
    lineHeight: typography.lineHeight.xs,
    textAlign: "center",
  },
  effectRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  effectIcon: {
    backgroundColor: colors.whiteAlpha20,
    borderRadius: layout.borderRadius.md,
    padding: spacing.xs,
  },
  effectContent: {
    flex: 1,
    gap: spacing.xxs,
  },
  effectTitle: {
    color: colors.white,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
    textTransform: "capitalize",
  },
  effectText: {
    color: colors.whiteAlpha90,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  descriptionCard: {
    backgroundColor: colors.blackAlpha20,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
  },
  descriptionText: {
    color: colors.whiteAlpha90,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontStyle: "italic",
  },
  energyRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  energyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.blackAlpha30,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  energyCount: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  energyItemAlert: {
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.red400,
  },
  footer: {
    padding: spacing.lg,
    gap: spacing.sm,
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.whiteAlpha20,
    backgroundColor: colors.blackAlpha30,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: layout.borderRadius.lg,
    paddingVertical: spacing.sm,
    minHeight: 46,
  },
  primaryButtonDisabled: {
    backgroundColor: colors.whiteAlpha20,
  },
  primaryButtonText: {
    color: colors.purple900,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  primaryButtonTextDisabled: {
    color: colors.whiteAlpha40,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    backgroundColor: colors.whiteAlpha20,
    borderRadius: layout.borderRadius.lg,
    paddingVertical: spacing.sm,
    minHeight: 46,
  },
  secondaryButtonDisabled: {
    backgroundColor: colors.whiteAlpha10,
  },
  secondaryButtonText: {
    color: colors.white,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  secondaryButtonSuffix: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  reservedNote: {
    color: colors.whiteAlpha70,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    textAlign: "center",
  },
});
