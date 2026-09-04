import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';
import { DUO_BLUE, DUO_CYAN } from '../lib/brand';
import { FEATURE_CONNECTIONS } from '../data/featureConnections';

const TIMING = { enter: 500, draw: 1400, hold: 2400, exit: 500, gap: 280 };

const IDLE = [
  { x: 11, y: 58, slug: 'snowflake', color: '#29B5E8', label: 'Snowflake' },
  { x: 28, y: 64, slug: 'databricks', color: '#FF3621', label: 'Databricks' },
  { x: 72, y: 63, slug: 'dbt', color: '#FF694A', label: 'dbt' },
  { x: 88, y: 57, slug: 'googlebigquery', color: '#4285F4', label: 'BigQuery' },
];

const STAGES = [
  { qx: 16, qy: 18, lx: 18, ly: 62 },
  { qx: 82, qy: 16, lx: 84, ly: 60 },
  { qx: 14, qy: 22, lx: 30, ly: 66 },
  { qx: 84, qy: 20, lx: 70, ly: 64 },
  { qx: 18, qy: 14, lx: 86, ly: 58 },
];

const curve = (s) => {
  const midY = (s.qy + s.ly) / 2;
  return `M ${s.qx} ${s.qy} C ${s.qx} ${midY}, ${s.lx} ${midY}, ${s.lx} ${s.ly}`;
};

export default function QuestionCycle({ experience }) {
  const questions = FEATURE_CONNECTIONS.map((pair) => ({
    q: experience === 'technical' ? pair.technicalQuestion : pair.businessQuestion,
    slug: pair.slug,
    color: pair.color,
    label: pair.label,
  }));
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    setIdx(0);
    setPhase('enter');
  }, [experience]);

  useEffect(() => {
    const delays = { enter: TIMING.enter, draw: TIMING.draw, hold: TIMING.hold, exit: TIMING.exit };
    const t = setTimeout(() => {
      if (phase === 'exit') {
        setIdx((i) => (i + 1) % questions.length);
        setPhase('enter');
        return;
      }
      const order = ['enter', 'draw', 'hold', 'exit'];
      setPhase(order[order.indexOf(phase) + 1]);
    }, delays[phase] + (phase === 'exit' ? TIMING.gap : 0));
    return () => clearTimeout(t);
  }, [phase, questions.length]);

  const item = questions[idx];
  const stage = STAGES[idx % STAGES.length];
  const d = curve(stage);
  const visible = phase !== 'exit';
  const drawing = phase === 'draw' || phase === 'hold';
  const stroke = experience === 'technical' ? DUO_CYAN : DUO_BLUE;

  return (
    <div className="hero-cycle" data-testid="home-question-cycle" aria-hidden={false}>
      {IDLE.map((tile) => (
        <div
          key={tile.label}
          className={`hero-idle-tile ${item.slug === tile.slug && drawing ? 'is-live' : ''}`}
          style={{ left: `${tile.x}%`, top: `${tile.y}%` }}
        >
          <span className="hero-idle-mark">
            <BrandMark slug={tile.slug} color={tile.color} size={22} label={tile.label} />
          </span>
          <em>{tile.label}</em>
        </div>
      ))}

      <div
        className="hero-q-chip"
        style={{
          left: `${stage.qx}%`,
          top: `${stage.qy}%`,
          opacity: visible ? 1 : 0,
          transform: `translate(-50%, -50%) translateY(${visible ? 0 : -8}px)`,
        }}
        data-testid="home-question-rail"
      >
        <i className="hero-q-dot" />
        <span>{item.q}</span>
      </div>

      <svg className="hero-cycle-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth="0.35"
          strokeLinecap="round"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawing ? 0 : 1,
            opacity: visible ? 1 : 0,
            transition: `stroke-dashoffset ${TIMING.draw}ms cubic-bezier(0.4,0,0.2,1), opacity 400ms ease`,
          }}
        />
        {drawing && visible ? (
          <>
            <circle r="0.7" fill={stroke}>
              <animateMotion dur="2.8s" repeatCount="indefinite" path={d} />
            </circle>
            <circle r="0.5" fill="#ffffff" stroke={stroke} strokeWidth="0.18">
              <animateMotion dur="3.4s" begin="-1.2s" repeatCount="indefinite" path={d} />
            </circle>
          </>
        ) : null}
      </svg>

      <div
        className="hero-live-logo"
        style={{
          left: `${stage.lx}%`,
          top: `${stage.ly}%`,
          opacity: drawing && visible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${drawing && visible ? 1 : 0.9})`,
        }}
      >
        <div className="hero-live-mark">
          <BrandMark slug={item.slug} color={item.color} size={28} label={item.label} />
        </div>
        <em>{item.label}</em>
      </div>
    </div>
  );
}
