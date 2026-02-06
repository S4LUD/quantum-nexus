import i18n, { changeLanguage, use as i18nUse } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import zh from "./locales/zh.json";
import ja from "./locales/ja.json";
import ko from "./locales/ko.json";
import th from "./locales/th.json";
import id from "./locales/id.json";
import ru from "./locales/ru.json";

export const supportedLanguages = [
  "en",
  "zh",
  "ja",
  "ko",
  "th",
  "id",
  "ru",
] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageLabels: Record<SupportedLanguage, string> = {
  en: "English",
  zh: "中文",
  ja: "日本語",
  ko: "한국어",
  th: "ไทย",
  id: "Bahasa Indonesia",
  ru: "Русский",
};

const resources = {
  en: { translation: en },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  th: { translation: th },
  id: { translation: id },
  ru: { translation: ru },
} as const;

export function initI18n(language: SupportedLanguage) {
  if (i18n.isInitialized) {
    changeLanguage(language).catch(() => {});
    return i18n;
  }

  i18nUse(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

  return i18n;
}
