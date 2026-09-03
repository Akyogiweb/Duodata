import React from 'react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import DuodataMark from '@/components/DuodataMark';

const ExperienceGate = () => {
  const { hasChosen, chooseExperience } = useExperience();
  if (hasChosen) return null;

  return (
    <div className="experience-gate" data-testid="home-experience-gate" role="dialog" aria-modal="true" aria-labelledby="experience-gate-title">
      <div className="experience-gate-inner">
        <DuodataMark size={36} />
        <p className="experience-gate-kicker">Duo Data</p>
        <h1 id="experience-gate-title" className="hero-headline experience-gate-title">
          How do you want to enter?
        </h1>
        <p className="experience-gate-lede">
          One business meaning. Two ways to work with it. Choose an experience — you can switch anytime.
        </p>
        <div className="experience-gate-choices">
          <button
            type="button"
            className="experience-choice experience-choice-business"
            data-testid="home-gate-business"
            onClick={() => chooseExperience(EXPERIENCES.business)}
          >
            <span className="experience-choice-theme">Light</span>
            <span className="experience-choice-name">Business</span>
            <span className="experience-choice-copy">Ask. Understand. Decide — in business language.</span>
          </button>
          <button
            type="button"
            className="experience-choice experience-choice-technical"
            data-testid="home-gate-technical"
            onClick={() => chooseExperience(EXPERIENCES.technical)}
          >
            <span className="experience-choice-theme">Dark</span>
            <span className="experience-choice-name">Technical</span>
            <span className="experience-choice-copy">Define. Govern. Implement — across the stack.</span>
          </button>
        </div>
        <p className="experience-gate-note">We’ll remember this on this device. Use Business / Technical in the nav to switch.</p>
      </div>
    </div>
  );
};

export default ExperienceGate;
