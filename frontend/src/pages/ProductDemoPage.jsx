import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, GitBranch, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { useDemoModal } from '@/context/DemoModalContext';

// Reusable "product device" mockup card — the visual on the right of the hero.
// Stylized as a floating metric card (Duodata product surface).
const MetricDeviceCard = () => (
  <div className="relative">
    {/* Ambient blur */}
    <div
      className="absolute -inset-6 rounded-[36px] opacity-70 blur-3xl -z-10"
      style={{
        background:
          'radial-gradient(60% 60% at 30% 30%, rgba(30,95,238,0.35) 0%, transparent 70%), radial-gradient(50% 50% at 80% 70%, rgba(124,58,237,0.35) 0%, transparent 70%)',
      }}
    />
    {/* Card */}
    <div
      className="relative w-full max-w-[420px] p-6 rounded-[28px] bg-white border border-black/10 shadow-2xl"
      style={{
        boxShadow: '0 40px 80px -20px rgba(15, 23, 42, 0.35), 0 12px 32px -12px rgba(30, 95, 238, 0.35)',
        transform: 'rotate(-2.5deg)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">Governed metric</span>
        </div>
        <span className="text-[11px] font-mono text-slate-400">v1.1</span>
      </div>
      <div className="hero-headline text-[42px] text-slate-950 leading-none">MOIC</div>
      <div className="text-[12px] text-slate-500 mt-1">Multiple on Invested Capital</div>

      <div className="mt-5 p-4 rounded-2xl bg-slate-950 text-white">
        <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Formula</div>
        <div className="font-mono text-[13px]">Total Value / Invested Capital</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-[11px]">
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-slate-500 uppercase tracking-widest text-[9px] mb-0.5">Owner</div>
          <div className="font-semibold text-slate-950">Jane S.</div>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
          <div className="text-slate-500 uppercase tracking-widest text-[9px] mb-0.5">Slices</div>
          <div className="font-semibold text-slate-950">Fund · Vintage</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500">
        <GitBranch size={11} /> deployed to Snowflake
        <span className="ml-auto text-emerald-600 font-medium">Approved</span>
      </div>
    </div>

    {/* Secondary floating tag */}
    <div
      className="absolute -bottom-4 -left-4 rounded-2xl bg-white border border-black/10 px-3 py-2 shadow-xl"
      style={{ transform: 'rotate(3deg)' }}
    >
      <div className="text-[10px] text-slate-500">AI question</div>
      <div className="text-[12px] font-semibold text-slate-950">&quot;MOIC by vintage?&quot;</div>
    </div>

    <div
      className="absolute -top-4 -right-4 rounded-full bg-slate-950 text-white px-3 py-1.5 shadow-xl flex items-center gap-1.5"
      style={{ transform: 'rotate(-4deg)' }}
    >
      <Sparkles size={12} className="text-blue-300" />
      <span className="text-[11px] font-medium">grounded answer</span>
    </div>
  </div>
);

const chapters = [
  {
    step: 1,
    title: 'Start with a metric',
    body: 'A business question becomes a first-class metric — with definition, formula, owner and lifecycle.',
    Icon: Sparkles,
  },
  {
    step: 2,
    title: 'Add semantic context',
    body: 'Slices, reports, value drivers and lineage capture what the metric actually means to the business.',
    Icon: GitBranch,
  },
  {
    step: 3,
    title: 'Govern the lifecycle',
    body: 'Draft → Proposed → Approved → Implemented. Every change is versioned, reviewed and traceable.',
    Icon: CheckCircle2,
  },
  {
    step: 4,
    title: 'Deploy to your platforms',
    body: 'Snowflake Semantic Views. Databricks Metric Views. Unity Catalog. All from one governed definition.',
    Icon: Database,
  },
  {
    step: 5,
    title: 'Give AI the meaning',
    body: 'Agents query through the semantic layer — every answer is grounded in the governed business context.',
    Icon: Sparkles,
  },
];

const ProductDemoPage = () => {
  const demo = useDemoModal();
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Hero — NanoCard split-hero template */}
      <section className="relative pt-32 md:pt-40 pb-24 overflow-hidden">
        {/* Gradient wash behind the hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, #ffffff 0%, #f8fafc 60%, #ffffff 100%)',
          }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-4">
              Product Demo
            </p>
            <h1 className="hero-headline text-[52px] md:text-[76px] text-slate-950 leading-[0.95]">
              See a metric go from <span style={{ color: '#1E5FEE' }}>meaning</span> to <span style={{ color: '#1E5FEE' }}>machine</span>.
            </h1>
            <p className="mt-6 max-w-lg text-slate-600 text-[15px] md:text-[16px] leading-relaxed">
              A guided 10-minute walkthrough of Duo Data — from defining a business metric to
              a governed AI answer, across Snowflake and Databricks.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button onClick={demo.open} className="pill-btn-dark">
                <Play size={14} /> Watch the demo
              </button>
              <Link
                to="/#mega-diagram"
                className="px-5 py-2.5 rounded-full border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-slate-50 transition-colors"
              >
                See the architecture
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-[12px] text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Live product
              </div>
              <div>10 min</div>
              <div>No install</div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <MetricDeviceCard />
          </div>
        </div>
      </section>

      {/* Chapter navigator */}
      <section className="py-20 bg-white border-y border-black/5">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="max-w-2xl mb-10">
            <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Demo chapters</p>
            <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950 leading-[0.98]">
              What you&apos;ll see, step by step.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Chapter list */}
            <div className="space-y-2">
              {chapters.map((c, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={c.step}
                    onClick={() => setActive(i)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                      isActive
                        ? 'bg-slate-950 text-white border-slate-950'
                        : 'bg-white border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isActive ? 'bg-white/10 text-blue-300' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      <c.Icon size={16} />
                    </div>
                    <div>
                      <div className={`text-[10px] uppercase tracking-widest font-mono mb-1 ${isActive ? 'text-blue-300' : 'text-slate-400'}`}>
                        Chapter 0{c.step}
                      </div>
                      <div className={`text-[16px] font-semibold ${isActive ? 'text-white' : 'text-slate-950'}`}>
                        {c.title}
                      </div>
                      <p className={`text-[13px] mt-1 leading-relaxed ${isActive ? 'text-slate-300' : 'text-slate-600'}`}>
                        {c.body}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Chapter visual placeholder */}
            <div className="lg:sticky lg:top-28">
              <div className="aspect-[4/3] rounded-3xl border border-black/10 bg-gradient-to-br from-slate-50 to-white p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-40 pointer-events-none"
                  style={{ background: 'radial-gradient(600px circle at 20% 20%, rgba(30,95,238,0.15), transparent)' }} />
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-2">
                    Chapter 0{chapters[active].step}
                  </div>
                  <h3 className="hero-headline text-[28px] md:text-[36px] text-slate-950 mb-4 leading-tight">
                    {chapters[active].title}
                  </h3>
                  <p className="text-[14px] text-slate-600 leading-relaxed max-w-md">
                    {chapters[active].body}
                  </p>

                  <div className="mt-6 flex items-center gap-1.5">
                    {chapters.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all ${
                          i === active ? 'w-8 bg-slate-950' : 'w-2 bg-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Corner emblem */}
                <div className="absolute bottom-6 right-6 w-16 h-16 rounded-2xl bg-slate-950 text-white flex items-center justify-center">
                  {(() => {
                    const Icon = chapters[active].Icon;
                    return <Icon size={22} />;
                  })()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="hero-headline text-[36px] md:text-[56px] text-slate-950 leading-[0.98]">
            Ready for the guided version?
          </h2>
          <p className="mt-4 text-slate-600 text-[15px] max-w-xl mx-auto">
            45 minutes with our team. We use your stack, your metrics, and your questions.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button onClick={demo.open} className="pill-btn-dark">
              Book a demo <ArrowRight size={14} />
            </button>
            <Link
              to="/metrics/moic"
              className="px-5 py-2.5 rounded-full border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-white transition-colors"
            >
              See a metric card
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDemoPage;
