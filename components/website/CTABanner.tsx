import React from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #050b1a 0%, #0a2050 50%, #050b1a 100%)' }}>
      {}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#0a42a8] blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-[#FFB800] blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {}
          <div className="text-center lg:text-left max-w-2xl">
            <span className="text-[#FFB800] font-bold tracking-[0.15em] uppercase text-sm block mb-3">
              Start Your Project Today
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white mb-4 leading-tight">
              Ready to Build Something <span className="text-[#FFB800]">Extraordinary?</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              With 18+ years of engineering mastery across Tamil Nadu, we turn your vision into enduring landmarks. Let's talk about your next project.
            </p>
          </div>

          {}
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link href="/contact">
              <button className="flex items-center justify-center gap-2 bg-[#FFB800] hover:bg-[#E5A600] text-black font-bold px-8 py-4 text-base transition-all duration-300 hover:-translate-y-1 hover:shadow-xl whitespace-nowrap">
                Get a Free Quote <ArrowRight size={18} />
              </button>
            </Link>
            <a href="tel:+919842044777">
              <button className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 text-base border border-white/20 transition-all duration-300 hover:-translate-y-1 whitespace-nowrap">
                <Phone size={18} /> Call Us Now
              </button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
