import React from 'react';
import { featureBlocks } from '@/mock';
import { ArrowRight } from 'lucide-react';

const FeatureBlocks = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {featureBlocks.map((f) => (
            <div
              key={f.id}
              className="p-8 rounded-2xl border border-black/10 hover:border-black/20 hover:shadow-lg transition-all bg-white flex flex-col"
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
              <div className="flex items-center justify-between pt-4 border-t border-black/5">
                <span className="text-[13px] font-medium text-slate-800">{f.kicker}</span>
                <a className="arrow-link text-[13px]" href="#">
                  Learn more <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBlocks;
