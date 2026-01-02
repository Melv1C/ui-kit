import type { i18n as I18nInstance } from "i18next";
import { type ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import * as locales from "../../locales";

interface TranslationProviderProps {
  i18n: I18nInstance;
  children: ReactNode;
  fallback?: ReactNode;
}

export function TranslationProvider({
  i18n,
  children,
  fallback = null,
}: TranslationProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!i18n.hasResourceBundle("en", "ui")) {
      for (const [lng, resources] of Object.entries(locales)) {
        i18n.addResourceBundle(lng, "ui", resources, true, true);
      }
    }
    setIsReady(true);
  }, [i18n]);

  if (!isReady) {
    return <>{fallback}</>;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
