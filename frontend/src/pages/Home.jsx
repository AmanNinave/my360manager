import React from "react";
import { Sidebar } from "../components/Sidebar.jsx";
import { TopNavBar } from "../components/TopNavbar.jsx";
import Dashboard from "./Dashboard.jsx";

const Home = () => {
  return (
    <div className="flex h-[100vh]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <TopNavBar />

        {/* Main content */}
        <div className="p-6 bg-gray-100 max-h-[100vh]  flex-1 overflow-y-auto">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default Home;
