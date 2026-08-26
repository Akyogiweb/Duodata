import React from 'react';
import { ArrowRight } from 'lucide-react';

const businessItems = [
  'Metric',
  'Definition',
  'Formula',
  'Ownership',
  'Lifecycle',
  'Value drivers',
  'Reports',
  'Business questions',
];

const technicalItems = [
  'Git',
  'Schema',
  'Tables',
  'Columns',
  'Relationships',
  'Snowflake',
  'Databricks',
  'Semantic views',
];

const Side = ({ label, caption, items, align = 'left', accent }) => (
  <div
    className={`flex-1 p-8 rounded-3xl border border-black/10 bg-white ${
      align === 'right' ? 'md:text-right' : 'md:text-left'
    }`}
  >
    <div className="text-[11px] tracking-[0.28em] uppercase font-medium mb-3" style={{ color: accent }}>
      {label}
    </div>
    <p className="text-[15px] text-slate-800 mb-6 leading-relaxed">{caption}</p>
    <div className={`flex flex-wrap gap-2 ${align === 'right' ? 'md:justify-end' : 'md:justify-start'}`}>
      {items.map((i) => (
        <span
          key={i}
          className="px-3 py-1.5 rounded-full text-[12px] font-medium"
          style={{ background: `${accent}12`, color: '#0f172a', border: `1px solid ${accent}30` }}
        >
          {i}
        </span>
      ))}
    </div>
  </div>
);

const TwoSides = () => (
  <section id="why-duo" className="py-24 md:py-32 bg-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Why Duo?</p>
        <h2 className="hero-headline text-[40px] md:text-[60px] text-slate-950 leading-[0.98]">
          Two sides of the same data problem.
        </h2>
        <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
          Business meaning lives on one side. Technical implementation lives on the other.
          Duo Data is the governed connection between them.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6">
        <Side
          label="Business Surface"
          caption="Where business meaning is defined and governed."
          items={businessItems}
          align="left"
          accent="#1E5FEE"
        />

        {/* Center bridge */}
        <div className="flex md:flex-col items-center justify-center gap-3 md:gap-4 md:w-[220px]">
          <ArrowRight size={18} className="text-slate-400 md:hidden" />
          <div className="p-6 rounded-2xl bg-slate-950 text-white text-center w-full">
            <div className="text-[11px] tracking-[0.28em] uppercase text-slate-400 mb-2">Duo Data</div>
            <div className="hero-headline text-[22px] mb-2">One governed<br />connection.</div>
            <div className="text-[12px] text-slate-400">Meaning ↔ Implementation</div>
          </div>
          <ArrowRight size={18} className="text-slate-400 md:hidden" />
        </div>

        <Side
          label="Technical Side"
          caption="Where business meaning becomes technical reality."
          items={technicalItems}
          align="right"
          accent="#0EA5E9"
        />
      </div>
    </div>
  </section>
);

export default TwoSides;
