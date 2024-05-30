import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Project } from "@/models/project";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { projects } = (await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  }).then((res) => res.json())) as {
    projects: Project[];
  };

  return (
    <main className="flex container min-h-screen flex-col items-center justify-center">
      <h1 className="text-center text-5xl font-medium py-32">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {projects?.map((project) => (
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
        ))}
      </div>
    </main>
  );
}
