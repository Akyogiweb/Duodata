import React from 'react';
import { useExperience } from '@/context/ExperienceContext';

const Pillar = ({ side, title, question, verbs, active }) => (
  <div
    className={`duo-pillar ${active ? 'is-active' : ''}`}
    data-side={side}
  >
    <p className="text-[11px] tracking-[0.24em] uppercase text-slate-500 font-medium mb-3">{title}</p>
    <p className="hero-headline text-[22px] md:text-[28px] text-slate-950 mb-4">{question}</p>
    <p className="text-[14px] text-slate-600">{verbs}</p>
  </div>
);

const DuoArchitecture = () => {
  const { isBusiness, isTechnical } = useExperience();

  return (
    <section id="product" className="py-20 md:py-28 bg-white" data-testid="home-duo-architecture">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Why it’s called Duo</p>
          <h2 className="hero-headline text-[36px] md:text-[56px] text-slate-950">
            Business + technical.
            <br />
            <span style={{ color: '#1E5FEE' }}>One shared meaning.</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-slate-600 text-[15px] leading-relaxed">
            Two audiences. One foundation. Business questions and technical implementation stay on the same metrics, slices, reports, and sources.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-0">
          <Pillar
            side="business"
            title="Business experience"
            question="What does this mean?"
            verbs="Ask · Understand · Explore · Decide"
            active={isBusiness}
          />
          <div className="hidden md:flex flex-col items-center justify-center px-4">
            <div className="w-px flex-1 bg-slate-200" />
            <div className="duo-join">Duo</div>
            <div className="w-px flex-1 bg-slate-200" />
          </div>
          <Pillar
            side="technical"
            title="Technical experience"
            question="How is this implemented?"
            verbs="Define · Govern · Version · Deploy"
            active={isTechnical}
          />
        </div>

        <div className="mt-6 md:mt-0 flex justify-center">
          <div className="duo-shared">
            <p className="text-[11px] tracking-[0.22em] uppercase text-slate-500 font-medium mb-2">Shared semantics</p>
            <p className="text-[15px] md:text-[16px] font-medium text-slate-900">
              Metrics · Slices · Reports · Sources
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DuoArchitecture;
