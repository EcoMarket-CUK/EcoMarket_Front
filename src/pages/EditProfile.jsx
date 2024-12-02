import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GetAddress from "../api/GetAddress";
import TopBar from "../components/TopBar";
function EditProfile() {
  // 각각의 input 상태를 관리하기 위한 state
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const navigate = useNavigate();

  // 모든 필드가 채워졌는지 확인하는 함수
  const isFormComplete = () => {
    return name && nickname && zipcode && address && detailAddress;
  };

  // 페이지 이동 함수
  const goToHome = () => {
    if (isFormComplete()) {
      navigate("/");
    }
  };

  return (
    
    <Container>
      <LeftContent onClick={() => navigate(-1)}>
        <img src="/assets/TopBar/slash.svg" alt="Slash Icon" />
        <span>뒤로가기</span>
      </LeftContent>
      <TitleGroup>
        <h1>내 정보 수정</h1>
        <p>성함 외 변경하고 싶은 닉네임, 주소를 입력해보세요!</p>
      </TitleGroup>

      <Form>
        <InputGroup>
          <label>성함</label>
          <input
            type="text"
            placeholder="성함을 입력해주세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={name ? "filled" : ""}
          />
        </InputGroup>

        <InputGroup>
          <label>닉네임</label>
          <input
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className={nickname ? "filled" : ""}
          />
        </InputGroup>

        <AddressGroup>
          <label>주소</label>
          <div className="address-row">
            <input
              type="text"
              placeholder="우편번호"
              className={`zipcode ${zipcode ? "filled" : ""}`}
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <button onClick={GetAddress}>검색하기</button>
          </div>
          <input
            type="text"
            placeholder="주소"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={address ? "filled" : ""}
          />
          <input
            type="text"
            placeholder="상세주소를 입력해주세요."
            value={detailAddress}
            onChange={(e) => setDetailAddress(e.target.value)}
            className={detailAddress ? "filled" : ""}
          />
        </AddressGroup>
      </Form>

      <SubmitButton
        className={isFormComplete() ? "active" : ""}
        onClick={isFormComplete() ? goToHome : null}
      >
        {isFormComplete() ? "수정하기" : "내용을 모두 입력해주세요!"}
      </SubmitButton>
    </Container>
  );
}

export default EditProfile;

// styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: center;
  padding: 65px 20px 20px 20px;
  font-family: "Pretendard", sans-serif;
`;

const TitleGroup = styled.div`
  text-align: left;
  width: 100%;
  margin-bottom: 30px;

  h1 {
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
  gap: 55px;
  width: 100%;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 15px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input {
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 15px;
    height: 51px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    &.filled {
      border-color: var(--color-main); /* 텍스트가 있을 때 border 색 변경 */
    }

    &::placeholder {
      color: #cccccc;
    }
  }
`;

const AddressGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 15px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  .address-row {
    display: flex;
    gap: 10px;
    margin-bottom: 10px;

    .zipcode {
      flex: 2;
      padding: 12px;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      font-size: 14px;
      width: 368px;
      height: 51px;
    }

    button {
      flex: 1;
      padding: 12px;
      background-color: black;
      color: white;
      border: none;
      font-family: "Pretendard";
      height: 51px;
      border-radius: 10px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  input {
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 14px;
    margin-bottom: 10px;
    height: 51px;

    &::placeholder {
      color: #cccccc;
    }
  }
`;

const SubmitButton = styled.button`
  width: 370px;
  padding: 15px;
  background-color: #f2f2f2;
  color: black;
  border: none;
  border-radius: 10px;
  font-family: "Pretendard";
  font-size: 20px;
  font-weight: var(--weight-bold);
  cursor: not-allowed;
  margin-top: 30px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &.active {
    background-color: var(
      --color-main
    ); /* 모든 입력 필드가 채워지면 배경색 변경 */
    color: white; /* 모든 입력 필드가 채워지면 글자색 변경 */
    cursor: pointer;
  }
`;
const LeftContent = styled.div`
  position: absolute; /* 위치를 절대 좌표로 설정 */
  top: 15px; /* 상단에서 10px 떨어진 위치 */
  left: 17px; /* 왼쪽에서 10px 떨어진 위치 */
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    width: 20px;
    height: 20px;
  }
    span {
    font-family: "Pretendard";
    font-size: 15px;
    color: gray;
  }
`;
