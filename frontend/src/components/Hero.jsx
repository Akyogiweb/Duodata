import React from 'react';
import { ChevronRight, Database, Layers, GitBranch, Sparkles, ShieldCheck, Lock } from 'lucide-react';
import { complianceBadges } from '@/mock';
import { useDemoModal } from '@/context/DemoModalContext';

const ChipTop = ({ text, className = '' }) => (
  <div className={`floating-chip ${className}`}>{text}</div>
);

const EndpointIcon = ({ Icon, label, className = '' }) => (
  <div className={`flex flex-col items-center gap-2 ${className}`}>
    <div className="w-10 h-10 rounded-lg bg-white border border-black/10 shadow-sm flex items-center justify-center">
      <Icon size={18} className="text-slate-800" />
    </div>
    <span className="text-[11px] text-slate-500 font-medium">{label}</span>
  </div>
);

const Hero = () => {
  const demo = useDemoModal();
  return (
    <section className="relative w-full overflow-hidden bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Vertical grid backdrop */}
      <div className="absolute inset-0 vertical-grid pointer-events-none" />

      {/* SVG connectors */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 720"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gradA" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.15" />
          </linearGradient>
          <linearGradient id="gradB" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <path
          className="animated-path"
          d="M 260 130 C 260 300, 380 380, 380 620"
          stroke="url(#gradA)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          className="animated-path"
          d="M 720 130 C 720 300, 620 380, 620 620"
          stroke="url(#gradA)"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          className="animated-path"
          d="M 1200 130 C 1200 320, 1080 460, 1080 620"
          stroke="url(#gradB)"
          strokeWidth="1.4"
          fill="none"
        />
      </svg>

      {/* Floating chips top */}
      <div className="relative max-w-[1440px] mx-auto px-6">
        <div className="hidden md:block absolute left-[15%] top-4">
          <ChipTop text="Governed metric owners" />
        </div>
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0">
          <ChipTop text="Approved definition of Revenue" />
        </div>
        <div className="hidden md:block absolute right-[12%] top-4">
          <ChipTop text="Feed AI agents context" />
        </div>

        {/* Center content */}
        <div className="flex flex-col items-center text-center pt-16 md:pt-24">
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

        {/* Endpoint icons at bottom of curves */}
        <div className="relative mt-20 md:mt-32">
          <div className="hidden md:flex justify-between max-w-[1200px] mx-auto px-8">
            <EndpointIcon Icon={Database} label="Snowflake" />
            <EndpointIcon Icon={Layers} label="dbt / MetricFlow" />
            <EndpointIcon Icon={GitBranch} label="Databricks" />
            <EndpointIcon Icon={Sparkles} label="AI Agents" />
          </div>
        </div>

        {/* Compliance badges */}
        <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4 opacity-80">
          {complianceBadges.map((b, i) => {
            const Icon = i === 0 ? ShieldCheck : i === 1 ? Lock : i === 2 ? ShieldCheck : i === 3 ? Lock : ShieldCheck;
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
