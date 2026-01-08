import { cva } from "class-variance-authority";

export const richTextEditorVariants = cva(
  "relative overflow-hidden rounded-md border transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
  {
    variants: {
      variant: {
        default: "border-input bg-transparent",
        ghost: "border-transparent bg-transparent",
        card: "border-border bg-card shadow-sm",
      },
      size: {
        default: "min-h-[200px]",
        sm: "min-h-[120px]",
        lg: "min-h-[350px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export const toolbarVariants = cva(
  "flex flex-wrap items-center gap-1 border-b p-2",
  {
    variants: {
      variant: {
        default: "border-input bg-muted/30",
        ghost: "border-transparent bg-transparent",
        card: "border-border bg-muted/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const editorContentVariants = cva(
  "prose prose-sm dark:prose-invert max-w-none p-4 focus:outline-none",
  {
    variants: {
      size: {
        default: "min-h-[150px]",
        sm: "min-h-[80px]",
        lg: "min-h-[300px]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);
