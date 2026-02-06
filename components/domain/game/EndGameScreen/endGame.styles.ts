import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { colors } from "@/constants/colors";
import { StyleSheet } from "react-native";
import { Theme } from "@/constants/theme";

export const createEndGameStyles = (theme: Theme) =>
  StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    justifyContent: "space-between",
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    gap: spacing.lg,
    flexGrow: 1,
  },
  body: {
    gap: spacing.lg,
  },
  hero: {
    alignItems: "center",
    gap: spacing.xs,
  },
  winnerCard: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: layout.borderWidth.thin,
    borderColor: theme.colors.border,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor:
      theme.mode === "light" ? colors.gray100 : theme.colors.surfaceAlt,
    borderRadius: layout.borderRadius.md,
    paddingVertical: spacing.sm,
    gap: spacing.xxs,
  },
  statValue: {
    color: theme.colors.text,
  },
  statValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xxs,
  },
  victoryReason: {
    backgroundColor:
      theme.mode === "light" ? colors.gray100 : theme.colors.surfaceAlt,
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
    borderBottomColor: theme.colors.borderSubtle,
  },
  rankIndex: {
    width: spacing.xl,
    color: theme.colors.text,
  },
  rankName: {
    flex: 1,
    color: theme.colors.text,
  },
  rankValue: {
    color: theme.colors.text,
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
