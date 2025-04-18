

---

```markdown
# 🛍️ EcoMarket – 실시간 경매 기반 중고거래 플랫폼

에코마켓은 사용자가 **중고 상품을 등록하고 실시간 경매를 통해 거래할 수 있는 웹 애플리케이션**입니다.  
WebSocket을 기반으로 한 실시간 입찰 시스템과 거래량 시각화를 통해 몰입감 있는 사용자 경험을 제공합니다.

---

## 📂 프로젝트 구조

```bash
src/
├── api/                  # API 요청 함수 정의
├── components/           # 공통 UI 컴포넌트
├── css/                  # 전역 및 페이지 스타일링
├── data/                 # (데이터 모델, 더미데이터 등)
├── pages/                # 라우팅되는 주요 화면 페이지
├── redux/                # 전역 상태 관리
├── utils/                # 유틸 함수 및 매핑 로직 (ex. 카테고리 매핑)
├── App.jsx               # 전체 앱 구조 정의
├── axiosConfig.jsx       # Axios 설정 파일
├── main.jsx              # React 앱 진입점
```

---

## 🔧 사용 기술 스택

| 분야 | 사용 기술 |
|------|-----------|
| 프레임워크 | React 18 + Vite |
| 상태 관리 | Redux (필요한 경우) |
| HTTP 통신 | Axios + JWT 인증 |
| 실시간 통신 | WebSocket (SockJS + STOMP.js) |
| 시각화 | Chart.js (`react-chartjs-2`) |
| 스타일링 | styled-components, CSS 모듈 |
| 배포 | Vercel 또는 Netlify (추후 예정) |

---

## 🚀 주요 기능

### 📌 실시간 입찰 시스템
- `SockJS`, `STOMP.js` 기반 WebSocket을 활용해 실시간 입찰 정보 반영
- `/sub/auctions/{auctionId}` 채널을 구독하여 `topBidPrice`, `numOfBidders`, `bidVolumeList` 실시간 업데이트
- 사용자가 입찰 시 `/pub/bid/auctions/{auctionId}`로 메시지를 전송하여 양방향 통신 구현

### 📌 상품 등록 기능
- 사용자는 상품명, 카테고리, 희망 시작가, 설명, 이미지(최대 3장)를 입력해 등록 가능
- `multipart/form-data` 방식으로 JSON DTO + 이미지 파일을 동시에 서버에 전송
- DTO는 `Blob`으로 감싸 `application/json` 타입 명시

### 📊 입찰 시각화
- 거래량(bid volume)을 `Bar Chart` 형태로 시각화
- 최근 입찰 내역(상위 3건)은 날짜/시간/금액 기준으로 표시
- `Chart.js` 커스터마이징을 통해 사용자 맞춤형 툴팁, 축 스타일링 적용

---

## 🧪 실행 방법

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 기본 주소: http://localhost:5173
```

---
