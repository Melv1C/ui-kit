import { BubbleMenu as TiptapBubbleMenu } from "@tiptap/react/menus";
import type * as React from "react";
import { Separator } from "@/components/base/separator";
import { cn } from "@/lib/utils";
import { useEditorContext } from "./editor-context";

function EditorBubbleMenu({
  className,
  children,
  options,
  ...props
}: Omit<React.ComponentProps<typeof TiptapBubbleMenu>, "editor">) {
  const { editor, readOnly, disabled } = useEditorContext();

  if (!editor || readOnly || disabled) {
    return null;
  }

  return (
    <TiptapBubbleMenu
      editor={editor}
      options={options}
      className={cn(
        "flex items-center gap-1 rounded-md border bg-background p-1 shadow-md",
        className,
      )}
      {...props}
    >
      {children}
    </TiptapBubbleMenu>
  );
}

function EditorBubbleMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      orientation="vertical"
      className={cn("mx-1 h-5", className)}
      {...props}
    />
  );
}

export { EditorBubbleMenu, EditorBubbleMenuSeparator };
