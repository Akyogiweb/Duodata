// Mock data for Duodata clone

export const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Solutions', href: '#solutions' },
  { label: 'Resources', href: '#resources' },
  { label: 'Pricing', href: '#pricing' },
];

export const heroFloatingLabels = [
  { id: 1, text: 'Define revenue with lineage', position: 'top-left' },
  { id: 2, text: 'Governed metric owners', position: 'top-center' },
  { id: 3, text: 'Project into Snowflake', position: 'top-right' },
  { id: 4, text: 'Feed AI agents context', position: 'bottom-left' },
  { id: 5, text: 'Trusted KPI definitions', position: 'bottom-right' },
];

export const complianceBadges = [
  { id: 1, label: 'SOC 2', sub: 'Type II' },
  { id: 2, label: 'GDPR', sub: 'compliant' },
  { id: 3, label: 'ISO 27001', sub: 'ISO 27701' },
  { id: 4, label: 'E2E encryption', sub: 'in transit and rest' },
  { id: 5, label: 'HIPAA', sub: 'ready' },
];

export const dataConnectors = [
  { name: 'Snowflake', color: '#29B5E8' },
  { name: 'Databricks', color: '#FF3621' },
  { name: 'dbt', color: '#FF694A' },
  { name: 'BigQuery', color: '#4285F4' },
  { name: 'Tableau', color: '#E97627' },
  { name: 'Power BI', color: '#F2C811' },
  { name: 'Looker', color: '#4285F4' },
  { name: 'MetricFlow', color: '#7C3AED' },
];

export const featureBlocks = [
  {
    id: 1,
    eyebrow: 'Metric Ontology',
    title: 'Business meaning, captured once.',
    description:
      'Define every metric with owner, formula, lifecycle status, lineage, slices, and value-driver relationships. One governed source of business intent.',
    kicker: 'Owned by the business.',
  },
  {
    id: 2,
    eyebrow: 'Projection Layer',
    title: 'Meaning that reaches every system.',
    description:
      'Project definitions into Snowflake, Databricks, dbt/MetricFlow, BI tools and AI agents. Same numbers, everywhere.',
    kicker: 'From concept to production.',
  },
  {
    id: 3,
    eyebrow: 'AI Context',
    title: 'Reliable answers for AI copilots.',
    description:
      'Give LLMs and agents a governed conceptual layer so answers reflect how the business actually defines success — not guesses on schema.',
    kicker: 'Context that scales.',
  },
];

export const slicesMock = [
  { name: 'Deal Stage', status: 'Implemented', tag: null },
  { name: 'Debt Tranche', status: 'Approved', tag: 'Covenant Compliance' },
  { name: 'ESG Category', status: 'Proposed', tag: 'SFDR / EDCI' },
  { name: 'Exit Route', status: 'Proposed', tag: null },
  { name: 'Fund', status: 'Implemented', tag: 'ILPA Reporting' },
  { name: 'Geographic Region', status: 'Approved', tag: null },
  { name: 'Holding Period Band', status: 'Approved', tag: null },
  { name: 'Investment Status', status: 'Implemented', tag: null },
  { name: 'Investor Type', status: 'Implemented', tag: 'SEC Form PF' },
  { name: 'Portfolio Company', status: 'Implemented', tag: null },
  { name: 'Revenue Type', status: 'Approved', tag: null },
  { name: 'Sector', status: 'Implemented', tag: null },
  { name: 'Sourcing Channel', status: 'Implemented', tag: null },
  { name: 'Valuation Method', status: 'Approved', tag: 'ASC 820 / IPEV' },
  { name: 'Value Creation Lever', status: 'Proposed', tag: null },
];

export const useCases = [
  {
    title: 'For Chief Data Officers',
    body: 'End the recurring metric fight in executive dashboards. Ship a governed ontology the whole company aligns on.',
  },
  {
    title: 'For Data Platform Leaders',
    body: 'A conceptual layer above your semantic layer. Feed Snowflake Semantic Views, Databricks, and dbt from one source of truth.',
  },
  {
    title: 'For AI & Analytics Engineering',
    body: 'Ground copilots, agents, and BI tools in governed business meaning — not schema guesses or brittle prompts.',
  },
  {
    title: 'For Business KPI Owners',
    body: 'Own the definition of your metric. Track proposals, approvals, and downstream usage without pinging engineering.',
  },
];

export const testimonials = [
  {
    quote:
      'Our exec dashboards finally show the same revenue number. Duodata gave the business language a home.',
    author: 'Head of Data Platform',
    company: 'Global asset manager',
  },
  {
    quote:
      'We stopped writing brittle prompts. Our AI agents now ground every answer in Duodata\u2019s metric ontology.',
    author: 'VP Analytics Engineering',
    company: 'Fortune 500 industrials',
  },
  {
    quote:
      'It sits above the semantic layer where the business actually thinks. A missing piece of the modern data stack.',
    author: 'Chief Data Officer',
    company: 'PE-backed fintech',
  },
];

export const footerColumns = [
  {
    title: 'Product',
    links: ['Metric Ontology', 'Governance', 'AI Context', 'Projections', 'Integrations'],
  },
  {
    title: 'Solutions',
    links: ['Financial Services', 'Private Markets', 'Enterprise SaaS', 'Data Platform Teams'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'Blog', 'Playbooks', 'Security', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Customers', 'Careers', 'Contact', 'Press'],
  },
];
