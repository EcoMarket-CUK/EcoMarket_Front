import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopBar from '../components/TopBar';
import AuctionDeliver from '../components/AuctionDeliver';
import { getCategoryDisplayName, getStatusDisplayName } from '../utils/categoryMapping';

export const SearchBid = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const accessToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('accessToken='))
          ?.split('=')[1]; // Get accessToken from cookies

        const response = await axios.get('https://ecomarket-cuk.shop/shipping/details', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response.data);
        const formattedData = response.data.result.map((auction) => ({
          ...auction,
          auctionCategory: getCategoryDisplayName(auction.auctionCategory),
          shippingStatus: getStatusDisplayName(auction.shippingStatus),
        }));

        setAuctions(formattedData);
      } catch (err) {
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>로딩 중...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>{error}</p>;
  }

  return (
    <div className="container">
      <TopBar text="배송 중인 물품" />
      {auctions.length > 0 ? (
        auctions.map((auction) => (
          <AuctionDeliver key={auction.shippingId} auction={auction} />
        ))
      ) : (
        <p style={{ margin: '30px 0', fontWeight: 'bold', fontSize: '16px' }}>
          현재 배송 중인 물품이 없습니다.
        </p>
      )}
    </div>
  );
};
