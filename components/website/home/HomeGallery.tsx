'use client';

import React from 'react';
import { DeferredSection } from '@/components/website/DeferredSection';
import { OurImages } from '@/components/website/OurImages';

function GallerySkeleton() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="h-10 w-48 bg-slate-200 rounded animate-pulse mb-4" />
        <div className="h-4 w-full max-w-xl bg-slate-100 rounded animate-pulse mb-12" />
        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-[85vw] md:w-[45vw] lg:w-[calc(25%_-_18px)] flex-shrink-0 h-[300px] md:h-[400px] rounded-lg bg-slate-100 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeGallery() {
  return (
    <DeferredSection
      endpoint="/api/gallery?limit=12"
      minHeight={520}
      skeleton={<GallerySkeleton />}
    >
      {({ data, error }) => {
        if (error || !Array.isArray(data) || data.length === 0) return null;
        return <OurImages items={data} />;
      }}
    </DeferredSection>
  );
}
