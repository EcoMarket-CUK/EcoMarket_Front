import React from "react";
import styled from "styled-components";

const PaymentModal = ({ isOpen, onClose, auctionData }) => {
  const handleCopyAccountNumber = () => {
    navigator.clipboard.writeText(auctionData.accountNumber);
    alert("계좌번호가 복사되었습니다!");
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <CloseIcon onClick={onClose}>
            <img src="/assets/x.svg" alt="Close" />
        </CloseIcon>
        <ModalTitle>입찰금 지불 안내</ModalTitle>
        <ModalContent>
        <DdaySection>
            <DdayRow>
                <DdayLabel>경매 입찰금 지급 D-Day</DdayLabel>
                <DdayValue>{auctionData.dueDate}</DdayValue>
            </DdayRow>
            <DdayRow>
                <DdayLabel></DdayLabel>
                <DdayRemaining>남은 기간 : {auctionData.remainingTime}</DdayRemaining>
            </DdayRow>
        </DdaySection>
          <AccountSection>
            <AccountLabel>판매자 가상계좌 번호</AccountLabel>
            <AccountValue>{auctionData.accountNumber}</AccountValue>
          </AccountSection>
        </ModalContent>
        <ModalActions>
          <CloseButton onClick={onClose}>닫기</CloseButton>
          <CopyButton onClick={handleCopyAccountNumber}>계좌번호 복사</CopyButton>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default PaymentModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const CloseIcon = styled.div`
  position: absolute;
  top: 25px;
  left: 25px;
  width: 14px;
  height: 14px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const ModalContainer = styled.div`
  width: 90%;
  position: relative;
  font-family: "Pretendard", sans-serif;
  max-width: 500px;
  height: 294px;
  background: white;
  border-radius: 30px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ModalTitle = styled.h1`
  text-align: center;
  margin-top: 37px; /* Adjust margin-top as described */
  font-size: 20px;
  
  font-weight: bold;
`;
const DdaySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DdayRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DdayLabel = styled.p`

  font-family: "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: bold;
  color: black;
  text-align: left;
`;

const DdayValue = styled.p`
  font-size: 13px;
  color: black;
  text-decoration: underline;
  text-align: right;
`;

const DdayRemaining = styled.p`
  font-size: 13px;
  color: black;
  text-align: right;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;


const AccountSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const AccountLabel = styled.p`
  font-size: 13px;
  font-weight: bold;
  color: black;
`;

const AccountValue = styled.p`
  font-size: 13px;
  color: black;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const CloseButton = styled.button`
  flex: 1;
  background: black;
  color: white;
  border: none;
  height:47px;
  border-radius: 10px; /* Increased for a more rounded shape */
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
`;

const CopyButton = styled.button`
  flex: 1;
  background: rgba(43, 222, 93, 0.2);
  color: rgba(43, 222, 93, 1);
  border: none;
  
  height:47px;
  border-radius: 10px; /* Increased for a more rounded shape */
  padding: 10px;
  font-size: 15px;
  cursor: pointer;
  font-family: 'Pretendard', sans-serif;
`;

