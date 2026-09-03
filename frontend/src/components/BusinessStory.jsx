import React from 'react';
import { businessQuestions, businessOutcomes } from '@/mock';

const BusinessStory = () => (
  <section id="solutions" className="py-20 md:py-28 bg-slate-50 border-y border-black/5" data-testid="home-business-story">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">For business teams</p>
        <h2 className="hero-headline text-[36px] md:text-[56px] text-slate-950">
          Understand your business data. Ask better questions.
        </h2>
        <p className="mt-5 text-slate-600 text-[15px] md:text-[16px] leading-relaxed">
          A simple, business-friendly experience for understanding metrics, asking questions, and getting trusted answers.
          Duo Data helps you improve products and services, turn post-purchase feedback into faster recommendations,
          keep meaning current when the business changes direction, and give sales the intelligence to convert across a diverse customer mix — so the company can move with AI the right way.
        </p>
        <blockquote className="mt-8 text-[18px] md:text-[22px] font-medium text-slate-900 border-l-2 border-[#1E5FEE] pl-5">
          Can I trust this number, and do I understand what it means?
        </blockquote>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {businessQuestions.map((q) => (
          <div key={q} className="rounded-2xl bg-white border border-black/10 p-5 text-[15px] text-slate-800">
            {q}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {businessOutcomes.map((o) => (
          <div key={o.title} className="rounded-2xl bg-white border border-black/10 p-8">
            <h3 className="font-semibold text-[18px] text-slate-900 mb-2">{o.title}</h3>
            <p className="text-[14px] text-slate-600 leading-relaxed">{o.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BusinessStory;
