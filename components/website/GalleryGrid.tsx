'use client';

import React, { useState } from 'react';
import type { GalleryItem } from '@/types';
import { X, Maximize2, Play } from 'lucide-react';

function getYoutubeVideoId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!items || items.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item, index) => {
          const isYoutube = !!item.youtubeUrl;
          const videoId = isYoutube ? getYoutubeVideoId(item.youtubeUrl!) : null;
          const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : item.url;

          return (
            <div 
              key={item.id} 
              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={thumbnailUrl} 
                alt={item.caption || 'Gallery Image'} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {isYoutube && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-black/60 rounded-full flex items-center justify-center">
                    <Play className="text-white ml-1" size={24} fill="currentColor" />
                  </div>
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                <Maximize2 className="text-white mb-2" size={32} />
                {item.caption && (
                  <span className="text-white text-center px-4 font-medium">
                    {item.caption}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm">
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X size={32} />
          </button>
          
          <div className="relative w-full max-w-6xl mx-auto px-4 flex items-center justify-center h-full">
            {items.length > 1 && (
              <button 
                onClick={prevImage}
                className="absolute left-4 md:left-12 text-white/50 hover:text-white p-4"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>
            )}

            <div className="flex flex-col items-center max-h-screen py-12 w-full">
              {items[currentIndex].youtubeUrl ? (
                <iframe 
                  className="w-full max-w-4xl aspect-video rounded-md shadow-2xl" 
                  src={`https://www.youtube.com/embed/${getYoutubeVideoId(items[currentIndex].youtubeUrl!)}?autoplay=1`} 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              ) : (
                <img 
                  src={items[currentIndex].url} 
                  alt={items[currentIndex].caption || 'Gallery Image'} 
                  className="max-h-[80vh] w-auto object-contain rounded-md shadow-2xl"
                />
              )}
              {items[currentIndex].caption && (
                <p className="text-white mt-6 text-lg max-w-3xl text-center">
                  {items[currentIndex].caption}
                </p>
              )}
            </div>

            {items.length > 1 && (
              <button 
                onClick={nextImage}
                className="absolute right-4 md:right-12 text-white/50 hover:text-white p-4"
              >
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
