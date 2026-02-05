import { StyleSheet } from "react-native";
import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";

export const energyDiscardModalStyles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.blackAlpha70,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  modal: {
    width: "100%",
    maxWidth: layout.maxWidth,
    backgroundColor: colors.slate900,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.lg,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha10,
  },
  header: {
    marginBottom: spacing.md,
    gap: spacing.xxs,
  },
  title: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.whiteAlpha70,
    fontSize: 13,
    lineHeight: 18,
  },
  energyRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  energyButton: {
    alignItems: "center",
    padding: spacing.xs,
    borderRadius: layout.borderRadius.md,
    backgroundColor: colors.whiteAlpha05,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha10,
  },
  energyButtonSelected: {
    borderColor: colors.purple400,
    backgroundColor: colors.whiteAlpha10,
  },
  energyButtonDisabled: {
    opacity: 0.4,
  },
  selectedCount: {
    marginTop: spacing.xxs,
    color: colors.whiteAlpha90,
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    marginTop: spacing.xs,
  },
  confirmButton: {
    backgroundColor: colors.purple600,
    borderRadius: layout.borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: "center",
  },
  confirmButtonDisabled: {
    backgroundColor: colors.whiteAlpha10,
  },
  confirmText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
});
