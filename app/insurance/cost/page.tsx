'use client';

import { useState, useMemo, useEffect } from 'react';
import { PageHero } from '@/components/PageHero';
import { SectionBlock } from '@/components/SectionBlock';
import { CTASection } from '@/components/CTASection';
import { AnimatedNumber } from '@/components/AnimatedNumber';
import { ShareButton } from '@/components/ShareButton';
import { CONTACT } from '@/lib/contact';

/**
 * 2026년 기준 장기요양 월 한도액 (참고용 — 정확한 금액은 공단 확인).
 * 등급별 본인부담률 적용 시 실제 월 부담액 계산.
 */
const MONTHLY_LIMITS: Record<string, number> = {
  '1': 1885000,
  '2': 1690000,
  '3': 1417200,
  '4': 1306200,
  '5': 1121100,
  '인지': 624600, // 인지지원등급
};

const RATES: Record<string, { label: string; rate: number; desc: string }> = {
  general: { label: '일반 대상자', rate: 0.15, desc: '본인부담률 15%' },
  reduced9: { label: '감경 대상자 (9%)', rate: 0.09, desc: '소득·재산 기준 1차 감경' },
  reduced6: { label: '감경 대상자 (6%)', rate: 0.06, desc: '추가 감경 적용 대상' },
  basic: { label: '기초수급자', rate: 0, desc: '본인부담금 전액 면제' },
};

const fmt = (n: number) => n.toLocaleString('ko-KR') + '원';

const STORAGE_KEY = 'daejeon-care:cost';

