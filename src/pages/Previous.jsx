import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar from '../components/TopBar';
import AuctionComplete from '../components/AuctionComplete';
import { getCategoryDisplayName } from '../utils/categoryMapping'; // 카테고리 매핑 함수 가져오기

export const Previous = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchPreviousAuctions = async () => {
      try {
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        if (!accessToken) {
          alert("로그인이 필요합니다.");
          return;
        }

        const response = await axios.get("https://ecomarket-cuk.shop/auctions/participation", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            auctionStatus: "ENDED",
          },
        });
        console.log(response);
        // 데이터 변환
        const formattedAuctions = response.data.result.map((auction) => ({
          ...auction,
          auctionCategory: getCategoryDisplayName(auction.auctionCategory), // 카테고리 한글 변환
          imageUrl: "/assets/picture1.svg", // 이미지 고정
          status: auction.isSuccessBid ? "낙찰" : "유찰", // 낙찰/유찰 상태 추가
        }));

        setAuctions(formattedAuctions);
      } catch (error) {
        console.error("입찰 내역 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchPreviousAuctions();
  }, []);

  return (
    <div className="container">
      <TopBar text={`입찰 내역`} />
      {auctions.length > 0 ? (
        auctions.map((auction) => (
          <AuctionComplete key={auction.productId} auction={auction} />
        ))
      ) : (
        <p style={{ margin: '30px 0', fontWeight: 'bold', fontSize: '16px' }}>
          현재 입찰 내역이 없습니다.
        </p>
      )}
    </div>
  );
};
