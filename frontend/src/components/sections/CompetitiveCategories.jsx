import React from 'react';

const rows = [
  {
    category: 'Data Catalog',
    question: 'What data do we have?',
    example: 'Alation, Collibra',
    color: 'slate',
  },
  {
    category: 'BI Semantic Layer',
    question: 'How should this BI tool query the data?',
    example: 'Looker, Cube',
    color: 'slate',
  },
  {
    category: 'Metrics Store',
    question: 'What are our metrics?',
    example: 'dbt / MetricFlow',
    color: 'slate',
  },
  {
    category: 'Data Warehouse',
    question: 'Where is the data stored?',
    example: 'Snowflake, Databricks',
    color: 'slate',
  },
  {
    category: 'Duo Data',
    question:
      'What does this business concept mean, how is it calculated, governed, where is it implemented — and how does that meaning stay consistent across platforms?',
    example: 'Semantic control layer',
    color: 'blue',
    highlight: true,
  },
];

const CompetitiveCategories = () => (
  <section id="category" className="py-24 md:py-32 bg-white">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="max-w-3xl mb-14">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Category</p>
        <h2 className="hero-headline text-[40px] md:text-[56px] text-slate-950 leading-[0.98]">
          Not a catalog. Not a BI tool. Not a metrics store.
        </h2>
        <p className="mt-6 text-slate-600 text-[15px] leading-relaxed">
          Each data category answers a different question. Duo Data answers the one no other layer does —
          how meaning stays consistent as it travels across the entire stack.
        </p>
      </div>

      <div className="rounded-3xl border border-black/10 overflow-hidden">
        <div className="grid grid-cols-12 px-6 py-3 bg-slate-50 border-b border-black/5 text-[11px] uppercase tracking-widest text-slate-500 font-medium">
          <div className="col-span-3">Category</div>
          <div className="col-span-7">Answers</div>
          <div className="col-span-2 text-right">Example</div>
        </div>
        {rows.map((r) => (
          <div
            key={r.category}
            className={`grid grid-cols-12 px-6 py-5 items-center border-b border-black/5 last:border-b-0 ${
              r.highlight ? 'bg-slate-950 text-white' : 'bg-white'
            }`}
          >
            <div
              className={`col-span-3 font-semibold text-[15px] ${
                r.highlight ? 'text-white' : 'text-slate-950'
              }`}
            >
              {r.category}
            </div>
            <div
              className={`col-span-7 text-[13px] leading-relaxed ${
                r.highlight ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              “{r.question}”
            </div>
            <div
              className={`col-span-2 text-right text-[12px] ${
                r.highlight ? 'text-blue-300' : 'text-slate-500'
              }`}
            >
              {r.example}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-[13px] text-slate-500 max-w-2xl">
        Snowflake, Databricks, dbt, Power BI, Tableau are ecosystem partners — not competitors.
        Duo Data sits above and across them.
      </p>
    </div>
  </section>
);

export default CompetitiveCategories;
