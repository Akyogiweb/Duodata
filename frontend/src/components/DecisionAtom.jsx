import React, { useState } from 'react';
import { DECISION_ATOM } from '@/data/decisionAtom';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import { ArrowRight } from 'lucide-react';

const CX = 400;
const CY = 280;
const RX = 248;
const RY = 78;
const ORBIT = `M ${CX - RX} ${CY} a ${RX} ${RY} 0 1 1 ${RX * 2} 0 a ${RX} ${RY} 0 1 1 ${-RX * 2} 0`;

const TRAFFIC = [
  { fill: '#1E5FEE', tone: 'blue', r: 5.2, dur: 8, begin: 0 },
  { fill: '#ffffff', tone: 'white', r: 3.6, dur: 11, begin: -2.4 },
  { fill: '#1E5FEE', tone: 'blue', r: 3.2, dur: 13.5, begin: -5.1 },
  { fill: '#ffffff', tone: 'white', r: 2.8, dur: 9.4, begin: -7.2 },
];

const OrbitTraffic = ({ id, active, rotate, onActivate }) => (
  <g
    transform={`rotate(${rotate} ${CX} ${CY})`}
    onClick={() => onActivate(id)}
    style={{ cursor: 'pointer' }}
  >
    <path
      d={ORBIT}
      className={`atom-orbit ${active ? 'is-active' : ''}`}
      fill="none"
      pointerEvents="stroke"
    />
    {TRAFFIC.map((dot, i) => (
      <circle
        key={`${id}-${i}`}
        className={`atom-dot atom-dot-${dot.tone} ${active ? 'is-active' : ''}`}
        cx={CX}
        cy={CY}
        r={active ? dot.r : Math.max(2.2, dot.r - 1)}
        fill={dot.fill}
        filter={dot.tone === 'blue' ? 'url(#atom-blue-glow)' : 'url(#atom-white-glow)'}
      >
        <animateMotion
          dur={`${active ? dot.dur : dot.dur + 3}s`}
          begin={`${dot.begin}s`}
          repeatCount="indefinite"
          path={ORBIT}
        />
      </circle>
    ))}
  </g>
);

const DecisionAtom = () => {
  const { openExperience, isBusiness } = useExperience();
  const [activeId, setActiveId] = useState('metric');
  const part = DECISION_ATOM.find((p) => p.id === activeId) || DECISION_ATOM[0];

  return (
    <section id="product" className="decision-atom" data-testid="home-decision-atom">
      <div className="decision-atom-inner">
        <header className="decision-atom-head">
          <p>{isBusiness ? 'Where decisions break down' : 'The decision atom'}</p>
          <h2>
            {isBusiness ? (
              <>Four questions behind <span>every number.</span></>
            ) : (
              <>Every decision resolves into <span>four governed parts.</span></>
            )}
          </h2>
          <p className="decision-atom-lede">
            {isBusiness
              ? 'When metric, slice, report, and source aren’t aligned, meetings turn into definition debates — and decisions wait.'
              : 'Metric, slice, report, and source orbit one decision model — distinct responsibilities, one semantic core.'}
          </p>
        </header>

        <div className="decision-atom-stage">
          {DECISION_ATOM.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`atom-tag atom-tag-${item.id} ${item.id === activeId ? 'is-active' : ''}`}
              onClick={() => setActiveId(item.id)}
              data-testid={`atom-tag-${item.id}`}
            >
              <span>
                {item.n} / {item.name}
              </span>
              <em>{item.tag}</em>
            </button>
          ))}

          <svg className="atom-svg" viewBox="0 0 800 560" role="img" aria-labelledby="atom-title">
            <title id="atom-title">Governed decision atom with metric, slice, report, and source</title>
            <defs>
              <filter id="atom-blue-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="2.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="atom-white-glow" x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur stdDeviation="1.6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {DECISION_ATOM.map((item) => (
              <OrbitTraffic key={item.id} id={item.id} rotate={item.rotate} active={item.id === activeId} onActivate={setActiveId} />
            ))}
            <circle className="atom-core-ring" cx={CX} cy={CY} r="78" />
            <circle className="atom-core-fill" cx={CX} cy={CY} r="68" />
            <text x={CX} y={CY - 10} textAnchor="middle" className="atom-core-kicker">
              {isBusiness ? 'THE' : 'GOVERNED'}
            </text>
            <text x={CX} y={CY + 18} textAnchor="middle" className="atom-core-name">
              {isBusiness ? 'Question' : 'Decision'}
            </text>
          </svg>
        </div>

        <div className={`atom-pair${isBusiness ? ' atom-pair-business' : ''}`} data-testid="atom-pair-detail">
          <article>
            <p>{isBusiness ? 'The pain' : 'Business'} · {part.name}</p>
            <h3>{part.tag}</h3>
            <span>{part.business}</span>
            <button type="button" data-testid="atom-open-business" onClick={() => openExperience(EXPERIENCES.business, part.businessTopic)}>
              {isBusiness ? 'See this pain in context' : 'Open business topic'} <ArrowRight size={14} />
            </button>
          </article>
          {!isBusiness && (
            <article>
              <p>Technical · {part.name}</p>
              <h3>{part.tag}</h3>
              <span>{part.technical}</span>
              <button type="button" data-testid="atom-open-technical" onClick={() => openExperience(EXPERIENCES.technical, part.technicalTopic)}>
                Open technical topic <ArrowRight size={14} />
              </button>
            </article>
          )}
        </div>
      </div>
    </section>
  );
};

export default DecisionAtom;
