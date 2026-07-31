'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DeferredSection } from '@/components/website/DeferredSection';

type SectorItem = {
  title: string;
  shortDesc?: string;
  description?: string;
  image?: string;
  slug: string;
};

function SectorsSkeleton() {
  return (
    <section className="py-20 bg-[#f4f7f9]">
      <div className="container mx-auto px-4 xl:max-w-[1280px]">
        <div className="h-10 w-56 bg-slate-200 rounded animate-pulse mb-4" />
        <div className="h-4 w-full max-w-2xl bg-slate-200/70 rounded animate-pulse mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[380px] rounded-lg bg-white shadow-sm animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeSectors() {
  return (
    <DeferredSection
      endpoint="/api/services?limit=4"
      minHeight={520}
      skeleton={<SectorsSkeleton />}
    >
      {({ data, error }) => {
        const services = (Array.isArray(data) ? data : []) as SectorItem[];
        if (error) return null;

        const displaySectors = services.map((service) => ({
          title: service.title,
          description:
            service.shortDesc ||
            `${(service.description || '').substring(0, 100)}${(service.description || '').length > 100 ? '...' : ''}`,
          image: service.image || '/images/placeholder.jpg',
          link: `/services/${encodeURIComponent(service.slug)}`,
        }));

        return (
          <section className="py-20 bg-[#f4f7f9] relative overflow-hidden">
            <div className="container mx-auto px-4 xl:max-w-[1280px]">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div className="max-w-3xl">
                  <h2 className="text-4xl md:text-[44px] font-display font-extrabold text-[#0f172a] mb-4 tracking-tight">
                    OUR SECTORS
                  </h2>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium m-0">
                    From hospitals and institutions to warehouses, bridges, and green spaces — we bring deep expertise across every major construction sector in Tamil Nadu.
                  </p>
                </div>
                <div className="shrink-0 hidden md:block">
                  <Link href="/services">
                    <Button className="rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white px-8 h-12 text-[14px] md:text-base font-medium">
                      View All Sectors <ArrowRight size={18} className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              {displaySectors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {displaySectors.map((sector, idx) => (
                    <Link
                      href={sector.link}
                      key={idx}
                      className="bg-white rounded-lg p-6 pb-0 relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(10,66,168,0.15)] transition-shadow duration-300 group flex flex-col h-full min-h-[380px] overflow-hidden"
                    >
                      <div className="absolute top-5 right-5 w-9 h-9 bg-[#0a42a8] text-white flex items-center justify-center rounded-[4px] cursor-pointer hover:bg-[#083587] transition-colors">
                        <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0f172a] mb-3 pr-10 leading-tight">{sector.title}</h3>
                      <p className="text-slate-500 text-[13px] leading-relaxed mb-4">{sector.description}</p>
                      <div className="mt-auto relative h-40 w-full -mx-2 px-2 pb-3">
                        <img
                          src={sector.image}
                          alt={sector.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 bg-white rounded-xl shadow-sm border border-slate-100">
                  <p className="text-slate-500">No sectors/services added yet. Please add them in the admin panel.</p>
                </div>
              )}

              <div className="mt-8 flex justify-center w-full md:hidden">
                <Link href="/services" className="w-full">
                  <Button size="lg" className="w-full rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white px-8 h-12 text-[14px] font-medium">
                    View All Sectors <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        );
      }}
    </DeferredSection>
  );
}
