import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/components/AuctionItem.css"; // 새로운 CSS 파일 import
import PaymentModal from './PaymentModal';
const AuctionComplete = ({ auction }) => {

  const [isModalOpen, setModalOpen] = useState(false);
  
  
  const handleIconClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const mockAuctionData = {
    dueDate: "2024년 11월 26일 (화)",
    remainingTime: "3일 18시간",
    accountNumber: "012-34-567890",
  };
  return (
    <div className="auction-item">
      <img src={auction.imageUrl} alt={auction.productName} className="auction-item-img" />
      <div className="auction-item-details">
        <div className="first_line">
          <div className="auction-item-category">
            {auction.status}
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
        <div className="refresh-icon-containers" >
          
        </div>
        <div className="auction-item-info-container">
          <p className="auction-item-infoed">입찰 {auction.myBidPrice}원</p>
          <p className="auction-item-priced">최종 {auction.topBidPrice}원</p>
        </div>
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        auctionData={mockAuctionData}
      />
    </div>
  );
};

export default AuctionComplete;
