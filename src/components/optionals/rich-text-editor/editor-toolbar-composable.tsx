import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Redo,
  SquareCode,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo,
} from "lucide-react";
import * as React from "react";
import { Button } from "@/components/base/button";
import { Separator } from "@/components/base/separator";
import { Toggle } from "@/components/base/toggle";
import { cn } from "@/lib/utils";
import { useEditorContext } from "./editor-context";
import { LinkPopover } from "./toolbar/link-popover";
import type { RichTextEditorProps } from "./types";
import { toolbarVariants } from "./variants";

export type EditorAction =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "code"
  | "highlight"
  | "h1"
  | "h2"
  | "h3"
  | "bulletList"
  | "orderedList"
  | "codeBlock"
  | "link"
  | "horizontalRule"
  | "undo"
  | "redo";

const editorActionMeta: Record<
  EditorAction,
  { icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  bold: { icon: Bold, label: "Bold" },
  italic: { icon: Italic, label: "Italic" },
  underline: { icon: UnderlineIcon, label: "Underline" },
  strike: { icon: Strikethrough, label: "Strikethrough" },
  code: { icon: Code, label: "Inline code" },
  highlight: { icon: Highlighter, label: "Highlight" },
  h1: { icon: Heading1, label: "Heading 1" },
  h2: { icon: Heading2, label: "Heading 2" },
  h3: { icon: Heading3, label: "Heading 3" },
  bulletList: { icon: List, label: "Bullet list" },
  orderedList: { icon: ListOrdered, label: "Ordered list" },
  codeBlock: { icon: SquareCode, label: "Code block" },
  link: { icon: Link2, label: "Link" },
  horizontalRule: { icon: Minus, label: "Horizontal rule" },
  undo: { icon: Undo, label: "Undo" },
  redo: { icon: Redo, label: "Redo" },
};

const toggleActions = new Set<EditorAction>([
  "bold",
  "italic",
  "underline",
  "strike",
  "code",
  "highlight",
  "h1",
  "h2",
  "h3",
  "bulletList",
  "orderedList",
  "codeBlock",
]);

function isActionActive(editor: Editor, action: EditorAction) {
  switch (action) {
    case "bold":
      return editor.isActive("bold");
    case "italic":
      return editor.isActive("italic");
    case "underline":
      return editor.isActive("underline");
    case "strike":
      return editor.isActive("strike");
    case "code":
      return editor.isActive("code");
    case "highlight":
      return editor.isActive("highlight");
    case "h1":
      return editor.isActive("heading", { level: 1 });
    case "h2":
      return editor.isActive("heading", { level: 2 });
    case "h3":
      return editor.isActive("heading", { level: 3 });
    case "bulletList":
      return editor.isActive("bulletList");
    case "orderedList":
      return editor.isActive("orderedList");
    case "codeBlock":
      return editor.isActive("codeBlock");
    default:
      return false;
  }
}

function canRunAction(editor: Editor, action: EditorAction) {
  switch (action) {
    case "bold":
      return editor.can().chain().focus().toggleBold().run();
    case "italic":
      return editor.can().chain().focus().toggleItalic().run();
    case "underline":
      return editor.can().chain().focus().toggleUnderline().run();
    case "strike":
      return editor.can().chain().focus().toggleStrike().run();
    case "code":
      return editor.can().chain().focus().toggleCode().run();
    case "highlight":
      return editor.can().chain().focus().toggleMark("highlight").run();
    case "h1":
      return editor.can().chain().focus().toggleHeading({ level: 1 }).run();
    case "h2":
      return editor.can().chain().focus().toggleHeading({ level: 2 }).run();
    case "h3":
      return editor.can().chain().focus().toggleHeading({ level: 3 }).run();
    case "bulletList":
      return editor.can().chain().focus().toggleBulletList().run();
    case "orderedList":
      return editor.can().chain().focus().toggleOrderedList().run();
    case "codeBlock":
      return editor.can().chain().focus().toggleCodeBlock().run();
    case "horizontalRule":
      return editor.can().chain().focus().setHorizontalRule().run();
    case "undo":
      return editor.can().chain().focus().undo().run();
    case "redo":
      return editor.can().chain().focus().redo().run();
    case "link":
      return true;
    default:
      return false;
  }
}

