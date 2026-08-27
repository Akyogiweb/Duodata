import React from 'react';
import DarkBanner from './DarkBanner';

/**
 * "Every decision has Four components" — atomic-orbit visualization.
 * Center: Decision. Four elliptical orbits, each with a colored sphere:
 * Metrics (violet), Slice (blue), Reports (green), Source (blue).
 */

const orbit = (rx, ry, rotate) => ({
  transform: `rotate(${rotate})`,
  d: `M ${600 - rx} 300 A ${rx} ${ry} 0 1 0 ${600 + rx} 300 A ${rx} ${ry} 0 1 0 ${600 - rx} 300`,
});

const Sphere = ({ cx, cy, r = 22, color, label, sub }) => (
  <g>
    <defs>
      <radialGradient id={`grad-${label}`} cx="35%" cy="35%">
        <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
        <stop offset="35%" stopColor={color} stopOpacity="0.95" />
        <stop offset="100%" stopColor={color} stopOpacity="0.5" />
      </radialGradient>
    </defs>
    <circle cx={cx} cy={cy} r={r + 4} fill={color} fillOpacity="0.2" />
    <circle cx={cx} cy={cy} r={r} fill={`url(#grad-${label})`} stroke={color} strokeOpacity="0.6" />
    <text x={cx + r + 10} y={cy + 2} fill="#E2E8F0" fontSize="16" fontWeight="600">{label}</text>
    {sub && <text x={cx + r + 10} y={cy + 20} fill="#94A3B8" fontSize="10.5">{sub}</text>}
  </g>
);

const AtomicOntologyBanner = () => (
  <DarkBanner
    eyebrow="The Metric Ontology"
    title={<>Every decision has <span style={{ color: '#1E5FEE' }}>Four</span> components.</>}
    subtitle={<><span className="text-slate-500">Decision =</span>{' '}<span className="text-slate-900 font-medium">Metrics, Slice, Reports, Source.</span></>}
  >
    <div className="relative aspect-[16/8.5] w-full">
      <svg viewBox="0 0 1200 620" className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id="center-glow" cx="50%" cy="50%">
            <stop offset="0%" stopColor="#1E5FEE" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1E5FEE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient center glow */}
        <circle cx="600" cy="310" r="260" fill="url(#center-glow)" />

        {/* Four orbits (ellipses at different rotations) */}
        <g transform="translate(600 310)">
          <ellipse rx="380" ry="140" fill="none" stroke="#475569" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(0)" />
          <ellipse rx="380" ry="140" fill="none" stroke="#475569" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(45)" />
          <ellipse rx="380" ry="140" fill="none" stroke="#475569" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(90)" />
          <ellipse rx="380" ry="140" fill="none" stroke="#475569" strokeOpacity="0.5" strokeWidth="1.2" transform="rotate(135)" />
        </g>

        {/* Center Decision */}
        <circle cx="600" cy="310" r="20" fill="#22C55E" fillOpacity="0.9" />
        <text x="630" y="315" fill="#F8FAFC" fontSize="26" fontWeight="600">Decision</text>

        {/* Four labeled spheres positioned around the diagram */}
        <Sphere cx="330" cy="200" color="#A78BFA" label="Metrics" sub="What we measure" />
        <Sphere cx="900" cy="200" color="#22C55E" label="Reports" sub="Grouped use cases" />
        <Sphere cx="280" cy="440" color="#60A5FA" label="Slice" sub="Business lenses" />
        <Sphere cx="920" cy="440" color="#38BDF8" label="Source" sub="Where it lives" />
      </svg>

      {/* Bottom label pill */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-white/10">
        <span className="text-[11px] uppercase tracking-widest text-slate-400 font-medium">The AI Mesh Architecture:</span>
        <span className="text-[13px] font-semibold text-white">
          The <span style={{ color: '#60A5FA' }}>Metric</span> Ontology
        </span>
      </div>
    </div>
  </DarkBanner>
);

export default AtomicOntologyBanner;
