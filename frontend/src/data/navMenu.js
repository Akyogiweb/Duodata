// Nav mega-menu structure per Section 31 of the product brief.
// Item shape: { label, description, href, type: 'anchor' | 'route' }

export const platformItems = [
  {
    label: 'Metrics Ontology',
    description: 'Metrics, slices, reports, sources — the semantic building blocks.',
    href: '/#ontology',
    type: 'anchor',
  },
  {
    label: 'Metric Detail',
    description: 'How a metric definition, formula, lineage and value drivers come together.',
    href: '/#metric-detail',
    type: 'anchor',
  },
  {
    label: 'Governance',
    description: 'Lifecycle, ownership and versioned semantic contracts.',
    href: '/#governance',
    type: 'anchor',
  },
  {
    label: 'Git',
    description: 'Business semantics become code — YAML, versioned, reviewed.',
    href: '/#git',
    type: 'anchor',
  },
  {
    label: 'Platform Integrations',
    description: 'Snowflake Semantic Views, Databricks Metric Views, Unity Catalog.',
    href: '/#platforms',
    type: 'anchor',
  },
  {
    label: 'Semantic Layer',
    description: 'A living, continuously governed enterprise asset.',
    href: '/#semantic-layer',
    type: 'anchor',
  },
  {
    label: 'AI & Agents',
    description: 'Ground AI answers in governed business meaning.',
    href: '/#ai',
    type: 'anchor',
  },
  {
    label: 'The Duo Architecture',
    description: 'Interactive spine — from business meaning to a governed AI answer.',
    href: '/#mega-diagram',
    type: 'anchor',
  },
];

export const solutionsItems = [
  {
    label: 'Data & Analytics',
    description: 'One consistent semantic foundation across every analytics use case.',
    href: '/#ontology',
    type: 'anchor',
  },
  {
    label: 'Data Governance',
    description: 'Govern definitions like production assets — lifecycle, ownership, audit.',
    href: '/#governance',
    type: 'anchor',
  },
  {
    label: 'AI Readiness',
    description: 'Give AI agents the governed context they need to answer correctly.',
    href: '/#ai',
    type: 'anchor',
  },
  {
    label: 'Executive Reporting',
    description: 'One authoritative version of the numbers the board sees.',
    href: '/#metric-detail',
    type: 'anchor',
  },
  {
    label: 'Regulatory & Compliance',
    description: 'Traceable, versioned, auditable definitions behind every filing.',
    href: '/#before-after',
    type: 'anchor',
  },
  {
    label: 'Semantic Migration',
    description: 'Move from scattered definitions to a governed semantic layer, incrementally.',
    href: '/#before-after',
    type: 'anchor',
  },
];

export const industriesItems = [
  { label: 'Financial Services', description: 'Regulated numbers, governed at the source.', href: '/industries/financial-services', type: 'route' },
  { label: 'Private Equity', description: 'One authoritative MOIC across every fund.', href: '/industries/private-equity', type: 'route' },
  { label: 'Healthcare', description: 'Shared meaning across clinical and operational data.', href: '/industries/healthcare', type: 'route' },
  { label: 'Manufacturing', description: 'Standardize meaning without standardizing every plant.', href: '/industries/manufacturing', type: 'route' },
  { label: 'Retail', description: 'Consistent customer, product and revenue across channels.', href: '/industries/retail', type: 'route' },
  { label: 'Insurance', description: 'Policy language connected to regulated reporting.', href: '/industries/insurance', type: 'route' },
];

export const resourcesItems = [
  { label: 'Product Demo', description: 'A guided 10-minute walkthrough of Duo Data.', href: '/#mega-diagram', type: 'anchor' },
  { label: 'Architecture', description: 'The full business ↔ technical semantic spine.', href: '/#mega-diagram', type: 'anchor' },
  { label: 'Case Studies', description: 'How teams use Duo Data in production.', href: '/case-studies', type: 'route' },
  { label: 'Explore', description: 'Browse the interactive ontology explorer.', href: '/explore', type: 'route' },
  { label: 'Blog', description: 'Points of view on semantics, governance and AI.', href: '/#get-started', type: 'anchor' },
  { label: 'Videos', description: 'Short product and thought-leadership videos.', href: '/#get-started', type: 'anchor' },
];

export const navSections = [
  { key: 'platform', label: 'Platform', items: platformItems },
  { key: 'solutions', label: 'Solutions', items: solutionsItems },
  { key: 'industries', label: 'Industries', items: industriesItems },
  { key: 'resources', label: 'Resources', items: resourcesItems },
];
