import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import {
  JOURNEY_NODES,
  VALUE_LAYERS,
  layerById,
  readPropositionLayer,
} from '@/data/journeyProposition';

const CX = 470;
const GEOM = [
  { rx: 368, ry: 48, h: 40, cy: 96 },
  { rx: 312, ry: 44, h: 38, cy: 214 },
  { rx: 258, ry: 40, h: 36, cy: 328 },
  { rx: 204, ry: 36, h: 34, cy: 438 },
  { rx: 156, ry: 32, h: 32, cy: 544 },
];

const wallPath = (cx, cy, rx, ry, h) =>
  `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy} L ${cx + rx} ${cy + h} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy + h} Z`;

const Ring = ({ layer, geom, active, onActivate }) => {
  const { rx, ry, h, cy } = geom;
  const lift = active ? -6 : 0;
  return (
    <g
      className={`stack-ring ${active ? 'is-active' : ''}`}
      transform={`translate(0 ${lift})`}
      onClick={() => onActivate(layer.id)}
      data-testid={`prop-layer-${layer.id}`}
    >
      <ellipse cx={CX} cy={cy + h + 10} rx={rx * 0.9} ry={ry * 0.55} className="stack-shadow" />
      <path d={wallPath(CX, cy, rx, ry, h)} fill={`url(#wall-${layer.id})`} />
      <ellipse cx={CX} cy={cy} rx={rx} ry={ry} fill={`url(#top-${layer.id})`} />
      <ellipse cx={CX} cy={cy} rx={rx - 10} ry={ry - 7} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" />
      <text x={CX} y={cy - 4} textAnchor="middle" className={`stack-title ${layer.ink ? 'is-ink' : ''}`}>
        {layer.title}
      </text>
      <text x={CX} y={cy + 14} textAnchor="middle" className={`stack-sub ${layer.ink ? 'is-ink' : ''}`}>
        {layer.sub}
      </text>
    </g>
  );
};

const RISER_X = [250, 355, 470, 585, 690];

const TechnicalProposition = () => {
  const { openExperience } = useExperience();
  const [activeId, setActiveId] = useState('decision');

  useEffect(() => {
    const remembered = readPropositionLayer();
    if (remembered && layerById(remembered)) setActiveId(remembered);
  }, []);

  const layer = layerById(activeId) || VALUE_LAYERS[1];
  const questions = JOURNEY_NODES.filter((node) => node.layer === layer.id).slice(0, 3);
  const consume = GEOM[0];
  const decision = GEOM[1];
  const mapping = GEOM[3];
  const sources = GEOM[4];

  return (
    <section id="proposition" className="viz-band viz-band-dark" data-testid="home-tech-proposition">
      <div className="viz-inner">
        <header className="viz-head">
          <p>Value proposition</p>
          <h2>
            The stack that answers <span>those customer questions.</span>
          </h2>
          <p className="viz-lede">
            Sources in. Meaning governed. The same object in every interface the business already opens.
          </p>
        </header>

        <div className="viz-board">
          <svg className="viz-svg stack-svg" viewBox="0 0 900 680" role="img" aria-labelledby="prop-title">
            <title id="prop-title">Duo Data value proposition from sources to consumption</title>
            <defs>
              {VALUE_LAYERS.map((item) => (
                <React.Fragment key={item.id}>
                  <linearGradient id={`wall-${item.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={item.wall} />
                    <stop offset="100%" stopColor="#05070c" />
                  </linearGradient>
                  <radialGradient id={`top-${item.id}`} cx="32%" cy="28%" r="75%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.28" />
                    <stop offset="18%" stopColor={item.top} />
                    <stop offset="100%" stopColor={item.wall} />
                  </radialGradient>
                </React.Fragment>
              ))}
              <filter id="s-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <marker id="stack-head" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
                <path d="M 0 0 L 7 3.5 L 0 7 Z" fill="#f4f6fb" />
              </marker>
            </defs>

            <text x="42" y="370" className="stack-spine" transform="rotate(-90 42 370)" textAnchor="middle">
              Duo Data value proposition
            </text>
            <rect x="108" y="188" width="724" height="292" rx="10" className="stack-frame" />

            {RISER_X.map((x, i) => {
              const d = `M ${x} ${decision.cy} V ${consume.cy + consume.h + 6}`;
              return (
                <g key={x}>
                  <path d={d} className="stack-riser" fill="none" />
                  <circle r="2.3" cx={x} cy={decision.cy} fill={i % 2 ? '#ffffff' : '#1E5FEE'} className="journey-dot" filter="url(#s-glow)">
                    <animateMotion dur={`${5 + i * 0.35}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" path={d} />
                  </circle>
                </g>
              );
            })}

            <path
              d={`M ${CX} ${sources.cy - 8} L ${CX} ${mapping.cy + mapping.h + 8}`}
              className="stack-feed"
              markerEnd="url(#stack-head)"
            />

            {[...VALUE_LAYERS].reverse().map((item, rev) => {
              const i = VALUE_LAYERS.length - 1 - rev;
              return (
                <Ring
                  key={item.id}
                  layer={item}
                  geom={GEOM[i]}
                  active={item.id === activeId}
                  onActivate={setActiveId}
                />
              );
            })}
          </svg>

          <aside className="viz-hud" data-testid="prop-detail">
            <p>{layer.title}</p>
            <h3>{layer.sub}</h3>
            <span>{layer.enables}</span>
            {questions.length ? (
              <ul>
                {questions.map((q) => (
                  <li key={q.id}>{q.short}</li>
                ))}
              </ul>
            ) : null}
            <button type="button" data-testid="prop-open-journey" onClick={() => openExperience(EXPERIENCES.business, 'journey')}>
              Open the business questions
              <ArrowRight size={14} />
            </button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default TechnicalProposition;
