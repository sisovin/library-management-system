import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import AdminNav from '../../components/admin/AdminNav';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <AdminNav />
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
