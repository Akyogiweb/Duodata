import React from 'react';
import { Bot, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';

const withoutPain = [
  'Confident answer, wrong definition',
  'No named owner to ask',
  'Can’t explain it to the board',
  'Different number in every tool',
];

const withOutcomes = [
  'Answer matches what the business agreed',
  'Named owner stands behind it',
  'Same story in every meeting',
  'Leadership can act without second-guessing',
];

const AISection = () => (
  <section id="ai" className="py-24 md:py-32 bg-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="page-eyebrow">AI in the boardroom</p>
        <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
          AI doesn&apos;t fail because it lacks data.<br />
          <span style={{ color: '#1E5FEE' }}>It fails because it lacks shared meaning.</span>
        </h2>
        <p className="page-description">
          Executives want AI in every workflow — but nobody will sign off on answers they can&apos;t defend. The risk isn&apos;t the model. It&apos;s whether the room trusts what it said.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl border border-black/10 bg-slate-50">
          <div className="flex items-center gap-2 mb-6">
            <XCircle size={16} className="text-red-500" />
            <span className="text-[11px] uppercase tracking-widest text-slate-500 font-medium">Without shared meaning</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
              <Bot size={16} className="text-slate-700" />
            </div>
            <span className="text-[13px] font-medium text-slate-700">Executive asks in the meeting</span>
          </div>
          <div className="flex flex-col gap-2">
            {withoutPain.map((s) => (
              <div key={s} className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-[13px] text-slate-800">
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-slate-950 text-white">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span className="text-[11px] uppercase tracking-widest text-blue-300 font-medium">With one agreed meaning</span>
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Bot size={16} className="text-blue-300" />
            </div>
            <span className="text-[13px] font-medium text-slate-200">Same question, trusted answer</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {withOutcomes.map((s) => (
              <div key={s} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-[13px] text-slate-100">
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 p-8 rounded-3xl border border-black/10 bg-slate-50">
        <div className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-3">The question executives ask</div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-slate-950 flex items-center justify-center">
            <Bot size={14} className="text-white" />
          </div>
          <p className="text-[18px] font-semibold text-slate-950">
            &quot;What is MOIC by vintage — and can I trust it in front of the board?&quot;
          </p>
        </div>
        <p className="text-[14px] leading-relaxed text-slate-600">
          That question only gets a good answer when the business has already agreed what MOIC means, who owns it, and which version is current. Without that, AI is just the fastest way to amplify confusion.
        </p>
      </div>
    </div>
  </section>
);

export default AISection;
