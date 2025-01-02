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

      await response.json();
      fetchDatabaseList();
      setIsOpen(false);
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
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Database List */}
        <section className="col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Databases</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              Add Database
            </button>
          </div>

          {Database ? (
            Database.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Database.map((dbName, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition border border-gray-200"
                  >
                    <h3 className="text-lg font-bold">{dbName}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No databases available.</p>
            )
          ) : (
            <p className="text-gray-500">Loading databases...</p>
          )}
        </section>

        {/* Placeholder for Member List */}
        <section className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <h2 className="text-xl font-bold mb-4">Member List</h2>
          <p className="text-gray-600">This feature is under development.</p>
        </section>
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
