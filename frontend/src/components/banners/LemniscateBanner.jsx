import React from 'react';
import DarkBanner from './DarkBanner';
import { UserSquare2, Cpu } from 'lucide-react';

/**
 * "Why DuoData is called DuoData" — Lemniscate / infinity visualization.
 * Two side circles connected via a lemniscate; center icosahedron labelled Metric Ontology.
 * Under the circles: Humans (left) and AI (right).
 */
const IcosahedronMini = () => {
  // 12 vertex icosahedron approximation projected onto 2D
  const vertices = [
    { x: 0, y: -46 },
    { x: 41, y: -20 },
    { x: 26, y: 32 },
    { x: -26, y: 32 },
    { x: -41, y: -20 },
    { x: 0, y: 0 },
    { x: 22, y: -8 },
    { x: 14, y: 20 },
    { x: -14, y: 20 },
    { x: -22, y: -8 },
    { x: 0, y: -22 },
    { x: 0, y: 22 },
  ];
  const edges = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
    [0, 10], [1, 6], [2, 7], [3, 8], [4, 9],
    [6, 7], [7, 8], [8, 9], [9, 6], [6, 10], [7, 11], [8, 11], [9, 10],
    [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11],
    [10, 11],
  ];
  const colors = ['#A78BFA', '#60A5FA', '#C4B5FD', '#93C5FD', '#7DD3FC', '#DDD6FE'];
  return (
    <svg viewBox="-70 -70 140 140" className="w-full h-full">
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={vertices[a].x}
          y1={vertices[a].y}
          x2={vertices[b].x}
          y2={vertices[b].y}
          stroke="#93A5C4"
          strokeOpacity="0.35"
          strokeWidth="0.6"
        />
      ))}
      {vertices.map((v, i) => (
        <circle
          key={i}
          cx={v.x}
          cy={v.y}
          r={i === 5 ? 3.5 : 2.6}
          fill={colors[i % colors.length]}
        />
      ))}
      <text x="0" y="2" textAnchor="middle" fill="#60A5FA" fontSize="10" fontWeight="700">Metric</text>
      <text x="0" y="12" textAnchor="middle" fill="#94A3B8" fontSize="6.5" fontWeight="500">Ontology</text>
    </svg>
  );
};

const LemniscateBanner = () => (
  <DarkBanner
    eyebrow="Why the name?"
    title={<>Why DuoData is called <span style={{ color: '#F97316' }}>DuoData</span>.</>}
    subtitle="Two sides of the same problem — connected by one governed semantic layer."
  >
    <div className="relative aspect-[16/8] w-full">
      <svg viewBox="0 0 1200 600" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="lb-glow-left" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lb-glow-right" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </radialGradient>
          <marker id="lb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748B" />
          </marker>
        </defs>

        {/* Glow behind side circles */}
        <circle cx="290" cy="300" r="220" fill="url(#lb-glow-left)" />
        <circle cx="910" cy="300" r="220" fill="url(#lb-glow-right)" />

        {/* Left circle */}
        <circle cx="290" cy="300" r="180" fill="none" stroke="#334155" strokeOpacity="0.55" strokeWidth="1" />
        {/* Right circle */}
        <circle cx="910" cy="300" r="180" fill="none" stroke="#334155" strokeOpacity="0.55" strokeWidth="1" />

        {/* Lemniscate arcs — top and bottom crossing through center */}
        <path d="M 290 120 C 500 120, 700 480, 910 480" fill="none" stroke="#475569" strokeOpacity="0.55" strokeWidth="1.2" markerEnd="url(#lb-arrow)" />
        <path d="M 290 480 C 500 480, 700 120, 910 120" fill="none" stroke="#475569" strokeOpacity="0.55" strokeWidth="1.2" markerEnd="url(#lb-arrow)" />

        {/* Left circle labels */}
        <text x="290" y="220" textAnchor="middle" fill="#E2E8F0" fontSize="22" fontWeight="600">Business</text>
        <text x="290" y="278" textAnchor="middle" fill="#F87171" fontSize="16" fontWeight="500" textDecoration="line-through" style={{ textDecoration: 'line-through' }}>Low Code</text>
        <text x="290" y="316" textAnchor="middle" fill="#F97316" fontSize="20" fontWeight="700">NOCODE</text>
        <text x="290" y="348" textAnchor="middle" fill="#F97316" fontSize="16" fontWeight="600">4 Simple concepts</text>

        {/* Right circle labels */}
        <text x="910" y="220" textAnchor="middle" fill="#E2E8F0" fontSize="22" fontWeight="600">IT Teams</text>
        <text x="910" y="270" textAnchor="middle" fill="#CBD5E1" fontSize="14">Connect various data platforms</text>
        <text x="910" y="298" textAnchor="middle" fill="#CBD5E1" fontSize="14">Closer to the business team</text>
        <text x="910" y="326" textAnchor="middle" fill="#CBD5E1" fontSize="14">day to day</text>

        {/* Under labels: Humans / AI */}
      </svg>

      {/* Center icosahedron overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[220px] h-[220px]">
          <IcosahedronMini />
        </div>
      </div>

      {/* Bottom row: Humans and AI icons */}
      <div className="absolute left-0 right-0 bottom-6 md:bottom-10 flex justify-around max-w-[900px] mx-auto px-16">
        <div className="flex flex-col items-center gap-1 text-slate-200">
          <UserSquare2 size={28} className="text-slate-300" />
          <span className="text-[16px] md:text-[18px] font-semibold">Humans</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-200">
          <Cpu size={28} className="text-slate-300" />
          <span className="text-[16px] md:text-[18px] font-semibold">AI</span>
        </div>
      </div>
    </div>
  </DarkBanner>
);

export default LemniscateBanner;
