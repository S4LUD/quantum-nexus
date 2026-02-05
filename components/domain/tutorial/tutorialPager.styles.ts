import { Dimensions, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { colors } from "@/constants/colors";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";

const screenHeight = Dimensions.get("window").height;

type TutorialPagerStyles = {
  wrapper: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  closeButton: ViewStyle;
  scroll: ViewStyle;
  scrollContainer: ViewStyle;
  scrollContent: ViewStyle;
  section: ViewStyle;
  callout: ViewStyle;
  calloutTitle: TextStyle;
  bodyText: TextStyle;
  bodyMuted: TextStyle;
  bodyStrong: TextStyle;
  listItem: TextStyle;
  list: ViewStyle;
  listRow: ViewStyle;
  listInlineText: TextStyle;
  listIcon: ViewStyle;
  energyList: ViewStyle;
  energyRow: ViewStyle;
  energyTitle: TextStyle;
  energySubtitle: TextStyle;
  energySolar: ViewStyle;
  energyHydro: ViewStyle;
  energyPlasma: ViewStyle;
  energyNeural: ViewStyle;
  energyFlux: ViewStyle;
  cardList: ViewStyle;
  card: ViewStyle;
  cardTitle: TextStyle;
  protocolList: ViewStyle;
  protocolCard: ViewStyle;
  protocolRequirements: ViewStyle;
  protocolClaiming: ViewStyle;
  protocolBenefits: ViewStyle;
  nodeList: ViewStyle;
  nodeRow: ViewStyle;
  nodeResearch: ViewStyle;
  nodeProduction: ViewStyle;
  nodeNetwork: ViewStyle;
  nodeControl: ViewStyle;
  footer: ViewStyle;
  footerButtonBase: ViewStyle;
  footerButton: ViewStyle;
  footerButtonDisabled: ViewStyle;
  footerButtonPrimary: ViewStyle;
  footerButtonSuccess: ViewStyle;
  footerLabel: TextStyle;
  dots: ViewStyle;
  dot: ViewStyle;
  dotActive: ViewStyle;
};

export const tutorialPagerStyles = StyleSheet.create<TutorialPagerStyles>({
  wrapper: {
    width: "100%",
    maxHeight: screenHeight * 0.85,
    borderRadius: layout.borderRadius.lg,
    borderWidth: layout.borderWidth.thin,
    borderColor: colors.whiteAlpha20,
    backgroundColor: colors.slate900,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: colors.whiteAlpha10,
  },
  headerTitle: {
    color: colors.white,
    fontSize: typography.size.lg,
    lineHeight: typography.lineHeight.lg,
    fontFamily: typography.fontFamily.bold,
    flex: 1,
  },
  closeButton: {
    padding: spacing.xxs,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    height: screenHeight * 0.45,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.md,
  },
  section: {
    gap: spacing.md,
  },
  callout: {
    backgroundColor: colors.purple500 + "33",
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  calloutTitle: {
    color: colors.white,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  bodyText: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  bodyMuted: {
    color: colors.whiteAlpha75,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  bodyStrong: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  listItem: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  list: {
    gap: spacing.xs,
  },
  listRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.xxs,
  },
  listInlineText: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  listIcon: {
    marginTop: 1,
  },
  energyList: {
    gap: spacing.sm,
  },
  energyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: layout.borderRadius.lg,
  },
  energyTitle: {
    color: colors.white,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  energySubtitle: {
    color: colors.whiteAlpha75,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  energySolar: {
    backgroundColor: colors.yellow500 + "33",
  },
  energyHydro: {
    backgroundColor: colors.cyan500 + "33",
  },
  energyPlasma: {
    backgroundColor: colors.pink500 + "33",
  },
  energyNeural: {
    backgroundColor: colors.green500 + "33",
  },
  energyFlux: {
    backgroundColor: colors.purple500 + "33",
  },
  cardList: {
    gap: spacing.sm,
  },
  card: {
    backgroundColor: colors.whiteAlpha10,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  cardTitle: {
    color: colors.white,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  protocolList: {
    gap: spacing.sm,
  },
  protocolCard: {
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  protocolRequirements: {
    backgroundColor: colors.cyan500 + "33",
  },
  protocolClaiming: {
    backgroundColor: colors.purple500 + "33",
  },
  protocolBenefits: {
    backgroundColor: colors.yellow500 + "33",
  },
  nodeList: {
    gap: spacing.sm,
  },
  nodeRow: {
    backgroundColor: colors.whiteAlpha10,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xxs,
  },
  nodeResearch: {
    backgroundColor: colors.blue500 + "33",
  },
  nodeProduction: {
    backgroundColor: colors.purple500 + "33",
  },
  nodeNetwork: {
    backgroundColor: colors.orange500 + "33",
  },
  nodeControl: {
    backgroundColor: colors.green500 + "33",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: colors.whiteAlpha10,
    padding: spacing.md,
  },
  footerButtonBase: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    minWidth: 96,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: layout.borderRadius.md,
  },
  footerButton: {
    backgroundColor: colors.whiteAlpha10,
  },
  footerButtonDisabled: {
    opacity: 0.3,
  },
  footerButtonPrimary: {
    backgroundColor: colors.purple600,
  },
  footerButtonSuccess: {
    backgroundColor: colors.green600,
  },
  footerLabel: {
    color: colors.white,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
  },
  dots: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: spacing.xs,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.whiteAlpha30,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.purple400,
  },
});
