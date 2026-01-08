import type { i18n as I18nInstance } from "i18next";
import { type ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import * as locales from "../../locales";

type SupportedLanguage = "en" | "fr" | "nl" | "es" | "de" | "it";

interface TranslationProviderProps {
  i18n: I18nInstance;
  children: ReactNode;
  fallback?: ReactNode;
  /**
   * Override or extend translations.
   * Can be used to override existing translations or add new languages.
   *
   * @example
   * ```tsx
   * // Override French translation
   * overrides={{ fr: { next: "Avancer" } }}
   *
   * // Add new language
   * overrides={{ ru: { next: "Следующий", previous: "Предыдущий" } }}
   * ```
   */
  overrides?: Partial<Record<string, Record<string, string>>>;
}

/**
 * Provider for apps with existing i18n setup.
 * Automatically adds UI kit translations to the provided i18n instance.
 *
 * @example
 * ```tsx
 * <TranslationProvider i18n={i18n}>
 *   <App />
 * </TranslationProvider>
 *
 * // With overrides
 * <TranslationProvider
 *   i18n={i18n}
 *   overrides={{ fr: { next: "Avancer" }, ru: { next: "Следующий" } }}
 * >
 *   <App />
 * </TranslationProvider>
 * ```
 */
export function TranslationProvider({
  i18n,
  children,
  fallback = null,
  overrides,
}: TranslationProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Add all supported language bundles
    for (const [lng, resources] of Object.entries(locales)) {
      const language = lng as SupportedLanguage;
      const languageOverrides = overrides?.[language];

      if (i18n.hasResourceBundle(language, "ui") && !languageOverrides) {
        continue;
      }

      const mergedResources = languageOverrides
        ? { ...resources, ...languageOverrides }
        : resources;

      i18n.addResourceBundle(language, "ui", mergedResources, true, true);
    }

    // Add any additional languages from overrides (not in supported locales)
    if (overrides) {
      const supportedLanguages = Object.keys(locales);
      for (const [lng, resources] of Object.entries(overrides)) {
        if (supportedLanguages.includes(lng)) continue;
        i18n.addResourceBundle(lng, "ui", resources, true, true);
      }
    }

    setIsReady(true);
  }, [i18n, overrides]);

  if (!isReady) {
    return <>{fallback}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
