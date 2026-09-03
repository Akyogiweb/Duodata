import React from 'react';
import { businessMeanings } from '@/mock';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';

const BusinessMeanings = () => {
  const { setExperience } = useExperience();

  return (
    <section className="py-20 md:py-28" data-testid="home-business-meanings">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">What you see</p>
          <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950">
            Meaning first. Machinery behind it.
          </h2>
          <p className="mt-4 text-slate-600 text-[15px] leading-relaxed">
            Business users see the definition they can stand behind. The calculation, sources, and lineage stay one switch away.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {businessMeanings.map((m) => (
            <article key={m.metric} className="rounded-2xl border border-black/10 bg-white/80 p-7">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#1E5FEE] font-medium">{m.metric}</p>
              <p className="mt-3 text-[16px] text-slate-900 leading-relaxed">{m.meaning}</p>
              <p className="mt-5 text-[12px] text-slate-500">Owner · {m.owner}</p>
              <p className="text-[12px] text-slate-500">Used in · {m.usedIn}</p>
              <button
                type="button"
                className="mt-5 text-[13px] font-medium text-[#1E5FEE] hover:underline"
                onClick={() => {
                  setExperience(EXPERIENCES.technical);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                See how this is implemented
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessMeanings;
