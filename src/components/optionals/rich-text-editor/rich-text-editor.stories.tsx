import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  EditorActionButton,
  EditorBubbleMenu,
  EditorBubbleMenuSeparator,
  EditorContent,
  EditorRoot,
  EditorToolbarComposable,
  EditorToolbarGroup,
  EditorToolbarSeparator,
  RichTextEditor,
  type RichTextEditorProps,
} from "./rich-text-editor";

const meta: Meta<typeof RichTextEditor> = {
  component: RichTextEditor,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `A TipTap rich text editor with two APIs:

- **Quick API** via \`RichTextEditor\`
- **Composable API** via \`EditorRoot\`, \`EditorToolbarComposable\`, \`EditorActionButton\`, and \`EditorContent\`.

**Install peer dependencies:**

\`\`\`bash
npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-placeholder
# or
bun add @tiptap/react @tiptap/starter-kit @tiptap/extension-underline @tiptap/extension-link @tiptap/extension-placeholder
\`\`\`

**Import:**

\`\`\`tsx
import { RichTextEditor } from "@melv1c/ui-kit/rich-text-editor";
// or composable imports from the same package path
\`\`\``,
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

const workspaceInitialContent = `<h1>Welcome to Workspace</h1>
<p>Start writing your content here. Use the toolbar to format text and structure your content.</p>
<h2>Getting Started</h2>
<ul>
  <li><strong>Use formatting</strong> from the toolbar buttons</li>
  <li><strong>Add headings</strong> to structure your sections</li>
  <li><strong>Build lists</strong> with ordered and unordered list controls</li>
  <li><strong>Edit links</strong> directly from the toolbar</li>
</ul>`;

function QuickEditorPreview(props: RichTextEditorProps) {
  const [value, setValue] = React.useState(defaultContent);

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
}

function ComposableEditorPreview() {
  const [content, setContent] = React.useState(workspaceInitialContent);

  return (
    <div className="space-y-4">
      <div className="h-[560px] overflow-hidden rounded-md border">
        <EditorRoot
          content={content}
          onChange={setContent}
          className="flex h-full min-h-0 flex-col rounded-none border-0 focus-within:ring-0"
        >
          <EditorToolbarComposable>
            <EditorToolbarGroup>
              <EditorActionButton action="bold" />
              <EditorActionButton action="italic" />
              <EditorActionButton action="underline" />
              <EditorActionButton action="strike" />
              <EditorActionButton action="code" />
            </EditorToolbarGroup>

            <EditorToolbarSeparator />

            <EditorToolbarGroup>
              <EditorActionButton action="h1" />
              <EditorActionButton action="h2" />
              <EditorActionButton action="h3" />
            </EditorToolbarGroup>

            <EditorToolbarSeparator />

            <EditorToolbarGroup>
              <EditorActionButton action="bulletList" />
              <EditorActionButton action="orderedList" />
            </EditorToolbarGroup>

            <EditorToolbarSeparator />

            <EditorToolbarGroup>
              <EditorActionButton action="codeBlock" />
              <EditorActionButton action="link" />
              <EditorActionButton action="horizontalRule" />
            </EditorToolbarGroup>

            <EditorToolbarSeparator />

            <EditorToolbarGroup>
              <EditorActionButton action="undo" />
              <EditorActionButton action="redo" />
            </EditorToolbarGroup>
          </EditorToolbarComposable>

          <div className="flex-1 overflow-auto">
            <EditorBubbleMenu>
              <EditorActionButton action="bold" />
              <EditorActionButton action="italic" />
              <EditorActionButton action="underline" />
              <EditorActionButton action="strike" />
              <EditorBubbleMenuSeparator />
              <EditorActionButton action="link" />
            </EditorBubbleMenu>
            <EditorContent placeholder="Start writing your content..." />
          </div>
        </EditorRoot>
      </div>

      <div className="rounded-md border p-4">
        <p className="text-muted-foreground mb-2 text-sm font-medium">
          HTML Output:
        </p>
        <pre className="text-muted-foreground text-xs whitespace-pre-wrap">
          {content || "(empty)"}
        </pre>
      </div>
    </div>
  );
}

function ReadOnlyPreview() {
  const [value, setValue] = React.useState(defaultContent);
  return <RichTextEditor readOnly value={value} onChange={setValue} />;
}

function MinimalToolbarPreview() {
  const [value, setValue] = React.useState(
    "<p>A minimal editor with only basic formatting.</p>",
  );

  return (
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
  );
}

export const Default: Story = {
  render: (props) => <QuickEditorPreview {...props} />,
};

export const Composable: Story = {
  render: () => <ComposableEditorPreview />,
};

export const ReadOnly: Story = {
  render: () => <ReadOnlyPreview />,
};

export const MinimalToolbar: Story = {
  render: () => <MinimalToolbarPreview />,
};
