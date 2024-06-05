"use client";

import { RichTextEditor } from "@/components/rich-text-editor";
import chapters from "@/chapters.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function ProjectPage() {
  const router = useRouter();
  const { user, isPending } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);

  const [content, setContent] = useState("");

  useEffect(() => {
    setContent(selectedChapter.content);
  }, [selectedChapter.content]);

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/");
    }
  }, [isPending, router, user]);

  return (
    <main className="flex container min-h-screen flex-col items-start justify-start py-10 gap-4">
      {isPending ? (
        <LoadingProject />
      ) : user ? (
        <>
          <div className="gap-2 flex flex-col">
            <strong>Select a Chapter</strong>

            <Select
              value={String(selectedChapter.id)}
              onValueChange={(id) => {
                const chapter = chapters.find(
                  (chapter) => chapter.id === Number(id)
                );

                if (!chapter) return;

                setSelectedChapter(chapter);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {chapters.map((chapter) => (
                  <SelectItem key={chapter.id} value={String(chapter.id)}>
                    {chapter.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <h1 className="text-4xl font-bold">{selectedChapter.title}</h1>

          <RichTextEditor content={content} />
        </>
      ) : null}
    </main>
  );
}

function LoadingProject() {
  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center">
      <Loader2 className="size-16 animate-spin" />
      <p className="text-lg">Loading Project...</p>
    </div>
  );
}
