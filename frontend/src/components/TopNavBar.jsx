import React from 'react';
import { BellIcon, MagnifyingGlassIcon, UserCircleIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'; // Correct v2 imports

export const TopNavBar = () => {
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
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ArrowRightOnRectangleIcon className="w-6 h-6 text-red-500" />
        </button>
      </div>
    </div>
  );
};
