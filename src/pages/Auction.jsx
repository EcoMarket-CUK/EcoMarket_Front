import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setAuctions } from '../redux/categorySlice';
import SearchBar from '../components/SearchContainer';
import "../css/pages/Auction.css";
import auchor_categories from '../data/auchor_categories';
import AuctionItem from '../components/AuctionItem';
import UpcomingAuctionItem from '../components/UpcomingAuctionItem';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';
import axios from "axios";

const Auction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux에서 선택된 카테고리 및 경매 정보 가져오기
  const selectedCategory = useSelector((state) => state.category);
  const auctions = useSelector((state) => state.category.auctions) || [];

  // 진행 예정 경매 데이터를 위한 상태
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);

  // 카테고리 매핑 (한글 -> 영어)
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
    "한정판": "LIMITED_EDITION",
  };

  // 카테고리 역매핑 (영어 -> 한글)
  const reverseCategoryMapping = Object.entries(categoryMapping).reduce((acc, [kr, en]) => {
    acc[en] = kr;
    return acc;
  }, {});

  // 로그인 확인
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken") || Cookies.get("accessToken");
    const refreshToken = urlParams.get("refreshToken") || Cookies.get("refreshToken");

    if (accessToken) {
      if (urlParams.get("accessToken")) {
        Cookies.set("accessToken", accessToken, { path: "/" });
        Cookies.set("refreshToken", refreshToken, { path: "/" });
      }
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 선택된 카테고리에 따라 경매 데이터 가져오기
  useEffect(() => {
    if (selectedCategory) {
      fetchAuctions(selectedCategory.selectedCategory);
    }
  }, [selectedCategory.selectedCategory]);

  // Axios 인스턴스 생성 (토큰 없이 사용)
  const publicInstance = axios.create({
    baseURL: "https://ecomarket-cuk.shop",
  });

  // 진행 예정 경매 데이터 가져오기
  useEffect(() => {
    fetchUpcomingAuctions();
  }, []);

  const fetchUpcomingAuctions = async () => {
    try {
      const response = await publicInstance.get(`/auctions`, {
        params: { status: "UPCOMING" },
      });

      // 데이터 처리 및 이미지 고정
      const formattedData = response.data.result.map((auction) => ({
        ...auction,
        // imageUrl: "/assets/picture2.svg", // 고정 이미지 설정
        auctionCategory: reverseCategoryMapping[auction.auctionCategory] || auction.auctionCategory,
      }));

      setUpcomingAuctions(formattedData);
    } catch (error) {
      console.error("진행 예정 경매 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 진행 중인 경매 데이터 가져오기
  const fetchAuctions = async (category) => {
    try {
      const mappedCategory = categoryMapping[category]; // 한글 카테고리를 영어로 변환

      const response = await publicInstance.get(`/auctions`, {
        params: {
          status: "ONGOING",
          category: mappedCategory,
        },
      });

      // 데이터 처리 및 이미지 고정
      const formattedData = response.data.result.map((auction) => ({
        ...auction,
        // imageUrl: "/assets/picture1.svg", // 고정 이미지 설정
        auctionCategory: reverseCategoryMapping[auction.auctionCategory] || auction.auctionCategory,
      }));

      dispatch(setAuctions(formattedData));
    } catch (error) {
      console.error("경매 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  // 카테고리 선택 시 동작
  const handleCategoryClick = (category) => {
    dispatch(setCategory(category));
  };

  // 카테고리 페이지로 이동
  const navigateToCategoryPage = () => {
    navigate('/category-page');
  };

  return (
    <div className="container">
      <SearchBar />
      <div className="main_desc">
        <p>중고 물품을 <br />경매로</p>
      </div>
      <div className="auction-info">
        <div className="left-content">
          <div className="step">
            <div className="step-circle">1</div>
            <p>원하는 물품을 찾고</p>
          </div>
          <div className="step">
            <div className="step-circle">2</div>
            <p>입찰 가격 제시하면</p>
          </div>
          <div className="step">
            <div className="step-circle">3</div>
            <p>마감 때 제일 높은 가격이 낙찰!</p>
          </div>
        </div>
        <div className="right-content">
          <img src="/assets/mainicon.svg" alt="icon" className="auction-icon" />
        </div>
      </div>

      {/* 경매 카테고리 */}
      <div className="auction-category">
        <h2 className="category-title">경매 카테고리</h2>
        <div className="category-grid">
          {auchor_categories.map((category) => (
            <div
              className="category-item"
              key={category.title}
              onClick={() => handleCategoryClick(category.title)}
            >
              <div className={`category-circle ${selectedCategory.selectedCategory === category.title ? 'selected' : ''}`}>
                <img src={category.img} alt={category.title} />
              </div>
              <p className="category-label">{category.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 진행 중 경매 */}
      <div className="recent-auctions">
        <div className="recent-auctions-header">
          <h2 className="recent-auctions-titles">해당 카테고리 최근 TOP5 경매</h2>
          <span className="view-all-text" onClick={navigateToCategoryPage}>전체보기</span>
        </div>
        <div className="auction-list">
          {auctions.length > 0 ? (
            auctions.map((auction) => (
              <AuctionItem auction={auction} key={auction.productId} />
            ))
          ) : (
            <p style={{ margin: '30px 0', fontWeight: 'bold', fontSize: '16px' }}>
              현재 진행 중인 경매가 없습니다.
            </p>
          )}
        </div>
      </div>

      {/* 진행 예정 경매 */}
      <div className="recent-auctionss">
        <h2 className="recent-auctions-title">진행 예정 경매</h2>
        <p className="upcoming-auctions-message">오픈을 앞둔 경매를 미리 둘러보세요!</p>
        <div className="upcoming-auction-list">
          {upcomingAuctions.length > 0 ? (
            upcomingAuctions.map((auction) => (
              <UpcomingAuctionItem auction={auction} key={auction.id} />
            ))
          ) : (
            <p style={{ margin: '30px 0', fontWeight: 'bold', fontSize: '16px' }}>
              진행 예정인 경매가 없습니다.
            </p>
          )}
        </div>
      </div>
      <div style={{ marginBottom: '150px' }}></div>
    </div>
  );
};

export default Auction;