function runAction(editor: Editor, action: EditorAction) {
  switch (action) {
    case "bold":
      editor.chain().focus().toggleBold().run();
      break;
    case "italic":
      editor.chain().focus().toggleItalic().run();
      break;
    case "underline":
      editor.chain().focus().toggleUnderline().run();
      break;
    case "strike":
      editor.chain().focus().toggleStrike().run();
      break;
    case "code":
      editor.chain().focus().toggleCode().run();
      break;
    case "highlight":
      editor.chain().focus().toggleMark("highlight").run();
      break;
    case "h1":
      editor.chain().focus().toggleHeading({ level: 1 }).run();
      break;
    case "h2":
      editor.chain().focus().toggleHeading({ level: 2 }).run();
      break;
    case "h3":
      editor.chain().focus().toggleHeading({ level: 3 }).run();
      break;
    case "bulletList":
      editor.chain().focus().toggleBulletList().run();
      break;
    case "orderedList":
      editor.chain().focus().toggleOrderedList().run();
      break;
    case "codeBlock":
      editor.chain().focus().toggleCodeBlock().run();
      break;
    case "horizontalRule":
      editor.chain().focus().setHorizontalRule().run();
      break;
    case "undo":
      editor.chain().focus().undo().run();
      break;
    case "redo":
      editor.chain().focus().redo().run();
      break;
    default:
      break;
  }
}

interface EditorToolbarComposableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: RichTextEditorProps["variant"];
}

function EditorToolbarComposable({
  variant,
  className,
  children,
  ...props
}: EditorToolbarComposableProps) {
  const context = useEditorContext();

  return (
    <div
      data-slot="rich-text-editor-toolbar"
      className={cn(
        toolbarVariants({ variant: variant ?? context.variant }),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function EditorToolbarGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-1", className)} {...props} />;
}

function EditorToolbarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      orientation="vertical"
      className={cn("mx-1 h-6", className)}
      {...props}
    />
  );
}

interface EditorActionButtonProps {
  action: EditorAction;
  className?: string;
  disabled?: boolean;
}

function EditorActionButton({
  action,
  className,
  disabled,
}: EditorActionButtonProps) {
  const { editor, disabled: editorDisabled, readOnly } = useEditorContext();
  const meta = editorActionMeta[action];
  const Icon = meta.icon;

  if (!editor) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon-sm"
        disabled
        className={className}
        aria-label={meta.label}
      >
        <Icon className="size-4" />
      </Button>
    );
  }

  if (action === "link") {
    return (
      <LinkPopover
        editor={editor}
        disabled={disabled || editorDisabled || readOnly}
      />
    );
  }

  const actionDisabled =
    disabled || editorDisabled || readOnly || !canRunAction(editor, action);

  const handleAction = () => {
    if (actionDisabled) {
      return;
    }

    runAction(editor, action);
  };

  if (toggleActions.has(action)) {
    return (
      <Toggle
        type="button"
        size="sm"
        variant="outline"
        aria-label={meta.label}
        pressed={isActionActive(editor, action)}
        disabled={actionDisabled}
        className={className}
        onPressedChange={() => handleAction()}
      >
        <Icon className="size-4" />
      </Toggle>
    );
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      aria-label={meta.label}
      disabled={actionDisabled}
      className={className}
      onClick={handleAction}
    >
      <Icon className="size-4" />
    </Button>
  );
}

export {
  EditorActionButton,
  EditorToolbarComposable,
  EditorToolbarGroup,
  EditorToolbarSeparator,
  type EditorActionButtonProps,
  type EditorToolbarComposableProps,
};
