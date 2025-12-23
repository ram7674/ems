import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import EmployeeSidebar from '../../components/EmployeeSidebar/EmployeeSidebar.jsx';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const EmployeeDashboard = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  if(!user){
    navigate("/login");
  }

  return (
    <>
 <div className="dashboard-layout">
      <EmployeeSidebar />
      <Navbar />
      <div className="flex-grow-1 p-3">
        <Outlet />
      </div>
    </div>
    </>
   
  )
}

export default EmployeeDashboard