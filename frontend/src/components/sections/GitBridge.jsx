import React from 'react';
import { GitBranch, FileCode2, ArrowRight } from 'lucide-react';

const yaml = `metric:
  id: moic
  name: MOIC
  description: Multiple on Invested Capital
  owner:
    business: jane.smith@acme.com
    technical: john.smith@acme.com
  unit: X
  formula: total_value / invested_capital
  slices:
    - fund
    - portfolio
    - vintage
  lifecycle: implemented
  version: 1.1
  source: snowflake.analytics.investments`;

const GitBridge = () => (
  <section id="git" className="py-24 md:py-32 bg-slate-950 text-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[11px] tracking-[0.28em] uppercase text-blue-300 font-medium mb-3">Git · The bridge to engineering</p>
          <h2 className="hero-headline text-[40px] md:text-[56px] leading-[0.98]">
            Business semantics<br />
            <span className="text-blue-300">become code.</span>
          </h2>
          <p className="mt-6 text-slate-300 text-[15px] leading-relaxed">
            Every ontology definition can be represented as YAML or JSON, versioned in Git, reviewed,
            released and propagated into your technical environment.
          </p>
          <ul className="mt-6 space-y-2 text-[14px] text-slate-300">
            {[
              'Version control every metric definition',
              'Peer-reviewed changes via pull request',
              'CI/CD deployment into semantic layers',
              'Full audit trail and reproducibility',
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-white/5 bg-black/40">
              <FileCode2 size={14} className="text-slate-400" />
              <span className="text-[12px] text-slate-400">metrics/moic.yaml</span>
              <span className="ml-auto text-[10px] text-slate-500 flex items-center gap-1">
                <GitBranch size={10} /> main
              </span>
            </div>
            <pre className="p-4 text-[12px] leading-relaxed font-mono text-slate-200 overflow-auto">
{yaml}
            </pre>
          </div>

          {/* Flow */}
          <div className="mt-6 flex items-center justify-between text-[11px] text-slate-400">
            {['Duo Data', 'YAML / JSON', 'Git Repo', 'Platform Agent', 'Semantic Layer'].map((s, i, arr) => (
              <React.Fragment key={s}>
                <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white">{s}</span>
                {i < arr.length - 1 && <ArrowRight size={12} className="text-slate-500" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default GitBridge;
