/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { CodeEditor } from "./code-editor";

const typeScriptCode = `interface User {
  id: string
  name: string
  email: string
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}!\`
}`;

const meta: Meta<typeof CodeEditor> = {
  component: CodeEditor,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `A code editor component built with Monaco Editor (VS Code's editor).

**Features:**
- Syntax highlighting for 10+ languages
- Auto-completion and IntelliSense
- Light and dark theme support  
- Diff editor for code comparison
- Customizable options

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
import { CodeEditor } from "@melv1c/ui/monaco-editors";
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
    lineNumbers: {
      control: "boolean",
    },
    wordWrap: {
      control: "boolean",
    },
    minimap: {
      control: "boolean",
    },
  },
  args: {
    language: "typescript",
    theme: "qualifio",
    readOnly: false,
    disabled: false,
    lineNumbers: true,
    wordWrap: false,
    minimap: false,
    variant: "default",
    size: "default",
  },
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

export const Default: Story = {
  render: (props) => {
    const [value, setValue] = useState(typeScriptCode);
    return (
      <CodeEditor
        value={value}
        onChange={(v) => setValue(v ?? "")}
        {...props}
      />
    );
  },
};
