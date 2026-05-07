/**
 * 페이지 하단 통일 CTA — "언제든 문의 주세요" 패턴.
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
    <section className={`${bg} py-16 md:py-20`}>
      <div className="max-w-[1200px] mx-auto px-5 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-ink-primary mb-3 leading-snug">
          {title}
        </h2>
        <p className="text-base md:text-xl text-ink-secondary mb-8">{sub}</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <a
            href="/contact"
            className="bg-brand-400 hover:bg-brand-500 text-white px-8 py-3.5 font-semibold transition-colors"
            style={{ borderRadius: '2px' }}
          >
            무료 상담 신청
          </a>
          <a
            href="tel:042-000-0000"
            className="bg-white border border-brand-400 hover:bg-brand-50 text-brand-400 px-8 py-3.5 font-semibold transition-colors"
            style={{ borderRadius: '2px' }}
          >
            전화 상담
          </a>
        </div>
      </div>
    </section>
  );
}
