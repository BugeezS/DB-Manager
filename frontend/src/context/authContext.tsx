import React, { createContext, useContext, useState } from "react";
import { User, AuthContextType, AuthProviderProps } from "../types/auth";
// The createContext, useContext, and useState hooks are imported from the react package.
const AuthContext = createContext<AuthContextType | null>(null);
// The AuthContext is created using the createContext function and initialized with a value of null.
export const useAuth = () => {
  return useContext(AuthContext);
};
// The useAuth hook is defined to access the AuthContext.
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  // The user state variable is initialized with a value of null.
  const login = async (email: string, password: string) => {
    // The login function is defined to handle the login process.
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    // The email and password are sent in the request body as a JSON string.
    if (response.ok) {
      const data = await response.json();
      setUser(data.user);
    } else {
      throw new Error("Invalid login");
    }
  };
  // The user object is stored in the user state variable.
  const logout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    setUser(null);
  };
  // The logout function is defined to handle the logout process.
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
