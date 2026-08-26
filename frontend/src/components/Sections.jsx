import React from 'react';
import { useCases, testimonials } from '@/mock';
import { ArrowRight, Quote } from 'lucide-react';
import { useDemoModal } from '@/context/DemoModalContext';
import { Link } from 'react-router-dom';

export const UseCases = () => (
  <section id="resources" className="py-24 md:py-32 bg-slate-50 border-y border-black/5">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-2xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Who it’s for</p>
        <h2 className="hero-headline text-[38px] md:text-[52px] text-slate-950">
          Built for the people who own the numbers.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {useCases.map((u, i) => (
          <div
            key={i}
            className="p-8 rounded-2xl bg-white border border-black/10 hover:border-black/25 transition-colors"
          >
            <h3 className="font-semibold text-[20px] text-slate-900 mb-3">{u.title}</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed mb-5">{u.body}</p>
            <a href="#" className="arrow-link text-[13px]">
              Read use case <ArrowRight size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Testimonials = () => (
  <section className="py-24 md:py-32 bg-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Enterprise trust</p>
        <h2 className="hero-headline text-[38px] md:text-[52px] text-slate-950">
          What data leaders say.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="p-8 rounded-2xl border border-black/10 bg-white flex flex-col">
            <Quote size={22} className="text-slate-400 mb-4" />
            <p className="text-[15px] text-slate-800 leading-relaxed mb-6 flex-1">
              “{t.quote}”
            </p>
            <div>
              <div className="text-[13px] font-semibold text-slate-900">{t.author}</div>
              <div className="text-[12px] text-slate-500">{t.company}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const CTA = () => {
  const demo = useDemoModal();
  return (
    <section id="get-started" className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto text-center px-6">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-4">The connective tissue</p>
        <h2 className="hero-headline text-[42px] md:text-[72px] text-slate-950 leading-[0.98]">
          Connect business meaning to your <span style={{ color: '#1E5FEE' }}>data reality.</span>
        </h2>
        <p className="mt-6 max-w-2xl mx-auto text-slate-600 text-[16px] leading-relaxed">
          One semantic foundation. Every platform. Every report. Every agent.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[12px] text-slate-500">
          <span><span className="text-slate-900 font-medium">Business.</span> Define the meaning.</span>
          <span><span className="text-slate-900 font-medium">Governance.</span> Own the meaning.</span>
          <span><span className="text-slate-900 font-medium">Engineering.</span> Implement the meaning.</span>
          <span><span className="text-slate-900 font-medium">Platforms.</span> Propagate the meaning.</span>
          <span><span className="text-slate-900 font-medium">AI.</span> Give machines the meaning.</span>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={demo.open} className="pill-btn-dark">
            Book a demo <ArrowRight size={16} />
          </button>
          <Link to="/explore" className="px-5 py-2.5 rounded-full border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-slate-50 transition-colors">
            Explore the platform
          </Link>
        </div>
      </div>
    </section>
  );
};
