import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "../base/label";
import { CodeDiffEditor } from "./code-diff-editor";

const originalCode = `interface User {
  id: string
  name: string
}`;

const modifiedCode = `interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}`;

const meta: Meta<typeof CodeDiffEditor> = {
  component: CodeDiffEditor,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `A diff editor component built with Monaco Editor for comparing two code versions side by side.

**Features:**
- Side-by-side code comparison
- Syntax highlighting for 10+ languages
- Light and dark theme support
- Customizable options
- Resizable split view

**Installation:**
This component requires \`@monaco-editor/react\` and \`monaco-editor\` as peer dependencies. Install them in your project:

\`\`\`bash
npm install @monaco-editor/react monaco-editor
# or
bun add @monaco-editor/react monaco-editor
\`\`\`

**Import:**
Since Monaco Editor components are optional, they are exported from a separate path:

\`\`\`tsx
import { CodeDiffEditor } from "@melv1c/ui/monaco-editors";
\`\`\`

See [Monaco React docs](https://github.com/suren-atoyan/monaco-react)`,
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
    language: {
      control: "select",
      options: [
        "typescript",
        "javascript",
        "json",
        "html",
        "css",
        "markdown",
        "python",
        "sql",
        "xml",
        "yaml",
        "plaintext",
      ],
    },
    theme: {
      control: "select",
      options: ["light", "vs-dark", "qualifio"],
    },
    readOnly: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
  args: {
    language: "typescript",
    theme: "qualifio",
    readOnly: false,
    disabled: false,
    variant: "default",
    size: "default",
  },
};

export default meta;
type Story = StoryObj<typeof CodeDiffEditor>;

export const Default: Story = {
  render: (props) => (
    <div className="grid gap-3">
      <Label>Code Comparison</Label>
      <CodeDiffEditor
        original={originalCode}
        modified={modifiedCode}
        {...props}
      />
    </div>
  ),
};
