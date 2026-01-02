import type { Editor } from "@tiptap/react";
import type { VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import type { richTextEditorVariants, toolbarVariants } from "./variants";

export type EditorOutput = "html" | "json" | "text";

export interface LinkAttributes {
  href: string;
  target?: string;
  rel?: string;
}

/**
 * Configuration options to enable/disable toolbar features.
 * All options default to `true` if not specified.
 */
export interface ToolbarOptions {
  /** Enable heading buttons (H1, H2, H3) */
  headings?: boolean;
  /** Enable bold formatting */
  bold?: boolean;
  /** Enable italic formatting */
  italic?: boolean;
  /** Enable underline formatting */
  underline?: boolean;
  /** Enable strikethrough formatting */
  strikethrough?: boolean;
  /** Enable bullet list */
  bulletList?: boolean;
  /** Enable ordered list */
  orderedList?: boolean;
  /** Enable link insertion */
  link?: boolean;
}

export interface RichTextEditorProps
  extends
    VariantProps<typeof richTextEditorVariants>,
    Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  /** Allow multiline content (default: true). When false, Enter key is disabled. */
  multiline?: boolean;
  contentClassName?: string;
  toolbarClassName?: string;
  /** Configure which toolbar options are enabled. All enabled by default. */
  toolbarOptions?: ToolbarOptions;
}

export interface LinkPopoverProps {
  editor: Editor;
  disabled?: boolean;
}

export interface EditorToolbarProps {
  editor: Editor;
  variant?: VariantProps<typeof toolbarVariants>["variant"];
  disabled?: boolean;
  className?: string;
  options?: ToolbarOptions;
}
