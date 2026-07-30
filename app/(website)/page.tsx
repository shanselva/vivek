import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/website/Hero';
import { AboutPreview } from '@/components/website/AboutPreview';
import { ServiceCard } from '@/components/website/ServiceCard';
import { ProjectCard } from '@/components/website/ProjectCard';
import { OurSectors } from '@/components/website/OurSectors';
import { Awards } from '@/components/website/Awards';
import { OurImages } from '@/components/website/OurImages';
import { Button } from '@/components/ui/Button';
import { connectDB } from '@/lib/db';
import { Project } from '@/lib/models/Project';
import { GalleryItem } from '@/lib/models/GalleryItem';
import { Client } from '@/lib/models/Client';
import { ArrowRight } from 'lucide-react';
import { ProjectsCarousel } from '@/components/website/ProjectsCarousel';
import { ClientsMarquee } from '@/components/website/ClientsMarquee';


export const dynamic = 'force-dynamic';

export default async function HomePage() {
  let featuredProjects: any[] = [];
  let galleryItems: any[] = [];
  let clients: any[] = [];

  try {
    await connectDB();
    const rawClients = await Client.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    clients = JSON.parse(JSON.stringify(rawClients.map((c: any) => ({ ...c, id: c._id?.toString() }))));

    const rawFeaturedProjects = await Project.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    featuredProjects = JSON.parse(JSON.stringify(rawFeaturedProjects.map((p: any) => ({
      ...p,
      id: p._id?.toString()
    }))));

    const rawGalleryItems = await GalleryItem.find()
      .sort({ order: 1 })
      .limit(12)
      .lean();
      
    galleryItems = JSON.parse(JSON.stringify(rawGalleryItems.map((i: any) => ({ ...i, id: i._id?.toString() }))));
  } catch (error) {
    console.error('Database error in HomePage:', error);
  }

  return (
    <>
      <Hero />
      <AboutPreview />

      {}

      {}
      <section className="py-8 md:py-10 overflow-hidden relative" style={{ background: 'linear-gradient(160deg, #0f172a 0%, #0e2254 50%, #0f172a 100%)' }}>
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-display font-extrabold text-white mb-4 leading-tight">
                Landmarks That Define Excellence
              </h2>
              <p className="text-slate-300 text-[17px] leading-relaxed m-0">
                Explore a selection of our landmark projects that reflect our commitment to quality, innovation, and timely delivery.
              </p>
            </div>
            <div className="hidden md:block shrink-0">
              <Link href="/projects">
                <Button className="rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white px-8 h-12 text-[14px] md:text-base font-medium">
                  View All Projects <ArrowRight size={18} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <ProjectsCarousel projects={featuredProjects} />

            {}
            <div className="mt-8 md:hidden flex justify-center w-full">
              <Link href="/projects" className="w-full">
                <Button size="lg" className="w-full rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white px-8 h-12 text-[14px] font-medium">
                  View All Projects <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <OurSectors />
      <Awards />
      <OurImages items={galleryItems} />
      <ClientsMarquee initialClients={clients} />
    </>
  );
}