export const dynamic = 'force-dynamic';
import React, { Suspense } from 'react';
import { AboutPreview } from '@/components/website/AboutPreview';
import { HomeHero, HeroSkeleton } from '@/components/website/home/HomeHero';
import { HomeProjects } from '@/components/website/home/HomeProjects';
import { HomeSectors } from '@/components/website/home/HomeSectors';
import { HomeAwards } from '@/components/website/home/HomeAwards';
import { HomeGallery } from '@/components/website/home/HomeGallery';
import { HomeClients } from '@/components/website/home/HomeClients';

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HomeHero />
      </Suspense>

      <AboutPreview />

      <HomeProjects />
      <HomeSectors />
      <HomeAwards />
      <HomeGallery />
      <HomeClients />
    </>
  );
}
