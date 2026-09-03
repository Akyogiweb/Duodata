import React, { createContext, useContext, useEffect, useState } from 'react';

export const EXPERIENCES = {
  business: 'business',
  technical: 'technical',
};

const STORAGE_KEY = 'duodata-experience';

const ExperienceContext = createContext({
  experience: EXPERIENCES.business,
  setExperience: () => {},
  isBusiness: true,
  isTechnical: false,
});

export const ExperienceProvider = ({ children }) => {
  const [experience, setExperienceState] = useState(EXPERIENCES.business);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(STORAGE_KEY);
      if (saved === EXPERIENCES.business || saved === EXPERIENCES.technical) {
        setExperienceState(saved);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setExperience = (next) => {
    const value = next === EXPERIENCES.technical ? EXPERIENCES.technical : EXPERIENCES.business;
    setExperienceState(value);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
  };

  return (
    <ExperienceContext.Provider
      value={{
        experience,
        setExperience,
        isBusiness: experience === EXPERIENCES.business,
        isTechnical: experience === EXPERIENCES.technical,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => useContext(ExperienceContext);
