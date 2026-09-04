import React, { useState } from 'react';
import { Tag, User, GitBranch, Code2 } from 'lucide-react';
import useInView from '@/hooks/useInView';
import Reveal from '@/components/Reveal';

const lifecycle = ['Draft', 'Proposed', 'Approved', 'Implemented'];
const currentStage = 3;

const LineageNode = ({ label, muted = false }) => (
  <div
    className={`px-3 py-1.5 rounded-lg text-[12px] font-medium ${
      muted
        ? 'bg-white border border-slate-200 text-slate-700'
        : 'bg-slate-950 text-white'
    }`}
  >
    {label}
  </div>
);

const MetricDetail = () => {
  const [showImpl, setShowImpl] = useState(false);
  const [rightRef, rightIn] = useInView({ threshold: 0.15 });
  const [lifeRef, lifeIn] = useInView({ threshold: 0.35 });

  return (
    <section id="metric-detail" className="py-24 md:py-32 bg-slate-50 border-y border-black/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-3xl mb-14">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Metric Detail</p>
          <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
            One page. Everything the business and engineering need to agree on.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main metric card */}
          <div className="lg:col-span-2 p-8 rounded-3xl bg-white border border-black/10">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <div>
                <h3 className="hero-headline text-[36px] text-slate-950">MOIC</h3>
                <p className="text-[14px] text-slate-600 mt-0.5">Multiple on Invested Capital</p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {['Performance', 'Private Equity', 'Executive Reporting'].map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-medium text-slate-700 flex items-center gap-1">
                    <Tag size={10} /> {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-5">
              <div className="text-[11px] uppercase tracking-widest text-slate-500 mb-1.5">Definition</div>
              <p className="text-[14px] text-slate-800">
                Measures the value generated relative to invested capital.
              </p>
            </div>

            {/* Formula builder */}
            <div className="p-4 rounded-xl bg-slate-950 text-white mb-5">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[11px] uppercase tracking-widest text-slate-400">Formula</div>
                <div className="flex items-center gap-1 p-1 rounded-full bg-white/5">
                  <button
                    onClick={() => setShowImpl(false)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                      !showImpl ? 'bg-white text-slate-900' : 'text-slate-300'
                    }`}
                  >
                    Business
                  </button>
                  <button
                    onClick={() => setShowImpl(true)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                      showImpl ? 'bg-white text-slate-900' : 'text-slate-300'
                    }`}
                  >
                    Implementation
                  </button>
                </div>
              </div>
              {!showImpl ? (
                <div className="font-mono text-[15px] leading-relaxed">
                  <span className="text-blue-300">MOIC</span> ={' '}
                  <span className="text-white">Total Value</span>{' '}
                  <span className="text-slate-400">/</span>{' '}
                  <span className="text-white">Invested Capital</span>
                </div>
              ) : (
                <div className="font-mono text-[12px] leading-relaxed text-slate-200">
                  <span className="text-emerald-300">SELECT</span>{' '}
                  <span className="text-blue-300">SUM</span>(total_value) /{' '}
                  <span className="text-blue-300">SUM</span>(invested_capital){' '}
                  <span className="text-emerald-300">AS</span> moic
                  <br />
                  <span className="text-emerald-300">FROM</span> analytics.investments
                  <br />
                  <span className="text-emerald-300">WHERE</span> reporting_period ={' '}
                  <span className="text-amber-300">:period</span>
                </div>
              )}
              <div className="mt-3 text-[11px] text-slate-400">
                {showImpl ? 'Snowflake Semantic View' : 'Platform-independent business logic'}
              </div>
            </div>

            {/* Metadata grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Unit</div>
                <div className="text-[14px] font-semibold text-slate-950">X (multiple)</div>
              </div>
              <div className="p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Time grain</div>
                <div className="text-[14px] font-semibold text-slate-950">Reporting Period</div>
              </div>
              <div className="p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1">
                  <User size={10} /> Business
                </div>
                <div className="text-[13px] font-semibold text-slate-950">Jane Smith</div>
              </div>
              <div className="p-3 rounded-xl border border-slate-200">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1">
                  <Code2 size={10} /> Technical
                </div>
                <div className="text-[13px] font-semibold text-slate-950">John Smith</div>
              </div>
            </div>

            {/* Lifecycle */}
            <div className="mt-6" ref={lifeRef}>
              <div className="text-[11px] uppercase tracking-widest text-slate-500 mb-2">Lifecycle</div>
              <div className="flex items-center gap-1">
                {lifecycle.map((s, i) => (
                  <React.Fragment key={s}>
                    <div
                      className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-500 ${
                        i <= currentStage
                          ? 'bg-[#1E5FEE] text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                      style={{
                        opacity: lifeIn ? 1 : 0,
                        transform: lifeIn ? 'scale(1)' : 'scale(0.9)',
                        transitionDelay: `${i * 160}ms`,
                      }}
                    >
                      {s}
                    </div>
                    {i < lifecycle.length - 1 && <div className="flex-1 h-px bg-slate-200 min-w-[8px]" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Lineage + Value drivers */}
          <div className="flex flex-col gap-6" ref={rightRef}>
            <div className="p-6 rounded-3xl bg-white border border-black/10">
              <div className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-4 flex items-center gap-2">
                <GitBranch size={12} /> Lineage
              </div>
              <div className="flex flex-col gap-2">
                {[
                  <LineageNode key="ic" label="Investment Cost" muted />,
                  <LineageNode key="pv" label="Portfolio Value" muted />,
                  <div key="invcap" className="pl-6 relative">
                    <div className="absolute left-2 top-0 bottom-0 border-l border-slate-300" />
                    <div className="absolute left-2 top-4 w-4 border-t border-slate-300" />
                    <div className="pt-1"><LineageNode label="Invested Capital" muted /></div>
                  </div>,
                  <div key="moic" className="pl-6 relative pt-2">
                    <div className="absolute left-2 top-2 w-4 border-t border-slate-300" />
                    <LineageNode label="MOIC" />
                  </div>,
                ].map((node, i) => (
                  <div
                    key={i}
                    className="transition-all duration-500"
                    style={{
                      opacity: rightIn ? 1 : 0,
                      transform: rightIn ? 'translateY(0)' : 'translateY(10px)',
                      transitionDelay: `${i * 180}ms`,
                    }}
                  >
                    {node}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-3 italic">How this metric is calculated.</p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-black/10">
              <div className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-4">
                Business Value Drivers
              </div>
              <div className="flex flex-col gap-2">
                {['EBITDA Multiple', 'Net Leverage Ratio'].map((d, i) => (
                  <div
                    key={d}
                    className="flex items-center gap-3 transition-all duration-500"
                    style={{
                      opacity: rightIn ? 1 : 0,
                      transform: rightIn ? 'translateX(0)' : 'translateX(-14px)',
                      transitionDelay: `${800 + i * 160}ms`,
                    }}
                  >
                    <div className="px-3 py-1.5 rounded-lg bg-[#7FD1E8]/15 border border-[#7FD1E8]/40 text-[12px] font-medium text-slate-800 flex-1">
                      {d}
                    </div>
                    <div className="text-slate-400">→</div>
                  </div>
                ))}
                <div
                  className="flex items-center gap-3 mt-1 transition-all duration-500"
                  style={{
                    opacity: rightIn ? 1 : 0,
                    transform: rightIn ? 'scale(1)' : 'scale(0.94)',
                    transitionDelay: '1150ms',
                  }}
                >
                  <div className="px-3 py-1.5 rounded-lg bg-slate-950 text-white text-[12px] font-medium flex-1 text-center">
                    MOIC
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3 italic">What the business believes drives value.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricDetail;
