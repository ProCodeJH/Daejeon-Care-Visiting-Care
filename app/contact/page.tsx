'use client';

import { useState } from 'react';
import { PageHero } from '@/components/PageHero';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

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
                  <p className="text-lg font-bold text-brand-400">042-369-0326</p>
                  <p className="text-xs text-ink-muted">FAX. 042-369-0326</p>
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
                  <p className="text-sm">contact@daejeoncare.co.kr</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-50 grid place-items-center text-brand-400 shrink-0" style={{ borderRadius: '2px' }}>
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="font-semibold text-ink-primary mb-0.5">주소</p>
                  <p className="text-sm">대전광역시 [구] [동] [도로명주소], [건물명] [층호]</p>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 폼 */}
          <div className="bg-[#f8f8f8] p-7 md:p-8">
            <h3 className="text-xl font-bold text-ink-primary mb-5">온라인 문의</h3>
            {submitted ? (
              <div className="bg-brand-50 p-8 text-center">
                <p className="text-3xl mb-3">✓</p>
                <p className="font-bold text-brand-400 mb-2">문의가 접수되었습니다</p>
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
                  <label className="block text-sm font-semibold text-ink-primary mb-1.5">
                    이름 <span className="text-brand-400">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                    style={{ borderRadius: '2px' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink-primary mb-1.5">
                    연락처 <span className="text-brand-400">*</span>
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="010-0000-0000"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-brand-400 focus:outline-none text-sm"
                    style={{ borderRadius: '2px' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-ink-primary mb-1.5">
                    문의 종류
                  </label>
                  <select
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
                  <label className="block text-sm font-semibold text-ink-primary mb-1.5">
                    문의 내용 <span className="text-brand-400">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 focus:border-brand-400 focus:outline-none text-sm resize-none"
                    style={{ borderRadius: '2px' }}
                  />
                </div>
                <label className="flex items-start gap-2 text-xs text-ink-muted">
                  <input type="checkbox" required className="mt-0.5" />
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
