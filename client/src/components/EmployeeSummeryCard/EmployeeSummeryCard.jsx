import React from 'react';
import './EmployeeSummeryCard.css';

import { FaUsers } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';

const EmployeeSummeryCard = () => {
  const {user} = useAuth();
  return (
    <>
    <div className='emp-main-card'>
    <div className="emp-summary-card">
      <div className="emp-icon-container">
        <FaUsers />
        <p className="emp-summary-text">{user.name}</p>
      </div>
    </div>
    </div>
    </>
  );
};

export default EmployeeSummeryCard;
