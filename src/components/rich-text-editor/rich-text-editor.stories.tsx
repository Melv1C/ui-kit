/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { RichTextEditor } from "./rich-text-editor";

const meta: Meta<typeof RichTextEditor> = {
  component: RichTextEditor,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `A rich text editor component built with TipTap.

**Features:**
- Bold, italic, underline, strikethrough formatting
- Bullet and ordered lists
- Link insertion and editing
- Placeholder text support
- HTML output
- Responsive and mobile-friendly

**Installation:**
This component requires TipTap dependencies as peer dependencies. Install them in your project:

\`\`\`bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-placeholder
# or
bun add @tiptap/react @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-placeholder
\`\`\`

**Import:**
Since TipTap editor components are optional, they are exported from a separate path:

\`\`\`tsx
import { RichTextEditor } from "@melv1c/ui/rich-text-editor";
\`\`\`

See [TipTap docs](https://tiptap.dev/docs)`,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "ghost", "card"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
    },
    readOnly: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    multiline: {
      control: "boolean",
    },
  },
  args: {
    variant: "default",
    size: "default",
    readOnly: false,
    disabled: false,
    multiline: true,
  },
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

const defaultContent = `<p>This is a <strong>rich text editor</strong> with <em>formatting</em> support.</p>
<p>Try out the toolbar buttons to format your text:</p>
<ul>
  <li><strong>Bold</strong> text for emphasis</li>
  <li><em>Italic</em> text for subtle emphasis</li>
  <li><u>Underlined</u> text</li>
  <li><s>Strikethrough</s> for deletions</li>
</ul>
<p>You can also add <a href="https://example.com" target="_blank">links</a> to your content.</p>`;

export const Default: Story = {
  render: (props) => {
    const [value, setValue] = useState(defaultContent);
    return (
      <div className="space-y-4">
        <RichTextEditor {...props} value={value} onChange={setValue} />
        <div className="rounded-md border p-4">
          <p className="text-muted-foreground mb-2 text-sm font-medium">
            HTML Output:
          </p>
          <pre className="text-muted-foreground text-xs whitespace-pre-wrap">
            {value || "(empty)"}
          </pre>
        </div>
      </div>
    );
  },
};

export const Empty: Story = {
  render: (_) => {
    const [value, setValue] = useState("");
    return (
      <RichTextEditor
        placeholder="Write something amazing..."
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const ReadOnly: Story = {
  render: (_) => {
    const [value, setValue] = useState(defaultContent);
    return <RichTextEditor readOnly value={value} onChange={setValue} />;
  },
};

export const Disabled: Story = {
  render: (_) => {
    const [value, setValue] = useState(defaultContent);
    return <RichTextEditor disabled value={value} onChange={setValue} />;
  },
};

export const SmallSize: Story = {
  render: (_) => {
    const [value, setValue] = useState(defaultContent);
    return (
      <RichTextEditor
        size="sm"
        placeholder="Compact editor..."
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const LargeSize: Story = {
  render: (_) => {
    const [value, setValue] = useState(defaultContent);
    return (
      <RichTextEditor
        size="lg"
        placeholder="Large editor for more content..."
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const CardVariant: Story = {
  render: (_) => {
    const [value, setValue] = useState(defaultContent);
    return <RichTextEditor variant="card" value={value} onChange={setValue} />;
  },
};

export const SingleLine: Story = {
  render: (_) => {
    const [value, setValue] = useState(
      "<p>Single line input - Enter key is disabled</p>",
    );
    return (
      <RichTextEditor
        multiline={false}
        placeholder="Type here (no line breaks allowed)..."
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const CustomToolbarOptions: Story = {
  render: (_) => {
    const [value, setValue] = useState(
      "<p>This editor only has <strong>bold</strong>, <em>italic</em>, and links enabled.</p>",
    );
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Only bold, italic, and link options are enabled:
        </p>
        <RichTextEditor
          value={value}
          onChange={setValue}
          toolbarOptions={{
            headings: false,
            bold: true,
            italic: true,
            underline: false,
            strikethrough: false,
            bulletList: false,
            orderedList: false,
            link: true,
          }}
        />
      </div>
    );
  },
};

export const MinimalToolbar: Story = {
  render: (_) => {
    const [value, setValue] = useState(
      "<p>A minimal editor with only basic formatting.</p>",
    );
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Only bold and italic options enabled (no headings, lists, or links):
        </p>
        <RichTextEditor
          value={value}
          onChange={setValue}
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
      </div>
    );
  },
};

export const FormattingOnly: Story = {
  render: (_) => {
    const [value, setValue] = useState(
      "<p>This editor has all text formatting but no headings or lists.</p>",
    );
    return (
      <div className="space-y-4">
        <p className="text-muted-foreground text-sm">
          All text formatting options but no headings or lists:
        </p>
        <RichTextEditor
          value={value}
          onChange={setValue}
          toolbarOptions={{
            headings: false,
            bulletList: false,
            orderedList: false,
          }}
        />
      </div>
    );
  },
};
