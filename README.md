# 🏌️ JB-GOLF - 골프 예약 시스템

프리미엄 골프 연습장 및 레슨 예약 플랫폼

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/genfitx8/JB-GOLF)

## 🎯 프로젝트 개요

JB-GOLF는 골프 연습장 예약과 프로 레슨 예약을 통합한 풀스택 웹 애플리케이션입니다. Vercel에 배포할 수 있는 프로덕션 레벨의 애플리케이션으로 구축되었습니다.

### 주요 기능

#### 🎯 고객용 앱
- 연습장 및 레슨 예약
- 실시간 타석 가용성 확인
- 예약 내역 관리 및 취소
- 프로 선택 및 레슨 예약

#### 👨‍🏫 프로용 앱
- 스케줄 관리 및 일정 확인
- 학생 관리 및 레슨 기록
- 수입 통계 및 분석
- 학생 진도 관리

#### 🏢 매장 관리 앱
- 실시간 타석 현황 모니터링
- 예약 관리 및 승인
- 매출 통계 및 리포트
- 프로 및 고객 관리

## 🛠 기술 스택

### Frontend
- **React 18** - UI 라이브러리
- **Vite** - 빌드 도구 및 개발 서버
- **TailwindCSS** - 유틸리티 퍼스트 CSS 프레임워크
- **React Router v6** - 클라이언트 사이드 라우팅
- **Axios** - HTTP 클라이언트
- **Socket.io Client** - 실시간 통신
- **React Hook Form** - 폼 관리
- **React Hot Toast** - 알림 시스템
- **Lucide React** - 아이콘
- **Recharts** - 차트 및 통계

### Backend
- **Node.js** - 런타임 환경
- **Express** - 웹 프레임워크
- **MongoDB** - NoSQL 데이터베이스
- **Mongoose** - MongoDB ODM
- **JWT** - 인증 및 권한 관리
- **bcryptjs** - 비밀번호 암호화
- **Socket.io** - 실시간 통신 서버
- **Helmet** - 보안 헤더
- **Express Rate Limit** - API 속도 제한
- **Winston** - 로깅

### Deployment
- **Vercel** - 프론트엔드 및 백엔드 배포
- **MongoDB Atlas** - 관리형 MongoDB 데이터베이스
- **Vercel Serverless Functions** - 백엔드 API

## 📦 설치 방법

### Prerequisites
- Node.js 18 이상
- MongoDB (로컬) 또는 MongoDB Atlas 계정
- npm 또는 yarn

### 설치

```bash
# 저장소 클론
git clone https://github.com/genfitx8/JB-GOLF.git
cd JB-GOLF

# 프론트엔드 의존성 설치
cd frontend
npm install

# 백엔드 의존성 설치
cd ../backend
npm install
```

### 환경 변수 설정

#### Frontend (.env)
```bash
cd frontend
cp .env.example .env
```

`.env` 파일을 열어 다음 값을 설정하세요:
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

#### Backend (.env)
```bash
cd backend
cp .env.example .env
```

`.env` 파일을 열어 다음 값을 설정하세요:
```env
MONGODB_URI=mongodb://localhost:27017/jb-golf
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-refresh-secret-key
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

## 🚀 실행 방법

### 개발 환경

#### 옵션 1: 개별 실행
```bash
# 백엔드 실행 (터미널 1)
cd backend
npm run dev

# 프론트엔드 실행 (터미널 2)
cd frontend
npm run dev
```

프론트엔드: http://localhost:3000  
백엔드 API: http://localhost:5000/api

### 프로덕션 빌드

```bash
# 프론트엔드 빌드
cd frontend
npm run build

# 백엔드 빌드 (이미 Node.js로 실행 가능)
cd backend
npm start
```

## 🚢 Vercel 배포

### 1. MongoDB Atlas 설정

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) 계정 생성
2. 클러스터 생성 (무료 티어 사용 가능)
3. Database Access에서 사용자 생성
4. Network Access에서 `0.0.0.0/0` 허용 (또는 Vercel IP)
5. 연결 문자열 복사

### 2. Vercel CLI 설치 및 로그인

```bash
# Vercel CLI 설치
npm i -g vercel

