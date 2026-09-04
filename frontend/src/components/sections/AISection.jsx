import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';

const withoutSteps = ['Tables', 'Columns'];
const withSteps = [
  'Business meaning',
  'Metric',
  'Formula',
  'Slices',
  'Lineage',
  'Reports',
  'Business questions',
  'Semantic layer',
];

const querySteps = [
  'Business question',
  'Report: Portfolio Performance',
  'Metric: MOIC',
  'Slice: Vintage',
  'Approved formula',
  'Snowflake Semantic View',
  'Answer',
];

const AISection = () => (
  <section id="ai" className="py-24 md:py-32 bg-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">AI &amp; Agents</p>
        <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
          AI doesn’t need more data.<br />
          <span style={{ color: '#1E5FEE' }}>It needs better context.</span>
        </h2>
        <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
          Give agents the definitions, formulas, relationships, ownership, lineage and business questions
          they need to interpret enterprise data correctly.
        </p>
      </div>

      {/* Two paths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl border border-black/10 bg-slate-50">
          <div className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-2">Data access</div>
          <div className="text-[16px] font-semibold text-slate-950 mb-6">Without governed semantics</div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              <Bot size={16} className="text-slate-700" />
            </div>
            <span className="text-[13px] font-medium text-slate-700">AI Agent</span>
          </div>
          <div className="flex flex-col gap-2">
            {withoutSteps.map((s) => (
              <div key={s} className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-[13px] text-slate-800">
                {s}
              </div>
            ))}
            <div className="px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-[13px] text-red-700">
              Guess a column, a formula, filters, ownership — answer with low confidence.
            </div>
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-950 text-white">
          <div className="text-[11px] uppercase tracking-widest text-blue-300 font-medium mb-2">Semantic context</div>
          <div className="text-[16px] font-semibold mb-6">With Duo Data</div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Bot size={16} className="text-blue-300" />
            </div>
            <span className="text-[13px] font-medium text-slate-200">AI Agent</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {withSteps.map((s) => (
              <div key={s} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[13px] text-slate-100">
                {s}
              </div>
            ))}
            <div className="px-3 py-2 rounded-lg bg-blue-500/15 border border-blue-400/30 text-[13px] text-blue-200">
              Grounded, governed answer with full lineage.
            </div>
          </div>
        </div>
      </div>

      {/* Concrete example */}
      <div className="mt-16 p-8 rounded-3xl border border-black/10 bg-white">
        <div className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-3">Example</div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center">
            <Bot size={14} className="text-white" />
          </div>
          <p className="text-[18px] font-semibold text-slate-950">
            &quot;What is MOIC by vintage for our private equity portfolio?&quot;
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {querySteps.map((s, i, arr) => (
            <React.Fragment key={s}>
              <span
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium ${
                  i === arr.length - 1
                    ? 'bg-[#1E5FEE] text-white'
                    : 'bg-slate-100 text-slate-800 border border-slate-200'
                }`}
              >
                {s}
              </span>
              {i < arr.length - 1 && <ArrowRight size={12} className="text-slate-400" />}
            </React.Fragment>
          ))}
        </div>

        <p className="mt-6 text-[13px] text-slate-500 italic">
          Every AI answer is anchored in the governed semantic layer — not a schema guess.
        </p>
      </div>
    </div>
  </section>
);

export default AISection;
