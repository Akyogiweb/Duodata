import {
  EXPERIENCE_CHOSEN_COOKIE,
  EXPERIENCE_COOKIE,
} from './cookies';
import {
  EXPERIENCES,
  hasExplicitExperienceChoice,
  markExperienceChosen,
  persistExperience,
  readStoredExperience,
} from './experienceStorage';

describe('experienceStorage', () => {
  beforeEach(() => {
    document.cookie = `${EXPERIENCE_COOKIE}=; Max-Age=0; Path=/`;
    document.cookie = `${EXPERIENCE_CHOSEN_COOKIE}=; Max-Age=0; Path=/`;
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  test('experience cookie alone does not count as an explicit choice', () => {
    persistExperience(EXPERIENCES.business);
    expect(readStoredExperience()).toBe(EXPERIENCES.business);
    expect(hasExplicitExperienceChoice()).toBe(false);
  });

  test('explicit choice is remembered via cookie and local storage', () => {
    persistExperience(EXPERIENCES.technical);
    markExperienceChosen();
    expect(hasExplicitExperienceChoice()).toBe(true);
    expect(readStoredExperience()).toBe(EXPERIENCES.technical);
  });
});
