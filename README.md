# 대전케어 방문요양센터 (Daejeon Care)

대전 5구 통합 방문요양 서비스. **두손누리 방문요양센터** 디자인을 1:1로 React 재현하고
대전케어 콘텐츠로 swap한 정적 사이트.

> Tech: Next.js 15 (App Router) + React 19 + Tailwind CSS 3 + Framer Motion + TypeScript

---

## 🚀 빠른 시작

```bash
# 1. 클론
git clone https://github.com/ProCodeJH/Daejeon-Care-Visiting-Care.git
cd Daejeon-Care-Visiting-Care

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행 (port 3012)
npm run dev
```

브라우저에서 [http://localhost:3012](http://localhost:3012) 접속.

---

## 📂 페이지 구조 (17개)

| 그룹 | URL | 설명 |
|---|---|---|
| 메인 | `/` | Hero carousel + 13 섹션 (About / Video / Reviews / Blog / FAQ) |
| 센터소개 | `/about` | 인사말 + 4 가치 |
|  | `/service`, `/homecare` | 서비스 소개 (4 세부 서비스) |
|  | `/process` | 6단계 이용 절차 + 검증절차 |
|  | `/map` | 찾아오시는 길 |
| 노인장기요양보험 | `/insurance` | 정의 + 본인부담금 |
|  | `/insurance/grade` | 등급 6단계 + 신청 절차 |
|  | `/insurance/cost` | 본인부담금 계산기 (인터랙티브) |
| 노인정보 | `/story` | 대전케어 이야기 (블로그 카드) |
|  | `/info` | 요양 정보 (6 주제) |
| 채용 | `/jobs` | 요양보호사 일자리 |
|  | `/jobs/apply` | 지원 폼 |
| 고객센터 | `/notice` | 공지사항 게시판 |
|  | `/qna`, `/contact` | 문의 / 상담 |
|  | `/faq` | 자주 묻는 질문 (아코디언) |

---

## ✏️ 콘텐츠 편집 위치 (자현 운영용)

| 편집 대상 | 파일 | 무엇 |
|---|---|---|
| Hero 카피/이미지 | `components/HeroCarousel.tsx` `SLIDES` 배열 | 슬라이드 카피·BG 이미지 |
| 후기 / 블로그 / FAQ | `app/page.tsx` `REVIEWS` `BLOGS` `FAQS` 배열 | Home의 카드 |
| 6 nav 메뉴 | `components/Header.tsx` `NAV` 배열 | 상단 메뉴·sub-nav |
| 회사 정보 | `components/Footer.tsx` | 주소/TEL/사업자번호/대표자명 |
| YouTube ID | `app/page.tsx` `VIDEO_ID` 상수 | 메인 영상 |
| 본인부담금 | `app/insurance/cost/page.tsx` `MONTHLY_LIMITS` | 등급별 월 한도액 (연도별 갱신) |
| 색상 / 폰트 | `tailwind.config.ts` | brand color (#61B05A), font stack |

---

## 🎨 디자인 토큰

- **Primary green**: `#61B05A` (두손누리 시그니처)
- **Section BG**: `#FFFFFF` / `#F8F8F8` / `#FEFFFD` 교차
- **Font stack**: Pretendard → Apple SD Gothic Neo → Malgun Gothic
- **Border radius**: 2px (두손누리 정확 매칭)

---

## 📦 주요 의존성

- `next@15` — App Router + Turbopack
- `react@19` — Server Components
- `tailwindcss@3` — 디자인 시스템
- `framer-motion@11` — 애니메이션
- `lucide-react` — 아이콘

---

## 🚢 배포

Vercel 권장. 리포 연결 후 자동 배포:

```bash
npx vercel --prod
```

또는 GitHub Actions / 정적 export (`next build && next export`).

---

## 📝 라이선스

자현 (ProCodeJH) 개인 운영. 외부 사용 시 문의.
