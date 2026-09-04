/** Shared focus so a business question can open the matching technical layer. */
export const PROPOSITION_FOCUS_KEY = 'duodata_proposition_layer';

export function rememberPropositionLayer(layerId) {
  try {
    window.sessionStorage.setItem(PROPOSITION_FOCUS_KEY, layerId);
  } catch {
    /* ignore */
  }
}

export function readPropositionLayer() {
  try {
    return window.sessionStorage.getItem(PROPOSITION_FOCUS_KEY);
  } catch {
    return null;
  }
}

export const VALUE_LAYERS = [
  {
    id: 'consumption',
    title: 'Consumption interfaces',
    sub: 'Board · QBR · BI · AI',
    fill: '#6ecfe6',
    side: '#3aa9c6',
    rx: 340,
    depth: 28,
    enables:
      'The same governed answer lands in the pack, the dashboard, and the agent — not four versions of “the number.”',
  },
  {
    id: 'decision',
    title: 'Decision model',
    sub: 'Business question + ownership',
    fill: '#1E5FEE',
    side: '#1648c4',
    rx: 292,
    depth: 26,
    enables:
      'Each customer question is a governed object: who owns it, when it changed, and which journey it serves.',
  },
  {
    id: 'ontology',
    title: 'Living ontology',
    sub: 'Metrics · slices · reports · sources',
    fill: '#1a2d4d',
    side: '#121f36',
    rx: 244,
    depth: 24,
    enables:
      'Meaning is versioned. When the market, the product, or the customer changes, the object moves — it is not a silent spreadsheet edit.',
  },
  {
    id: 'mapping',
    title: 'Platform mapping',
    sub: 'Agents + native semantics',
    fill: '#0d4a5c',
    side: '#083848',
    rx: 196,
    depth: 22,
    enables:
      'The object compiles into Snowflake, Databricks, dbt, and BigQuery as native views — the stack the team already runs.',
  },
  {
    id: 'sources',
    title: 'Sources',
    sub: 'Warehouse · CRM · product events',
    fill: '#0a3038',
    side: '#072228',
    rx: 148,
    depth: 20,
    enables:
      'Lineage starts where the journey happened: CRM, product analytics, and the warehouse models behind them.',
  },
];

