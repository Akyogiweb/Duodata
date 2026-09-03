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

const ExperienceContext = createContext({
  experience: EXPERIENCES.business,
  setExperience: () => {},
  chooseExperience: () => {},
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

  return (
    <ExperienceContext.Provider
      value={{
        experience,
        setExperience,
        chooseExperience,
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
