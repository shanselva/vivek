import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ShieldCheck, Building2, Users } from 'lucide-react';

export function AboutPreview() {
  return (
    <section className="py-12 md:py-20 lg:py-24 bg-white overflow-visible relative flex items-center min-h-[calc(100vh-104px)]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
          
          {}
          <div className="w-full lg:w-1/2 relative pt-8 pl-4 pr-4 md:pt-12 md:pl-12 lg:pr-8 mb-8 md:mb-16 lg:mb-8">
            {}
            <div className="absolute top-0 left-0 bg-[#0a42a8] text-white p-4 md:p-6 z-20 flex flex-col items-center justify-center shadow-lg">
              <span className="text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-1">Since</span>
              <span className="text-xl md:text-2xl font-bold">2007</span>
            </div>

            {}
            <div className="absolute -top-8 right-0 lg:-right-12 w-32 h-32 z-0 opacity-30">
               <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                 <defs>
                   <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                     <circle fill="#0a42a8" cx="2" cy="2" r="2.5"></circle>
                   </pattern>
                 </defs>
                 <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
               </svg>
            </div>

            {}
            <div className="relative aspect-[4/4.5] w-[85%] overflow-hidden z-10 shadow-lg bg-slate-100">
              <img 
                src="/images/building.png" 
                alt="Construction Building"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            
            {}
            <div className="absolute -bottom-6 left-0 md:-bottom-8 md:left-4 bg-[#0a42a8] text-white p-4 md:p-8 z-30 shadow-xl w-40 md:w-48 rounded-sm">
              <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">
                18+ <span className="text-base md:text-xl font-semibold">years</span>
              </div>
              <div className="text-xs md:text-sm font-medium leading-snug text-white/90">of <br/> Excellence</div>
            </div>

          </div>

          {}
          <div className="w-full lg:w-1/2 mt-4 lg:mt-0 z-20 lg:pl-12">
            <div className="mb-4">
              <span className="text-[#0a42a8] font-bold tracking-[0.15em] uppercase text-sm">
                WHO WE ARE
              </span>
              <div className="w-12 h-[3px] bg-[#0a42a8] mt-3"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-[48px] font-display font-extrabold text-[#0f172a] mb-5 leading-[1.15]">
              Shaping the <br />
              <span className="text-[#0a42a8]">
                City's Skyline
              </span>
            </h2>
            
            <p className="text-[16px] xl:text-[17px] text-slate-600 mb-6 leading-relaxed max-w-xl">
              As a premier engineering contractor in Tamil Nadu, India, we have been at the forefront of infrastructure development since 2007. We blend timeless design with cutting-edge engineering to create structures that stand the test of time.
            </p>

            {}
            <div className="grid grid-cols-3 gap-0 mb-6 py-4 border-y border-slate-100">
              <div className="text-center md:text-left flex flex-col items-center md:items-start relative border-r border-slate-200 pr-2 md:pr-4 lg:pr-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50/50 flex items-center justify-center mb-2 md:mb-4 text-[#0a42a8]">
                  <ShieldCheck size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <div className="text-xl md:text-3xl font-bold text-[#0f172a] mb-1 md:mb-2">100%</div>
                <div className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500 leading-tight">
                  CLIENT<br/>SATISFACTION
                </div>
              </div>

              <div className="text-center md:text-left flex flex-col items-center md:items-start relative border-r border-slate-200 px-2 md:px-4 lg:px-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50/50 flex items-center justify-center mb-2 md:mb-4 text-[#0a42a8]">
                  <Building2 size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <div className="text-xl md:text-3xl font-bold text-[#0f172a] mb-1 md:mb-2">150+</div>
                <div className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500 leading-tight">
                  LANDMARK<br/>PROJECTS
                </div>
              </div>

              <div className="text-center md:text-left flex flex-col items-center md:items-start pl-2 md:pl-4 lg:pl-8">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50/50 flex items-center justify-center mb-2 md:mb-4 text-[#0a42a8]">
                  <Users size={20} className="md:w-6 md:h-6" strokeWidth={1.5} />
                </div>
                <div className="text-xl md:text-3xl font-bold text-[#0f172a] mb-1 md:mb-2">50+</div>
                <div className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-slate-500 leading-tight">
                  EXPERT<br/>ENGINEERS
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 sm:gap-4 w-full mt-4">
              <Link href="/about" className="flex-1 sm:flex-none">
                <Button className="w-full rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white px-1 sm:px-8 h-11 sm:h-12 text-[11px] sm:text-base font-medium whitespace-nowrap">
                  Discover Our Legacy <ArrowRight size={14} className="ml-1 sm:ml-2 sm:w-[18px] sm:h-[18px]" />
                </Button>
              </Link>
              <Link href="/projects" className="flex-1 sm:flex-none">
                <Button variant="outline" className="w-full rounded-none border-slate-300 text-[#0f172a] hover:bg-slate-50 px-1 sm:px-8 h-11 sm:h-12 text-[11px] sm:text-base font-medium whitespace-nowrap">
                  View Our Projects <ArrowRight size={14} className="ml-1 sm:ml-2 text-slate-500 sm:w-[18px] sm:h-[18px]" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
