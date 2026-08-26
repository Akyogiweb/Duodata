import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useDemoModal } from '@/context/DemoModalContext';

/**
 * SingleKPIHero — the "Duodata Single KPI" hero pattern.
 * A scrolling table of governed metric rows sits behind a big centered card
 * that announces the metric / page subject. Reusable across single-metric
 * pages, product-demo pages and industry hero blocks.
 *
 * Props:
 *  - eyebrow: short label above the headline
 *  - title:   big headline (string or JSX)
 *  - subtitle: subhead paragraph
 *  - chips:   list of { label, color? } shown under subtitle
 *  - ctaLabel / onCta: primary CTA (defaults to "Book a demo")
 *  - rows:    optional custom table rows [ [c0,c1,c2,...], ... ]
 */

const DEFAULT_METRICS = ['MOIC', 'EBITDA', 'IRR', 'ARR', 'NRR', 'CAC', 'LTV', 'CHURN', 'PIPELINE', 'REVENUE', 'MARGIN', 'GMV'];
const OWNERS = ['SANDER V.', 'JEFFREY H.', 'FLORIS J.', 'ARLINDA M.', 'STEPHANIE P.', 'JASON R.', 'JANE S.', 'JOHN S.'];
const DOMAINS = ['finance', 'ops', 'growth', 'product', 'risk', 'analytics'];
const PLATFORMS = ['Snowflake', 'dbt', 'Databricks', 'BigQuery'];
const OWNERSHIP = ['CDO', 'Head of Data', 'BI Lead', 'Analytics Eng.', 'CFO', 'Actuarial'];

const defaultCell = (i, j) => {
  if (j === 0) return DEFAULT_METRICS[(i + j) % DEFAULT_METRICS.length];
  if (j === 1) return OWNERS[(i + j) % OWNERS.length];
  if (j === 2) return DOMAINS[i % DOMAINS.length];
  if (j === 3) return `v${1 + (i % 5)}.${i % 9}`;
  if (j === 4) return PLATFORMS[(i + j) % PLATFORMS.length];
  if (j === 5) return OWNERSHIP[(i + j) % OWNERSHIP.length];
  return `2026-0${1 + (i % 6)}-1${i % 9}`;
};

const cols = Array.from({ length: 7 });

const TableBlock = ({ offset = 0, cellFn = defaultCell }) => (
  <table
    className="w-full text-[10px] md:text-[11px] font-mono text-slate-400/70 border-collapse"
    aria-hidden
  >
    <tbody>
      {Array.from({ length: 22 }).map((_, i) => (
        <tr key={i} className="border-b border-slate-200/60">
          {cols.map((_, j) => (
            <td key={j} className="px-3 md:px-6 py-2 whitespace-nowrap">
              {cellFn(i + offset, j)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const SingleKPIHero = ({
  eyebrow,
  title,
  subtitle,
  chips = [],
  ctaLabel = 'Book a demo',
  secondaryLabel,
  onSecondary,
  cellFn,
  className = '',
}) => {
  const demo = useDemoModal();
  return (
    <section className={`relative pt-32 md:pt-40 pb-20 md:pb-28 bg-white overflow-hidden ${className}`}>
      {/* Scrolling table backdrop */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="ds-table-marquee">
          <TableBlock offset={0} cellFn={cellFn} />
          <TableBlock offset={22} cellFn={cellFn} />
        </div>

        {/* Radial white overlay to focus on center */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0.45) 60%, rgba(255,255,255,0.15) 100%)',
          }}
        />
      </div>

      {/* Centered card */}
      <div className="relative max-w-3xl mx-auto text-center px-6">
        {eyebrow && (
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-4">
            {eyebrow}
          </p>
        )}
        <h1 className="hero-headline text-[48px] md:text-[84px] text-slate-950 leading-[0.95]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-xl mx-auto text-slate-600 text-[15px] md:text-[16px] leading-relaxed">
            {subtitle}
          </p>
        )}

        {chips.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {chips.map((c) => (
              <div
                key={c.label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm"
              >
                {c.color && (
                  <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                )}
                <span className="text-[12px] font-medium text-slate-800">{c.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <button onClick={demo.open} className="pill-btn-dark">
            {ctaLabel} <ArrowRight size={16} />
          </button>
          {secondaryLabel && (
            <button
              onClick={onSecondary}
              className="px-5 py-2.5 rounded-full bg-white border border-slate-300 text-[14px] font-medium text-slate-900 hover:bg-slate-50 transition-colors"
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleKPIHero;
