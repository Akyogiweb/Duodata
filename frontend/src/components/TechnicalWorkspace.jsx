import React from 'react';

const Node = ({ title, subtitle, accent }) => (
  <div className={`tech-node ${accent ? 'tech-node-accent' : ''}`}>
    <div className="text-[13px] font-semibold text-slate-950">{title}</div>
    {subtitle && <div className="text-[11px] text-slate-500 mt-0.5">{subtitle}</div>}
  </div>
);

const TechnicalWorkspace = () => (
  <div className="tech-workspace" data-testid="home-technical-workspace">
    <p className="text-[11px] tracking-[0.22em] uppercase text-slate-400 font-medium mb-5 text-center">
      Semantic engineering workspace
    </p>
    <div className="flex flex-col items-center">
      <Node title="MOIC" subtitle="Business definition" accent />
      <div className="tech-stem" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        <div className="flex flex-col items-center">
          <Node title="Formula" subtitle="Total Value / Invested Capital" />
          <div className="tech-stem" />
          <Node title="Lineage" subtitle="Board pack → LP report" />
          <div className="tech-stem" />
          <Node title="Sources" subtitle="Snowflake" />
          <div className="tech-stem" />
          <Node title="Semantic view" subtitle="Platform mapping" />
        </div>
        <div className="flex flex-col items-center">
          <Node title="Value drivers" subtitle="EBITDA multiple · Net leverage" />
          <div className="tech-stem" />
          <Node title="Lifecycle" subtitle="Approved · v3.2" />
          <div className="tech-stem" />
          <Node title="Release" subtitle="Git · YAML" />
        </div>
        <div className="flex flex-col items-center">
          <Node title="Ownership" subtitle="Business + technical owner" />
          <div className="tech-stem" />
          <Node title="Slices" subtitle="Fund · Sector · Vintage" />
          <div className="tech-stem" />
          <Node title="Implement" subtitle="Schema capture → deploy" />
        </div>
      </div>
    </div>
  </div>
);

export default TechnicalWorkspace;
