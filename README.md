# @melv1c/ui

A React component library built with Tailwind CSS.

## Installation

```bash
npm install @melv1c/ui
```

## Usage

> **Recommended:** Using the Tailwind theme provides full access to theme variables and utility classes.

### Setup with Tailwind CSS

**1. Install peer dependencies:**

```bash
npm install tailwindcss tw-animate-css
```

**2. Configure Tailwind CSS (Vite example):**

```bash
npm install @tailwindcss/vite
```

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

For other build tools, see the [Tailwind CSS installation guide](https://tailwindcss.com/docs/installation).

**3. Update your CSS file:**

```css
/* src/index.css */
@import "tailwindcss";
@import "tw-animate-css";

@source '../node_modules/@melv1c/ui';

@import "@melv1c/ui/theme.css";
```

**4. Use components:**

```tsx
import { Button } from "@melv1c/ui";

function App() {
  return <Button variant="default">Click me</Button>;
}
```

### Internationalization (i18n)

Some components include built-in translations. Wrap your app with `TranslationProvider`:

```tsx
import { TranslationProvider } from "@melv1c/ui";
import i18n from "./i18n";

function App() {
  return (
    <TranslationProvider i18n={i18n}>
      <YourApp />
    </TranslationProvider>
  );
}
```

Or manually add translations to your i18n config:

```ts
import { en as uiEn, fr as uiFr } from "@melv1c/ui/locales";

i18n.init({
  resources: {
    en: { ui: uiEn },
    fr: { ui: uiFr },
  },
});
```

### Optional Components

These require additional peer dependencies and are exported from separate paths:

- [**Monaco Editor**](./src/components/monaco-editors/README.md) - Code editor with syntax highlighting
- [**Rich Text Editor**](./src/components/rich-text-editor/README.md) - WYSIWYG editor

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
```

### Available Scripts

| Command                   | Description                             |
| ------------------------- | --------------------------------------- |
| `npm run dev`             | Start Storybook dev server on port 6006 |
| `npm run build`           | Build the library with tsup             |
| `npm run build:watch`     | Build in watch mode                     |
| `npm run lint`            | Run ESLint                              |
| `npm run lint:fix`        | Fix ESLint issues                       |
| `npm run format`          | Format code with Prettier               |
| `npm run format:check`    | Check code formatting                   |
| `npm run build-storybook` | Build static Storybook                  |

### Project Structure

```
src/
├── components/
│   ├── base/           # Core UI components (Button, Input, etc.)
│   ├── custom/         # Custom composed components
│   ├── monaco-editors/ # Monaco editor components (optional)
│   ├── rich-text-editor/ # TipTap editor (optional)
│   └── providers/      # Context providers
├── hooks/              # React hooks
├── lib/                # Utility functions
└── locales/            # i18n translations (en, fr)
```

### Adding Components

1. Create your component in the appropriate folder under `src/components/`
2. Add a `.stories.tsx` file for Storybook documentation
3. Export the component from the folder's `index.ts`
4. Run `npm run dev` to preview in Storybook
