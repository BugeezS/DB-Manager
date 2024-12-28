"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { User, AuthContextType, AuthProviderProps } from "../types/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
      return data;
    } else {
      throw new Error("Invalid login");
    }
  };

  const register = async (username: string, password: string) => {
    try {
      if (!username || !password) {
        throw new Error("Email and password are required");
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setUser(data.user);
      router.push("/login");
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
