import React from 'react';
import './SummaryCard.css';

const SummaryCard = ({ icon, text, number }) => {
  return (
    <div className="summary-card">
      <div className="icon-container">
        {icon}
      </div>
      <div className="text-container">
        <p className="summary-text">{text}</p>
        <p className="summary-number">{number}</p>
      </div>
    </div>
  );
};

export default SummaryCard;
