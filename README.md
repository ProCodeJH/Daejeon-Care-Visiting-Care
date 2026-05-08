# 대전케어 방문요양센터

대전 5구 통합 방문요양센터 운영 사이트. **두손누리 디자인을 1:1 React로 재현 + 100+ Wave 자율 폴리시 + production hardening (print/PWA shortcuts/error 3-layer/high-contrast a11y) + Voice Assistant 음성 안내 (Speakable schema) + Web Share API (KakaoTalk 단톡 공유) + JSON-LD 7종 + 28 URLs canonical 일관성 + Silent Issue 광맥 19건 추출 (form htmlFor/aria/<time>/blockquote/JSON-LD escape) + 정체성 6-way pulse paradigm + Vercel 자동 배포 + 한국 법적 compliance**.

> **Production**: https://대전케어방문요양.kr  
> **대표번호**: 042-369-0326 (24시간 상담 가능)  
> **GitHub**: https://github.com/ProCodeJH/Daejeon-Care-Visiting-Care

---

## 🚀 빠른 시작

```bash
git clone https://github.com/ProCodeJH/Daejeon-Care-Visiting-Care.git
cd Daejeon-Care-Visiting-Care
npm install
npm run dev   # http://localhost:3012
```

---

## 🛠 Tech Stack

- **Next.js 15** App Router (SSG · 35+ static pages)
- **React 19** Server Components
- **TypeScript 5** strict
- **Tailwind CSS 3** 디자인 시스템
- **framer-motion 11** 모션
- **Lenis 1.1** smooth scroll (duration 1.4 / lerp 0.085)
- **Pretendard Variable** 한국어 가변 폰트
- **lucide-react** 아이콘

**빌드**: 50+ routes static · 0 warning · **102kB shared / 148kB Home First Load**

---

## 📂 페이지 (29 routes)

### 정적 페이지 (17)
- `/` Home (Hero carousel + Stats + 13 섹션)
- `/about` 인사말 + 4 가치 + Stats 4 신뢰 지표
- `/service` `/homecare` 서비스 소개 + 4 세부 서비스
- `/process` 6단계 이용 절차 + 4 검증절차
- `/insurance` 노인장기요양보험 (정의 + 본인부담금 + 대상/지원/목적)
- `/insurance/grade` 6 등급 + 5단계 신청
- `/insurance/cost` 인터랙티브 본인부담금 계산기
- `/centers` 대전 5구 지점 (유성/대덕/서구/중구/동구)
- `/story` 대전케어 이야기 (블로그 list)
- `/info` 노인 정보 (6 주제)
- `/jobs` 요양보호사 채용 + `/jobs/apply` 지원 폼
- `/notice` 공지사항 + 검색
- `/contact` `/qna` 문의 폼
- `/faq` 자주 묻는 질문
- `/map` 찾아오시는 길

### Dynamic SSG (11)
- `/notice/[id]` × 5
- `/story/[id]` × 6

### 약관 + Sitemap
- `/privacy` 개인정보처리방침 (한국 개인정보보호법 표준)
- `/terms` 이용약관 (한국 senior care 표준 10조)
- `/sitemap` HTML 사용자 친화 페이지

### Meta routes
- `/sitemap.xml` 30+ URLs (자동 갱신)
- `/robots.txt` Google/Naver/Daum 허용 + 26 AI bots 차단
- `/icon` `/apple-icon` `/opengraph-image` Next.js native ImageResponse
- `/manifest.webmanifest` PWA-lite

---

## ✏️ 자현 편집 위치 (단일 source paradigm)

**한 파일만 수정 = 사이트 전체 자동 반영** (list / detail / Home 섹션 / sitemap / JSON-LD).

| 편집 대상 | 파일 |
|---|---|
| **연락처** (대표번호/24시간/이메일/주소) | `lib/contact.ts` `CONTACT` |
| **SNS 6 채널** (카카오/네이버/인스타/유튜브 등) | `lib/contact.ts` `SNS` |
| **공지사항** (id/title/body/date) | `content/notices.ts` |
| **블로그 글** (id/title/body/cat) | `content/stories.ts` |
| **FAQ** (cat/q/a) | `content/faqs.ts` |
| **5구 지점** (slug/name/managers/features) | `content/centers.ts` |
| **Hero 카피/이미지** | `components/HeroCarousel.tsx` SLIDES |
| **6 nav 메뉴** | `components/Header.tsx` NAV |
| **회사 정보** (사업자번호/대표자명) | `components/Footer.tsx` |
| **YouTube 영상 ID** | `app/page.tsx` VIDEO_ID |
| **본인부담금 한도액** (연도별 갱신) | `app/insurance/cost/page.tsx` MONTHLY_LIMITS |
| **등급 정보** | `app/insurance/grade/page.tsx` GRADES |
| **개인정보처리방침** | `app/privacy/page.tsx` |
| **이용약관** | `app/terms/page.tsx` |

