'use client';

import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  
  useEffect(() => {
    if (testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-4xl mx-auto px-12">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center relative border border-border">
        {}
        <div className="absolute top-4 left-4 md:top-8 md:left-8 text-primary/5">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.017 21L16.017 14H11.017V3H22.017V14.5L18.017 21H14.017ZM2.01697 21L4.01697 14H-0.983032V3H10.017V14.5L6.01697 21H2.01697Z" />
          </svg>
        </div>

        {}
        <div className="flex justify-center gap-1 mb-6 relative z-10">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={20} 
              className={i < current.rating ? 'text-secondary fill-secondary' : 'text-gray-200'} 
            />
          ))}
        </div>

        {}
        <p className="text-lg md:text-xl text-text-dark font-medium italic mb-8 relative z-10 leading-relaxed">
          "{current.message}"
        </p>

        {}
        <div className="flex items-center justify-center gap-4 relative z-10">
          {current.image && (
            <img 
              src={current.image} 
              alt={current.name} 
              className="w-14 h-14 rounded-full object-cover border-2 border-primary/10"
            />
          )}
          <div className="text-left">
            <h4 className="font-bold text-text-dark">{current.name}</h4>
            <p className="text-sm text-text-medium">
              {current.designation}{current.company ? ` at ${current.company}` : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {testimonials.length > 1 && (
        <>
          <button 
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-md border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentIndex ? 'bg-secondary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
