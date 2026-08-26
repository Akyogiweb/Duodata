import React from 'react';
import { ArrowLeftRight, Database, Layers } from 'lucide-react';

const platforms = [
  {
    name: 'Snowflake',
    tagline: 'Semantic Views',
    color: '#29B5E8',
    steps: ['Duo Data', 'Git', 'Duo Data Snowflake Agent', 'Snowflake Semantic View'],
    Icon: Database,
  },
  {
    name: 'Databricks',
    tagline: 'Metric Views · Unity Catalog',
    color: '#FF3621',
    steps: ['Databricks Catalog', 'Duo Data Agent', 'Duo Data Ontology', 'Metric View → Unity Catalog'],
    Icon: Layers,
  },
];

const PlatformIntegration = () => (
  <section id="platforms" className="py-24 md:py-32 bg-white border-y border-black/5">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Platform Integrations</p>
        <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
          Meet your data where it lives.
        </h2>
        <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
          Duo Data is platform-aware without being platform-dependent. Governed semantics travel bidirectionally between
          Duo Data and the technical platforms where data is actually implemented.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {platforms.map((p) => (
          <div key={p.name} className="p-8 rounded-3xl border border-black/10 bg-white">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${p.color}18` }}
              >
                <p.Icon size={18} style={{ color: p.color }} />
              </div>
              <div>
                <div className="text-[20px] font-semibold text-slate-950">{p.name}</div>
                <div className="text-[12px] text-slate-500">{p.tagline}</div>
              </div>
            </div>

            {/* Bidirectional flow */}
            <div className="flex flex-col gap-2">
              {p.steps.map((s, i) => (
                <React.Fragment key={s}>
                  <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[13px] font-medium text-slate-800">
                    {s}
                  </div>
                  {i < p.steps.length - 1 && (
                    <div className="pl-4 text-slate-400">
                      <ArrowLeftRight size={14} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2">
              <div className="p-3 rounded-lg bg-slate-950 text-white">
                <div className="text-[10px] uppercase tracking-widest text-slate-400">Capture</div>
                <div className="text-[12px] mt-1">Platform → Duo Data / Git</div>
              </div>
              <div className="p-3 rounded-lg" style={{ background: `${p.color}12`, color: p.color }}>
                <div className="text-[10px] uppercase tracking-widest">Deploy</div>
                <div className="text-[12px] mt-1 text-slate-800">Duo Data / Git → Platform</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-[13px] text-slate-500 mt-8">
        Extensible to additional platforms and representations.
      </p>
    </div>
  </section>
);

export default PlatformIntegration;
