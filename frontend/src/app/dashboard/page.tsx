"use client";
import { useEffect, useState, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const [Database, setDatabase] = useState(null);

  const fetchDatabaseList = async () => {
    try {
      const response = await fetch("/api/database/list");
      const data = await response.json();
      setDatabase(data);
    } catch (error) {
      console.error("Failed to fetch database list:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="bg-blue-600 text-white p-4 shadow flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden md:block"
            onClick={() => router.push("/profile")}
          >
            Profile
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hidden md:block"
            onClick={() => router.push("/settings")}
          >
            Settings
          </button>
        </div>
      </header>
      <main className="p-4">
        <section className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Welcome</h2>
          <p>
            This is your dashboard. Use it to monitor and manage your
            application.
          </p>
        </section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold mb-2">Widget 1</h3>
            <p>Some content goes here.</p>
          </div>
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold mb-2">Widget 2</h3>
            <p>Another piece of content.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
