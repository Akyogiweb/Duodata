// Industry deep-content data. Used by both the Industries selector on the
// landing page and the individual /industries/:slug detail pages.

export const industries = [
  {
    slug: 'financial-services',
    id: 'fs',
    icon: 'Banknote',
    name: 'Financial Services',
    tagline: 'Govern the definitions behind every regulated number.',
    problems: [
      'Multiple definitions of performance metrics',
      'Regulatory reporting consistency',
      'Portfolio-level vs investment-level calculations',
      'Ownership and auditability',
    ],
    message:
      'Govern the definitions behind the numbers your investment, risk and compliance teams depend on.',
    scenarios: [
      {
        title: 'Regulatory reporting drift',
        body:
          'CCAR and FR Y-14 submissions come from six different SQL models. Duo Data holds the single approved definition of each capital metric — every model deploys from the same versioned contract.',
      },
      {
        title: 'Front office vs risk',
        body:
          'Traders, risk and finance argue over what "P&L" means each quarter-end. Duo Data captures the two authoritative variants, tags each to the report it belongs to, and eliminates the reconciliation call.',
      },
      {
        title: 'M&A integration',
        body:
          'When two banks merge, three catalogs and four warehouses collide. Duo Data\u2019s ontology becomes the semantic reconciliation layer above the physical stack.',
      },
    ],
    metrics: ['Net Interest Margin', 'RWA', 'CET1 Ratio', 'LCR', 'PPNR', 'ECL'],
    quote: {
      body:
        'Our regulatory numbers finally reconcile before submission, not after. Duo Data is the definition-of-record for every capital ratio we file.',
      author: 'Head of Regulatory Data',
      company: 'Top-10 US bank',
    },
  },
  {
    slug: 'private-equity',
    id: 'pe',
    icon: 'Briefcase',
    name: 'Private Equity',
    tagline: 'One authoritative MOIC. Every fund, every quarter.',
    problems: [
      'MOIC, IRR and DPI defined differently across funds',
      'LP reporting versus internal analytics',
      'Vintage, fund and portfolio-company slicing',
      'Valuation methodology (ASC 820 / IPEV) governance',
    ],
    message:
      'One authoritative place for the metrics LPs, GPs and the CFO rely on.',
    scenarios: [
      {
        title: 'ILPA and LP reporting',
        body:
          'Every quarter, LP capital account statements have to reconcile with internal fund books. Duo Data governs the shared definition of Called Capital, Distributed and NAV once — the same numbers ship to both.',
      },
      {
        title: 'Cross-fund KPIs',
        body:
          'Fund IV and Fund V teams calculated Gross MOIC subtly differently. Duo Data makes the difference visible, then makes a single approved version the enterprise standard.',
      },
      {
        title: 'Portfolio company benchmarking',
        body:
          'EBITDA add-backs and net leverage need consistent definitions to benchmark across portcos. Duo Data governs them at the platform level, projected into Snowflake for the analytics team.',
      },
    ],
    metrics: ['MOIC', 'Gross IRR', 'Net IRR', 'DPI', 'TVPI', 'NAV'],
    quote: {
      body:
        'The LP quarterly is no longer a reconciliation project. MOIC and IRR mean one thing here — and everyone knows exactly which one.',
      author: 'CFO',
      company: 'Middle-market PE fund',
    },
  },
  {
    slug: 'healthcare',
    id: 'healthcare',
    icon: 'HeartPulse',
    name: 'Healthcare',
    tagline: 'One semantic language across clinical and operational data.',
    problems: [
      'Different definitions of patient metrics',
      'Clinical vs operational terminology',
      'Sensitive data environments',
      'Multiple reporting systems',
    ],
    message:
      'A shared semantic language across clinical, operational and analytical data.',
    scenarios: [
      {
        title: 'Length of Stay',
        body:
          'Clinical Ops, Finance and Quality each define LOS differently — ED-adjusted, observation-inclusive or discharge-based. Duo Data holds all three as approved variants with clear owners.',
      },
      {
        title: 'Readmission risk',
        body:
          '30-day readmission is calculated four different ways in existing dashboards. Duo Data governs the CMS-aligned version and marks legacy ones as deprecated.',
      },
      {
        title: 'AI in the clinic',
        body:
          'When a clinical decision-support agent asks "what\u2019s this patient\u2019s risk?", Duo Data ensures the risk score, the cohort and the lookback window are the governed ones — not a schema guess.',
      },
    ],
    metrics: ['ALOS', 'Readmission Rate', 'HCAHPS', 'Case Mix Index', 'ED Throughput'],
    quote: {
      body:
        'Operations and clinical finally read from the same dictionary. Our board deck used to have three LOS numbers — now it has one.',
      author: 'Chief Analytics Officer',
      company: 'Integrated health system',
    },
  },
  {
    slug: 'manufacturing',
    id: 'mfg',
    icon: 'Factory',
    name: 'Manufacturing',
    tagline: 'Standardize meaning without standardizing every plant.',
    problems: [
      'Plant-specific definitions',
      'Operational KPIs',
      'Supply-chain metrics',
      'Multiple ERP / MES systems',
    ],
    message:
      'Standardize operational meaning without forcing every plant onto the same physical architecture.',
    scenarios: [
      {
        title: 'OEE across plants',
        body:
          'Each plant calculates OEE with a slightly different downtime rule. Duo Data holds the corporate definition — plants keep their MES, but the enterprise OEE is one governed metric.',
      },
      {
        title: 'Supply-chain KPI alignment',
        body:
          'On-Time-In-Full means different things to logistics and to sales. Duo Data governs both, connects them via a shared slice, and lets each function stay honest.',
      },
      {
        title: 'ESG / Scope 3 rollups',
        body:
          'Scope 3 emissions calculations vary by BU. Duo Data captures each methodology, tracks its lifecycle, and rolls them up into a governed enterprise number.',
      },
    ],
    metrics: ['OEE', 'OTIF', 'Yield Rate', 'FPY', 'Scrap %', 'Scope 3'],
    quote: {
      body:
        'Our plants still run their own MES. But when the board asks for OEE, we finally have one number — and we can trace it all the way back to the sensor.',
      author: 'VP of Operations Analytics',
      company: 'Global industrial manufacturer',
    },
  },
  {
    slug: 'retail',
    id: 'retail',
    icon: 'ShoppingBag',
    name: 'Retail',
    tagline: 'Consistent customer, product and revenue meaning across channels.',
    problems: [
      'Customer metrics inconsistency',
      'Revenue definitions per channel',
      'Product hierarchies',
      'Marketing attribution',
    ],
    message:
      'Make customer, product, revenue and performance metrics consistent across channels.',
    scenarios: [
      {
        title: 'Revenue by channel',
        body:
          'Online, in-store and marketplace teams each report "revenue" — but returns, cancellations and taxes are handled differently. Duo Data governs Gross, Net and Recognized revenue as three explicit metrics.',
      },
      {
        title: 'Customer lifetime value',
        body:
          'Marketing\u2019s CLV is 4x Finance\u2019s CLV. Duo Data captures the two definitions, ties each to its use case, and stops the argument before the QBR.',
      },
      {
        title: 'Attribution and media mix',
        body:
          'Marketing attribution changes vendors twice a year. Duo Data holds the current governed model and versions previous ones for backfill and comparison.',
      },
    ],
    metrics: ['Net Revenue', 'GMV', 'CAC', 'CLV', 'AOV', 'Return Rate'],
    quote: {
      body:
        'CFO and CMO stopped fighting about CAC. Now they fight about strategy — which is the fight we actually want.',
      author: 'Head of Analytics',
      company: 'Omnichannel retailer',
    },
  },
  {
    slug: 'insurance',
    id: 'insurance',
    icon: 'ShieldCheck',
    name: 'Insurance',
    tagline: 'Connect policy language to the calculations behind regulated reports.',
    problems: [
      'Policy terminology',
      'Claims metrics',
      'Risk calculations',
      'Regulatory reporting',
    ],
    message:
      'Connect business definitions to the calculations and systems behind regulated reporting.',
    scenarios: [
      {
        title: 'Loss ratio governance',
        body:
          'Underwriting, actuarial and finance each cut the loss ratio differently. Duo Data governs the calendar-year, accident-year and ultimate versions with clear owners.',
      },
      {
        title: 'IFRS 17 / LDTI',
        body:
          'New accounting standards require metric definitions to be traceable, versioned and auditable. Duo Data provides the semantic contract regulators expect.',
      },
      {
        title: 'Actuarial ↔ analytics reconciliation',
        body:
          'Actuarial models and BI dashboards disagree on premium earned. Duo Data holds the approved definition and both consume it from the same source.',
      },
    ],
    metrics: ['Loss Ratio', 'Combined Ratio', 'Premium Earned', 'IBNR', 'CSM'],
    quote: {
      body:
        'For the first time, actuarial and BI report the same loss ratio. That alone paid for the platform.',
      author: 'Chief Data Officer',
      company: 'Global P&C insurer',
    },
  },
];

export const getIndustryBySlug = (slug) => industries.find((i) => i.slug === slug);
