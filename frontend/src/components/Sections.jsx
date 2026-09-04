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
    <section className="py-24 md:py-32" data-testid="home-testimonials">
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
          {items.map((t, i) => (
            <div
              key={t.author}
              className={`p-8 rounded-2xl flex flex-col ${
                i === 0
                  ? 'bg-slate-950 text-white border border-slate-950 md:col-span-1'
                  : 'border border-black/10 bg-white/80'
              }`}
            >
              <Quote size={22} className={i === 0 ? 'text-[#7FD1E8] mb-4' : 'text-slate-400 mb-4'} />
              <p className={`text-[15px] leading-relaxed mb-6 flex-1 ${i === 0 ? 'text-white' : 'text-slate-800'}`}>
                “{t.quote}”
              </p>
              <div className="flex items-center gap-3">
                <span
                  className="grid h-10 w-10 place-items-center rounded-full text-[12px] font-semibold"
                  style={{ background: i === 0 ? '#1E5FEE' : 'rgba(30,95,238,0.12)', color: i === 0 ? '#fff' : '#1E5FEE' }}
                >
                  {t.author.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </span>
                <div>
                  <div className={`text-[13px] font-semibold ${i === 0 ? 'text-white' : 'text-slate-900'}`}>{t.author}</div>
                  <div className={`text-[12px] ${i === 0 ? 'text-slate-400' : 'text-slate-500'}`}>{t.company}</div>
                </div>
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
    <section id="get-started" className="py-16 md:py-24 px-6">
      <div className="cta-band mx-auto max-w-[1100px] px-8 py-16 md:px-16 md:py-20 text-center">
        <p className="text-[11px] tracking-[0.28em] uppercase font-medium mb-4 opacity-80">Next step</p>
        <h2 className="hero-headline text-[40px] md:text-[64px] text-white">
          {isBusiness ? 'Stop arguing about the number. Start with one conversation.' : 'Map Duodata onto your stack in 45 minutes.'}
        </h2>
        <p className="mt-5 max-w-xl mx-auto text-[15px] leading-relaxed text-white/80">
          {isBusiness
            ? 'Bring the metric your last three meetings couldn’t agree on. We’ll talk through what it costs the business — and what alignment looks like.'
            : 'Bring one metric and a platform. We will show ontology, Git, and a native semantic object.'}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={demo.open} className="pill-btn-on-blue">
            Book a demo <ArrowRight size={16} />
          </button>
          {isBusiness ? (
            <Link to="/case-studies" className="px-5 py-2.5 rounded-full border border-white/30 text-[14px] font-medium text-white hover:bg-white/10">
              Read case studies
            </Link>
          ) : (
            <Link to="/explore" className="px-5 py-2.5 rounded-full border border-white/30 text-[14px] font-medium text-white hover:bg-white/10">
              Open the workspace
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
