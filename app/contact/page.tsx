'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHero
        title="문의 / 상담"
        sub="언제든 편하게 연락 주세요"
        crumbs={[{ label: '고객센터', href: '/contact' }, { label: '문의 / 상담' }]}
      />

      {/* 문의 폼 + 정보 */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-5 grid md:grid-cols-2 gap-10">
          {/* 왼쪽: 정보 */}
          <div>
            <p className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-3">| CONTACT</p>
            <h2 className="text-2xl md:text-3xl font-bold text-ink-primary mb-6 leading-snug">
              부모님의 손발이 되어
              <br />
              드리겠습니다
            </h2>
            <div className="space-y-5 text-ink-secondary">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-50 grid place-items-center text-brand-400 shrink-0" style={{ borderRadius: '2px' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <p className="font-semibold text-ink-primary mb-0.5">전화 상담</p>
                  {/* Wave 354: tel: 링크 — 모바일 one-tap dial */}
                  <a
                    href={CONTACT.phoneTel}
                    className="text-lg font-bold text-brand-400 hover:underline"
                    aria-label={`전화 걸기 ${CONTACT.phone}`}
                  >
                    {CONTACT.phone}
                  </a>
                  <p className="text-xs text-ink-muted">FAX. {CONTACT.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-50 grid place-items-center text-brand-400 shrink-0" style={{ borderRadius: '2px' }}>
                  <Clock size={18} />
                </div>
                <div>
                  <p className="font-semibold text-ink-primary mb-0.5">운영 시간</p>
                  <p className="text-sm">평일 09:00 ~ 18:00</p>
                  <p className="text-xs text-ink-muted">토·일·공휴일 휴무</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-50 grid place-items-center text-brand-400 shrink-0" style={{ borderRadius: '2px' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <p className="font-semibold text-ink-primary mb-0.5">이메일</p>
                  {/* Wave 354: mailto: 링크 — 클릭 시 메일 클라이언트 자동 열림 */}
                  <a
                    href={CONTACT.emailMailto}
                    className="text-sm hover:text-brand-400 hover:underline transition-colors"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-50 grid place-items-center text-brand-400 shrink-0" style={{ borderRadius: '2px' }}>
                  <MapPin size={18} />
                </div>
                <address className="not-italic">
                  <p className="font-semibold text-ink-primary mb-0.5">주소</p>
                  <p className="text-sm">{CONTACT.address}</p>
                </address>
              </div>
            </div>
          </div>

          {/* 오른쪽: 폼 */}
          <div className="bg-[#f8f8f8] p-7 md:p-8">
            <h3 className="text-xl font-bold text-ink-primary mb-5">온라인 문의</h3>
            {submitted ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-gradient-to-br from-brand-50 to-brand-100 p-8 text-center border-l-4 border-[#1B6F4A] form-success-enter"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#1B6F4A] grid place-items-center text-white text-2xl">
                  ✓
                </div>
                <p className="font-bold text-[#1B6F4A] mb-2 text-lg">문의가 접수되었습니다</p>
                <p className="text-sm text-ink-secondary">빠른 시일 내에 연락드리겠습니다.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-ink-primary mb-1.5">
                    이름 <span aria-hidden="true" className="text-brand-400">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    required
                    type="text"
                    autoComplete="name"
                    maxLength={30}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                    style={{ borderRadius: '2px' }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-tel" className="block text-sm font-semibold text-ink-primary mb-1.5">
                    연락처 <span aria-hidden="true" className="text-brand-400">*</span>
                  </label>
                  <input
                    id="contact-tel"
                    name="tel"
                    required
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    enterKeyHint="next"
                    pattern="[0-9-]{9,13}"
                    title="숫자와 하이픈만 입력 (예: 010-1234-5678)"
                    maxLength={13}
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                    style={{ borderRadius: '2px' }}
                  />
                </div>
                <div>
                  <label htmlFor="contact-category" className="block text-sm font-semibold text-ink-primary mb-1.5">
                    문의 종류
                  </label>
                  <select
                    id="contact-category"
                    name="category"
                    autoComplete="off"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                    style={{ borderRadius: '2px' }}
                  >
                    <option>방문요양 서비스</option>
                    <option>등급 신청 도움</option>
                    <option>본인부담금 문의</option>
                    <option>요양보호사 채용</option>
                    <option>기타</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-ink-primary mb-1.5">
                    문의 내용 <span aria-hidden="true" className="text-brand-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    maxLength={1000}
                    autoComplete="off"
                    style={{ borderRadius: '2px', fieldSizing: 'content' } as React.CSSProperties}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-brand-400 focus:outline-none text-sm resize-none min-h-[120px]"
                  />
                </div>
                <label className="flex items-start gap-2 text-xs text-ink-muted">
                  <input type="checkbox" name="privacy" required className="mt-0.5 accent-brand-400" />
                  <span>개인정보 수집·이용에 동의합니다 (필수)</span>
                </label>
                <button
                  type="submit"
                  className="w-full bg-brand-400 hover:bg-brand-500 text-white py-3.5 font-bold transition-colors"
                  style={{ borderRadius: '2px' }}
                >
                  문의 접수
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
