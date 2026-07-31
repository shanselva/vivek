import { connectDB } from '@/lib/db';
import { Banner } from '@/lib/models/Banner';
import { Hero } from '@/components/website/Hero';

export async function HomeHero() {
  let banners: unknown[] = [];

  try {
    await connectDB();
    const raw = await Banner.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    banners = JSON.parse(
      JSON.stringify(
        raw.map((b: { _id: { toString(): string } }) => ({
          ...b,
          id: b._id.toString(),
        })),
      ),
    );
  } catch (error) {
    console.error('Unable to load hero banners:', error);
  }

  return <Hero initialItems={banners as never[]} />;
}

export function HeroSkeleton() {
  return (
    <div className="relative h-[65vh] min-h-[400px] md:h-[calc(100vh-104px)] md:min-h-[600px] bg-[#081221]" />
  );
}
