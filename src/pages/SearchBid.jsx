import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import TopBar from '../components/TopBar';
import AuctionDeliver from '../components/AuctionDeliver';

import mockAuctionData from "../data/mockAuctionData";

export const SearchBid = () => {
  const auctions = mockAuctionData;
  return (
    <div className="container">
      <TopBar text={`배송 중인 물품`} />
      {auctions.length > 0 ? (
        auctions.map((auction) => (
          <AuctionDeliver key={auction.productId} auction={auction} />
        ))
      ) : (
        <p style={{ margin: '30px 0', fontWeight: 'bold', fontSize: '16px' }}>
          현재 진행 중인 경매가 없습니다.
        </p>
      )}
    </div>
  );
};
