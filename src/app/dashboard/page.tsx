"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/auth-provider";
import { useProjects } from "@/hooks/queries/useProjects";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user, isPending: isPendingUser } = useAuth();
  const { projects, isPending } = useProjects();

  useEffect(() => {
    if (!isPendingUser && !user) {
      router.push("/");
    }
  }, [isPendingUser, router, user]);

  return (
    <main className="flex container min-h-screen flex-col items-center justify-start pb-10">
      <h1 className="text-center text-5xl font-medium py-32">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {isPendingUser || !user ? null : isPending ? (
          <LoadingProjects />
        ) : (
          projects?.map((project) => (
            <Card key={project.title} className="w-full max-w-sm">
              <CardHeader>
                <div className="w-full h-[150px] rounded-lg overflow-clip mb-2">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={300}
                    style={{ objectFit: "cover" }}
                  />
                </div>

                <CardTitle className="text-2xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4"></CardContent>

              <CardFooter>
                <Button asChild className="w-full" type="submit">
                  <Link href={`/projects/${project.id}`}>View Project</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}

function LoadingProjects() {
  return (
    <div className="col-span-full flex flex-col gap-2 justify-center items-center">
      <Loader2 className="size-16 animate-spin" />
      <p className="text-lg">Loading Projects...</p>
    </div>
  );
}
