import React, { useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDemoModal } from '@/context/DemoModalContext';
import { DuodataFullLogo } from '@/components/DuodataMark';

const navLinks = [
  { label: 'Platform', href: '/#ontology', type: 'anchor' },
  { label: 'Governance', href: '/#governance', type: 'anchor' },
  { label: 'AI', href: '/#ai', type: 'anchor' },
  { label: 'Industries', href: '/#industries', type: 'anchor' },
  { label: 'Explore', href: '/explore', type: 'route' },
  { label: 'Case Studies', href: '/case-studies', type: 'route' },
];

const Logo = () => (
  <Link to="/" className="flex items-center">
    <DuodataFullLogo height={22} />
  </Link>
);

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

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="nav-pill-shadow bg-white/95 backdrop-blur-md rounded-full flex items-center pl-5 pr-2 py-2 gap-1 border border-black/5">
        <Logo />
        <div className="hidden md:flex items-center gap-1 ml-6">
          {navLinks.map((l) => <NavLink key={l.label} link={l} />)}
          <button onClick={demo.open} className="pill-btn-ghost">Book a demo</button>
        </div>
        <button onClick={demo.open} className="pill-btn-dark ml-2">
          Get started for free
          <ChevronRight size={16} strokeWidth={2.2} />
        </button>
        <button
          className="md:hidden ml-1 p-2 rounded-full hover:bg-black/5"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="absolute top-16 left-4 right-4 md:hidden bg-white rounded-2xl border border-black/10 shadow-xl p-4 flex flex-col gap-2">
          {navLinks.map((l) => <NavLink key={l.label} link={l} onClick={() => setOpen(false)} />)}
          <button onClick={() => { setOpen(false); demo.open(); }} className="pill-btn-ghost text-left">Book a demo</button>
        </div>
      )}
    </div>
  );
};

export default Nav;
