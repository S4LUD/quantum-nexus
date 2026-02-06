import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getTheme, Theme, ThemeMode } from "@/constants/theme";
import * as SecureStore from "expo-secure-store";

interface ThemeContextValue {
  theme: Theme;
  mode: ThemeMode;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>("dark");
  const storageKey = "quantum_nexus_theme_mode";

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

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => {
    const theme = getTheme(mode);
    return {
      theme,
      mode,
      isDarkMode: mode === "dark",
      toggleTheme,
    };
  }, [mode, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
