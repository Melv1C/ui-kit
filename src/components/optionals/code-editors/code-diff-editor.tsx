import { Skeleton } from "@/components/base/skeleton";
import { cn } from "@/lib/utils";
import {
  DiffEditor,
  type DiffEditorProps,
  type Monaco,
} from "@monaco-editor/react";
import type { VariantProps } from "class-variance-authority";
import type { editor } from "monaco-editor";
import { type HTMLAttributes, useMemo } from "react";
import type { EditorTheme, SupportedLanguage } from "./types";
import { codeEditorVariants } from "./variants";

interface CodeDiffEditorProps
  extends
    VariantProps<typeof codeEditorVariants>,
    Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  original?: string;
  modified?: string;
  language: SupportedLanguage;
  theme?: EditorTheme;
  readOnly?: boolean;
  disabled?: boolean;
  onMount?: (editor: editor.IStandaloneDiffEditor, monaco: Monaco) => void;
  options?: editor.IDiffEditorConstructionOptions;
}

function LoadingFallback() {
  return <Skeleton className="h-full w-full" />;
}

function CodeDiffEditor({
  original,
  modified,
  language,
  theme = "qualifio",
  readOnly = false,
  disabled = false,
  className,
  variant,
  size,
  onMount,
  options,
  ...props
}: CodeDiffEditorProps) {
  const editorOptions = useMemo(
    () => ({
      readOnly: readOnly || disabled,
      fontSize: 14,
      fontFamily: "'Menlo', 'Monaco', Consolas, monospace",
      scrollBeyondLastLine: false,
      automaticLayout: true,
      padding: { top: 12, bottom: 12 },
      renderSideBySide: true,
      enableSplitViewResizing: true,
      ...options,
    }),
    [readOnly, disabled, options],
  );

  return (
    <div
      data-slot="code-diff-editor"
      className={cn(
        codeEditorVariants({ variant, size }),
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      <DiffEditor
        language={language}
        theme={theme}
        original={original}
        modified={modified}
        onMount={onMount}
        options={editorOptions}
        loading={<LoadingFallback />}
      />
    </div>
  );
}

export { CodeDiffEditor, type DiffEditorProps };
