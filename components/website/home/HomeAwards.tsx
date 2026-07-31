'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const Awards = dynamic(
  () => import('@/components/website/Awards').then((m) => m.Awards),
  {
    ssr: false,
    loading: () => (
      <section
        className="w-full min-h-[300px] md:min-h-[420px] animate-pulse"
        style={{ background: 'linear-gradient(160deg, #0f172a 0%, #0e2254 50%, #0f172a 100%)' }}
      />
    ),
  },
);

export function HomeAwards() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '280px 0px', threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : 300 }}>
      {visible ? (
        <Awards />
      ) : (
        <section
          className="w-full min-h-[300px] md:min-h-[420px]"
          style={{ background: 'linear-gradient(160deg, #0f172a 0%, #0e2254 50%, #0f172a 100%)' }}
        />
      )}
    </div>
  );
}
