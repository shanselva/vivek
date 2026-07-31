'use client';

import React, { Suspense } from 'react';
import { NavigationProgress } from '@/components/website/NavigationProgress';

export function NavigationProgressProvider() {
  return (
    <Suspense fallback={null}>
      <NavigationProgress />
    </Suspense>
  );
}
