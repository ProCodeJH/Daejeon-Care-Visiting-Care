'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, MapPin, Phone } from 'lucide-react';
import { CONTACT } from '@/lib/contact';

const SERVICES = [
  { value: 'care', label: '방문요양' },
  { value: 'bath', label: '방문목욕' },
  { value: 'nursing', label: '방문간호' },
  { value: 'consult', label: '먼저 상담만' },
];

const REGIONS = [
  { value: 'yuseong', label: '유성구' },
  { value: 'daedeok', label: '대덕구' },
  { value: 'seo', label: '서구' },
  { value: 'jung', label: '중구' },
  { value: 'dong', label: '동구' },
  { value: 'unsure', label: '잘 모르겠어요' },
];

const GRADES = [
  { value: 'have', label: '등급 있음' },
  { value: 'pending', label: '신청 중' },
  { value: 'none', label: '아직 없음' },
];

/**
 * UPMC Schedule an Appointment 모듈 패턴 (Lazyweb 0.64 similarity).
 * 3-axis 통합: 서비스 / 지역 / 등급 → 통합 CTA.
 */
export function HeroBookingModule() {
  const [service, setService] = useState('');
  const [region, setRegion] = useState('');
  const [grade, setGrade] = useState('');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-surface-canvas rounded-3xl border border-surface-vellum shadow-xl p-6 md:p-8 max-w-2xl"
    >
      <p className="text-sage-700 font-semibold text-sm tracking-wide mb-1">
        무료 상담 신청 / 30초
      </p>
      <h3 className="text-2xl font-bold mb-5">필요한 케어를 알려주세요</h3>

      <div className="space-y-4">
        <SelectField
          label="어떤 서비스를"
          value={service}
          onChange={setService}
          options={SERVICES}
          placeholder="서비스 선택"
        />
        <SelectField
          label="어디에서"
          value={region}
          onChange={setRegion}
          options={REGIONS}
          placeholder="대전 5구 중"
          icon={<MapPin size={16} />}
        />
        <SelectField
          label="장기요양 등급"
          value={grade}
          onChange={setGrade}
          options={GRADES}
          placeholder="등급 상태"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          type="button"
          className="flex-1 bg-sage-500 hover:bg-sage-700 text-white px-6 py-3.5 rounded-full font-semibold transition-colors"
        >
          상담 신청하기
        </button>
        <a
          href={CONTACT.phoneTel}
          className="flex items-center justify-center gap-2 bg-surface-paper hover:bg-surface-vellum text-ink-primary px-6 py-3.5 rounded-full font-semibold transition-colors"
        >
          <Phone size={16} /> 전화로
        </a>
      </div>

      <p className="text-xs text-ink-muted mt-4 text-center">
        평일 09:00-18:00 · 주말 상담 가능 · 비용 안내 무료
      </p>
    </motion.div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs text-ink-muted font-medium">{label}</span>
      <div className="relative mt-1">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted">
            {icon}
          </span>
        )}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full appearance-none border border-surface-vellum rounded-xl py-3 pr-10 ${
            icon ? 'pl-10' : 'pl-4'
          } bg-surface-canvas text-ink-primary focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-transparent`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
        />
      </div>
    </label>
  );
}
