// AuctionCard.jsx
import React from "react";
import styled from "styled-components";

const AuctionCard = ({ item }) => {
  return (
    <CardContainer>
      <Image src={item.imageUrl} alt={item.productName} />
      <Content>
        <Category>{item.auctionCategory}</Category>
        <Title>{item.productName}</Title>
        <Description>{item.productDescription}</Description>
      </Content>
      <PriceSection>
        <PriceLabel>시작가</PriceLabel>
        <Price>{item.startPrice}원</Price>
      </PriceSection>
    </CardContainer>
  );
};

export default AuctionCard;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  width : 90%;
  
  height:74px;
  border-radius: 12px;
  padding: 10px;
  margin: 10px auto;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-right: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const Category = styled.div`
  display: inline-block;
  width: fit-content;
  background-color: rgba(31, 235, 88, 0.1);
  color: #1FEB58;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 5px;
  border-radius: 4px;
  margin-bottom: 5px;
`;


const Title = styled.h3`
  font-size: 12px;
  font-weight: bold;
  margin-top: 3px;
`;

const Description = styled.p`
  font-size: 10px;
  color: #8B95A1;
  margin-top: 5px;
`;

const PriceSection = styled.div`
  text-align: right;
  margin-left: auto;
  margin-right: 10px;
  
`;

const PriceLabel = styled.div`
  color: #F15C5C;
  font-size: 12px;
`;

const Price = styled.div`
  margin-top:8px;
  font-size: 15px;
  font-weight: bold;
`;
