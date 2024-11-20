import React from 'react';
import "../css/components/UpcomingAuctionItem.css";
import { useNavigate } from 'react-router-dom';

const UpcomingAuctionItem = ({ auction }) => {
  const navigate=useNavigate();
  const handleIconClick = () => {
    navigate(`/upcoming/${auction.id}`);
  };
  return (
    <div className="upcoming-auction-item" onClick={handleIconClick}>
      <img src={auction.img} alt={auction.title} className="auction-image" />
      <div className="auction-details">
        <p className="auction-item-categorys">{auction.category}</p>
        <p className="auction-title">{auction.title}</p>
        <p className="auction-date">
          <span className="date-background">{auction.date}</span>
        </p>
        <p className="auction-price">{auction.price.toLocaleString()}원</p> {/* 가격 추가 */}
      </div>
    </div>
  );
};

export default UpcomingAuctionItem;
