import { colors, gradients, GradientTuple } from "./colors";

type EnergyKey = "solar" | "hydro" | "plasma" | "neural" | "flux";

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

export type ThemeEnergy = {
  colors: Record<EnergyKey, string>;
  gradients: Record<EnergyKey, GradientTuple>;
  backgrounds: Record<EnergyKey, string>;
};

export type Theme = {
  mode: ThemeMode;
  colorBlind: boolean;
  colors: ThemeColors;
  gradients: ThemeGradients;
  energy: ThemeEnergy;
};

function hexToRgba(hex: string, alpha: number): string {
  const normalized = hex.replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((char) => char + char)
          .join("")
      : normalized;
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const baseEnergyColors: Record<EnergyKey, string> = {
  solar: colors.yellow400,
  hydro: colors.cyan400,
  plasma: colors.pink400,
  neural: colors.green400,
  flux: colors.purple400,
};

const colorBlindEnergyColors: Record<EnergyKey, string> = {
  solar: colors.cbSolar,
  hydro: colors.cbHydro,
  plasma: colors.cbPlasma,
  neural: colors.cbNeural,
  flux: colors.cbFlux,
};

function buildEnergyTheme(
  isColorBlind: boolean,
  accentAlpha: number,
): ThemeEnergy {
  const energyColors = isColorBlind
    ? colorBlindEnergyColors
    : baseEnergyColors;
  const energyGradients = {
    solar: isColorBlind ? gradients.energySolarCb : gradients.energySolar,
    hydro: isColorBlind ? gradients.energyHydroCb : gradients.energyHydro,
    plasma: isColorBlind ? gradients.energyPlasmaCb : gradients.energyPlasma,
    neural: isColorBlind ? gradients.energyNeuralCb : gradients.energyNeural,
    flux: isColorBlind ? gradients.energyFluxCb : gradients.energyFlux,
  };
  const energyBackgrounds = {
    solar: hexToRgba(energyColors.solar, accentAlpha),
    hydro: hexToRgba(energyColors.hydro, accentAlpha),
    plasma: hexToRgba(energyColors.plasma, accentAlpha),
    neural: hexToRgba(energyColors.neural, accentAlpha),
    flux: hexToRgba(energyColors.flux, accentAlpha),
  };

  return {
    colors: energyColors,
    gradients: energyGradients,
    backgrounds: energyBackgrounds,
  };
}

const darkTheme: Theme = {
  mode: "dark",
  colorBlind: false,
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
  energy: buildEnergyTheme(false, 0.2),
};

const lightTheme: Theme = {
  mode: "light",
  colorBlind: false,
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
  energy: buildEnergyTheme(false, 0.16),
};

export function getTheme(mode: ThemeMode, colorBlind = false): Theme {
  const base = mode === "light" ? lightTheme : darkTheme;
  if (!colorBlind) {
    return base;
  }
  return {
    ...base,
    colorBlind: true,
    energy: buildEnergyTheme(true, base.mode === "light" ? 0.16 : 0.2),
  };
}
