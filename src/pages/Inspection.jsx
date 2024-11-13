import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mockUpcomingAuctions from "../data/mockUpcomingAuctions";
import SellingItem from "../components/SellingItem";

function Inspection() {
  const [inspectionData,setInspectionData]=useState(null);

  const navigate = useNavigate();

  const goBack = () => {
    navigate("/uploadlist");
  };

  useEffect(()=>{
    fetchInspection();
  },[])

  const fetchInspection = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      console.log(accessToken);

      const response = await axios.get(`https://ecomarket-cuk.shop/screenings`, {
        headers: {
          "Content-Type": "*/*",
          "Authorization": `Bearer ${accessToken}` // accessToken을 헤더에 추가
        },
      });
    
      console.log(response);
      setInspectionData(response.data);
      // dispatch(setAuctions(response.data)); // Redux에 데이터 저장
    } catch (error) {
      console.error("경매 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <TitleGroup>
        <img src="/assets/etcpage/Vector.svg" alt="" onClick={goBack} />
        <h1>상품 등록</h1>
      </TitleGroup>

      <label>상품 검수 과정</label>
      <GuideGroup>
        <StepContainer>
          <CircleWrapper>
            <img src="/assets/etcpage/money.svg" alt="시작가 검토" />
          </CircleWrapper>
          <ArrowIcon>
            <img src="/assets/etcpage/Vector.svg" alt="" />
          </ArrowIcon>
          <CircleWrapper>
            <img src="/assets/etcpage/eye.svg" alt="상품 검토" />
          </CircleWrapper>
          <ArrowIcon>
            <img src="/assets/etcpage/Vector.svg" alt="" />
          </ArrowIcon>
          <CircleWrapper>
            <img src="/assets/etcpage/thumb.svg" alt="검수 완료" />
          </CircleWrapper>
        </StepContainer>
      </GuideGroup>

      <label className="sectionTitle">경매중인 내 상품</label>
      {inspectionData&&
        <AuctionItemWrapper>
          {inspectionData.map((auction) => (
            <SellingItem auction={auction} />
          ))}
        </AuctionItemWrapper>
      }
    </Container>
  );
}

export default Inspection;

// styled-components
const Container = styled.div`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 84px 30px 20px 30px;
  font-family: "Pretendard", sans-serif;
  padding-bottom: 180px; /* 하단에 추가 공간을 확보하여 스크롤 가능하도록 설정 */
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

const GuideGroup = styled.div`
  width: 100%;
  max-width: 330px;
  height: 146px;
  background-color: lightgray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const StepContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-around;
  align-items: center;
`;

const CircleWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AuctionItemWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const ArrowIcon = styled.span`
  font-size: 30px;
  color: black;
`;
