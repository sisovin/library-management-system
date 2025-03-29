import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <nav className="mt-4">
        <ul>
          <li>
            <NavLink to="/dashboard" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/books" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/profile" className="block py-2.5 px-4 rounded hover:bg-gray-700">
              Profile
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
