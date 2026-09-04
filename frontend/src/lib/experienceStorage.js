import {
  EXPERIENCE_CHOSEN_COOKIE,
  EXPERIENCE_COOKIE,
  getCookie,
  setCookie,
} from './cookies';

export const EXPERIENCES = {
  business: 'business',
  technical: 'technical',
};

export function normalizeExperience(value) {
  return value === EXPERIENCES.technical ? EXPERIENCES.technical : EXPERIENCES.business;
}

export function readStoredExperience() {
  const fromCookie = getCookie(EXPERIENCE_COOKIE);
  if (fromCookie === EXPERIENCES.business || fromCookie === EXPERIENCES.technical) {
    return fromCookie;
  }

  try {
    const fromSession = window.sessionStorage.getItem(EXPERIENCE_COOKIE);
    if (fromSession === EXPERIENCES.business || fromSession === EXPERIENCES.technical) {
      return fromSession;
    }
  } catch {
    /* ignore */
  }

  return null;
}

/** True only when the visitor explicitly chose an experience (gate or nav after gate). */
export function hasExplicitExperienceChoice() {
  if (getCookie(EXPERIENCE_CHOSEN_COOKIE) === '1') return true;

  try {
    if (window.localStorage.getItem(EXPERIENCE_CHOSEN_COOKIE) === '1') return true;
    if (window.sessionStorage.getItem(EXPERIENCE_CHOSEN_COOKIE) === '1') return true;
  } catch {
    /* ignore */
  }

  return false;
}

export function markExperienceChosen() {
  setCookie(EXPERIENCE_CHOSEN_COOKIE, '1');
  try {
    window.localStorage.setItem(EXPERIENCE_CHOSEN_COOKIE, '1');
    window.sessionStorage.setItem(EXPERIENCE_CHOSEN_COOKIE, '1');
  } catch {
    /* ignore */
  }
}

export function persistExperience(value) {
  const next = normalizeExperience(value);
  setCookie(EXPERIENCE_COOKIE, next);
  try {
    window.sessionStorage.setItem(EXPERIENCE_COOKIE, next);
  } catch {
    /* ignore */
  }
  return next;
}
