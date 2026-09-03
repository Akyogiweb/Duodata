import React from 'react';
import { businessUseCases, technicalUseCases, businessTestimonials, technicalTestimonials } from '@/mock';
import { Quote, ArrowRight } from 'lucide-react';
import { useDemoModal } from '@/context/DemoModalContext';
import { Link } from 'react-router-dom';
import { useExperience } from '@/context/ExperienceContext';

export const UseCases = () => {
  const { isBusiness } = useExperience();
  const items = isBusiness ? businessUseCases : technicalUseCases;

  return (
    <section id="resources" className="py-24 md:py-32 bg-slate-50/80 border-y border-black/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Who it’s for</p>
          <h2 className="hero-headline text-[38px] md:text-[52px] text-slate-950">
            {isBusiness
              ? 'Built for the people who use the numbers.'
              : 'Built for the people who make the numbers true.'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {items.map((u) => (
            <div
              key={u.title}
              className="p-8 rounded-2xl bg-white/80 border border-black/10 hover:border-black/25 transition-colors"
            >
              <h3 className="font-semibold text-[20px] text-slate-900 mb-3">{u.title}</h3>
              <p className="text-[14px] text-slate-600 leading-relaxed">{u.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Testimonials = () => {
  const { isBusiness } = useExperience();
  const items = isBusiness ? businessTestimonials : technicalTestimonials;

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">
            {isBusiness ? 'From the business' : 'From the stack'}
          </p>
          <h2 className="hero-headline text-[38px] md:text-[52px] text-slate-950">
            {isBusiness ? 'What operators say.' : 'What data leaders say.'}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.author} className="p-8 rounded-2xl border border-black/10 bg-white/80 flex flex-col">
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
};

export const CTA = () => {
  const demo = useDemoModal();
  const { isBusiness } = useExperience();

  return (
    <section id="get-started" className="py-24 md:py-32">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="hero-headline text-[48px] md:text-[80px] text-slate-950">
          {isBusiness ? (
            <>
              Ask better questions. <span style={{ color: '#1E5FEE' }}>Trust the answer.</span>
            </>
          ) : (
            <>
              Ship the meaning. <span style={{ color: '#1E5FEE' }}>Keep it true.</span>
            </>
          )}
        </h2>
        <p className="mt-6 max-w-xl mx-auto text-slate-600 text-[15px] leading-relaxed">
          {isBusiness
            ? 'Give product, sales, and operators a simple way to understand metrics — connected to how those metrics are actually implemented.'
            : 'Give platform and engineering teams a workspace to define, govern, and implement the same concepts the business already uses.'}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={demo.open} className="pill-btn-dark">
            Book a demo <ArrowRight size={16} />
          </button>
          {!isBusiness && (
            <Link to="/explore" className="px-5 py-2.5 rounded-full border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-slate-50 transition-colors">
              Open the workspace
            </Link>
          )}
          {isBusiness && (
            <Link to="/case-studies" className="px-5 py-2.5 rounded-full border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-slate-50 transition-colors">
              Read case studies
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
