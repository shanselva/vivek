import React from 'react';
import { connectDB } from '@/lib/db';
import { Service } from '@/lib/models/Service';
import { notFound } from 'next/navigation';
import { CTABanner } from '@/components/website/CTABanner';
import { Badge } from '@/components/ui/Badge';
import { Wrench, HardHat, Home, Building2, Hammer, CheckCircle2, ArrowLeft, Clock, Phone, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ElementType> = {
  Wrench,
  HardHat,
  Home,
  Building2,
  Hammer,
};

export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  await connectDB();
  const rawService = await Service.findOne({ slug }).lean() as any;
  const service = rawService ? { ...rawService, id: rawService._id.toString() } : null;

  if (!service) {
    notFound();
  }

  const IconComponent = service.icon && iconMap[service.icon] ? iconMap[service.icon] : HardHat;

  return (
    <>
      {}
      <div className="relative bg-[#0f172a] pt-40 pb-20 min-h-[65vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image || '/images/placeholder.jpg'} 
            alt={service.title} 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/10 to-transparent w-3/4"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-8">
          <Badge className="mb-4 text-sm px-4 py-1 flex items-center gap-2 w-max" variant="warning">
            <IconComponent size={14} />
            Service Excellence
          </Badge>
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-display font-bold text-white mb-4 drop-shadow-md leading-tight">
            {service.title}
          </h1>
        </div>
      </div>

      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {}
            <div className="lg:col-span-2">
              <Link href="/services" className="inline-flex items-center text-text-medium hover:text-primary mb-8 font-medium transition-colors">
                <ArrowLeft size={16} className="mr-2" />
                Back to Services
              </Link>
              
              <h2 className="text-3xl font-display font-bold text-text-dark mb-6">Service Overview</h2>
              <div className="prose prose-lg max-w-none text-text-medium mb-12">
                <div className="whitespace-pre-wrap">{service.description}</div>
              </div>

              {}
              <div className="bg-white rounded-xl p-8 border border-border shadow-sm">
                <h3 className="text-2xl font-bold text-text-dark mb-6">Why Choose Us For This Service?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-secondary shrink-0 mt-1" size={24} />
                    <p className="text-text-medium">Industry-leading safety standards</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-secondary shrink-0 mt-1" size={24} />
                    <p className="text-text-medium">Experienced project managers</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-secondary shrink-0 mt-1" size={24} />
                    <p className="text-text-medium">Transparent pricing & timelines</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-secondary shrink-0 mt-1" size={24} />
                    <p className="text-text-medium">High-quality materials & finish</p>
                  </div>
                </div>
              </div>
            </div>

            {}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-xl border border-border sticky top-32 shadow-sm">
                <h3 className="text-xl font-bold text-text-dark mb-6 border-b border-border pb-4">
                  Service Details
                </h3>
                
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <Building2 className="text-secondary shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block text-sm text-text-light mb-1">Provider</span>
                      <span className="font-semibold text-text-dark">Vivek Vijay & Company</span>
                    </div>
                  </li>
                  
                  <li className="flex items-start gap-4">
                    <ShieldCheck className="text-secondary shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block text-sm text-text-light mb-1">Quality</span>
                      <span className="font-semibold text-text-dark">ISO Certified Standards</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Clock className="text-secondary shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block text-sm text-text-light mb-1">Availability</span>
                      <span className="font-semibold text-text-dark">Full-Time Operation</span>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <Phone className="text-secondary shrink-0 mt-1" size={20} />
                    <div>
                      <span className="block text-sm text-text-light mb-1">Consultation</span>
                      <Link href="/contact" className="font-semibold text-[#0a42a8] hover:underline">Book Now</Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}