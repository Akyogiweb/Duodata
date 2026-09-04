import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { parseSectionId, scrollToSection } from '@/lib/sectionLink';

/** Scrolls to hash targets after route changes (e.g. /#product from another page). */
export default function HashScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash || pathname !== '/') return;
    const sectionId = parseSectionId(hash);
    if (sectionId) scrollToSection(sectionId);
  }, [pathname, hash]);

  return null;
}
