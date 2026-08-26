import React from 'react';
import { Gauge, Slice, FileBarChart2, Database } from 'lucide-react';

const cards = [
  {
    id: 'metrics',
    icon: Gauge,
    eyebrow: 'Metrics',
    title: 'What the business wants to measure.',
    body: 'Define what a metric means, how it is calculated, who owns it, and where it is used. Metrics are first-class citizens.',
    viz: (
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="px-3 py-1.5 rounded-lg bg-slate-950 text-white text-[12px] font-semibold">MOIC</div>
        <svg width="180" height="40" viewBox="0 0 180 40">
          <path d="M 90 0 L 20 40 M 90 0 L 90 40 M 90 0 L 160 40" stroke="#1E5FEE" strokeOpacity="0.35" fill="none" />
        </svg>
        <div className="flex gap-2">
          {['Formula', 'Unit', 'Owner'].map((t) => (
            <span key={t} className="px-2 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700">{t}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'slices',
    icon: Slice,
    eyebrow: 'Slices',
    title: 'The lenses that make metrics meaningful.',
    body: 'Business concepts that determine how metrics are viewed, grouped and analyzed. Not just “dimensions” — governed slices.',
    viz: (
      <div className="mt-4 flex flex-col items-center gap-2">
        <div className="px-3 py-1.5 rounded-lg bg-slate-950 text-white text-[12px] font-semibold">MOIC</div>
        <div className="w-px h-3 bg-slate-300" />
        <div className="grid grid-cols-2 gap-1.5">
          {['Fund', 'Portfolio', 'Investment', 'Vintage'].map((s) => (
            <span key={s} className="px-2 py-1 rounded-md bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[11px] font-medium text-slate-800">{s}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'reports',
    icon: FileBarChart2,
    eyebrow: 'Reports',
    title: 'Semantic groupings around a use case.',
    body: 'A report is not a dashboard — it’s a governed grouping of the metrics, slices and questions a business use case depends on.',
    viz: (
      <div className="mt-4 p-3 rounded-xl border border-slate-200 bg-slate-50 text-left">
        <div className="text-[11px] uppercase tracking-widest text-slate-500 mb-1.5">Portfolio Performance</div>
        <div className="flex flex-wrap gap-1.5">
          {['MOIC', 'IRR', 'EBITDA', 'Fund', 'Vintage'].map((s) => (
            <span key={s} className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-700">{s}</span>
          ))}
        </div>
        <div className="mt-2 text-[11px] text-slate-500 italic">3 governed business questions</div>
      </div>
    ),
  },
  {
    id: 'sources',
    icon: Database,
    eyebrow: 'Sources',
    title: 'Where technical reality lives.',
    body: 'Connect business definitions to the systems of record where the underlying data actually lives — the bridge to implementation.',
    viz: (
      <div className="mt-4 flex flex-col items-center gap-1.5">
        {['System of Record', 'Snowflake', 'Tables', 'Metrics'].map((s, i) => (
          <React.Fragment key={s}>
            <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[11px] font-medium text-slate-700">{s}</span>
            {i < 3 && <div className="w-px h-2 bg-slate-300" />}
          </React.Fragment>
        ))}
      </div>
    ),
  },
];

const MetricsOntology = () => (
  <section id="ontology" className="py-24 md:py-32 bg-white border-t border-black/5">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">The Metrics Ontology</p>
        <h2 className="hero-headline text-[40px] md:text-[60px] text-slate-950 leading-[0.98]">
          Start with what the business wants to measure.
        </h2>
        <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
          Everything in Duo Data starts with the business question: what do we want to measure?
          Then we govern the meaning around it.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              className="p-6 rounded-2xl border border-black/10 bg-white hover:border-black/25 transition-colors flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-950 text-white flex items-center justify-center mb-4">
                <Icon size={16} />
              </div>
              <div className="text-[11px] tracking-[0.24em] uppercase text-slate-500 font-medium mb-2">
                {c.eyebrow}
              </div>
              <h3 className="text-[18px] font-semibold text-slate-950 mb-2 leading-snug">{c.title}</h3>
              <p className="text-[13px] text-slate-600 leading-relaxed">{c.body}</p>
              <div className="mt-auto">{c.viz}</div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default MetricsOntology;
