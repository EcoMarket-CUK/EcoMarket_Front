
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import Cookies from "js-cookie";
import { useNavigate, useParams } from "react-router-dom";
import AuctionCard from "../components/AuctionCard";
import styled from "styled-components";
import "../css/pages/AuctionProduct.css";
import BidInfo from "../components/Detail/BidInfo";
import TransactionChart from "../components/Detail/TransactionChart";
import { getCategoryDisplayName } from "../utils/categoryMapping"; // 변환 함수 가져오기/ 매핑 함수 가져오기
// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: "https://ecomarket-cuk.shop", // 기본 API URL 설정
});

const AuctionProduct = () => {
  const navigate = useNavigate();
  const { auctionId } = useParams(); // URL에서 auctionId 추출
  const [auctionData, setAuctionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);
  
  const [stompClient, setStompClient] = useState(null);
  

  const fetchAuctionData = async () => {
    try {
      const accessToken = Cookies.get("accessToken"); // 쿠키에서 accessToken 가져오기
      const response = await apiClient.get(`/auctions/${auctionId}/auction-bid`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setAuctionData(response.data.result);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는데 실패했습니다.");
      setLoading(false);
    }
  };
  const sendBid = (bidPrice) => {
    if (!stompClient || !stompClient.connected) {
      console.error("WebSocket is not connected. Please try again later.");
      return;
    }
  
    const accessToken = Cookies.get("accessToken");
    const message = { bidPrice };
  
    try {
      stompClient.send(
        `/pub/bid/auctions/${auctionId}`,
        { Authorization: `Bearer ${accessToken}` },
        JSON.stringify(message)
      );
      console.log("Bid sent:", message);
    } catch (error) {
      console.error("Failed to send bid:", error);
    }
  };
  
  useEffect(() => {
    const socket = new SockJS("https://ecomarket-cuk.shop/ws");
    const stomp = Stomp.over(socket);
  
    stomp.connect(
      { Authorization: `Bearer ${Cookies.get("accessToken")}` },
      () => {
        console.log("WebSocket connected");
        setConnected(true);
        setStompClient(stomp);
  
        stomp.subscribe(`/sub/auctions/${auctionId}`, (message) => {
          const data = JSON.parse(message.body);
          // WebSocket에서 받은 데이터를 auctionData 상태에 병합
          setAuctionData((prevData) => ({
            ...prevData, // 기존 데이터 유지
            topBidPrice: data.topBidPrice,
            canBidPrice: data.canBidPrice,
            numOfBidders: data.numOfBidders,
            bidVolumeResponseList: data.bidVolumeResponseList, // 배열을 그대로 사용
            top3BidDatePriceList: data.top3BidDatePriceList, // 배열을 그대로 사용
          }));
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
        setConnected(false);
      }
    );
  
    return () => {
      if (stomp.connected) {
        stomp.disconnect(() => console.log("WebSocket disconnected"));
      }
    };
  }, [auctionId]);
  
  useEffect(() => {
    fetchAuctionData();
  }, [auctionId]);

  const goBack = () => {
    navigate(-1);
  };
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  const {
    productName,
    productDescription,
    auctionCategory,
    startBidPrice,
    topBidPrice,
    canBidPrice,
    numOfBidders,
    top3BidDatePriceList,
    bidVolumeResponseList,
  } = auctionData;
  const displayCategory = getCategoryDisplayName(auctionCategory); // 한글로 변환
  
  return (
    <div>
      <TitleGroup>
        <img src="/assets/etcpage/Vector.svg" alt="" onClick={goBack} />
        <h1>경매</h1>
      </TitleGroup>
      <AuctionCard
        item={{
          productId: auctionId,
          productName,
          productDescription,
          auctionCategory: displayCategory, // 한글로 변환된 카테고리를 전달
          startPrice: startBidPrice,
          imageUrl: "/assets/picture1.svg", // 필요 시 수정
          currentPrice: topBidPrice,
        }}
      />
      <div className="margingray"></div>
      <BidInfo currentPrice={topBidPrice} currentBidders={numOfBidders} />
      <TransactionChart
        transactionVolume={bidVolumeResponseList}
        bidHistory={top3BidDatePriceList.map(({ bidDate, bidPrice }) => ({
          date: bidDate.split(" ")[0],
          time: bidDate.split(" ")[1],
          amount: bidPrice,
        }))}
      />
      <div className="margingray"></div>
      <div className="auction-container">
        <div className="next-bid-price">
          <span className="label">다음 입찰 가격</span>
          <span className="price">{canBidPrice.toLocaleString()}원</span>
        </div>
        <div className="bid-note">
          <ul>
            <li>경매 특성상 현재 입찰가에 10%를 더한 금액으로 자동 책정돼요.</li>
            <li>더 빨리 입찰한 사람이 해당 입찰가에 입찰할 수 있어요.</li>
            <li>한 번 입찰 시 최소되지 않으니 신중히 입찰해주세요.</li>
          </ul>
        </div>
      </div>
      <BidButton onClick={() => sendBid(canBidPrice)}>{canBidPrice.toLocaleString()}원에 입찰하기</BidButton>
    </div>
  );
};

export default AuctionProduct;

const TitleGroup = styled.div`
  text-align: left;
  width: 100%;
  margin-top: 20px;
  margin-left: 12px;
  margin-bottom: 30px;
  display: flex;
  justify-content: bottom;
  img {
    width: 10px;
    height: 16px;
    display: inline;
    margin-top: 7px;
    margin-right: 10px;
    transform: scaleX(-1);
  }

  h1 {
    display: inline;
    font-size: 25px;
    font-weight: var(--weight-semi-bold);
    margin-bottom: 5px;
  }

  p {
    font-size: 15px;
    color: #000000;
  }
`;

const BidButton = styled.button`
  width: 90%;
  height: 60px;
  margin: 20px auto;
  display: block;
  background-color: #1b1b1b;
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 100px;
`;
