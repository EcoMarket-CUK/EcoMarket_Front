import React from 'react';

const BidInfo = ({ currentPrice, currentBidders }) => {
  return (
    <div className="detail-bid-info">
      <div className="bid-info-left">
        <span className="bid-label">현재 입찰가</span>
        <img src="/assets/people.svg" alt="입찰자 아이콘" className="bidder-icon" />
        <span className="bidder-count">{currentBidders}명 입찰 중</span>
      </div>
      <div className="bid-info-right">
        <span className="current-price">{currentPrice.toLocaleString()}원</span>
      </div>
    </div>
  );
};

export default BidInfo;
