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

const W = 1120;
const ROOT = JOURNEY_NODES.find((node) => !node.parent);

const STAGE_Y = { 0: 72, 1: 210, 2: 360, 3: 510 };
const STRATEGY_X = [180, 560, 940];

const STAGE_LABEL = {
  model: 'Process model',
  'pre-sales': 'Pre-sales',
  product: 'Product journey',
  'post-sales': 'Post-sales',
};

function layout(activeId) {
  const visible = visibleJourneyIds(activeId);
  const strategies = childrenOf(ROOT.id);
  const pos = new Map();
  pos.set(ROOT.id, { x: 560, y: STAGE_Y[0], r: 16 });
  strategies.forEach((node, i) => {
    pos.set(node.id, { x: STRATEGY_X[i], y: STAGE_Y[1], r: 12 });
  });

  const placeKids = (parentId, depth) => {
    const kids = childrenOf(parentId).filter((node) => visible.has(node.id));
    if (!kids.length) return;
    const parent = pos.get(parentId);
    const span = Math.max(220, kids.length * 200);
    const start = parent.x - span / 2;
    const step = kids.length === 1 ? 0 : span / (kids.length - 1);
    kids.forEach((kid, i) => {
      pos.set(kid.id, {
        x: Math.min(1000, Math.max(120, kids.length === 1 ? parent.x : start + i * step)),
        y: STAGE_Y[depth],
        r: depth >= 3 ? 8 : 10,
      });
      placeKids(kid.id, depth + 1);
    });
  };

  const chain = ancestorsOf(activeId);
  const strategy = chain.find((node) => node.parent === ROOT.id) || strategies[2];
  placeKids(strategy.id, 2);
  return { pos, visible, strategyId: strategy.id };
}

function forks(pos, visible) {
  const edges = [];
  JOURNEY_NODES.forEach((node) => {
    if (!node.parent || !visible.has(node.id) || !visible.has(node.parent)) return;
    const from = pos.get(node.parent);
    const to = pos.get(node.id);
    if (!from || !to) return;
    const barY = (from.y + to.y) / 2;
    edges.push({
      id: `${node.parent}-${node.id}`,
      d: `M ${from.x} ${from.y + from.r} V ${barY} H ${to.x} V ${to.y - to.r}`,
    });
  });
  return edges;
}

const Traffic = ({ d, delay, fill }) => (
  <circle r="3.2" cx="560" cy="72" fill={fill} className="journey-dot">
    <animateMotion dur="6.5s" begin={delay} repeatCount="indefinite" path={d} />
  </circle>
);

const BusinessJourney = () => {
  const { openExperience } = useExperience();
  const [activeId, setActiveId] = useState(DEFAULT_JOURNEY_ID);
  const node = journeyById(activeId) || journeyById(DEFAULT_JOURNEY_ID);
  const layer = layerById(node.layer);
  const { pos, visible, strategyId } = useMemo(() => layout(activeId), [activeId]);
  const edges = useMemo(() => forks(pos, visible), [pos, visible]);
  const chain = ancestorsOf(node.id);

  const openStack = () => {
    rememberPropositionLayer(node.layer);
    openExperience(EXPERIENCES.technical, 'proposition');
  };

  return (
    <section id="journey" className="business-journey" data-testid="home-business-journey">
      <div className="business-journey-inner">
        <header className="chapter-head">
          <p>Living ontology</p>
          <h2>The questions that grow the business — one process model.</h2>
          <p className="chapter-lede">
            Pre-sales, product, and post-sales all move. Duo Data is the dynamic ontology underneath:
            a new market, a new product cut, or a new customer demand changes the object — not a second
            version of the truth.
          </p>
        </header>

        <div className="journey-canvas">
          <div className="journey-mobile">
            {JOURNEY_NODES.filter((item) => visible.has(item.id)).map((item) => (
              <button
                key={item.id}
                type="button"
                className={item.id === activeId ? 'is-active' : ''}
                onClick={() => setActiveId(item.id)}
              >
                {STAGE_LABEL[item.stage]} — {item.label}
              </button>
            ))}
          </div>
          <svg className="journey-svg" viewBox={`0 0 ${W} 620`} role="img" aria-labelledby="journey-title">
            <title id="journey-title">Business growth questions as a living ontology tree</title>
            <defs>
              <filter id="journey-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {edges.map((edge, i) => (
              <g key={edge.id}>
                <path d={edge.d} className="journey-edge" fill="none" />
                <Traffic d={edge.d} delay={`${(i % 5) * 0.7}s`} fill={i % 2 ? '#ffffff' : '#1E5FEE'} />
                <Traffic d={edge.d} delay={`${1.8 + (i % 4) * 0.55}s`} fill={i % 2 ? '#1E5FEE' : '#ffffff'} />
              </g>
            ))}
            {JOURNEY_NODES.filter((item) => visible.has(item.id)).map((item) => {
              const p = pos.get(item.id);
              const active = item.id === activeId;
              const onPath = chain.some((step) => step.id === item.id);
              const tone = item.parent === null || item.parent === ROOT.id ? 'cyan' : 'blue';
              return (
                <g
                  key={item.id}
                  className="journey-node"
                  transform={`translate(${p.x} ${p.y})`}
                  onClick={() => setActiveId(item.id)}
                  style={{ cursor: 'pointer' }}
                  data-testid={`journey-node-${item.id}`}
                >
                  <circle
                    r={p.r + (active ? 4 : 0)}
                    className={`journey-orb is-${tone} ${active ? 'is-active' : ''} ${onPath ? 'is-path' : ''}`}
                    filter="url(#journey-glow)"
                  />
                  <foreignObject x={-110} y={item.parent ? p.r + 10 : -p.r - 52} width="220" height="48">
                    <div className={`journey-label ${active ? 'is-active' : ''} ${item.parent ? '' : 'is-root'}`}>
                      {item.label}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="journey-detail" data-testid="journey-detail">
          <p>
            {STAGE_LABEL[node.stage]} · {node.atom}
          </p>
          <h3>{node.label}</h3>
          <span className="journey-pain">{node.pain}</span>
          <span className="journey-change">{node.change}</span>
          <button type="button" data-testid="journey-open-stack" onClick={openStack}>
            How this compiles — {layer?.title}
            <ArrowRight size={14} />
          </button>
          <small>
            Active strategy: {journeyById(strategyId)?.label}
          </small>
        </div>
      </div>
    </section>
  );
};

export default BusinessJourney;
