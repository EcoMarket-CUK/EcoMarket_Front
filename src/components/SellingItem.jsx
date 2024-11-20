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
      <img src={auction.img} alt={auction.title} className="auction-item-img" />
      <div className="auction-item-details">
        <div className="first_line">
          <div className="auction-item-category">{auction.category}</div>
          <img src="/assets/slash.svg" alt="" className="action-item-slash" />
        </div>
        <h3 className="auction-item-title">{auction.title}</h3>
        <p className="auction-item-subTitle">{auction.sub}</p> {/* 추가된 부분 */}
        <p className="auction-item-desc">{auction.desc}</p>
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
          <p className="auction-item-price">{auction.price}원</p>
        </div>
      </div>
    </div>
  );
};

export default SellingItem;
