import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Banknote, Briefcase, HeartPulse, Factory, ShoppingBag, ShieldCheck } from 'lucide-react';
import { industries } from '@/data/industries';

const iconMap = { Banknote, Briefcase, HeartPulse, Factory, ShoppingBag, ShieldCheck };

const Industries = () => {
  const [active, setActive] = useState(industries[0].slug);
  const current = industries.find((i) => i.slug === active);

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
            const Icon = iconMap[i.icon];
            const isActive = active === i.slug;
            return (
              <button
                key={i.slug}
                onClick={() => setActive(i.slug)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-950 text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {Icon && <Icon size={14} />}
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

            <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-3">
              <p className="text-[13px] text-slate-400">
                Duo Data sits above your existing stack — no rebuild required.
              </p>
              <Link
                to={`/industries/${current.slug}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-slate-950 text-[13px] font-semibold hover:bg-slate-100 transition-colors"
              >
                Read the industry brief <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
