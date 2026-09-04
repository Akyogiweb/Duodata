// Mock data for Duodata clone

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

export const businessFeatures = [
  {
    id: 'b1',
    eyebrow: 'Trusted answers',
    title: 'Know what the number means.',
    description:
      'See the definition, the owner, and where it is used — then ask the next question in plain language.',
    kicker: 'Can I trust this number?',
  },
  {
    id: 'b2',
    eyebrow: 'Products & services',
    title: 'Improve what customers feel.',
    description:
      'Product and service teams stop arguing over the metric and start changing the experience with the same meaning.',
    kicker: 'One story for the customer.',
  },
  {
    id: 'b3',
    eyebrow: 'Sales & after purchase',
    title: 'Recommend the next right step.',
    description:
      'Post-purchase feedback becomes a signal the whole company can use — so sales and success convert a diverse audience with the same intelligence.',
    kicker: 'From feedback to action.',
  },
];

export const technicalFeatures = [
  {
    id: 't1',
    eyebrow: 'Definitions',
    title: 'Capture the formula once.',
    description:
      'Owners, lifecycle, versions, and releases sit on the same object the business already named.',
    kicker: 'Meaning with a contract.',
  },
  {
    id: 't2',
    eyebrow: 'Lineage',
    title: 'Trace it to the source.',
    description:
      'From business definition to formula, lineage, schema, and the platform it ships on — without a second dictionary.',
    kicker: 'No drift between layers.',
  },
  {
    id: 't3',
    eyebrow: 'Implementation',
    title: 'Map it into the stack.',
    description:
      'Git, YAML / JSON, semantic views, and platform mappings make the same concept real in Snowflake, Databricks, dbt, and BI.',
    kicker: 'Ship what the business asked for.',
  },
];

export const businessUseCases = [
  {
    title: 'Product leaders',
    body: 'Stop defending dashboard numbers in roadmap reviews. Know what the metric means before you change what customers experience.',
  },
  {
    title: 'Sales and customer teams',
    body: 'Walk into every account with one story — not a different definition for finance, product, and the customer’s last QBR.',
  },
  {
    title: 'Operators and finance',
    body: 'When direction changes, debates stay about strategy — not whether the number on slide 14 is the same one in the model.',
  },
  {
    title: 'Executives using AI',
    body: 'Ask bold questions in the room without wondering if the answer is last quarter’s definition dressed up as insight.',
  },
];

export const technicalUseCases = [
  {
    title: 'Data platform teams',
    body: 'Take a business concept all the way to implementation: lineage, sources, versions, and semantic views on the platforms you already run.',
  },
  {
    title: 'Analytics engineering',
    body: 'Stop maintaining a second dictionary in dbt, MetricFlow, or BI. Govern the meaning once and project it.',
  },
  {
    title: 'Governance & quality',
    body: 'Ownership, lifecycle, and history are first-class. Proposed, approved, and implemented are visible to everyone who ships.',
  },
  {
    title: 'AI platform teams',
    body: 'Ground copilots and agents in the same objects the business uses — not schema guesses or a prompt that drifted overnight.',
  },
];

export const businessTestimonials = [
  {
    quote:
      'Sales, product, and success finally tell the customer the same story. The number means one thing.',
    author: 'VP Customer Experience',
    company: 'Enterprise software',
  },
  {
    quote:
      'I can ask what changed and actually understand the answer — without waiting on a ticket to data.',
    author: 'Chief Operating Officer',
    company: 'Growth-stage marketplace',
  },
  {
    quote:
      'When we shifted strategy, the questions we ask still landed on governed meaning. That is how we moved with AI.',
    author: 'General Partner',
    company: 'Private markets firm',
  },
];

export const technicalTestimonials = [
  {
    quote:
      'Business teams ask in their own language, and we can still show exactly how every answer is implemented.',
    author: 'Head of Data Platform',
    company: 'Global asset manager',
  },
  {
    quote:
      'Lineage, versions, and semantic views finally sit on the same objects the business named. We stopped translating by hand.',
    author: 'Lead Analytics Engineer',
    company: 'Fortune 500 industrials',
  },
  {
    quote:
      'Our agents only work because the meaning is shared. Duo Data is the contract between the business and the stack.',
    author: 'Chief Data Officer',
    company: 'PE-backed fintech',
  },
];

export const businessTeams = [
  { name: 'Product', color: '#1E5FEE' },
  { name: 'Sales', color: '#0a0a0a' },
  { name: 'Customer success', color: '#1E5FEE' },
  { name: 'Finance', color: '#0a0a0a' },
  { name: 'Operations', color: '#1E5FEE' },
  { name: 'Executive', color: '#0a0a0a' },
];

export const businessMeanings = [
  {
    metric: 'MOIC',
    meaning: 'Total value created for every unit of capital invested.',
    owner: 'Investment committee',
    usedIn: 'Board pack · LP report',
  },
  {
    metric: 'Net retention',
    meaning: 'How much existing customers grow or shrink with us.',
    owner: 'Customer success',
    usedIn: 'QBR · Board dashboard',
  },
  {
    metric: 'Time to value',
    meaning: 'How quickly a new customer reaches the first trusted outcome.',
    owner: 'Product',
    usedIn: 'Onboarding review · NPS follow-up',
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

export const useCases = businessUseCases;
export const testimonials = businessTestimonials;
export const featureBlocks = businessFeatures;

