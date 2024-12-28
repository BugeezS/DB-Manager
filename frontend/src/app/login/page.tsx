"use client";
// The "client" pragma is used to indicate that this module should be bundled for the client.
import { useState } from "react";
import { useAuth } from "@/context/authContext";
// The useAuth hook is imported from the authContext module.
export default function LoginPage() {
  const { login } = useAuth() || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // The email and password state variables are initialized with empty strings.
  const handleLogin = async () => {
    // The handleLogin function is defined to handle the login process.
    try {
      await login?.(email, password);
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  // The login function is called with the email and password as arguments.
  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
