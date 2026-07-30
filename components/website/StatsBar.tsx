import React from 'react';

export function StatsBar() {
  const stats = [
    { number: '18+', label: 'Years of Excellence' },
    { number: '150+', label: 'Projects Completed' },
    { number: '50+', label: 'Expert Engineers' },
    { number: '100%', label: 'On-Time Delivery' },
  ];

  return (
    <div className="bg-secondary text-primary py-12 border-b-4 border-primary/20">
      <div className="container mx-auto px-4 xl:max-w-[1280px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-primary/20">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl font-display font-bold mb-2">
                {stat.number}
              </span>
              <span className="text-sm md:text-base font-semibold uppercase tracking-wider opacity-80">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
