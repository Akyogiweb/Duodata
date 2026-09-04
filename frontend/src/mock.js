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
    body: 'See which metrics actually describe the product. Change the offering with numbers the rest of the company already trusts.',
  },
  {
    title: 'Sales and customer teams',
    body: 'Walk into a diverse set of accounts with one intelligent story — and turn post-purchase feedback into the next recommendation.',
  },
  {
    title: 'Operators and finance',
    body: 'When direction changes, the meaning moves with it. Strategy is not a stale slide; it is the definition people ask questions against.',
  },
  {
    title: 'Executives using AI',
    body: 'Ask about the business and get an answer grounded in meaning you already own — so AI moves the company the right way.',
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

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Business experience', href: '/#experience' },
      { label: 'Technical experience', href: '/#experience' },
      { label: 'Shared semantics', href: '/#product' },
      { label: 'Workspace', href: '/explore' },
      { label: 'Case studies', href: '/case-studies' },
    ],
  },
  {
    title: 'Business topics',
    links: [
      { label: 'Purpose', href: '/#purpose' },
      { label: 'Metric consistency', href: '/#metric-consistency' },
      { label: 'Clarity', href: '/#clarity' },
      { label: 'AI', href: '/#business-ai' },
    ],
  },
  {
    title: 'Technical topics',
    links: [
      { label: 'Metric ontology', href: '/#metric-ontology' },
      { label: 'AI governance', href: '/#ai-governance' },
      { label: 'Semantic layer', href: '/#semantic-layer' },
      { label: 'Data lineage', href: '/#data-lineage' },
      { label: 'AI reliability', href: '/#ai-reliability' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#connect' },
      { label: 'Contact', href: '/#get-started' },
    ],
  },
];

/** Landing sections unique to each experience, from the product taxonomy. */
export const businessExperienceGroups = [
  {
    id: 'purpose',
    subGroup: 'Purpose',
    kicker: 'Business — Purpose',
    title: 'One meaning, definition, and goal.',
    lede: 'Teams stop arguing over the number when the ontology is shared: metrics, slices, reports, and sources.',
    items: [
      {
        id: 'business-meaning',
        category: 'Business meaning, definition, and goal',
        tools: 'Metric ontology — metrics, slices, reports, and sources',
        purpose: 'Explain conflicting definitions across teams.',
      },
    ],
  },
  {
    id: 'metric-consistency',
    subGroup: 'Metric consistency',
    kicker: 'Business — Metric consistency',
    title: 'Keep the meaning from rotting and slipping.',
    lede: 'Small changes and silent decay both break downstream work. Governance is how the business keeps context true.',
    items: [
      {
        id: 'context-rot',
        category: 'Context rot',
        tools: 'Governance platform',
        purpose: 'Explain how business context degrades over time.',
      },
      {
        id: 'context-slip',
        category: 'Context slip',
        tools: 'Governance platform',
        purpose: 'Explain how small definition changes create downstream errors.',
      },
    ],
  },
  {
    id: 'clarity',
    subGroup: 'Clarity',
    kicker: 'Business — Clarity',
    title: 'Ownership and controls on every metric.',
    lede: 'If nobody owns the definition, nobody can trust the answer. Governance makes the number accountable.',
    items: [
      {
        id: 'metric-governance',
        category: 'Metric governance',
        tools: 'Governance',
        purpose: 'Establish why metrics need ownership and controls.',
      },
    ],
  },
  {
    id: 'business-ai',
    subGroup: 'AI',
    kicker: 'Business — AI',
    title: 'Tenure-proof knowledge. Questions with context.',
    lede: 'AI only moves the company the right way when value drivers, lineage, and institutional knowledge sit in the ontology — not in one person’s head.',
    items: [
      {
        id: 'context-drift',
        category: 'Context drift',
        tools: 'Value driver and governance',
        purpose: 'Explain how business context degrades over time as the company and its questions change.',
      },
      {
        id: 'institutional-knowledge',
        category: 'Institutional knowledge and tenure-proof data',
        tools: 'Metric ontology',
        purpose: 'Reduce dependence on experienced employees. Document the organization’s knowledge beyond individuals.',
      },
      {
        id: 'ai-business-question',
        category: 'AI business question and context',
        tools: 'Value driver, lineage',
        purpose: 'Give AI the business question and the governed context it needs — tied to value drivers and lineage.',
      },
    ],
  },
];

export const technicalExperienceTopics = [
  {
    id: 'metric-ontology',
    category: 'Metric ontology',
    tools: 'Lightweight data modeling via Duo Data agents',
    purpose: 'Connect context quality to AI outcomes with a light modeling layer, not a second warehouse project.',
  },
  {
    id: 'ai-governance',
    category: 'AI governance',
    tools: 'Governed business context for models and agents',
    purpose: 'Explain why AI needs governed business context — not guessed schema or a prompt that drifted overnight.',
  },
  {
    id: 'semantic-layer',
    category: 'Semantic layer',
    tools: 'Integration agents / layer',
    purpose: 'Explain the category: a semantic layer that projects the same business meaning into the stack.',
  },
  {
    id: 'data-lineage',
    category: 'Data lineage',
    tools: 'Lineage and governance',
    purpose: 'Explain traceability and accountability from definition to source to implementation.',
  },
  {
    id: 'ai-reliability',
    category: 'AI reliability',
    tools: 'MCP, platform-native apps',
    purpose: 'Connect context quality to AI outcomes in MCP and the apps teams already run.',
  },
];
