import { Dimensions, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { layout } from "@/constants/layout";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Theme } from "@/constants/theme";

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
  footerLabelOnPrimary: TextStyle;
  dots: ViewStyle;
  dot: ViewStyle;
  dotActive: ViewStyle;
};

export const createTutorialPagerStyles = (theme: Theme) => {
  const panelBackground =
    theme.mode === "light" ? "rgba(15,23,43,0.06)" : theme.colors.surfaceMuted;
  const accentAlpha = theme.mode === "light" ? 0.16 : 0.2;

  return StyleSheet.create<TutorialPagerStyles>({
  wrapper: {
    width: "100%",
    maxHeight: screenHeight * 0.85,
    borderRadius: layout.borderRadius.lg,
    borderWidth: layout.borderWidth.thin,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.md,
    borderBottomWidth: layout.borderWidth.thin,
    borderBottomColor: theme.colors.borderSubtle,
  },
  headerTitle: {
    color: theme.colors.text,
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
    backgroundColor: panelBackground,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  calloutTitle: {
    color: theme.colors.text,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  bodyText: {
    color: theme.colors.text,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  bodyMuted: {
    color: theme.colors.textMuted,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  bodyStrong: {
    color: theme.colors.text,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.bold,
  },
  listItem: {
    color: theme.colors.text,
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
    color: theme.colors.text,
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
    color: theme.colors.text,
    fontSize: typography.size.md,
    lineHeight: typography.lineHeight.md,
    fontFamily: typography.fontFamily.bold,
  },
  energySubtitle: {
    color: theme.colors.textMuted,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
  },
  energySolar: {
    backgroundColor: theme.energy.backgrounds.solar,
  },
  energyHydro: {
    backgroundColor: theme.energy.backgrounds.hydro,
  },
  energyPlasma: {
    backgroundColor: theme.energy.backgrounds.plasma,
  },
  energyNeural: {
    backgroundColor: theme.energy.backgrounds.neural,
  },
  energyFlux: {
    backgroundColor: theme.energy.backgrounds.flux,
  },
  cardList: {
    gap: spacing.sm,
  },
  card: {
    backgroundColor: panelBackground,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xs,
  },
  cardTitle: {
    color: theme.colors.text,
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
    backgroundColor: `rgba(0,184,219,${accentAlpha})`,
  },
  protocolClaiming: {
    backgroundColor: `rgba(173,70,255,${accentAlpha})`,
  },
  protocolBenefits: {
    backgroundColor: `rgba(240,177,0,${accentAlpha})`,
  },
  nodeList: {
    gap: spacing.sm,
  },
  nodeRow: {
    backgroundColor: panelBackground,
    borderRadius: layout.borderRadius.lg,
    padding: spacing.md,
    gap: spacing.xxs,
  },
  nodeResearch: {
    backgroundColor: `rgba(43,127,255,${accentAlpha})`,
  },
  nodeProduction: {
    backgroundColor: `rgba(173,70,255,${accentAlpha})`,
  },
  nodeNetwork: {
    backgroundColor: `rgba(255,105,0,${accentAlpha})`,
  },
  nodeControl: {
    backgroundColor: `rgba(0,201,80,${accentAlpha})`,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: layout.borderWidth.thin,
    borderTopColor: theme.colors.borderSubtle,
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
    backgroundColor: theme.mode === "light" ? "#F3F4F6" : theme.colors.surfaceMuted,
  },
  footerButtonDisabled: {
    opacity: 0.3,
  },
  footerButtonPrimary: {
    backgroundColor: theme.mode === "light" ? "#F3F4F6" : theme.colors.surfaceAlt,
  },
  footerButtonSuccess: {
    backgroundColor: "#16A34A",
  },
  footerLabel: {
    color: theme.colors.text,
    fontSize: typography.size.sm,
    lineHeight: typography.lineHeight.sm,
    fontFamily: typography.fontFamily.medium,
  },
  footerLabelOnPrimary: {
    color: theme.colors.buttonText,
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
    backgroundColor: theme.colors.textSubtle,
  },
  dotActive: {
    width: 24,
    backgroundColor: theme.colors.text,
  },
  });
};
