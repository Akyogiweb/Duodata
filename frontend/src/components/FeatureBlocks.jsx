import React from 'react';
import { businessFeatures, technicalFeatures } from '@/mock';
import { useExperience } from '@/context/ExperienceContext';

const FeatureBlocks = () => {
  const { isBusiness } = useExperience();
  const blocks = isBusiness ? businessFeatures : technicalFeatures;

  return (
    <section id="solutions" className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">
            {isBusiness ? 'For this audience' : 'In this workspace'}
          </p>
          <h2 className="hero-headline text-[32px] md:text-[48px] text-slate-950">
            {isBusiness ? 'What business teams come to do.' : 'What data teams come to ship.'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {blocks.map((f) => (
            <div
              key={f.id}
              className="p-8 rounded-2xl border border-black/10 hover:border-black/20 hover:shadow-lg transition-all bg-white/80 flex flex-col"
            >
              <p className="text-[11px] tracking-[0.24em] uppercase text-slate-500 font-medium mb-4">
                {f.eyebrow}
              </p>
              <h3 className="hero-headline text-[26px] text-slate-950 mb-4">
                {f.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-slate-600 mb-6 flex-1">
                {f.description}
              </p>
              <div className="pt-4 border-t border-black/5">
                <span className="text-[13px] font-medium text-slate-800">{f.kicker}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBlocks;
