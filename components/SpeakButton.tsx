'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

/**
 * Wave 378: Web Speech API (speechSynthesis) — 어르신 시력 약자 음성 보조.
 * 라이브러리 0, 브라우저 내장. Chrome/Safari/Edge 모두 Korean 음성 지원.
 *
 * SpeakableSpecification JSON-LD (StructuredData.tsx, voice assistant)와 보완:
 * - SpeakableSpec: 외부 voice assistant (Siri/Google) 음성 인식
 * - SpeakButton: 사이트 내 explicit button (페이지 안에서 직접 듣기)
 *
 * Wave 441: Korean voice 명시 선택 — lang='ko-KR'만으론 브라우저가 영어 voice로 fallback,
 * 어르신에게 무의미한 발음. getVoices() + voiceschanged event로 한국어 voice 보장.
 *
 * 미지원 브라우저: button 비표시 (graceful degrade).
 */
export function SpeakButton({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);
  const [koVoice, setKoVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    setSupported(true);

    // Wave 441: 한국어 voice 탐색 — voices는 async 로드 (voiceschanged event 필수)
    const findKoreanVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      const ko =
        voices.find((v) => v.lang === 'ko-KR') ||
        voices.find((v) => v.lang.startsWith('ko'));
      if (ko) setKoVoice(ko);
    };

    findKoreanVoice();
    window.speechSynthesis.addEventListener('voiceschanged', findKoreanVoice);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', findKoreanVoice);
      // 페이지 떠날 때 음성 중단
      window.speechSynthesis.cancel();
    };
  }, []);

  if (!supported) return null;

  const handleClick = () => {
    const synth = window.speechSynthesis;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ko-KR';
    // Wave 441: Korean voice 명시 — 영어 voice fallback 시 발음 불명확 방지
    if (koVoice) utter.voice = koVoice;
    utter.rate = 0.95; // 어르신 부담 없는 약간 느린 속도
    utter.pitch = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    synth.speak(utter);
    setSpeaking(true);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={speaking}
      aria-label={speaking ? '음성 듣기 정지' : '음성으로 듣기'}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors ${
        speaking
          ? 'bg-[#E63946] hover:bg-[#C12A37] text-white'
          : 'bg-brand-50 hover:bg-brand-100 text-brand-600 border border-brand-200'
      } ${className}`}
      style={{ borderRadius: '2px' }}
    >
      {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
      {speaking ? '정지' : '음성으로 듣기'}
    </button>
  );
}
