export const FEATURE_CONNECTIONS = [
  {
    id: 'revenue',
    conversationId: 'trust',
    feature: 'Metric ontology',
    slug: 'snowflake',
    color: '#29B5E8',
    label: 'Snowflake',
    businessQuestion: 'How is enterprise Revenue defined?',
    businessAnswer:
      'Revenue is the named business meaning — owner, formula, and where it is used — not whichever dashboard loaded last.',
    businessSection: 'meaning-problem',
    technicalQuestion: 'Where is the source of truth for ARR?',
    technicalAnswer:
      'The same object compiles to a versioned YAML contract and a native Snowflake semantic view.',
    technicalSection: 'git',
    atom: 'metric',
  },
  {
    id: 'ownership',
    conversationId: 'moic',
    feature: 'Governance',
    slug: 'databricks',
    color: '#FF3621',
    label: 'Databricks',
    businessQuestion: 'Who owns Net Retention?',
    businessAnswer:
      'A named business owner stands behind the number. Changing it is a decision, not an edit in a spreadsheet.',
    businessSection: 'metric-detail',
    technicalQuestion: 'Who last published this definition?',
    technicalAnswer:
      'Lifecycle, owners, and releases sit on the metric: draft → proposed → approved → implemented.',
    technicalSection: 'governance',
    atom: 'metric',
  },
  {
    id: 'disagreement',
    conversationId: 'sales',
    feature: 'Lineage',
    slug: 'dbt',
    color: '#FF694A',
    label: 'dbt',
    businessQuestion: 'Why does pipeline coverage disagree?',
    businessAnswer:
      'Dashboards, SQL, spreadsheets, and agents can all say “the same metric” and still mean four different things.',
    businessSection: 'meaning-problem',
    technicalQuestion: 'Which dbt model feeds this metric?',
    technicalAnswer:
      'Lineage traces the business name through models, sources, and the platforms that actually run it.',
    technicalSection: 'lineage',
    atom: 'source',
  },
  {
    id: 'customer-count',
    conversationId: 'feedback',
    feature: 'Platform mapping',
    slug: 'googlebigquery',
    color: '#4285F4',
    label: 'BigQuery',
    businessQuestion: 'What is our true Customer Count?',
    businessAnswer:
      'The count the business decides with — used in QBRs, board packs, and the questions people actually ask.',
    businessSection: 'metric-detail',
    technicalQuestion: 'What happens if the warehouse schema drifts?',
    technicalAnswer:
      'Agents capture schema and deploy the governed object into the warehouse, BI, and AI — so drift is visible.',
    technicalSection: 'platforms',
    atom: 'report',
  },
  {
    id: 'segment',
    conversationId: 'sales',
    feature: 'Slices',
    slug: 'databricks',
    color: '#FF3621',
    label: 'Databricks',
    businessQuestion: 'For which customers is this number true?',
    businessAnswer:
      'The approved slices — segment, region, vintage — are the only lenses the business is allowed to use.',
    businessSection: 'metric-detail',
    technicalQuestion: 'Which dimensions compile into the metric view?',
    technicalAnswer:
      'Governed slices become native dimensions on the semantic object, not a second filter layer in BI.',
    technicalSection: 'platforms',
    atom: 'slice',
  },
];

export const GET_STARTED_STEPS = [
  {
    n: '01',
    title: 'Name the argument',
    business: 'Pick the number your last three meetings couldn’t agree on — revenue, retention, pipeline, margin.',
    technical: 'Name the metric the business already uses. Do not start from a table.',
  },
  {
    n: '02',
    title: 'Surface the real disagreement',
    business: 'Who defines it? Who owns it? Where does each team get their version? Map the friction before you fix anything.',
    technical: 'Record formula, slices, owners, and sources as a versioned ontology object.',
  },
  {
    n: '03',
    title: 'Put a name on accountability',
    business: 'When the definition moves, someone decides — not a silent edit in a spreadsheet that breaks twelve reports.',
    technical: 'Move draft → proposed → approved → implemented. Review in Git like any other production asset.',
  },
  {
    n: '04',
    title: 'Align the room',
    business: 'Product, sales, finance, and operators leave with one story — the same meaning in every conversation.',
    technical: 'Map into Snowflake, Databricks, dbt, BigQuery, and BI through agents — not a second dictionary.',
  },
  {
    n: '05',
    title: 'Move at the speed of the business',
    business: 'Strategy shifts. Acquisitions land. New products launch. The meaning moves with you — not three quarters behind.',
    technical: 'Ship in the workspace. Switch to Business in the nav to see the question people actually ask.',
  },
];

export const SITE_FAQS = [
  {
    q: 'Do we run two products — one for business, one for data?',
    a: 'No. Duo Data is one product with two experiences. Business and technical teams work on the same metrics, slices, reports, and sources.',
  },
  {
    q: 'How do we get started?',
    a: 'Choose an experience, name a metric the business already argues about, capture its meaning, then govern and map it into your warehouse. The five steps on this page are the path.',
  },
  {
    q: 'Does Duo Data replace Snowflake, Databricks, or dbt?',
    a: 'No. It sits between the business question and those platforms. Semantics compile into native objects — semantic views, metric views, models — where your data already lives.',
  },
  {
    q: 'How does a business question show up for engineering?',
    a: 'Every business question on this site is paired with a technical implementation: owner, YAML contract, lineage, and platform mapping. Use Connection in the nav, then switch experience to land on the matching section.',
  },
  {
    q: 'Where do we switch experiences?',
    a: 'Only in the top bar. That control is the same on every page. The homepage no longer has a second switcher in the hero.',
  },
];
