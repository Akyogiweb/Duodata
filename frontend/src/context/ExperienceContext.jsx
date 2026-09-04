import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  EXPERIENCE_CHOSEN_COOKIE,
  EXPERIENCE_COOKIE,
  getCookie,
  setCookie,
} from '@/lib/cookies';

export const EXPERIENCES = {
  business: 'business',
  technical: 'technical',
};

function normalize(value) {
  return value === EXPERIENCES.technical ? EXPERIENCES.technical : EXPERIENCES.business;
}

function applyTheme(experience) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.dataset.experience = experience;
  root.classList.toggle('dark', experience === EXPERIENCES.technical);
}

function readStoredExperience() {
  const fromCookie = getCookie(EXPERIENCE_COOKIE);
  if (fromCookie === EXPERIENCES.business || fromCookie === EXPERIENCES.technical) {
    return fromCookie;
  }
  return null;
}

function hasStoredChoice() {
  return getCookie(EXPERIENCE_CHOSEN_COOKIE) === '1' || Boolean(readStoredExperience());
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

export const ExperienceProvider = ({ children }) => {
  const [experience, setExperienceState] = useState(() => normalize(readStoredExperience() || EXPERIENCES.business));
  const [hasChosen, setHasChosen] = useState(() => hasStoredChoice());

  useEffect(() => {
    applyTheme(hasChosen ? experience : EXPERIENCES.business);
  }, [experience, hasChosen]);

  const persist = (value) => {
    const next = normalize(value);
    setExperienceState(next);
    setCookie(EXPERIENCE_COOKIE, next);
    try {
      window.sessionStorage.setItem(EXPERIENCE_COOKIE, next);
    } catch {
      /* ignore */
    }
  };

  const setExperience = (next) => {
    persist(next);
    setHasChosen(true);
    setCookie(EXPERIENCE_CHOSEN_COOKIE, '1');
  };

  const chooseExperience = (next) => {
    setExperience(next);
  };

  const openExperience = (next, sectionId) => {
    setExperience(next);
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
