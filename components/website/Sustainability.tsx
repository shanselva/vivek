import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export function Sustainability() {
  return (
    <section className="flex flex-col md:flex-row w-full min-h-[500px]">
      {}
      <div className="w-full md:w-1/3 lg:w-[35%] h-[300px] md:h-auto relative">
        <img 
          src="/images/placeholder.jpg" 
          alt="Sustainability - Plant in Hands" 
          className="w-full h-full object-cover"
        />
      </div>

      {}
      <div className="w-full md:w-2/3 lg:w-[65%] relative bg-[#519e59] text-white flex flex-col justify-center px-8 py-16 md:p-16 lg:p-24 overflow-hidden">
        {}
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src="/images/placeholder.jpg" 
            alt="Leaves background" 
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto w-full pl-6 pr-6 md:pl-16 md:pr-16">
          {}
          <button className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a42a8] text-white flex items-center justify-center hover:bg-[#083587] transition-colors shadow-lg z-20">
            <ArrowLeft size={20} />
          </button>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#0a42a8] text-white flex items-center justify-center hover:bg-[#083587] transition-colors shadow-lg z-20">
            <ArrowRight size={20} />
          </button>

          <h2 className="text-4xl md:text-5xl lg:text-[44px] font-display font-extrabold mb-6 tracking-wide drop-shadow-sm">
            SUSTAINABILITY
          </h2>
          
          <p className="text-base md:text-[17px] leading-relaxed mb-8 text-white/95 font-medium drop-shadow-sm">
            At VIVEK VIJAY & CO. we are not only aligned to India's vision of sustainability and climate change but are also at the forefront of the massive global effort aimed at combating climate change and bringing about more environmentally responsible growth.
          </p>
          
          <div className="w-10 h-10 bg-white text-black flex items-center justify-center rounded-[4px] cursor-pointer hover:bg-gray-100 transition-colors shadow-md">
            <ArrowUpRight size={20} />
          </div>

          {}
          <div className="flex justify-center gap-2 mt-12 md:mt-16">
            <div className="w-6 h-1.5 rounded-full bg-white"></div>
            <div className="w-6 h-1.5 rounded-full bg-white"></div>
            <div className="w-6 h-1.5 rounded-full bg-[#0a42a8]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
