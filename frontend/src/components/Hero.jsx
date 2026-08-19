import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, Database, Layers, GitBranch, Sparkles, ShieldCheck, Lock } from 'lucide-react';
import { complianceBadges } from '@/mock';
import { useDemoModal } from '@/context/DemoModalContext';

/* ==============================================================
   Refined Hero
   - Fixed subtle grid (vertical + horizontal) as permanent bg
   - Stable central headline / tagline / CTA
   - Sequential states: one question card + one animated SVG line
     + one activating source per cycle
   - Pastel line palette, gentle timing
   ============================================================== */

const SOURCES = [
  { id: 'snowflake', label: 'Snowflake', icon: Database, xPct: 12 },
  { id: 'dbt', label: 'dbt / MetricFlow', icon: GitBranch, xPct: 38 },
  { id: 'databricks', label: 'Databricks', icon: Layers, xPct: 62 },
  { id: 'agents', label: 'AI Agents', icon: Sparkles, xPct: 88 },
];

// Colors are soft pastels only, restrained.
const PALETTE = ['#B9B4E8', '#A9C7E8', '#A9D8CF', '#E5B9AF'];

// Question card positions in percent (x from left, y from top of hero canvas)
// Each STATE binds a question to a source and defines a distinct curve.
const STATES = [
  {
    id: 's1',
    question: 'How is enterprise Revenue defined?',
    color: PALETTE[0],
    // start (chip anchor), control 1, control 2, end (source)
    chip: { xPct: 18, yPct: 10 },
    endTargetIdx: 0, // Snowflake
    curve: 'gentle-left',
  },
  {
    id: 's2',
    question: 'Who owns Net Retention?',
    color: PALETTE[1],
    chip: { xPct: 40, yPct: 6 },
    endTargetIdx: 1, // dbt
    curve: 'shallow-mid',
  },
  {
    id: 's3',
    question: 'Latest churn definition & lineage',
    color: PALETTE[2],
    chip: { xPct: 60, yPct: 6 },
    endTargetIdx: 2, // Databricks
    curve: 'shallow-mid',
  },
  {
    id: 's4',
    question: 'What metric powers this AI answer?',
    color: PALETTE[3],
    chip: { xPct: 82, yPct: 10 },
    endTargetIdx: 3, // AI Agents
    curve: 'gentle-right',
  },
  {
    id: 's5',
    question: 'SFDR ESG slice lineage',
    color: PALETTE[0],
    chip: { xPct: 28, yPct: 14 },
    endTargetIdx: 0,
    curve: 'deep-left',
  },
  {
    id: 's6',
    question: 'Governed formula for Gross Margin',
    color: PALETTE[2],
    chip: { xPct: 72, yPct: 14 },
    endTargetIdx: 2,
    curve: 'deep-right',
  },
];

// Phase timings (ms) — elegant and slow
const TIMING = {
  enter: 650,
  draw: 1500,
  hold: 2100,
  exit: 700,
};
const CYCLE_MS = TIMING.enter + TIMING.draw + TIMING.hold + TIMING.exit;

const HERO_H = 640; // canvas height in px used to compute SVG coords

function buildPath(chipPct, sourceXPct, curveKind) {
  // Coord space (SVG viewBox): 1440 x HERO_H (we’ll use 1440 x 640)
  const W = 1440;
  const startX = (chipPct.xPct / 100) * W;
  const startY = (chipPct.yPct / 100) * HERO_H + 40; // just below chip
  const endX = (sourceXPct / 100) * W;
  const endY = HERO_H - 90; // source node y

  // Control points create a soft S-curve; kind alters the sweep.
  let c1x, c1y, c2x, c2y;
  switch (curveKind) {
    case 'deep-left':
      c1x = startX - 40; c1y = startY + 180;
      c2x = endX + 40;   c2y = endY - 160;
      break;
    case 'deep-right':
      c1x = startX + 40; c1y = startY + 180;
      c2x = endX - 40;   c2y = endY - 160;
      break;
    case 'shallow-mid':
      c1x = startX;      c1y = startY + 220;
      c2x = endX;        c2y = endY - 220;
      break;
    case 'gentle-right':
      c1x = startX + 30; c1y = startY + 220;
      c2x = endX - 30;   c2y = endY - 200;
      break;
    case 'gentle-left':
    default:
      c1x = startX - 30; c1y = startY + 220;
      c2x = endX + 30;   c2y = endY - 200;
      break;
  }
  return `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
}

const FixedGrid = () => (
  // Permanent architectural grid — does NOT animate
  <div
    aria-hidden
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:
        'linear-gradient(to right, rgba(15,23,42,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.05) 1px, transparent 1px)',
      backgroundSize: '160px 100%, 100% 80px',
    }}
  />
);

const QuestionCard = ({ text, color, phase, xPct, yPct }) => {
  // Phase-driven transform / opacity
  const visible = phase === 'enter' || phase === 'draw' || phase === 'hold';
  const exiting = phase === 'exit';
  return (
    <div
      className="absolute"
      style={{
        left: `${xPct}%`,
        top: `${yPct}%`,
        transform: 'translate(-50%, 0)',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          border: `1px solid ${color}55`,
          boxShadow: `0 6px 20px ${color}22, 0 1px 2px rgba(15,23,42,0.04)`,
          borderRadius: 12,
          padding: '10px 14px',
          fontSize: 12,
          fontWeight: 500,
          color: '#0a0a0a',
          whiteSpace: 'nowrap',
          opacity: visible && !exiting ? 1 : 0,
          transform: `translateY(${visible && !exiting ? '0' : '-6px'})`,
          transition:
            'opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), transform 650ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: color,
            marginRight: 8,
            verticalAlign: 'middle',
          }}
        />
        {text}
      </div>
    </div>
  );
};

const SourceNode = ({ source, active, color }) => {
  const Icon = source.icon;
  return (
    <div
      className="absolute"
      style={{
        left: `${source.xPct}%`,
        bottom: 24,
        transform: 'translateX(-50%)',
      }}
    >
      <div className="flex flex-col items-center gap-2">
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: '#ffffff',
            border: active ? `1.5px solid ${color}` : '1px solid rgba(15,23,42,0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: active
              ? `0 6px 22px ${color}44, 0 1px 3px rgba(15,23,42,0.06)`
              : '0 1px 2px rgba(15,23,42,0.04)',
            transform: `scale(${active ? 1.05 : 1})`,
            transition:
              'transform 500ms ease-out, box-shadow 500ms ease-out, border-color 500ms ease-out',
          }}
        >
          <Icon size={17} color={active ? color : '#1e293b'} />
        </div>
        <span
          className="text-[11px] font-medium"
          style={{
            color: active ? '#0a0a0a' : '#64748b',
            transition: 'color 500ms ease-out',
          }}
        >
          {source.label}
        </span>
      </div>
    </div>
  );
};

const AnimatedPath = ({ d, color, phase }) => {
  // stroke-dasharray + stroke-dashoffset drives the draw effect.
  // We use a large fixed dasharray so any curve length is well covered.
  const DASH = 2600;
  // Progress by phase:
  //   enter: hidden (offset = DASH)
  //   draw : offset animates DASH -> 0
  //   hold : offset stays 0
  //   exit : path fades out (opacity 1 -> 0), offset stays 0
  const drawing = phase === 'draw' || phase === 'hold';
  const exiting = phase === 'exit';

  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      style={{
        strokeDasharray: DASH,
        strokeDashoffset: drawing ? 0 : DASH,
        opacity: exiting ? 0 : phase === 'enter' ? 0 : 0.85,
        transition:
          `stroke-dashoffset ${TIMING.draw}ms cubic-bezier(0.4, 0, 0.2, 1),
           opacity ${TIMING.exit}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    />
  );
};

