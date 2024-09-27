import React from 'react';
import { HomeIcon, UserGroupIcon, Cog6ToothIcon, ChartBarSquareIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid'; // Correct v2 imports

export const Sidebar = () => {
  return (
    <div className="bg-blue-700 text-white w-64 min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <ul>
        <li className="mb-4 flex items-center">
          <HomeIcon className="w-6 h-6 mr-3" />
          <span>Home</span>
        </li>
        <li className="mb-4 flex items-center">
          <UserGroupIcon className="w-6 h-6 mr-3" />
          <span>Users</span>
        </li>
        <li className="mb-4 flex items-center">
          <ChartBarSquareIcon className="w-6 h-6 mr-3" />
          <span>Reports</span>
        </li>
        <li className="mb-4 flex items-center">
          <Cog6ToothIcon className="w-6 h-6 mr-3" />
          <span>Settings</span>
        </li>
        <li className="mt-10 flex items-center cursor-pointer text-red-400 hover:text-red-600">
          <ArrowRightOnRectangleIcon className="w-6 h-6 mr-3" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
};
