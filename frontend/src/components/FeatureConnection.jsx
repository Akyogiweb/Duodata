import React, { useState } from 'react';
import { FEATURE_CONNECTIONS } from '@/data/featureConnections';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import BrandMark from '@/components/BrandMark';
import { ArrowRight } from 'lucide-react';

const FeatureConnection = () => {
  const { isBusiness, openExperience } = useExperience();
  const [activeId, setActiveId] = useState(FEATURE_CONNECTIONS[0].id);
  const pair = FEATURE_CONNECTIONS.find((p) => p.id === activeId) || FEATURE_CONNECTIONS[0];
  const other = isBusiness ? EXPERIENCES.technical : EXPERIENCES.business;
  const otherSection = isBusiness ? pair.technicalSection : pair.businessSection;

  return (
    <section id="connection" className="py-20 md:py-28 border-y border-black/5 bg-white" data-testid="home-feature-connection">
      <div className="max-w-[1100px] mx-auto px-6">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Feature connection</p>
        <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950 max-w-3xl">
          Every business question has a technical home.
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600 text-[15px] leading-relaxed">
          Pick a question. See what the business means, then how it is implemented — ontology, governance, lineage, or platform mapping.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          {FEATURE_CONNECTIONS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setActiveId(p.id)}
              aria-pressed={p.id === activeId}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                p.id === activeId
                  ? 'border-[#1E5FEE] bg-slate-950 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'
              }`}
              data-testid={`home-connection-chip-${p.id}`}
            >
              {p.businessQuestion}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-black/10 bg-slate-50 p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1E5FEE]">Business question</p>
            <h3 className="mt-3 text-[22px] font-semibold text-slate-950">{pair.businessQuestion}</h3>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-600">{pair.businessAnswer}</p>
          </article>
          <article className="rounded-2xl border border-black/10 bg-slate-950 p-6 text-white md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7FD1E8]">Technical implementation</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <BrandMark slug={pair.slug} color={pair.color} size={22} label={pair.label} />
              </div>
              <h3 className="text-[22px] font-semibold">{pair.technicalQuestion}</h3>
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-slate-300">{pair.technicalAnswer}</p>
            <p className="mt-5 text-[12px] uppercase tracking-[0.16em] text-slate-500">{pair.feature}</p>
          </article>
        </div>

        <div className="mt-8">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-[#1E5FEE] hover:underline"
            data-testid="home-connection-switch"
            onClick={() => openExperience(other, otherSection)}
          >
            {isBusiness ? 'See how this is implemented' : 'See the business question'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeatureConnection;
