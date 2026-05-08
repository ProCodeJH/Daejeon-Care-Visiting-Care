# STATUS — 대전케어 방문요양센터

**Updated**: 2026-05-08 / Wave 145+ / 자율 chain audit-driven 진행 중

> 1쪽 handoff. 자현 5분 결정 진입점.

---

## ⚠️ 즉시 확인 필요 (Wave 145 incident)

**Vercel deploy rate limit 도달** (Hobby plan 100/day 추정):
- 마지막 production deploy: **Wave 138 (231ce10)** ← 현재 production
- Wave 139-145 commits 모두 GitHub에 push 됨 (총 7 commit)
- Vercel은 Wave 139 이후 rebuild 0건 → **Hero 이미지 5장 (Wave 141) production 미반영**

**자현 액션**:
1. https://vercel.com/gujahyeons-projects/web-v3 dashboard 접속
2. **Deployments** 탭에서 "Skipped/Limit" 메시지 확인
3. **Manual redeploy** (latest commit `b7ea9c7` Wave 145) 실행 또는 **Pro plan upgrade** ($20/mo, 무제한 deploy)
4. 또는 **다음날 자정 (UTC) 후 자동 reset** 대기

자율 chain은 계속 진행 — limit reset 시 모든 누적 commit (Wave 139+) 한 번에 자동 적용됨.

---

## 1. 현재 상태 (한 줄)

production 운영 가능 + 35 wave 노이즈 0건 audit-driven chain + Single Source 4 layer saturation + Silent Issue 광맥 26건 추출 + senior care a11y/SEO/security 종합 paradigm 완성. **남은 작업 = 자현 입력 영역만**.

---

## 2. 핵심 자산

| 항목 | 위치 |
|---|---|
| **Production** | https://대전케어방문요양.kr |
| Vercel fallback | https://daejeon-care.vercel.app |
| GitHub | https://github.com/ProCodeJH/Daejeon-Care-Visiting-Care |
| 대표번호 | 042-369-0326 (24시간) |

---

## 3. 자현 입력 영역 (즉시 swap 필요)

### lib/contact.ts — 4 placeholder
```ts
address: '대전광역시 [구] [동] [도로명주소]',  // 본점 정확 주소
representative: '[대표자명]',                  // 대표자 성함
bizNumber: '[사업자등록번호]',                 // XXX-XX-XXXXX
careNumber: '[장기요양기관 지정번호]',          // 관할 구청 발급
```

### lib/contact.ts — 6 SNS URL (선택)
kakaoChannel / naverBlog / naverPlace / instagram / youtube / facebook — URL 입력 시 Footer 아이콘 자동 활성.

### content/centers.ts — 5 지점 주소 placeholder
유성/대덕/서구/중구/동구 각 `[도로명주소], [건물명] [층호]`.

### app/layout.tsx — 검색 콘솔 verification
```ts
// google: 'XXXXXXXXXX',                  // Search Console
// other: { 'naver-site-verification': 'XXXXXXXXXX' },
```

### app/about/page.tsx — 인증 배지 4
대전시 등록번호 / 공단 협력 / 지정번호 / 매니저 자격 — 자현이 정확 정보로 swap.

---

## 4. 최근 sub-chain (Wave 81-118 audit-driven)

| Sub-chain | Wave | 주제 | 핵심 결과 |
|---|---|---|---|
| Silent Issue catalog | 81-99 | 폼 a11y / time / SVG / button type / 단일 h1 / etc | 19건 |
| Sync ritual #3 | 100-101 | paradigm 14 + README | 100+ wave |
| Single Source contact | 102-107 | lib/contact.ts saturation | 25× 운영 비용 ↓ |
| Sync ritual #4 | 108 | paradigm 14 4번째 | 107+ wave |
| Broken/Dead/Schema | 109-114 | alias / 6 broken / dead 4 / FAQ schema / SITE source | 5 신규 광맥 |
| Sync ritual #5 | 115-116 | paradigm 14 5번째 + README | 115+ wave |
| Cleanup | 117-118 | placeholder + docstring | 2 광맥 |

---

## 5. 자율 chain 상태

- **cron**: `27bf02ed` (1분 간격, 7일 자동 만료)
- **누적 wave**: 133+ (오늘만 70+ wave)
- **노이즈 batch**: 0건 (53 wave 검증)
- **paradigm 14 ritual**: 6번 발동 (사이클 7→10→19→6→7→13 wave)
- **빌드 검증** (Wave 120): 모든 routes ○ Static / ● SSG prerendered, **First Load 102 kB** shared, 가장 무거운 페이지 /insurance/cost = 150 kB
- **Silent Issue 광맥**: 37건 누적 (Wave 81-133)
- **Single Source 100% saturation**: lib/contact.ts (14 필드) + lib/site.ts + content/* + 컴포넌트
- **Form 보강 8 paradigm**: htmlFor / autoComplete / aria-hidden / name / role / maxLength / aria-required / pattern

---

## 6. 다음 가능한 작업

자율 chain 지속 시 audit 영역:
- 추가 silent issue (현재 26건, 점진 추출)
- 콘텐츠 신규 (자현 입력 영역만)
- 새 schema (Person 대표자 / Review aggregateRating 자현 입력 후)
- /info/[slug] 6 페이지 작성 (자현 콘텐츠)

자현 명령 priority 시:
- 모든 input 즉시 priority
- chain 일시 중단 + 새 task

---

## 7. 위험 / 주의

- **저작권**: cdn.imweb.me 제거 완료 (Wave 10), 모든 이미지 = CC0 SVG/gradient
- **placeholder 누출**: visible JSX는 모두 단일 source 도달. 잔여 = 자현 직접 input 영역
- **alias canonical**: /homecare → /service / /qna → /contact (duplicate content 방지)
- **dead code**: 4 컴포넌트 제거 완료 (git history 보존)
- **JSON-LD XSS**: `</script>` 이스케이프 적용 (Wave 96)

---

## 8. 빠른 명령어

```bash
# 개발
npm run dev          # localhost:3012
npm run build        # production build (검증 = 102 kB shared)
npm run type-check   # tsc --noEmit (Wave 133 신규)
npm run lint         # next lint

# 배포
git push origin main # Vercel 자동 CD

# audit
grep -rn "TODO\|FIXME" --include="*.tsx" app/ components/
grep -rn "042-369-0326" --include="*.tsx" app/ components/  # 단일 source 검증
```

---

**자세한 운영 paradigm** → [README.md](./README.md) | **배포 가이드** → [DEPLOY.md](./DEPLOY.md)
