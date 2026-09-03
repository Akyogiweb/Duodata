import React from 'react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';

const AudienceBridge = () => {
  const { isBusiness, setExperience } = useExperience();

  const copy = isBusiness
    ? {
        kicker: 'Still connected',
        title: 'The same answers are implemented on the technical side.',
        body: 'When you ask what changed, your data team can show the formula, the lineage, and the platform mapping — without a second dictionary.',
        action: 'See how it’s implemented',
        next: EXPERIENCES.technical,
      }
    : {
        kicker: 'Still connected',
        title: 'The same objects answer the business’s questions.',
        body: 'What you version, map, and ship is what product, sales, and operators ask against. Switch to see the conversation they have with that meaning.',
        action: 'See the business experience',
        next: EXPERIENCES.business,
      };

  return (
    <section id="connect" className="py-20 md:py-24" data-testid="home-audience-bridge">
      <div className="max-w-[880px] mx-auto px-6 text-center">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">{copy.kicker}</p>
        <h2 className="hero-headline text-[32px] md:text-[48px] text-slate-950">{copy.title}</h2>
        <p className="mt-5 text-slate-600 text-[15px] leading-relaxed">{copy.body}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="pill-btn-dark"
            data-testid="home-bridge-switch"
            onClick={() => {
              setExperience(copy.next);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            {copy.action}
          </button>
        </div>
        <p className="mt-4 text-[12px] text-slate-500">
          Shared semantics: metrics · slices · reports · sources
        </p>
      </div>
    </section>
  );
};

export default AudienceBridge;
