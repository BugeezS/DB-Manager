import React from "react";

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <header className="bg-blue-600 text-white p-4 shadow flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Profile
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
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h3 className="font-bold mb-2">Widget 3</h3>
            <p>More information here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
