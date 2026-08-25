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

// Colors are soft pastels only, restrained — leaning into the Duodata blue/cyan brand.
const PALETTE = ['#A9C7E8', '#7FD1E8', '#B9B4E8', '#A9D8CF'];

// Question card positions in percent (x from left, y from top of hero canvas)
// Each STATE binds a question to a source. Curves use a single consistent
// S-shape; only chip horizontal offset varies (small) for gentle variety.
const STATES = [
  { id: 's1', question: 'How is enterprise Revenue defined?', color: PALETTE[0], sourceIdx: 0, offset: +4 },
  { id: 's2', question: 'Who owns Net Retention?',            color: PALETTE[1], sourceIdx: 1, offset: -3 },
  { id: 's3', question: 'Latest churn definition & lineage',  color: PALETTE[2], sourceIdx: 2, offset: +3 },
  { id: 's4', question: 'What metric powers this AI answer?', color: PALETTE[3], sourceIdx: 3, offset: -4 },
  { id: 's5', question: 'SFDR ESG slice lineage',             color: PALETTE[1], sourceIdx: 0, offset: -4 },
  { id: 's6', question: 'Governed formula for Gross Margin',  color: PALETTE[0], sourceIdx: 2, offset: -3 },
];

// Phase timings (ms) — elegant and slow
const TIMING = {
  enter: 650,
  draw: 1500,
  hold: 2100,
  exit: 700,
  gap: 450, // fully-blank moment BETWEEN cycles so the top card AND bottom
            // label are both invisible at the same time
};
const CYCLE_MS =
  TIMING.enter + TIMING.draw + TIMING.hold + TIMING.exit + TIMING.gap;

const HERO_H = 640; // canvas height in px used to compute SVG coords
const CHIP_Y_PCT = 20; // safe zone below fixed navigation

// Single consistent S-curve for every state. Only the two endpoints move.
function buildPath(startXPct, startYPct, endXPct) {
  const W = 1440;
  const startX = (startXPct / 100) * W;
  const startY = (startYPct / 100) * HERO_H + 40; // just below chip
  const endX = (endXPct / 100) * W;
  const endY = HERO_H - 90; // source node y

  const c1x = startX;
  const c1y = startY + 220;
  const c2x = endX;
  const c2y = endY - 220;
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

const SourceNode = ({ source, isTarget, color, phase }) => {
  const Icon = source.icon;
  // Match the question card lifecycle exactly: appear on enter, stay through
  // draw & hold, fade away on exit \u2014 so the top chip / line / bottom label
  // all appear and disappear together.
  const visible = isTarget && (phase === 'enter' || phase === 'draw' || phase === 'hold');
  const active = isTarget && (phase === 'draw' || phase === 'hold');

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
            border: active ? `1.5px solid ${color}` : '1px solid rgba(15,23,42,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: active
              ? `0 6px 22px ${color}55, 0 1px 3px rgba(15,23,42,0.06)`
              : '0 1px 2px rgba(15,23,42,0.04)',
            transform: `scale(${active ? 1.06 : 1})`,
            transition:
              'transform 500ms ease-out, box-shadow 500ms ease-out, border-color 500ms ease-out',
          }}
        >
          <Icon size={17} color={active ? color : '#94a3b8'} />
        </div>
        <span
          className="text-[11px] font-medium"
          style={{
            color: '#0a0a0a',
            opacity: visible ? 1 : 0,
            transform: `translateY(${visible ? '0' : '-4px'})`,
            // Identical transition to the QuestionCard so top chip and bottom
            // label appear/disappear perfectly in sync.
            transition:
              'opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), transform 650ms cubic-bezier(0.4, 0, 0.2, 1)',
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
        setTimeout(
          () => !cancelled && setPhase('gap'),
          TIMING.enter + TIMING.draw + TIMING.hold + TIMING.exit
        )
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
  const target = SOURCES[state.sourceIdx];
  const chipX = target.xPct + (state.offset || 0);
  const pathD = useMemo(
    () => buildPath(chipX, CHIP_Y_PCT, target.xPct),
    [chipX, target.xPct]
  );

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
          xPct={chipX}
          yPct={CHIP_Y_PCT}
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

        {/* Source nodes — icons always subtle; the targeted one lights up
            and its label fades in/out in sync with the question card */}
        {SOURCES.map((s, i) => (
          <SourceNode
            key={s.id}
            source={s}
            isTarget={i === state.sourceIdx}
            color={state.color}
            phase={phase}
          />
        ))}
      </div>

      {/* Stable center content */}
      <div className="relative max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col items-center text-center pt-24 md:pt-28">
          <h1 className="hero-headline text-[64px] md:text-[128px] text-slate-950 select-none">
            Context
          </h1>
          <p className="mt-3 md:mt-4 text-[11px] md:text-[13px] tracking-[0.28em] uppercase font-medium">
            <span className="text-slate-500">For your metrics, dashboards, </span>
            <span style={{ color: '#1E5FEE' }}>data platforms and AI</span>
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
