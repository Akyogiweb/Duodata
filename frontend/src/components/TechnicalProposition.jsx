import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import {
  JOURNEY_NODES,
  VALUE_LAYERS,
  layerById,
  readPropositionLayer,
} from '@/data/journeyProposition';

const CX = 420;
const TOPS = [92, 188, 284, 380, 476];

const Disc = ({ layer, cy, active, onActivate }) => {
  const { rx, fill, side, depth, title, sub } = layer;
  const ry = 22;
  const wall = `M ${CX - rx} ${cy} A ${rx} ${ry} 0 0 0 ${CX + rx} ${cy} L ${CX + rx} ${cy + depth} A ${rx} ${ry} 0 0 1 ${CX - rx} ${cy + depth} Z`;
  return (
    <g
      className={`prop-disc ${active ? 'is-active' : ''}`}
      onClick={() => onActivate(layer.id)}
      style={{ cursor: 'pointer' }}
      data-testid={`prop-layer-${layer.id}`}
    >
      <path d={wall} fill={side} />
      <ellipse cx={CX} cy={cy} rx={rx} ry={ry} fill={fill} />
      <ellipse cx={CX} cy={cy} rx={rx - 18} ry={Math.max(10, ry - 8)} fill="none" stroke="rgba(255,255,255,0.22)" />
      <text x={CX} y={cy - 2} textAnchor="middle" className={`prop-disc-title ${layer.id === 'consumption' ? 'is-ink' : ''}`}>
        {title}
      </text>
      <text x={CX} y={cy + 16} textAnchor="middle" className={`prop-disc-sub ${layer.id === 'consumption' ? 'is-ink' : ''}`}>
        {sub}
      </text>
    </g>
  );
};

const RISERS = [260, 340, 420, 500, 580];

const TechnicalProposition = () => {
  const { openExperience } = useExperience();
  const [activeId, setActiveId] = useState(VALUE_LAYERS[1].id);

  useEffect(() => {
    const remembered = readPropositionLayer();
    if (remembered && layerById(remembered)) setActiveId(remembered);
  }, []);

  const layer = layerById(activeId) || VALUE_LAYERS[1];
  const questions = JOURNEY_NODES.filter((node) => node.layer === layer.id).slice(0, 3);

  return (
    <section id="proposition" className="tech-proposition" data-testid="home-tech-proposition">
      <div className="tech-proposition-inner">
        <header className="chapter-head">
          <p>Value proposition</p>
          <h2>The stack that answers those customer questions.</h2>
          <p className="chapter-lede">
            Business asks in the language of growth. Technical compiles that language into sources,
            mapping, a living ontology, a decision model, and the interfaces people already open.
          </p>
        </header>

        <div className="prop-stage">
          <svg className="prop-svg" viewBox="0 0 840 620" role="img" aria-labelledby="prop-title">
            <title id="prop-title">Duo Data value proposition from sources to consumption</title>
            <text
              x="36"
              y="330"
              className="prop-spine"
              transform="rotate(-90 36 330)"
              textAnchor="middle"
            >
              Duo Data value proposition
            </text>
            <rect
              x="118"
              y="168"
              width="604"
              height="268"
              rx="18"
              className="prop-frame"
            />
            {RISERS.map((x, i) => (
              <g key={x}>
                <line x1={x} y1="120" x2={x} y2="186" className="prop-riser" />
                <circle r="3.4" cx={x} cy="186" fill={i % 2 ? '#ffffff' : '#1E5FEE'} className="journey-dot">
                  <animateMotion dur={`${4.2 + i * 0.4}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M ${x} 186 V 120`} />
                </circle>
              </g>
            ))}
            <path d="M 420 468 L 420 410" className="prop-arrow" markerEnd="url(#prop-head)" />
            <defs>
              <marker id="prop-head" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                <path d="M 0 0 L 8 4 L 0 8 Z" fill="#ffffff" />
              </marker>
            </defs>
            {VALUE_LAYERS.map((item, i) => (
              <Disc
                key={item.id}
                layer={item}
                cy={TOPS[i]}
                active={item.id === activeId}
                onActivate={setActiveId}
              />
            ))}
          </svg>
        </div>

        <div className="prop-detail" data-testid="prop-detail">
          <p>{layer.title}</p>
          <h3>{layer.sub}</h3>
          <span>{layer.enables}</span>
          {questions.length ? (
            <ul>
              {questions.map((q) => (
                <li key={q.id}>{q.label}</li>
              ))}
            </ul>
          ) : null}
          <button
            type="button"
            data-testid="prop-open-journey"
            onClick={() => openExperience(EXPERIENCES.business, 'journey')}
          >
            See the business questions this answers
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TechnicalProposition;
