'use client';

import React from 'react';
import { ScrollArrowButtons, useHorizontalScroll } from '@/components/website/ScrollArrowButtons';

interface ClientItem {
  id: string;
  name: string;
  logo: string;
}

export function ClientsMarquee({ initialClients = [] }: { initialClients?: ClientItem[] }) {
  const { ref, scrollLeft, scrollRight } = useHorizontalScroll(0.7);

  if (!initialClients || initialClients.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200 relative select-none">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-wide">
            Delivering Infrastructure for <span className="text-[#0a42a8]">Premier Institutions</span>
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2 font-medium">
            Proudly executing landmark civil engineering developments across Tamil Nadu
          </p>
        </div>

        <div className="relative">
          <ScrollArrowButtons
            onPrev={scrollLeft}
            onNext={scrollRight}
            variant="overlay"
            tone="brand"
            prevLabel="Previous clients"
            nextLabel="Next clients"
          />

          <div
            ref={ref}
            className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar py-4 px-14 md:px-16"
          >
            {initialClients.map((client) => (
              <div
                key={client.id}
                className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md hover:border-[#0a42a8]/40 group snap-start shrink-0 min-w-[220px]"
              >
                <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={client.name}
                    loading="lazy"
                    decoding="async"
                    className="max-w-full max-h-full object-contain filter group-hover:scale-110 transition-transform"
                  />
                </div>
                <span className="text-sm font-bold text-slate-800 whitespace-nowrap tracking-wide">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
