# 배포 가이드 — 대전케어 방문요양센터

자현이 5분에 끝낼 수 있는 단계별 가이드. Vercel + 대전케어방문요양.kr 도메인.

---

## 🚀 Step 1 — Vercel 배포 (5분)

### 권장: GitHub 자동 연결 (운영 best)

1. **https://vercel.com/new** 접속 (자현 `procodejh` 계정 로그인 상태)
2. **"Import Git Repository"** → `ProCodeJH/Daejeon-Care-Visiting-Care` 선택
3. Project Name: `daejeon-care` (또는 자유) → **Deploy** 클릭
4. ~2분 후 `https://daejeon-care.vercel.app` 같은 URL 발급
5. **이후 commit push 하면 자동 배포** (GitHub Actions 불필요)

**왜 이 방법이 최선?**
- ✅ 매 commit 자동 build + deploy (운영 무신경)
- ✅ PR preview deployment 자동 발급
- ✅ 1-click rollback (실수 시 즉시 복구)
- ✅ 무료 (월 100GB bandwidth + 100 deployments)

### 대안: CLI 직접 배포

```bash
cd web-v3
npx vercel deploy --prod
# 첫 실행 = project 생성 / 이후 = 즉시 prod 배포
```

---

## 🌐 Step 2 — 대전케어방문요양.kr 도메인 (15분)

### 도메인 구매 (자현이 직접)

**한글 .kr 도메인 추천 사업자**:
- **가비아** (https://www.gabia.com) — 가장 대중적, 연 ~22,000원
- **후이즈** (https://whois.co.kr) — 안정적
- **카페24** (https://hosting.cafe24.com) — 호스팅 함께 시 할인

검색: `대전케어방문요양.kr` → 결제 (연 단위).

### Vercel에 도메인 추가

1. Vercel dashboard → Project `daejeon-care` → **Settings** → **Domains**
2. **Add Domain** → `대전케어방문요양.kr` 입력 → Add
3. Vercel이 안내하는 DNS 레코드 2개 복사:
   ```
   A    @    76.76.21.21
   CNAME www  cname.vercel-dns.com
   ```

### 도메인 사업자 DNS 설정

(가비아 기준)
1. 가비아 → My가비아 → 도메인 → 대전케어방문요양.kr → **DNS 정보** → **DNS 관리**
2. 위에서 복사한 레코드 2개 등록
3. ~10분~1시간 propagation 대기
4. Vercel dashboard에서 자동 verify → SSL 자동 발급 (Let's Encrypt)

**완료** → `https://대전케어방문요양.kr` 작동.

---

## Step 2.5 — 관리자 콘텐츠 저장소 연결

`/admin`에서 작성한 고객 후기, 이야기, 공지사항을 운영 사이트 방문자 모두에게 보이게 하려면 Supabase 저장소를 연결한다.

### Supabase SQL 1회 실행

Supabase SQL Editor에서 아래 파일 내용을 실행:

```text
supabase/admin-content-schema.sql
```

실행 전 파일 안의 `CHANGE_ME_ADMIN_CONTENT_SECRET_SHA256`를 운영 관리자 비밀번호의 SHA-256 hex 값으로 바꾼다.
원문 비밀번호는 SQL에 넣지 않는다.
새 테이블은 RLS가 켜져 있고, 공개 방문자는 읽기만 가능하며 쓰기는 관리자 비밀 헤더가 맞을 때만 허용된다.

### Vercel 환경변수

Vercel Project Settings → Environment Variables에 추가:

```env
ADMIN_PASSWORD=<센터장 관리자 비밀번호>
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<Supabase anon 또는 publishable key>
```

SQL의 `CHANGE_ME_ADMIN_CONTENT_SECRET`를 `ADMIN_PASSWORD`와 다른 값으로 설정했다면 아래도 추가:

```env
SUPABASE_ADMIN_CONTENT_SECRET=<SQL에 넣은 별도 저장용 비밀값>
```

`SUPABASE_SERVICE_ROLE_KEY`가 있다면 서버가 우선 사용하지만 필수는 아니다. 브라우저에는 service role key를 절대 노출하지 않는다.

반영 후 production redeploy:

```bash
npx vercel deploy --prod
```

연결 전에도 `/admin`은 브라우저 fallback으로 동작하지만, 운영 도메인에서 모든 방문자에게 공유되는 콘텐츠는 Supabase 연결 후 안정화된다.
`ADMIN_PASSWORD`는 운영에서 필수다. production에서 설정하지 않으면 쓰기 API가 401로 닫힌다.

---

## 🔄 운영 (이후)

### 콘텐츠 수정 후 배포

```bash
cd web-v3
# 1. 텍스트/이미지 swap (lib/contact.ts, app/page.tsx 등)
# 2. 로컬 확인
npm run dev   # http://localhost:3012

# 3. commit + push
git add .
git commit -m "update: 콘텐츠 수정"
git push   # → Vercel 자동 배포 (~2분)
```

### 자현 편집 위치 (10곳)

| 편집 대상 | 파일 |
|---|---|
| 대표번호 / 24시간 / 이메일 / 주소 | `lib/contact.ts` |
| Hero 카피 / BG 이미지 | `components/HeroCarousel.tsx` SLIDES |
| 후기 / 블로그 / FAQ | `app/page.tsx` REVIEWS / BLOGS / FAQS |
| 6 nav 메뉴 + sub-nav | `components/Header.tsx` NAV |
| 회사 정보 (사업자번호 등) | `components/Footer.tsx` + `lib/contact.ts` |
| 본인부담금 한도액 (연도별 갱신) | `app/insurance/cost/page.tsx` MONTHLY_LIMITS |
| 등급 정보 | `app/insurance/grade/page.tsx` GRADES |
| 채용 정보 | `app/jobs/page.tsx` BENEFITS / REQUIREMENTS |
| 공지사항 / 게시글 | `app/notice/page.tsx` NOTICES / `app/story/page.tsx` POSTS |

---

## 🛠 추가 작업 가능

- [ ] Sanity CMS 연결 (자현이 GUI로 콘텐츠 편집, 개발자 없이)
- [ ] 카카오 지도 embed (`/map` 페이지 실제 위치)
- [ ] 카카오 채널톡 위젯 (24시간 상담 강화)
- [ ] Google Search Console 등록 (SEO 노출 추적)
- [ ] 네이버 웹마스터 등록 (네이버 검색 노출)
- [ ] 카카오 비즈니스 등록 (지도 검색 노출)

각 항목 자현 명령 시 진행.

---

## 🚨 Vercel webhook 막혔을 때 (manual redeploy)

**증상**: `git push` 후 Vercel dashboard에 새 deployment 안 뜸.

**원인**: GitHub ↔ Vercel webhook 일시 단절 (계정/권한/Vercel 일시 장애).

**해결 (1분)**:
1. https://vercel.com/gujahyeons-projects/web-v3/deployments 접속
2. 최신 commit 옆 ⋯ 클릭 → **"Redeploy"** → "Use existing build cache" 체크 → Redeploy
3. ~2분 후 production 반영

**영구 fix (10분)**:
1. https://vercel.com/gujahyeons-projects/web-v3/settings/git
2. **"Disconnect"** → **"Reconnect with GitHub"**
3. ProCodeJH 계정 권한 재승인 → repository 선택 → 저장
4. 이후 `git push` 자동 deploy 정상화

---

## 📞 문제 시

배포 실패 / DNS 미작동 / 빌드 에러 등 → 자현이 명령 주면 즉시 fix.
