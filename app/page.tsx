'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Phone, Quote, Star } from 'lucide-react';
import { HeroCarousel } from '@/components/HeroCarousel';
import { Reveal } from '@/components/Reveal';
import { TiltCard } from '@/components/TiltCard';
import { MagneticButton } from '@/components/MagneticButton';
import { StatsCounter } from '@/components/StatsCounter';
import { FaqJsonLd } from '@/components/FaqJsonLd';
import { FAQS as ALL_FAQS } from '@/content/faqs';
import { STORIES } from '@/content/stories';
import { CONTACT } from '@/lib/contact';
import {
  ADMIN_CONTENT_EVENT,
  fetchAdminContent,
  getStoryUrl,
  sortByDateDesc,
  type AdminReview,
  type AdminStory,
  type ManagedStory,
} from '@/lib/admin-content';

/**
 * 두손누리 home 1:1 layout (Playwright 측정 기반):
 * 13 sections × 5885px @ 1440 viewport.
 * BG 교차 (white / #f8f8f8 / #fefffd) + green accent #61B05A.
 */

/**
 * 자현이 daejeon-care 자체 YouTube 영상 추가 시 ID swap.
 * 빈 문자열 = placeholder card 표시 (저작권 0).
 */
const VIDEO_ID = ''; // 예: 'abc123XYZ'

const DEFAULT_REVIEWS: AdminReview[] = [
  {
    id: 'default-review-1',
    text: '상담 때 요청사항을 자세히 물어봐주셨어요. 대화가 많은 분이 좋으신지, 식사는 짜게 드시는지 물어봐 주셔서 좋았습니다.',
    author: '보호자 김OO 님',
    tag: '방문요양',
    rating: 5,
    date: '2026.04',
    createdAt: '2026-04-01T00:00:00.000Z',
    updatedAt: '2026-04-01T00:00:00.000Z',
  },
  {
    id: 'default-review-2',
    text: '어머니께서 처음에는 낯설어 하셨는데 요양보호사 선생님이 정말 친근하게 다가가 주셔서 금방 적응하셨어요.',
    author: '보호자 박OO 님',
    tag: '정서 지원',
    rating: 5,
    date: '2026.03',
    createdAt: '2026-03-01T00:00:00.000Z',
    updatedAt: '2026-03-01T00:00:00.000Z',
  },
  {
    id: 'default-review-3',
    text: '서비스 이용 절차가 복잡할 줄 알았는데 센터에서 등급 신청부터 하나하나 친절하게 도와주셔서 감사했습니다.',
    author: '보호자 이OO 님',
    tag: '등급 신청',
    rating: 5,
    date: '2026.02',
    createdAt: '2026-02-01T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z',
  },
];

// Home FAQ 섹션 = faqs 첫 4개 (전체 7개는 /faq 페이지)
const FAQS = ALL_FAQS.slice(0, 4);

