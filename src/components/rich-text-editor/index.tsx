"use client";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import React, { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button, buttonVariants } from "../ui/button";
import {
  Bold,
  Code,
  CodeXml,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Search as SearchIcon,
  Strikethrough,
  Type,
  Undo,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useAddDocumentKeydown } from "@/hooks/useAddDocumentKeydown";
import { Chapter } from "@/models/chapter";

type MenuBarProps = {
  initialSearch: string;
  prefilledChapter: Chapter;
};

function MenuBar({ initialSearch, prefilledChapter }: MenuBarProps) {
  const [search, setSearch] = useState(initialSearch);
  const { editor } = useCurrentEditor();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const pressedEscTimes = useRef(0);

  useAddDocumentKeydown({
    condition: (event) => (event.ctrlKey || event.metaKey) && event.key === "f",
    callback: (event) => {
      event.preventDefault();
      setIsSearchOpen(true);
    },
  });

  useAddDocumentKeydown({
    condition: () => true,
    callback: (e) => {
      if (e.key === "Escape" && e.target == document.querySelector("body")) {
        pressedEscTimes.current += 1;
        if (pressedEscTimes.current >= 2) {
          clearHighlight();
          setSearch("");
          pressedEscTimes.current = 0;
        }
        return;
      }

      pressedEscTimes.current = 0;
    },
  });

  useEffect(() => {
    if (editor) {
      // update editor content whenever the base content changes
      editor
        .chain()
        .setContent(prefilledChapter.content)
        .setMeta("addToHistory", false)
        .run();
      highlightSearch(initialSearch);
      setSearch(initialSearch);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefilledChapter, initialSearch]);

  if (!editor) {
    return null;
  }

  const headingOptions = [
    {
      label: "Heading 1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
      icon: <Heading1 className="size-4" />,
    },
    {
      label: "Heading 2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
      icon: <Heading2 className="size-4" />,
    },
    {
      label: "Heading 3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
      icon: <Heading3 className="size-4" />,
    },
    {
      label: "Heading 4",
      onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
      isActive: editor.isActive("heading", { level: 4 }),
      icon: <Heading4 className="size-4" />,
    },
    {
      label: "Heading 5",
      onClick: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
      isActive: editor.isActive("heading", { level: 5 }),
      icon: <Heading5 className="size-4" />,
    },
    {
      label: "Heading 6",
      onClick: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
      isActive: editor.isActive("heading", { level: 6 }),
      icon: <Heading6 className="size-4" />,
    },
    {
      label: "Paragraph",
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
      icon: <Type className="size-4" />,
    },
  ];

  const otherTextManipulationOptions = [
    {
      label: "Bold",
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      disabled: !editor.can().toggleBold(),
      icon: <Bold className="size-4" />,
    },
    {
      label: "Italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      disabled: !editor.can().toggleItalic(),
      icon: <Italic className="size-4" />,
    },
    {
      label: "Strikethrough",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      disabled: !editor.can().toggleStrike(),
      icon: <Strikethrough className="size-4" />,
    },
    {
      label: "Bullet List",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      disabled: !editor.can().toggleBulletList(),
      icon: <List className="size-4" />,
    },
    {
      label: "Ordered List",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      disabled: !editor.can().toggleOrderedList(),
      icon: <ListOrdered className="size-4" />,
    },
    {
      label: "Code",
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      disabled: !editor.can().toggleCode(),
      icon: <Code className="size-4" />,
    },
    {
      label: "Code Block",
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: editor.isActive("codeBlock"),
      disabled: !editor.can().toggleCodeBlock(),
      icon: <CodeXml className="size-4" />,
    },
    {
      label: "Blockquote",
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
      disabled: !editor.can().toggleBlockquote(),
      icon: <Quote className="size-4" />,
    },
    {
      label: "Undo",
      onClick: () => editor.chain().focus().undo().run(),
      isActive: false,
      disabled: !editor.can().undo(),
      icon: <Undo className="size-4" />,
    },
    {
      label: "Redo",
      onClick: () => editor.chain().focus().redo().run(),
      isActive: false,
      disabled: !editor.can().redo(),
      icon: <Redo className="size-4" />,
    },
  ];

  function CurrentSelectedHeading() {
    const selectedOption = headingOptions.find((option) => option.isActive);

    return (
      <div className="flex items-center gap-2">
        {selectedOption ? (
          <>
            {selectedOption.icon}
            <span>{selectedOption.label}</span>
          </>
        ) : (
          "Select a heading"
        )}
      </div>
    );
  }

  function highlightSearch(search: string) {
    if (!editor) return;

    const text = editor.getText();
    const positions: { from: number; to: number }[] = [];
    // find texts in the editor that match the search
    // and save their positions
    for (let i = 0; i < text.length; i++) {
      if (
        text.substring(i, i + search.length).toLowerCase() ===
        search.toLowerCase()
      ) {
        positions.push({ from: i + 1, to: i + search.length + 1 });
      }
    }

    // highlight all positions found
    for (const position of positions) {
      editor
        .chain()
        .setTextSelection(position)
        .setHighlight()
        .setMeta("addToHistory", false)
        .run();
    }
  }

  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = e.target.value;

    setSearch(searchValue);
    // remove all previous highlights
    clearHighlight();

    highlightSearch(searchValue);
  }

  function clearHighlight() {
    if (!editor) return;

    editor
      .chain()
      .selectAll()
      .unsetHighlight()
      .setMeta("addToHistory", false)
      .run();
  }

  return (
    <div className="flex gap-2 whitespace-nowrap w-full pb-4 flex-wrap">
      <DropdownMenu>
        <DropdownMenuTrigger className={buttonVariants({ variant: "outline" })}>
          <CurrentSelectedHeading />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {headingOptions.map((option) => (
            <DropdownMenuItem
              key={option.label}
              onClick={option.onClick}
              className="data-[is-active=true]:bg-zinc-100 gap-2"
              data-is-active={option.isActive}
            >
              {option.icon}
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {otherTextManipulationOptions.map((option) => (
        <Button
          key={option.label}
          variant="outline"
          onClick={option.onClick}
          className="data-[is-active=true]:bg-zinc-100"
          data-is-active={option.isActive}
          disabled={option.disabled}
        >
          {option.icon}
        </Button>
      ))}

      <div className="flex gap-2 items-center justify-start">
        <Popover
          open={isSearchOpen}
          onOpenChange={(open) => {
            if (open) {
              // focus and select the input
              searchInputRef.current?.focus();
              searchInputRef.current?.select();
            }

            setIsSearchOpen(open);
          }}
        >
          <PopoverTrigger asChild>
            <Button variant="outline">
              <SearchIcon className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="start" className="w-80">
            <div className="flex flex-col gap-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                ref={searchInputRef}
                value={search}
                onChange={onSearchChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === "Escape") {
                    setIsSearchOpen(false);
                    clearHighlight();
                    highlightSearch(search);
                  }
                }}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
    history: {
      newGroupDelay: 2000,
    },
  }),
  Highlight.configure(),
];

type RichTextEditorProps = {
  initialSearch: string;
  prefilledChapter: Chapter;
};

export function RichTextEditor({
  initialSearch,
  prefilledChapter,
}: RichTextEditorProps) {
  "tiptap";
  return (
    <div className="w-full">
      <EditorProvider
        slotBefore={
          <MenuBar
            initialSearch={initialSearch}
            prefilledChapter={prefilledChapter}
          />
        }
        extensions={extensions}
      />
    </div>
  );
}
