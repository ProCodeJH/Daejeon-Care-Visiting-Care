/**
 * 대전케어 방문요양센터 연락처 (단일 source of truth).
 * 자현이 한 곳만 수정하면 사이트 전체 반영.
 */
export const CONTACT = {
  name: '대전케어 방문요양센터',
  phone: '042-369-0326',
  phoneTel: 'tel:042-369-0326',
  available: '24시간 상담 가능',
  hours: '24시간 365일 상담 가능',
  email: 'contact@daejeoncare.kr',
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
