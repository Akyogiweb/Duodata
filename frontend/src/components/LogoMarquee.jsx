import React from 'react';
import { dataConnectors } from '@/mock';
import BrandMark from '@/components/BrandMark';

const SLUGS = {
  Snowflake: { slug: 'snowflake', color: '#29B5E8' },
  Databricks: { slug: 'databricks', color: '#FF3621' },
  dbt: { slug: 'dbt', color: '#FF694A' },
  BigQuery: { slug: 'googlebigquery', color: '#4285F4' },
  Tableau: { slug: 'tableau', color: '#E97627' },
  'Power BI': { slug: 'powerbi', color: '#F2C811' },
  Looker: { slug: 'looker', color: '#4285F4' },
  MetricFlow: { slug: 'dbt', color: '#FF694A' },
};

const ConnectorPill = ({ name, color }) => {
  const brand = SLUGS[name];
  return (
    <div className="flex items-center gap-2 px-4 py-2 mx-3 rounded-full border border-slate-200 bg-white shadow-sm whitespace-nowrap">
      {brand ? (
        <BrandMark slug={brand.slug} color={brand.color} size={16} label={name} />
      ) : (
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      )}
      <span className="text-sm font-medium text-slate-800">{name}</span>
    </div>
  );
};

const LogoMarquee = () => {
  const list = [...dataConnectors, ...dataConnectors];

  return (
    <section className="py-14 border-y border-black/5 overflow-hidden" data-testid="home-logo-marquee">
      <p className="text-center text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-8">
        Projects into the modern data stack
      </p>
      <div className="marquee">
        {list.map((c, i) => (
          <ConnectorPill key={`${c.name}-${i}`} name={c.name} color={c.color} />
        ))}
      </div>
    </section>
  );
};

export default LogoMarquee;
