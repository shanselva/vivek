import { ContentPageSkeleton } from '@/components/website/PageLoadingSkeleton';

export default function Loading() {
  return <ContentPageSkeleton cards={4} cols="md:grid-cols-2" />;
}
