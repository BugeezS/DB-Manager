"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    fetchDatabaseList();
  }, []);

  const [Database, setDatabase] = useState<string[] | null>(null);
  const [isOpen, setIsOpen] = useState(true);

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
          <button onClick={() => setIsOpen(!isOpen)}>&times;</button>
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
        {isOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Modal Title</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
                <div className="mb-4">
                  <p>Modal content goes here</p>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
