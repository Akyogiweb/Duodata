import { useEffect, useState } from 'react';
import BrandMark from './BrandMark';
import { DUO_BLUE, DUO_CYAN } from '../lib/brand';

const BUSINESS_QUESTIONS = [
  { q: 'How is enterprise Revenue defined?', slug: 'snowflake', color: '#29B5E8', label: 'Snowflake' },
  { q: 'Who owns Net Retention?', slug: 'databricks', color: '#FF3621', label: 'Databricks' },
  { q: 'Why does pipeline coverage disagree?', slug: 'dbt', color: '#FF694A', label: 'dbt' },
  { q: 'What is our true Customer Count?', slug: 'googlebigquery', color: '#4285F4', label: 'BigQuery' },
];

const TECHNICAL_QUESTIONS = [
  { q: 'Where is the source of truth for ARR?', slug: 'snowflake', color: '#29B5E8', label: 'Snowflake' },
  { q: 'Which dbt model feeds this metric?', slug: 'dbt', color: '#FF694A', label: 'dbt' },
  { q: 'Who last published this definition?', slug: 'databricks', color: '#FF3621', label: 'Databricks' },
  { q: 'What happens if the warehouse schema drifts?', slug: 'googlebigquery', color: '#4285F4', label: 'BigQuery' },
];

const TIMING = {
  enter: 650,
  draw: 1500,
  hold: 2100,
  exit: 700,
  gap: 450,
};

const SOURCE_POS = [
  { x: 11, y: 40 },
  { x: 89, y: 42 },
  { x: 14, y: 48 },
  { x: 86, y: 46 },
];

export default function QuestionCycle({ experience }) {
  const questions = experience === 'technical' ? TECHNICAL_QUESTIONS : BUSINESS_QUESTIONS;
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    setIdx(0);
    setPhase('enter');
  }, [experience]);

  useEffect(() => {
    const delays = {
      enter: TIMING.enter,
      draw: TIMING.draw,
      hold: TIMING.hold,
      exit: TIMING.exit,
    };
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
  const src = SOURCE_POS[idx % SOURCE_POS.length];
  const visible = phase !== 'exit';
  const drawing = phase === 'draw' || phase === 'hold';

  const startX = 50;
  const startY = 38;
  const dir = src.x >= startX ? 1 : -1;
  const dx = Math.abs(src.x - startX) * 0.5;
  const d = `M ${startX} ${startY} C ${startX + dir * dx} ${startY}, ${src.x - dir * dx} ${src.y}, ${src.x} ${src.y}`;

  const stroke = experience === 'technical' ? DUO_CYAN : DUO_BLUE;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(560px,72vh)] overflow-visible" aria-hidden>
      <div
        className="absolute left-1/2 z-10 w-[min(92vw,640px)] -translate-x-1/2 text-center transition-all duration-700"
        style={{
          top: 210,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-10px)',
        }}
      >
        <p
          className={`inline-block rounded-full border px-5 py-2.5 text-[13px] font-medium tracking-tight shadow-lg backdrop-blur-md sm:text-[15px] ${
            experience === 'technical'
              ? 'border-white/15 bg-[#0c1220]/80 text-white'
              : 'border-black/10 bg-white/85 text-slate-950'
          }`}
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {item.q}
        </p>
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <path
          d={d}
          stroke={stroke}
          strokeWidth="0.55"
          strokeLinecap="round"
          pathLength="1"
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawing ? 0 : 1,
            opacity: visible ? 1 : 0,
            transition: `stroke-dashoffset ${TIMING.draw}ms cubic-bezier(0.4,0,0.2,1), opacity 500ms ease`,
          }}
        />
        <circle
          cx={src.x}
          cy={src.y}
          r="1.1"
          fill={stroke}
          style={{
            opacity: drawing && visible ? 1 : 0,
            transition: 'opacity 400ms ease',
          }}
        />
      </svg>

      <div
        className="absolute z-10 transition-all duration-700"
        style={{
          left: `${src.x}%`,
          top: `${src.y}%`,
          transform: `translate(-50%, -50%) scale(${drawing && visible ? 1 : 0.86})`,
          opacity: drawing && visible ? 1 : 0,
        }}
      >
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-md ${
            experience === 'technical'
              ? 'border-white/10 bg-[#10182a]'
              : 'border-black/[0.08] bg-white'
          }`}
        >
          <BrandMark slug={item.slug} color={item.color} size={26} label={item.label} />
        </div>
      </div>
    </div>
  );
}
