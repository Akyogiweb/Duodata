import React from 'react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import { useDemoModal } from '@/context/DemoModalContext';

const AudienceBridge = () => {
  const { isBusiness, openExperience } = useExperience();
  const demo = useDemoModal();

  if (isBusiness) {
    return (
      <section id="connect" className="py-20 md:py-24" data-testid="home-audience-bridge">
        <div className="max-w-[880px] mx-auto px-6 text-center">
          <p className="page-eyebrow">Ready to move forward?</p>
          <h2 className="hero-headline text-[32px] md:text-[48px] text-slate-950">
            Stop spending meetings on definitions.
          </h2>
          <p className="page-description mx-auto">
            Bring one number your team argues about. We&apos;ll help you align on what it means — so the next conversation is about what to do, not what to count.
          </p>
          <div className="mt-8">
            <button type="button" className="pill-btn-primary" data-testid="home-bridge-demo" onClick={demo.open}>
              Book a conversation
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="connect" className="py-20 md:py-24" data-testid="home-audience-bridge">
      <div className="max-w-[880px] mx-auto px-6 text-center">
        <p className="page-eyebrow">Still connected</p>
        <h2 className="hero-headline text-[32px] md:text-[48px] text-slate-950">
          The same objects answer the business&apos;s questions.
        </h2>
        <p className="page-description mx-auto">
          What you version, map, and ship is what product, sales, and operators ask against. Switch to see the conversation they have with that meaning.
        </p>
        <div className="mt-8">
          <button
            type="button"
            className="pill-btn-primary"
            data-testid="home-bridge-switch"
            onClick={() => openExperience(EXPERIENCES.business, 'connection')}
          >
            See the business experience
          </button>
        </div>
      </div>
    </section>
  );
};

export default AudienceBridge;
