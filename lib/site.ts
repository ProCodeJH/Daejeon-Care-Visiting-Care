/**
 * Site-level config (단일 source of truth).
 * 자현이 도메인 변경 시 여기만 수정 → metadata + sitemap + robots + JSON-LD 자동 반영.
 */
export const SITE = {
  url: 'https://대전케어방문요양.kr',
  urlFallback: 'https://daejeon-care.vercel.app',
  locale: 'ko_KR',
  lang: 'ko',
} as const;
