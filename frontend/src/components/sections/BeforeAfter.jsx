import React from 'react';
import { ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';

const before = [
  { label: 'Business Definition', place: 'Spreadsheet' },
  { label: 'Formula', place: 'SQL' },
  { label: 'Ownership', place: 'Person’s memory' },
  { label: 'Dashboard', place: 'BI tool' },
  { label: 'AI', place: 'Guess' },
];

const after = [
  'Meaning',
  'Logic',
  'Ownership',
  'Versioned semantic contract',
  'Snowflake',
  'Databricks',
  'AI',
];

const BeforeAfter = () => (
  <section id="before-after" className="py-24 md:py-32 bg-slate-50 border-y border-black/5">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Before &amp; After</p>
        <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
          One shift. One semantic foundation.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Before */}
        <div className="p-8 rounded-3xl bg-white border border-black/10">
          <div className="flex items-center gap-2 mb-6">
            <XCircle size={16} className="text-red-500" />
            <span className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">Before Duo Data</span>
          </div>
          <div className="flex flex-col gap-3">
            {before.map((b) => (
              <div key={b.label} className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[13px] font-medium text-slate-900">{b.label}</span>
                <span className="text-[12px] text-slate-500 flex items-center gap-2">
                  <ArrowRight size={12} /> {b.place}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-slate-500 italic">
            Meaning is scattered. Trust is optional.
          </p>
        </div>

        {/* After */}
        <div className="p-8 rounded-3xl bg-slate-950 text-white">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span className="text-[11px] uppercase tracking-widest text-blue-300 font-medium">With Duo Data</span>
          </div>
          <div className="text-center mb-4">
            <div className="inline-block px-6 py-3 rounded-2xl bg-blue-500/15 border border-blue-400/30">
              <div className="text-[10px] uppercase tracking-widest text-blue-300">Duo Data</div>
              <div className="text-[16px] font-semibold">Versioned semantic contract</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {after.map((a) => (
              <div key={a} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[12px] font-medium text-center">
                {a}
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-slate-400 italic">
            One governed foundation — every platform, every report, every agent.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default BeforeAfter;
