import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getTheme, Theme, ThemeMode } from "@/constants/theme";
import * as SecureStore from "expo-secure-store";
import { reportRuntimeError } from "@/utils/runtimeError";

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isColorBlind: boolean;
  toggleColorBlind: () => void;
  isFontScalingEnabled: boolean;
  toggleFontScaling: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [isColorBlind, setIsColorBlind] = useState(false);
  const [isFontScalingEnabled, setIsFontScalingEnabled] = useState(false);
  const storageKey = "quantum_nexus_theme_mode";
  const colorBlindKey = "quantum_nexus_color_blind";
  const fontScalingKey = "quantum_nexus_font_scaling";

  useEffect(() => {
    let isMounted = true;
    const loadMode = async () => {
      try {
        const stored = await SecureStore.getItemAsync(storageKey);
        if (!isMounted || !stored) {
          return;
        }
        if (stored === "dark" || stored === "light") {
          setMode(stored);
        }
      } catch (error) {
        reportRuntimeError(
          {
            scope: "ThemeContext",
            action: "load_theme_mode",
          },
          error,
        );
      }
    };
    loadMode();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    SecureStore.setItemAsync(storageKey, mode).catch((error) => {
      reportRuntimeError(
        {
          scope: "ThemeContext",
          action: "save_theme_mode",
          metadata: { mode },
        },
        error,
      );
    });
  }, [mode]);

  useEffect(() => {
    let isMounted = true;
    const loadColorBlind = async () => {
      try {
        const stored = await SecureStore.getItemAsync(colorBlindKey);
        if (!isMounted || stored === null) {
          return;
        }
        setIsColorBlind(stored === "true");
      } catch (error) {
        reportRuntimeError(
          {
            scope: "ThemeContext",
            action: "load_color_blind_mode",
          },
          error,
        );
      }
    };
    loadColorBlind();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    SecureStore.setItemAsync(colorBlindKey, String(isColorBlind)).catch((error) => {
      reportRuntimeError(
        {
          scope: "ThemeContext",
          action: "save_color_blind_mode",
          metadata: { isColorBlind },
        },
        error,
      );
    });
  }, [isColorBlind]);

  useEffect(() => {
    let isMounted = true;
    const loadFontScaling = async () => {
      try {
        const stored = await SecureStore.getItemAsync(fontScalingKey);
        if (!isMounted || stored === null) {
          return;
        }
        setIsFontScalingEnabled(stored === "true");
      } catch (error) {
        reportRuntimeError(
          {
            scope: "ThemeContext",
            action: "load_font_scaling",
          },
          error,
        );
      }
    };
    loadFontScaling();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    SecureStore.setItemAsync(
      fontScalingKey,
      String(isFontScalingEnabled),
    ).catch((error) => {
      reportRuntimeError(
        {
          scope: "ThemeContext",
          action: "save_font_scaling",
          metadata: { isFontScalingEnabled },
        },
        error,
      );
    });
  }, [isFontScalingEnabled]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const toggleColorBlind = useCallback(() => {
    setIsColorBlind((prev) => !prev);
  }, []);

  const toggleFontScaling = useCallback(() => {
    setIsFontScalingEnabled((prev) => !prev);
  }, []);

  const value = useMemo(() => {
    const theme = getTheme(mode, isColorBlind);
    return {
      theme,
      mode,
      isDarkMode: mode === "dark",
      toggleTheme,
      isColorBlind,
      toggleColorBlind,
      isFontScalingEnabled,
      toggleFontScaling,
    };
  }, [
    mode,
    toggleTheme,
    isColorBlind,
    toggleColorBlind,
    isFontScalingEnabled,
    toggleFontScaling,
  ]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
