import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

export function Awards() {
  return (
    <section className="w-full" style={{ background: 'linear-gradient(160deg, #0f172a 0%, #0e2254 50%, #0f172a 100%)' }}>
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full">
        {}
        <div className="w-full md:w-2/5 lg:w-[40%] min-h-[300px] flex items-center justify-center py-8">
          <img 
            src="/images/award from stalin.jpg" 
            alt="Honorable Chief Minister Award" 
            className="w-[85%] md:w-[75%] h-auto object-contain rounded-lg shadow-lg border-2 border-white/10"
          />
        </div>

        {}
        <div className="w-full md:w-3/5 lg:w-[60%] text-white flex flex-col justify-center px-6 py-10 md:py-16 md:pr-10 lg:pr-16">
          <div className="w-full">
            <h2 className="text-4xl md:text-5xl lg:text-[44px] font-display font-extrabold mb-6 tracking-wide drop-shadow-sm text-yellow-500">
              AWARDS & RECOGNITION
            </h2>

            <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4 text-white">Chief Minister's Recognition</h3>
              <p className="text-xl font-bold text-yellow-400 mb-2">"மக்கள் பயன்பாட்டிற்கு அர்ப்பணிக்கும்"</p>
              <p className="text-lg font-semibold text-white mb-4">மாண்புமிகு தமிழ்நாடு முதலமைச்சர் திரு மு.க. ஸ்டாலின்</p>
              <p className="text-gray-300 leading-relaxed">
                We are deeply honored to receive recognition from the <strong>Honorable Chief Minister of Tamil Nadu, Thiru M.K. Stalin</strong> for the successful completion and public dedication of the <strong>"பேரறிஞர் அண்ணா திருமண மாளிகை" (Perarignar Anna Thirumana Maaligai)</strong>. This milestone stands as a true testament to VIVEK VIJAY & CO's commitment to building landmarks that serve the people with unmatched quality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
