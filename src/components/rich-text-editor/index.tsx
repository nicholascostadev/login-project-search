"use client";

import "./styles.scss";

import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
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
  Strikethrough,
  Type,
  Undo,
} from "lucide-react";

function MenuBar({ content }: { content: string }) {
  const { editor } = useCurrentEditor();

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

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

  function getCurrentSelectedHeadingOption() {
    const selectedOption = headingOptions.find((option) => option.isActive);
    return selectedOption ? selectedOption.label : "Select a heading";
  }

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

      <Button
        variant="outline"
        onClick={() => editor.commands.toggleBold()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className="data-[is-active=true]:bg-zinc-100"
        data-is-active={editor.isActive("bold")}
      >
        <Bold className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className="data-[is-active=true]:bg-zinc-100"
        data-is-active={editor.isActive("italic")}
      >
        <Italic className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className="data-[is-active=true]:bg-zinc-100"
        data-is-active={editor.isActive("strike")}
      >
        <Strikethrough className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className="data-[is-active=true]:bg-zinc-100"
        data-is-active={editor.isActive("code")}
      >
        <Code className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="data-[is-active=true]:bg-zinc-100"
        data-is-active={editor.isActive("bulletList")}
      >
        <List className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="data-[is-active=true]:bg-zinc-100"
        data-is-active={editor.isActive("orderedList")}
      >
        <ListOrdered className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="data-[is-active=true]:bg-zinc-100"
        data-is-active={editor.isActive("codeBlock")}
      >
        <CodeXml className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="data-[is-active=true]:bg-zinc-100"
        data-is-active={editor.isActive("blockquote")}
      >
        <Quote className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="size-4" />
      </Button>
      <Button
        variant="outline"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="size-4" />
      </Button>
    </div>
  );
}

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

export function RichTextEditor({ content }: { content: string }) {
  return (
    <div className="w-full">
      <EditorProvider
        slotBefore={<MenuBar content={content} />}
        extensions={extensions}
        content={content}
      />
    </div>
  );
}
