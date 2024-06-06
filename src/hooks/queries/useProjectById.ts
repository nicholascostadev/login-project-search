"use client";

import { Project } from "@/models/project";
import { useEffect, useState } from "react";

export function useProjectById(projectId: number) {
  const [isPending, setIsPending] = useState(true);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    setIsPending(true)
    fetch(`/api/projects/${projectId}`, {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data) => setProject(data.project)).finally(() => setIsPending(false));
  }, [projectId]);

  return { project, isPending };
}
