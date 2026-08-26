import React, { useState } from 'react';
import { Banknote, Briefcase, HeartPulse, Factory, ShoppingBag, ShieldCheck } from 'lucide-react';

const industries = [
  {
    id: 'fs',
    icon: Banknote,
    name: 'Financial Services',
    problems: [
      'Multiple definitions of performance metrics',
      'Regulatory reporting consistency',
      'Portfolio-level vs investment-level calculations',
      'Ownership and auditability',
    ],
    message: 'Govern the definitions behind the numbers your investment, risk and compliance teams depend on.',
  },
  {
    id: 'pe',
    icon: Briefcase,
    name: 'Private Equity',
    problems: [
      'MOIC, IRR and DPI defined differently across funds',
      'LP reporting versus internal analytics',
      'Vintage, fund and portfolio-company slicing',
      'Valuation methodology (ASC 820 / IPEV) governance',
    ],
    message: 'One authoritative place for the metrics LPs, GPs and the CFO rely on.',
  },
  {
    id: 'healthcare',
    icon: HeartPulse,
    name: 'Healthcare',
    problems: [
      'Different definitions of patient metrics',
      'Clinical vs operational terminology',
      'Sensitive data environments',
      'Multiple reporting systems',
    ],
    message: 'A shared semantic language across clinical, operational and analytical data.',
  },
  {
    id: 'mfg',
    icon: Factory,
    name: 'Manufacturing',
    problems: [
      'Plant-specific definitions',
      'Operational KPIs',
      'Supply-chain metrics',
      'Multiple ERP / MES systems',
    ],
    message: 'Standardize operational meaning without forcing every plant onto the same physical architecture.',
  },
  {
    id: 'retail',
    icon: ShoppingBag,
    name: 'Retail',
    problems: [
      'Customer metrics inconsistency',
      'Revenue definitions per channel',
      'Product hierarchies',
      'Marketing attribution',
    ],
    message: 'Make customer, product, revenue and performance metrics consistent across channels.',
  },
  {
    id: 'insurance',
    icon: ShieldCheck,
    name: 'Insurance',
    problems: [
      'Policy terminology',
      'Claims metrics',
      'Risk calculations',
      'Regulatory reporting',
    ],
    message: 'Connect business definitions to the calculations and systems behind regulated reporting.',
  },
];

const Industries = () => {
  const [active, setActive] = useState(industries[0].id);
  const current = industries.find((i) => i.id === active);

  return (
    <section id="industries" className="py-24 md:py-32 bg-white border-y border-black/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-10">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Industries</p>
          <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
            One semantic problem. Every industry.
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {industries.map((i) => {
            const Icon = i.icon;
            const isActive = active === i.id;
            return (
              <button
                key={i.id}
                onClick={() => setActive(i.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon size={14} />
                {i.name}
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 rounded-3xl border border-black/10 bg-slate-50">
            <div className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-4">
              Common pains
            </div>
            <ul className="space-y-3">
              {current.problems.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[14px] text-slate-800">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#1E5FEE] flex-shrink-0" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-8 rounded-3xl bg-slate-950 text-white flex flex-col">
            <div className="text-[11px] uppercase tracking-widest text-blue-300 font-medium mb-4">
              Duo Data for {current.name}
            </div>
            <p className="hero-headline text-[24px] md:text-[28px] leading-tight">{current.message}</p>
            <p className="mt-auto pt-6 text-[13px] text-slate-400">
              Duo Data sits above your existing stack — no rebuild required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
