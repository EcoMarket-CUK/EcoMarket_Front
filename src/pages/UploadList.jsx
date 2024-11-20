import React, { useEffect, useState } from "react";
import mockAuctionData from "../data/mockAuctionData"; // import mock auction data
import mockUpcomingAuctions from "../data/mockUpcomingAuctions"; // import mock upcoming auctions
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SellingItem from "../components/SellingItem";
import Cookies from "js-cookie";
import axios from "axios";

function UploadList() {
  const [onGoing,setOnGoing]=useState(null);
  const [ended,setEnded]=useState(null);

  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
  };
  const goToUpload = () => {
    navigate("/upload");
  };

  const goToInspection = () => {
    navigate("/inspection");
  };

  useEffect(()=>{
    fetchMAuctions("ONGOING");
    fetchMAuctions("ENDED")
  },[])

  const fetchMAuctions = async (stat) => {
    try {
      const accessToken = Cookies.get("accessToken");
      console.log(accessToken);
      console.log(stat);

      const response = await axios.get(`https://ecomarket-cuk.shop/screenings/member-auctions?status=${stat}`, {
        headers: {
          "Content-Type": "*/*",
          "Authorization": `Bearer ${accessToken}` // accessToken을 헤더에 추가
        },
      });
    
      console.log(response);
      if (stat=="ENDED"){
        setEnded(response.data.result);
      }
      else{
        setOnGoing(response.data.result);
      }
      // dispatch(setAuctions(response.data)); // Redux에 데이터 저장
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <TitleGroup>
        <h1>상품 등록</h1>
      </TitleGroup>

      <Form>
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
      </Form>

      <SubmitButton onClick={goToInspection}>
        검수 중인 상품 보러가기
        <img src="/assets/etcpage/slash.svg" alt="" />
      </SubmitButton>

      <label className="sectionTitle">경매중인 내 상품</label>
      {onGoing&&
        <AuctionItemWrapper>
        {onGoing.map((auction) => (
          <SellingItem auction={auction} />
        ))}
      </AuctionItemWrapper>
      }

      <label className="sectionTitle two">경매 완료된 내 상품</label>
      {ended&&
        <AuctionItemWrapper>
        {ended.map((auction) => (
          <SellingItem auction={auction} />
        ))}
      </AuctionItemWrapper>
      }
      

      <CircleButton onClick={goToUpload}>+</CircleButton>
    </Container>
  );
}

export default UploadList;

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
  margin-bottom: 24px;
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
    font-size: 25px;
    font-weight: var(--weight-semi-bold);
    margin-bottom: 5px;
  }

  p {
    font-size: 15px;
    color: #000000;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  label {
    font-size: 15px;
    font-weight: bold;
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

const AuctionItemWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const SubmitButton = styled.button`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 10px;
  font-family: "Pretendard";
  font-size: 20px;
  font-weight: var(--weight-bold);
  cursor: not-allowed;
  margin-top: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const CircleButton = styled.button`
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: var(--color-main);
  border: none;
  border-radius: 50%;
  color: white;
  font-size: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
