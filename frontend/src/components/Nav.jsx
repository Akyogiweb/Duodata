import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDemoModal } from '@/context/DemoModalContext';
import { DuodataFullLogo } from '@/components/DuodataMark';
import DuodataMark from '@/components/DuodataMark';
import ExperienceSwitch from '@/components/ExperienceSwitch';
import { useExperience } from '@/context/ExperienceContext';

const Logo = () => {
  const { isTechnical } = useExperience();
  if (isTechnical) {
    return (
      <Link to="/" className="flex items-center gap-2">
        <DuodataMark size={22} />
        <span className="font-semibold text-[15px] tracking-tight text-white">Duodata</span>
      </Link>
    );
  }
  return (
    <Link to="/" className="flex items-center">
      <DuodataFullLogo height={22} />
    </Link>
  );
};

const NavLink = ({ link, onClick }) => {
  const cls = 'pill-btn-ghost';
  if (link.type === 'route') {
    return (
      <Link to={link.href} onClick={onClick} className={cls}>{link.label}</Link>
    );
  }
  return (
    <a href={link.href} onClick={onClick} className={cls}>{link.label}</a>
  );
};

const Nav = () => {
  const [open, setOpen] = useState(false);
  const demo = useDemoModal();
  const navigate = useNavigate();
  const location = useLocation();
  const { isBusiness } = useExperience();

  const navLinks = [
    { label: 'Product', href: '/#product', type: 'anchor' },
    { label: 'Start', href: '/#start', type: 'anchor' },
    { label: 'Topics', href: '/#experience', type: 'anchor' },
    { label: 'Connection', href: '/#connection', type: 'anchor' },
    ...(isBusiness ? [] : [{ label: 'Workspace', href: '/explore', type: 'route' }]),
    { label: 'Videos', href: '/videos', type: 'route' },
    { label: 'Case Studies', href: '/case-studies', type: 'route' },
  ];

  const goHomeIfNeeded = () => {
    if (location.pathname !== '/') navigate('/');
  };

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="site-nav nav-pill-shadow rounded-full flex items-center pl-5 pr-2 py-2 gap-1 max-w-full">
        <Logo />
        <div className="hidden lg:flex items-center gap-1 ml-4">
          {navLinks.map((l) => <NavLink key={l.label} link={l} />)}
        </div>
        <div className="ml-auto md:ml-2">
          <ExperienceSwitch size="sm" testId="nav-experience-switch" onSelect={goHomeIfNeeded} />
        </div>
        <button onClick={demo.open} className="pill-btn-primary ml-2">
          Book a demo
        </button>
        <button
          className="lg:hidden ml-1 p-2 rounded-full site-nav-icon"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="absolute top-16 left-4 right-4 lg:hidden site-nav-menu rounded-2xl shadow-xl p-4 flex flex-col gap-2">
          {navLinks.map((l) => <NavLink key={l.label} link={l} onClick={() => setOpen(false)} />)}
          <button onClick={() => { setOpen(false); demo.open(); }} className="pill-btn-primary text-center">Book a demo</button>
        </div>
      )}
    </div>
  );
};

export default Nav;
