import React from 'react';
import { ChevronRight, ShieldCheck, Lock } from 'lucide-react';
import { useDemoModal } from '@/context/DemoModalContext';
import { useExperience } from '@/context/ExperienceContext';
import QuestionCycle from '@/components/QuestionCycle';
import { complianceBadges } from '@/mock';

const Hero = () => {
  const demo = useDemoModal();
  const { isBusiness, experience } = useExperience();

  return (
    <section id="hero" className="hero-shell" data-testid="home-hero">
      <div className="hero-stage">
        <QuestionCycle experience={experience} />
        <div className="hero-lockup">
          <p className="hero-kicker">{isBusiness ? 'Business experience' : 'Technical experience'}</p>
          <h1 className="hero-context-word">Context</h1>
          <p className="hero-context-sub">
            {isBusiness
              ? 'When every team has a different answer to the same question'
              : 'For your warehouse, semantic views, BI and agents'}
          </p>
          <button type="button" onClick={demo.open} className="hero-context-cta" data-testid="home-hero-cta">
            Book a demo
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      <div className="hero-trust">
        {complianceBadges.map((b, i) => {
          const Icon = i % 2 === 0 ? ShieldCheck : Lock;
          return (
            <div key={b.id} className="hero-trust-item">
              <Icon size={15} />
              <span>
                <strong>{b.label}</strong>
                {b.sub ? ` ${b.sub}` : ''}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Hero;
