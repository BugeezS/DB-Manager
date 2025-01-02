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
      {/* Main Content */}
      <main className="p-6">
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
