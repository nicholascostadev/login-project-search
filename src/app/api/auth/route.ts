import { LoginRequestSchema } from "@/shared/validations/login";
import { z } from "zod";

export async function POST(req: Request) {
  const { username, password } = LoginRequestSchema.parse(await req.json());

  if (username === "admin" && password === "password123") {
    return Response.json({}, { status: 200 });
  }

  return Response.json(
    {
      message: "Invalid username or password",
    },
    {
      status: 401,
    }
  );
}
