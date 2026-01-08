"use client";

import { Suspense, lazy, type ComponentProps } from "react";
import { Skeleton } from "@/components/base/skeleton";

// Lazy-loaded internal component
const RichTextEditorInternal = lazy(() =>
  import("./rich-text-editor").then((m) => ({ default: m.RichTextEditor })),
);

function EditorSkeleton() {
  return <Skeleton className="h-full min-h-[100px] w-full" />;
}

type RichTextEditorProps = ComponentProps<typeof RichTextEditorInternal>;

/**
 * Lazy-loaded Rich Text Editor component.
 * Tiptap is only loaded when this component is rendered.
 *
 * @requires @tiptap/react, @tiptap/starter-kit, and related tiptap extensions as peer dependencies
 */
function LazyRichTextEditor(props: RichTextEditorProps) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <RichTextEditorInternal {...props} />
    </Suspense>
  );
}

export { LazyRichTextEditor as RichTextEditor, type RichTextEditorProps };
