import React from 'react';
import { dataConnectors } from '@/mock';

const ConnectorPill = ({ name, color }) => (
  <div className="flex items-center gap-2 px-4 py-2 mx-3 rounded-full border border-slate-200 bg-white shadow-sm whitespace-nowrap">
    <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
    <span className="text-sm font-medium text-slate-800">{name}</span>
  </div>
);

const LogoMarquee = () => {
  const list = [...dataConnectors, ...dataConnectors];
  return (
    <section className="py-16 bg-slate-50/50 border-y border-black/5 overflow-hidden">
      <p className="text-center text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-8">
        Projects into the modern data stack
      </p>
      <div className="marquee">
        {list.map((c, i) => (
          <ConnectorPill key={i} name={c.name} color={c.color} />
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
