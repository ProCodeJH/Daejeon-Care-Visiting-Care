/**
 * 대전케어 방문요양센터 연락처 (단일 source of truth).
 * 자현이 한 곳만 수정하면 사이트 전체 반영.
 *
 * 🔧 자현 편집 필요 필드 (대괄호 [...] 표시):
 *   - address: 본점 정확한 주소 입력
 *   - representative: 대표자 성함
 *   - bizNumber: 사업자등록번호 (XXX-XX-XXXXX 형식)
 *   - careNumber: 장기요양기관 지정번호 (관할 구청 발급)
 *
 * ✅ 자동 적용 위치:
 *   - Footer 사업자 정보 4 필드
 *   - About 인증 배지 (지정번호 자리)
 *   - JSON-LD MedicalBusiness (StructuredData.tsx)
 *   - Privacy/Terms 페이지 사업자 정보
 */
// Wave 480: PHONE + EMAIL 단일 source — derived fields (phoneTel/phoneIntl/emailMailto) 자동 동기화.
// 자현이 PHONE/EMAIL 1줄 변경 시 모든 derived 필드 자동 갱신 (paradigm 16 single source 강화).
// Wave 533: BRAND/SERVICE 분리 — name + brand 동시 derived. 자현이 brand 변경 시 stories cat (대전케어 이야기/일상)
// + notices title/body + 모든 metadata 자동 갱신.
const PHONE = '042-369-0326';
const EMAIL = 'contact@daejeoncare.kr';
const BRAND = '대전케어';
const SERVICE = '방문요양센터';

export const CONTACT = {
  name: `${BRAND} ${SERVICE}`,
  brand: BRAND,
  service: SERVICE,
  phone: PHONE,
  phoneTel: `tel:${PHONE}` as const,
  // International format (+82) — JSON-LD MedicalBusiness telephone 등 schema.org 표준용 (leading 0 제거)
  phoneIntl: `+82-${PHONE.slice(1)}` as const,
  available: '24시간 상담 가능',
  hours: '24시간 365일 상담 가능',
  email: EMAIL,
  // Wave 354: mailto: 링크용 (Footer + Contact 페이지 one-tap email 사용)
  emailMailto: `mailto:${EMAIL}` as const,
  /** 자격 매니저 수 (marketing copy "{managerCount}+명" 용도). 자현 비즈니스 성장 시 업데이트. */
  managerCount: 90,
  // 🔧 자현 편집
  address: '대전광역시 대덕구 신탄진로 808',
  representative: '[대표자명]',
  bizNumber: '[사업자등록번호]',
  careNumber: '[장기요양기관 지정번호]',
} as const;

/**
 * SNS 채널 (자현 채널 활성 시 URL 입력).
 * 빈 문자열 = Footer에 아이콘 숨김.
 */
export const SNS = {
  kakaoChannel: '', // 예: 'https://pf.kakao.com/_xxxXxX'
  naverBlog: '',    // 예: 'https://blog.naver.com/daejeoncare'
  naverPlace: '',   // 예: 'https://map.naver.com/v5/entry/place/...'
  instagram: '',    // 예: 'https://instagram.com/daejeoncare'
  youtube: '',      // 예: 'https://youtube.com/@daejeoncare'
  facebook: '',     // 예: 'https://facebook.com/daejeoncare'
} as const;
