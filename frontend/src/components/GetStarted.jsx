import React from 'react';
import { GET_STARTED_STEPS } from '@/data/featureConnections';
import { useExperience } from '@/context/ExperienceContext';
import { useDemoModal } from '@/context/DemoModalContext';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const GetStarted = () => {
  const { isBusiness } = useExperience();
  const demo = useDemoModal();

  return (
    <section id="start" className="py-20 md:py-28" data-testid="home-get-started-path">
      <div className="max-w-[1100px] mx-auto px-6">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">How to get started</p>
        <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950 max-w-3xl">
          {isBusiness ? 'From confusion to confidence.' : 'Five steps. Same product. Your experience.'}
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600 text-[15px] leading-relaxed">
          {isBusiness
            ? 'These are the conversations that happen when a company stops arguing about definitions and starts making decisions.'
            : 'Start from the metric the business already named. The question they ask is the object you govern and ship.'}
        </p>

        <ol className="mt-12 grid gap-4">
          {GET_STARTED_STEPS.map((step) => (
            <li
              key={step.n}
              className="grid gap-4 rounded-2xl border border-black/10 bg-white/80 px-5 py-5 md:grid-cols-[72px_minmax(0,220px)_minmax(0,1fr)] md:items-start md:px-7"
              data-testid={`home-start-step-${step.n}`}
            >
              <span className="font-mono text-[13px] tracking-[0.18em] text-[#1E5FEE]">{step.n}</span>
              <h3 className="text-[18px] font-semibold text-slate-950">{step.title}</h3>
              <p className="text-[14px] leading-relaxed text-slate-600">
                {isBusiness ? step.business : step.technical}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={demo.open} className="pill-btn-primary">
            Book a walkthrough <ArrowRight size={16} />
          </button>
          {!isBusiness && (
            <Link to="/explore" className="px-5 py-2.5 rounded-full border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-slate-50">
              Open the workspace
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
