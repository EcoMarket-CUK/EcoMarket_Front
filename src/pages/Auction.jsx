import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setAuctions }from '../redux/categorySlice';
import SearchBar from '../components/SearchContainer';
import "../css/pages/Auction.css";
import auchor_categories from '../data/auchor_categories';
import AuctionItem from '../components/AuctionItem';
import UpcomingAuctionItem from '../components/UpcomingAuctionItem';
import { useNavigate } from 'react-router-dom';

import mockUpcomingAuctions from '../data/mockUpcomingAuctions';
import instance from '../axiosConfig';
import Cookies from 'js-cookie';
import axios from "axios";
const Auction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Redux 스토어에서 선택된 카테고리 가져오기
  const selectedCategory = useSelector((state) => state.category);
  const auctions = useSelector((state) => state.category.auctions) || [];
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
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  //login확인 코드
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken") || Cookies.get("accessToken");
    const refreshToken = urlParams.get("refreshToken") || Cookies.get("refreshToken");

    if (accessToken ) {
      // Store tokens in cookies if they are from the URL
      if (urlParams.get("accessToken") ) {
        Cookies.set("accessToken", accessToken, { path: "/" });
        Cookies.set("refreshToken", refreshToken, { path: "/" });
      }
      
      // Redirect to the home page
      navigate("/");
    } else {
      // Redirect to login if tokens are missing
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // 인증된 상태일 때만 경매 데이터를 가져오는 함수 호출
    if (selectedCategory) {
      fetchAuctions(selectedCategory.selectedCategory);
    }
  }, [selectedCategory.selectedCategory]);
  
  
  // 토큰 없이 사용할 Axios 인스턴스
  const publicInstance = axios.create({
    baseURL: "https://ecomarket-cuk.shop",
  });

  useEffect(() => {
    fetchUpcomingAuctions();
  }, []);
  const fetchUpcomingAuctions = async () => {
    try {
      const response = await publicInstance.get(`/auctions`, {
        params: {
          status: "UPCOMING"
        }
      });
      setUpcomingAuctions(response.data.result);
    } catch (error) {
      console.error("진행 예정 경매 데이터를 가져오는 중 오류 발생:", error);
    }
  };
  const fetchAuctions = async (category) => {
    try {
      const mappedCategory = categoryMapping[category];// 영어로 변환하거나, 변환되지 않으면 원래 카테고리 사용
      // 보낼 데이터와 URL을 콘솔에 출력
    
    
      const response = await publicInstance.get(`/auctions`, {
        params: {
          status: "ONGOING",
          category: mappedCategory
        }
      });
      dispatch(setAuctions(response.data.result));
      console.log(auctions);
    } catch (error) {
      console.error("경매 데이터를 가져오는 중 오류 발생:", error);
    }
  };
  
  const navigateToCategoryPage = () => {
    navigate('/category-page');
  };
  
  
  const handleCategoryClick = (category) => { 
    dispatch(setCategory(category)); // Redux 스토어의 선택된 카테고리 업데이트
  };
  
  return (
    <div className="container">
        <SearchBar/>
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
        
        {/* 카테고리 섹션 */}
        <div className="auction-category">
          <h2 className="category-title">경매 카테고리</h2>
          <div className="category-grid">
            {auchor_categories.map((category) => (
              <div
                className="category-item" 
                key={category.title}
                onClick={() => handleCategoryClick(category.title)} // 카테고리 선택 시 호출
              >
                <div className={`category-circle ${selectedCategory.selectedCategory === category.title ? 'selected' : ''}`}>
                  <img src={category.img} alt={category.title} />
                </div>
                <p className="category-label">{category.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 경매 목록 섹션 */}
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
