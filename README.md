# 🧙 KT Vicddory — KT Wiz AI 분석 페이지

> **유데미 x 스나이퍼팩토리 | 프로젝트 캠프: Next.js 1기**  
> KT 1팀 빅또리 | 2024.06.17 ~ 2024.08.02 (7주)

기존 KT Wiz 공식 사이트에 **AI 분석 기능**을 추가한 프로젝트입니다.  
야구를 모르는 입문자도 쉽고 재미있게 즐길 수 있도록 인터랙티브한 디자인과 AI 기반 콘텐츠를 제공합니다.

🔗 **[시연 영상 (YouTube)](https://www.youtube.com/watch?v=HIApvr025uc)**

※ 프로젝트 운영 비용 및 서버 유지 이슈로 인해  
현재는 배포 환경 대신 시연 영상으로 대체하였습니다.

---

## 👥 팀원

| 역할      | 이름   |
| --------- | ------ |
| 팀장      | 이설아 |
| 팀원 | 강예슬 |
| 팀원      | 고민지 |
| 팀원      | 오재호 |


---

## 🛠 기술 스택

| 분류      | 기술                           |
| --------- | ------------------------------ |
| Framework | Next.js 14 (App Router)        |
| Language  | TypeScript                     |
| Styling   | Tailwind CSS                   |
| Animation | Framer Motion                  |
| State     | Zustand                        |
| Chart     | Highcharts                     |
| Database  | MongoDB                        |
| Infra     | Vercel (CI/CD + 이미지 최적화) |

---

## 📁 프로젝트 구조

```
src
├── app
│   ├── (main)                  # 메인 레이아웃 그룹
│   │   ├── @modal              # Parallel Route — 모달
│   │   ├── @questions          # Parallel Route — 성향 테스트 질문
│   │   ├── @result             # Parallel Route — 테스트 결과
│   │   ├── player              # 선수 목록 / 개인 페이지
│   │   ├── ranking             # 팀 순위 (AI 예측 / 일자별 / 년도별)
│   │   └── wiznews             # KT Wiz 뉴스 + AI 경기 뉴스
│   ├── (test)                  # 성향 테스트 레이아웃 그룹
│   └── api                     # Route Handlers
│       ├── ainews              # AI 경기 뉴스 생성
│       ├── detailedNews        # 뉴스 상세
│       ├── news                # 공식 뉴스 목록
│       ├── playerPredict       # 선수 성적 AI 예측
│       ├── positionStatistics  # 포지션별 통계
│       ├── predict             # 오늘의 매치 AI 예측
│       ├── predictStats        # 예측 통계
│       ├── questions           # 성향 테스트 질문 생성
│       ├── startingPitcher     # 선발 투수 정보
│       ├── testResult          # 테스트 결과 저장
│       ├── todayGame           # 오늘 경기 정보
│       └── tts                 # Text-To-Speech
├── components
│   ├── Header.tsx
│   ├── BannerBtn.tsx
│   ├── mobile/                 # 모바일 전용 컴포넌트
│   ├── player/                 # 선수 관련 컴포넌트
│   ├── ranking/                # 순위 차트 컴포넌트
│   ├── test/                   # 성향 테스트 컴포넌트
│   ├── tradingCard/            # 트레이딩 카드 컴포넌트
│   └── wiznews/                # 뉴스 컴포넌트
├── data/                       # 정적 데이터
├── libs/                       # 외부 라이브러리 설정
├── types/                      # TypeScript 타입 정의
└── utils/                      # 유틸 함수
```

---

## ✨ 주요 기능

### 🎯 성향 테스트

- 접속 시 모달로 KT Wiz 성향 테스트 안내
- AI가 매번 새롭게 생성하는 질문 & 답변
- 결과에 따른 포지션별 **트레이딩 카드** 제공
- MongoDB로 결과 저장 → 퍼센트 순위 표시
- 카카오 공유하기 · 링크 복사 · 캡처 기능

### 🧑‍⚾ 선수 페이지

- 포지션별 선수 목록을 **트레이딩 카드** 형식으로 표시
- 카드 클릭 시 앞·뒤 **3D 플립 효과**
- 선수 개인 페이지 라우팅: `/player/pitcher/99`
- 레이더 차트로 경기력 핵심 지표 시각화 (ERA, K/BB, WHIP 등)
- **"선수 성적 예측하기"** 버튼 → AI가 2024 시즌 성적 예측
- 토글로 세부 기록 전체 열람

### 📊 경기 결과 및 순위 예측

- **오늘의 매치 AI 예측**: 전체 승률 · 최근 승률 · 선발 투수 기반 예상 승률
- **일자별 순위 그래프**: KBO 전 팀 · 날짜 범위 선택 가능
- **년도별 순위 그래프**: 리그 창단 이래 모든 팀의 연도별 순위 변동
- 경기 없는 날 예외 처리

### 📰 kt wiz news

- 마스코트를 활용한 뉴스 메인 페이지 + **무한 스크롤**
- 뉴스 상세를 모달로 표시 (Parallel + Intercepting Routes)
- **TTS(Text-To-Speech)** 음성 뉴스 기능
- 전광판 컨셉 디자인 · URL 공유 기능
- **AI 경기 뉴스**: 박스스코어 기반으로 날짜별 신선한 뉴스 자동 생성

### 📱 반응형

- 모바일 / 데스크탑 전 페이지 반응형 지원

---

## ⚙️ 구현 시 고려한 기술적 사항

- **SSR 활용**: 클라이언트 / 서버 컴포넌트 분리
- **중복 요청 제거**: Next.js `fetch` 자동 캐싱 활용
- **Dynamic Import**: 초기 로딩 시간 단축
- **모달**: Parallel Routes + Intercepting Routes 조합
- **SEO**: 페이지별 메타데이터 설정
- **렌더링 최적화**: Repaint로 Reflow 최소화
- **이미지 최적화**: Vercel 내장 최적화 이용

---

## 🤝 협업 방식

| 영역         | 도구 / 방식                          |
| ------------ | ------------------------------------ |
| 커뮤니케이션 | Slack, Discord                       |
| 디자인       | Figma (디자인 시스템 포함), Zeplin   |
| 버전 관리    | GitHub (Git-Flow 전략, Ruleset 적용) |
| 커밋         | Commitizen + cz-customizable         |
| 코드 품질    | ESLint + Prettier                    |

### 브랜치 전략

```
main
└── develop
    ├── feature/기능명
    ├── fix/버그명
    └── ...
```

### 커밋 컨벤션

`commitizen`을 사용해 타입별 커밋을 시각적으로 구분하며, 한 커밋에는 하나의 변경사항만 포함합니다.

---

## 🚀 로컬 실행 방법

```bash
# 패키지 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local에 필요한 값 입력

# 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

### 환경 변수

| 변수명           | 설명                    |
| ---------------- | ----------------------- |
| `MONGODB_URI`    | MongoDB 연결 URI        |
| `OPENAI_API_KEY` | OpenAI API 키 (AI 기능) |

---

## 📅 개발 일정

| 주차   | 내용                                                                 |
| ------ | -------------------------------------------------------------------- |
| Week 1 | 기획, 와이어프레임, UI/UX 설계, 컨벤션 설정                          |
| Week 2 | Next.js 초기 설정, Tailwind 적용, 기본 라우팅, 기능 분배 및 퍼블리싱 |
| Week 3 | 컴포넌트 퍼블리싱 완료, API 연동 시작                                |
| Week 4 | 기능 개발 및 버그 수정                                               |
| Week 5 | API 연동 완료, 최종 버그 수정                                        |
| Week 6 | 코드 리팩토링, 추가 개발 및 최적화                                   |
| Week 7 | 최종 테스트, 발표 준비                                               |
