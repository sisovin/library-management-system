import React from 'react';
import '../styles/globals.css';

const RootLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl">Library Management System</h1>
      </header>
      <main className="flex-1 p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Library Management System
      </footer>
    </div>
  );
};

export default RootLayout;
