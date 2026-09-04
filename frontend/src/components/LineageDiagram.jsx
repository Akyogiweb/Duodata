import React, { useEffect, useRef, useState } from 'react';
import { Layers } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import DuodataMark from '@/components/DuodataMark';

const NODES = {
  sources: [
    { id: 'snowflake', label: 'Snowflake', slug: 'snowflake', color: '#29B5E8' },
    { id: 'databricks', label: 'Databricks', slug: 'databricks', color: '#FF3621' },
    { id: 'dbt', label: 'dbt / MetricFlow', slug: 'dbt', color: '#FF694A' },
    { id: 'bigquery', label: 'BigQuery', slug: 'googlebigquery', color: '#4285F4' },
  ],
  metrics: [
    { id: 'revenue', label: 'Revenue', tag: 'Approved' },
    { id: 'nrr', label: 'NRR', tag: 'Implemented' },
    { id: 'margin', label: 'Gross Margin', tag: 'Approved' },
    { id: 'churn', label: 'Churn Rate', tag: 'Proposed' },
  ],
  consumers: [
    { id: 'tableau', label: 'Tableau', slug: 'tableau', color: '#E97627' },
    { id: 'powerbi', label: 'Power BI', slug: 'powerbi', color: '#F2C811' },
    { id: 'agents', label: 'AI Agents', slug: 'openai', color: '#10A37F' },
    { id: 'exec', label: 'Exec Dashboards', slug: 'looker', color: '#4285F4' },
  ],
};

const LogoTile = ({ node, revealed, from }) => (
  <div
    className="lineage-logo-tile"
    title={node.label}
    style={{
      opacity: revealed ? 1 : 0,
      transform: revealed ? 'translateX(0)' : `translateX(${from})`,
    }}
  >
    <BrandMark slug={node.slug} color={node.color} size={32} label={node.label} />
  </div>
);

const LineageDiagram = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const seen = vh - rect.top;
      setProgress(Math.min(1, Math.max(0, seen / total)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const revealSources = progress > 0.1;
  const revealMetrics = progress > 0.25;
  const revealLines1 = progress > 0.3;
  const revealConsumers = progress > 0.4;
  const revealLines2 = progress > 0.45;

  return (
    <section id="lineage" ref={ref} className="lineage-diagram relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">End-to-end lineage</p>
          <h2 className="hero-headline text-[42px] md:text-[64px] text-slate-950">
            From source of record
            <br />
            to every source of truth.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-slate-600 text-[15px] leading-relaxed">
            One governed ontology sits between your data platform and the humans, dashboards, and AI agents that read from it.
          </p>
        </div>

        <div className="relative hidden md:block h-[520px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 520" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7FD1E8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#1E5FEE" stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1E5FEE" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#7FD1E8" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            {NODES.sources.map((_, i) => {
              const y = 60 + i * 120;
              return (
                <path
                  key={`l1-${i}`}
                  d={`M 200 ${y} C 400 ${y}, 400 260, 560 260`}
                  stroke="url(#lg1)"
                  strokeWidth="1.6"
                  fill="none"
                  style={{
                    strokeDasharray: 500,
                    strokeDashoffset: revealLines1 ? 0 : 500,
                    transition: 'stroke-dashoffset 1.2s ease',
                  }}
                />
              );
            })}
            {NODES.consumers.map((_, i) => {
              const y = 60 + i * 120;
              return (
                <path
                  key={`l2-${i}`}
                  d={`M 640 260 C 800 260, 800 ${y}, 1000 ${y}`}
                  stroke="url(#lg2)"
                  strokeWidth="1.6"
                  fill="none"
                  style={{
                    strokeDasharray: 500,
                    strokeDashoffset: revealLines2 ? 0 : 500,
                    transition: 'stroke-dashoffset 1.2s ease',
                  }}
                />
              );
            })}
          </svg>

          <div className="absolute left-0 top-0 w-[88px] flex flex-col gap-6">
            {NODES.sources.map((s) => (
              <LogoTile key={s.id} node={s} revealed={revealSources} from="-24px" />
            ))}
          </div>

          <div
            className="absolute left-1/2 top-1/2 w-[240px] p-5 rounded-2xl lineage-core shadow-2xl transition-all duration-700"
            style={{
              opacity: revealMetrics ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${revealMetrics ? 1 : 0.9})`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <DuodataMark size={18} />
              <span className="text-[11px] tracking-widest uppercase text-slate-400">Duodata Ontology</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {NODES.metrics.map((m, i) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-white/5 border border-white/10 transition-all duration-500"
                  style={{
                    opacity: revealMetrics ? 1 : 0,
                    transform: revealMetrics ? 'translateY(0)' : 'translateY(8px)',
                    transitionDelay: `${200 + i * 100}ms`,
                  }}
                >
                  <span className="text-[13px] font-medium text-white">{m.label}</span>
                  <span
                    className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                      m.tag === 'Implemented'
                        ? 'bg-blue-400/15 text-blue-300'
                        : m.tag === 'Approved'
                        ? 'bg-emerald-400/15 text-emerald-300'
                        : 'bg-cyan-400/15 text-cyan-200'
                    }`}
                  >
                    {m.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute right-0 top-0 w-[88px] flex flex-col gap-6 items-end">
            {NODES.consumers.map((c) => (
              <LogoTile key={c.id} node={c} revealed={revealConsumers} from="24px" />
            ))}
          </div>
        </div>

        <div className="md:hidden flex flex-col items-center gap-4">
          <div className="flex flex-wrap justify-center gap-3">
            {NODES.sources.map((s) => (
              <LogoTile key={s.id} node={s} revealed from="0" />
            ))}
          </div>
          <Layers size={16} className="text-slate-400" />
          <div className="w-full max-w-sm p-4 rounded-2xl lineage-core">
            <p className="text-[11px] tracking-widest uppercase text-slate-400 mb-3">Duodata Ontology</p>
            {NODES.metrics.map((m) => (
              <div key={m.id} className="flex justify-between text-[13px] text-white py-1.5">
                <span>{m.label}</span>
                <span className="text-slate-400">{m.tag}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {NODES.consumers.map((c) => (
              <LogoTile key={c.id} node={c} revealed from="0" />
            ))}
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {['Governed definitions', 'Projected everywhere', 'Same numbers, always'].map((k) => (
            <div key={k} className="text-[13px] font-medium text-slate-700 py-3 border-t border-slate-100">
              {k}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LineageDiagram;
