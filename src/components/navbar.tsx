"use client";

import { useAuth } from "@/context/auth-provider";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();
  const { user, logout, isPending } = useAuth();

  function onLogout() {
    logout();
    router.push("/");
  }

  return (
    <nav className="border-b dark:border-b-zinc-800">
      <div className="container flex items-center justify-between h-20">
        <div className="flex items-center">
          <Link href={user ? "/dashboard" : "/"} className="text-2xl">
            App
          </Link>
        </div>
        <div className="flex items-center gap-4 sm:gap-8">
          {!isPending ? (
            user ? (
              <>
                <Link href="/dashboard" className="text-lg">
                  Dashboard
                </Link>

                <Button onClick={onLogout}>Log Out</Button>
              </>
            ) : (
              <Link href="/" className="text-lg">
                Login
              </Link>
            )
          ) : null}
        </div>
      </div>
    </nav>
  );
}
