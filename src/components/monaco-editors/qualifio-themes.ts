import type { Monaco } from "@monaco-editor/react";

/**
 * Defines the Qualifio theme for Monaco Editor
 * This function should be called once when Monaco is loaded
 */
export async function defineQualifioThemes(monaco: Monaco) {
  monaco.editor.defineTheme("qualifio", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.foreground": "#666666",
      "editor.background": "#f8fafb",
      "editor.lineHighlightBackground": "#f8fafb",
      "editorCursor.foreground": "#666666",
      "editorLineNumber.foreground": "#D8D8D8",
      "editorLineNumber.activeForeground": "#D8D8D8",
      "editor.selectionBackground": "#dff5fb",
      "editor.selectionHighlightBackground": "#dff5fb",
      "editor.wordHighlightBackground": "#dff5fb",
      "editor.wordHighlightStrongBackground": "#dff5fb",
      "editor.findMatchBackground": "#FFF7E2",
      "editor.findMatchHighlightBackground": "#FFF7E2",
      "editorBracketMatch.background": "#f2f2f2",
      "editorBracketMatch.border": "#D8D8D8",
      "editorIndentGuide.background": "#D8D8D8",
      "editorIndentGuide.activeBackground": "#666666",
      "editorWidget.background": "#FFFFFF",
      "editorWidget.border": "#D8D8D8",
      "editorSuggestWidget.background": "#FFFFFF",
      "editorSuggestWidget.border": "#D8D8D8",
      "editorSuggestWidget.selectedBackground": "#dff5fb",
      "editorHoverWidget.background": "#FFFFFF",
      "editorHoverWidget.border": "#D8D8D8",
    },
  });
}
