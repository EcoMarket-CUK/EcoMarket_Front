import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TopBar from '../components/TopBar';
import AuctionItem from '../components/AuctionItem';
import { getCategoryDisplayName} from '../utils/categoryMapping';

const categoryMapping = {
  "그림": "PAINTING",
  "음반": "RECORD",
  "악기": "INSTRUMENT",
  "신발": "SHOES",
  "의류": "CLOTHING",
  "전자": "ELECTRONICS",
  "주얼리": "JEWELRY",
  "가방": "BAGS",
  "계절템": "SEASONAL_ITEMS",
  "한정판": "LIMITED_EDITION"
};

export const TotalCategory = () => {
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    // 선택된 카테고리를 영어로 변환
    const mappedCategory = categoryMapping[selectedCategory] || selectedCategory;

    // 백엔드에서 경매 데이터를 가져오는 함수
    const fetchAuctions = async () => {
      try {
        const response = await axios.get(`https://ecomarket-cuk.shop/auctions/ongoing`, {
          params: { category: mappedCategory },
        });
    
        // 데이터 처리: auctionCategory만 변환
        const updatedAuctions = response.data.result.map((auction) => ({
          ...auction,
          auctionCategory: getCategoryDisplayName(auction.auctionCategory), // 카테고리 한글로 변환
        }));
    
        setAuctions(updatedAuctions); // 변환된 데이터 저장
      } catch (error) {
        console.error("경매 데이터를 가져오는 중 오류 발생:", error);
      }
    };
    

    // fetch 함수 호출
    fetchAuctions();
  }, [selectedCategory]);

  return (
    <div className="container">
      <TopBar text={`${selectedCategory} 전체보기`} />
      {auctions.length > 0 ? (
        auctions.map((auction) => (
          <AuctionItem key={auction.productId} auction={auction} />
        ))
      ) : (
        <p style={{ margin: '30px 0', fontWeight: 'bold', fontSize: '16px' }}>
          현재 진행 중인 경매가 없습니다.
        </p>
      )}
    </div>
  );
};
