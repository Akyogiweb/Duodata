import React from 'react';
import { ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';

const before = [
  { label: 'The definition', place: 'In someone’s head' },
  { label: 'Who owns it', place: 'Unclear' },
  { label: 'The board number', place: 'Different from sales' },
  { label: 'The AI answer', place: 'Unverifiable' },
  { label: 'The decision', place: 'Delayed' },
];

const after = [
  'One agreed definition',
  'Named owner',
  'Same story everywhere',
  'Answers you can defend',
  'Decisions that move',
];

const BeforeAfter = () => (
  <section id="before-after" className="py-24 md:py-32 bg-slate-50 border-y border-black/5">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="page-eyebrow">Before &amp; after</p>
        <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
          From debating definitions<br />
          <span style={{ color: '#1E5FEE' }}>to running the business.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-black/10">
          <div className="flex items-center gap-2 mb-6">
            <XCircle size={16} className="text-red-500" />
            <span className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">Today</span>
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
            Meetings stall. Trust erodes. AI amplifies the confusion.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-slate-950 text-white">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span className="text-[11px] uppercase tracking-widest text-blue-300 font-medium">What changes</span>
          </div>
          <div className="flex flex-col gap-2">
            {after.map((a) => (
              <div key={a} className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-[13px] font-medium">
                {a}
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-slate-400 italic">
            The room spends time on strategy — not archaeology.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default BeforeAfter;
