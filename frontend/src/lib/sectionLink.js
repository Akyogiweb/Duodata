/** Smooth-scroll to a landing-page section, navigating home first when needed. */

export function scrollToSection(sectionId) {
  if (!sectionId || typeof document === 'undefined') return;
  const go = () => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  window.requestAnimationFrame(() => window.setTimeout(go, 80));
}

export function parseSectionId(href) {
  if (!href) return null;
  const hash = href.includes('#') ? href.split('#')[1] : href.replace(/^\//, '');
  return hash || null;
}

export function isNavLinkActive(link, { pathname, hash }) {
  if (link.type === 'route') {
    return pathname === link.href || pathname.startsWith(`${link.href}/`);
  }
  if (link.type === 'anchor' && pathname === '/') {
    const target = link.sectionId || parseSectionId(link.href);
    const current = (hash || '').replace('#', '');
    return current === target;
  }
  return false;
}
