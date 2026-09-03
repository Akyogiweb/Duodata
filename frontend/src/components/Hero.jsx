import React from 'react';
import { ChevronRight, ShieldCheck, Lock } from 'lucide-react';
import { complianceBadges } from '@/mock';
import { useDemoModal } from '@/context/DemoModalContext';
import { useExperience } from '@/context/ExperienceContext';
import ExperienceSwitch from '@/components/ExperienceSwitch';
import ConversationHero from '@/components/ConversationHero';
import TechnicalWorkspace from '@/components/TechnicalWorkspace';

const FixedGrid = () => (
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(to right, rgba(15,23,42,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.035) 1px, transparent 1px)',
      backgroundSize: '160px 100%, 100% 80px',
    }}
  />
);

const Hero = () => {
  const demo = useDemoModal();
  const { isBusiness } = useExperience();

  return (
    <section className="relative w-full overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <FixedGrid />
      <div className="relative max-w-[1200px] mx-auto px-6">
        {isBusiness ? (
          <div className="flex flex-col items-center text-center">
            <div className="mb-8">
              <ExperienceSwitch />
            </div>
            <ConversationHero />
            <p className="mt-8 max-w-md text-[13px] text-slate-500">
              Answers in business language — calculation, sources, and lineage stay one switch away.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center">
              <p className="text-[11px] md:text-[12px] tracking-[0.32em] uppercase font-medium text-slate-500 mb-5">
                Technical experience
              </p>
              <h1 className="hero-headline text-[40px] sm:text-[56px] md:text-[80px] lg:text-[96px] text-slate-950 max-w-5xl leading-[0.95]">
                Define it. Govern it.
                <br />
                <span style={{ color: '#1E5FEE' }}>Implement it.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-slate-600 text-[15px] md:text-[17px] leading-relaxed">
                The workspace to define, version, map, and ship the same business concepts across your data platforms — connected to the questions the business asks.
              </p>
              <div className="mt-8">
                <ExperienceSwitch />
              </div>
            </div>
            <div className="mt-12 md:mt-16">
              <TechnicalWorkspace />
            </div>
          </>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button onClick={demo.open} className="pill-btn-dark" data-testid="home-hero-cta">
            Get started for free
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4 opacity-80">
          {complianceBadges.map((b, i) => {
            const Icon = i % 2 === 0 ? ShieldCheck : Lock;
            return (
              <div key={b.id} className="flex items-center gap-2">
                <Icon size={16} className="text-slate-500" />
                <div className="leading-tight">
                  <div className="text-[11px] font-semibold text-slate-700">{b.label}</div>
                  <div className="text-[10px] text-slate-500">{b.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
