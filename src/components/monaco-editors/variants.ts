import { cva } from "class-variance-authority";

export const codeEditorVariants = cva(
  "relative overflow-hidden rounded-md border transition-[color,box-shadow] outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
  {
    variants: {
      variant: {
        default: "border-input bg-transparent dark:bg-input/30",
        ghost: "border-transparent bg-transparent",
        card: "border-border bg-card shadow-sm",
      },
      size: {
        default: "h-[300px]",
        sm: "h-[150px]",
        lg: "h-[500px]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);
