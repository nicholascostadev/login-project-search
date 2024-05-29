import { LoginForm } from "@/components/templates/login-page";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex container min-h-screen flex-col items-center justify-center">
      <LoginForm />
    </main>
  );
}
