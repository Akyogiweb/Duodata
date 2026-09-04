import { useState } from 'react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import MeaningBridge from '@/components/MeaningBridge';
import { DuodataFullLogo } from '@/components/DuodataMark';

const ExperienceGate = () => {
  const { hasChosen, chooseExperience } = useExperience();
  const [lean, setLean] = useState(null);

  if (hasChosen) return null;

  return (
    <div className="experience-gate" data-testid="home-experience-gate" role="dialog" aria-modal="true" aria-labelledby="experience-gate-title">
      <div className="gate-grid" aria-hidden />
      <div className="experience-gate-inner">
        <div className="gate-brand">
          <p>Semantic layer</p>
          <DuodataFullLogo height={22} />
        </div>
        <h1 id="experience-gate-title" className="sr-only">
          Choose your Duo Data experience
        </h1>
        <p className="gate-lede">One shared meaning. Two ways in.</p>

        <div className="gate-stage">
          <button
            type="button"
            className={`gate-side is-business ${lean === 'business' ? 'is-hot' : ''}`}
            data-testid="home-gate-business"
            onMouseEnter={() => setLean('business')}
            onMouseLeave={() => setLean(null)}
            onFocus={() => setLean('business')}
            onBlur={() => setLean(null)}
            onClick={() => chooseExperience(EXPERIENCES.business)}
          >
            <span className="gate-side-name">Business teams</span>
            <span className="gate-side-kicker">Business surface</span>
            <span className="gate-side-copy">Ask. Understand. Decide.</span>
          </button>

          <div className="gate-bridge-wrap">
            <MeaningBridge lean={lean} />
            <p className="gate-bridge-caption">One shared meaning</p>
          </div>

          <button
            type="button"
            className={`gate-side is-technical ${lean === 'technical' ? 'is-hot' : ''}`}
            data-testid="home-gate-technical"
            onMouseEnter={() => setLean('technical')}
            onMouseLeave={() => setLean(null)}
            onFocus={() => setLean('technical')}
            onBlur={() => setLean(null)}
            onClick={() => chooseExperience(EXPERIENCES.technical)}
          >
            <span className="gate-side-name">Technical teams</span>
            <span className="gate-side-kicker">Technical reality</span>
            <span className="gate-side-copy">Define. Govern. Implement.</span>
          </button>
        </div>

        <p className="experience-gate-note">
          You can switch anytime from Business / Technical in the top bar.
        </p>
      </div>
    </div>
  );
};

export default ExperienceGate;
