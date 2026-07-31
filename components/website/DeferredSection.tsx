'use client';

import React, { useEffect, useRef, useState } from 'react';

type DeferredSectionProps = {
  children: (state: { data: unknown; error: string | null }) => React.ReactNode;
  endpoint: string;
  rootMargin?: string;
  skeleton?: React.ReactNode;
  minHeight?: number | string;
};

export function DeferredSection({
  children,
  endpoint,
  rootMargin = '280px 0px',
  skeleton,
  minHeight = 320,
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!shouldLoad) return;

    const controller = new AbortController();
    setLoading(true);

    fetch(endpoint, { signal: controller.signal })
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.error || 'Failed to load section');
        }
        setData(json.data);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load section');
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [endpoint, shouldLoad]);

  return (
    <div ref={ref} style={{ minHeight: shouldLoad && data ? undefined : minHeight }}>
      {!shouldLoad || loading || (!data && !error)
        ? skeleton ?? (
            <div className="w-full animate-pulse bg-slate-100/80 rounded-lg" style={{ minHeight }} />
          )
        : children({ data, error })}
    </div>
  );
}
