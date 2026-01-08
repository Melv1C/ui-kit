"use client";

import { Suspense, lazy, type ComponentProps } from "react";
import { Skeleton } from "@/components/base/skeleton";

// Lazy-loaded internal components
const CodeEditorInternal = lazy(() =>
  import("./code-editor").then((m) => ({ default: m.CodeEditor })),
);

const CodeDiffEditorInternal = lazy(() =>
  import("./code-diff-editor").then((m) => ({ default: m.CodeDiffEditor })),
);

function EditorSkeleton() {
  return <Skeleton className="h-full min-h-50 w-full" />;
}

type CodeEditorProps = ComponentProps<typeof CodeEditorInternal>;
type CodeDiffEditorProps = ComponentProps<typeof CodeDiffEditorInternal>;

/**
 * Lazy-loaded Code Editor component.
 * Monaco Editor is only loaded when this component is rendered.
 *
 * @requires @monaco-editor/react and monaco-editor as peer dependencies
 */
function LazyCodeEditor(props: CodeEditorProps) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <CodeEditorInternal {...props} />
    </Suspense>
  );
}

/**
 * Lazy-loaded Code Diff Editor component.
 * Monaco Editor is only loaded when this component is rendered.
 *
 * @requires @monaco-editor/react and monaco-editor as peer dependencies
 */
function LazyCodeDiffEditor(props: CodeDiffEditorProps) {
  return (
    <Suspense fallback={<EditorSkeleton />}>
      <CodeDiffEditorInternal {...props} />
    </Suspense>
  );
}

export {
  LazyCodeEditor as CodeEditor,
  LazyCodeDiffEditor as CodeDiffEditor,
  type CodeEditorProps,
  type CodeDiffEditorProps,
};
