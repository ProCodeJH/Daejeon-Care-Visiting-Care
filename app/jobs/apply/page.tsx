'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CONTACT } from '@/lib/contact';

const REGIONS = ['유성구', '대덕구', '서구', '중구', '동구', '대전 외'];

export default function JobApplyPage() {
  const [submitted, setSubmitted] = useState(false);

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

      {/* 지원 폼 */}
      <section className="bg-[#f8f8f8] py-12 pb-20">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="bg-white p-7 md:p-10">
            {submitted ? (
              <>
                <div
                  role="status"
                  aria-live="polite"
                  className="text-center py-12 form-success-enter bg-gradient-to-br from-brand-50 to-brand-100 border-l-4 border-[#1B6F4A] -mx-7 md:-mx-8 px-7 md:px-8"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#1B6F4A] grid place-items-center text-white text-3xl">
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
                  <p className="text-center text-xs text-ink-muted tracking-[0.15em] mb-6 font-semibold">
                    | 연락 대기 동안 대전케어 더 알아보기
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <a
                      href="/about"
                      className="group bg-[#f8f8f8] hover:bg-brand-50 p-5 transition-colors block border-l-4 border-[#1B6F4A]"
                    >
                      <p className="text-xs text-[#1B6F4A] font-bold tracking-[0.15em] mb-1.5">ABOUT</p>
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
                      <p className="text-xs text-[#F5A623] font-bold tracking-[0.15em] mb-1.5">STORY</p>
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
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="apply-name" className="block text-sm font-bold text-ink-primary mb-1.5">
                      성함 <span aria-hidden="true" className="text-brand-400">*</span>
                    </label>
                    <input
                      id="apply-name"
                      name="name"
                      required
                      type="text"
                      autoComplete="name"
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
                      type="text"
                      autoComplete="bday"
                      placeholder="예: 1965-03-15"
                      maxLength={10}
                      className="w-full px-4 py-2.5 bg-[#f8f8f8] border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                      style={{ borderRadius: '2px' }}
                    />
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
                    type="tel"
                    maxLength={13}
                    inputMode="tel"
                    autoComplete="tel"
                    pattern="[0-9-]{9,13}"
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-2.5 bg-[#f8f8f8] border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                    style={{ borderRadius: '2px' }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-ink-primary mb-1.5">
                    자격증 종류 <span aria-hidden="true" className="text-brand-400">*</span>
                  </label>
                  <div role="radiogroup" aria-label="자격증 종류" className="flex gap-4 text-sm">
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
                  <label className="block text-sm font-bold text-ink-primary mb-1.5">
                    희망 근무지 <span aria-hidden="true" className="text-brand-400">*</span>
                  </label>
                  <div role="group" aria-label="희망 근무지" className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {REGIONS.map((r) => (
                      <label key={r} className="flex items-center gap-2 text-sm cursor-pointer p-2 bg-[#f8f8f8] hover:bg-brand-50 transition-colors" style={{ borderRadius: '2px' }}>
                        <input type="checkbox" name="region" value={r} className="accent-brand-400" />
                        <span>{r}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-ink-primary mb-1.5">
                    가능 시간대
                  </label>
                  <div role="group" aria-label="가능 시간대" className="flex flex-wrap gap-2 text-sm">
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
                    className="w-full px-4 py-2.5 bg-[#f8f8f8] border border-gray-200 focus:border-brand-400 focus:outline-none text-sm resize-none"
                    style={{ borderRadius: '2px' }}
                  />
                </div>

                <label className="flex items-start gap-2 text-xs text-ink-muted">
                  <input type="checkbox" name="privacy" required className="mt-0.5 accent-brand-400" />
                  <span>
                    개인정보 수집·이용에 동의합니다 (필수). 수집된 정보는 채용 절차 외 다른 목적으로 사용되지 않습니다.
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
