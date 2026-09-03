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
    eyebrow: 'Business experience',
    title: 'Ask. Understand. Decide.',
    description:
      'See what a number means, who owns it, and whether you can trust it — then ask the next question in plain language.',
    kicker: 'Built for the people who use the numbers.',
  },
  {
    id: 2,
    eyebrow: 'Technical experience',
    title: 'Define. Govern. Implement.',
    description:
      'The same meaning, made real: formulas, lineage, versions, mappings, and semantic views across your data stack.',
    kicker: 'Built for the people who make the numbers true.',
  },
  {
    id: 3,
    eyebrow: 'Shared semantics',
    title: 'One foundation. Two ways in.',
    description:
      'Metrics, slices, reports, and sources sit in the middle — so business answers and technical implementation never drift apart.',
    kicker: 'This is what Duo means.',
  },
];

export const businessQuestions = [
  'What does this metric mean?',
  'How is it calculated?',
  'Who owns it?',
  'Where does it come from?',
  'What reports use it?',
  'What other metrics influence it?',
  'What questions can I ask about it?',
];

export const businessOutcomes = [
  {
    title: 'Better products and services',
    body: 'When teams share the same meaning, product and service decisions stop arguing over the number and start improving what customers actually feel.',
  },
  {
    title: 'Faster recommendations after purchase',
    body: 'Customer feedback after the sale becomes a trusted signal — so you can recommend the next product or service quickly, with the same language the rest of the company uses.',
  },
  {
    title: 'Direction changes, meaning stays governed',
    body: 'When the business changes course, the definitions move with it. Strategy is captured in living business meaning — not a slide that went stale last quarter.',
  },
  {
    title: 'Sales intelligence for a diverse audience',
    body: 'Complex, varied customers need the right story. Sales converts better when every conversation is backed by intelligence the business already trusts.',
  },
];

export const technicalCapabilities = [
  'Metrics',
  'Slices',
  'Reports',
  'Sources',
  'Formulas',
  'Lineage',
  'Ownership',
  'Lifecycle',
  'Versions',
  'Releases',
  'Platform mappings',
  'Git',
  'YAML / JSON',
  'Schema capture',
  'Semantic views',
  'Technical implementation',
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
    title: 'For business leaders',
    body: 'Understand the numbers that run the company. Ask better questions, trust the answers, and move product, service, and sales in the same direction.',
  },
  {
    title: 'For customer and sales teams',
    body: 'Turn post-purchase feedback into recommendations, and give every seller the same intelligence — even when the audience is complex and diverse.',
  },
  {
    title: 'For data platform teams',
    body: 'Take business meaning all the way to implementation: lineage, sources, versions, and semantic views on Snowflake, Databricks, dbt, and beyond.',
  },
  {
    title: 'For teams adopting AI',
    body: 'Move with AI the right way. Answers come from meaning the business already owns — not guesses on schema or a prompt that drifted overnight.',
  },
];

export const testimonials = [
  {
    quote:
      'Business teams finally ask questions in their own language, and we still know how every answer is implemented.',
    author: 'Head of Data Platform',
    company: 'Global asset manager',
  },
  {
    quote:
      'Sales, product, and the data team stopped arguing about the number. The recommendation to the customer is the same story we govern internally.',
    author: 'VP Customer Experience',
    company: 'Enterprise software',
  },
  {
    quote:
      'AI only works for us because the meaning is shared. Duo Data is how we moved with AI the right way.',
    author: 'Chief Data Officer',
    company: 'PE-backed fintech',
  },
];

export const footerColumns = [
  {
    title: 'Product',
    links: ['Business experience', 'Technical experience', 'Shared semantics', 'Integrations', 'Security'],
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
