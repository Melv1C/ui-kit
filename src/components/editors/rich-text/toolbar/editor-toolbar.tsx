import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline as UnderlineIcon,
} from "lucide-react";
import { Separator } from "@/components/base/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/base/toggle-group";
import { cn } from "@/lib/utils";
import type { EditorToolbarProps, ToolbarOptions } from "../types";
import { toolbarVariants } from "../variants";
import { LinkPopover } from "./link-popover";

const defaultOptions: Required<ToolbarOptions> = {
  headings: true,
  bold: true,
  italic: true,
  underline: true,
  strikethrough: true,
  bulletList: true,
  orderedList: true,
  link: true,
};

function EditorToolbar({
  editor,
  variant,
  disabled,
  className,
  options,
}: EditorToolbarProps) {
  const opts = { ...defaultOptions, ...options };

  const showHeadings = opts.headings;
  const showFormatting =
    opts.bold || opts.italic || opts.underline || opts.strikethrough;
  const showLists = opts.bulletList || opts.orderedList;
  const showLink = opts.link;

  // Determine which separators to show based on active groups
  const activeGroups = [showHeadings, showFormatting, showLists, showLink];
  const needsSeparatorAfter = (groupIndex: number): boolean => {
    // Show separator if there's at least one active group after this one
    return activeGroups.slice(groupIndex + 1).some(Boolean);
  };

  return (
    <div
      data-slot="rich-text-editor-toolbar"
      className={cn(toolbarVariants({ variant }), className)}
    >
      {/* Heading Group */}
      {showHeadings && (
        <>
          <ToggleGroup
            type="single"
            value={
              editor?.isActive("heading", { level: 1 })
                ? "h1"
                : editor?.isActive("heading", { level: 2 })
                  ? "h2"
                  : editor?.isActive("heading", { level: 3 })
                    ? "h3"
                    : ""
            }
            size="sm"
            variant="outline"
          >
            <ToggleGroupItem
              value="h1"
              aria-label="Heading 1"
              disabled={
                disabled ||
                !editor?.can().chain().focus().toggleHeading({ level: 1 }).run()
              }
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              <Heading1 className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h2"
              aria-label="Heading 2"
              disabled={
                disabled ||
                !editor?.can().chain().focus().toggleHeading({ level: 2 }).run()
              }
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              <Heading2 className="size-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h3"
              aria-label="Heading 3"
              disabled={
                disabled ||
                !editor?.can().chain().focus().toggleHeading({ level: 3 }).run()
              }
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              <Heading3 className="size-4" />
            </ToggleGroupItem>
          </ToggleGroup>
          {needsSeparatorAfter(0) && (
            <Separator orientation="vertical" className="mx-1 h-6" />
          )}
        </>
      )}

      {/* Text Formatting Group */}
      {showFormatting && (
        <>
          <ToggleGroup
            type="multiple"
            value={["bold", "italic", "underline", "strike"].filter((format) =>
              editor?.isActive(format),
            )}
            size="sm"
            variant="outline"
          >
            {opts.bold && (
              <ToggleGroupItem
                value="bold"
                aria-label="Bold"
                disabled={
                  disabled || !editor.can().chain().focus().toggleBold().run()
                }
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className="size-4" />
              </ToggleGroupItem>
            )}
            {opts.italic && (
              <ToggleGroupItem
                value="italic"
                aria-label="Italic"
                disabled={
                  disabled || !editor.can().chain().focus().toggleItalic().run()
                }
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className="size-4" />
              </ToggleGroupItem>
            )}
            {opts.underline && (
              <ToggleGroupItem
                value="underline"
                aria-label="Underline"
                disabled={
                  disabled ||
                  !editor.can().chain().focus().toggleUnderline().run()
                }
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon className="size-4" />
              </ToggleGroupItem>
            )}
            {opts.strikethrough && (
              <ToggleGroupItem
                value="strike"
                aria-label="Strikethrough"
                disabled={
                  disabled || !editor.can().chain().focus().toggleStrike().run()
                }
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough className="size-4" />
              </ToggleGroupItem>
            )}
          </ToggleGroup>
          {needsSeparatorAfter(1) && (
            <Separator orientation="vertical" className="mx-1 h-6" />
          )}
        </>
      )}

      {/* List Group */}
      {showLists && (
        <>
          <ToggleGroup
            type="single"
            value={
              editor.isActive("bulletList")
                ? "bulletList"
                : editor.isActive("orderedList")
                  ? "orderedList"
                  : ""
            }
            size="sm"
            variant="outline"
          >
            {opts.bulletList && (
              <ToggleGroupItem
                value="bulletList"
                aria-label="Bullet list"
                disabled={disabled}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="size-4" />
              </ToggleGroupItem>
            )}
            {opts.orderedList && (
              <ToggleGroupItem
                value="orderedList"
                aria-label="Ordered list"
                disabled={disabled}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="size-4" />
              </ToggleGroupItem>
            )}
          </ToggleGroup>
          {needsSeparatorAfter(2) && (
            <Separator orientation="vertical" className="mx-1 h-6" />
          )}
        </>
      )}

      {/* Link */}
      {showLink && <LinkPopover editor={editor} disabled={disabled} />}
    </div>
  );
}

export { EditorToolbar };
