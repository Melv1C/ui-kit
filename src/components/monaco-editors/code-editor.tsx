import { Editor, type Monaco } from "@monaco-editor/react";
import type { VariantProps } from "class-variance-authority";
import type { editor } from "monaco-editor";
import { type HTMLAttributes, useMemo } from "react";
import { Skeleton } from "@/components/base/skeleton";
import { cn } from "@/lib/utils";
import { defineQualifioThemes } from "./qualifio-themes";
import type { EditorTheme, SupportedLanguage } from "./types";
import { codeEditorVariants } from "./variants";

interface CodeEditorProps
  extends
    VariantProps<typeof codeEditorVariants>,
    Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  language: SupportedLanguage;
  theme?: EditorTheme;
  readOnly?: boolean;
  disabled?: boolean;
  lineNumbers?: boolean;
  wordWrap?: boolean;
  minimap?: boolean;
  onChange?: (value: string | undefined) => void;
  onMount?: (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => void;
  onValidate?: (markers: editor.IMarker[]) => void;
  options?: editor.IStandaloneEditorConstructionOptions;
}

function LoadingFallback() {
  return <Skeleton className="h-full w-full" />;
}

function CodeEditor({
  value,
  defaultValue,
  language,
  theme = "qualifio",
  readOnly = false,
  disabled = false,
  lineNumbers = true,
  wordWrap = false,
  minimap = false,
  className,
  variant,
  size,
  onChange,
  onMount,
  onValidate,
  options,
  ...props
}: CodeEditorProps) {
  const editorOptions = useMemo(
    () => ({
      readOnly: readOnly || disabled,
      lineNumbers: lineNumbers ? ("on" as const) : ("off" as const),
      wordWrap: wordWrap ? ("on" as const) : ("off" as const),
      minimap: { enabled: minimap },
      fontSize: 14,
      fontFamily: "'Menlo', 'Monaco', Consolas, monospace",
      scrollBeyondLastLine: false,
      automaticLayout: true,
      padding: { top: 12, bottom: 12 },
      bracketPairColorization: { enabled: true },
      ...options,
    }),
    [readOnly, disabled, lineNumbers, wordWrap, minimap, options],
  );

  return (
    <div
      data-slot="code-editor"
      className={cn(
        codeEditorVariants({ variant, size }),
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
      {...props}
    >
      <Editor
        language={language}
        theme={theme}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        beforeMount={(monaco) => {
          defineQualifioThemes(monaco).catch((error) => {
            console.error("Failed to define Qualifio themes:", error);
          });
        }}
        onMount={onMount}
        onValidate={onValidate}
        options={editorOptions}
        loading={<LoadingFallback />}
      />
    </div>
  );
}

export { CodeEditor, type CodeEditorProps };
export type { EditorTheme, SupportedLanguage } from "./types";
