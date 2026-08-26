import React from 'react';
import { ArrowDown, MessageSquare, Calculator, UserSquare, Bot } from 'lucide-react';

const pillars = [
  {
    icon: MessageSquare,
    title: 'Business definitions',
    body: 'Scattered across meetings, documents and tribal knowledge.',
  },
  {
    icon: Calculator,
    title: 'Calculations',
    body: 'Embedded in SQL, spreadsheets, BI tools and applications.',
  },
  {
    icon: UserSquare,
    title: 'Ownership',
    body: 'Unclear or dependent on individuals.',
  },
  {
    icon: Bot,
    title: 'AI context',
    body: 'Incomplete, inconsistent, or disconnected from business semantics.',
  },
];

const chain = [
  'Fragmented meaning',
  'Inconsistent metrics',
  'Low trust',
  'Slower decisions',
  'Unreliable AI',
];

const ModernDataProblem = () => (
  <section id="modern-data-problem" className="py-24 md:py-32 bg-slate-50 border-y border-black/5">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-2xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Today</p>
        <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950">
          The modern data problem isn’t volume. It’s consistency.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="p-6 rounded-2xl bg-white border border-black/10">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                <Icon size={16} className="text-slate-700" />
              </div>
              <div className="text-[15px] font-semibold text-slate-950 mb-2">{p.title}</div>
              <p className="text-[13px] text-slate-600 leading-relaxed">{p.body}</p>
            </div>
          );
        })}
      </div>

      {/* Consequence chain */}
      <div className="mt-16 flex flex-col items-center">
        {chain.map((c, i) => (
          <React.Fragment key={c}>
            <div
              className="px-5 py-2 rounded-full text-[13px] font-medium"
              style={{
                background: i === chain.length - 1 ? '#0a0a0a' : '#fff',
                color: i === chain.length - 1 ? '#fff' : '#0a0a0a',
                border: i === chain.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.12)',
              }}
            >
              {c}
            </div>
            {i < chain.length - 1 && <ArrowDown size={16} className="text-slate-400 my-1.5" />}
          </React.Fragment>
        ))}
      </div>
    </div>
  </section>
);

export default ModernDataProblem;
