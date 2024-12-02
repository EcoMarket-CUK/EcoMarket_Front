import React from 'react';
import "../css/components/AuctionItem.css";

const AuctionDeliver = ({ auction }) => {
  return (
    <div className="auction-items">
      <img src={auction.imageUrl} alt={auction.productName} className="auction-item-imgs" />
      <div className="auction-item-details">
        <div className="first_line">
          <div className="auction-item-category">
            {auction.auctionCategory}
          </div>
          <div className="delivery-status">
            {auction.shippingStatus}
          </div>
        </div>
        <h3 className="auction-item-title">{auction.productName}</h3>
        <div className="auction-item-info-containers">
          <p className="auction-item-desc">{auction.productDescription}</p>
          <p className="auction-item-prices">{auction.finalBidPrice}원</p>
        </div>
      </div>
    </div>
  );
};

export default AuctionDeliver;
