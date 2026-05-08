/**
 * 대전 5구 지점 정보 (자현이 실제 정보로 swap).
 * 매니저 수 + 주소 placeholder + 대표번호 공유 (042-369-0326).
 */
export type Center = {
  slug: string;
  name: string;
  region: string;
  shortName: string;
  managers: number;
  address: string;
  features: string[];
};

export const CENTERS: Center[] = [
  {
    slug: 'yuseong',
    name: '유성구점',
    region: '대전 유성구',
    shortName: '유성',
    managers: 18,
    address: '대전 유성구 [도로명주소], [건물명] [층호]',
    features: ['카이스트 인근', '관평동·노은동 우선 매칭', '대학병원 동행 케어'],
  },
  {
    slug: 'daedeok',
    name: '대덕구점',
    region: '대전 대덕구',
    shortName: '대덕',
    managers: 14,
    address: '대전 대덕구 [도로명주소], [건물명] [층호]',
    features: ['오정동·법동 우선 매칭', '회덕역 도보 5분', '대덕연구단지 인근'],
  },
  {
    slug: 'seo',
    name: '서구점',
    region: '대전 서구',
    shortName: '서구',
    managers: 22,
    address: '대전 서구 [도로명주소], [건물명] [층호]',
    features: ['둔산동·만년동 우선 매칭', '시청·법원 인근', '시청역 도보 3분'],
  },
  {
    slug: 'jung',
    name: '중구점',
    region: '대전 중구',
    shortName: '중구',
    managers: 16,
    address: '대전 중구 [도로명주소], [건물명] [층호]',
    features: ['은행동·대흥동 우선 매칭', '대전역 인근', '구도심 어르신 다수'],
  },
  {
    slug: 'dong',
    name: '동구점',
    region: '대전 동구',
    shortName: '동구',
    managers: 20,
    address: '대전 동구 [도로명주소], [건물명] [층호]',
    features: ['용전동·자양동 우선 매칭', '대전역 도보 7분', '한밭대학교 인근'],
  },
];
