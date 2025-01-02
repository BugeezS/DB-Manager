"use client";
import { useRouter } from "next/navigation";
import { FaDatabase, FaUser, FaCog, FaHome } from "react-icons/fa";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">DB Manager</h1>
      </header>

      <div className="flex">
        {/* Aside Navigation */}
        <aside className="w-64 bg-white h-[calc(100vh-64px)] shadow-md">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-50 transition"
                >
                  <FaHome className="text-blue-600" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/databases")}
                  className="w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-50 transition"
                >
                  <FaDatabase className="text-blue-600" />
                  <span>Databases</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/profile")}
                  className="w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-50 transition"
                >
                  <FaUser className="text-blue-600" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => router.push("/settings")}
                  className="w-full flex items-center space-x-3 p-2 rounded hover:bg-blue-50 transition"
                >
                  <FaCog className="text-blue-600" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};
