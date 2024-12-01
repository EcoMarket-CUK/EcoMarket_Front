import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { screening } from "../api/screening";
import instance from '../axiosConfig';
import Cookies from "js-cookie";
import axios from "axios";

function UploadThings() { // 상위 컴포넌트로 전달할 onSubmit prop
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [productPhotos, setProductPhotos] = useState([]); // 최대 3장까지 선택 가능
  const [productInfo, setProductInfo] = useState("");
  const [startTime,setStartTime]=useState("");
  const [endTime,setEndTime]=useState("");


  const navigate = useNavigate();

  const isFormComplete = () => {
    return (
      productName &&
      category &&
      startPrice &&
      productPhotos.length > 0 &&
      productInfo &&
      startTime &&
      endTime
    );
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0 && productPhotos.length + files.length <= 3) {
      setProductPhotos([...productPhotos, ...files].slice(0, 3)); // 최대 3개까지만 저장
    }
  };

  const goBack = () => {
    navigate("/uploadlist");
  };

  const goToUpload = () => {
    if (isFormComplete()) {
      // 사진을 제외한 데이터를 합쳐 dto 객체 생성
      const dto = {
        productName,
        productDescription: productInfo,
        desiredStartPrice: parseInt(startPrice), // 숫자 형식으로 변환
        startTime: startTime, // 고정된 값
        endTime: endTime,   // 고정된 값
        auctionCategory: "CLOTHING" || category // 선택된 카테고리 값, 기본값 "CLOTHING"
      };
      console.log(dto);
      // 상위 컴포넌트로 dto와 image(=productPhotos) 전달
      fetchUpload(dto, productPhotos);
    }
  };

  const fetchUpload = async (dto, productPhotos) => {
    try {
      const accessToken = Cookies.get("accessToken");
      console.log(accessToken);
      const formData = new FormData();
      
      // DTO 객체를 JSON 문자열로 변환하여 FormData에 추가
      formData.append("screeningDto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    
      // 이미지 파일을 FormData에 추가
      productPhotos.forEach((photo) => {
        formData.append("images", photo);
      });
    
      const response = await axios.post(`https://ecomarket-cuk.shop/screenings`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${accessToken}` // accessToken을 헤더에 추가
        },
      });
    
      console.log(response);
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

      <Form>
        <InputGroup>
          <label>상품명</label>
          <input
            type="text"
            placeholder="경매에 표시될 상품명을 입력해주세요."
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className={productName ? "filled" : ""}
          />
        </InputGroup>

        <InputGroup>
          <label>카테고리 선택</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={category ? "filled" : ""}
          >
            <option value="" disabled>
              상품 카테고리 선택
            </option>
            <option value="electronics">전자기기</option>
            <option value="fashion">패션</option>
            <option value="furniture">가구</option>
            <option value="other">기타</option>
          </select>
        </InputGroup>

        <InputGroup>
          <label>희망 시작 가격</label>
          <input
            type="text"
            placeholder="경매를 시작할 희망 시작 가격을 입력해주세요."
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            className={startPrice ? "filled" : ""}
          />
        </InputGroup>

        <InputGroup>
          <label>상품 사진</label>
          <span className="subLabel">
            사진은 최소 한 장부터 최대 세 장까지 가능해요.
          </span>
          <PhotoContainer>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: "none" }}
              id="product-photo"
              multiple
            />
            <PhotoLabel htmlFor="product-photo">
              {productPhotos.length > 0 ? (
                productPhotos.map((photo, index) => (
                  <PhotoPreview
                    key={index}
                    src={URL.createObjectURL(photo)} // 미리보기를 위한 URL 생성
                    alt={`Selected product ${index + 1}`}
                  />
                ))
              ) : (
                <PlusIcon>+</PlusIcon>
              )}
            </PhotoLabel>
          </PhotoContainer>
        </InputGroup>

        <TimeInputGroup>
          <StyledLabel>시작 시간</StyledLabel>
          <TimeInput
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />

          <StyledLabel>끝나는 시간</StyledLabel>
          <TimeInput
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </TimeInputGroup>

        <InputGroup>
          <label>상품 설명</label>
          <textarea
            placeholder="상품에 대한 부가 설명을 상세히 작성해주세요."
            value={productInfo}
            onChange={(e) => setProductInfo(e.target.value)}
            className={productInfo ? "filled" : ""}
          />
        </InputGroup>
      </Form>
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

      <SubmitButton
        className={isFormComplete() ? "active" : ""}
        disabled={!isFormComplete()}
        onClick={goToUpload}
      >
        {isFormComplete() ? "상품 등록하기" : "내용을 모두 입력해주세요!"}
      </SubmitButton>
    </Container>
  );
}

export default UploadThings;


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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;

  label {
    font-size: 15px;
    font-weight: bold;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 15px;
    margin-bottom: 8px;
    font-weight: bold;
  }

  input,
  select,
  textarea {
    padding: 12px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 15px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

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

// 시간 입력 그룹 스타일 추가
const TimeInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px; /* label과 input 간의 간격 설정 */
  input{
    border: 1px solid #e0e0e0;
  }
`;

const PhotoContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  width: 100%;
  max-width: 100%;
`;

const PhotoLabel = styled.label`
  width: 110px;
  height: 110px;
  background-color: #e0e0e0;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
`;

const PhotoPreview = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 10px;
`;

const PlusIcon = styled.span`
  font-size: 50px;
  color: black;
`;

const TimeInput = styled.input.attrs({type:'time'})`
  padding:8px;
  font-size:16px;
  border : 1px solid black;
  border-radius: 4px;
  background-color:#f9f9f9;
  &.focus {
    border-color:#66afe9;
    outline:none;
  }
`

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

const SubmitButton = styled.button`
  position: fixed;
  bottom: 86px;
  width: 100%;
  max-width: 330px;
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
    background-color: var(--color-main);
    color: white;
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;
