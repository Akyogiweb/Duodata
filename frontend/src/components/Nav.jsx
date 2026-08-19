import React, { useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';
import { navLinks } from '@/mock';

const Logo = () => (
  <div className="flex items-center gap-2">
    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
      <div className="w-2.5 h-2.5 rounded-full bg-white/90" />
    </div>
    <span className="font-semibold text-[15px] tracking-tight text-slate-900">Duodata</span>
  </div>
);

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="nav-pill-shadow bg-white/95 backdrop-blur-md rounded-full flex items-center pl-5 pr-2 py-2 gap-1 border border-black/5">
        <Logo />
        <div className="hidden md:flex items-center gap-1 ml-6">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="pill-btn-ghost"
            >
              {l.label}
            </a>
          ))}
          <a href="#login" className="pill-btn-ghost">Login</a>
          <a href="#demo" className="pill-btn-ghost">Book a demo</a>
        </div>
        <a href="#get-started" className="pill-btn-dark ml-2">
          Get started for free
          <ChevronRight size={16} strokeWidth={2.2} />
        </a>
        <button
          className="md:hidden ml-1 p-2 rounded-full hover:bg-black/5"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {open && (
        <div className="absolute top-16 left-4 right-4 md:hidden bg-white rounded-2xl border border-black/10 shadow-xl p-4 flex flex-col gap-2">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="pill-btn-ghost text-left">
              {l.label}
            </a>
          ))}
          <a href="#login" className="pill-btn-ghost text-left">Login</a>
          <a href="#demo" className="pill-btn-ghost text-left">Book a demo</a>
        </div>
      )}
    </div>
  );
};

export default Nav;
