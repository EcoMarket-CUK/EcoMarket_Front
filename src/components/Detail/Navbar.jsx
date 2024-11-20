import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ category }) => {
  const navigate = useNavigate();
  
  return (
    <div className="detail-navbar">
      <img
        src="/assets/TopBar/slash.svg"
        alt="뒤로가기"
        onClick={() => navigate(-1)}
        className="detail-back-button"
      />
      <div className="detail-category">{category}</div>
    </div>
  );
};

export default Navbar;
