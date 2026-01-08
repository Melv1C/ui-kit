# @melv1c/ui

A React component library built with Tailwind CSS and TypeScript.

## Documentation

For detailed usage instructions, installation guides, and component documentation, visit the [online documentation](https://ui-kit.melvyn.be).

## Concept

This library provides a collection of reusable, accessible UI components that follow modern design principles and are fully customizable through Tailwind CSS theming.

## Stack

- **React 18** - JavaScript library for building UI
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Storybook** - Component documentation and testing
- **ESLint & Prettier** - Code quality and formatting

## Local Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
npm install
npm run dev
```

This starts the Storybook dev server on `http://localhost:6006`.

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

## Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/your-feature`)
2. Make your changes and commit (`git commit -m 'Add feature'`)
3. Push to the branch (`git push origin feature/your-feature`)
4. Open a pull request

When adding components:

1. Create your component in the appropriate folder under `src/components/`
2. Add a `.stories.tsx` file for Storybook documentation
3. Export the component from the folder's `index.ts`
4. Run `npm run lint:fix` and `npm run format` before submitting
5. Ensure all tests pass
