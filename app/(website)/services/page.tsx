import React from 'react';
import Link from 'next/link';
import { connectDB } from '@/lib/db';
import { Service } from '@/lib/models/Service';
import { ServiceCard } from '@/components/website/ServiceCard';
import { CTABanner } from '@/components/website/CTABanner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Services',
  description: 'Explore Vivek Vijay and Company comprehensive construction services — hospitals, commercial buildings, roads, bridges, landscaping and more across Tamil Nadu.',
};

export default async function ServicesPage() {
  let services: any[] = [];
  try {
    await connectDB();
    const rawServices = await Service.find().sort({ order: 1 }).lean();
    services = JSON.parse(JSON.stringify(rawServices.map((s: any) => ({ ...s, id: s._id?.toString() }))));
  } catch (error) {
    console.error('Database error in ServicesPage:', error);
  }

  return (
    <>
      {}
      <div className="relative pt-40 pb-20 overflow-hidden bg-[#0f172a] min-h-[65vh] flex flex-col justify-center">
        {}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/tamil_services_hero.png" 
            alt="Services background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent w-3/4"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 xl:max-w-[1280px] relative z-10 w-full">
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-display font-bold text-white mb-4 leading-tight drop-shadow-md">
            Our <span className="text-yellow-500">Services</span>
          </h1>
          <p className="text-base md:text-[17px] text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
            Comprehensive construction solutions tailored to meet the unique engineering requirements of government bodies, institutions, and businesses across Tamil Nadu. From turnkey project execution to specialized structural planning, we ensure precision at every milestone.
          </p>
        </div>
      </div>

      <section className="py-20 bg-surface min-h-[50vh]">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service as any} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-border">
              <h3 className="text-xl font-bold text-text-dark mb-2">No services found</h3>
              <p className="text-text-medium">We are currently updating our service offerings.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}