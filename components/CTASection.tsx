import { CONTACT } from '@/lib/contact';
import { Phone } from 'lucide-react';

/**
 * 페이지 하단 통일 CTA — 24시간 상담 + 대표번호 강조.
 */
export function CTASection({
  title = '언제든 문의 주세요.',
  sub = '부모님의 손발이 되어드리겠습니다',
  bg = 'bg-[#f8f8f8]',
}: {
  title?: string;
  sub?: string;
  bg?: string;
}) {
  return (
    // Wave 448: aria-label — section landmark 구분 (다수 sections 페이지에서 SR navigate 명확)
    <section aria-label="상담 문의" className={`${bg} py-16 md:py-20`}>
      <div className="max-w-[1200px] mx-auto px-5 text-center">
        <p className="inline-flex items-center gap-2 text-[#E63946] font-bold text-sm tracking-wider mb-4">
          {/* Wave 448: aria-hidden — ♥ unicode SR "heart" 발음 noise 차단 (decorative) */}
          <span aria-hidden="true" className="w-6 h-6 rounded-full bg-[#E63946] grid place-items-center text-white text-xs">♥</span>
          {CONTACT.available}
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-ink-primary mb-3 leading-snug">
          {title}
        </h2>
        <p className="text-base md:text-xl text-ink-secondary mb-8">{sub}</p>
        <div className="flex justify-center gap-3 flex-wrap">
          {/* Wave 408: aria-label — site-wide CTA, 모든 페이지 하단 영향 */}
          <a
            href={CONTACT.phoneTel}
            aria-label={`전화 걸기 ${CONTACT.phone} (24시간 상담)`}
            className="flex items-center gap-2 bg-[#E63946] hover:bg-[#C12A37] text-white px-8 py-3.5 font-bold transition-colors text-base md:text-lg"
            style={{ borderRadius: '2px' }}
          >
            <Phone size={18} />
            {CONTACT.phone}
          </a>
          <a
            href="/contact"
            className="bg-white border-2 border-[#1B6F4A] hover:bg-[#1B6F4A] hover:text-white text-[#1B6F4A] px-8 py-3 font-semibold transition-colors"
            style={{ borderRadius: '2px' }}
          >
            온라인 문의
          </a>
        </div>
      </div>
    </section>
  );
}
