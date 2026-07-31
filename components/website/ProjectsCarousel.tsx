'use client';

import React from 'react';
import { ProjectCard } from '@/components/website/ProjectCard';
import { ScrollArrowButtons, useHorizontalScroll } from '@/components/website/ScrollArrowButtons';

export function ProjectsCarousel({
  projects,
  headerActions,
}: {
  projects: any[];
  headerActions?: (controls: { scrollLeft: () => void; scrollRight: () => void }) => React.ReactNode;
}) {
  const { ref, scrollLeft, scrollRight } = useHorizontalScroll(0.75);

  return (
    <div className="space-y-0">
      {headerActions ? headerActions({ scrollLeft, scrollRight }) : null}

      <div className="relative">
        <ScrollArrowButtons
          onPrev={scrollLeft}
          onNext={scrollRight}
          variant="overlay"
          tone="light"
          prevLabel="Previous projects"
          nextLabel="Next projects"
        />

        <div
          ref={ref}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 px-14 md:px-16 hide-scrollbar"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-start shrink-0"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8 md:mt-12">
          <div className="w-6 h-2 rounded-full bg-[#0a42a8]" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
          <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
}
