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
export const CONTACT = {
  name: '대전케어 방문요양센터',
  phone: '042-369-0326',
  phoneTel: 'tel:042-369-0326',
  // International format (+82) — JSON-LD MedicalBusiness telephone 등 schema.org 표준용
  phoneIntl: '+82-42-369-0326',
  available: '24시간 상담 가능',
  hours: '24시간 365일 상담 가능',
  email: 'contact@daejeoncare.kr',
  // 🔧 자현 편집
  address: '대전광역시 [구] [동] [도로명주소]',
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
