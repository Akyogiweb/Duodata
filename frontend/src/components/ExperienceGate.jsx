import { useEffect, useState } from 'react';
import { FEATURE_CONNECTIONS } from '@/data/featureConnections';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';

const GatePreview = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % FEATURE_CONNECTIONS.length);
    }, 4200);
    return () => window.clearInterval(t);
  }, []);

  const pair = FEATURE_CONNECTIONS[idx];

  return (
    <div className="gate-preview" data-testid="home-gate-preview">
      <p className="gate-preview-question">{pair.businessQuestion}</p>
      <div className="gate-preview-grid">
        <div className="gate-preview-card is-business">
          <span>Business sees</span>
          <strong>{pair.feature}</strong>
          <p>{pair.businessAnswer}</p>
        </div>
        <div className="gate-preview-card is-technical">
          <span>Technical ships</span>
          <strong>{pair.label}</strong>
          <p>{pair.technicalAnswer}</p>
        </div>
      </div>
    </div>
  );
};

const ExperienceGate = () => {
  const { hasChosen, chooseExperience } = useExperience();
  if (hasChosen) return null;

  return (
    <div className="experience-gate" data-testid="home-experience-gate" role="dialog" aria-modal="true" aria-labelledby="experience-gate-title">
      <div className="experience-gate-inner">
        <p className="experience-gate-kicker">Duo Data</p>
        <h1 id="experience-gate-title" className="hero-headline experience-gate-title">
          How do you want to work?
        </h1>
        <p className="experience-gate-lede">
          One business meaning. Two experiences. The question stays the same — only the workspace changes.
        </p>
        <GatePreview />
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
        <p className="experience-gate-note">
          After you choose, switch anytime from the <strong>Business / Technical</strong> control in the top bar — that is the only switcher.
        </p>
      </div>
    </div>
  );
};

export default ExperienceGate;
