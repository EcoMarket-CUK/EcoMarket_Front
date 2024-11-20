import React, { useState } from 'react';
import Navbar from '../components/Detail/Navbar.jsx';
import ImageSlider from '../components/Detail/ImageSlider';
import ProductInfo from '../components/Detail/ProductInfo';
import BidInfo from '../components/Detail/BidInfo';
import "../css/pages/ProductDetail.css";
import USellerInfo from '../components/Upcoming/USellerInfo.jsx';


const mockProductData = {
  productId: 1,
  productName: "모나리자",
  productDescription: "레오나르도 다빈치의 대표적인 작품으로, 세계에서 가장 유명한 초상화입니다.",
  currentPrice: 50000000,
  currentBidders: 1234,
  auctionCategory: "그림",
  imageUrls: [
    "/assets/picture1.svg",
    "/assets/picture2.svg",
    "/assets/picture3.svg"
  ],
  sellerName: "홍길동",
  sellerImageUrl: "/assets/picture1.svg",
  auctionEndTime: "2023-12-31 18:00",
  transactionVolume: [
    { date: "10/20", volume: 10 },
    { date: "10/21", volume: 18 },
    { date: "10/22", volume: 13 },
    { date: "10/23", volume: 21 },
    { date: "10/24", volume: 8 },
    { date: "10/25", volume: 17 },
    { date: "10/26", volume: 5 },
    { date: "10/27", volume: 15 },
    { date: "10/28", volume: 9 },
  ],
  bidHistory: [
    { date: "10/28", time: "18:00", amount: 30000000 },
    { date: "10/28", time: "18:01", amount: 33000000 },
    { date: "10/28", time: "18:02", amount: 36300000 },
  ]
};

const UpcomingDetail = () => {
  const product = mockProductData;
  const [isRotating, setIsRotating] = useState(false);

  const handleRefreshClick = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 700); // 0.7초 후에 애니메이션을 중지
  };
  return (
    <div className="detail-product-detail-container">
      <Navbar category={product.auctionCategory} />
      <ImageSlider imageUrls={product.imageUrls} productName={product.productName} />
      <ProductInfo productName={product.productName} productDescription={product.productDescription} />
      <USellerInfo sellerName={product.sellerName} sellerImageUrl={product.sellerImageUrl} />
      <div className="margingray"></div>
      <BidInfo currentPrice={product.currentPrice} currentBidders={product.currentBidders} />
      <div className="show"></div>
    </div>
  );
};

export default UpcomingDetail;
