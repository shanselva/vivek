'use client';

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type ScrollArrowButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  /** overlay = on top of carousel, inline = header row */
  variant?: 'overlay' | 'inline';
  /** brand = blue (light bg), light = glass (dark bg) */
  tone?: 'brand' | 'light';
  prevLabel?: string;
  nextLabel?: string;
};

export function ScrollArrowButtons({
  onPrev,
  onNext,
  variant = 'overlay',
  tone = 'brand',
  prevLabel = 'Scroll left',
  nextLabel = 'Scroll right',
}: ScrollArrowButtonsProps) {
  const brandBtn =
    'bg-[#0a42a8] text-white hover:bg-[#083587] shadow-lg border border-transparent';
  const lightBtn =
    'bg-white/15 text-white hover:bg-white/25 border border-white/25 backdrop-blur-sm shadow-lg';

  const toneClass = tone === 'light' ? lightBtn : brandBtn;

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label={prevLabel}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${toneClass}`}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={nextLabel}
          className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${toneClass}`}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={onPrev}
        aria-label={prevLabel}
        className={`flex absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full items-center justify-center transition-colors z-20 focus:outline-none ${toneClass}`}
      >
        <ArrowLeft size={22} />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label={nextLabel}
        className={`flex absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full items-center justify-center transition-colors z-20 focus:outline-none ${toneClass}`}
      >
        <ArrowRight size={22} />
      </button>
    </>
  );
}

export function useHorizontalScroll(amount = 0.8) {
  const ref = React.useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    const node = ref.current;
    if (!node) return;
    const delta = Math.max(280, node.clientWidth * amount);
    node.scrollBy({ left: -delta, behavior: 'smooth' });
  };

  const scrollRight = () => {
    const node = ref.current;
    if (!node) return;
    const delta = Math.max(280, node.clientWidth * amount);
    node.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return { ref, scrollLeft, scrollRight };
}
