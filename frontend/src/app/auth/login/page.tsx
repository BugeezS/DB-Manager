"use client";
// The "client" pragma is used to indicate that this module should be bundled for the client.
import { useState } from "react";
import { useAuth } from "@/context/authContext";
// The useAuth hook is imported from the authContext module.
export default function LoginPage() {
  const { login } = useAuth() || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  // The email and password state variables are initialized with empty strings.
  const handleLogin = async () => {
    // The handleLogin function is defined to handle the login process.
    try {
      console.log(email, password);

      const response = await login?.(email, password);
      console.log(response, "response");

      if (response) {
        localStorage.setItem("token", response.access_token);
      }

      console.log("Login successful, token:", token);
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
