import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X, ArrowRight } from 'lucide-react';
import { useDemoModal } from '@/context/DemoModalContext';
import { DuodataFullLogo } from '@/components/DuodataMark';
import { navSections } from '@/data/navMenu';

const Logo = () => (
  <Link to="/" className="flex items-center" data-testid="nav-home-link">
    <DuodataFullLogo height={22} />
  </Link>
);

// A single item link inside a mega-menu panel.
const MenuItem = ({ item, onNavigate, featured = false }) => {
  const testId = `nav-item-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  const inner = (
    <div className={`group flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors ${featured ? 'bg-slate-50 hover:bg-slate-100' : 'hover:bg-slate-50'}`}>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[13.5px] font-semibold text-slate-950">{item.label}</span>
          <ArrowRight
            size={12}
            className="text-slate-400 group-hover:text-slate-950 group-hover:translate-x-0.5 transition-all"
          />
        </div>
        {item.description && (
          <p className="text-[12px] text-slate-500 mt-0.5 leading-snug">{item.description}</p>
        )}
      </div>
    </div>
  );

  if (item.type === 'route') {
    return (
      <Link to={item.href} onClick={onNavigate} data-testid={testId}>
        {inner}
      </Link>
    );
  }
  return (
    <a href={item.href} onClick={onNavigate} data-testid={testId}>
      {inner}
    </a>
  );
};

// Desktop dropdown panel (mega menu).
const MegaPanel = ({ items, onClose }) => (
  <div
    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] max-w-[92vw] rounded-2xl bg-white border border-black/10 shadow-2xl p-3"
    onMouseLeave={onClose}
  >
    <div className="grid grid-cols-2 gap-1">
      {items.map((item) => (
        <MenuItem key={item.label} item={item} onNavigate={onClose} />
      ))}
    </div>
    <div className="mt-2 px-3 py-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
      <span>Everything above rolls up into one governed semantic layer.</span>
    </div>
  </div>
);

const DesktopNav = ({ activeKey, setActiveKey, onDemoOpen }) => {
  const closeTimer = useRef(null);
  const handleEnter = (key) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveKey(key);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setActiveKey(null), 120);
  };

  return (
    <div className="hidden lg:flex items-center gap-1 ml-6">
      {navSections.map((section) => (
        <div
          key={section.key}
          className="relative"
          onMouseEnter={() => handleEnter(section.key)}
          onMouseLeave={handleLeave}
        >
          <button
            className={`px-3.5 py-2 rounded-full text-[13.5px] font-medium transition-colors flex items-center gap-1 ${
              activeKey === section.key
                ? 'bg-slate-950 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
            data-testid={`nav-menu-${section.key}`}
          >
            {section.label}
            <ChevronDown
              size={13}
              strokeWidth={2}
              className={`transition-transform ${activeKey === section.key ? 'rotate-180' : ''}`}
            />
          </button>
          {activeKey === section.key && (
            <MegaPanel items={section.items} onClose={() => setActiveKey(null)} />
          )}
        </div>
      ))}
      <button onClick={onDemoOpen} className="px-3.5 py-2 rounded-full text-[13.5px] font-medium text-slate-700 hover:bg-slate-100 transition-colors" data-testid="nav-book-demo-button">
        Book a demo
      </button>
    </div>
  );
};

// Mobile menu — accordion.
const MobileMenu = ({ open, onClose, onDemoOpen }) => {
  const [expanded, setExpanded] = useState(null);
  if (!open) return null;
  return (
    <div className="absolute top-16 left-4 right-4 lg:hidden bg-white rounded-2xl border border-black/10 shadow-2xl p-3 max-h-[80vh] overflow-y-auto">
      {navSections.map((section) => {
        const isOpen = expanded === section.key;
        return (
          <div key={section.key} className="border-b border-slate-100 last:border-b-0">
            <button
              onClick={() => setExpanded(isOpen ? null : section.key)}
              className="w-full flex items-center justify-between px-3 py-3 text-left text-[14px] font-semibold text-slate-950"
              data-testid={`mobile-nav-menu-${section.key}`}
            >
              {section.label}
              <ChevronDown
                size={14}
                className={`transition-transform text-slate-500 ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="pb-2 pl-1">
                {section.items.map((item) => (
                  <MenuItem key={item.label} item={item} onNavigate={onClose} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      <button
        onClick={() => { onClose(); onDemoOpen(); }}
        className="w-full mt-2 px-4 py-3 rounded-xl bg-slate-950 text-white text-[13.5px] font-semibold flex items-center justify-center gap-1.5"
        data-testid="mobile-nav-book-demo-button"
      >
        Book a demo <ArrowRight size={14} />
      </button>
    </div>
  );
};

const Nav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(null);
  const demo = useDemoModal();
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveKey(null);
  }, [location.pathname, location.hash]);

  return (
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="nav-pill-shadow bg-white/95 backdrop-blur-md rounded-full flex items-center pl-5 pr-2 py-2 gap-1 border border-black/5 max-w-[1180px] w-full">
        <Logo />

        <DesktopNav activeKey={activeKey} setActiveKey={setActiveKey} onDemoOpen={demo.open} />

        <div className="ml-auto flex items-center gap-1">
          <button onClick={demo.open} className="pill-btn-dark" data-testid="nav-primary-demo-button">
            <span className="hidden sm:inline">See Duo in action</span>
            <span className="sm:hidden">Get started</span>
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
          <button
            className="lg:hidden ml-1 p-2 rounded-full hover:bg-black/5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-testid="nav-mobile-toggle-button"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onDemoOpen={demo.open} />
    </div>
  );
};

export default Nav;
