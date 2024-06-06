import projects from '../projects.json'

type Params = {
  id: string
}

export function GET(_: Request, { params } : { params: Params }) {
  const project = projects.find((project) => project.id === Number(params.id))

  return Response.json({
    project
  })
}