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
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChapterPreview } from "@/components/chapter-preview";
import { cn } from "@/lib/utils";
import { flushSync } from "react-dom";
import { useProjectById } from "@/hooks/queries/useProjectById";

type Params = {
  id: string;
};

export default function ProjectPage({ params }: { params: Params }) {
  const router = useRouter();
  const { user, isPending } = useAuth();
  const inputRef = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");
  const [internalSearch, setInternalSearch] = useState("");
  const [isFuzzySearchDialogOpen, setIsFuzzySearchDialogOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);
  const { project, isPending: isFetchingProject } = useProjectById(
    Number(params.id)
  );

  useEffect(() => {
    if (!isPending && !user) {
      router.push("/");
    }
  }, [isPending, router, user]);

  const filteredChaptersBySearch = chapters.filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(internalSearch.toLowerCase()) ||
      chapter.content.toLowerCase().includes(internalSearch.toLowerCase())
  );

  return (
    <main className="flex container min-h-screen flex-col items-start justify-start py-10 gap-16">
      {isPending || isFetchingProject ? (
        <LoadingProject />
      ) : user ? (
        <>
          <div className="gap-2 flex flex-col">
            <h1 className="text-4xl font-bold pb-8">{project?.title}</h1>

            <strong>Select a Chapter</strong>

            <div className="flex items-center justify-start gap-1">
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

              <Dialog
                open={isFuzzySearchDialogOpen}
                onOpenChange={(open) => {
                  setIsFuzzySearchDialogOpen(open);
                  // waiting for dialog to close before clearing search
                  // avoiding a layout shift
                  if (open) {
                    setInternalSearch("");
                  } else if (!open) {
                    setTimeout(() => {
                      setInternalSearch("");
                    }, 150);
                  }
                }}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Search className="size-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col gap-6 max-h-[80%] p-0">
                  <div className="flex flex-col gap-2 p-6">
                    <strong>Search through all chapters</strong>
                    <Input
                      ref={inputRef}
                      value={internalSearch}
                      onChange={(e) => setInternalSearch(e.target.value)}
                      type="text"
                      placeholder="Fuzzy search chapters"
                    />
                    <span className="text-sm text-gray-600">
                      {filteredChaptersBySearch.length === 0
                        ? `No chapters found with given query`
                        : `Found ${filteredChaptersBySearch.length} chapters`}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "max-h-[40%] overflow-auto border-t border-gray-300 py-4 flex flex-col gap-4 px-6",
                      filteredChaptersBySearch.length === 0 && "border-t-0"
                    )}
                  >
                    {filteredChaptersBySearch.map((chapter) => (
                      <ChapterPreview
                        key={chapter.id}
                        id={chapter.id}
                        title={chapter.title}
                        description={chapter.content}
                        search={internalSearch}
                        onClick={() => {
                          flushSync(() => {
                            setSearch(internalSearch);
                          });

                          setSelectedChapter(chapter);
                          setIsFuzzySearchDialogOpen(false);
                        }}
                      />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{selectedChapter.title}</h1>

            <RichTextEditor
              initialSearch={search}
              prefilledChapter={selectedChapter}
            />
          </div>
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
