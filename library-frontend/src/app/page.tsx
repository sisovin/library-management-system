import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Library Management System</h1>
      <p className="text-lg mb-8">Manage your library efficiently and effectively.</p>
      <div className="flex space-x-4">
        <Link href="/(auth)/login">
          <a className="px-4 py-2 bg-blue-500 text-white rounded">Login</a>
        </Link>
        <Link href="/(auth)/register">
          <a className="px-4 py-2 bg-green-500 text-white rounded">Register</a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
