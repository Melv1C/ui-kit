import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  async viteFinal(existingConfig) {
    existingConfig.plugins = existingConfig.plugins ?? [];
    existingConfig.plugins.push(tailwindcss());

    existingConfig.resolve = existingConfig.resolve ?? {};
    existingConfig.resolve.alias = {
      ...existingConfig.resolve.alias,
      "@": path.resolve(__dirname, "../src"),
    };

    return existingConfig;
  },
};

export default config;
