import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/components/AuctionItem.css"; // 새로운 CSS 파일 import

const AuctionDeliver= ({ auction }) => {
  const navigate = useNavigate();
  

 
  return (
    <div className="auction-item">
      <img src={auction.imageUrl} alt={auction.productName} className="auction-item-img" />
      <div className="auction-item-details">
        <div className="first_line">
            <div className="auction-item-category">
            {auction.auctionCategory}
          </div>
        </div>
        <h3 className="auction-item-title">{auction.productName}</h3>
        <p className="auction-item-desc">{auction.productDescription}</p>
          
        </div>
        <div className="auction-item-info-container">
          
          <p className="auction-item-price">{auction.currentPrice}원</p>
        </div>

    </div>
  );
};

export default AuctionDeliver;
