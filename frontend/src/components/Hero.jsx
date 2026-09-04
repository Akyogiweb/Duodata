import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useDemoModal } from '@/context/DemoModalContext';
import { useExperience } from '@/context/ExperienceContext';
import ConversationHero from '@/components/ConversationHero';
import TechnicalWorkspace from '@/components/TechnicalWorkspace';
import QuestionCycle from '@/components/QuestionCycle';

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
  const { isBusiness, experience } = useExperience();

  return (
    <section id="hero" className="relative w-full overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <FixedGrid />
      <QuestionCycle experience={experience} />
      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {isBusiness ? (
          <div className="flex flex-col items-center text-center">
            <p className="text-[11px] md:text-[12px] tracking-[0.32em] uppercase font-medium text-slate-500 mb-5">
              Business experience
            </p>
            <ConversationHero />
            <p className="mt-8 max-w-lg text-[14px] text-slate-600">
              One governed meaning for product, sales, and operators — the same object your data team implements.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center text-center">
              <p className="text-[11px] md:text-[12px] tracking-[0.32em] uppercase font-medium text-slate-500 mb-5">
                Technical experience
              </p>
              <h1 className="hero-headline text-[40px] sm:text-[56px] md:text-[80px] lg:text-[92px] text-slate-950 max-w-5xl leading-[0.92]">
                Define it. Govern it.
                <br />
                <span style={{ color: '#1E5FEE' }}>Implement it.</span>
              </h1>
              <p className="mt-6 max-w-2xl text-slate-600 text-[15px] md:text-[17px] leading-relaxed">
                The workspace to define, version, map, and ship the same business concepts — each one paired with the question the business asks.
              </p>
            </div>
            <div className="mt-12 md:mt-16">
              <TechnicalWorkspace />
            </div>
          </>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button onClick={demo.open} className="pill-btn-primary" data-testid="home-hero-cta">
            Book a demo
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
          <a href="#start" className="px-5 py-2.5 rounded-full border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-white/80">
            See how to start
          </a>
        </div>

        <p className="mt-10 text-center text-[12px] tracking-[0.18em] uppercase text-slate-500">
          SOC 2 Type II · GDPR · ISO 27001 · HIPAA ready
        </p>
      </div>
    </section>
  );
};

export default Hero;
