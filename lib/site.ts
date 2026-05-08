/**
 * Site-level config (단일 source of truth).
 * 자현이 도메인 변경 시 여기만 수정 → metadata + sitemap + robots + JSON-LD 자동 반영.
 *
 * 🔧 자현 편집:
 *   - url: production canonical 도메인 (한글 도메인 사용 중)
 *   - urlFallback: Vercel 자동 도메인 (한글 도메인 DNS 문제 시 backup, 직접 활용은 자현 필요 시)
 *   - locale/lang: 다국어 확장 시 변경 (현재 ko 전용)
 */
const URL = 'https://대전케어방문요양.kr';

export const SITE = {
  url: URL,
  /** protocol 제거 — OG image / Footer / 기타 표시용 (Wave 531 derived). */
  domain: URL.replace(/^https?:\/\//, ''),
  /** Vercel default URL — 한글 도메인 SSL 문제 시 fallback. 현재 코드 활용 X, 자현 reference. */
  urlFallback: 'https://daejeon-care.vercel.app',
  locale: 'ko_KR',
  lang: 'ko',
} as const;
