import React from 'react';

const SellerInfo = ({ sellerName, sellerImageUrl, auctionEndTime }) => {
  return (
    <div className="detail-seller-info">
      <div className="detail-seller-left">
        <img src={sellerImageUrl} alt="판매자" className="detail-seller-image" />
        <div className="detail-seller-details">
          <p className="detail-seller-label">판매자</p>
          <p className="detail-seller-name">{sellerName}</p>
        </div>
      </div>
      <div className="detail-auction-end-time">
        <p>경매 마감</p>
        <p>{auctionEndTime}</p>
      </div>
    </div>
  );
};

export default SellerInfo;
