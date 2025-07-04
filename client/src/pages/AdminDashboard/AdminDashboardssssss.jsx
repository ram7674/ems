import React from 'react';
import './AdminDashboard.css'
import { Outlet } from 'react-router-dom';

import AdminSidebar from '../../components/AdminSidebar/AdminSidebar.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';

const AdminDashboard = () => {
  
  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="main-section">
        <Navbar />
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );

};

export default AdminDashboard;