export const JOURNEY_NODES = [
  {
    id: 'grow',
    parent: null,
    stage: 'model',
    label: 'How do we grow — and still trust the number?',
    pain: 'Every team has a growth story. Few share one meaning for churn, pipeline, or adoption.',
    change: 'The living ontology is the process model: it absorbs a new market, a new SKU, or a new customer demand without splitting the truth.',
    atom: 'metric',
    layer: 'decision',
  },
  {
    id: 'pre-sales',
    parent: 'grow',
    stage: 'pre-sales',
    label: 'Win on a number we can stand behind',
    pain: 'Coverage, win rate, and “real pipeline” disagree before the deal is even signed.',
    change: 'A new segment or region is a new approved slice — not a new spreadsheet column in sales ops.',
    atom: 'slice',
    layer: 'decision',
  },
  {
    id: 'product',
    parent: 'grow',
    stage: 'product',
    label: 'Ship against what customers actually demand',
    pain: 'Roadmaps chase anecdotes. Usage, NPS, and revenue each tell a different product story.',
    change: 'New product needs become named metrics and slices the moment the business agrees they matter.',
    atom: 'metric',
    layer: 'ontology',
  },
  {
    id: 'post-sales',
    parent: 'grow',
    stage: 'post-sales',
    label: 'Keep, expand, and win them back',
    pain: 'Churn is explained after the customer is gone. Expansion is argued in three QBRs.',
    change: 'Dormant, active, and former customers are governed lenses — they move when the customer’s demand moves.',
    atom: 'slice',
    layer: 'ontology',
  },
  {
    id: 'pipeline-real',
    parent: 'pre-sales',
    stage: 'pre-sales',
    label: 'Which pipeline is real coverage?',
    pain: 'Sales, finance, and RevOps cannot sit in the same forecast meeting.',
    change: 'Coverage is one metric. Stage and segment are slices. The report is the forecast pack.',
    atom: 'report',
    layer: 'consumption',
  },
  {
    id: 'win-rate',
    parent: 'pre-sales',
    stage: 'pre-sales',
    label: 'Why does win rate disagree by team?',
    pain: 'Each region “fixes” the definition so they can hit the number.',
    change: 'External pressure (quota, competitor, season) is a decision on the object — not a local SQL tweak.',
    atom: 'metric',
    layer: 'mapping',
  },
  {
    id: 'usage',
    parent: 'product',
    stage: 'product',
    label: 'What are customers actually using?',
    pain: 'Product analytics and the board pack do not share a customer count.',
    change: 'New feature demand is captured as a slice the ontology already knows how to govern.',
    atom: 'source',
    layer: 'sources',
  },
  {
    id: 'fund',
    parent: 'product',
    stage: 'product',
    label: 'Which new demand should we fund?',
    pain: 'The loudest customer wins. The living model should say who the number is for.',
    change: 'A new demand is an approved lens plus an owner — then it can show up in every report.',
    atom: 'slice',
    layer: 'ontology',
  },
  {
    id: 'dormant-early',
    parent: 'post-sales',
    stage: 'post-sales',
    label: 'How do we see dormant customers early?',
    pain: 'Dormancy is a hunch in CS until renewal is already at risk.',
    change: '“Dormant” is a governed slice with a source, not a one-off campaign list.',
    atom: 'slice',
    layer: 'sources',
  },
  {
    id: 'win-back',
    parent: 'post-sales',
    stage: 'post-sales',
    label: 'How do we attract and retain dormant customers?',
    pain: 'Win-back spend cannot be tied to the same churn definition the board used.',
    change: 'Loyalty, win-back, and expansion all hang off one customer meaning as it lives.',
    atom: 'metric',
    layer: 'decision',
  },
  {
    id: 'loyalty',
    parent: 'win-back',
    stage: 'post-sales',
    label: 'Should we change the loyalty offer?',
    pain: 'Offers launch from a slide. Nobody can say what “retained” meant last quarter.',
    change: 'The offer is a decision on a living metric — product need and customer demand, versioned together.',
    atom: 'report',
    layer: 'consumption',
  },
  {
    id: 'behaviour',
    parent: 'win-back',
    stage: 'post-sales',
    label: 'What did dormant customers stop doing?',
    pain: 'Behaviour sits in the product warehouse. Churn sits in finance. They never meet.',
    change: 'External behaviour and the business name resolve through the same source lineage.',
    atom: 'source',
    layer: 'mapping',
  },
];

export const DEFAULT_JOURNEY_ID = 'loyalty';

export const journeyById = (id) => JOURNEY_NODES.find((node) => node.id === id);

export const childrenOf = (id) => JOURNEY_NODES.filter((node) => node.parent === id);

export const layerById = (id) => VALUE_LAYERS.find((layer) => layer.id === id);

export function ancestorsOf(id) {
  const chain = [];
  let current = journeyById(id);
  while (current) {
    chain.unshift(current);
    current = current.parent ? journeyById(current.parent) : null;
  }
  return chain;
}

/** Root, all three strategies, and the full subtree of the active strategy. */
export function visibleJourneyIds(activeId) {
  const root = JOURNEY_NODES.find((node) => !node.parent);
  const strategies = childrenOf(root.id);
  const active = journeyById(activeId) || journeyById(DEFAULT_JOURNEY_ID);
  const chain = ancestorsOf(active.id);
  const strategy = chain.find((node) => node.parent === root.id) || strategies[2];
  const ids = new Set([root.id, ...strategies.map((node) => node.id)]);
  const walk = (id) => {
    childrenOf(id).forEach((child) => {
      ids.add(child.id);
      walk(child.id);
    });
  };
  walk(strategy.id);
  return ids;
}
