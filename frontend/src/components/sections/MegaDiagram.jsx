import React, { useState } from 'react';
import { GitBranch, Database, Layers, Sparkles, Sigma, Slice, Users, FileCode2 } from 'lucide-react';
import useInView from '@/hooks/useInView';

const NODES = {
  moic: {
    title: 'MOIC',
    subtitle: 'Business metric — first-class citizen',
    detail: 'The governed enterprise metric. Everything flows from the business question.',
  },
  formula: {
    title: 'Formula',
    subtitle: 'Platform-independent logic',
    detail: 'MOIC = Total Value / Invested Capital — defined once, projected everywhere.',
  },
  slices: {
    title: 'Slices',
    subtitle: 'Fund · Portfolio · Vintage',
    detail: 'The business lenses through which the metric is viewed.',
  },
  drivers: {
    title: 'Value Drivers',
    subtitle: 'EBITDA Multiple · Net Leverage',
    detail: 'What the business believes drives the metric’s value — causal, not just calculated.',
  },
  gov: {
    title: 'Governance',
    subtitle: 'Lifecycle · Ownership · Approvals',
    detail: 'Draft → Proposed → Approved → Implemented — fully configurable.',
  },
  git: {
    title: 'Git',
    subtitle: 'Versioned semantic contract',
    detail: 'Every metric definition is a YAML file, versioned in Git, reviewed, released.',
  },
  agent: {
    title: 'Duo Data Agent',
    subtitle: 'Capture & Deploy',
    detail: 'Bidirectional: captures platform schema, deploys governed semantics.',
  },
  snow: {
    title: 'Snowflake',
    subtitle: 'Semantic View',
    detail: 'MOIC becomes a governed Semantic View in Snowflake — queried natively.',
  },
  brick: {
    title: 'Databricks',
    subtitle: 'Metric View · Unity Catalog',
    detail: 'MOIC becomes a Metric View — discoverable in Unity Catalog.',
  },
  ai: {
    title: 'AI / Agents',
    subtitle: 'Grounded answers',
    detail: 'Agents query through the semantic layer — answers reflect governed business meaning.',
  },
  answer: {
    title: 'Business Answer',
    subtitle: 'Consistent · Governed · Traceable',
    detail: 'The same number, everywhere — with full lineage back to the business definition.',
  },
};

const iconFor = (id) => {
  const map = {
    moic: Sigma,
    formula: FileCode2,
    slices: Slice,
    drivers: Sparkles,
    gov: Users,
    git: GitBranch,
    agent: Layers,
    snow: Database,
    brick: Database,
    ai: Sparkles,
    answer: Sigma,
  };
  return map[id] || Layers;
};

const Node = ({ id, active, onClick, x, y, w = 140, dark = false, revealDelay = 0, revealIn = true }) => {
  const Icon = iconFor(id);
  const isActive = active === id;
  return (
    <div
      onClick={() => onClick(id)}
      className="absolute cursor-pointer transition-all"
      style={{
        left: x,
        top: y,
        width: w,
        transform: `translate(-50%, -50%) scale(${revealIn ? 1 : 0.85})`,
        opacity: revealIn ? 1 : 0,
        transitionDelay: `${revealDelay}ms`,
      }}
    >
      <div
        className={`px-3 py-2.5 rounded-xl text-center border-2 transition-all ${
          isActive
            ? 'bg-[#1E5FEE] border-[#1E5FEE] text-white shadow-lg'
            : dark
            ? 'bg-slate-950 text-white border-slate-900 hover:border-[#1E5FEE]'
            : 'bg-white border-slate-200 text-slate-800 hover:border-[#1E5FEE]'
        }`}
      >
        <Icon size={14} className="mx-auto mb-1" />
        <div className="text-[12px] font-semibold">{NODES[id].title}</div>
      </div>
    </div>
  );
};

const MegaDiagram = () => {
  const [active, setActive] = useState('moic');
  const [diagRef, diagIn] = useInView({ threshold: 0.2 });

  // Layout coordinates on an 1100 x 720 svg canvas
  const P = {
    moic:    { x: 550, y: 40 },
    formula: { x: 320, y: 150 },
    slices:  { x: 550, y: 150 },
    drivers: { x: 780, y: 150 },
    gov:     { x: 550, y: 260 },
    git:     { x: 550, y: 370 },
    agent:   { x: 550, y: 480 },
    snow:    { x: 320, y: 590 },
    brick:   { x: 780, y: 590 },
    ai:      { x: 550, y: 640 },
    answer:  { x: 550, y: 700 },
  };

  const connections = [
    ['moic', 'formula'], ['moic', 'slices'], ['moic', 'drivers'],
    ['formula', 'gov'], ['slices', 'gov'], ['drivers', 'gov'],
    ['gov', 'git'], ['git', 'agent'],
    ['agent', 'snow'], ['agent', 'brick'],
    ['snow', 'ai'], ['brick', 'ai'], ['ai', 'answer'],
  ];

  const activeSet = new Set();
  connections.forEach(([a, b]) => {
    if (a === active || b === active) {
      activeSet.add(`${a}-${b}`);
    }
  });

  return (
    <section id="mega-diagram" className="py-24 md:py-32 bg-slate-50 border-y border-black/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-3xl mb-10">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">The Duo Data architecture</p>
          <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
            From business meaning to a governed AI answer.
          </h2>
          <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
            Click any node to see what it does. Meaning → semantics → governance → code → platform → AI — all in one traceable spine.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Diagram */}
          <div ref={diagRef} className="lg:col-span-2 relative bg-white rounded-3xl border border-black/10 overflow-hidden" style={{ height: 760 }}>
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1100 760" preserveAspectRatio="xMidYMid meet">
              {connections.map(([a, b], i) => {
                const p1 = P[a];
                const p2 = P[b];
                const isActive = activeSet.has(`${a}-${b}`);
                const len = Math.hypot(p2.x - p1.x, p2.y - p1.y);
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={isActive ? '#1E5FEE' : '#cbd5e1'}
                    strokeWidth={isActive ? 2 : 1}
                    strokeDasharray={isActive ? '0' : `${len}`}
                    className="draw-path"
                    data-draw={diagIn ? 'in' : 'out'}
                    style={{ '--dash': len, transitionDelay: `${i * 90}ms` }}
                  />
                );
              })}
            </svg>
            {Object.keys(P).map((id, i) => {
              const p = P[id];
              const xPct = (p.x / 1100) * 100;
              const yPct = (p.y / 760) * 100;
              return (
                <Node
                  key={id}
                  id={id}
                  active={active}
                  onClick={setActive}
                  x={`${xPct}%`}
                  y={`${yPct}%`}
                  dark={['gov', 'git', 'agent', 'answer'].includes(id)}
                  revealIn={diagIn}
                  revealDelay={400 + i * 60}
                />
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="p-8 rounded-3xl bg-slate-950 text-white">
            <div className="text-[11px] uppercase tracking-widest text-blue-300 font-medium mb-2">
              {NODES[active].subtitle}
            </div>
            <h3 className="hero-headline text-[36px] mb-3">{NODES[active].title}</h3>
            <p className="text-[14px] text-slate-300 leading-relaxed">{NODES[active].detail}</p>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Explore the spine</div>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(NODES).map((id) => (
                  <button
                    key={id}
                    onClick={() => setActive(id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      active === id
                        ? 'bg-white text-slate-950'
                        : 'bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {NODES[id].title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MegaDiagram;
