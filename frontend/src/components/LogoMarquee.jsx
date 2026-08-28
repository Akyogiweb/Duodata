import React from 'react';
import { dataConnectors } from '@/mock';

const ConnectorPill = ({ name, color }) => (
  <div className="mx-3 flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
    <span className="text-sm font-medium text-slate-800">{name}</span>
  </div>
);

const LogoMarquee = () => {
  const list = [...dataConnectors, ...dataConnectors];
  return (
    <section className="relative w-full max-w-full overflow-x-clip border-y border-black/5 bg-slate-50/50 py-16" style={{ contain: 'inline-size' }} data-testid="connector-marquee-section">
      <p className="mb-8 text-center text-[11px] font-medium uppercase tracking-[0.28em] text-slate-500" data-testid="connector-marquee-title">
        Projects into the modern data stack
      </p>
      <div className="w-full max-w-full overflow-hidden" data-testid="connector-marquee-viewport">
        <div className="marquee">
          {list.map((c, i) => (
            <ConnectorPill key={i} name={c.name} color={c.color} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
