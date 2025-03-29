import React from 'react';
import { NavLink } from 'react-router-dom';

const UserNav = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/dashboard" className="hover:underline">
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/books" className="hover:underline">
            Books
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/profile" className="hover:underline">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/logout" className="hover:underline">
            Logout
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserNav;
