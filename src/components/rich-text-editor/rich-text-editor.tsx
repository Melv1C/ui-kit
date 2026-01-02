import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { cn } from "@/lib/utils";
import { EditorToolbar } from "./toolbar";
import type { RichTextEditorProps } from "./types";
import { editorContentVariants, richTextEditorVariants } from "./variants";

function RichTextEditor({
  value,
  onChange,
  placeholder = "Start typing...",
  readOnly = false,
  disabled = false,
  multiline = true,
  className,
  variant,
  size,
  contentClassName,
  toolbarClassName,
  toolbarOptions,
  ...props
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        codeBlock: false,
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
        placeholder,
        emptyEditorClass:
          "before:content-[attr(data-placeholder)] before:text-muted-foreground before:float-left before:h-0 before:pointer-events-none",
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.isEmpty ? "" : editor.getHTML());
    },
    editable: !readOnly && !disabled,
    shouldRerenderOnTransaction: true, // Force a re-render when a transaction is made
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
        // Prevent Enter key when multiline is disabled
        if (!multiline && event.key === "Enter") {
          return true;
        }
        return false;
      },
    },
  });

  return (
    <div
      data-slot="rich-text-editor"
      className={cn(
        richTextEditorVariants({ variant, size: multiline ? size : undefined }),
        !multiline && "min-h-0",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      {!readOnly && (
        <EditorToolbar
          editor={editor}
          variant={variant}
          disabled={disabled}
          className={toolbarClassName}
          options={toolbarOptions}
        />
      )}
      <EditorContent
        editor={editor}
        className={cn(
          "w-full",
          disabled && "pointer-events-none",
          contentClassName,
        )}
      />
    </div>
  );
}

export { RichTextEditor, type RichTextEditorProps };
