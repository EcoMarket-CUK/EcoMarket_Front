import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import mockUpcomingAuctions from "../data/mockUpcomingAuctions";
import SellingItem from "../components/SellingItem";
import "../css/components/SearchContainer.css";
import axios from "axios";
import Cookies from "js-cookie";

function Search() {
  const [keyword, setKeyword] = useState("");
  const [searchData,setSearchData] = useState([]);

  const navigate = useNavigate();

  const fetchSearch = async () => {
    try {
      const accessToken = Cookies.get("accessToken");
      console.log(accessToken);
    
      const response = await axios.get(`https://ecomarket-cuk.shop/auctions/search?keyword=${keyword}`, {
        headers: {
          "Content-Type": "*/*",
          "Authorization": `Bearer ${accessToken}` // accessToken을 헤더에 추가
        },
      });
    
      console.log(response);
      setSearchData(response.data.result);
      // dispatch(setAuctions(response.data)); // Redux에 데이터 저장
    } catch (error) {
      console.error("경매 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <Container>
      <TitleGroup>
        <img src="/assets/etcpage/Vector.svg" alt="" onClick={goBack} />
        <h1>상품 검색</h1>
      </TitleGroup>

      <InputGroup>
        <input
        type="text"
        className="search-input"
        placeholder="원하는 물품을 검색해보세요!"
        onChange={(e) => setKeyword(e.target.value)}
        />
        <img src="/assets/Search.svg" alt="search" className="search-icon" onClick={fetchSearch}/>
      </InputGroup>

      <AuctionItemWrapper>
        {searchData.map((auction) => (
          <SellingItem auction={auction} />
        ))}
      </AuctionItemWrapper>
    </Container>
  );
}

export default Search;

// styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 30px 20px 30px;
  font-family: "Pretendard", sans-serif;
  padding-bottom: 180px;
`;

const TitleGroup = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 20px;
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

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  position: relative;

  input,
  select,
  textarea {
    padding: 12px;
    padding-right: 40px; /* 아이콘 공간 확보를 위해 오른쪽 패딩 추가 */
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 15px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
    width: 100%;

    &.filled {
      border-color: var(--color-main);
    }

    &::placeholder {
      color: #cccccc;
    }
  }

  textarea {
    height: 220px;
  }

  select {
    height: 51px;
  }

  .subLabel {
    margin: 2px 0px 10px 0px;
    font-size: 12px;
    color: black;
    text-align: left;
  }

  .search-icon {
    position: absolute;
    right: 18px; /* input의 오른쪽에서 18px */
    top: 50%;
    transform: translateY(-50%); /* 상하 중앙 정렬 */
    width: 20px;
    height: 20px;
  }
`;

const AuctionItemWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