---

## 🧬 핵심 컴포넌트 (재사용 가능, 13개)

| 컴포넌트 | 역할 |
|---|---|
| `Reveal` | whileInView once stagger entry |
| `SplitText` | 한글 글자 단위 char stagger |
| `StatsCounter` | once whileInView 0 → target 카운트 |
| `AnimatedNumber` | every-change 부드러운 transition |
| `MagneticButton` | hover 시 max 6px 끌림 |
| `TiltCard` | hover rotateX/Y max 2deg (절제) |
| `FloatingCallButton` | scroll 200px+ 등장 + pulse halo |
| `SmoothScroll` | Lenis 1.4s / 0.085 lerp |
| `ScrollProgress` | 2px gradient 띠 (정체성 3색) |
| `StructuredData` | JSON-LD MedicalBusiness |
| `BreadcrumbJsonLd` | JSON-LD BreadcrumbList |
| `FaqJsonLd` | JSON-LD FAQPage |
| `WebVitals` | LCP/CLS/FCP PerformanceObserver |

---

## 🎨 자현 정체성 + 디자인 토큰

### 자현 정체성 색 (보존)
- `#1B6F4A` 그린 (로고 손바닥, 24시간 띠)
- `#E63946` 코랄 (로고 하트, 대표번호 CTA)
- `#F5A623` 노랑 (로고 어르신, 5★ rating)

### UI 블루 시스템 (의료 신뢰)
- `brand-50` ~ `brand-900` (Tailwind blue-* 11-step)
- `brand-600` `#2563EB` primary

### 폰트
- Pretendard Variable (wght 100-900) — 한국어 가독성
- font-feature-settings: ss06, ss03

---

## 🎬 차세대 Motion (선별 적용)

### ✅ Senior care 적합
- Lenis smooth scroll · Reveal stagger · ScrollProgress
- SplitText char stagger · variable font wght hover
- mask-image dissolve · letterbox cinematic · radial halo
- TiltCard 2deg · MagneticButton 6px · FloatingCallButton pulse
- glass header (backdrop-filter) · scroll-snap proximity
- color-mix(in oklab) · @starting-style · View Transitions
- container queries · animation-timeline: view() (Chrome 115+)

### ❌ 부적합 (절제)
- WebGL 7-stack · 120 particles · pointer trail
- kinetic marquee · konami code · command palette
- idle ambient · L-system fractal

---

## 🛡 SEO + 보안

- JSON-LD: MedicalBusiness · WebSite · BreadcrumbList · FAQPage
- sitemap.xml: 28+ URLs (자동 갱신)
- robots.txt: 26 AI bots 차단 + Google/Naver/Daum 허용
- Speculation rules: 5 nav 페이지 prerender
- DNS prefetch: jsdelivr/youtube/ytimg
- HTTPS Let's Encrypt 자동 (Vercel)
- Web Vitals: LCP/CLS/FCP 측정

---

## 🔄 운영 워크플로우

```bash
# 1. 콘텐츠 수정 (예: content/faqs.ts에 새 FAQ 추가)
# 2. 로컬 확인 (옵션)
npm run dev   # http://localhost:3012

# 3. 자동 배포
git add . && git commit -m "update: 새 FAQ" && git push
# → Vercel 자동 build + deploy → 2분 후 https://대전케어방문요양.kr 반영
```

---

## 📦 배포 인프라

- **Vercel**: team `gujahyeons-projects` · project `web-v3`
- **GitHub**: `ProCodeJH/Daejeon-Care-Visiting-Care` (auto CD)
- **도메인**: `대전케어방문요양.kr` (가비아 A record `76.76.21.21`) + `daejeon-care.vercel.app`
- **SSL**: Let's Encrypt 자동

---

## 📝 라이선스

