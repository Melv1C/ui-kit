import type { AnyExtension } from "@tiptap/core";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as React from "react";
import { cn } from "@/lib/utils";
import { EditorContext, type EditorContextValue } from "./editor-context";
import type { RichTextEditorProps } from "./types";
import { editorContentVariants, richTextEditorVariants } from "./variants";

interface EditorRootProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "content" | "onChange">,
    Pick<
      RichTextEditorProps,
      | "variant"
      | "size"
      | "readOnly"
      | "disabled"
      | "multiline"
      | "contentClassName"
    > {
  content: string;
  onChange: (value: string) => void;
  placeholder?: string;
  extensions?: AnyExtension[];
  shouldRerenderOnTransaction?: boolean;
}

function EditorRoot({
  content,
  onChange,
  placeholder = "Start typing...",
  readOnly = false,
  disabled = false,
  multiline = true,
  variant,
  size,
  className,
  contentClassName,
  extensions = [],
  shouldRerenderOnTransaction = true,
  children,
  ...props
}: EditorRootProps) {
  const [resolvedPlaceholder, setResolvedPlaceholder] = React.useState(placeholder);

  React.useEffect(() => {
    setResolvedPlaceholder(placeholder);
  }, [placeholder]);

  const baseExtensions = React.useMemo(
    () => [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        blockquote: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2 cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: resolvedPlaceholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-muted-foreground before:float-left before:h-0 before:pointer-events-none",
      }),
    ],
    [resolvedPlaceholder],
  );

  const editor = useEditor({
    extensions: [...baseExtensions, ...extensions],
    content,
    editable: !readOnly && !disabled,
    shouldRerenderOnTransaction,
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.isEmpty ? "" : currentEditor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          editorContentVariants({ size: multiline ? size : undefined }),
          "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-2",
          "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mb-2",
          "[&_h3]:text-lg [&_h3]:font-medium [&_h3]:mb-1",
          "[&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4",
          "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2",
          !multiline && "min-h-0 py-2",
        ),
      },
      handleKeyDown: (_, event) => {
        if (!multiline && event.key === "Enter") {
          return true;
        }

        return false;
      },
    },
  });

  React.useEffect(() => {
    if (!editor) {
      return;
    }

    editor.setEditable(!readOnly && !disabled);
  }, [editor, readOnly, disabled]);

  React.useEffect(() => {
    if (!editor) {
      return;
    }

    if (content === "" && editor.isEmpty) {
      return;
    }

    const currentContent = editor.getHTML();
    if (content === currentContent) {
      return;
    }

    editor.commands.setContent(content || "", { emitUpdate: false });
  }, [content, editor]);

  const contextValue = React.useMemo<EditorContextValue>(
    () => ({
      editor,
      disabled,
      readOnly,
      multiline,
      variant,
      size,
      contentClassName,
      setPlaceholder: (value: string) => {
        setResolvedPlaceholder((previous) =>
          previous === value ? previous : value,
        );
      },
    }),
    [editor, disabled, readOnly, multiline, variant, size, contentClassName],
  );

  return (
    <EditorContext.Provider value={contextValue}>
      <div
        data-slot="rich-text-editor"
        className={cn(
          richTextEditorVariants({
            variant,
            size: multiline ? size : undefined,
          }),
          !multiline && "min-h-0",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </EditorContext.Provider>
  );
}

export { EditorRoot, type EditorRootProps };