# Vercel 로그인
vercel login
```

### 3. 프로젝트 배포

```bash
# 프로젝트 루트에서
vercel

# 프로덕션 배포
vercel --prod
```

### 4. 환경 변수 설정

Vercel 대시보드에서 프로젝트 > Settings > Environment Variables로 이동하여 다음 변수를 추가:

#### Production 환경 변수
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jb-golf
JWT_SECRET=your-production-jwt-secret
JWT_REFRESH_SECRET=your-production-refresh-secret
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

## 📚 API 문서

### 인증 API

#### POST `/api/auth/register`
회원가입
```json
{
  "name": "홍길동",
  "email": "user@example.com",
  "password": "password123",
  "phone": "010-1234-5678",
  "role": "customer"
}
```

#### POST `/api/auth/login`
로그인
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET `/api/auth/me`
현재 사용자 정보 (인증 필요)

### 예약 API

#### POST `/api/bookings`
예약 생성 (인증 필요)
```json
{
  "locationId": "location_id",
  "date": "2024-01-15",
  "timeSlot": "10:00",
  "type": "practice",
  "duration": 60
}
```

#### GET `/api/bookings`
예약 목록 조회 (인증 필요)

#### GET `/api/bookings/:id`
예약 상세 조회 (인증 필요)

#### DELETE `/api/bookings/:id`
예약 취소 (인증 필요)

### 연습장 API

#### GET `/api/locations`
연습장 목록 조회

#### GET `/api/locations/:id`
연습장 상세 조회

#### GET `/api/locations/:id/bay-status`
실시간 타석 현황

### 프로 API

#### GET `/api/pros`
프로 목록 조회

#### GET `/api/pros/:id`
프로 상세 조회

#### GET `/api/pros/:id/schedule`
프로 스케줄 조회

## 🏗 프로젝트 구조

```
JB-GOLF/
├── frontend/                 # React 프론트엔드
│   ├── public/              # 정적 파일
│   ├── src/
│   │   ├── components/      # React 컴포넌트
│   │   │   ├── auth/       # 인증 컴포넌트
│   │   │   ├── customer/   # 고객 앱
│   │   │   ├── pro/        # 프로 앱
│   │   │   ├── store/      # 매장 앱
│   │   │   └── common/     # 공통 컴포넌트
│   │   ├── context/        # React Context
│   │   ├── services/       # API 서비스
│   │   ├── utils/          # 유틸리티 함수
│   │   ├── styles/         # 스타일
│   │   ├── App.jsx         # 메인 앱
│   │   └── main.jsx        # 엔트리 포인트
│   ├── package.json
│   └── vite.config.js
│
├── backend/                 # Express 백엔드
│   ├── api/
│   │   ├── controllers/    # 컨트롤러
│   │   ├── models/         # Mongoose 모델
│   │   ├── routes/         # API 라우트
│   │   ├── middleware/     # 미들웨어
│   │   ├── utils/          # 유틸리티
│   │   └── index.js        # 메인 서버
│   ├── package.json
│   └── vercel.json
│
├── vercel.json              # Vercel 설정
├── .gitignore
└── README.md
```

## 🔒 보안

- JWT 기반 인증
- 비밀번호 bcrypt 암호화
- Helmet.js 보안 헤더
- Rate Limiting
- CORS 정책
- Input Validation
- MongoDB Injection 방지

## 🧪 테스트

```bash
# 프론트엔드 테스트 (추후 추가)
cd frontend
npm test

# 백엔드 테스트 (추후 추가)
cd backend
npm test
```

## 🤝 기여

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

MIT License

Copyright (c) 2024 JB-GOLF

## 📧 문의

프로젝트 문의: [GitHub Issues](https://github.com/genfitx8/JB-GOLF/issues)

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들을 사용합니다:
- React
- Express
- MongoDB
- Vercel
- 그 외 package.json에 명시된 모든 패키지들
