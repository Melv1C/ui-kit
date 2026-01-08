import { Check, Link as LinkIcon, Unlink, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/base/button";
import { Input } from "@/components/base/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/base/popover";
import { Toggle } from "@/components/base/toggle";
import type { LinkPopoverProps } from "../types";

function LinkPopover({ editor, disabled }: LinkPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpen = useCallback(
    (open: boolean) => {
      if (open) {
        const previousUrl = editor.getAttributes("link").href || "";
        setUrl(previousUrl);
      }
      setIsOpen(open);
    },
    [editor],
  );

  const handleSetLink = useCallback(() => {
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url, target: "_blank" })
        .run();
    }
    setIsOpen(false);
    setUrl("");
  }, [editor, url]);

  const handleUnsetLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
    setIsOpen(false);
    setUrl("");
  }, [editor]);

  const isActive = editor.isActive("link");

  return (
    <Popover open={isOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Toggle
          size="sm"
          pressed={isActive}
          disabled={disabled}
          aria-label={isActive ? "Edit link" : "Add link"}
          variant="outline"
        >
          <LinkIcon className="size-4" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="start">
        <div className="flex flex-col gap-3">
          <div className="text-sm font-medium">
            {isActive ? "Edit Link" : "Insert Link"}
          </div>
          <Input
            ref={inputRef}
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSetLink();
              }
              if (e.key === "Escape") {
                setIsOpen(false);
              }
            }}
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Button type="button" size="sm" onClick={handleSetLink}>
                <Check className="size-3.5" />
                {isActive ? "Update" : "Insert"}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsOpen(false);
                  setUrl("");
                }}
              >
                <X className="size-3.5" />
                Cancel
              </Button>
            </div>
            {isActive && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleUnsetLink}
                className="text-destructive hover:text-destructive"
              >
                <Unlink className="size-3.5" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export { LinkPopover };
