import React, { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import {
  DEFAULT_JOURNEY_ID,
  JOURNEY_NODES,
  ancestorsOf,
  childrenOf,
  journeyById,
  layerById,
  rememberPropositionLayer,
  visibleJourneyIds,
} from '@/data/journeyProposition';

const W = 920;
const H = 560;
const ROOT = JOURNEY_NODES.find((node) => !node.parent);
const STAGE_Y = [78, 210, 352, 490];
const STRATEGY_X = [160, 460, 760];

const STAGE_LABEL = {
  model: 'Process model',
  'pre-sales': 'Pre-sales',
  product: 'Product',
  'post-sales': 'Post-sales',
};

function layout(activeId) {
  const visible = visibleJourneyIds(activeId);
  const strategies = childrenOf(ROOT.id);
  const pos = new Map();
  pos.set(ROOT.id, { x: 460, y: STAGE_Y[0], r: 9, depth: 0 });
  strategies.forEach((node, i) => {
    pos.set(node.id, { x: STRATEGY_X[i], y: STAGE_Y[1], r: 7, depth: 1 });
  });

  const placeKids = (parentId, depth) => {
    const kids = childrenOf(parentId).filter((node) => visible.has(node.id));
    if (!kids.length) return;
    const parent = pos.get(parentId);
    const gap = depth === 2 ? 168 : 156;
    const span = (kids.length - 1) * gap;
    const start = parent.x - span / 2;
    kids.forEach((kid, i) => {
      pos.set(kid.id, {
        x: Math.min(860, Math.max(70, kids.length === 1 ? parent.x : start + i * gap)),
        y: STAGE_Y[depth],
        r: depth >= 3 ? 5.5 : 6.5,
        depth,
      });
      placeKids(kid.id, depth + 1);
    });
  };

  const chain = ancestorsOf(activeId);
  const strategy = chain.find((node) => node.parent === ROOT.id) || strategies[2];
  placeKids(strategy.id, 2);
  return { pos, visible, strategyId: strategy.id };
}

function rails(pos, visible) {
  const groups = new Map();
  JOURNEY_NODES.forEach((node) => {
    if (!node.parent || !visible.has(node.id) || !visible.has(node.parent)) return;
    if (!groups.has(node.parent)) groups.set(node.parent, []);
    groups.get(node.parent).push(node.id);
  });
  return [...groups.entries()].map(([parentId, kidIds]) => {
    const p = pos.get(parentId);
    const kids = kidIds.map((id) => pos.get(id));
    const barY = p.y + (kids[0].y - p.y) * 0.46;
    return { parentId, p, kids, barY };
  });
}

function elbow(p, k, barY) {
  return `M ${p.x} ${p.y + p.r} V ${barY} H ${k.x} V ${k.y - k.r}`;
}

const Traffic = ({ d, delay, fill, r }) => (
  <circle r={r} cx="460" cy="78" fill={fill} className="journey-dot" filter="url(#j-glow)">
    <animateMotion dur="7.5s" begin={delay} repeatCount="indefinite" path={d} />
  </circle>
);

const wrap = (text, max = 18) => {
  const words = text.split(' ');
  const lines = [];
  let cur = '';
  words.forEach((word) => {
    const next = cur ? `${cur} ${word}` : word;
    if (next.length > max) {
      if (cur) lines.push(cur);
      cur = word;
    } else cur = next;
  });
  if (cur) lines.push(cur);
  return lines.slice(0, 2);
};

const BusinessJourney = () => {
  const { openExperience } = useExperience();
  const [activeId, setActiveId] = useState(DEFAULT_JOURNEY_ID);
  const node = journeyById(activeId) || journeyById(DEFAULT_JOURNEY_ID);
  const layer = layerById(node.layer);
  const { pos, visible, strategyId } = useMemo(() => layout(activeId), [activeId]);
  const forks = useMemo(() => rails(pos, visible), [pos, visible]);
  const chain = ancestorsOf(node.id);

  const openStack = () => {
    rememberPropositionLayer(node.layer);
    openExperience(EXPERIENCES.technical, 'proposition');
  };

  return (
    <section id="journey" className="viz-band viz-band-light" data-testid="home-business-journey">
      <div className="viz-inner">
        <header className="viz-head">
          <p>Living ontology</p>
          <h2>
            The questions that grow the business — <span>one process model.</span>
          </h2>
          <p className="viz-lede">
            Pre-sales, product, post-sales. When the market, the SKU, or the customer changes, the
            object moves with it.
          </p>
        </header>

        <div className="viz-board">
          <svg className="viz-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="journey-title">
            <title id="journey-title">Business growth questions as a living ontology tree</title>
            <defs>
              <filter id="j-glow" x="-90%" y="-90%" width="280%" height="280%">
                <feGaussianBlur stdDeviation="1.8" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <radialGradient id="j-cyan" cx="35%" cy="30%">
                <stop offset="0%" stopColor="#d9f6ff" />
                <stop offset="55%" stopColor="#7FD1E8" />
                <stop offset="100%" stopColor="#3aa8c2" />
              </radialGradient>
              <radialGradient id="j-blue" cx="35%" cy="30%">
                <stop offset="0%" stopColor="#9db7ff" />
                <stop offset="55%" stopColor="#1E5FEE" />
                <stop offset="100%" stopColor="#143fa8" />
              </radialGradient>
            </defs>
            {forks.map((fork) =>
              fork.kids.map((k, i) => {
                const d = elbow(fork.p, k, fork.barY);
                return (
                  <g key={`${fork.parentId}-${i}`}>
                    <path d={d} className="viz-rail" fill="none" />
                    <Traffic d={d} delay={`${i * 1.1}s`} fill="#1E5FEE" r="2.4" />
                    <Traffic d={d} delay={`${2.4 + i * 0.9}s`} fill="#ffffff" r="2" />
                  </g>
                );
              })
            )}
            {JOURNEY_NODES.filter((item) => visible.has(item.id)).map((item) => {
              const p = pos.get(item.id);
              const active = item.id === activeId;
              const onPath = chain.some((step) => step.id === item.id);
              const cyan = p.depth < 2;
              const lines = wrap(item.short);
              const labelY = item.parent ? p.r + 18 : -(p.r + 16 + (lines.length - 1) * 14);
              return (
                <g
                  key={item.id}
                  className="viz-node"
                  transform={`translate(${p.x} ${p.y})`}
                  onClick={() => setActiveId(item.id)}
                  data-testid={`journey-node-${item.id}`}
                >
                  {active ? <circle r={p.r + 7} className="viz-halo" /> : null}
                  <circle
                    r={p.r}
                    fill={cyan ? 'url(#j-cyan)' : 'url(#j-blue)'}
                    filter="url(#j-glow)"
                    className={onPath ? 'viz-orb is-path' : 'viz-orb'}
                  />
                  <text className={`viz-caption ${active ? 'is-active' : ''}`}>
                    {lines.map((line, i) => (
                      <tspan key={line} x="0" y={labelY + i * 14} textAnchor="middle">
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </svg>

          <aside className="viz-hud" data-testid="journey-detail">
            <p>
              {STAGE_LABEL[node.stage]} · {node.atom}
            </p>
            <h3>{node.label}</h3>
            <em>{node.pain}</em>
            <span>{node.change}</span>
            <button type="button" data-testid="journey-open-stack" onClick={openStack}>
              Compiles to {layer?.title}
              <ArrowRight size={14} />
            </button>
            <small>{journeyById(strategyId)?.short}</small>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BusinessJourney;
