'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DeferredSection } from '@/components/website/DeferredSection';
import { ProjectsCarousel } from '@/components/website/ProjectsCarousel';
import { ScrollArrowButtons } from '@/components/website/ScrollArrowButtons';

function ProjectsSkeleton() {
  return (
    <section className="py-8 md:py-10 overflow-hidden relative" style={{ background: 'linear-gradient(160deg, #0f172a 0%, #0e2254 50%, #0f172a 100%)' }}>
      <div className="container mx-auto px-4">
        <div className="h-10 w-72 bg-white/10 rounded animate-pulse mb-4" />
        <div className="h-4 w-full max-w-xl bg-white/5 rounded animate-pulse mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-[320px] lg:h-[380px] rounded-lg bg-white/5 animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeProjects() {
  return (
    <DeferredSection
      endpoint="/api/projects?featured=true&limit=10"
      minHeight={480}
      skeleton={<ProjectsSkeleton />}
    >
      {({ data, error }) => {
        const projects = Array.isArray(data) ? data : [];
        if (error || projects.length === 0) return null;

        return (
          <section
            className="py-8 md:py-10 relative"
            style={{ background: 'linear-gradient(160deg, #0f172a 0%, #0e2254 50%, #0f172a 100%)' }}
          >
            <div className="container mx-auto px-4">
              <ProjectsCarousel
                projects={projects}
                headerActions={({ scrollLeft, scrollRight }) => (
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div className="max-w-3xl">
                      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-display font-extrabold text-white mb-4 leading-tight">
                        Landmarks That Define Excellence
                      </h2>
                      <p className="text-slate-300 text-[17px] leading-relaxed m-0">
                        Explore a selection of our landmark projects that reflect our commitment to quality, innovation, and timely delivery.
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center gap-3">
                      <div className="hidden sm:block">
                        <ScrollArrowButtons
                          onPrev={scrollLeft}
                          onNext={scrollRight}
                          variant="inline"
                          tone="light"
                          prevLabel="Previous projects"
                          nextLabel="Next projects"
                        />
                      </div>
                      <Link href="/projects" className="hidden md:block">
                        <Button className="rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white px-8 h-12 text-[14px] md:text-base font-medium">
                          View All Projects <ArrowRight size={18} className="ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              />

              <div className="mt-8 md:hidden flex justify-center w-full">
                <Link href="/projects" className="w-full">
                  <Button size="lg" className="w-full rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white px-8 h-12 text-[14px] font-medium">
                    View All Projects <ArrowRight size={16} className="ml-2" />
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
