import React from 'react';
import { connectDB } from '@/lib/db';
import { Career } from '@/lib/models/Career';
import { CareersClient } from '@/components/website/CareersClient';
import { CTABanner } from '@/components/website/CTABanner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Careers | Build Your Future with Us',
  description: 'Explore exciting career opportunities at Vivek Vijay and Company. Join premier engineering contractors shaping hospitals, roads, commercial spaces, and infrastructure across Tamil Nadu.',
};

export default async function CareersPage() {
  let careers: any[] = [];
  try {
    await connectDB();
    const rawCareers = await Career.find({ isActive: true }).sort({ order: 1, createdAt: -1 }).lean();
    careers = JSON.parse(JSON.stringify(rawCareers.map((c: any) => ({ ...c, id: c._id?.toString() }))));
  } catch (error) {
    console.error('Database connection error in CareersPage:', error);
  }



  return (
    <>
      {}
      <div className="relative pt-36 pb-12 sm:pt-44 sm:pb-16 overflow-hidden bg-[#0f172a] min-h-[42vh] sm:min-h-[50vh] flex flex-col justify-center">
        {}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/tamil_services_hero.png" 
            alt="Careers background" 
            className="w-full h-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-black/35"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/60 to-transparent w-4/5"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 xl:max-w-[1280px] relative z-10 w-full pt-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-5 leading-tight drop-shadow-lg max-w-3xl">
            Build Excellence, <br /><span className="text-[#FFB800]">Shape Your Career</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed max-w-2xl drop-shadow-md font-normal">
            At Vivek Vijay &amp; Co., we combine six decades of engineering tradition with cutting-edge modern innovation. Discover opportunities to grow, lead, and construct landmark hospitals, institutions, and infrastructure across Tamil Nadu. Join us in shaping the future skyline.
          </p>
        </div>
      </div>

      <CareersClient initialCareers={careers as any} />

      <CTABanner />
    </>
  );
}
