import React, { useEffect, useRef, useState } from 'react';
import { Database, GitBranch, Layers, Sparkles, BarChart3, Users } from 'lucide-react';

// Scroll-triggered lineage diagram: Sources -> Ontology -> BI / AI
const NODES = {
  sources: [
    { id: 'snowflake', label: 'Snowflake', icon: Database, color: '#29B5E8' },
    { id: 'databricks', label: 'Databricks', icon: Database, color: '#FF3621' },
    { id: 'dbt', label: 'dbt / MetricFlow', icon: GitBranch, color: '#FF694A' },
    { id: 'bigquery', label: 'BigQuery', icon: Database, color: '#4285F4' },
  ],
  metrics: [
    { id: 'revenue', label: 'Revenue', tag: 'Approved' },
    { id: 'nrr', label: 'NRR', tag: 'Implemented' },
    { id: 'margin', label: 'Gross Margin', tag: 'Approved' },
    { id: 'churn', label: 'Churn Rate', tag: 'Proposed' },
  ],
  consumers: [
    { id: 'tableau', label: 'Tableau', icon: BarChart3, color: '#E97627' },
    { id: 'powerbi', label: 'Power BI', icon: BarChart3, color: '#F2C811' },
    { id: 'agents', label: 'AI Agents', icon: Sparkles, color: '#7C3AED' },
    { id: 'exec', label: 'Exec Dashboards', icon: Users, color: '#0ea5e9' },
  ],
};

const LineageDiagram = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress from when top enters viewport to when bottom exits
      const total = rect.height + vh;
      const seen = vh - rect.top;
      const p = Math.min(1, Math.max(0, seen / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Reveal thresholds
  const revealSources = progress > 0.1;
  const revealMetrics = progress > 0.25;
  const revealLines1 = progress > 0.3;
  const revealConsumers = progress > 0.4;
  const revealLines2 = progress > 0.45;

  return (
    <section id="lineage" ref={ref} className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">End-to-end lineage</p>
          <h2 className="hero-headline text-[42px] md:text-[64px] text-slate-950">
            From source of record<br />to every source of truth.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-slate-600 text-[15px] leading-relaxed">
            One governed ontology sits between your data platform and the humans, dashboards and AI agents that read from it.
          </p>
        </div>

        {/* Diagram */}
        <div className="relative h-[560px] md:h-[520px]">
          {/* SVG lines */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 520" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.15" />
              </linearGradient>
              <linearGradient id="lg2" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            {/* Left connections: sources -> ontology */}
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
            {/* Right connections: ontology -> consumers */}
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

          {/* Sources column */}
          <div className="absolute left-0 top-0 w-[200px] flex flex-col gap-4">
            {NODES.sources.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500"
                  style={{
                    opacity: revealSources ? 1 : 0,
                    transform: revealSources ? 'translateX(0)' : 'translateX(-30px)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${s.color}20` }}>
                    <Icon size={14} style={{ color: s.color }} />
                  </div>
                  <div className="text-[13px] font-medium text-slate-800">{s.label}</div>
                </div>
              );
            })}
          </div>

          {/* Ontology center card */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] p-5 rounded-2xl bg-slate-900 text-white shadow-2xl transition-all duration-700"
            style={{
              opacity: revealMetrics ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${revealMetrics ? 1 : 0.9})`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Layers size={14} className="text-blue-300" />
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
                        : 'bg-violet-400/15 text-violet-300'
                    }`}
                  >
                    {m.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Consumers column */}
          <div className="absolute right-0 top-0 w-[200px] flex flex-col gap-4">
            {NODES.consumers.map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.id}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-500"
                  style={{
                    opacity: revealConsumers ? 1 : 0,
                    transform: revealConsumers ? 'translateX(0)' : 'translateX(30px)',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${c.color}20` }}>
                    <Icon size={14} style={{ color: c.color }} />
                  </div>
                  <div className="text-[13px] font-medium text-slate-800">{c.label}</div>
                </div>
              );
            })}
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
