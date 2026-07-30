'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin, Calendar, Building2, Home, Landmark } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  
  const categoryLower = project.category.toLowerCase();
  let CategoryIcon = Landmark;
  if (categoryLower.includes('commercial') || categoryLower.includes('industrial')) CategoryIcon = Building2;
  if (categoryLower.includes('residential') || categoryLower.includes('villa') || categoryLower.includes('apartment')) CategoryIcon = Home;

  return (
    <Link href={`/projects/${project.slug}`} className="group block h-full">
      <div className="relative h-full min-h-[320px] lg:min-h-[380px] rounded-lg overflow-hidden bg-[#0f172a] shadow-xl border-none transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-[#0a42a8]/20 flex flex-col">
        
        {}
        <img
          src={project.coverImage || (project.images && project.images.length > 0 ? project.images[0] : '/images/placeholder.jpg')}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover object-[center_top] transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
          }}
        />
        
        {}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
        
        {}
        <div className="absolute top-5 left-5 z-20">
          <div className="bg-[#0a42a8] text-white text-[10px] font-bold uppercase tracking-[0.1em] px-3 py-1.5 rounded-md shadow-md flex items-center gap-1.5">
            <CategoryIcon size={14} className="text-white" />
            {project.category}
          </div>
        </div>

        {}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end z-20">
          <h3 className="text-[20px] lg:text-[22px] font-display font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-200 transition-colors">
            {project.title}
          </h3>
          
          <div className="flex items-center gap-1.5 text-white/80 text-[13px] mb-3">
            <MapPin size={14} className="text-white" />
            <span className="line-clamp-1">{project.location || 'Multiple Locations'}</span>
          </div>

          {}
          <div className="flex items-center gap-4 text-white/70 text-[12px] mb-3 pb-3 border-b border-white/20">
            {project.client && (
              <div className="flex items-center gap-1.5">
                <Building2 size={14} className="text-white" />
                <span className="truncate max-w-[120px]">{project.client}</span>
              </div>
            )}
            {project.year && (
              <div className="flex items-center gap-1.5">
                <Calendar size={14} className="text-white" />
                <span>Completed: {project.year}</span>
              </div>
            )}
          </div>
          
          {}
          <div className="flex items-center gap-1.5 text-[14px] font-medium text-white group-hover:text-blue-200 transition-colors">
            View Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}