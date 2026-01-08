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
