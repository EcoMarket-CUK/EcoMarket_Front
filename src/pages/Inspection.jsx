import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mockUpcomingAuctions from "../data/mockUpcomingAuctions";
import SellingItem from "../components/SellingItem";
import Cookies from "js-cookie";
import axios from "axios";

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
      setInspectionData(response.data.result);
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

      <StyledLabel className="guide">상품 등록 과정</StyledLabel>
      <GuideGroup>
        <StepContainer>
          <StepWrapper>
            <CircleWrapper>💰</CircleWrapper>
            <StepDescription>시작가 검토</StepDescription>
          </StepWrapper>
          <ArrowIcon>{">"}</ArrowIcon>
          <StepWrapper>
            <CircleWrapper>🧐</CircleWrapper>
            <StepDescription>상품 검토</StepDescription>
          </StepWrapper>
          <ArrowIcon>{">"}</ArrowIcon>
          <StepWrapper>
            <CircleWrapper>👍</CircleWrapper>
            <StepDescription>검수 완료</StepDescription>
          </StepWrapper>
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

const StyledLabel = styled.label`
  font-size: 15px;
  font-weight: bold;
  width: 100%; /* GuideGroup과 일치하는 너비 */
  
  &.guide {
    margin: 8px 0;
    text-align: left;
    display: block; /* 다른 요소들과의 정렬 문제를 해결 */
  }
`;

const GuideGroup = styled.div`
  width: 100%;
  max-width: 330px;
  height: auto;
  background-color: lightgray;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;
  margin: 0 auto;
  box-sizing: border-box;
  flex-direction: column;
`;

const StepContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const CircleWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 29px;
`;

const StepDescription = styled.span`
  font-size: 15px;
  color: black;
`;

const ArrowIcon = styled.span`
  font-size: 30px;
  color: black;
  margin-bottom:30px;
`;
