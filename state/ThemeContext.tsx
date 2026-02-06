import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getTheme, Theme, ThemeMode } from "@/constants/theme";
import * as SecureStore from "expo-secure-store";

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isColorBlind: boolean;
  toggleColorBlind: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const [isColorBlind, setIsColorBlind] = useState(false);
  const storageKey = "quantum_nexus_theme_mode";
  const colorBlindKey = "quantum_nexus_color_blind";

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
      } catch {
        // ignore storage errors
      }
    };
    loadMode();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    SecureStore.setItemAsync(storageKey, mode).catch(() => {});
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
      } catch {
        // ignore storage errors
      }
    };
    loadColorBlind();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    SecureStore.setItemAsync(colorBlindKey, String(isColorBlind)).catch(() => {});
  }, [isColorBlind]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const toggleColorBlind = useCallback(() => {
    setIsColorBlind((prev) => !prev);
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
    };
  }, [mode, toggleTheme, isColorBlind, toggleColorBlind]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
