import React from 'react';
import { connectDB } from '@/lib/db';
import { GalleryItem } from '@/lib/models/GalleryItem';
import { GalleryGrid } from '@/components/website/GalleryGrid';
import { CTABanner } from '@/components/website/CTABanner';

export const dynamic = 'force-dynamic';

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let galleryItems: any[] = [];
  let categories: string[] = [];
  try {
    await connectDB();
    const filter = category ? { category } : {};
    
    const rawGalleryItems = await GalleryItem.find(filter).sort({ order: 1 }).lean();
    galleryItems = JSON.parse(JSON.stringify(rawGalleryItems.map((i: any) => ({ ...i, id: i._id?.toString() }))));

    const allItems = await GalleryItem.find().select('category').lean();
    categories = Array.from(new Set(allItems.map((i: any) => i.category).filter(Boolean))) as string[];
  } catch (error) {
    console.error('Database error in GalleryPage:', error);
  }

  return (
    <>
      {}
      <div className="relative pt-40 pb-20 overflow-hidden bg-[#0f172a] min-h-[65vh] flex flex-col justify-center">
        {}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/tamil_gallery_hero.png" 
            alt="Gallery background" 
            className="w-full h-full object-cover object-center opacity-90"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent w-2/3"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 xl:max-w-[1280px] relative z-10 w-full">
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-display font-bold text-white mb-4 leading-tight drop-shadow-md">
            Image <span className="text-yellow-500">Gallery</span>
          </h1>
          <p className="text-base md:text-[17px] text-gray-200 leading-relaxed max-w-2xl drop-shadow-md">
            A rich visual showcase of our structural craftsmanship, on-site execution progress, and completed architectural landmarks across Tamil Nadu. Witness the dedication, safety standards, and engineering mastery behind every project.
          </p>
        </div>
      </div>

      <section className="py-16 bg-surface min-h-[50vh]">
        <div className="container mx-auto px-4 xl:max-w-[1280px]">
          
          {}
          <div className="flex overflow-x-auto whitespace-nowrap gap-3 md:gap-4 mb-12 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:justify-center">
            <a 
              href="/gallery" 
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-sm border ${
                !category 
                  ? 'bg-[#0a42a8] text-white border-[#0a42a8]' 
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-[#0a42a8] hover:text-white hover:border-[#0a42a8]'
              }`}
            >
              All Images
            </a>
            {categories.map((cat) => (
              <a 
                key={cat}
                href={`/gallery?category=${encodeURIComponent(cat as string)}`} 
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-sm border ${
                  category === cat 
                    ? 'bg-[#0a42a8] text-white border-[#0a42a8]' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-[#0a42a8] hover:text-white hover:border-[#0a42a8]'
                }`}
              >
                {cat}
              </a>
            ))}
          </div>

          {}
          {galleryItems.length > 0 ? (
            <GalleryGrid items={galleryItems as any} />
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-border">
              <h3 className="text-xl font-bold text-text-dark mb-2">No images found</h3>
              <p className="text-text-medium">Check back later for updates to our gallery.</p>
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </>
  );
}