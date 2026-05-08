import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { StatsCounter } from '@/components/StatsCounter';
import { Reveal } from '@/components/Reveal';

const VALUES = [
  {
    title: '깊이 이해합니다',
    desc: '나이가 들어감에 따른 변화와 새로운 적응을 깊이 이해합니다.',
  },
  {
    title: '존중하며 고려합니다',
    desc: '어르신들의 살아오신 날들만큼 다양한 경험과 취향을 존중하며 고려합니다.',
  },
  {
    title: '전문성과 성실',
    desc: '마음만으로는 부족할 수 있는 부분들을 위한 전문성과 성실을 위해 노력합니다.',
  },
  {
    title: '친구이자 서포터',
    desc: '어르신들의 친구이자 서포터가 되어 필요를 채워드립니다.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="인사말"
        sub="부모님의 손발이 되겠습니다"
        crumbs={[{ label: '센터소개', href: '/about' }, { label: '인사말' }]}
      />

      {/* 인사말 본문 */}
      <section className="bg-white py-20">
        <div className="max-w-[900px] mx-auto px-5">
          <SectionBlock
            eyebrow="GREETING"
            title={
              <>
                <span className="text-brand-400">대전케어</span>는
                <br />
                부모님을 향한 마음에서 출발했습니다
              </>
            }
            sub={
              <>
                대전케어는 대전 지역에서 운영하는 실버전문서비스 브랜드입니다.
                <br />
                일상생활에서 불편함을 느끼시는 분들에게 정부 지원을 받는 기회를 소개하고,
                <br className="hidden md:inline" />
                마음에 맞는 요양보호사님들을 연결해 드립니다.
              </>
            }
          />

          <div className="mt-12 space-y-5 text-ink-secondary leading-loose md:text-lg">
            <p>
              대전케어는, 저희의 부모님을 향한 마음에서 출발한 만큼{' '}
              <strong className="text-ink-primary">한 분 한 분 정성을 다합니다.</strong>
            </p>
            <p>만나 뵙기를 기대하고 기다립니다. 감사합니다.</p>
          </div>
        </div>
      </section>

      {/* 신뢰 지표 4개 — StatsCounter (whileInView 카운트) */}
      <section className="bg-white pb-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-gray-100 py-10">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-[#1B6F4A] mb-2 tabular-nums">
                <StatsCounter value={5} suffix="구" />
              </p>
              <p className="text-sm text-ink-muted font-medium">대전 5구 통합</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-[#1B6F4A] mb-2 tabular-nums">
                <StatsCounter value={24} suffix="시간" />
              </p>
              <p className="text-sm text-ink-muted font-medium">365일 상담 가능</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-[#1B6F4A] mb-2 tabular-nums">
                <StatsCounter value={90} suffix="+명" />
              </p>
              <p className="text-sm text-ink-muted font-medium">자격 매니저</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold text-[#1B6F4A] mb-2 tabular-nums">
                <StatsCounter value={100} suffix="%" />
              </p>
              <p className="text-sm text-ink-muted font-medium">무료 상담 + 등급 신청 동행</p>
            </div>
          </div>
        </div>
      </section>

      {/* 가치 4개 */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <SectionBlock
            eyebrow="OUR VALUES"
            title="대전케어가 일하는 마음"
            sub="어르신과 가족 모두에게 신뢰받는 서비스를 위해"
            className="mb-12"
          />
          <div className="grid md:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <Reveal
                key={i}
                delay={i * 0.08}
                className="bg-white p-7 border-l-4 border-brand-600 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-50 grid place-items-center text-brand-600 font-bold shrink-0">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-ink-primary mb-2">{v.title}</h3>
                    <p className="text-ink-secondary leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="만나 뵙기를 기다립니다" sub="언제든 편하게 문의 주세요" />
    </>
  );
}
