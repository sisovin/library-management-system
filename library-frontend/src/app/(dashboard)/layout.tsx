import React from 'react';
import Sidebar from '../../components/dashboard/Sidebar';
import UserNav from '../../components/dashboard/UserNav';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <UserNav />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
