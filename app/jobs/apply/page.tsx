'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { PrivacyDialog } from '@/components/PrivacyDialog';
import { CONTACT } from '@/lib/contact';

const REGIONS = ['유성구', '대덕구', '서구', '중구', '동구', '대전 외'];
const STORAGE_KEY = 'daejeon-care:jobs-apply';

/**
 * Wave 374: form autosave to localStorage.
 * 8 fields × 다양 input — 사용자 5분 투자 보호. 우연 navigation 후 복원.
 * 의도적으로 privacy 동의 제외 — Korean PIPA 명시 동의 매번 요구.
 */
type FormState = {
  name?: string;
  birth?: string;
  tel?: string;
  cert?: string;
  experience?: string;
  region?: string[];
  availability?: string[];
  message?: string;
};

export default function JobApplyPage() {
  const [submitted, setSubmitted] = useState(false);
  const [restored, setRestored] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // 복원 (mount): localStorage → form fields. 복원 성공 시 banner 표시 (Wave 380).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const data: FormState = JSON.parse(saved);
      const form = formRef.current;
      if (!form) return;

      const setText = (name: string, value?: string) => {
        if (!value) return;
        const el = form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
        if (el && 'value' in el) el.value = value;
      };
      const setRadio = (name: string, value?: string) => {
        if (!value) return;
        form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((el) => {
          el.checked = el.value === value;
        });
      };
      const setChecks = (name: string, values?: string[]) => {
        if (!values?.length) return;
        form.querySelectorAll<HTMLInputElement>(`input[name="${name}"]`).forEach((el) => {
          el.checked = values.includes(el.value);
        });
      };

      setText('name', data.name);
      setText('birth', data.birth);
      setText('tel', data.tel);
      setRadio('cert', data.cert);
      setText('experience', data.experience);
      setChecks('region', data.region);
      setChecks('availability', data.availability);
      setText('message', data.message);
      // 실제 데이터가 로드되었음을 banner 표시 (빈 객체 저장된 경우 회피)
      const hasData = Object.values(data).some((v) => (Array.isArray(v) ? v.length > 0 : !!v));
      if (hasData) setRestored(true);
    } catch {
      // localStorage 비활성/파싱 실패 시 무시
    }
  }, []);

  // 새로 시작 (Wave 380): localStorage 삭제 + form 리셋 + banner 닫기
  const handleReset = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      formRef.current?.reset();
      setRestored(false);
    } catch {}
  };

  // 저장 (change): form FormData → localStorage. privacy 제외 (PIPA).
  const handleChange = useCallback(() => {
    try {
      const form = formRef.current;
      if (!form) return;
      const fd = new FormData(form);
      const state: FormState = {
        name: (fd.get('name') as string) || undefined,
        birth: (fd.get('birth') as string) || undefined,
        tel: (fd.get('tel') as string) || undefined,
        cert: (fd.get('cert') as string) || undefined,
        experience: (fd.get('experience') as string) || undefined,
        region: (fd.getAll('region') as string[]).filter(Boolean),
        availability: (fd.getAll('availability') as string[]).filter(Boolean),
        message: (fd.get('message') as string) || undefined,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, []);

  // 제출 시: localStorage 삭제 (재제출 방지)
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    // Wave 425: 성공 메시지가 viewport 상단에 보이도록 스크롤 (senior care UX feedback)
    setTimeout(() => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      sectionRef.current?.scrollIntoView({
        behavior: reduced ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 50);
  };

  return (
    <>
      <PageHero
        title="요양보호사 지원하기"
        sub="대전케어와 함께 일하실 분의 지원을 환영합니다"
        crumbs={[
          { label: '요양보호사 일자리', href: '/jobs' },
          { label: '지원하기' },
        ]}
      />

      {/* 인트로 */}
      <section className="bg-white py-12">
        <div className="max-w-[900px] mx-auto px-5 text-center">
          <SectionBlock
            eyebrow="APPLY"
            title="간단한 지원서로 시작하세요"
            sub="제출 후 담당자가 24시간 내 연락드립니다"
          />
        </div>
      </section>

      {/* 지원 폼. Wave 425: ref for scroll-to-top after submit success */}
      <section ref={sectionRef} className="bg-[#f8f8f8] py-12 pb-20">
        <div className="max-w-[800px] mx-auto px-5">
          {/* Wave 391: <noscript> fallback — 폼 autosave + submit JS 의존, phone CTA 안내 */}
          <noscript>
            <div className="bg-[#FFF8E1] border-l-4 border-[#F5A623] p-4 mb-6">
              <p className="text-sm text-ink-primary">
                JavaScript가 비활성화되어 자동 저장 + 제출이 작동하지 않습니다.
                지원 문의는{' '}
                <a href={CONTACT.phoneTel} className="underline font-bold text-[#1B6F4A]">
                  {CONTACT.phone}
                </a>
                으로 주시면 친절히 안내드립니다.
              </p>
            </div>
          </noscript>
          <div className="bg-white p-7 md:p-10">
            {submitted ? (
              <>
                <div
                  role="status"
                  aria-live="polite"
                  className="text-center py-12 form-success-enter bg-gradient-to-br from-brand-50 to-brand-100 border-l-4 border-[#1B6F4A] -mx-7 md:-mx-8 px-7 md:px-8"
                >
                  <div aria-hidden="true" className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#1B6F4A] grid place-items-center text-white text-3xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B6F4A] mb-3">지원이 접수되었습니다</h3>
                  <p className="text-ink-secondary mb-6">
                    담당자가 24시간 내에 연락드리겠습니다.
                    <br />
                    감사합니다.
                  </p>
                  <a
                    href="/"
                    className="inline-block bg-[#1B6F4A] hover:bg-[#15573A] text-white px-6 py-3 font-semibold transition-colors"
                    style={{ borderRadius: '2px' }}
                  >
                    홈으로 돌아가기
                  </a>
                </div>

                {/* 연락 대기 동안 둘러보기 (post-conversion retention) */}
                <div className="mt-10 pt-8 border-t border-gray-100">
                  {/* Wave 469: | aria-hidden (multi-line + Korean grep miss) */}
                  <p className="text-center text-xs text-ink-muted tracking-[0.15em] mb-6 font-semibold">
                    <span aria-hidden="true">|</span> 연락 대기 동안 대전케어 더 알아보기
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <a
                      href="/about"
                      className="group bg-[#f8f8f8] hover:bg-brand-50 p-5 transition-colors block border-l-4 border-[#1B6F4A]"
                    >
                      <p lang="en" className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-1.5">ABOUT</p>
                      <h4 className="text-base font-bold text-ink-primary mb-1 group-hover:text-[#1B6F4A] transition-colors">
                        대전케어 소개 →
                      </h4>
                      <p className="text-xs text-ink-secondary leading-relaxed">
                        4 가치 + 공식 등록 + {CONTACT.managerCount}+명 매니저 팀
                      </p>
                    </a>
                    <a
                      href="/story"
                      className="group bg-[#f8f8f8] hover:bg-brand-50 p-5 transition-colors block border-l-4 border-[#F5A623]"
                    >
                      <p lang="en" className="text-xs text-[#F5A623] font-bold tracking-[0.15em] mb-1.5">STORY</p>
                      <h4 className="text-base font-bold text-ink-primary mb-1 group-hover:text-[#F5A623] transition-colors">
                        대전케어 이야기 →
                      </h4>
                      <p className="text-xs text-ink-secondary leading-relaxed">
                        현장 매니저들의 따뜻한 순간들
                      </p>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <form
                ref={formRef}
                method="POST"
                onSubmit={handleSubmit}
                onChange={handleChange}
                className="space-y-5"
              >
                {/* Wave 421: method="POST" — JS 비활성 fallback 시 PII URL 노출 방지 (PIPA 준수) */}
                {/* Wave 380: 복원 안내 banner — 이전 작성 내용 자동 불러옴을 명시 + 새로 시작 옵션 */}
                {restored && (
                  <div
                    role="status"
                    className="bg-brand-50 border-l-4 border-brand-400 p-4 -mt-2 flex flex-wrap items-center justify-between gap-3"
                  >
                    <p className="text-sm text-brand-700 flex items-center gap-2">
                      <span aria-hidden="true">✓</span>
                      이전에 작성하신 내용을 불러왔습니다.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs text-ink-muted hover:text-ink-primary underline"
                    >
                      새로 시작
                    </button>
                  </div>
                )}
                {/* Wave 375: 자동 저장 안내 — feature dark matter 회피, 사용자 신뢰 보강 */}
                <p className="text-xs text-ink-muted flex items-center gap-2 -mt-2 mb-1">
                  <span aria-hidden="true" className="w-5 h-5 grid place-items-center bg-brand-50 text-brand-600 text-[11px] shrink-0" style={{ borderRadius: '999px' }}>
                    💾
                  </span>
                  입력하신 내용은 자동 저장됩니다. 실수로 페이지를 닫아도 안심하세요.
                </p>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="apply-name" className="block text-sm font-bold text-ink-primary mb-1.5">
                      성함 <span aria-hidden="true" className="text-brand-400">*</span>
                    </label>
                    <input
                      id="apply-name"
                      name="name"
                      required
                      aria-required="true"
                      type="text"
                      autoComplete="name"
                      enterKeyHint="next"
                      maxLength={30}
                      className="w-full px-4 py-2.5 bg-[#f8f8f8] border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                      style={{ borderRadius: '2px' }}
                    />
                  </div>
                  <div>
                    <label htmlFor="apply-birth" className="block text-sm font-bold text-ink-primary mb-1.5">
                      생년월일 <span aria-hidden="true" className="text-brand-400">*</span>
                    </label>
                    <input
                      id="apply-birth"
                      name="birth"
                      required
                      aria-required="true"
                      type="text"
                      autoComplete="bday"
                      enterKeyHint="next"
                      placeholder="예: 1965-03-15"
                      maxLength={10}
                      pattern="\d{4}-\d{2}-\d{2}"
                      title="YYYY-MM-DD 형식 (예: 1965-03-15)"
                      aria-describedby="apply-birth-hint"
                      inputMode="numeric"
                      className="w-full px-4 py-2.5 bg-[#f8f8f8] border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                      style={{ borderRadius: '2px' }}
                    />
                    {/* Wave 424: 시각 + SR 모두 format hint (WCAG 3.3.5) */}
                    <span id="apply-birth-hint" className="text-xs text-ink-muted mt-1 block">
                      YYYY-MM-DD 형식 (예: 1965-03-15)
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="apply-tel" className="block text-sm font-bold text-ink-primary mb-1.5">
                    연락처 <span aria-hidden="true" className="text-brand-400">*</span>
                  </label>
                  <input
                    id="apply-tel"
                    name="tel"
                    required
                    aria-required="true"
                    type="tel"
                    maxLength={13}
                    inputMode="tel"
                    enterKeyHint="next"
                    autoComplete="tel"
                    pattern="[0-9-]{9,13}"
                    title="숫자와 하이픈만 입력 (예: 010-1234-5678)"
                    aria-describedby="apply-tel-hint"
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-2.5 bg-[#f8f8f8] border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                    style={{ borderRadius: '2px' }}
                  />
                  {/* Wave 424: 시각 + SR 모두 format hint (WCAG 3.3.5) */}
                  <span id="apply-tel-hint" className="text-xs text-ink-muted mt-1 block">
                    숫자와 하이픈만 입력 (예: 010-1234-5678)
                  </span>
                </div>

                {/* Wave 420: <label> without htmlFor invalid — <p id> + aria-labelledby 정확 */}
                <div>
                  <p id="cert-label" className="block text-sm font-bold text-ink-primary mb-1.5">
                    자격증 종류 <span aria-hidden="true" className="text-brand-400">*</span>
                  </p>
                  <div role="radiogroup" aria-labelledby="cert-label" aria-required="true" className="flex gap-4 text-sm">
                    {['요양보호사 1급', '요양보호사 2급', '간호조무사', '사회복지사', '기타'].map((c) => (
                      <label key={c} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="cert" value={c} required className="accent-brand-400" />
                        <span>{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="apply-experience" className="block text-sm font-bold text-ink-primary mb-1.5">
                    경력 <span aria-hidden="true" className="text-brand-400">*</span>
                  </label>
                  <select
                    id="apply-experience"
                    name="experience"
                    required
                    aria-required="true"
                    autoComplete="off"
                    className="w-full px-4 py-2.5 bg-[#f8f8f8] border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                    style={{ borderRadius: '2px' }}
                  >
                    <option value="">선택해주세요</option>
                    <option>신입 (경력 1년 미만)</option>
                    <option>1 ~ 3년</option>
                    <option>3 ~ 5년</option>
                    <option>5 ~ 10년</option>
                    <option>10년 이상</option>
                  </select>
                </div>

                <div>
                  <p id="region-label" className="block text-sm font-bold text-ink-primary mb-1.5">
                    희망 근무지 <span aria-hidden="true" className="text-brand-400">*</span>
                  </p>
                  <div role="group" aria-labelledby="region-label" aria-required="true" className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {REGIONS.map((r) => (
                      <label key={r} className="flex items-center gap-2 text-sm cursor-pointer p-2 bg-[#f8f8f8] hover:bg-brand-50 transition-colors" style={{ borderRadius: '2px' }}>
                        <input type="checkbox" name="region" value={r} className="accent-brand-400" />
                        <span>{r}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p id="availability-label" className="block text-sm font-bold text-ink-primary mb-1.5">
                    가능 시간대
                  </p>
                  <div role="group" aria-labelledby="availability-label" className="flex flex-wrap gap-2 text-sm">
                    {['오전', '오후', '저녁', '평일', '주말', '시간 자유'].map((t) => (
                      <label key={t} className="flex items-center gap-2 cursor-pointer px-3 py-1.5 bg-[#f8f8f8] hover:bg-brand-50 transition-colors" style={{ borderRadius: '2px' }}>
                        <input type="checkbox" name="availability" value={t} className="accent-brand-400" />
                        <span>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="apply-message" className="block text-sm font-bold text-ink-primary mb-1.5">
                    자기 소개 / 하고 싶은 말
                  </label>
                  <textarea
                    id="apply-message"
                    name="message"
                    rows={4}
                    maxLength={1000}
                    placeholder="간단한 자기 소개나 어르신 케어에 대한 마음을 적어주세요"
                    autoComplete="off"
                    className="w-full px-4 py-2.5 bg-[#f8f8f8] border border-gray-200 focus:border-brand-400 focus:outline-none text-sm resize-none"
                    style={{ borderRadius: '2px', fieldSizing: 'content' } as React.CSSProperties}
                  />
                </div>

                {/* Wave 383: <dialog> 자세히 — 폼 컨텍스트 유지하며 처리 안내 검토 */}
                <label className="flex items-start gap-2 text-xs text-ink-muted">
                  {/* Wave 459: aria-required="true" — HTML5 required는 일부 SR 인식, ARIA 1.2 명시가 보장 */}
                  <input type="checkbox" name="privacy" required aria-required="true" className="mt-0.5 accent-brand-400" />
                  <span>
                    개인정보 수집·이용에 동의합니다 (필수). 수집된 정보는 채용 절차 외 다른 목적으로 사용되지 않습니다.{' '}
                    <PrivacyDialog />
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full bg-brand-400 hover:bg-brand-500 text-white py-4 font-bold text-lg transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  지원서 제출
                </button>

                <p className="text-center text-sm text-ink-muted">
                  또는 전화 문의: <a href={CONTACT.phoneTel} className="text-brand-400 font-bold">{CONTACT.phone}</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
