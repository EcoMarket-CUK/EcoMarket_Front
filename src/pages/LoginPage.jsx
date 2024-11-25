import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
// import { SocialLogin } from "../api/SocialLogin";

function LoginPage() {
  const [clicked, setIsClicked] = useState(false);
  const [logoing, setIsLogoing] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const navigate = useNavigate();

  const goToRegister = () => {
    window.location.href =
      "https://ecomarket-cuk.shop/oauth2/kakao";
    // alert("서비스 종료 ㅠㅠㅠㅠ");
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); // fade-out 시작
      setTimeout(() => {
        setIsLogoing(false); // 로고 화면 비활성화
      }, 1000); // fade-out 애니메이션이 끝난 후 로고를 숨김
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 스플래시 */}
      {logoing && (
        <SplashContainer
          className={`second ${fadeOut ? "fade-out" : ""}`}
          style={{ zIndex: 999 }}
        >
          <Slogan>
            <p>에코 경매</p>
            <p>코앞에서</p>
            <p>마음에 드는 가격에</p>
            <p>캣-하세요!</p>
          </Slogan>
          <LogoWrapper>
            <img src="assets/loginpage/splashRabbit.png" alt="에코마켓 로고" />
            <p>에코마켓</p>
          </LogoWrapper>
        </SplashContainer>
      )}

      <Container>
        <Title>
          물건 등록과 입찰을 위해
          <br />
          로그인해주세요!
        </Title>

        <ContentWrapper>
          <RabbitImage>
            <img src="assets/loginpage/mainRabbit.png" alt="토끼 그림" />
          </RabbitImage>

          {/* GreenBox 수정된 부분 */}
          <GreenBox>
            <GreenDiv>중고 물품, 그냥 거래만 하세요?</GreenDiv>
            <WhiteDiv>
              에코마켓에서는 금액을 올려 <span>경매</span> 거래를 할 수 있어요!
            </WhiteDiv>
          </GreenBox>

          <MainText>내 물건을 경매로!</MainText>
          <GrayText>에코마켓</GrayText>
        </ContentWrapper>

        <LoginWrapper>
          <LoginGuide>3초만에 중고 경매 시작하기!</LoginGuide>
          <KakaoLoginButton onClick={goToRegister}>
            카카오 로그인
          </KakaoLoginButton>
        </LoginWrapper>
      </Container>
    </>
  );
}

export default LoginPage;

// 스플래쉬
const SplashContainer = styled.div`
  display: flex;
  position: absolute;
  left: 0;
  flex-direction: column;
  justify-content: space-between;
  min-width: 390px;
  min-height: 844px;
  max-width: 430px;
  max-height: 932px;
  padding: 0 30px;
  background-color: #1feb58;
  color: white;
  text-align: left;
  z-index: 999;
  opacity: 1;
  transition: opacity 1s ease-out;

  &.fade-out {
    opacity: 0;
    transition: opacity 1s ease-out;
  }
`;

const Slogan = styled.div`
  position: absolute;
  top: 99px;
  left: 50px;
  font-size: 35px;
  line-height: 1.5;
  font-weight: bold;
`;

const LogoWrapper = styled.div`
  position: absolute;
  bottom: 65px;
  right: 52px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 60px;
    height: 78px;
    margin-left: auto;
  }
  p {
    font-size: 40px;
    font-weight: bold;
    margin-top: 10px;
  }
`;

// 메인
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  min-width: 390px;
  min-height: 844px;
  max-width: 430px;
  max-height: 932px;
  background-color: white;
  text-align: center;
  z-index: 7;
`;

const Title = styled.div`
  position: absolute;
  top: 84px;
  left: 43px;
  font-size: 25px;
  font-weight: 600;
  width: 280px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: left;
  line-height: 1.5;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 299px;
`;

const RabbitImage = styled.div`
  margin-top: 20px;
  img {
    width: 103px;
    height: 135px;
  }
`;

// GreenBox 수정된 부분
const GreenBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px; /* div 간의 간격 */
`;

const GreenDiv = styled.div`
  background-color: var(--color-main);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  width: 227px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WhiteDiv = styled.div`
  background-color: white;
  border: 1px solid var(--color-main);
  color: black;
  border-radius: 20px;
  margin: 0 20px;
  font-size: 10px;
  width: 290px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: var(--color-main);
    font-weight: bold;
    padding: 0 3px; /* 양옆에 여백 추가 */
  }
`;

const MainText = styled.p`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
`;

const GrayText = styled.p`
  margin-top: 10px;
  font-size: 15px;
  color: lightgray;
`;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 30px;
  position: absolute;
  bottom: 37px;
  gap: 13px;
`;

const LoginGuide = styled.p`
  font-size: 16px;
  text-align: center;
`;

const KakaoLoginButton = styled.button`
  width: 100%;
  height: 60px;
  background-color: #ffe812;
  border: none;
  font-family: "Pretendard";
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  color: black;
`;
