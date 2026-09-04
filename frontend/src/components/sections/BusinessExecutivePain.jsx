import React from 'react';
import { AlertTriangle, Users, Bot } from 'lucide-react';

const pains = [
  {
    icon: Users,
    title: 'The board pack says one thing. Sales says another.',
    body: 'Quarterly reviews turn into definition debates. Decisions wait while teams reconcile three versions of the same KPI.',
    tag: 'Alignment',
  },
  {
    icon: AlertTriangle,
    title: 'The analyst left. The dashboard didn’t.',
    body: 'Nobody remembers why the metric changed in Q2. New leaders inherit numbers they can’t explain — and won’t sign off on.',
    tag: 'Accountability',
  },
  {
    icon: Bot,
    title: 'AI answered confidently. Nobody could verify it.',
    body: 'Copilots and agents quote whatever schema they find. Leadership wants speed — but not at the cost of trust.',
    tag: 'AI risk',
  },
];

const BusinessExecutivePain = () => (
  <section id="metric-detail" className="py-24 md:py-32 bg-slate-50 border-y border-black/5">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="page-eyebrow">What it costs the business</p>
        <h2 className="hero-headline page-title text-[40px] md:text-[56px] leading-[0.98]">
          These aren’t data problems.<br />
          <span style={{ color: '#1E5FEE' }}>They’re decision problems.</span>
        </h2>
        <p className="page-description">
          When teams can’t agree what a number means, every downstream choice — pricing, hiring, investment, customer promises — carries hidden risk.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pains.map((pain) => {
          const Icon = pain.icon;
          return (
            <article
              key={pain.title}
              className="rounded-2xl border border-black/10 bg-white p-8 flex flex-col"
            >
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">{pain.tag}</span>
              <div
                className="w-11 h-11 rounded-xl mt-5 mb-5 flex items-center justify-center"
                style={{ background: 'rgba(30, 95, 238, 0.1)' }}
              >
                <Icon size={20} style={{ color: '#1E5FEE' }} />
              </div>
              <h3 className="text-[20px] font-semibold text-slate-950 leading-snug">{pain.title}</h3>
              <p className="mt-4 text-[14px] leading-relaxed text-slate-600 flex-1">{pain.body}</p>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

export default BusinessExecutivePain;
