/**
 * 본점 정보 (단일 지점 운영).
 * Wave 575: 5구 지점 → 본점 1곳화. 매니저는 어르신 거주지 인근으로 매칭.
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
    slug: 'main',
    name: '본점',
    region: '대전 대덕구',
    shortName: '본점',
    managers: 90,
    address: '대전광역시 대덕구 신탄진로 808',
    features: [
      '대전 5구 전 지역 매니저 매칭',
      '신탄진역 도보 이동 가능',
      '경부선 신탄진IC 인근 자차 진입',
      '24시간 전화 상담',
    ],
  },
];
