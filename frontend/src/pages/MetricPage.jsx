import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, GitBranch, User, Code2, Tag, Layers } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SingleKPIHero from '@/components/SingleKPIHero';
import { getMetricBySlug, metricPages } from '@/data/metricPages';

const InfoCard = ({ eyebrow, children, className = '' }) => (
  <div className={`p-6 rounded-3xl border border-black/10 bg-white ${className}`}>
    <div className="text-[11px] uppercase tracking-widest text-slate-500 font-medium mb-3">
      {eyebrow}
    </div>
    {children}
  </div>
);

const MetricPage = () => {
  const { slug } = useParams();
  const metric = getMetricBySlug(slug);
  const [showImpl, setShowImpl] = useState(false);

  if (!metric) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-white">
      <Nav />

      {/* Single-KPI hero with scrolling table backdrop */}
      <SingleKPIHero
        eyebrow="Metric Card"
        title={<>{metric.name}</>}
        subtitle={
          <>
            {metric.fullName} — <span className="text-slate-900 font-medium">v{metric.version}</span>,
            governed and implemented across your data platforms.
          </>
        }
        chips={metric.tags.map((t) => ({ label: t }))}
        secondaryLabel="View the ontology"
        onSecondary={() => window.location.assign('/#ontology')}
      />

      {/* Back link */}
      <div className="relative max-w-[1100px] mx-auto px-6 -mt-6 mb-4">
        <Link to="/#ontology" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={14} /> Back to the ontology
        </Link>
      </div>

      {/* Definition + Formula */}
      <section className="py-16">
        <div className="max-w-[1100px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <InfoCard eyebrow="Business Definition">
              <p className="text-[16px] text-slate-900 leading-relaxed">{metric.definition}</p>
            </InfoCard>

            {/* Formula w/ business/impl toggle */}
            <div className="p-6 rounded-3xl bg-slate-950 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="text-[11px] uppercase tracking-widest text-slate-400">Formula</div>
                <div className="flex items-center gap-1 p-1 rounded-full bg-white/5">
                  <button
                    onClick={() => setShowImpl(false)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${!showImpl ? 'bg-white text-slate-900' : 'text-slate-300'}`}
                  >
                    Business
                  </button>
                  <button
                    onClick={() => setShowImpl(true)}
                    className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${showImpl ? 'bg-white text-slate-900' : 'text-slate-300'}`}
                  >
                    Implementation
                  </button>
                </div>
              </div>
              <div className="font-mono text-[15px] leading-relaxed text-blue-100">
                {showImpl ? metric.formulaImpl : metric.formulaBusiness}
              </div>
              <div className="mt-3 text-[11px] text-slate-400">
                {showImpl ? 'Snowflake Semantic View' : 'Platform-independent business logic'}
              </div>
            </div>

            {/* Lineage + Value Drivers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard eyebrow={<span className="flex items-center gap-1.5"><GitBranch size={11} /> Lineage</span>}>
                <div className="flex flex-col gap-2">
                  {metric.lineage.map((n, i, arr) => (
                    <div
                      key={n}
                      className={`px-3 py-1.5 rounded-lg text-[12px] font-medium ${
                        i === arr.length - 1
                          ? 'bg-slate-950 text-white'
                          : 'bg-white border border-slate-200 text-slate-700'
                      }`}
                    >
                      {n}
                    </div>
                  ))}
                </div>
              </InfoCard>

              <InfoCard eyebrow="Business Value Drivers">
                <div className="flex flex-col gap-2">
                  {metric.valueDrivers.map((d) => (
                    <div key={d} className="px-3 py-1.5 rounded-lg bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 text-[12px] font-medium text-slate-800">
                      {d}
                    </div>
                  ))}
                  <div className="mt-1 px-3 py-1.5 rounded-lg bg-slate-950 text-white text-[12px] font-medium text-center">
                    {metric.name}
                  </div>
                </div>
              </InfoCard>
            </div>
          </div>

          {/* Right column: metadata */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl border border-black/10 bg-white">
              <div className="grid grid-cols-2 gap-3 text-[13px]">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Unit</div>
                  <div className="font-semibold text-slate-950">{metric.unit}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Time grain</div>
                  <div className="font-semibold text-slate-950">{metric.grain}</div>
                </div>
                <div className="col-span-2 pt-3 border-t border-slate-100">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1"><User size={10} /> Business owner</div>
                  <div className="font-semibold text-slate-950">{metric.ownerBusiness}</div>
                </div>
                <div className="col-span-2 pt-3 border-t border-slate-100">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1"><Code2 size={10} /> Technical owner</div>
                  <div className="font-semibold text-slate-950">{metric.ownerTechnical}</div>
                </div>
                <div className="col-span-2 pt-3 border-t border-slate-100">
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Lifecycle</div>
                  <div className="inline-block px-2 py-0.5 rounded-full bg-[#1E5FEE] text-white text-[11px] font-semibold">
                    {metric.lifecycle} · v{metric.version}
                  </div>
                </div>
              </div>
            </div>

            <InfoCard eyebrow={<span className="flex items-center gap-1.5"><Tag size={11} /> Slices</span>}>
              <div className="flex flex-wrap gap-1.5">
                {metric.slices.map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-slate-100 text-[12px] font-medium text-slate-800">{s}</span>
                ))}
              </div>
            </InfoCard>

            <InfoCard eyebrow={<span className="flex items-center gap-1.5"><Layers size={11} /> Platform implementations</span>}>
              <div className="flex flex-col gap-2">
                {metric.platforms.map((p) => (
                  <div key={p} className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-[12px] font-medium text-slate-800">
                    {p}
                  </div>
                ))}
              </div>
            </InfoCard>

            <InfoCard eyebrow="Used in reports">
              <ul className="space-y-1.5">
                {metric.reports.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-[13px] text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E5FEE]" />
                    {r}
                  </li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </div>
      </section>

      {/* Other metrics */}
      <section className="py-16 bg-slate-50 border-t border-black/5">
        <div className="max-w-[1100px] mx-auto px-6">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">More governed metrics</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metricPages.filter((m) => m.slug !== metric.slug).map((m) => (
              <Link
                key={m.slug}
                to={`/metrics/${m.slug}`}
                className="p-6 rounded-2xl bg-white border border-black/10 hover:border-slate-900 transition-colors group"
              >
                <div className="text-[11px] uppercase tracking-widest text-slate-500 mb-2">{m.tags[0]}</div>
                <div className="hero-headline text-[28px] text-slate-950">{m.name}</div>
                <div className="text-[12px] text-slate-500 mt-1">{m.fullName}</div>
                <div className="mt-4 text-[12px] font-medium text-slate-900 group-hover:text-[#1E5FEE]">
                  See the metric card →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MetricPage;
