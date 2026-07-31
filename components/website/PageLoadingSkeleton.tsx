import React from 'react';

function Pulse({ className = '' }: { className?: string }) {
 return <div className={`animate-pulse rounded bg-slate-200/80 ${className}`} />;
}

function HeroBannerSkeleton({ taller = false }: { taller?: boolean }) {
 return (
 <div
 className={`relative overflow-hidden bg-[#0f172a] flex flex-col justify-end ${
 taller ? 'min-h-[65vh] pt-40 pb-20' : 'min-h-[50vh] pt-36 pb-12'
 }`}
 >
 <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent animate-pulse" />
 <div className="container mx-auto px-4 md:px-8 relative z-10 w-full space-y-4">
 <Pulse className="h-10 md:h-12 w-64 md:w-96 bg-white/15" />
 <Pulse className="h-4 w-full max-w-2xl bg-white/10" />
 <Pulse className="h-4 w-4/5 max-w-xl bg-white/10" />
 </div>
 </div>
 );
}

function GridCardsSkeleton({ count = 6, cols = 'md:grid-cols-2 lg:grid-cols-3' }: { count?: number; cols?: string }) {
 return (
 <div className={`grid grid-cols-1 ${cols} gap-6`}>
 {Array.from({ length: count }).map((_, i) => (
 <Pulse key={i} className="h-72 md:h-80 w-full bg-slate-100" />
 ))}
 </div>
 );
}

export function HomePageSkeleton() {
 return (
 <div className="bg-white" aria-busy="true" aria-live="polite">
 <div className="relative h-[65vh] min-h-[400px] md:h-[calc(100vh-104px)] md:min-h-[600px] bg-[#081221]">
 <div className="absolute inset-0 animate-pulse bg-gradient-to-t from-black/40 via-transparent to-transparent" />
 <div className="absolute bottom-10 md:bottom-14 left-4 md:left-16 right-4 space-y-4 max-w-3xl">
 <Pulse className="h-10 md:h-14 w-3/4 bg-white/15" />
 <Pulse className="h-4 w-40 bg-white/10" />
 <Pulse className="h-4 w-full max-w-xl bg-white/10" />
 </div>
 </div>
 <div className="container mx-auto px-4 py-16 md:py-24">
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
 <Pulse className="aspect-[4/4.5] w-[85%] bg-slate-100" />
 <div className="space-y-4">
 <Pulse className="h-3 w-28" />
 <Pulse className="h-12 w-72 max-w-full" />
 <Pulse className="h-4 w-full" />
 <Pulse className="h-4 w-5/6" />
 <div className="grid grid-cols-3 gap-4 pt-4">
 <Pulse className="h-20" />
 <Pulse className="h-20" />
 <Pulse className="h-20" />
 </div>
 </div>
 </div>
 </div>
 </div>
 );
}

export function ContentPageSkeleton({
 cards = 6,
 cols = 'md:grid-cols-2 lg:grid-cols-3',
 compactHero = false,
}: {
 cards?: number;
 cols?: string;
 compactHero?: boolean;
}) {
 return (
 <div className="bg-white" aria-busy="true" aria-live="polite">
 <HeroBannerSkeleton taller={!compactHero} />
 <section className="py-16 md:py-20 bg-surface">
 <div className="container mx-auto px-4 space-y-8">
 <div className="flex flex-wrap gap-3">
 <Pulse className="h-10 w-24 rounded-full" />
 <Pulse className="h-10 w-28 rounded-full" />
 <Pulse className="h-10 w-32 rounded-full" />
 </div>
 <GridCardsSkeleton count={cards} cols={cols} />
 </div>
 </section>
 </div>
 );
}

export function DetailPageSkeleton() {
 return (
 <div className="bg-white" aria-busy="true" aria-live="polite">
 <HeroBannerSkeleton />
 <section className="py-16 md:py-20">
 <div className="container mx-auto px-4">
 <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-10">
 <div className="space-y-4">
 <Pulse className="h-8 w-2/3" />
 <Pulse className="h-4 w-full" />
 <Pulse className="h-4 w-full" />
 <Pulse className="h-4 w-4/5" />
 <Pulse className="h-64 w-full mt-6" />
 </div>
 <div className="space-y-4">
 <Pulse className="h-48 w-full" />
 <Pulse className="h-12 w-full" />
 <Pulse className="h-12 w-full" />
 </div>
 </div>
 </div>
 </section>
 </div>
 );
}

export function ContactPageSkeleton() {
 return (
 <div className="bg-white" aria-busy="true" aria-live="polite">
 <HeroBannerSkeleton />
 <section className="py-20 bg-surface">
 <div className="container mx-auto px-4">
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
 <div className="space-y-4">
 <Pulse className="h-24 w-full" />
 <Pulse className="h-24 w-full" />
 <Pulse className="h-24 w-full" />
 </div>
 <div className="lg:col-span-2">
 <Pulse className="h-[420px] w-full" />
 </div>
 </div>
 </div>
 </section>
 </div>
 );
}

export function LegalPageSkeleton() {
 return (
 <div className="bg-white min-h-[60vh]" aria-busy="true" aria-live="polite">
 <div className="bg-[#0f172a] py-20">
 <div className="container mx-auto px-4 space-y-4">
 <Pulse className="h-10 w-72 bg-white/15" />
 <Pulse className="h-4 w-96 max-w-full bg-white/10" />
 </div>
 </div>
 <div className="container mx-auto px-4 py-16 space-y-4">
 <Pulse className="h-4 w-full" />
 <Pulse className="h-4 w-full" />
 <Pulse className="h-4 w-5/6" />
 <Pulse className="h-4 w-full" />
 <Pulse className="h-4 w-2/3" />
 </div>
 </div>
 );
}
