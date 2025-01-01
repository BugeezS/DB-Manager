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
      const { databases } = await response.json(); // Extract databases from the response
      setDatabase(databases); // Set the array directly
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
        body: JSON.stringify({
          name,
          host,
          port,
          username,
          password,
        }),
      });

      if (!response.ok) {
        // Log detailed error info from backend
        const errorResponse = await response.text();
        console.error("Error response from backend:", errorResponse);

        // Throwing an error so that the frontend can still handle it
        throw new Error(
          `Backend responded with ${response.status}: ${errorResponse}`
        );
      }

      const data = await response.json();
      fetchDatabaseList(); // Refresh the database list
      setIsOpen(false);
      console.log("Database added successfully", data); // Log success
    } catch (error) {
      console.error("Failed to add database:", error);
      // Show detailed error message to help debugging
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="bg-blue-600 text-white p-4 shadow flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/profile")}
          >
            Profile
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push("/settings")}
          >
            Settings
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>Add Database</button>
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
        <div>
          {Database ? (
            Database.length > 0 ? (
              <ul>
                {Database.map((dbName, index) => (
                  <li key={index}>{dbName}</li>
                ))}
              </ul>
            ) : (
              <p>No databases available.</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
      <AddDatabaseModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onDatabaseAdded={(
          dbName: string,
          host: string,
          port: string,
          username: string,
          password: string
        ) => addDataBase(dbName, host, port, username, password)}
      />
    </div>
  );
}
