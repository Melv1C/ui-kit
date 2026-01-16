import type { Decorator } from "@storybook/react";
import type { Preview } from "@storybook/react-vite";
import { Suspense, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../src/i18n";
import "./index.css";

const StoryWrapper: Decorator = (Story, context) => {
  const { locale } = context.globals;

  // When the locale global changes, set the new locale in i18n
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return (
    <Suspense fallback={null}>
      <I18nextProvider i18n={i18n}>
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4">
          <Story />
        </div>
      </I18nextProvider>
    </Suspense>
  );
};

// When the language changes, set the document direction
i18n.on("languageChanged", (locale) => {
  const direction = i18n.dir(locale);
  document.dir = direction;
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        method: "configure",
        order: [
          "Documentation",
          [
            "Introduction",
            "Installation",
            "Get Started",
            "Theming",
            "Internationalisation",
            "Component Guide",
            "API Reference",
            "FAQ & Troubleshooting",
          ],
          "Components",
        ],
      },
    },
  },
  decorators: [StoryWrapper],
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      toolbar: {
        icon: "globe",
        items: [
          { value: "en", title: "English" },
          { value: "fr", title: "Français" },
          { value: "de", title: "Deutsch" },
          { value: "es", title: "Español" },
          { value: "it", title: "Italiano" },
          { value: "nl", title: "Nederlands" },
        ],
        showName: true,
      },
      defaultValue: "en",
    },
  },
};

export default preview;
