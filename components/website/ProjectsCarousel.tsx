'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { ProjectCard } from '@/components/website/ProjectCard';
import { ScrollArrowButtons, useHorizontalScroll } from '@/components/website/ScrollArrowButtons';

export function ProjectsCarousel({ projects }: { projects: any[] }) {
  const { ref, scrollLeft, scrollRight, scrollTo } = useHorizontalScroll(0.8);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    const { scrollLeft: left, scrollWidth, clientWidth } = node;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }
    const ratio = left / maxScroll;
    const index = Math.round(ratio * (projects.length - 1));
    setActiveIndex(Math.max(0, Math.min(projects.length - 1, index)));
  }, [projects.length, ref]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    handleScroll();
    node.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      node.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll, ref]);

  if (!projects || projects.length === 0) return null;

  return (
    <div className="relative group">
      {projects.length > 1 && (
        <ScrollArrowButtons
          onPrev={scrollLeft}
          onNext={scrollRight}
          variant="overlay"
          tone="light"
          prevLabel="Previous projects"
          nextLabel="Next projects"
        />
      )}

      <div
        ref={ref}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 px-4 sm:px-8 md:px-12 lg:px-14 hide-scrollbar"
      >
        {projects.map((project, idx) => (
          <div
            key={project.id || idx}
            className="min-w-[88%] sm:min-w-[320px] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-16px)] xl:min-w-[calc(25%-18px)] snap-start shrink-0 transition-transform duration-300"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {projects.length > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8 md:mt-10">
          {projects.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollTo(idx)}
              aria-label={`Go to project slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-7 bg-[#0a42a8]'
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
