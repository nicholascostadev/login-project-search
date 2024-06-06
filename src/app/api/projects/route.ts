import projects from './projects.json'

export function GET() {
  return Response.json(
    {
      projects,
    },
  );
}
