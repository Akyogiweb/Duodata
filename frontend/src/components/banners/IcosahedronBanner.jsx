import React from 'react';
import DarkBanner from './DarkBanner';

/**
 * "The Metric Ontology" — icosahedron surrounded by a field of "Decision" circles.
 * A hero-scale visual anchor. The tiled Decision circles fade toward the edges
 * with a vignette so the central ontology cluster stays the focal point.
 */

// Icosahedron approximation
const vertices = [
  { x: 0, y: -70 },
  { x: 62, y: -30 },
  { x: 40, y: 48 },
  { x: -40, y: 48 },
  { x: -62, y: -30 },
  { x: 0, y: 0 },
  { x: 34, y: -12 },
  { x: 22, y: 30 },
  { x: -22, y: 30 },
  { x: -34, y: -12 },
  { x: 0, y: -32 },
  { x: 0, y: 32 },
];
const edges = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 0],
  [0, 10], [1, 6], [2, 7], [3, 8], [4, 9],
  [6, 7], [7, 8], [8, 9], [9, 6], [6, 10], [7, 11], [8, 11], [9, 10],
  [5, 6], [5, 7], [5, 8], [5, 9], [5, 10], [5, 11],
  [10, 11], [0, 5],
];
const nodeColors = ['#A78BFA', '#60A5FA', '#C4B5FD', '#93C5FD', '#7DD3FC', '#DDD6FE', '#A5B4FC', '#818CF8'];

const IcosahedronCore = () => (
  <svg viewBox="-100 -100 200 200" className="w-full h-full">
    {edges.map(([a, b], i) => (
      <line
        key={i}
        x1={vertices[a].x}
        y1={vertices[a].y}
        x2={vertices[b].x}
        y2={vertices[b].y}
        stroke="#93A5C4"
        strokeOpacity="0.45"
        strokeWidth="0.7"
      />
    ))}
    {vertices.map((v, i) => (
      <circle
        key={i}
        cx={v.x}
        cy={v.y}
        r={i === 5 ? 4.5 : 3.4}
        fill={nodeColors[i % nodeColors.length]}
      />
    ))}
    <text x="0" y="2" textAnchor="middle" fill="#60A5FA" fontSize="14" fontWeight="700">Metric</text>
    <text x="0" y="16" textAnchor="middle" fill="#94A3B8" fontSize="9" fontWeight="500">Ontology</text>
  </svg>
);

// Grid of decision circles that fill the background
const DecisionField = () => {
  const cols = 12;
  const rows = 6;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      cells.push({ r, c, key: `${r}-${c}` });
    }
  }
  return (
    <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 grid-rows-6 gap-2 md:gap-4 p-6 md:p-10 pointer-events-none">
      {cells.map(({ r, c, key }) => {
        // Distance from center to fade opacity — the closer to center, the more faded (to make room for icosahedron)
        const dx = c - (cols - 1) / 2;
        const dy = r - (rows - 1) / 2;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = Math.sqrt(((cols - 1) / 2) ** 2 + ((rows - 1) / 2) ** 2);
        // Hide the 6 center cells to leave space
        const isCenter = Math.abs(dx) < 2 && Math.abs(dy) < 1.5;
        if (isCenter) return <div key={key} />;
        // Fade based on outer distance too
        const opacity = 0.15 + 0.55 * (1 - dist / maxDist);
        return (
          <div key={key} className="flex items-center justify-center">
            <div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border flex items-center justify-center"
              style={{
                borderColor: 'rgba(148, 163, 184, 0.35)',
                opacity: opacity.toFixed(2),
              }}
            >
              <span className="text-[9px] md:text-[10px] font-medium text-slate-400">Decision</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const IcosahedronBanner = () => (
  <DarkBanner
    eyebrow="The Metric Ontology"
    title={<>The <span style={{ color: '#1E5FEE' }}>Metric</span> Ontology.</>}
    subtitle="Powering real-time decisions amidst constantly changing internal and external conditions."
  >
    <div className="relative aspect-[16/8] w-full">
      {/* Field of decisions */}
      <DecisionField />

      {/* Vignette darkens the outer edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(closest-side at 50% 50%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Central icosahedron */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
          <IcosahedronCore />
        </div>
      </div>
    </div>
  </DarkBanner>
);

export default IcosahedronBanner;
