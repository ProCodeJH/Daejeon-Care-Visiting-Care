/**
 * CVS Oak Street Health 패턴 — 보험사/공단 로고 + 통계.
 * Senior healthcare 신뢰 신호 (Lazyweb 0.38 similarity).
 */
const STATS = [
  { num: '5', unit: '개 지점', sub: '대전 전 구' },
  { num: '90+', unit: '자격 매니저', sub: '요양보호사 1급' },
  { num: '12', unit: '년', sub: '재가복지 운영' },
  { num: '100%', unit: '무료 상담', sub: '비용 안내까지' },
];

const PARTNERS = [
  { label: '국민건강보험공단', logo: '🏛️' },
  { label: '장기요양보험', logo: '🛡️' },
  { label: '대전광역시', logo: '🏢' },
  { label: '의료급여', logo: '⚕️' },
];

export function TrustSignals() {
  return (
    <section className="bg-surface-paper py-16 border-y border-surface-vellum">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {STATS.map((s) => (
            <div key={s.unit} className="text-center">
              <p className="text-4xl md:text-5xl font-bold text-sage-700 mb-1">{s.num}</p>
              <p className="font-semibold text-ink-primary">{s.unit}</p>
              <p className="text-xs text-ink-muted mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-surface-vellum pt-8">
          <p className="text-center text-sm text-ink-muted mb-5">공식 등록 / 협력 기관</p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 opacity-70">
            {PARTNERS.map((p) => (
              <div key={p.label} className="flex items-center gap-2 text-sm">
                <span className="text-2xl">{p.logo}</span>
                <span className="font-medium">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
