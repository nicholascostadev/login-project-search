"use client";

import { Project } from "@/models/project";
import { useEffect, useState } from "react";

export function useProjects() {
  const [isPending, setIsPending] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    setIsPending(true)
    fetch("/api/projects", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setProjects(data.projects)).finally(() => setIsPending(false));
  }, []);

  return { projects, isPending };
}
