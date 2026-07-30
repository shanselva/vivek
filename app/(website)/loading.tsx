import React from 'react';

export default function WebsiteLoading() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center pt-20 px-4">
      <div className="flex flex-col items-center gap-4 animate-pulse">
        <div className="w-16 h-16 rounded-full border-4 border-[#FFB800] border-t-transparent animate-spin"></div>
        <p className="text-white font-serif tracking-widest uppercase text-sm font-semibold">
          Loading Vivek Vijay &amp; Co...
        </p>
      </div>
    </div>
  );
}
