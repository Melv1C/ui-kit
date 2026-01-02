# Monaco Editor Components

Code editor components built with [Monaco Editor](https://microsoft.github.io/monaco-editor/) (the editor that powers VS Code), providing syntax highlighting, IntelliSense, and a rich editing experience.

## Installation

Monaco Editor components are **optional** and require additional peer dependencies to be installed:

```bash
npm install @monaco-editor/react monaco-editor
# or
bun add @monaco-editor/react monaco-editor
```

## Import

Since Monaco Editor components are optional, they are exported from a separate path:

```tsx
import { CodeEditor, CodeDiffEditor } from "@melv1c/ui/monaco-editors";
```

## Components

### CodeEditor

A full-featured code editor component with syntax highlighting, auto-completion, and IntelliSense.

#### Basic Usage

```tsx
import { CodeEditor } from "@melv1c/ui/monaco-editors";
import { useState } from "react";

function MyComponent() {
  const [code, setCode] = useState("console.log('Hello, World!');");

  return (
    <CodeEditor
      language="javascript"
      value={code}
      onChange={(value) => setCode(value ?? "")}
    />
  );
}
```

#### Props

| Prop           | Type                                          | Default      | Description                                      |
| -------------- | --------------------------------------------- | ------------ | ------------------------------------------------ |
| `language`     | `SupportedLanguage`                           | **required** | The programming language for syntax highlighting |
| `value`        | `string`                                      | -            | Controlled value of the editor                   |
| `defaultValue` | `string`                                      | -            | Uncontrolled default value                       |
| `theme`        | `"light" \| "vs-dark" \| "qualifio"`          | `"qualifio"` | Editor theme                                     |
| `readOnly`     | `boolean`                                     | `false`      | Make the editor read-only                        |
| `disabled`     | `boolean`                                     | `false`      | Disable the editor                               |
| `lineNumbers`  | `boolean`                                     | `true`       | Show line numbers                                |
| `wordWrap`     | `boolean`                                     | `false`      | Enable word wrapping                             |
| `minimap`      | `boolean`                                     | `false`      | Show minimap                                     |
| `variant`      | `"default" \| "ghost" \| "card"`              | `"default"`  | Visual variant                                   |
| `size`         | `"default" \| "sm" \| "lg"`                   | `"default"`  | Size variant                                     |
| `onChange`     | `(value: string \| undefined) => void`        | -            | Callback when content changes                    |
| `onMount`      | `(editor, monaco) => void`                    | -            | Callback when editor is mounted                  |
| `onValidate`   | `(markers) => void`                           | -            | Callback for validation markers                  |
| `options`      | `editor.IStandaloneEditorConstructionOptions` | -            | Additional Monaco editor options                 |

### CodeDiffEditor

A side-by-side diff editor for comparing two versions of code.

#### Basic Usage

```tsx
import { CodeDiffEditor } from "@melv1c/ui/monaco-editors";

function MyComponent() {
  const original = `function greet() {
  return "Hello";
}`;

  const modified = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

  return (
    <CodeDiffEditor
      language="typescript"
      original={original}
      modified={modified}
    />
  );
}
```

#### Props

| Prop       | Type                                    | Default      | Description                                      |
| ---------- | --------------------------------------- | ------------ | ------------------------------------------------ |
| `language` | `SupportedLanguage`                     | **required** | The programming language for syntax highlighting |
| `original` | `string`                                | -            | The original version of the code                 |
| `modified` | `string`                                | -            | The modified version of the code                 |
| `theme`    | `"light" \| "vs-dark" \| "qualifio"`    | `"qualifio"` | Editor theme                                     |
| `readOnly` | `boolean`                               | `false`      | Make the editor read-only                        |
| `disabled` | `boolean`                               | `false`      | Disable the editor                               |
| `variant`  | `"default" \| "ghost" \| "card"`        | `"default"`  | Visual variant                                   |
| `size`     | `"default" \| "sm" \| "lg"`             | `"default"`  | Size variant                                     |
| `onMount`  | `(editor, monaco) => void`              | -            | Callback when editor is mounted                  |
| `options`  | `editor.IDiffEditorConstructionOptions` | -            | Additional Monaco diff editor options            |

## Supported Languages

- `typescript`
- `javascript`
- `json`
- `html`
- `css`
- `markdown`
- `python`
- `sql`
- `xml`
- `yaml`
- `plaintext`

## Themes

The components support three built-in themes:

- **`light`**: Light theme (Monaco's default light theme)
- **`vs-dark`**: Dark theme (Monaco's default dark theme)
- **`qualifio`**: Custom Qualifio theme (default) - adapts to your application's color scheme
