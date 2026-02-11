import { ReactNode, createContext, useContext, useEffect, useMemo, useRef, useState, useCallback } from "react";
import * as SecureStore from "expo-secure-store";
import * as Localization from "expo-localization";
import { initI18n, SupportedLanguage, supportedLanguages } from "@/i18n";
import { reportRuntimeError } from "@/utils/runtimeError";

interface LocaleContextValue {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  children: ReactNode;
}

function resolveSystemLanguage(): SupportedLanguage {
  const locale = Localization.getLocales()[0];
  const code = locale?.languageCode;
  if (code && supportedLanguages.includes(code as SupportedLanguage)) {
    return code as SupportedLanguage;
  }
  return "en";
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const storageKey = "quantum_nexus_language";
  const [language, setLanguageState] = useState<SupportedLanguage>("en");
  const initializedRef = useRef(false);

  if (!initializedRef.current) {
    initI18n("en");
    initializedRef.current = true;
  }

  const applyLanguage = useCallback(
    (next: SupportedLanguage) => {
      setLanguageState(next);
      initI18n(next);
      SecureStore.setItemAsync(storageKey, next).catch((error) => {
        reportRuntimeError(
          {
            scope: "LocaleContext",
            action: "save_language",
            metadata: { language: next },
          },
          error,
        );
      });
    },
    [storageKey],
  );

  useEffect(() => {
    let isMounted = true;
    const loadLanguage = async () => {
      try {
        const stored = await SecureStore.getItemAsync(storageKey);
        if (!isMounted) {
          return;
        }
        if (stored && supportedLanguages.includes(stored as SupportedLanguage)) {
          applyLanguage(stored as SupportedLanguage);
          return;
        }
        applyLanguage(resolveSystemLanguage());
      } catch (error) {
        reportRuntimeError(
          {
            scope: "LocaleContext",
            action: "load_language",
          },
          error,
        );
        applyLanguage(resolveSystemLanguage());
      }
    };
    loadLanguage();
    return () => {
      isMounted = false;
    };
  }, [applyLanguage, storageKey]);

  const setLanguage = useCallback((next: SupportedLanguage) => {
    applyLanguage(next);
  }, [applyLanguage]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language, setLanguage],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
