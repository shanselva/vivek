import { ContentPageSkeleton } from '@/components/website/PageLoadingSkeleton';

export default function Loading() {
  return <ContentPageSkeleton cards={9} cols="md:grid-cols-2 lg:grid-cols-3" />;
}
