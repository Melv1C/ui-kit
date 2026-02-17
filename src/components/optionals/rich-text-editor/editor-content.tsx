import { EditorContent as TiptapEditorContent } from "@tiptap/react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useEditorContext } from "./editor-context";

interface EditorContentProps
  extends Omit<React.ComponentProps<typeof TiptapEditorContent>, "editor"> {
  placeholder?: string;
}

function EditorContent({ className, placeholder, ...props }: EditorContentProps) {
  const { editor, disabled, contentClassName, setPlaceholder } = useEditorContext();

  React.useEffect(() => {
    if (placeholder === undefined) {
      return;
    }

    setPlaceholder(placeholder);
  }, [placeholder, setPlaceholder]);

  return (
    <TiptapEditorContent
      editor={editor}
      className={cn(
        "w-full",
        disabled && "pointer-events-none",
        contentClassName,
        className,
      )}
      {...props}
    />
  );
}

export { EditorContent, type EditorContentProps };
