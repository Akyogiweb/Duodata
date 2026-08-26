import React from 'react';

const steps = [
  { name: 'Define', color: '#1E5FEE' },
  { name: 'Govern', color: '#7C3AED' },
  { name: 'Version', color: '#0EA5E9' },
  { name: 'Deploy', color: '#10B981' },
  { name: 'Use', color: '#F59E0B' },
  { name: 'Learn', color: '#EF4444' },
  { name: 'Change', color: '#EC4899' },
];

const SemanticLayerLoop = () => {
  const R = 160;
  const CX = 200;
  const CY = 200;

  return (
    <section id="semantic-layer" className="py-24 md:py-32 bg-slate-50 border-y border-black/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Semantic Layer</p>
            <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
              Don’t deploy a semantic layer once.<br />
              <span style={{ color: '#1E5FEE' }}>Govern it for the life of the business.</span>
            </h2>
            <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
              Most organizations treat semantic definitions as configuration. Duo Data treats them as
              living enterprise assets — defined, governed, versioned, deployed, used, learned from and changed.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Living asset', 'Continuous governance', 'Full audit trail'].map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[12px] font-medium text-slate-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <svg width="420" height="420" viewBox="0 0 400 400">
              {/* Outer ring */}
              <circle cx={CX} cy={CY} r={R} fill="none" stroke="#e2e8f0" strokeWidth={2} strokeDasharray="4 6" />
              {/* Center */}
              <circle cx={CX} cy={CY} r={40} fill="#0a0a0a" />
              <text x={CX} y={CY - 2} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="600">Duo</text>
              <text x={CX} y={CY + 12} textAnchor="middle" fill="#94a3b8" fontSize="9">Data</text>

              {steps.map((s, i) => {
                const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2;
                const x = CX + R * Math.cos(angle);
                const y = CY + R * Math.sin(angle);
                return (
                  <g key={s.name}>
                    <circle cx={x} cy={y} r={22} fill="#fff" stroke={s.color} strokeWidth={2} />
                    <text x={x} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill={s.color}>
                      {s.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SemanticLayerLoop;
