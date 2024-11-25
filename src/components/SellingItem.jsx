// SellingItem.js
import React from "react";
import "../css/components/SellingItem.css"; // 새로운 CSS 파일 import
import { useNavigate } from "react-router-dom";

const SellingItem = ({ auction }) => {
  const navigate = useNavigate();
  const goToDoneDetail=()=>{
    navigate(`/done/${auction.id}`);
  }
  return (
    <div className="auction-item" onClick={goToDoneDetail}>
      <img src={auction.imageUrl} alt={auction.productName} className="auction-item-img" />
      <div className="auction-item-details">
        <div className="first_line">
          <div className="auction-item-category">{auction.auctionCategory}</div>
          <img src="/assets/slash.svg" alt="" className="action-item-slash" />
        </div>
        <h3 className="auction-item-title">{auction.productName}</h3>
        <p className="auction-item-subTitle">{auction.screeningStatus}</p> {/* 추가된 부분 */}
        <p className="auction-item-desc">{auction.productDescription}</p>
        <div className="refresh-icon-container">
          <img
            src="/assets/refresh.svg"
            alt="refresh"
            className="refresh-icon"
          />
        </div>
        <div className="auction-item-info-container">
          <img
            src="/assets/people.svg"
            alt=""
            className="auction-item-people-icon"
          />
          <p className="auction-item-info">
            현재 {auction.currentBidderCount}명 입찰중
          </p>
          <p className="auction-item-price">{auction.desiredStartPrice}원</p>
        </div>
      </div>
    </div>
  );
};

export default SellingItem;
