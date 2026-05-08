import Link from 'next/link';
import { Logo } from './Logo';
import { CONTACT, SNS } from '@/lib/contact';
import { Phone, Clock, Mail, Instagram, Youtube, Facebook, MessageCircle, MapPin } from 'lucide-react';

/**
 * SNS 아이콘 (URL 입력된 채널만 표시).
 */
const SNS_ICONS = [
  { url: SNS.kakaoChannel, Icon: MessageCircle, label: '카카오톡 채널' },
  { url: SNS.naverPlace, Icon: MapPin, label: '네이버 플레이스' },
  { url: SNS.naverBlog, Icon: MessageCircle, label: '네이버 블로그' },
  { url: SNS.instagram, Icon: Instagram, label: '인스타그램' },
  { url: SNS.youtube, Icon: Youtube, label: '유튜브' },
  { url: SNS.facebook, Icon: Facebook, label: '페이스북' },
].filter((s) => s.url);

/**
 * 대전케어 방문요양센터 Footer.
 * 자현 정체성 (로고 + 24시간 + 대표번호 042-369-0326).
 */
export function Footer() {
  return (
    <footer className="bg-white border-t-2 border-[#1B6F4A]/20">
      {/* 24시간 상담 강조 띠 */}
      <div className="bg-gradient-to-r from-[#1B6F4A] to-[#15573A] text-white">
        <div className="max-w-[1200px] mx-auto px-5 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="inline-flex w-9 h-9 rounded-full bg-[#E63946] grid place-items-center text-lg">♥</span>
            <p className="text-lg md:text-xl font-bold">{CONTACT.hours}</p>
          </div>
          {/* Wave 407: aria-label 의도 명확 */}
          <a
            href={CONTACT.phoneTel}
            aria-label={`전화 걸기 대표번호 ${CONTACT.phone} (24시간 상담)`}
            className="hero-cta-pulse flex items-center gap-2 bg-[#E63946] hover:bg-[#C12A37] text-white px-7 py-3 font-bold transition-colors text-lg relative"
            style={{ borderRadius: '2px' }}
          >
            <Phone size={20} />
            대표번호 {CONTACT.phone}
          </a>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Logo size={56} withText />
            <p className="text-sm text-ink-muted leading-relaxed mt-5">
              어르신과 가족을 향한 따뜻한 마음으로,
              <br />
              부모님의 손발이 되어드립니다.
            </p>
          </div>

          {/* 연락처 */}
          <div>
            <p className="font-bold text-ink-primary mb-3">연락처</p>
            <ul className="space-y-2 text-sm text-ink-secondary">
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-[#1B6F4A] mt-1 shrink-0" />
                {/* Wave 354: tel: 링크 — 모바일 one-tap dial */}
                <span>
                  대표번호{' '}
                  <a
                    href={CONTACT.phoneTel}
                    className="font-bold hover:text-[#1B6F4A] hover:underline transition-colors"
                  >
                    {CONTACT.phone}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[#1B6F4A] mt-1 shrink-0" />
                <span>{CONTACT.available}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-[#1B6F4A] mt-1 shrink-0" />
                {/* Wave 354: mailto: 링크 — 메일 클라이언트 자동 열림 */}
                <a
                  href={CONTACT.emailMailto}
                  className="hover:text-[#1B6F4A] hover:underline transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>

          {/* 사업자 정보 — HTML5 <address> semantic (site-wide contact info, Footer 자손).
              Wave 356: <dl> description list로 키-값 구조 표현 (주소/대표자/사업자등록번호/지정번호) */}
          <address className="not-italic">
            <p className="font-bold text-ink-primary mb-3">기관 정보</p>
            <dl className="space-y-2 text-sm text-ink-secondary m-0">
              <div className="flex gap-1.5">
                <dt className="shrink-0">주소:</dt>
                <dd className="m-0">{CONTACT.address}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="shrink-0">대표자:</dt>
                <dd className="m-0">{CONTACT.representative}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="shrink-0">사업자등록번호:</dt>
                <dd className="m-0">{CONTACT.bizNumber}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="shrink-0">장기요양기관 지정번호:</dt>
                <dd className="m-0">{CONTACT.careNumber}</dd>
              </div>
            </dl>
          </address>
        </div>

        {/* SNS 아이콘 (자현이 lib/contact.ts SNS URL 입력 시 자동 활성) */}
        {SNS_ICONS.length > 0 && (
          <nav
            aria-label="SNS 채널"
            className="mt-8 flex items-center gap-3 justify-center md:justify-start"
          >
            <span className="text-xs text-ink-muted">SNS:</span>
            {/* Wave 412: aria-label "새 창" 컨텍스트 (WCAG G201 Wave 411 패턴 saturation) */}
            {SNS_ICONS.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} 외부 사이트 새 창에서 열기`}
                className="w-9 h-9 grid place-items-center bg-gray-50 hover:bg-[#1B6F4A] text-ink-secondary hover:text-white transition-colors"
                style={{ borderRadius: '999px' }}
              >
                <s.Icon size={16} strokeWidth={1.8} />
              </a>
            ))}
          </nav>
        )}

        <div className="border-t border-gray-100 mt-10 pt-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Wave 357: <small> semantic — copyright는 canonical "small print" 영역 (HTML5 spec).
              Wave 373: 최종 업데이트 표시 — SSG build time 자동 갱신, "활성 유지" 신뢰 시그널. */}
          {/* Wave 488: © aria-hidden — visible "COPYRIGHT" + © redundant (SR "copyright sign COPYRIGHT" noise)
           * Wave 491: 영문 부분 lang="en" wrap — Korean SR이 영문 발음 규칙으로 정확 읽기 (WCAG 3.1.2) */}
          <small className="text-xs text-ink-muted block">
            <span lang="en">COPYRIGHT</span> <span aria-hidden="true">©</span> {new Date().getFullYear()} {CONTACT.name} <span lang="en">ALL RIGHTS RESERVED</span>.
            {' '}<span aria-hidden="true">·</span>{' '}
            최종 업데이트{' '}
            <time dateTime={new Date().toISOString().split('T')[0]}>
              {new Date().toISOString().split('T')[0]}
            </time>
          </small>
          {/* Wave 364: <nav> = navigation landmark for 법적 정보 + 사이트맵 (3 cross-page links 그룹) */}
          <nav aria-label="법적 정보 및 사이트맵" className="flex items-center gap-4 text-xs text-ink-muted">
            {/* Wave 455: <a> → <Link> — Lenis smooth scroll + View Transitions + prefetch 활성 */}
            <Link href="/privacy" className="hover:text-[#1B6F4A]">개인정보처리방침</Link>
            <Link href="/terms" className="hover:text-[#1B6F4A]">이용약관</Link>
            <Link href="/sitemap" className="hover:text-[#1B6F4A]">사이트맵</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
