import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/components/AuctionItem.css"; // 새로운 CSS 파일 import

const AuctionItem = ({ auction }) => {
  const navigate = useNavigate();
  const [isRotating, setIsRotating] = useState(false);

  const handleIconClick = () => {
    navigate(`/product/${auction.productId}`);
  };

  const handleRefreshClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 700); // 0.7초 후 회전 중지
  };

  return (
    <div className="auction-item">
      <img src={auction.imageUrl} alt={auction.productName} className="auction-item-img" />
      <div className="auction-item-details">
        <div className="first_line">
          <div className="auction-item-category">
            {auction.auctionCategory}
          </div>
          <img 
            src="/assets/slash.svg" 
            alt="slash icon" 
            className="action-item-slash" 
            onClick={handleIconClick} 
            style={{ cursor: 'pointer' }} // 클릭 가능한 커서 추가
          />
        </div>
        <h3 className="auction-item-title">{auction.productName}</h3>
        <p className="auction-item-desc">{auction.productDescription}</p>
        <div className="refresh-icon-container" onClick={handleRefreshClick}>
          <img 
            src="/assets/refresh.svg" 
            alt="refresh" 
            className={`refresh-icon ${isRotating ? 'rotating' : ''}`} 
          />
        </div>
        <div className="auction-item-info-container">
          <img src="/assets/people.svg" alt="people icon" className="auction-item-people-icon" />
          <p className="auction-item-info">현재 {auction.currentBidders}명 입찰중</p>
          <p className="auction-item-price">{auction.currentPrice}원</p>
        </div>
      </div>
    </div>
  );
};

export default AuctionItem;
