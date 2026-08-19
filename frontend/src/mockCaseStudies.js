// Case studies mock data
export const caseStudies = [
  {
    slug: 'meridian-capital',
    company: 'Meridian Capital Partners',
    industry: 'Private Equity',
    logoColor: '#0ea5e9',
    headline: 'From metric fights to one governed portfolio view.',
    stats: [
      { label: 'Metric definitions unified', value: '340+' },
      { label: 'Reporting cycle time', value: '−48%' },
      { label: 'LP dashboards aligned', value: '12' },
    ],
    excerpt:
      'Meridian’s deal, portfolio and LP reporting teams each defined revenue and MOIC slightly differently. Duodata’s ontology gave them one governed source of truth projected into Snowflake and Tableau.',
    quote: 'We stopped arguing about numbers in exec meetings within the first month.',
    quoteAuthor: 'Chief Data Officer, Meridian Capital',
    tags: ['PE', 'ILPA', 'Snowflake', 'Tableau'],
  },
  {
    slug: 'northline-industrials',
    company: 'Northline Industrials',
    industry: 'Fortune 500 Manufacturing',
    logoColor: '#7c3aed',
    headline: 'AI copilots that finally quote the right revenue number.',
    stats: [
      { label: 'Copilot answer accuracy', value: '94%' },
      { label: 'Business glossary coverage', value: '100%' },
      { label: 'Time to onboard new agent', value: '−72%' },
    ],
    excerpt:
      'Northline’s AI agents were pulling wrong numbers from BI schemas. Duodata’s governed ontology now feeds every copilot the exact metric definition, owner and lineage.',
    quote: 'Our copilots ground every answer in Duodata. The board finally trusts AI outputs.',
    quoteAuthor: 'VP Analytics Engineering, Northline',
    tags: ['Enterprise', 'AI Context', 'Databricks', 'MetricFlow'],
  },
  {
    slug: 'harbor-growth',
    company: 'Harbor Growth Equity',
    industry: 'Growth Equity',
    logoColor: '#10b981',
    headline: 'A conceptual metric layer above the semantic layer.',
    stats: [
      { label: 'Metrics governed', value: '210' },
      { label: 'Business owners onboarded', value: '38' },
      { label: 'Downstream systems fed', value: '9' },
    ],
    excerpt:
      'Harbor already had dbt MetricFlow and Snowflake Semantic Views. Duodata sat above both, letting the business own definitions while engineering handled projection.',
    quote: 'Duodata is the piece we’d been trying to build in Notion for two years.',
    quoteAuthor: 'Head of Data Platform, Harbor Growth',
    tags: ['Growth Equity', 'Semantic Layer', 'dbt', 'Snowflake'],
  },
  {
    slug: 'aureus-fintech',
    company: 'Aureus Fintech',
    industry: 'Financial Services SaaS',
    logoColor: '#f59e0b',
    headline: 'Regulator-ready metric governance in 6 weeks.',
    stats: [
      { label: 'Audit readiness time', value: '−81%' },
      { label: 'Definitions with lineage', value: '100%' },
      { label: 'Owners with sign-off', value: '52' },
    ],
    excerpt:
      'Aureus needed SEC and internal audit trails for every KPI. Duodata’s lifecycle status, owner and lineage fields shipped audit-grade governance without a catalog rollout.',
    quote: 'Our first regulator conversation went from three weeks of prep to three days.',
    quoteAuthor: 'Head of Data Governance, Aureus',
    tags: ['Fintech', 'Governance', 'Audit', 'SEC'],
  },
];
