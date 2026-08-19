import React from 'react';
import { dataConnectors } from '@/mock';

const rows = Array.from({ length: 22 });
const cols = Array.from({ length: 7 });

const placeholder = (i, j) => {
  const words = ['REVENUE', 'CHURN', 'MARGIN', 'PIPELINE', 'MRR', 'ARPU', 'CAC', 'LTV', 'GMV', 'NRR'];
  const owners = ['SANDER V.', 'JEFFREY H.', 'FLORIS J.', 'ARLINDA M.', 'STEPHANIE P.', 'JASON R.'];
  if (j === 0) return words[(i + j) % words.length];
  if (j === 1) return owners[(i + j) % owners.length];
  if (j === 2) return ['finance', 'ops', 'growth', 'product'][(i) % 4];
  if (j === 3) return `v${1 + (i % 5)}.${i % 9}`;
  if (j === 4) return ['Snowflake', 'dbt', 'Databricks', 'BigQuery'][(i + j) % 4];
  if (j === 5) return ['CDO', 'Head of Data', 'BI Lead', 'Analytics Eng.'][(i + j) % 4];
  return `2026-0${1 + (i % 6)}-1${i % 9}`;
};

const DataSourcesSection = () => {
  return (
    <section className="relative py-24 md:py-36 bg-white overflow-hidden">
      {/* Faded table background */}
      <div className="absolute inset-0">
        <table className="w-full text-[10px] md:text-[11px] font-mono text-slate-400/70 border-collapse">
          <tbody>
            {rows.map((_, i) => (
              <tr key={i} className="border-b border-slate-200/60">
                {cols.map((_, j) => (
                  <td key={j} className="px-3 md:px-6 py-2 whitespace-nowrap">
                    {placeholder(i, j)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Radial white overlay to focus on center */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.4) 60%, transparent 100%)',
          }}
        />
      </div>

      {/* Center card */}
      <div className="relative max-w-3xl mx-auto text-center px-6">
        <h2 className="hero-headline text-[42px] md:text-[64px] text-slate-950">
          and key<br />data sources
        </h2>
        <p className="mt-6 max-w-lg mx-auto text-slate-600 text-[15px] leading-relaxed">
          Duodata reads and writes to structured data sources, translating
          business intent into governed metric definitions across your
          warehouse, semantic layer and BI. Access is scoped to user
          permissions, ensuring secure alignment.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {dataConnectors.slice(0, 4).map((c) => (
            <div key={c.name} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
              <span className="text-[12px] font-medium text-slate-800">{c.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-[12px] text-slate-500 font-medium">
            + more
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataSourcesSection;