const Hero = () => {
  const demo = useDemoModal();

  // Cycle machine: activeIndex + phase
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState('enter');

  useEffect(() => {
    let cancelled = false;
    const timers = [];

    const runCycle = () => {
      if (cancelled) return;
      setPhase('enter');
      timers.push(setTimeout(() => !cancelled && setPhase('draw'), TIMING.enter));
      timers.push(setTimeout(() => !cancelled && setPhase('hold'), TIMING.enter + TIMING.draw));
      timers.push(
        setTimeout(() => !cancelled && setPhase('exit'), TIMING.enter + TIMING.draw + TIMING.hold)
      );
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setActiveIndex((i) => (i + 1) % STATES.length);
          runCycle();
        }, CYCLE_MS)
      );
    };

    runCycle();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  const state = STATES[activeIndex];
  const target = SOURCES[state.endTargetIdx];
  const pathD = useMemo(() => buildPath(state.chip, target.xPct, state.curve), [state, target]);

  return (
    <section
      className="relative w-full overflow-hidden bg-white pt-32 pb-16 md:pt-40"
      style={{ minHeight: HERO_H }}
    >
      <FixedGrid />

      {/* Animation canvas — sits above grid, below content */}
      <div className="absolute inset-x-0 top-0" style={{ height: HERO_H }}>
        {/* Question card (only current one visible) */}
        <QuestionCard
          key={state.id}
          text={state.question}
          color={state.color}
          phase={phase}
          xPct={state.chip.xPct}
          yPct={state.chip.yPct}
        />

        {/* SVG lines */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 1440 ${HERO_H}`}
          preserveAspectRatio="none"
          aria-hidden
        >
          <AnimatedPath d={pathD} color={state.color} phase={phase} />
        </svg>

        {/* Source nodes — all visible; active one lights up */}
        {SOURCES.map((s, i) => (
          <SourceNode
            key={s.id}
            source={s}
            active={i === state.endTargetIdx && (phase === 'draw' || phase === 'hold')}
            color={state.color}
          />
        ))}
      </div>

      {/* Stable center content */}
      <div className="relative max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col items-center text-center pt-24 md:pt-28">
          <h1 className="hero-headline text-[64px] md:text-[128px] text-slate-950 select-none">
            Context
          </h1>
          <p className="mt-3 md:mt-4 text-[11px] md:text-[13px] tracking-[0.28em] uppercase text-slate-500 font-medium">
            For your metrics, dashboards, data platforms and AI
          </p>
          <button onClick={demo.open} className="pill-btn-dark mt-8">
            Get started for free
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>

        {/* Spacer to preserve overall hero height */}
        <div style={{ height: 160 }} />

        {/* Compliance badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-4 opacity-80">
          {complianceBadges.map((b, i) => {
            const Icon = i % 2 === 0 ? ShieldCheck : Lock;
            return (
              <div key={b.id} className="flex items-center gap-2">
                <Icon size={16} className="text-slate-500" />
                <div className="leading-tight">
                  <div className="text-[11px] font-semibold text-slate-700">{b.label}</div>
                  <div className="text-[10px] text-slate-500">{b.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