export default function CostPage() {
  const [grade, setGrade] = useState('3');
  const [rateKey, setRateKey] = useState('general');

  // sessionStorage 복원 — 페이지 이동 후 돌아오면 같은 선택 유지 (가족이 다른 페이지 보고 와도 결과 비교 가능)
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const { grade: g, rateKey: r } = JSON.parse(saved);
      if (g && MONTHLY_LIMITS[g]) setGrade(g);
      if (r && RATES[r]) setRateKey(r);
    } catch {
      // 무시 — sessionStorage 비활성/파싱 실패 시 default 유지
    }
  }, []);

  // 변경 시 자동 저장
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ grade, rateKey }));
    } catch {
      // 무시
    }
  }, [grade, rateKey]);

  const result = useMemo(() => {
    const limit = MONTHLY_LIMITS[grade] || 0;
    const rate = RATES[rateKey].rate;
    const userPay = Math.round(limit * rate);
    const govPay = limit - userPay;
    return { limit, userPay, govPay, rate };
  }, [grade, rateKey]);

  return (
    <>
      <PageHero
        title="본인부담금 계산기"
        sub="등급과 본인부담률에 따른 월 본인부담액을 즉시 확인"
        crumbs={[
          { label: '노인장기요양보험', href: '/insurance' },
          { label: '본인부담금 계산기' },
        ]}
      />

      {/* 계산기 */}
      <section className="bg-white py-16">
        <div className="max-w-[1000px] mx-auto px-5">
          <SectionBlock
            eyebrow="CALCULATOR"
            title="조건 선택"
            sub="등급과 본인부담률을 선택하면 월 부담액이 자동 계산됩니다"
            className="mb-10"
          />

          {/* 입력 */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="block text-sm font-bold text-ink-primary mb-3">
                장기요양 등급
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(MONTHLY_LIMITS).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`py-3 text-sm font-semibold transition-colors ${
                      grade === g
                        ? 'bg-brand-400 text-white'
                        : 'bg-gray-50 text-ink-secondary hover:bg-brand-50'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    {g === '인지' ? '인지지원' : `${g}등급`}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink-primary mb-3">
                본인부담률
              </label>
              <div className="space-y-2">
                {Object.entries(RATES).map(([k, r]) => (
                  <label
                    key={k}
                    className={`flex items-center gap-3 p-3 cursor-pointer border transition-colors ${
                      rateKey === k
                        ? 'border-brand-400 bg-brand-50'
                        : 'border-gray-200 hover:border-brand-300'
                    }`}
                  >
                    <input
                      type="radio"
                      checked={rateKey === k}
                      onChange={() => setRateKey(k)}
                      className="accent-brand-400"
                    />
                    <span className="flex-1 text-sm">
                      <span className="font-semibold text-ink-primary">{r.label}</span>
                      <span className="text-ink-muted ml-2 text-xs">{r.desc}</span>
                    </span>
                    <span className="font-bold text-brand-400">
                      {(r.rate * 100).toFixed(0)}%
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 결과 — 정체성 색 highlight + 변경 시 부드러운 transition */}
          <div
            key={`${grade}-${rateKey}`}
            className="bg-gradient-to-br from-brand-50 to-brand-100 p-8 md:p-10 border-2 border-brand-600 transition-colors duration-500"
            style={{ animation: 'resultFlash 0.5s ease-out' }}
          >
            <p className="text-brand-400 font-semibold tracking-[0.15em] text-sm mb-3">
              | RESULT
            </p>
            <h3 className="text-xl font-bold text-ink-primary mb-2">
              월 본인부담액 (예상)
            </h3>
            <p className="text-sm text-ink-secondary mb-6">
              장기요양 <strong className="text-brand-600">{grade === '인지' ? '인지지원등급' : `${grade}등급`}</strong>
              {' · '}
              <strong className="text-brand-600">{RATES[rateKey].label}</strong>
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="bg-white p-6 tabular-nums">
                <p className="text-xs text-ink-muted mb-2">월 한도액</p>
                <p className="text-2xl font-bold text-ink-primary">
                  <AnimatedNumber value={result.limit} suffix="원" />
                </p>
              </div>
              <div className="bg-white p-6 tabular-nums">
                <p className="text-xs text-ink-muted mb-2">공단 부담 ({((1 - result.rate) * 100).toFixed(0)}%)</p>
                <p className="text-2xl font-bold text-ink-secondary">
                  <AnimatedNumber value={result.govPay} suffix="원" />
                </p>
              </div>
              <div className="bg-brand-600 text-white p-6 tabular-nums">
                <p className="text-xs opacity-80 mb-2">본인 부담 ({(result.rate * 100).toFixed(0)}%)</p>
                <p className="text-2xl font-bold">
                  <AnimatedNumber value={result.userPay} suffix="원" />
                </p>
              </div>
            </div>

            <p className="text-xs text-ink-muted mt-5">
              * 위 금액은 2026년 기준 표준 산정액 (참고용). 실제 본인부담액은 이용 시간·서비스 종류·소득 수준에 따라 달라질 수 있습니다.
              정확한 금액은 국민건강보험공단 또는 대전케어 상담을 통해 확인하세요.
            </p>

            {/* 결과 공유/인쇄 — 가족 단톡 + 손에 들고 비교 use case (인쇄 시 자체 숨김) */}
            <div className="mt-6 pt-5 border-t border-brand-200 flex flex-wrap items-center gap-3 print:hidden">
              <span className="text-xs text-ink-muted font-semibold tracking-[0.15em]">
                | 가족과 공유
              </span>
              <ShareButton
                title="대전케어 본인부담금 계산 결과"
                text={`장기요양 ${
                  grade === '인지' ? '인지지원등급' : `${grade}등급`
                } (${RATES[rateKey].label}) — 월 본인부담 ${fmt(result.userPay)} · 공단 부담 ${fmt(result.govPay)}\n${CONTACT.name} ${CONTACT.phone}`}
              />
              <button
                type="button"
                onClick={() => typeof window !== 'undefined' && window.print()}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-ink-secondary border border-gray-200 hover:border-brand-400 px-4 py-2 text-sm font-semibold transition-colors"
                style={{ borderRadius: '2px' }}
                aria-label="본인부담금 계산 결과 인쇄"
              >
                🖨 인쇄
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 추가 정보 */}
      <section className="bg-[#f8f8f8] py-16">
        <div className="max-w-[1000px] mx-auto px-5 grid md:grid-cols-2 gap-5">
          <div className="bg-white p-7">
            <h3 className="font-bold text-ink-primary mb-3 text-lg">📋 감경 대상 자격</h3>
            <ul className="space-y-2 text-sm text-ink-secondary">
              <li>· 의료급여 수급권자</li>
              <li>· 차상위 본인부담경감 대상자</li>
              <li>· 천재지변 등으로 생계곤란 인정자</li>
              <li>· 기타 보건복지부장관이 정하는 자</li>
            </ul>
          </div>
          <div className="bg-white p-7">
            <h3 className="font-bold text-ink-primary mb-3 text-lg">💡 비용 추가 안내</h3>
            <ul className="space-y-2 text-sm text-ink-secondary">
              <li>· 본인부담금은 매월 25일 자동 청구</li>
              <li>· 신용카드·계좌이체로 납부 가능</li>
              <li>· 건강보험증 / 신분증 / 통장 사본 필요</li>
              <li>· 의료비 세액공제 항목 포함</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="정확한 비용은 상담으로"
        sub="개별 상황에 맞는 최적 비용 안내드립니다"
      />
    </>
  );
}
