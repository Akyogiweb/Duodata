import React from 'react';
import { GitCommit, Package } from 'lucide-react';

const stages = [
  { name: 'Draft', color: '#94a3b8' },
  { name: 'Proposed', color: '#7FD1E8' },
  { name: 'Approved', color: '#1E5FEE' },
  { name: 'Implemented', color: '#0a0a0a' },
  { name: 'Obsolete', color: '#64748b' },
];

const Governance = () => (
  <section id="governance" className="py-24 md:py-32 bg-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Governance</p>
        <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
          Govern metrics like production assets.
        </h2>
        <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
          A metric doesn’t become trustworthy because someone documented it. It becomes trustworthy when its
          definition, ownership, lifecycle, implementation and changes are governed.
        </p>
      </div>

      {/* Lifecycle bar */}
      <div className="p-8 rounded-3xl border border-black/10 bg-slate-50">
        <div className="text-[11px] uppercase tracking-widest text-slate-500 mb-4 font-medium">
          Configurable lifecycle
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {stages.map((s, i) => (
            <React.Fragment key={s.name}>
              <div
                className="px-4 py-2 rounded-full text-[13px] font-semibold text-white shadow-sm"
                style={{ background: s.color }}
              >
                {s.name}
              </div>
              {i < stages.length - 1 && (
                <div className="flex-1 min-w-[16px] h-px bg-slate-300 hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>
        <p className="mt-5 text-[13px] text-slate-600">
          Every enterprise controls how semantic definitions move from an idea to an approved,
          production-grade asset — and eventually retirement. <span className="text-slate-900 font-medium">Fully configurable.</span>
        </p>
      </div>

      {/* Versions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { v: 'v1.0', release: 'Snowflake Release 1.0', changes: ['Initial ontology', 'Formula defined', 'Owner assigned'] },
          { v: 'v1.1', release: 'Snowflake Release 1.1', changes: ['Formula refined', 'Vintage slice added', 'Approved by CDO'] },
        ].map((r) => (
          <div key={r.v} className="p-6 rounded-2xl bg-white border border-black/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Package size={14} className="text-slate-500" />
                <span className="font-semibold text-slate-950">MOIC {r.v}</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <GitCommit size={12} /> {r.release}
              </div>
            </div>
            <ul className="space-y-2">
              {r.changes.map((c) => (
                <li key={c} className="text-[13px] text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E5FEE]" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-8 text-center text-[13px] text-slate-500 max-w-2xl mx-auto">
        Changing a metric isn’t editing a wiki page — it’s a governed change to a production semantic asset.
      </p>
    </div>
  </section>
);

export default Governance;
