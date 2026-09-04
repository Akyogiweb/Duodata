import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Reveal from '@/components/Reveal';

const mappings = [
  { business: 'MOIC', technical: 'Semantic view', detail: 'A named business metric resolves to one governed platform object.' },
  { business: 'Definition', technical: 'YAML contract', detail: 'Plain-language intent travels with the implementation as versioned code.' },
  { business: 'Formula', technical: 'Metric SQL', detail: 'Platform-independent logic compiles into native warehouse syntax.' },
  { business: 'Ownership', technical: 'Access policy', detail: 'Business accountability and technical permissions stay attached.' },
  { business: 'Lifecycle', technical: 'Git release', detail: 'Approval state and deployment state advance through one workflow.' },
  { business: 'Question', technical: 'Grounded query', detail: 'Every answer traces back through a shared semantic contract.' },
];

const MappingButton = ({ children, active, side, index, onActivate }) => (
  <button
    type="button"
    onMouseEnter={onActivate}
    onFocus={onActivate}
    onClick={onActivate}
    aria-pressed={active}
    className={`min-h-12 w-full rounded-xl border px-3 py-2 text-left text-sm font-semibold transition-[background-color,border-color,color,transform] duration-300 md:px-5 ${
      side === 'right' ? 'md:text-right' : ''
    } ${active ? 'border-[#1E5FEE] bg-slate-950 text-white md:translate-x-0' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-400'}`}
    data-testid={`two-sides-${side}-mapping-${index + 1}`}
  >
    {children}
  </button>
);

const TwoSides = () => {
  const [active, setActive] = useState(0);

  return (
    <section id="why-duo" className="border-y border-black/5 bg-white py-24 md:py-32" data-testid="two-sides-section">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="grid gap-8 border-b border-slate-200 pb-12 md:grid-cols-[180px_minmax(0,1fr)] md:gap-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500" data-testid="two-sides-eyebrow">The bridge</p>
          <div className="max-w-4xl">
            <h2 className="hero-headline text-4xl leading-none text-slate-950 sm:text-5xl lg:text-6xl" data-testid="two-sides-title">
              Business meaning and technical reality, paired line by line.
            </h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base" data-testid="two-sides-description">
              Move through the map to see how Duo keeps each business concept attached to its implementation.
            </p>
          </div>
        </Reveal>

        <div className="mt-14" data-testid="two-sides-container">
          <div className="grid grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] items-end gap-2 border-b border-slate-200 pb-4 md:grid-cols-[minmax(0,1fr)_128px_minmax(0,1fr)] md:gap-6">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1E5FEE]">Business</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">What people mean</h3>
            </div>
            <div className="text-center font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">Duo</div>
            <div className="text-right">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1E5FEE]">Technical</span>
              <h3 className="mt-2 text-lg font-bold text-slate-950">What systems run</h3>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {mappings.map((mapping, index) => {
              const isActive = active === index;
              return (
                <div
                  key={mapping.business}
                  className="grid grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] items-center gap-2 py-3 md:grid-cols-[minmax(0,1fr)_128px_minmax(0,1fr)] md:gap-6"
                  data-testid={`two-sides-row-${index + 1}`}
                >
                  <MappingButton side="business" index={index} active={isActive} onActivate={() => setActive(index)}>
                    {mapping.business}
                  </MappingButton>
                  <div className="relative flex h-12 items-center justify-center" aria-hidden="true">
                    <div className="absolute inset-x-0 h-px bg-slate-200" />
                    <motion.div
                      className="absolute left-0 h-px bg-[#1E5FEE]"
                      animate={{ width: isActive ? '100%' : '0%' }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <span className={`relative grid h-8 w-8 place-items-center rounded-full border bg-white transition-[border-color,color] duration-300 ${isActive ? 'border-[#1E5FEE] text-[#1E5FEE]' : 'border-slate-200 text-slate-400'}`}>
                      <ArrowRight size={14} />
                    </span>
                  </div>
                  <MappingButton side="technical" index={index} active={isActive} onActivate={() => setActive(index)}>
                    {mapping.technical}
                  </MappingButton>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid gap-3 rounded-2xl border-l-2 border-[#1E5FEE] bg-slate-50 px-5 py-5 md:grid-cols-[180px_minmax(0,1fr)] md:gap-10" data-testid="two-sides-active-detail">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1E5FEE]">Active connection</span>
            <p className="text-sm leading-relaxed text-slate-700" data-testid="two-sides-active-description">{mappings[active].detail}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoSides;