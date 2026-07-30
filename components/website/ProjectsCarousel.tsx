'use client';

import React, { useRef } from 'react';
import { ProjectCard } from '@/components/website/ProjectCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function ProjectsCarousel({ projects }: { projects: any[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group">
      {}
      <div 
        onClick={scrollLeft}
        className="hidden lg:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-colors z-10"
      >
        <ChevronLeft size={24} />
      </div>
      <div 
        onClick={scrollRight}
        className="hidden lg:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 border border-white/10 items-center justify-center text-white/70 hover:bg-white/10 hover:text-white cursor-pointer transition-colors z-10"
      >
        <ChevronRight size={24} />
      </div>

      {}
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {projects.map((project) => (
          <div key={project.id} className="min-w-[100%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-start shrink-0">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>

      {}
      <div className="flex justify-center gap-2 mt-8 md:mt-12">
        <div className="w-6 h-2 rounded-full bg-[#0a42a8]"></div>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
        <div className="w-2 h-2 rounded-full bg-white/20"></div>
      </div>
    </div>
  );
}
