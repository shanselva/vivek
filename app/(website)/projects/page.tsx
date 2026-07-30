import React from 'react';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { Project } from '@/lib/models/Project';
import { ProjectCard } from '@/components/website/ProjectCard';
import { CTABanner } from '@/components/website/CTABanner';
import { HeroSlider } from '@/components/website/HeroSlider';

export const dynamic = 'force-dynamic';

export default async function ProjectsPortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let projects: any[] = [];
  let categories: string[] = [];
  let heroImages: string[] = [];

  try {
    await connectDB();
    const filter = category ? { category } : {};
    
    const rawProjects = await Project.find(filter).sort({ createdAt: -1 }).lean();
    projects = JSON.parse(JSON.stringify(rawProjects.map((p: any) => ({
      ...p,
      id: p._id?.toString()
    }))));

    const allProjects = await Project.find().select('category').lean();
    categories = Array.from(new Set(allProjects.map((p: any) => p.category).filter(Boolean))) as string[];

    const featuredProjects = await Project.find({ featured: true })
      .select('coverImage images createdAt')
      .sort({ createdAt: -1 })
      .lean();

    heroImages = featuredProjects
      .map((p: any) => {
        const parsedImages = (typeof p.images === 'string' && p.images.startsWith('[')) ? JSON.parse(p.images) : (p.images ? [p.images] : []);
        return p.coverImage || (parsedImages.length > 0 ? parsedImages[0] : null);
      })
      .filter(Boolean) as string[];
  } catch (error) {
    console.error('Database error in ProjectsPage:', error);
  }

  return (
    <>
      <div className="relative bg-[#0f172a] pt-40 pb-20 min-h-[65vh] flex flex-col justify-center overflow-hidden">
        {}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/WhatsApp%20Image%202024-09-09%20at%202.08.28%20PM.jpeg" 
            alt="Tamil Nadu Construction Landmark Project" 
            className="w-full h-full object-cover object-[center_35%] opacity-90"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent w-2/3"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 md:px-8 xl:max-w-[1280px]">
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-display font-bold text-white mb-4 drop-shadow-md">
            Our <span className="text-yellow-500">Projects</span>
          </h1>
          <p className="text-base md:text-[17px] text-gray-200 max-w-2xl drop-shadow leading-relaxed">
            Explore our extensive portfolio of successful civil engineering landmarks, industrial complexes, hospitals, and infrastructure developments across Tamil Nadu. Every structure represents our 18+ year commitment to safety, architectural beauty, and enduring strength.
          </p>
        </div>
      </div>

      <section className="py-16 bg-surface min-h-[50vh]">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          
          {}
          <div className="flex overflow-x-auto whitespace-nowrap gap-3 md:gap-4 mb-12 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
            <Link 
              href="/projects" 
              scroll={false}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 border ${
                !category 
                  ? 'bg-[#0a42a8] text-white border-[#0a42a8] shadow-md shadow-blue-900/20' 
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#0a42a8] hover:text-[#0a42a8] shadow-sm hover:shadow-md'
              }`}
            >
              All Projects
            </Link>
            {categories.map((cat) => (
              <Link 
                key={cat}
                href={`/projects?category=${encodeURIComponent(cat)}`} 
                scroll={false}
                className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 border ${
                  category === cat 
                    ? 'bg-[#0a42a8] text-white border-[#0a42a8] shadow-md shadow-blue-900/20' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#0a42a8] hover:text-[#0a42a8] shadow-sm hover:shadow-md'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          {}
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-border">
              <h3 className="text-xl font-bold text-text-dark mb-2">No projects found</h3>
              <p className="text-text-medium">There are currently no projects matching this category.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}