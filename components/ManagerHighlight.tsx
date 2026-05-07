'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, MapPin, Heart } from 'lucide-react';

/**
 * Healow Provider Profile 패턴 — 자격/언어/지역/한마디.
 * 익명성 + 신뢰감 균형 (성씨 + 연차 + 자격 + 한마디).
 */
const SAMPLE_MANAGERS = [
  {
    id: 'm01',
    surname: '김 매니저',
    yearsExp: 9,
    cert: ['요양보호사 1급', '사회복지사 2급'],
    region: '유성구 / 서구',
    philosophy: '서두르지 않고 어르신 페이스에 맞추는 것이 첫 번째.',
    highlights: ['치매 어르신', '일상 동반'],
    avatar: '👩‍⚕️',
  },
  {
    id: 'm02',
    surname: '이 매니저',
    yearsExp: 14,
    cert: ['요양보호사 1급', '간호조무사'],
    region: '대덕구 / 동구',
    philosophy: '몸이 불편할수록 마음이 편안해야 합니다.',
    highlights: ['거동 보조', '식사 케어'],
    avatar: '🧑‍⚕️',
  },
  {
    id: 'm03',
    surname: '박 매니저',
    yearsExp: 7,
    cert: ['요양보호사 1급'],
    region: '중구 / 서구',
    philosophy: '말벗이 되어드리는 것도 중요한 케어입니다.',
    highlights: ['정서 지원', '취미 동반'],
    avatar: '👨‍⚕️',
  },
];

export function ManagerHighlight() {
  return (
    <section className="container py-20">
      <div className="text-center mb-12">
        <p className="text-sage-700 font-semibold tracking-wide mb-2">MANAGERS</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-3">곁에서 함께하는 매니저</h2>
        <p className="text-ink-secondary">자격을 갖춘 90+명. 어르신과 어울리는 매니저로 매칭합니다.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-8">
        {SAMPLE_MANAGERS.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-surface-canvas rounded-2xl border border-surface-vellum p-6 hover:border-sage-500 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-sage-50 grid place-items-center text-3xl">
                {m.avatar}
              </div>
              <div>
                <p className="font-bold text-lg">{m.surname}</p>
                <p className="text-sm text-ink-muted">경력 {m.yearsExp}년차</p>
              </div>
            </div>

            <blockquote className="text-ink-secondary italic mb-4 leading-relaxed">
              "{m.philosophy}"
            </blockquote>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Award size={14} className="text-sage-700 mt-0.5 shrink-0" />
                <span className="text-ink-secondary">{m.cert.join(' · ')}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-sage-700 mt-0.5 shrink-0" />
                <span className="text-ink-secondary">{m.region}</span>
              </div>
              <div className="flex items-start gap-2">
                <Heart size={14} className="text-sage-700 mt-0.5 shrink-0" />
                <span className="text-ink-secondary">{m.highlights.join(' · ')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/managers"
          className="inline-block border border-sage-500 hover:bg-sage-50 text-sage-700 px-7 py-3 rounded-full font-semibold transition-colors"
        >
          매니저 90+명 전체 보기
        </Link>
      </div>
    </section>
  );
}
