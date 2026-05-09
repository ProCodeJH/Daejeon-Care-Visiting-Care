/**
 * 공지사항 데이터 (단일 source of truth).
 * 자현이 새 공지 추가 시 이 배열에 한 항목 추가 → SSG 자동 빌드.
 *
 * Wave 529: phone hardcode → CONTACT.phone derived.
 * Wave 575: 5건 → 1건 정리 (홈페이지 오픈만) + 저작권 회피 자체 표현.
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
    title: `${CONTACT.name} 홈페이지 오픈 인사`,
    body: `반갑습니다. ${CONTACT.name}입니다.\n\n어르신과 가족분들께 더 가까이 다가가기 위해 홈페이지를 새로 시작했습니다.\n\n홈페이지에서 가능한 것:\n· 24시간 전화 상담 (대표 ${CONTACT.phone})\n· 본인부담금 자동 계산\n· 장기요양 등급 신청 안내\n· 요양보호사 채용 지원\n· 자주 묻는 질문 모음\n\n앞으로도 댁으로 직접 찾아가는 따뜻한 케어로 함께하겠습니다.\n\n언제든 편하게 연락 주세요.`,
    author: '관리자',
    date: '2026-05-07',
    views: 12,
    pinned: true,
  },
];