자현 (ProCodeJH) 운영. 외부 사용 시 문의.

---

## 🆕 Wave 54-76 확장 sub-chain (2026-05-08 자율)

**Cross-page paradigm 9 페이지 saturation** (Wave 54-63): /about · /service · /process · /insurance · /jobs · /info · /faq · /centers · /map 모두 "다음 단계 추천" 섹션 — 사용자 흐름 + SEO internal linking.

**Production hardening** (Wave 64-68):
- /jobs/apply post-conversion retention (submitted 상태에만 About + Story 추천)
- Print stylesheet (가족 출력 → 어르신과 상의)
- PWA manifest production-grade (long-press shortcuts: 비용 / 지점 / 문의)
- Error 3-layer (404 + error.tsx + global-error.tsx)
- High contrast a11y (저시력 어르신 — `prefers-contrast: more` + `forced-colors: active`)

**Voice + Share + Schema** (Wave 70-76):
- Speakable JSON-LD (Google Voice Assistant / Naver Clova / Siri 음성 읽기) — h1 + `[data-speakable]`
- Web Share API (모바일 네이티브 share sheet → KakaoTalk 단톡)
- 단일 h1 paradigm fix (story/notice detail SEO+a11y)
- Article JSON-LD (BlogPosting 6 + NewsArticle 5)
- Speculation rules 12 페이지 prerender
- /insurance/cost 결과 ShareButton (가족 단톡에 본인부담금 즉시 공유)

**JSON-LD 7종**: MedicalBusiness · WebSite · BreadcrumbList · FAQPage · HowTo · Speakable · Article.

---

## 🔍 Wave 81-99 Silent Issue 광맥 19건 (2026-05-08 audit-driven)

자율 chain 19 wave 동안 노이즈 0건 — 매 wave 새 영역 silent issue 추출:

| # | Wave | Issue | Fix |
|---|---|---|---|
| 1 | 81 | 인쇄 button missing | `window.print()` + `print:hidden` self-suppress |
| 2 | 82 | 페이지 이동 시 계산값 손실 | sessionStorage persist |
| 3 | 83 | 인지등급 부정확 | "인지지원등급" full name |
| 4 | 84 | /contact form `htmlFor` 없음 | label-input id 페어링 |
| 5 | 85 | /jobs/apply form `htmlFor` 없음 | label-input id 페어링 + autoComplete |
| 6 | 86 | `rel="noopener"` 없음 | rel="noopener noreferrer" 명시 |
| 7 | 86 | RESOURCES `#` placeholder | longtermcare/daejeon/bokjiro/nhis 정식 URL |
| 8 | 87 | `<time dateTime>` semantic 없음 | notice/story list + home reviews |
| 9 | 88 | SVG aria-hidden vs aria-label 혼동 | 조건부 spread paradigm (Logo) |
| 10 | 89 | `<button>` type=submit 함정 | 모든 button type="button" 명시 |
| 11 | 89 | accordion ARIA 없음 | aria-expanded + aria-controls + role=region |
| 12 | 90 | 햄버거 disclosure pattern 부족 | aria-expanded + aria-controls + 동적 label |
| 13 | 91 | nav landmark 구분 없음 | aria-label 4 nav (주메뉴/모바일/breadcrumb/SNS) |
| 14 | 92 | asterisk * 스크린리더 노이즈 | aria-hidden + required 속성 의존 |
| 15 | 92-93 | form name 속성 부재 | 모든 input/checkbox/radio name + value |
| 16 | 93 | radio/checkbox group role 없음 | role=radiogroup / role=group + aria-label |
| 17 | 94 | search semantic 없음 | `<form role="search">` + type="search" + name="q" |
| 18 | 95 | testimonial semantic 없음 | `<blockquote>` + `<cite>` HTML5 표준 |
| 19 | 96 | JSON-LD `</script>` XSS 위험 | `<` → `<` 이스케이프 |

추가 SEO/canonical 일관성 (Wave 97-99): 28 URLs `alternates.canonical` + `openGraph.type='article'` + 5 client segment layout.tsx.

**Audit-driven paradigm 검증**: 19 wave 노이즈 0건 + lazyweb research보다 자체 코드 audit가 senior care 한국 도메인 깊이로 더 효과적.

---

**자세한 배포 가이드** → [DEPLOY.md](./DEPLOY.md)
