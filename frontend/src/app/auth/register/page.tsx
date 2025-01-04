"use client";
import { useAuth } from "@/context/authContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth() || {};
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      console.log(register, "register");

      //Sanitize Data
      if (!email || !password) {
        throw new Error("Invalid email or password");
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

      if (!emailRegex.test(email)) {
        throw new Error("Invalid email format");
      }

      if (!passwordRegex.test(password)) {
        throw new Error(
          "Password must be at least 8 characters long and contain both letters and numbers"
        );
      }

      if (!register) {
        throw new Error("Register function not available");
      }

      await register(email, password);

      // Added log to confirm if redirection is happening correctly
      console.log("Registration successful, redirecting...");
      router.push("/auth/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error instanceof Error ? error.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    // Added form tag to handle form submission
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 p-4 font-bold"
      >
        <h1 className="text-blue-600 text-4xl text-center">REGISTER</h1>
        {error && <div className="text-red-500">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          className="p-2 border rounded text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          className="p-2 border rounded text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
