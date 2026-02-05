import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet } from "react-native";

export const playerAreaStyles = StyleSheet.create({
  container: {
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    backgroundColor: colors.blackAlpha30,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha10,
    gap: spacing.md,
  },
  activeContainer: {
    borderColor: colors.yellow400,
  },
  containerDisabled: {
    opacity: 0.5,
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
    color: colors.whiteAlpha70,
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
    backgroundColor: colors.blackAlpha20,
    borderRadius: layout.borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
    gap: spacing.xxs,
  },
  section: {
    gap: spacing.xs,
  },
  sectionLabel: {
    color: colors.whiteAlpha70,
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
    backgroundColor: colors.blackAlpha30,
    borderRadius: layout.borderRadius.sm,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
  },
  outputValue: {
    color: colors.white,
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
    backgroundColor: colors.whiteAlpha10,
    gap: spacing.sm,
  },
  compactActive: {},
  compactDisabled: {
    opacity: 0.5,
  },
  compactHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
