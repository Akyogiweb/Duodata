import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { complianceBadges } from '@/mock';

const TrustStrip = () => (
  <section id="security" className="border-y border-black/5 py-16 md:py-20" data-testid="home-trust">
    <div className="mx-auto max-w-[1100px] px-6">
      <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Trust</p>
      <h2 className="hero-headline text-[32px] md:text-[44px] text-slate-950 max-w-2xl">
        Meaning is a production asset. Treat it that way.
      </h2>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-slate-600">
        Definitions, owners, and lineage are governed like code. Encryption, residency, and audit sit on the same path as the metric.
      </p>
      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
        {complianceBadges.map((b, i) => {
          const Icon = i % 2 === 0 ? ShieldCheck : Lock;
          return (
            <div key={b.id} className="flex items-center gap-2">
              <Icon size={16} className="text-slate-500" />
              <div className="leading-tight">
                <div className="text-[12px] font-semibold text-slate-800">{b.label}</div>
                <div className="text-[11px] text-slate-500">{b.sub}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default TrustStrip;
