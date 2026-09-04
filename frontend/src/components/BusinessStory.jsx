import React from 'react';
import { businessQuestions, businessOutcomes } from '@/mock';
import { HelpCircle, ShoppingBag, Compass, Users } from 'lucide-react';

const OUTCOME_ICONS = [HelpCircle, ShoppingBag, Compass, Users];

const BusinessStory = () => (
  <section id="business-story" className="py-20 md:py-28 bg-slate-50/80 border-y border-black/5" data-testid="home-business-story">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="page-eyebrow">For business teams</p>
        <h2 className="hero-headline text-[36px] md:text-[56px] text-slate-950">
          Simple answers to the questions that matter.
        </h2>
        <p className="page-description">
          Duodata is a business-friendly experience for understanding metrics, asking questions, and getting trusted answers.
          Improve products and services, act on post-purchase feedback faster, keep meaning current when direction changes,
          and give sales the intelligence to win across a complex customer base — so your company moves with AI the right way.
        </p>
        <blockquote className="mt-8 text-[18px] md:text-[22px] font-medium text-slate-900 border-l-2 border-[#1E5FEE] pl-5">
          Can I trust this number, and do I understand what it means?
        </blockquote>
      </div>

      <div className="mb-6">
        <p className="text-[12px] uppercase tracking-[0.2em] text-slate-500 font-medium mb-4">Every business user can ask</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {businessQuestions.map((q) => (
            <div key={q} className="rounded-2xl bg-white border border-black/10 p-5 text-[15px] text-slate-800 shadow-sm">
              {q}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p className="text-[12px] uppercase tracking-[0.2em] text-slate-500 font-medium mb-6">What changes for your business</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {businessOutcomes.map((o, i) => {
            const Icon = OUTCOME_ICONS[i] || HelpCircle;
            return (
              <div key={o.title} className="rounded-2xl bg-white border border-black/10 p-8 shadow-sm">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(30, 95, 238, 0.1)' }}
                >
                  <Icon size={18} style={{ color: '#1E5FEE' }} />
                </div>
                <h3 className="font-semibold text-[18px] text-slate-900 mb-2">{o.title}</h3>
                <p className="text-[14px] text-slate-600 leading-relaxed">{o.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

export default BusinessStory;
