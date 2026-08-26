import React from 'react';
import { BarChart3, Database, FileSpreadsheet, Sparkles } from 'lucide-react';

const columns = [
  { icon: BarChart3, label: 'Dashboard', value: '$42M', color: '#1E5FEE' },
  { icon: Database, label: 'SQL / Warehouse', value: '$39M', color: '#7C3AED' },
  { icon: FileSpreadsheet, label: 'Spreadsheet', value: '$41M', color: '#0EA5E9' },
  { icon: Sparkles, label: 'AI / Agent', value: '?', color: '#EC4899' },
];

const MeaningProblem = () => {
  return (
    <section id="meaning-problem" className="py-24 md:py-32 bg-white border-y border-black/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">The real problem</p>
          <h2 className="hero-headline text-[40px] md:text-[64px] text-slate-950 leading-[0.98]">
            Your organization doesn’t have a data problem.<br />
            <span style={{ color: '#1E5FEE' }}>It has a meaning problem.</span>
          </h2>
          <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
            The same metric can exist in a dashboard, warehouse, spreadsheet, SQL model and AI application —
            and still mean something slightly different in each place.
          </p>
        </div>

        {/* Divergence visualization */}
        <div className="relative mt-16">
          {/* Metric at top */}
          <div className="flex justify-center">
            <div className="px-6 py-3 rounded-2xl bg-slate-950 text-white text-[20px] font-semibold tracking-tight shadow-lg">
              &quot;EBITDA&quot;
            </div>
          </div>

          {/* Connector SVG */}
          <svg className="w-full h-24 mt-2" viewBox="0 0 1200 100" preserveAspectRatio="none">
            {columns.map((c, i) => {
              const x = 150 + i * 300;
              return (
                <path
                  key={i}
                  d={`M 600 0 C 600 50, ${x} 30, ${x} 100`}
                  stroke={c.color}
                  strokeWidth={1.4}
                  strokeOpacity={0.5}
                  fill="none"
                />
              );
            })}
          </svg>

          {/* 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {columns.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="p-6 rounded-2xl border border-black/10 bg-white text-center">
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background: `${c.color}18` }}
                  >
                    <Icon size={18} style={{ color: c.color }} />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-2">{c.label}</div>
                  <div className="hero-headline text-[36px] text-slate-950" style={{ color: c.color }}>{c.value}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <span className="inline-block px-5 py-2 rounded-full bg-slate-50 border border-slate-200 text-[13px] font-medium text-slate-700">
              Which one is right?
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeaningProblem;
