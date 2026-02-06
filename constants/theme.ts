import { colors, gradients, GradientTuple } from "./colors";

export type ThemeMode = "dark" | "light";

export type ThemeColors = {
  background: string;
  surface: string;
  surfaceAlt: string;
  surfaceMuted: string;
  surfaceStrong: string;
  text: string;
  textMuted: string;
  textSubtle: string;
  border: string;
  borderSubtle: string;
  overlay: string;
  overlayStrong: string;
  shadow: string;
  buttonText: string;
};

export type ThemeGradients = {
  appBackground: GradientTuple;
  primaryButton: GradientTuple;
  secondaryButton: GradientTuple;
  modalBackground: GradientTuple;
  header: GradientTuple;
  tabBar: GradientTuple;
  bottomBar: GradientTuple;
};

export type Theme = {
  mode: ThemeMode;
  colors: ThemeColors;
  gradients: ThemeGradients;
};

const darkTheme: Theme = {
  mode: "dark",
  colors: {
    background: colors.slate950,
    surface: colors.slate900,
    surfaceAlt: colors.blackAlpha30,
    surfaceMuted: colors.whiteAlpha10,
    surfaceStrong: colors.blackAlpha70,
    text: colors.white,
    textMuted: colors.whiteAlpha75,
    textSubtle: colors.whiteAlpha60,
    border: colors.whiteAlpha20,
    borderSubtle: colors.whiteAlpha10,
    overlay: colors.blackAlpha70,
    overlayStrong: colors.blackAlpha70,
    shadow: colors.black,
    buttonText: colors.white,
  },
  gradients: {
    appBackground: gradients.appBackground,
    primaryButton: gradients.primaryButton,
    secondaryButton: gradients.secondaryButton,
    modalBackground: gradients.modalBackground,
    header: gradients.header,
    tabBar: gradients.tabBar,
    bottomBar: gradients.bottomBar,
  },
};

const lightTheme: Theme = {
  mode: "light",
  colors: {
    background: colors.gray300,
    surface: colors.white,
    surfaceAlt: "rgba(255,255,255,0.8)",
    surfaceMuted: "rgba(255,255,255,0.6)",
    surfaceStrong: "rgba(255,255,255,0.92)",
    text: colors.slate900,
    textMuted: colors.gray700,
    textSubtle: colors.gray400,
    border: colors.gray300,
    borderSubtle: "rgba(15,23,43,0.1)",
    overlay: colors.blackAlpha50,
    overlayStrong: colors.blackAlpha50,
    shadow: "rgba(15,23,43,0.2)",
    buttonText: colors.white,
  },
  gradients: {
    appBackground: ["#F8FAFF", "#EEF2FF", "#E6F4FE"] as GradientTuple,
    primaryButton: gradients.primaryButton,
    secondaryButton: gradients.secondaryButton,
    modalBackground: ["#FFFFFF", "#EEF2FF"] as GradientTuple,
    header: ["rgba(255,255,255,0.95)", "rgba(230,244,254,0.95)"] as GradientTuple,
    tabBar: ["rgba(255,255,255,0.92)", "rgba(255,255,255,0.92)"] as GradientTuple,
    bottomBar: ["rgba(255,255,255,0.95)", "rgba(230,244,254,0.95)"] as GradientTuple,
  },
};

export function getTheme(mode: ThemeMode): Theme {
  return mode === "light" ? lightTheme : darkTheme;
}
