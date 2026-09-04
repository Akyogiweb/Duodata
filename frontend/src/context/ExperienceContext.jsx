import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  EXPERIENCES,
  hasExplicitExperienceChoice,
  markExperienceChosen,
  normalizeExperience,
  persistExperience,
  readStoredExperience,
} from '@/lib/experienceStorage';

function applyTheme(experience) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.dataset.experience = experience;
  root.classList.toggle('dark', experience === EXPERIENCES.technical);
}

function scrollToSection(sectionId) {
  if (!sectionId || typeof document === 'undefined') return;
  const go = () => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  window.requestAnimationFrame(() => window.setTimeout(go, 180));
}

const ExperienceContext = createContext({
  experience: EXPERIENCES.business,
  setExperience: () => {},
  chooseExperience: () => {},
  openExperience: () => {},
  hasChosen: false,
  isBusiness: true,
  isTechnical: false,
});

export { EXPERIENCES };

export const ExperienceProvider = ({ children }) => {
  const [hasChosen, setHasChosen] = useState(() => hasExplicitExperienceChoice());
  const [experience, setExperienceState] = useState(() => {
    if (!hasExplicitExperienceChoice()) return EXPERIENCES.business;
    return normalizeExperience(readStoredExperience() || EXPERIENCES.business);
  });

  useEffect(() => {
    applyTheme(hasChosen ? experience : EXPERIENCES.business);
  }, [experience, hasChosen]);

  useEffect(() => {
    if (!hasChosen) {
      document.body.classList.add('experience-gate-open');
      return () => document.body.classList.remove('experience-gate-open');
    }
    document.body.classList.remove('experience-gate-open');
    return undefined;
  }, [hasChosen]);

  const commitExperience = (value, { markChosen }) => {
    const next = persistExperience(value);
    setExperienceState(next);
    if (markChosen) {
      markExperienceChosen();
      setHasChosen(true);
    }
  };

  const setExperience = (next) => {
    commitExperience(next, { markChosen: true });
  };

  const chooseExperience = (next) => {
    commitExperience(next, { markChosen: true });
  };

  const openExperience = (next, sectionId) => {
    commitExperience(next, { markChosen: true });
    scrollToSection(sectionId);
  };

  return (
    <ExperienceContext.Provider
      value={{
        experience,
        setExperience,
        chooseExperience,
        openExperience,
        hasChosen,
        isBusiness: experience === EXPERIENCES.business,
        isTechnical: experience === EXPERIENCES.technical,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => useContext(ExperienceContext);
