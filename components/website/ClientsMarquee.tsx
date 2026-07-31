'use client';

import React from 'react';

interface ClientItem {
  id: string;
  name: string;
  logo: string;
}

export function ClientsMarquee({ initialClients = [] }: { initialClients?: ClientItem[] }) {
  if (!initialClients || initialClients.length === 0) return null;
  
  
  const marqueeItems = [...initialClients, ...initialClients, ...initialClients];

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200 relative overflow-hidden select-none">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes infiniteScrollMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.3333%); }
          }
          .custom-marquee-track {
            display: flex;
            width: max-content;
            animation: infiniteScrollMarquee 30s linear infinite;
          }
          .custom-marquee-track:hover {
            animation-play-state: paused;
          }
        `
      }} />

      <div className="container mx-auto px-4 text-center mb-10 relative z-10">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-slate-900 tracking-wide">
          Delivering Infrastructure for <span className="text-[#0a42a8]">Premier Institutions</span>
        </h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto mt-2 font-medium">
          Proudly executing landmark civil engineering developments across Tamil Nadu
        </p>
      </div>

      {}
      <div className="relative w-full overflow-hidden flex items-center py-4 before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-24 before:bg-gradient-to-r before:from-slate-50 before:to-transparent after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-24 after:bg-gradient-to-l after:from-slate-50 after:to-transparent">
        <div className="custom-marquee-track gap-8 sm:gap-10 items-center">
          {marqueeItems.map((client, idx) => (
            <div 
              key={`${client.id}-${idx}`}
              className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm transition-all hover:shadow-md hover:border-[#0a42a8]/40 group"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center">
                <img src={client.logo} alt={client.name} loading="lazy" decoding="async" className="max-w-full max-h-full object-contain filter group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm font-bold text-slate-800 whitespace-nowrap tracking-wide">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
