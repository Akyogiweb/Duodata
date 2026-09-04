import React from 'react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';

const ExperienceSwitch = ({ size = 'md', className = '', onSelect, testId = 'home-experience-switch' }) => {
  const { experience, setExperience, hasChosen } = useExperience();
  const compact = size === 'sm';
  const choose = (value) => {
    setExperience(value);
    onSelect?.(value);
  };

  if (!hasChosen) return null;

  return (
    <div
      role="tablist"
      aria-label="Switch between business and technical experience"
      className={`duo-switch ${compact ? 'duo-switch-sm' : ''} ${className}`.trim()}
      data-testid={testId}
    >
      <button
        role="tab"
        type="button"
        aria-selected={experience === EXPERIENCES.business}
        data-testid={`${testId}-business`}
        className={`duo-switch-btn ${experience === EXPERIENCES.business ? 'is-active is-business' : ''}`}
        onClick={() => choose(EXPERIENCES.business)}
      >
        Business
      </button>
      <button
        role="tab"
        type="button"
        aria-selected={experience === EXPERIENCES.technical}
        data-testid={`${testId}-technical`}
        className={`duo-switch-btn ${experience === EXPERIENCES.technical ? 'is-active is-technical' : ''}`}
        onClick={() => choose(EXPERIENCES.technical)}
      >
        Technical
      </button>
    </div>
  );
};

export default ExperienceSwitch;
