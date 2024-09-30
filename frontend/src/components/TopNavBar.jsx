import React from "react";
import {
  BellIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";

const TopNavBar = () => {
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_IP}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Login failed!"); // Handle non-200 response
      }

      const data = await response.json();
      // Assume the response contains a token or user data
      console.log(data); // Log the response for debugging

      navigate("/login"); // Navigate to the home page on successful login
    } catch (error) {
      console.error("Error:", error);
      alert("Login failed! Please try again."); // Notify user of failure
    }
  };

  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="border px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-2 top-2" />
      </div>

      {/* Icons */}
      <div className="flex items-center space-x-4">
        {/* Notification Icon */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="w-6 h-6 text-gray-700" />
        </button>

        {/* User Profile Icon */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <UserCircleIcon className="w-8 h-8 text-gray-700" />
        </button>

        {/* Logout Icon */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-500" />
        </button>
      </div>
    </div>
  );
};

export default TopNavBar;