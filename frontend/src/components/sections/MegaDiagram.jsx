import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import Reveal from '@/components/Reveal';

const nodes = {
  moic: ['MOIC', 'Business metric', 'The governed business question that anchors the entire system.'],
  formula: ['Formula', 'Portable logic', 'Total Value divided by Invested Capital, defined independently of any platform.'],
  slices: ['Slices', 'Business lenses', 'Fund, portfolio, and vintage provide the approved ways to view the metric.'],
  drivers: ['Value drivers', 'Causal context', 'EBITDA multiple and net leverage capture what the business believes creates value.'],
  governance: ['Governance', 'Ownership and lifecycle', 'Definitions move from draft to approval with accountable owners and evidence.'],
  git: ['Git contract', 'Versioned semantics', 'Every approved change becomes reviewable, testable, and releasable code.'],
  agent: ['Duo agent', 'Capture and deploy', 'The bidirectional agent reads platform structure and deploys governed semantics.'],
  platforms: ['Data platforms', 'Native execution', 'Snowflake and Databricks receive native semantic objects, not copied logic.'],
  ai: ['AI answer', 'Grounded output', 'Answers resolve through governed meaning with lineage back to the source.'],
};

const positions = {
  moic: [500, 60], formula: [210, 180], slices: [500, 180], drivers: [790, 180],
  governance: [500, 320], git: [500, 450], agent: [500, 580], platforms: [270, 720], ai: [730, 720],
};

const edges = [
  ['moic', 'formula'], ['moic', 'slices'], ['moic', 'drivers'],
  ['formula', 'governance'], ['slices', 'governance'], ['drivers', 'governance'],
  ['governance', 'git'], ['git', 'agent'], ['agent', 'platforms'], ['agent', 'ai'], ['platforms', 'ai'],
];

const GraphNode = ({ id, active, onActivate }) => {
  const [x, y] = positions[id];
  const selected = active === id;
  return (
    <g
      role="button"
      tabIndex="0"
      aria-label={`Explore ${nodes[id][0]}`}
      aria-pressed={selected}
      onClick={() => onActivate(id)}
      onKeyDown={(event) => (event.key === 'Enter' || event.key === ' ') && onActivate(id)}
      className="cursor-pointer outline-none"
      data-testid={`mega-node-${id}`}
    >
      <rect x={x - 84} y={y - 32} width="168" height="64" rx="14" fill={selected ? '#1E5FEE' : '#FFFFFF'} stroke={selected ? '#7FD1E8' : '#CBD5E1'} />
      <text x={x} y={y - 2} textAnchor="middle" fill={selected ? '#FFFFFF' : '#0F172A'} fontSize="14" fontWeight="700">{nodes[id][0]}</text>
      <text x={x} y={y + 17} textAnchor="middle" fill={selected ? '#D6EEF6' : '#64748B'} fontSize="10">{nodes[id][1]}</text>
    </g>
  );
};

const MegaDiagram = () => {
  const [active, setActive] = useState('moic');
  const [diagramRef, inView] = useInView({ threshold: 0.15 });
  const reduced = useReducedMotion();
  const activeEdges = useMemo(() => new Set(edges.filter(([a, b]) => a === active || b === active).map(([a, b]) => `${a}-${b}`)), [active]);

  return (
    <section id="mega-diagram" className="border-y border-black/5 bg-slate-50 py-24 md:py-32" data-testid="mega-diagram-section">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="grid gap-8 border-b border-slate-200 pb-12 md:grid-cols-[180px_minmax(0,1fr)] md:gap-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500" data-testid="mega-diagram-eyebrow">System map</p>
          <div className="max-w-4xl">
            <h2 className="hero-headline text-4xl leading-none text-slate-950 sm:text-5xl lg:text-6xl" data-testid="mega-diagram-title">One traceable spine from metric to answer.</h2>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base" data-testid="mega-diagram-description">Select any stage to inspect its role in the governed architecture.</p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]" ref={diagramRef}>
          <div className="hidden min-h-[720px] overflow-hidden rounded-2xl border border-slate-200 bg-white md:block" data-testid="mega-diagram-desktop-canvas">
            <svg viewBox="0 0 1000 780" className="h-full w-full" role="img" aria-labelledby="mega-title mega-description" data-testid="mega-diagram-svg">
              <title id="mega-title">Duo Data governed architecture</title>
              <desc id="mega-description">An interactive architecture from MOIC business meaning through governance and data platforms to a grounded AI answer.</desc>
              {edges.map(([a, b], index) => {
                const selected = activeEdges.has(`${a}-${b}`);
                return (
                  <motion.line
                    key={`${a}-${b}`}
                    x1={positions[a][0]}
                    y1={positions[a][1]}
                    x2={positions[b][0]}
                    y2={positions[b][1]}
                    stroke={selected ? '#1E5FEE' : '#CBD5E1'}
                    strokeWidth={selected ? 2 : 1}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    data-testid={`mega-edge-${a}-${b}`}
                  />
                );
              })}
              {Object.keys(nodes).map((id) => <GraphNode key={id} id={id} active={active} onActivate={setActive} />)}
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 md:hidden" data-testid="mega-diagram-mobile-list">
            {Object.keys(nodes).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                aria-pressed={active === id}
                className={`min-h-20 rounded-xl border px-3 py-3 text-left transition-[background-color,border-color,color] duration-300 ${active === id ? 'border-[#1E5FEE] bg-slate-950 text-white' : 'border-slate-200 bg-white text-slate-700'}`}
                data-testid={`mega-mobile-node-${id}`}
              >
                <span className="block text-sm font-bold">{nodes[id][0]}</span>
                <span className={`mt-1 block text-[11px] ${active === id ? 'text-[#7FD1E8]' : 'text-slate-500'}`}>{nodes[id][1]}</span>
              </button>
            ))}
          </div>

          <aside className="rounded-2xl border border-slate-900 bg-slate-950 p-7 text-white md:p-9" data-testid="mega-diagram-detail-panel">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7FD1E8]" data-testid="mega-active-subtitle">{nodes[active][1]}</p>
            <h3 className="mt-4 text-3xl font-bold" data-testid="mega-active-title">{nodes[active][0]}</h3>
            <p className="mt-5 text-sm leading-relaxed text-slate-300" data-testid="mega-active-detail">{nodes[active][2]}</p>
            <div className="mt-10 border-t border-white/10 pt-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Architecture stage</p>
              <p className="mt-2 text-5xl font-bold text-white/10">{String(Object.keys(nodes).indexOf(active) + 1).padStart(2, '0')}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default MegaDiagram;