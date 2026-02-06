# Quick Start Guide

## 🚀 빠른 시작

### 1. 저장소 클론

```bash
git clone https://github.com/genfitx8/JB-GOLF.git
cd JB-GOLF
```

### 2. 환경 설정

#### 프론트엔드 환경 변수
```bash
cd frontend
cp .env.example .env
```

`.env` 파일을 열어 다음과 같이 수정:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

#### 백엔드 환경 변수
```bash
cd ../backend
cp .env.example .env
```

`.env` 파일을 열어 MongoDB URI를 설정:
```env
MONGODB_URI=mongodb://localhost:27017/jb-golf
JWT_SECRET=dev-secret-key-change-in-production
JWT_REFRESH_SECRET=dev-refresh-secret-key
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. 의존성 설치

```bash
# 프론트엔드 설치
cd frontend
npm install

# 백엔드 설치
cd ../backend
npm install
```

### 4. MongoDB 실행

#### Option A: 로컬 MongoDB
```bash
# MongoDB가 설치되어 있다면
mongod
```

#### Option B: MongoDB Atlas (권장)
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 가입
2. 무료 클러스터 생성
3. 연결 문자열 복사
4. `backend/.env`의 `MONGODB_URI` 업데이트

### 5. 애플리케이션 실행

#### 터미널 1: 백엔드 서버
```bash
cd backend
npm run dev
```

출력 예시:
```
🚀 서버가 포트 5000에서 실행 중입니다
✅ MongoDB 연결 성공
```

#### 터미널 2: 프론트엔드
```bash
cd frontend
npm run dev
```

출력 예시:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

### 6. 브라우저에서 열기

http://localhost:3000 을 브라우저에서 엽니다.

## 📱 첫 번째 사용자 생성

1. 회원가입 페이지로 이동
2. 정보 입력:
   - 이름: 홍길동
   - 이메일: customer@test.com
   - 전화번호: 010-1234-5678
   - 비밀번호: Test1234
   - 사용자 유형: 고객

3. 회원가입 버튼 클릭

4. 자동으로 로그인되어 고객 대시보드로 이동합니다

## 🧪 테스트 데이터 생성

### MongoDB Compass 또는 Atlas UI 사용

#### 1. Location (연습장) 생성
```json
{
  "name": "JB 골프 연습장",
  "address": "서울시 강남구 테헤란로 123",
  "phone": "02-1234-5678",
  "totalBays": 20,
  "availableBays": 20,
  "openingHours": {
    "start": "06:00",
    "end": "23:00"
  },
  "pricePerHour": 30000,
  "facilities": ["주차장", "락커룸", "프로샵", "카페"],
  "status": "active"
}
```

#### 2. Pro (프로) 사용자 생성
먼저 회원가입으로 프로 계정 생성 (role: "pro")

그 다음 Pro 문서 생성:
```json
{
  "user": "프로_유저의_ObjectId",
  "bio": "10년 경력의 KPGA 프로",
  "specialties": ["드라이버", "아이언", "퍼팅"],
  "experience": 10,
  "lessonPrice": {
    "private": 100000,
    "group": 50000
  },
  "location": "Location_ObjectId",
  "status": "active"
}
```

## 📋 주요 기능 테스트

### 1. 로그인/로그아웃
- ✅ 이메일과 비밀번호로 로그인
- ✅ 로그아웃 버튼 클릭

### 2. 예약 생성
- ✅ "새 예약하기" 클릭
- ✅ 연습장 선택
- ✅ 날짜 선택
- ✅ 시간대 선택
- ✅ 예약 확정

### 3. 예약 관리
- ✅ "내 예약 내역" 확인
- ✅ 예약 취소

### 4. 프로 계정 테스트
- ✅ 프로 계정으로 로그인
- ✅ 스케줄 확인
- ✅ 학생 목록 확인

### 5. 매장 계정 테스트
- ✅ 매장 계정으로 로그인
- ✅ 예약 현황 확인
- ✅ 타석 현황 확인

## 🔍 API 테스트

### cURL로 테스트

#### 회원가입
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "테스트 사용자",
    "email": "test@example.com",
    "password": "Test1234",
    "phone": "010-1234-5678",
    "role": "customer"
  }'
```

#### 로그인
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

#### 연습장 목록 조회
```bash
curl -X GET http://localhost:5000/api/locations
```

#### 예약 생성 (토큰 필요)
```bash
curl -X POST http://localhost:5000/api/bookings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "locationId": "LOCATION_ID",
    "date": "2024-01-20",
    "timeSlot": "10:00",
    "type": "practice",
    "duration": 60
  }'
```

## 🐛 문제 해결

### MongoDB 연결 오류
```
Error: MongoDB 연결 실패
```

**해결방법:**
1. MongoDB가 실행 중인지 확인
2. `MONGODB_URI`가 올바른지 확인
3. MongoDB Atlas 사용 시 IP 화이트리스트 확인

### 포트 이미 사용 중
```
Error: listen EADDRINUSE: address already in use :::5000
```

**해결방법:**
```bash
# 포트를 사용 중인 프로세스 찾기
lsof -i :5000

# 프로세스 종료
kill -9 PID
```

또는 `.env`에서 다른 포트 사용:
```env
PORT=5001
```

### CORS 오류
```
Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:3000' has been blocked
```

**해결방법:**
`backend/api/index.js`의 CORS 설정 확인:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
```

## 📚 다음 단계

1. [Vercel에 배포](./DEPLOYMENT.md)
2. [API 문서 확인](./README.md#-api-문서)
3. 추가 기능 구현

## 💡 개발 팁

### Hot Reload
- 프론트엔드: Vite가 자동으로 새로고침
- 백엔드: nodemon이 파일 변경 감지

### 디버깅
- 브라우저 개발자 도구 (F12)
- Network 탭에서 API 요청 확인
- Console에서 에러 메시지 확인

### 데이터베이스 확인
- [MongoDB Compass](https://www.mongodb.com/products/compass) 사용
- 또는 MongoDB Atlas 웹 UI 사용

## 🤝 도움이 필요하신가요?

- [GitHub Issues](https://github.com/genfitx8/JB-GOLF/issues)
- [README.md](./README.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
