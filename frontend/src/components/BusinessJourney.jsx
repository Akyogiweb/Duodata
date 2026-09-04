import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import {
  DEFAULT_JOURNEY_ID,
  EVOLUTION_TRIGGERS,
  JOURNEY_NODES,
  ancestorsOf,
  childrenOf,
  journeyById,
  layerById,
  rememberPropositionLayer,
  visibleJourneyIds,
  visibleJourneyOrder,
} from '@/data/journeyProposition';

const W = 920;
const H = 600;
const ROOT = JOURNEY_NODES.find((node) => !node.parent);
const STAGE_Y = [88, 220, 368, 510];
const STRATEGY_X = [160, 460, 760];
const CYCLE_MS = 5200;

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
    const kids = kidIds.map((id) => ({ id, ...pos.get(id) }));
    const barY = p.y + (kids[0].y - p.y) * 0.46;
    return { parentId, p, kids, barY };
  });
}

function elbow(p, k, barY) {
  return `M ${p.x} ${p.y + p.r} V ${barY} H ${k.x} V ${k.y - k.r}`;
}

const Traffic = ({ d, delay, fill, r }) => (
  <circle r={r} cx="460" cy="88" fill={fill} className="journey-dot" filter="url(#j-glow)">
    <animateMotion dur="7.5s" begin={delay} repeatCount="indefinite" path={d} />
  </circle>
);

const BusinessJourney = () => {
  const { openExperience } = useExperience();
  const [activeId, setActiveId] = useState(DEFAULT_JOURNEY_ID);
  const [autoPlay, setAutoPlay] = useState(true);
  const userPicked = useRef(false);
  const node = journeyById(activeId) || journeyById(DEFAULT_JOURNEY_ID);
  const layer = layerById(node.layer);
  const { pos, visible, strategyId } = useMemo(() => layout(activeId), [activeId]);
  const forks = useMemo(() => rails(pos, visible), [pos, visible]);
  const chain = ancestorsOf(node.id);
  const chainIds = useMemo(() => new Set(chain.map((step) => step.id)), [activeId]);
  const cycleOrder = useMemo(() => visibleJourneyOrder(activeId), [activeId]);

  useEffect(() => {
    if (!autoPlay || userPicked.current) return undefined;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const order = visibleJourneyOrder(current);
        const index = order.indexOf(current);
        return order[(index + 1) % order.length];
      });
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [autoPlay, strategyId]);

  const pickNode = (id) => {
    userPicked.current = true;
    setAutoPlay(false);
    setActiveId(id);
  };

  const openStack = () => {
    rememberPropositionLayer(node.layer);
    openExperience(EXPERIENCES.technical, 'proposition');
  };

  const activeTrigger = EVOLUTION_TRIGGERS.find((item) => item.id === node.shift) || EVOLUTION_TRIGGERS[0];

  return (
    <section id="journey" className="viz-band viz-band-light" data-testid="home-business-journey">
      <div className="viz-inner">
        <header className="viz-head">
          <p>Where growth breaks down</p>
          <h2>
            The questions that grow the business — <span>when meaning drifts.</span>
          </h2>
          <p className="viz-lede">
            Markets shift. Products launch. Customers change what they buy. Duodata keeps every metric,
            slice, and report aligned as the business evolves — so pre-sales, product, and post-sales
            decide from the same living truth, not three versions of the number.
          </p>
        </header>

        <div className="journey-evolution" aria-label="What triggers meaning to drift">
          <p className="journey-evolution-kicker">What moves the business</p>
          <div className="journey-evolution-triggers">
            {EVOLUTION_TRIGGERS.map((trigger) => (
              <div
                key={trigger.id}
                className={`journey-evolution-pill ${node.shift === trigger.id ? 'is-active' : ''}`}
              >
                <strong>{trigger.label}</strong>
                <span>{trigger.hint}</span>
              </div>
            ))}
          </div>
          <p className="journey-evolution-active">
            Right now: <span>{activeTrigger.label}</span> is reshaping “{node.short.replace('?', '')}”
          </p>
        </div>

        <div className="viz-board">
          <div className="journey-canvas">
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

              {STAGE_Y.slice(1).map((y) => (
                <line
                  key={y}
                  x1="48"
                  x2={W - 48}
                  y1={y - 44}
                  y2={y - 44}
                  className="journey-stage-rail"
                />
              ))}

              {forks.map((fork) =>
                fork.kids.map((k, i) => {
                  const d = elbow(fork.p, k, fork.barY);
                  const onPath = chainIds.has(fork.parentId) && chainIds.has(k.id);
                  return (
                    <g key={`${fork.parentId}-${k.id}`}>
                      <path d={d} className={`viz-rail ${onPath ? 'is-live' : ''}`} fill="none" />
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
                return (
                  <g
                    key={item.id}
                    className="viz-node"
                    transform={`translate(${p.x} ${p.y})`}
                    onClick={() => pickNode(item.id)}
                    data-testid={`journey-node-${item.id}`}
                  >
                    {active ? <circle r={p.r + 9} className="viz-halo journey-pulse" /> : null}
                    <circle r="24" fill="transparent" />
                    <circle
                      r={p.r}
                      fill={cyan ? 'url(#j-cyan)' : 'url(#j-blue)'}
                      filter="url(#j-glow)"
                      className={onPath ? 'viz-orb is-path' : 'viz-orb'}
                    />
                  </g>
                );
              })}
            </svg>

            <div className="journey-labels" aria-hidden={false}>
              {JOURNEY_NODES.filter((item) => visible.has(item.id)).map((item) => {
                const p = pos.get(item.id);
                const active = item.id === activeId;
                const onPath = chain.some((step) => step.id === item.id);
                const above = !item.parent;
                const topPct = ((p.y + (above ? -34 : 28)) / H) * 100;
                const leftPct = (p.x / W) * 100;
                return (
                  <button
                    key={`label-${item.id}`}
                    type="button"
                    className={`journey-label ${active ? 'is-active' : ''} ${onPath ? 'is-path' : ''}`}
                    style={{ left: `${leftPct}%`, top: `${topPct}%` }}
                    onClick={() => pickNode(item.id)}
                    data-testid={`journey-label-${item.id}`}
                  >
                    {item.short}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="viz-hud journey-hud" data-testid="journey-detail">
            <p>
              {STAGE_LABEL[node.stage]} · {node.atom}
            </p>
            <h3>{node.label}</h3>
            <em>{node.pain}</em>

            <div className="journey-drift" data-testid="journey-drift">
              <p className="journey-drift-kicker">Meaning drifts — then gets governed</p>
              <div className="journey-drift-row">
                <div className="journey-drift-col is-was">
                  <span>Before</span>
                  <p>{node.was}</p>
                </div>
                <div className="journey-drift-arrow" aria-hidden>
                  →
                </div>
                <div className="journey-drift-col is-now">
                  <span>With Duodata</span>
                  <p>{node.now}</p>
                </div>
              </div>
            </div>

            <span>{node.change}</span>
            <p className="journey-layer-hint">{layer?.enables}</p>

            <button type="button" data-testid="journey-open-stack" onClick={openStack}>
              What alignment looks like
              <ArrowRight size={14} />
            </button>
            <small>{journeyById(strategyId)?.short}</small>

            {!autoPlay ? (
              <button
                type="button"
                className="journey-resume"
                onClick={() => {
                  userPicked.current = false;
                  setAutoPlay(true);
                }}
              >
                Resume live walkthrough
              </button>
            ) : (
              <p className="journey-auto-note">Walking through {cycleOrder.length} questions as the business evolves</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BusinessJourney;
