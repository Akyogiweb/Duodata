import React from 'react';
import { businessMeanings } from '@/mock';

const BusinessMeanings = () => (
  <section className="py-20 md:py-28" data-testid="home-business-meanings">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-2xl mb-12">
        <p className="page-eyebrow">What trust looks like</p>
        <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950">
          When the room agrees on meaning, decisions move.
        </h2>
        <p className="page-description">
          These are the metrics leaders actually stand behind — with a definition, an owner, and a place everyone recognizes.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {businessMeanings.map((m) => (
          <article key={m.metric} className="rounded-2xl border border-black/10 bg-white/80 p-7">
            <p className="text-[11px] tracking-[0.2em] uppercase text-[#1E5FEE] font-medium">{m.metric}</p>
            <p className="mt-3 text-[16px] text-slate-900 leading-relaxed">{m.meaning}</p>
            <p className="mt-5 text-[12px] text-slate-500">Owner · {m.owner}</p>
            <p className="text-[12px] text-slate-500">Used in · {m.usedIn}</p>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default BusinessMeanings;
