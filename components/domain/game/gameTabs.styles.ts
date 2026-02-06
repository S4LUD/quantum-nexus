import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Theme } from "@/constants/theme";
import { colors } from "@/constants/colors";

type GameTabsStyles = {
  container: ViewStyle;
  tab: ViewStyle;
  tabActive: ViewStyle;
  tabContent: ViewStyle;
  tabLabel: TextStyle;
  tabLabelActive: TextStyle;
  tabIcon: ViewStyle;
  tabIconActive: ViewStyle;
  badge: ViewStyle;
  badgeText: TextStyle;
};

export const createGameTabsStyles = (theme: Theme) =>
  StyleSheet.create<GameTabsStyles>({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: spacing.md,
      marginBottom: spacing.md,
    },
    tab: {
      flex: 1,
      alignItems: "center",
      paddingVertical: spacing.sm,
      borderRadius: spacing.xs,
      backgroundColor: theme.colors.surfaceMuted,
      borderWidth: 1,
      borderColor: theme.colors.borderSubtle,
      position: "relative",
    },
    tabActive: {
      backgroundColor: theme.colors.surfaceAlt,
      borderColor: theme.colors.border,
    },
    tabContent: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.xs,
    },
    tabLabel: {
      color: theme.colors.textMuted,
    },
    tabLabelActive: {
      color: theme.colors.text,
    },
    tabIcon: {
      opacity: 0.7,
    },
    tabIconActive: {
      opacity: 1,
    },
    badge: {
      position: "absolute",
      top: -spacing.xs,
      right: -spacing.xs,
      minWidth: 18,
      height: 18,
      borderRadius: 9,
      paddingHorizontal: spacing.xxxs,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.red500,
    },
    badgeText: {
      color: colors.white,
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontFamily: typography.fontFamily.bold,
    },
  });
