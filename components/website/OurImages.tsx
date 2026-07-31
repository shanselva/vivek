'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ScrollArrowButtons, useHorizontalScroll } from '@/components/website/ScrollArrowButtons';

export function OurImages({ items = [] }: { items?: any[] }) {
  const { ref, scrollLeft, scrollRight } = useHorizontalScroll(0.8);

  if (!items || items.length === 0) {
    return null;
  }

  const getYoutubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const displayItems = items
    .map((item) => {
      if (item.youtubeUrl) {
        const videoId = getYoutubeVideoId(item.youtubeUrl);
        if (videoId) return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
      return item.url || '';
    })
    .filter(Boolean);

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-[44px] font-display font-extrabold text-[#0f172a] mb-4 tracking-tight">
              OUR GALLERY
            </h2>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-medium m-0">
              Explore a visual journey of our iconic projects, construction processes, and the dedicated teams behind our success.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <div className="hidden sm:block">
              <ScrollArrowButtons
                onPrev={scrollLeft}
                onNext={scrollRight}
                variant="inline"
                tone="brand"
                prevLabel="Scroll gallery left"
                nextLabel="Scroll gallery right"
              />
            </div>
            <Link href="/gallery" className="hidden md:block">
              <Button className="rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white px-8 h-12 text-[14px] md:text-base font-medium">
                View All Gallery <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative">
          <ScrollArrowButtons
            onPrev={scrollLeft}
            onNext={scrollRight}
            variant="overlay"
            tone="brand"
            prevLabel="Previous gallery images"
            nextLabel="Next gallery images"
          />

          <div
            ref={ref}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-14 md:px-16"
          >
            {displayItems.map((src, idx) => (
              <div
                key={idx}
                className="w-[75vw] md:w-[42vw] lg:w-[calc(25%_-_18px)] flex-shrink-0 h-[300px] md:h-[400px] snap-center rounded-lg overflow-hidden shadow-md group relative cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Gallery Image ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/40">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 md:hidden flex justify-center">
          <Link href="/gallery" className="w-full">
            <Button className="w-full rounded-none bg-[#0a42a8] hover:bg-[#083587] text-white h-12 text-[14px] font-medium flex justify-center items-center">
              View All Gallery <ArrowRight size={18} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
