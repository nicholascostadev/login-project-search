"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { LoginRequestSchema } from "@/shared/validations/login";
import { useAuth } from "@/context/auth-provider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isPending, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && user) {
      router.push("/dashboard");
    }
  }, [user, isPending, router]);

  const form = useForm<z.infer<typeof LoginRequestSchema>>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof LoginRequestSchema>) {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const loginStatus = await login(values);

      if (loginStatus !== 200) {
        form.setError("username", {
          message: "Invalid username or password",
        });
        form.setError("password", {
          message: "Invalid username or password",
        });

        return;
      }

      router.push("/dashboard");
    } catch {
      // In a real case scenario, you would want to log this error to an error tracking service
      console.error("Error logging in");

      form.setError("username", {
        message: "An error occurred",
      });

      form.setError("password", {
        message: "An error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : null}
              Sign in
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
