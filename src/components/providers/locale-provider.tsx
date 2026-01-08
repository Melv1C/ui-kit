import i18n from "i18next";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";
import * as locales from "../../locales";

export type SupportedLanguage = "en" | "fr" | "nl" | "es" | "de" | "it";

interface LocaleProviderProps {
  children: ReactNode;
  /** The language to use for UI kit translations. */
  language: SupportedLanguage;
  /** Override specific translations for the selected language. */
  overrides?: Record<string, string>;
}

/**
 * Provider for apps that don't need full i18n setup.
 * Creates an isolated i18n instance with only the specified language.
 *
 * @example
 * ```tsx
 * <LocaleProvider language="fr">
 *   <App />
 * </LocaleProvider>
 *
 * // With overrides
 * <LocaleProvider language="fr" overrides={{ next: "Avancer" }}>
 *   <App />
 * </LocaleProvider>
 * ```
 */
export function LocaleProvider({
  children,
  language,
  overrides,
}: LocaleProviderProps) {
  const [isReady, setIsReady] = useState(false);

  const instance = useMemo(() => i18n.createInstance(), []);

  useEffect(() => {
    const baseTranslations = locales[language] ?? {};
    const mergedTranslations = overrides
      ? { ...baseTranslations, ...overrides }
      : baseTranslations;

    instance
      .use(initReactI18next)
      .init({
        lng: language,
        fallbackLng: language,
        defaultNS: "ui",
        resources: {
          [language]: {
            ui: mergedTranslations,
          },
        },
        interpolation: {
          escapeValue: false,
        },
      })
      .then(() => setIsReady(true));
  }, [instance, language, overrides]);

  if (!isReady) {
    return null;
  }

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
