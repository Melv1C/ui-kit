import * as React from "react";
import { EditorContent } from "./editor-content";
import { EditorRoot } from "./editor-root";
import {
  EditorActionButton,
  EditorToolbarComposable,
  EditorToolbarGroup,
  EditorToolbarSeparator,
} from "./editor-toolbar-composable";
import type { RichTextEditorProps, ToolbarOptions } from "./types";

const defaultToolbarOptions: Required<ToolbarOptions> = {
  headings: true,
  bold: true,
  italic: true,
  underline: true,
  strikethrough: true,
  bulletList: true,
  orderedList: true,
  link: true,
};

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
  const options = { ...defaultToolbarOptions, ...toolbarOptions };
  const toolbarGroups: Array<{ key: string; content: React.ReactNode }> = [];

  if (options.headings) {
    toolbarGroups.push({
      key: "headings",
      content: (
        <EditorToolbarGroup>
          <EditorActionButton action="h1" />
          <EditorActionButton action="h2" />
          <EditorActionButton action="h3" />
        </EditorToolbarGroup>
      ),
    });
  }

  if (
    options.bold ||
    options.italic ||
    options.underline ||
    options.strikethrough
  ) {
    toolbarGroups.push({
      key: "formatting",
      content: (
        <EditorToolbarGroup>
          {options.bold && <EditorActionButton action="bold" />}
          {options.italic && <EditorActionButton action="italic" />}
          {options.underline && <EditorActionButton action="underline" />}
          {options.strikethrough && <EditorActionButton action="strike" />}
        </EditorToolbarGroup>
      ),
    });
  }

  if (options.bulletList || options.orderedList) {
    toolbarGroups.push({
      key: "lists",
      content: (
        <EditorToolbarGroup>
          {options.bulletList && <EditorActionButton action="bulletList" />}
          {options.orderedList && <EditorActionButton action="orderedList" />}
        </EditorToolbarGroup>
      ),
    });
  }

  if (options.link) {
    toolbarGroups.push({
      key: "link",
      content: (
        <EditorToolbarGroup>
          <EditorActionButton action="link" />
        </EditorToolbarGroup>
      ),
    });
  }

  return (
    <EditorRoot
      content={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      multiline={multiline}
      variant={variant}
      size={size}
      className={className}
      contentClassName={contentClassName}
      {...props}
    >
      {!readOnly && (
        <EditorToolbarComposable className={toolbarClassName}>
          {toolbarGroups.map((group, index) => (
            <React.Fragment key={group.key}>
              {group.content}
              {index < toolbarGroups.length - 1 && <EditorToolbarSeparator />}
            </React.Fragment>
          ))}
        </EditorToolbarComposable>
      )}
      <EditorContent />
    </EditorRoot>
  );
}

export { RichTextEditor };
export type { RichTextEditorProps } from "./types";

export * from "./editor-bubble-menu";
export * from "./editor-content";
export * from "./editor-root";
export * from "./editor-toolbar-composable";
