const YEAR = 60 * 60 * 24 * 365;

export const EXPERIENCE_COOKIE = 'duodata_experience';
export const EXPERIENCE_CHOSEN_COOKIE = 'duodata_experience_chosen';

export function getCookie(name) {
  if (typeof document === 'undefined') return '';
  const escaped = name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1');
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : '';
}

export function setCookie(name, value, maxAgeSeconds = YEAR) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax`;
}
