import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DuodataMark from '@/components/DuodataMark';
import { useExperience } from '@/context/ExperienceContext';
import { footerColumns, legalLinks } from '@/data/navigation';
import { parseSectionId, scrollToSection } from '@/lib/sectionLink';

const FooterLink = ({ link }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const label = typeof link === 'string' ? link : link.label;
  const href = typeof link === 'string' ? '#' : link.href;

  if (!href || href === '#') {
    return (
      <a href="#" className="text-[13px] text-slate-300 hover:text-white transition-colors">
        {label}
      </a>
    );
  }

  const isAnchor = href.startsWith('/#');
  if (isAnchor) {
    const sectionId = parseSectionId(href);
    const handleClick = (event) => {
      event.preventDefault();
      if (location.pathname === '/') {
        scrollToSection(sectionId);
        window.history.replaceState(null, '', `/#${sectionId}`);
      } else {
        navigate(`/#${sectionId}`);
      }
    };
    return (
      <a
        href={href}
        onClick={handleClick}
        className="text-[13px] text-slate-300 hover:text-white transition-colors"
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={href} className="text-[13px] text-slate-300 hover:text-white transition-colors">
      {label}
    </Link>
  );
};

const Footer = () => {
  const { isBusiness } = useExperience();
  const columns = footerColumns(isBusiness);

  return (
    <footer className="bg-[#0a0a0b] text-slate-300 pt-20 pb-10">
      <div className="max-w-site-content mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <DuodataMark size={28} />
              <span className="font-semibold text-white text-[18px] tracking-tight">Duodata</span>
            </div>
            <p className="text-[13px] leading-relaxed text-slate-400 max-w-xs">
              One business meaning. Two ways to work with it — business experience and technical experience, connected by shared semantics.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-[12px] tracking-widest uppercase text-slate-500 mb-4">{col.title}</div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={typeof link === 'string' ? link : link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="section-divider mt-14 mb-6" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)' }} />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-slate-500">
          <div>© {new Date().getFullYear()} Duodata. All rights reserved.</div>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <FooterLink key={link.label} link={link} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
