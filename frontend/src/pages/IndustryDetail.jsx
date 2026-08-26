import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Quote, Banknote, Briefcase, HeartPulse, Factory, ShoppingBag, ShieldCheck } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useDemoModal } from '@/context/DemoModalContext';
import { industries, getIndustryBySlug } from '@/data/industries';

const iconMap = { Banknote, Briefcase, HeartPulse, Factory, ShoppingBag, ShieldCheck };

const IndustryDetail = () => {
  const { slug } = useParams();
  const industry = getIndustryBySlug(slug);
  const demo = useDemoModal();

  if (!industry) return <Navigate to="/" replace />;

  const Icon = iconMap[industry.icon];
  const idx = industries.findIndex((i) => i.slug === slug);
  const next = industries[(idx + 1) % industries.length];

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 border-b border-black/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <Link to="/#industries" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
            <ArrowLeft size={14} /> All industries
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-2xl bg-slate-950 text-white flex items-center justify-center">
              {Icon && <Icon size={18} />}
            </div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium">
              Duo Data for {industry.name}
            </p>
          </div>

          <h1 className="hero-headline text-[48px] md:text-[80px] text-slate-950 leading-[0.95] max-w-4xl">
            {industry.tagline}
          </h1>
          <p className="mt-6 max-w-2xl text-slate-600 text-[16px] leading-relaxed">
            {industry.message}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button onClick={demo.open} className="pill-btn-dark">
              Book a demo <ArrowRight size={16} />
            </button>
            <Link
              to="/#ontology"
              className="px-5 py-2.5 rounded-full border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Explore the platform
            </Link>
          </div>
        </div>
      </section>

      {/* Pains */}
      <section className="py-24">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Common pains</p>
          <h2 className="hero-headline text-[32px] md:text-[44px] text-slate-950 mb-10 leading-tight">
            What we hear from {industry.name.toLowerCase()} data leaders.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industry.problems.map((p, i) => (
              <div key={p} className="p-6 rounded-2xl border border-black/10 bg-white">
                <div className="text-[11px] font-mono text-slate-400 mb-2">0{i + 1}</div>
                <p className="text-[15px] text-slate-900 leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios */}
      <section className="py-24 bg-slate-50 border-y border-black/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Real scenarios</p>
          <h2 className="hero-headline text-[32px] md:text-[44px] text-slate-950 mb-10 leading-tight">
            Where Duo Data changes the conversation.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.scenarios.map((s) => (
              <div key={s.title} className="p-6 rounded-2xl bg-white border border-black/10 flex flex-col">
                <h3 className="text-[18px] font-semibold text-slate-950 mb-3">{s.title}</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed flex-1">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics + Quote */}
      <section className="py-24">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">
              Governed metrics we see most in {industry.name.toLowerCase()}
            </p>
            <h3 className="hero-headline text-[28px] md:text-[36px] text-slate-950 mb-6 leading-tight">
              The metrics customers govern first.
            </h3>
            <div className="flex flex-wrap gap-2">
              {industry.metrics.map((m) => (
                <span
                  key={m}
                  className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-[13px] font-medium text-slate-800"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-slate-950 text-white">
            <Quote size={22} className="text-blue-300 mb-4" />
            <p className="text-[18px] leading-relaxed">“{industry.quote.body}”</p>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="text-[13px] font-semibold">{industry.quote.author}</div>
              <div className="text-[12px] text-slate-400">{industry.quote.company}</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA + next industry */}
      <section className="py-24 bg-slate-50 border-t border-black/5">
        <div className="max-w-[1100px] mx-auto px-6 text-center">
          <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950 leading-tight">
            See Duo Data in your {industry.name.toLowerCase()} stack.
          </h2>
          <p className="mt-4 text-slate-600 text-[15px] max-w-xl mx-auto">
            45 minutes. We map Duo Data onto your existing platforms and show governed context in action.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={demo.open} className="pill-btn-dark">
              Book a demo <ArrowRight size={16} />
            </button>
            <Link
              to={`/industries/${next.slug}`}
              className="px-5 py-2.5 rounded-full border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-white transition-colors inline-flex items-center gap-1.5"
            >
              Next: {next.name} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustryDetail;
