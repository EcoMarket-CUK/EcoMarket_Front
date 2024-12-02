import React, { useState , useEffect } from "react";

import { useNavigate } from "react-router-dom"; // useNavigate import 추가
import styled from "styled-components";
import "../css/pages/Profile.css";
import AuctionItem from "../components/AuctionItem";
import { getCategoryDisplayName } from "../utils/categoryMapping";

import axios from "axios"; // Import Axios for HTTP requests
function Profile() {

  const handleLogout = () => {
    // Clear specific cookies
    document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "memberId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    
    // Optionally navigate to login or home page
    navigate("/login");
  };

  
  const navigate = useNavigate(); // useNavigate 훅 사용
  
  const [auctions, setAuctions] = useState([]);
  const [steps, setSteps] = useState([
    { icon: "/assets/check-payment.svg", label: "송금 확인", count: 0 },
    { icon: "/assets/prepare-delivery.svg", label: "배송 준비중", count: 0 },
    { icon: "/assets/delivering.svg", label: "배송중", count: 0 },
    { icon: "/assets/delivery-completed.svg", label: "배송 완료", count: 0 },
  ]);
  

  const mockUserInfo = {
    name: "김사원",
    postalCode: "21986",
    address: "인천광역시 연수구 마이로 00-00\n1층 1호",
  };

  const handleNavigate = () => {
    navigate("/previous-bids"); // 원하는 경로로 이동
  };
  const handleSearch= () => {
    navigate("/search-bids"); // 원하는 경로로 이동
  };
  useEffect(() => {
    const fetchShippingCounts = async () => {
      try {
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        if (!accessToken) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        const response = await axios.get("https://ecomarket-cuk.shop/shipping/count", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data.result;
        setSteps((prevSteps) =>
          prevSteps.map((step) => {
            switch (step.label) {
              case "송금 확인":
                return { ...step, count: data.paymentConfirmedCount };
              case "배송 준비중":
                return { ...step, count: data.shippingPreparingCount };
              case "배송중":
                return { ...step, count: data.shippingCount };
              case "배송 완료":
                return { ...step, count: data.deliveredCount };
              default:
                return step;
            }
          })
        );
      } catch (error) {
        console.error("Failed to fetch shipping counts:", error);
        alert("배송 정보 로드에 실패했습니다.");
      }
    };

    fetchShippingCounts();
  }, [navigate]);
  useEffect(() => {
    const fetchParticipatedAuctions = async () => {
      try {
        const accessToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("accessToken="))
          ?.split("=")[1];

        if (!accessToken) {
          alert("로그인이 필요합니다.");
          navigate("/login");
          return;
        }

        // API 요청
        const response = await axios.get("https://ecomarket-cuk.shop/auctions/participation", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            auctionStatus: "ONGOING", // 쿼리 파라미터 설정
          },
        });
        
        console.log(response);
        const data = response.data.result;

        // 데이터 처리
        const formattedAuctions = data.map((auction) => ({
          ...auction,
          auctionCategory: getCategoryDisplayName(auction.auctionCategory), // 카테고리 한글 변환
          imageUrl: "/assets/picture1.svg", // 고정된 이미지 사용
        }));

        setAuctions(formattedAuctions); // 변환된 데이터를 상태에 저장
      } catch (error) {
        console.error("입찰 중인 경매 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchParticipatedAuctions();
  }, [navigate]);
  return (
    <div className="co">
      <Container>
        <TitleGroup>
          <h1>마이페이지</h1>
        </TitleGroup>
        <InfoCard>
          <div className="info-body" onClick={() => navigate("/profile/edit")}>
            <div className="info-row">
              <span className="info-label">이름 (닉네임)</span>
              <span className="info-value">{mockUserInfo.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">우편번호</span>
              <span className="info-value">{mockUserInfo.postalCode}</span>
            </div>
            <div className="info-row">
              <span className="info-label">주소</span>
              <span className="info-value">
                {mockUserInfo.address.split("\n").map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </span>
            </div>
          </div>
        </InfoCard>

        <Form>
            <div className="recent-auctions-header">
              <label>배송 중인 물품</label>
              <span className="view-all-text">
                조회하기 <span className="greater-sign"  onClick={handleSearch}>&gt;</span>
              </span>
              
            </div>
          <GuideGroup>
          <StepsContainer>
            {steps.map((step, index) => (
              <Step key={index}>
                <Circle>
                  <img src={step.icon} alt={step.label} />
                </Circle>
                <StepLabel>
                  {step.label}
                  <StepCount>{step.count}개</StepCount>
                </StepLabel>
              </Step>
            ))}
          </StepsContainer>
          </GuideGroup>
        </Form>

        {/* 경매 목록 섹션 */}
        <div className="recent-auctions">
            <div className="recent-auctions-header">
              <h2 className="recent-auctions-titles">입찰 중인 물품</h2>
              <span className="view-all-text">
                이전 입찰 내역 <span className="greater-sign"  onClick={handleNavigate}>&gt;</span>
              </span>
              
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

        
      </Container>
      <Divider />
      {/* 로그아웃 및 회원탈퇴 섹션 */}
      <AccountSection>
        <AccountItem onClick={handleLogout}>로그아웃</AccountItem>
        <AccountItem>회원탈퇴</AccountItem>
      </AccountSection>
    </div>
  );
}

export default Profile;
const Divider = styled.div`
  width: ca;
  height: 31px;
  background-color: #D9D9D9;
`;
const AccountSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 30px;
  margin-top: 30px;
`;

const AccountItem = styled.div`
  font-size: 15px;
  font-weight: 600; /* semibold */
  color: rgba(27, 27, 27,0.8);
`;

// styled-components
const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 44px 20px 10px 20px;
  font-family: "Pretendard", sans-serif;
  .sectionTitle {
    width: 100%;
    text-align: left;
    font-family: "Pretendard";
    font-size: 17px;
    font-weight: bold;
    margin: 36px 0px 20px 0px;
  }
  .two {
    margin-top: 20px !important;
  }
`;

const TitleGroup = styled.div`
  text-align: left;
  width: 100%;
  display: flex;
  justify-content: bottom;
  img {
    size: 25px;
    transform: scaleX(-1);
    display: inline;
    margin-right: 10px;
  }

  h1 {
    display: inline;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  p {
    font-size: 15px;
    color: #000000;
  }
`;
const StepsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6%;
  padding: 10px 0px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled.div`
  width: 55px;
  height: 55px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  margin-bottom: 5px;

  img {
    width: 30px;
    height: 50px;
    object-fit: contain;
  }
`;

const StepLabel = styled.div`
  text-align: center;
  font-size: 14px;
  
  font-weight: bold;
  color: black;
`;

const StepCount = styled.div`
  font-size: 12px;
  color: #333;
  
  font-weight: 100;
  margin-top: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  label {
    font-size: 18px;
    font-weight: bold;
  }
`;

const GuideGroup = styled.div`
  width: 100%;
  height: 146px;
  background-color: rgba(27, 27, 27, 0.05); /* #1b1b1b 색상에 5% 투명도 */
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  box-sizing: border-box;
`;



const InfoCard = styled.div`
  width: 100%;
  max-width: 600px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  .info-body {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
  }

  .info-label {
    color: black;
    font-weight: bold;
  }

  .info-value {
    text-align: right;
    color: #333;
  }
`;

