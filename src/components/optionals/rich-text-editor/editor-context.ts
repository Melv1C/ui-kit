import type { Editor } from "@tiptap/react";
import * as React from "react";
import type { RichTextEditorProps } from "./types";

type EditorContextValue = {
  editor: Editor | null;
  disabled: boolean;
  readOnly: boolean;
  multiline: boolean;
  variant?: RichTextEditorProps["variant"];
  size?: RichTextEditorProps["size"];
  contentClassName?: string;
  setPlaceholder: (value: string) => void;
};

const EditorContext = React.createContext<EditorContextValue | undefined>(
  undefined,
);

function useEditorContext() {
  const context = React.useContext(EditorContext);

  if (!context) {
    throw new Error("Rich text editor primitives must be used within EditorRoot");
  }

  return context;
}

export { EditorContext, useEditorContext };
export type { EditorContextValue };
