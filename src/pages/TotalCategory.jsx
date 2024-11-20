import React from 'react';
import { useSelector } from 'react-redux';
import TopBar from '../components/TopBar';
import mockAuctionData from '../data/mockAuctionData';
import AuctionItem from '../components/AuctionItem';

export const TotalCategory = () => {
  // Redux 스토어에서 selectedCategory 가져오기
  const selectedCategory = useSelector((state) => state.category);

  // 선택된 카테고리에 따라 mockAuctionData 필터링
  const filteredAuctions = mockAuctionData.filter(
    auction => auction.category === selectedCategory
  );

  return (
    <div className="container">
      <TopBar text={`${selectedCategory} 전체보기`} />
      {filteredAuctions.map((auction) => (
        <AuctionItem key={auction.id} auction={auction} />
      ))}
    </div>
  );
};
