import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';
import { DUO_CYAN } from '../lib/brand';
import { FEATURE_CONNECTIONS } from '../data/featureConnections';

const TIMING = { enter: 400, draw: 1100, hold: 2800, exit: 400, gap: 320 };

const PLATFORMS = [
  { x: 16, y: 74, slug: 'snowflake', color: '#29B5E8', label: 'Snowflake' },
  { x: 36, y: 78, slug: 'databricks', color: '#FF3621', label: 'Databricks' },
  { x: 64, y: 78, slug: 'dbt', color: '#FF694A', label: 'dbt' },
  { x: 84, y: 74, slug: 'googlebigquery', color: '#4285F4', label: 'BigQuery' },
];

const QUESTION_ANCHOR = { x: 50, y: 10 };

/** Top → down → platform: consistent vertical flow */
const verticalPath = (qx, qy, lx, ly) => {
  const elbowY = qy + (ly - qy) * 0.58;
  return `M ${qx} ${qy} L ${qx} ${elbowY} L ${lx} ${elbowY} L ${lx} ${ly}`;
};

export default function QuestionCycle({ experience }) {
  const questions = FEATURE_CONNECTIONS.map((pair) => ({
    q: pair.technicalQuestion,
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
    if (experience !== 'technical') return undefined;

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
  }, [phase, questions.length, experience]);

  if (experience !== 'technical') return null;

  const item = questions[idx];
  const platform = PLATFORMS.find((p) => p.slug === item.slug) || PLATFORMS[1];
  const d = verticalPath(QUESTION_ANCHOR.x, QUESTION_ANCHOR.y + 4, platform.x, platform.y - 5);
  const visible = phase !== 'exit';
  const drawing = phase === 'draw' || phase === 'hold';

  return (
    <div className="hero-cycle hero-cycle-technical" data-testid="home-question-cycle" aria-hidden>
      {PLATFORMS.map((tile) => (
        <div
          key={tile.label}
          className={`hero-idle-tile ${item.slug === tile.slug && drawing ? 'is-live' : ''}`}
          style={{ left: `${tile.x}%`, top: `${tile.y}%` }}
        >
          <span className="hero-idle-mark">
            <BrandMark slug={tile.slug} color={tile.color} size={20} label={tile.label} />
          </span>
          <em>{tile.label}</em>
        </div>
      ))}

      <div
        className="hero-q-chip hero-q-chip-top"
        style={{
          left: `${QUESTION_ANCHOR.x}%`,
          top: `${QUESTION_ANCHOR.y}%`,
          opacity: visible ? 1 : 0,
          transform: `translate(-50%, 0) translateY(${visible ? 0 : -6}px)`,
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
          stroke={DUO_CYAN}
          strokeWidth="0.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          className="hero-cycle-path"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawing ? 0 : 1,
            opacity: visible ? 0.42 : 0,
            transition: `stroke-dashoffset ${TIMING.draw}ms cubic-bezier(0.4,0,0.2,1), opacity 350ms ease`,
          }}
        />
      </svg>

      <div
        className="hero-live-logo"
        style={{
          left: `${platform.x}%`,
          top: `${platform.y}%`,
          opacity: drawing && visible ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${drawing && visible ? 1 : 0.94})`,
        }}
      >
        <div className="hero-live-mark">
          <BrandMark slug={item.slug} color={item.color} size={24} label={item.label} />
        </div>
        <em>{item.label}</em>
      </div>
    </div>
  );
}
