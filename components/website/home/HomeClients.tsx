'use client';

import React from 'react';
import { DeferredSection } from '@/components/website/DeferredSection';
import { ClientsMarquee } from '@/components/website/ClientsMarquee';

function ClientsSkeleton() {
  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="container mx-auto px-4 text-center mb-10">
        <div className="h-8 w-80 max-w-full mx-auto bg-slate-200 rounded animate-pulse mb-3" />
        <div className="h-4 w-96 max-w-full mx-auto bg-slate-100 rounded animate-pulse" />
      </div>
      <div className="flex gap-8 px-8 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-16 w-48 flex-shrink-0 rounded-2xl bg-white border border-slate-200 animate-pulse" />
        ))}
      </div>
    </section>
  );
}

export function HomeClients() {
  return (
    <DeferredSection
      endpoint="/api/clients"
      minHeight={240}
      skeleton={<ClientsSkeleton />}
    >
      {({ data, error }) => {
        if (error || !Array.isArray(data) || data.length === 0) return null;
        return <ClientsMarquee initialClients={data} />;
      }}
    </DeferredSection>
  );
}
