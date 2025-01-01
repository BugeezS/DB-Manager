"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AddDatabaseModal } from "@/components/AddDatabaseModal";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    fetchDatabaseList();
  }, []);

  const [Database, setDatabase] = useState<string[] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const fetchDatabaseList = async () => {
    try {
      const response = await fetch("/api/database/list");
      const { databases } = await response.json();
      setDatabase(databases);
      console.log("Database list:", databases);
    } catch (error) {
      console.error("Failed to fetch database list:", error);
    }
  };

  const addDataBase = async (
    name: string,
    host: string,
    port: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await fetch("/api/database/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, host, port, username, password }),
      });

      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Error response from backend:", errorResponse);
        throw new Error(
          `Backend responded with ${response.status}: ${errorResponse}`
        );
      }

      const data = await response.json();
      fetchDatabaseList();
      setIsOpen(false);
      console.log("Database added successfully", data);
    } catch (error) {
      console.error("Failed to add database:", error);
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded"
            onClick={() => router.push("/profile")}
          >
            Profile
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 transition text-white font-semibold py-2 px-4 rounded"
            onClick={() => router.push("/settings")}
          >
            Settings
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 transition text-white font-semibold py-2 px-4 rounded"
            onClick={() => setIsOpen(true)}
          >
            Add Database
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section */}
        <section className="bg-white p-6 shadow-sm rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-2">Welcome</h2>
          <p>
            Monitor and manage your application seamlessly from your dashboard.
          </p>
        </section>

        {/* Database List */}
        <div>
          {Database ? (
            Database.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Database.map((dbName, index) => (
                  <div
                    key={index}
                    className="bg-white p-5 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-bold text-gray-800">
                      {dbName}
                    </h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No databases available.</p>
            )
          ) : (
            <p className="text-gray-500">Loading databases...</p>
          )}
        </div>
      </main>

      {/* Modal */}
      <AddDatabaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDatabaseAdded={(name, host, port, username, password) =>
          addDataBase(name, host, port, username, password)
        }
      />
    </div>
  );
}
