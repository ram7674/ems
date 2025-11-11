import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const EmployeeDashboard = () => {
  const {user} = useAuth();
  const navigate = useNavigate();

  if(!user){
    navigate("/login");
  }

  return (
    <div>employeeDashboard { user.name} </div>
  )
}

export default EmployeeDashboard