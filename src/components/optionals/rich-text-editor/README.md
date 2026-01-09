# TipTap Rich Text Editor Components

Rich text editor components built with [TipTap](https://tiptap.dev/) (a headless editor framework for the web), providing a full-featured WYSIWYG editing experience.

## Installation

TipTap editor components are **optional** and require additional peer dependencies to be installed:

```bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-placeholder
# or
bun add @tiptap/react @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-placeholder
```

## Import

Since TipTap editor components are optional, they are exported from a separate path:

```tsx
import { RichTextEditor } from "@melv1c/ui/rich-text-editor";
```

## Components

### RichTextEditor

A full-featured WYSIWYG rich text editor with toolbar controls for formatting.

#### Basic Usage

```tsx
import { RichTextEditor } from "@melv1c/ui/rich-text-editor";
import { useState } from "react";

function MyComponent() {
  const [content, setContent] = useState("<p>Hello, World!</p>");

  return (
    <RichTextEditor
      value={content}
      onChange={(value) => setContent(value)}
      placeholder="Start writing..."
    />
  );
}
```

#### Props

| Prop               | Type                             | Default             | Description                                       |
| ------------------ | -------------------------------- | ------------------- | ------------------------------------------------- |
| `value`            | `string`                         | -                   | Controlled value of the editor (HTML string)      |
| `defaultValue`     | `string`                         | -                   | Uncontrolled default value                        |
| `onChange`         | `(value: string) => void`        | -                   | Callback when content changes                     |
| `placeholder`      | `string`                         | `"Start typing..."` | Placeholder text when editor is empty             |
| `readOnly`         | `boolean`                        | `false`             | Make the editor read-only (hides toolbar)         |
| `disabled`         | `boolean`                        | `false`             | Disable the editor                                |
| `variant`          | `"default" \| "ghost" \| "card"` | `"default"`         | Visual variant                                    |
| `size`             | `"default" \| "sm" \| "lg"`      | `"default"`         | Size variant                                      |
| `toolbarOptions`   | `ToolbarOptions`                 | All enabled         | Configure which toolbar options are enabled       |
| `contentClassName` | `string`                         | -                   | Additional class name for the editor content area |
| `toolbarClassName` | `string`                         | -                   | Additional class name for the toolbar             |

## Toolbar Features

The editor includes a toolbar with the following formatting options:

### Text Formatting

- **Bold** - Make text bold
- **Italic** - Make text italic
- **Underline** - Underline text
- **Strikethrough** - Strike through text

### Lists

- **Bullet List** - Create unordered lists
- **Ordered List** - Create numbered lists

### Links

- **Link** - Insert or edit hyperlinks with a popover interface

### Configuring Toolbar Options

You can enable or disable individual toolbar features using the `toolbarOptions` prop. All options are enabled by default.

```tsx
interface ToolbarOptions {
  headings?: boolean; // Enable H1, H2, H3 buttons (default: true)
  bold?: boolean; // Enable bold formatting (default: true)
  italic?: boolean; // Enable italic formatting (default: true)
  underline?: boolean; // Enable underline formatting (default: true)
  strikethrough?: boolean; // Enable strikethrough formatting (default: true)
  bulletList?: boolean; // Enable bullet list (default: true)
  orderedList?: boolean; // Enable ordered list (default: true)
  link?: boolean; // Enable link insertion (default: true)
}
```

#### Example: Minimal Toolbar

```tsx
<RichTextEditor
  value={content}
  onChange={setContent}
  toolbarOptions={{
    headings: false,
    bold: true,
    italic: true,
    underline: false,
    strikethrough: false,
    bulletList: false,
    orderedList: false,
    link: false,
  }}
/>
```

#### Example: Formatting Only (No Headings or Lists)

```tsx
<RichTextEditor
  value={content}
  onChange={setContent}
  toolbarOptions={{
    headings: false,
    bulletList: false,
    orderedList: false,
  }}
/>
```

## Variants

The editor supports three visual variants:

- **`default`**: Standard bordered style with subtle background
- **`ghost`**: Borderless, transparent background
- **`card`**: Card-like appearance with shadow

## Sizes

Three size options are available:

- **`sm`**: Compact editor (min-height: 120px)
- **`default`**: Standard size (min-height: 200px)
- **`lg`**: Larger editor (min-height: 350px)

## Output Format

The editor outputs content as HTML strings. The output includes:

- Paragraph tags (`<p>`)
- Bold (`<strong>`), italic (`<em>`), underline (`<u>`), strikethrough (`<s>`)
- Unordered lists (`<ul><li>`)
- Ordered lists (`<ol><li>`)
- Links (`<a href="..." target="_blank">`)

## Accessibility

The editor is built with accessibility in mind:

- All toolbar buttons have tooltips and aria-labels
- Keyboard navigation support within the editor
- Focus states are clearly visible
- Screen reader friendly

### Custom Styling

Customize the editor appearance with className props:

```tsx
<RichTextEditor
  value={content}
  onChange={setContent}
  className="my-4"
  contentClassName="min-h-[400px]"
  toolbarClassName="sticky top-0 z-10"
/>
```
