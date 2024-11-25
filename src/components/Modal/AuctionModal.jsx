// AuctionModal.jsx
import React from 'react';
import "../../css/components/AuctionModal.css";
import { useNavigate } from 'react-router-dom';
const AuctionModal = ({ onClose, productId }) => {
  const navigate = useNavigate();

  const handleConfirmClick = () => {
    navigate(`/auctionproduct/${productId}`);
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <img src="/assets/x.svg" alt="Close" className="close-button" onClick={onClose} />
        <h2>경매 입장 안내</h2>
        <p>경매 낙찰 시 <span className="highlight">낙찰된 금액을 반드시 판매자에게 지불</span>해야 하며<br/>
          낙찰된 금액을 지불하지 않을 시 법적 절차가 진행됩니다.</p>
        <ul>
          <li>낙찰자가 대금을 납부하기 전까지 채무자가채권을변제하고 청구인의 소송 및 집행정지신청을 할 수 있습니다.</li>
          <li>금액 지불 전까지 판매자의 물품은 전달되지 않습니다.</li>
        </ul>
        <button className="confirm-button" onClick={handleConfirmClick}>내용을 충분히 확인했어요</button>
      </div>
    </div>
  );
};

export default AuctionModal;
