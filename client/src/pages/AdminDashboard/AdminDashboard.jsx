import React from "react";
import "./AdminDashboard.css";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
     <div className="dashboard-layout">
      <AdminSidebar />
      <div className="main-content">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
