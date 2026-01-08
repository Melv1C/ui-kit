import { copyFileSync, mkdirSync, readdirSync } from "fs";
import { join } from "path";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "locales/index": "src/locales/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  splitting: true, // Enable code-splitting for lazy imports

  onSuccess: async () => {
    // Copy base CSS file
    mkdirSync(join(process.cwd(), "dist"), { recursive: true });
    copyFileSync(
      join(process.cwd(), "src/styles/base.css"),
      join(process.cwd(), "dist/base.css"),
    );

    // Copy all theme CSS files
    const themesDir = join(process.cwd(), "src/styles/themes");
    const themeFiles = readdirSync(themesDir).filter((file) =>
      file.endsWith(".css"),
    );

    mkdirSync(join(process.cwd(), "dist/themes"), { recursive: true });
    for (const file of themeFiles) {
      copyFileSync(
        join(themesDir, file),
        join(process.cwd(), "dist/themes", file),
      );
    }

    console.log(
      `✅ CSS files copied to dist folder (${themeFiles.length} themes)`,
    );
  },

  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    "tailwindcss",
    "i18next",
    "react-i18next",
    /^@radix-ui\//,
    /^@hookform\//,
    /^@monaco-editor\//,
    /^@tiptap\//,
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "cmdk",
    "date-fns",
    "embla-carousel-react",
    "input-otp",
    "lucide-react",
    "monaco-editor",
    "next-themes",
    "react-day-picker",
    "react-hook-form",
    "react-resizable-panels",
    "recharts",
    "sonner",
    "vaul",
    "zod",
  ],
});
