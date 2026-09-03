import React from 'react';
import { technicalCapabilities } from '@/mock';

const TechnicalStory = () => (
    <section className="py-20 md:py-28 bg-slate-50/80 border-y border-black/5" data-testid="home-technical-story">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">For data and technology teams</p>
        <h2 className="hero-headline text-[36px] md:text-[56px] text-slate-950">
          Define it. Govern it. Implement it.
        </h2>
        <p className="mt-5 text-slate-600 text-[15px] md:text-[16px] leading-relaxed">
          The technical experience to define, govern, version, map, and implement the same business concepts across your data platforms.
          Make that business meaning real, governed, and consistent across the stack.
        </p>
        <p className="mt-6 text-[15px] font-medium text-slate-900">
          Business definition → formula → lineage → source → implementation → platform
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {technicalCapabilities.map((item) => (
          <div
            key={item}
            className="rounded-xl bg-white border border-black/10 px-4 py-4 text-[13px] md:text-[14px] font-medium text-slate-800"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechnicalStory;
