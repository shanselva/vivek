import React from 'react';

export default function WebsiteLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="h-[65vh] min-h-[400px] md:h-[calc(100vh-104px)] bg-[#081221] animate-pulse" />
      <div className="container mx-auto px-4 xl:max-w-[1280px] py-16 space-y-6">
        <div className="h-8 w-40 bg-slate-200 rounded animate-pulse" />
        <div className="h-12 w-72 max-w-full bg-slate-100 rounded animate-pulse" />
        <div className="h-4 w-full max-w-2xl bg-slate-100 rounded animate-pulse" />
      </div>
    </div>
  );
}
