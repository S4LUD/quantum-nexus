import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { StyleSheet } from "react-native";

export const endGameStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "flex-start",
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
  },
  hero: {
    alignItems: "center",
    gap: spacing.xs,
  },
  winnerCard: {
    backgroundColor: colors.whiteAlpha10,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.yellow400,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.blackAlpha30,
    borderRadius: layout.borderRadius.md,
    paddingVertical: spacing.sm,
    gap: spacing.xxs,
  },
  statValue: {
    color: colors.white,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  victoryReason: {
    backgroundColor: colors.blackAlpha30,
    borderRadius: layout.borderRadius.md,
    padding: spacing.sm,
    gap: spacing.xxs,
  },
  rankings: {
    gap: spacing.sm,
  },
  rankList: {
    gap: spacing.xs,
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.xs,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.whiteAlpha10,
  },
  rankIndex: {
    width: spacing.xl,
    color: colors.white,
  },
  rankName: {
    flex: 1,
    color: colors.white,
  },
  rankValue: {
    color: colors.yellow400,
  },
  rankValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  actions: {
    gap: spacing.sm,
  },
});
