import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { LoginRequestSchema } from "@/shared/validations/login";
import { z } from "zod";

type User = {
  username: string;
};

type AuthContextType = {
  user: User | null;
  login: (values: z.infer<typeof LoginRequestSchema>) => Promise<number>;
  logout: () => void;
  isPending: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: PropsWithChildren) {
  const [isPending, setIsPending] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsPending(true);
    const localStorageUser = localStorage.getItem("user");

    try {
      if (!localStorageUser) return;

      const parsedUser = JSON.parse(localStorageUser);

      if (parsedUser) {
        setUser(parsedUser);
      }
    } catch {
      // In a real case scenario, you would want to log this error to an error tracking service
      console.error("Error parsing user from local storage");
      localStorage.removeItem("user");
    } finally {
      setIsPending(false);
    }
  }, []);

  const login = useCallback(
    async (values: z.infer<typeof LoginRequestSchema>) => {
      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        setUser({ username: values.username });
        localStorage.setItem(
          "user",
          JSON.stringify({ username: values.username })
        );
      }

      return response.status;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isPending }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  return context;
}