export default function Home() {
  const [adminReviews, setAdminReviews] = useState<AdminReview[]>([]);
  const [adminStories, setAdminStories] = useState<AdminStory[]>([]);

  useEffect(() => {
    const loadAdminContent = async () => {
      const snapshot = await fetchAdminContent();
      setAdminReviews(snapshot.reviews);
      setAdminStories(snapshot.stories);
    };
    void loadAdminContent();
    window.addEventListener(ADMIN_CONTENT_EVENT, loadAdminContent);
    window.addEventListener('storage', loadAdminContent);
    return () => {
      window.removeEventListener(ADMIN_CONTENT_EVENT, loadAdminContent);
      window.removeEventListener('storage', loadAdminContent);
    };
  }, []);

  const reviews = useMemo(() => [...adminReviews, ...DEFAULT_REVIEWS].slice(0, 3), [adminReviews]);
  const blogs = useMemo(
    () => sortByDateDesc<ManagedStory>([...adminStories, ...STORIES]).slice(0, 4),
    [adminStories],
  );
  const featuredReview = reviews[0];
  const secondaryReviews = reviews.slice(1);
  const featuredBlog = blogs[0];
  const secondaryBlogs = blogs.slice(1);

  return (
    <>
      <FaqJsonLd faqs={FAQS} />
      {/* 1. Hero Carousel — 902px green/photo BG + 흰색 카피 */}
      <HeroCarousel />

      {/* 1.5. Stats 신뢰 지표 (Hero 직후, 즉시 신뢰).
          Wave 386: <dl> semantic — 4 통계 = term/definition pairs. flex-col-reverse로 visual (value 위) 유지. */}
      <section className="bg-white border-b border-gray-100">
        <dl className="max-w-[1200px] mx-auto px-5 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 m-0">
          <Reveal as="div" className="text-center flex flex-col-reverse gap-1">
            <dt data-speakable="true" className="text-xs md:text-sm text-ink-muted font-medium">대전 5구 통합</dt>
            <dd className="text-3xl md:text-4xl font-extrabold text-[#1E40AF] tabular-nums m-0">
              <StatsCounter value={5} suffix="구" />
            </dd>
          </Reveal>
          <Reveal as="div" delay={0.1} className="text-center flex flex-col-reverse gap-1">
            <dt data-speakable="true" className="text-xs md:text-sm text-ink-muted font-medium">24시간 365일 상담 가능</dt>
            <dd className="text-3xl md:text-4xl font-extrabold text-[#1E40AF] tabular-nums m-0">
              <StatsCounter value={24} suffix="시간" />
            </dd>
          </Reveal>
          <Reveal as="div" delay={0.2} className="text-center flex flex-col-reverse gap-1">
            <dt className="text-xs md:text-sm text-ink-muted font-medium">자격 매니저</dt>
            <dd className="text-3xl md:text-4xl font-extrabold text-[#1E40AF] tabular-nums m-0">
              <StatsCounter value={CONTACT.managerCount} suffix="+명" />
            </dd>
          </Reveal>
          <Reveal as="div" delay={0.3} className="text-center flex flex-col-reverse gap-1">
            <dt data-speakable="true" className="text-xs md:text-sm text-ink-muted font-medium">
              대표번호 · 무료 상담 {CONTACT.phone}
            </dt>
            <dd className="text-3xl md:text-4xl font-extrabold text-[#E63946] tabular-nums m-0" aria-hidden="true">
              {CONTACT.phone}
            </dd>
          </Reveal>
        </dl>
      </section>

      {/* 2. About — "집으로 찾아가는 또 다른 가족, 방문요양 서비스" (606px, white) */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-12">
            <p lang="en" className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-4"><span aria-hidden="true">|</span> ABOUT</p>
            <h2 className="text-2xl md:text-4xl font-bold text-ink-primary mb-5 leading-snug">
              집으로 찾아가는 또 다른 가족,
              <br />
              <span className="text-brand-400">방문요양 서비스</span>
            </h2>
            <p className="text-ink-secondary md:text-lg max-w-2xl mx-auto leading-relaxed">
              대전케어 방문요양센터에서 문의하세요.
              <br className="hidden md:inline" />
              자격을 갖춘 요양보호사가 어르신 댁으로 직접 찾아갑니다.
            </p>
          </div>

          {/* Wave 403: TiltCard href prop으로 dead-end → 클릭 가능 navigation. /service 상세 페이지로 */}
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {[
              { title: '방문요양', desc: '일상 생활 지원 / 정서 지원' },
              { title: '방문목욕', desc: '존엄을 지키는 목욕 케어' },
              { title: '방문간호', desc: '의료 케어가 일상 안으로' },
            ].map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <TiltCard
                  href="/service"
                  ariaLabel={`${s.title} 자세히 보기`}
                  intensity={1.5}
                  className="glass hover:bg-brand-50/80 transition-colors p-8 text-center border-t-2 border-brand-400"
                >
                  <h3 className="text-xl font-bold text-ink-primary mb-2">{s.title}</h3>
                  <p className="text-sm text-ink-muted">{s.desc}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Video Section — YouTube embed 또는 placeholder */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <p lang="en" className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3"><span aria-hidden="true">|</span> VIDEO</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-primary">
              영상으로 보는 대전케어
            </h2>
          </div>
          {VIDEO_ID ? (
            <div className="aspect-video max-w-4xl mx-auto bg-black overflow-hidden shadow-lg">
              {/* Wave 478: youtube-nocookie privacy (쿠키 추적 X) + lazy loading + referrerpolicy */}
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}`}
                title="대전케어 소개 영상"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            // placeholder — 자현이 자체 영상 ID 추가 시 자동 iframe
            <div
              className="aspect-video max-w-4xl mx-auto overflow-hidden shadow-lg relative grid place-items-center text-white text-center px-5"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, #1E40AF 0%, #1E3A8A 50%, #172554 100%), radial-gradient(circle at 70% 70%, rgba(230,57,70,0.4) 0%, transparent 60%)',
              }}
            >
              {/* SVG decorative dots (CC0) */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
              >
                <pattern id="vid-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1.2" fill="rgba(255,255,255,0.5)" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#vid-dots)" />
              </svg>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/15 backdrop-blur-sm grid place-items-center mb-5">
                  <svg aria-hidden="true" width="32" height="32" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-xl md:text-2xl font-bold mb-2">대전케어 영상 준비 중</p>
                <p className="text-sm md:text-base opacity-80">
                  곧 어르신 일상과 매니저 이야기를 영상으로 만나보실 수 있습니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Story — "생생한 대전케어 이야기" (215px, white).
          Wave 402: dead-end 섹션 → CTA 링크로 conversion path 완성 */}
      <section className="bg-white pt-20 pb-10">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <p lang="en" className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3"><span aria-hidden="true">|</span> STORY</p>
          <h2 className="text-2xl md:text-4xl font-bold text-ink-primary mb-3">
            생생한 대전케어 이야기
          </h2>
          <p className="text-ink-muted mb-5">실제 현장의 이야기를 영상으로 만나보세요</p>
          <a
            href="/story"
            className="inline-flex items-center gap-1.5 text-brand-400 hover:text-brand-600 font-semibold text-sm transition-colors underline-offset-4 hover:underline"
          >
            이야기 모두 보기
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* 5. CTA Strip — "언제든 문의 주세요" (310px, #f8f8f8) */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-ink-primary mb-3 leading-snug">
            언제든 문의 주세요.
          </h2>
          <p className="text-lg md:text-xl text-ink-secondary mb-8">
            부모님의 손발이 되어드리겠습니다
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <MagneticButton
              href="/contact"
              className="block bg-brand-600 hover:bg-brand-700 text-white px-8 py-3.5 font-semibold transition-colors"
              ariaLabel="무료 상담 신청"
            >
              <span style={{ borderRadius: '2px' }}>무료 상담 신청</span>
            </MagneticButton>
            <MagneticButton
              href={CONTACT.phoneTel}
              className="block bg-[#E63946] hover:bg-[#C12A37] text-white px-8 py-3.5 font-bold transition-colors"
              ariaLabel={`전화 상담 ${CONTACT.phone}`}
            >
              <span className="inline-flex items-center gap-2">
                <Phone size={18} aria-hidden="true" />
                {CONTACT.phone}
              </span>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* 6. Reviews — admin-managed voice, editorial trust layout. */}
      <section className="relative overflow-hidden bg-[#F6F8FB] py-20 md:py-24">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent" />
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="mb-12 grid gap-6 md:grid-cols-[minmax(0,1fr)_360px] md:items-end">
            <div>
              <p lang="en" className="text-brand-600 font-semibold tracking-[0.2em] text-sm mb-3"><span aria-hidden="true">|</span> REVIEWS</p>
              <h2 className="text-2xl md:text-4xl font-bold text-ink-primary leading-snug">
                대전케어를 찾아주신
                <br />
                고객의 목소리
              </h2>
              <p className="mt-4 max-w-2xl text-sm md:text-base leading-relaxed text-ink-secondary">
                센터장이 직접 확인한 보호자 후기와 현장 사진을 바탕으로, 상담 전 가족이 궁금해하는 경험을 먼저 보여드립니다.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { value: '24h', label: '상담 대응' },
                { value: '5구', label: '대전 전역' },
                { value: '1:1', label: '맞춤 매칭' },
              ].map((item) => (
                <div key={item.label} className="border border-slate-200 bg-white px-3 py-4 shadow-sm">
                  <p className="text-xl font-extrabold text-brand-800">{item.value}</p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {featuredReview && (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.18fr)_minmax(320px,0.82fr)]">
              <Reveal
                as="article"
                className="nextgen-card group grid min-h-[420px] overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl md:grid-cols-[0.92fr_1.08fr]"
              >
                <div className="relative min-h-[260px] overflow-hidden bg-slate-900">
                  {featuredReview.image ? (
                    <img
                      src={featuredReview.image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover opacity-95 transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#0F172A_0%,#1E40AF_52%,#93C5FD_100%)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="inline-flex bg-white/95 px-3 py-1 text-xs font-extrabold text-brand-800" style={{ borderRadius: '2px' }}>
                      센터장 확인 후기
                    </span>
                  </div>
                </div>
                <div className="flex flex-col justify-between p-7 md:p-9">
                  <div>
                    <Quote size={40} aria-hidden="true" className="mb-5 text-brand-700 opacity-90" />
                    <blockquote className="text-lg leading-loose text-ink-primary md:text-xl">
                      {featuredReview.text}
                    </blockquote>
                  </div>
                  <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-slate-100 pt-5 text-xs">
                    <div>
                      <span className="font-semibold text-ink-primary">{featuredReview.author}</span>
                      <time dateTime={featuredReview.date.replaceAll('.', '-')} className="text-ink-muted text-[11px] mt-1 block">
                        {featuredReview.date}
                      </time>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-brand-50 text-brand-700 px-2 py-0.5 font-semibold" style={{ borderRadius: '2px' }}>
                        {featuredReview.tag}
                      </span>
                      <span aria-label={`평점 5점 만점에 ${featuredReview.rating}점`} className="flex text-[#C88719]">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            size={13}
                            fill={starIndex < featuredReview.rating ? 'currentColor' : 'none'}
                            strokeWidth={starIndex < featuredReview.rating ? 0 : 1.8}
                          />
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-4">
                {secondaryReviews.map((r, i) => (
                  <Reveal
                    as="article"
                    key={r.id}
                    delay={(i + 1) * 0.08}
                    className="group relative overflow-hidden border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
                  >
                    <div aria-hidden="true" className="absolute inset-y-5 left-0 w-1 bg-gradient-to-b from-brand-800 via-brand-500 to-[#E63946]" />
                    <div className="flex gap-4">
                      {r.image ? (
                        <div className="relative h-20 w-24 shrink-0 overflow-hidden bg-slate-100">
                          <img src={r.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        </div>
                      ) : null}
                      <div className="min-w-0 flex-1">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                          <span className="bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600" style={{ borderRadius: '2px' }}>{r.tag}</span>
                          <span aria-label={`평점 5점 만점에 ${r.rating}점`} className="flex text-[#C88719]">
                            {Array.from({ length: 5 }).map((_, starIndex) => (
                              <Star key={starIndex} size={12} fill={starIndex < r.rating ? 'currentColor' : 'none'} strokeWidth={starIndex < r.rating ? 0 : 1.8} />
                            ))}
                          </span>
                        </div>
                        <blockquote className="line-clamp-3 text-sm leading-relaxed text-ink-secondary">{r.text}</blockquote>
                        <div className="mt-4 flex items-center justify-between gap-3 text-xs">
                          <span className="font-semibold text-ink-primary">{r.author}</span>
                          <time dateTime={r.date.replaceAll('.', '-')} className="text-[11px] text-ink-muted">{r.date}</time>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 7. Blog — admin-managed field notes. */}
      <section className="bg-white py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p lang="en" className="text-brand-600 font-semibold tracking-[0.2em] text-sm mb-3"><span aria-hidden="true">|</span> BLOG</p>
              <h2 className="text-2xl md:text-3xl font-bold text-ink-primary">
                대전케어 이야기
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-muted">
                등급 신청, 돌봄 현장, 센터 소식을 보호자 눈높이에 맞춰 정리합니다.
              </p>
            </div>
            <a
              href="/story"
              className="inline-flex items-center gap-1.5 self-start border border-slate-200 px-5 py-2.5 text-sm font-bold text-ink-secondary transition-colors hover:border-brand-500 hover:text-brand-700 md:self-auto"
              style={{ borderRadius: '2px' }}
            >
              이야기 전체 보기
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>

          {featuredBlog && (
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
              <Reveal>
                <a
                  href={getStoryUrl(featuredBlog)}
                  className="group block h-full overflow-hidden border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    {featuredBlog.thumbnail ? (
                      <img
                        src={featuredBlog.thumbnail}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-[linear-gradient(135deg,#F8FAFC_0%,#EAF2FF_50%,#D7E4F5_100%)]"
                      >
                        <div className="absolute left-4 right-4 top-5 h-px bg-slate-300/70" />
                        <div className="absolute bottom-5 left-4 h-10 w-20 border-l-2 border-t-2 border-brand-500/70" />
                        <div className="absolute right-5 top-5 h-16 w-16 rounded-full border border-brand-300/70" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-7">
                    <p className="text-xs font-bold tracking-[0.14em] text-brand-700">{featuredBlog.cat}</p>
                    <h3 className="mt-3 text-xl font-extrabold leading-snug text-ink-primary transition-colors group-hover:text-brand-700 md:text-2xl">
                      {featuredBlog.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-secondary">{featuredBlog.excerpt}</p>
                    <time dateTime={featuredBlog.date} className="mt-5 block text-xs font-semibold text-ink-muted">{featuredBlog.date}</time>
                  </div>
                </a>
              </Reveal>

              <div className="grid gap-4">
                {secondaryBlogs.map((b, i) => (
                  <Reveal key={String(b.id)} delay={(i + 1) * 0.06}>
                    <a
                      href={getStoryUrl(b)}
                      className="group grid grid-cols-[116px_minmax(0,1fr)] overflow-hidden border border-slate-200 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
                    >
                      <div className="relative min-h-[132px] overflow-hidden bg-slate-100">
                        {b.thumbnail ? (
                          <img
                            src={b.thumbnail}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,#F8FAFC_0%,#EAF2FF_52%,#D7E4F5_100%)]" />
                        )}
                      </div>
                      <div className="min-w-0 p-4">
                        <p className="text-[11px] font-bold text-brand-700">{b.cat}</p>
                        <p className="mt-2 line-clamp-2 text-sm font-bold leading-snug text-ink-primary transition-colors group-hover:text-brand-700">
                          {b.title}
                        </p>
                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-muted">{b.excerpt}</p>
                      </div>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. FAQ — 4 cards (491px, #f8f8f8). Wave 365: cv-auto. */}
      <section className="bg-[#f8f8f8] py-20">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="text-center mb-10">
            <p lang="en" className="text-brand-400 font-semibold tracking-[0.2em] text-sm mb-3"><span aria-hidden="true">|</span> FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-primary">
              자주 묻는 질문
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* Wave 384: name="home-faq" — exclusive accordion (Chrome 120+/FF 124+/Safari 17.2+).
                동시에 1개 답만 표시 = 산만 회피. 미지원 브라우저는 multi-open (graceful degrade). */}
            {FAQS.map((f, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <details name="home-faq" className="group bg-white p-5 border border-gray-100 hover:border-brand-400 transition-colors cursor-pointer">
                  <summary className="font-semibold text-ink-primary flex items-start gap-3 list-none">
                    <span className="text-brand-400 font-bold shrink-0">Q.</span>
                    <span className="flex-1">{f.q}</span>
                    {/* Wave 482: aria-hidden — ▾ Unicode chevron decorative (SR noise 차단) */}
                    <span aria-hidden="true" className="text-brand-400 group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="mt-3 pl-6 text-sm text-ink-secondary leading-relaxed">
                    <span className="text-brand-400 font-bold mr-2">A.</span>
                    {f.a}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="/faq"
              className="inline-block border border-brand-400 hover:bg-brand-400 hover:text-white text-brand-400 px-7 py-2.5 font-semibold transition-colors text-sm"
              style={{ borderRadius: '2px' }}
            >
              전체 FAQ 보기
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
