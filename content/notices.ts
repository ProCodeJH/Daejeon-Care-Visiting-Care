/**
 * 공지사항 데이터 (단일 source of truth).
 * 자현이 새 공지 추가 시 이 배열에 한 항목 추가 → SSG 자동 빌드.
 *
 * Wave 529: phone hardcode → CONTACT.phone derived (paradigm 16 self-audit catch).
 * 자현이 lib/contact.ts PHONE 1줄 변경 시 5 notice body + 모든 derived 필드 자동 갱신.
 */
import { CONTACT } from '@/lib/contact';

export type Notice = {
  id: number;
  title: string;
  body: string;
  author: string;
  date: string;
  views: number;
  pinned?: boolean;
};

export const NOTICES: Notice[] = [
  {
    id: 1,
    title: '대전케어 방문요양센터 모바일 및 홈페이지 오픈♥',
    body: `안녕하세요, 대전케어 방문요양센터입니다.\n\n어르신과 가족 여러분께 더 나은 서비스를 제공하기 위해 모바일 + 홈페이지를 새롭게 오픈하였습니다.\n\n주요 기능:\n· 24시간 상담 가능 (대표번호 ${CONTACT.phone})\n· 본인부담금 계산기\n· 장기요양 등급 신청 절차 안내\n· 요양보호사 채용 정보\n· 자주 묻는 질문 FAQ\n\n앞으로도 어르신과 가족의 일상에 함께하는 따뜻한 케어로 보답하겠습니다.`,
    author: '관리자',
    date: '2026-05-07',
    views: 12,
    pinned: true,
  },
  {
    id: 2,
    title: '2026년 장기요양 본인부담금 변경 안내',
    body: `2026년 장기요양 본인부담금 비율이 일부 변경됩니다.\n\n· 일반 대상자: 15% (기존 동일)\n· 감경 대상자 1차: 9%\n· 감경 대상자 2차: 6%\n· 기초수급자: 0% (기존 동일)\n\n자세한 본인부담금은 본인부담금 계산기 또는 ${CONTACT.phone}으로 문의 주세요.`,
    author: '관리자',
    date: '2026-04-20',
    views: 47,
  },
  {
    id: 3,
    title: '여름철 어르신 건강 관리 안내문',
    body: `폭염이 시작되는 시기, 어르신 건강 관리에 특히 주의해 주세요.\n\n· 충분한 수분 섭취 (하루 1.5L 이상)\n· 한낮 12-15시 외출 자제\n· 시원한 실내 온도 유지 (26-28°C)\n· 가벼운 옷차림 + 모자\n· 어지럼증/두통 즉시 그늘 이동\n\n방문요양 시 매니저가 어르신 상태를 매일 체크합니다.`,
    author: '관리자',
    date: '2026-04-15',
    views: 31,
  },
  {
    id: 4,
    title: '신규 요양보호사 채용 공고',
    body: `대전케어 방문요양센터에서 함께 일하실 요양보호사 선생님을 모십니다.\n\n· 자격: 요양보호사 1급/2급 자격증 보유자\n· 근무지: 대전 5구 (유성·대덕·서구·중구·동구) 본인 거주지 인근\n· 근무시간: 평일/주말 협의 (하루 3-4시간 기본)\n· 신입 환영, 경력자 우대\n\n지원: ${CONTACT.phone} 또는 /jobs/apply`,
    author: '관리자',
    date: '2026-04-01',
    views: 89,
  },
  {
    id: 5,
    title: '센터 운영 시간 변경 안내 (공휴일)',
    body: `2026년 5월 공휴일 운영 일정입니다.\n\n· 5월 1일 (근로자의 날): 정상 운영\n· 5월 5일 (어린이날): 휴무\n· 5월 6일 (대체공휴일): 휴무\n· 5월 13일 (석가탄신일): 휴무\n\n휴무일에도 24시간 상담 가능 (${CONTACT.phone}).`,
    author: '관리자',
    date: '2026-03-25',
    views: 22,
  },
];
