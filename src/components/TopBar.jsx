import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/components/TopBar.css";

const TopBar = ({ text }) => {
  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(-1); // 이전 페이지로 이동
  };
  

  return (
    <div className="topbar-container">
      <img 
        src="/assets/TopBar/slash.svg" 
        alt="icon" 
        className="topbar-icon" 
        onClick={handleImageClick} 
        style={{ cursor: 'pointer' }} // Adds a pointer cursor for better UX
      />
      <span className="topbar-text">{text}</span>
    </div>
  );
};

export default TopBar;
