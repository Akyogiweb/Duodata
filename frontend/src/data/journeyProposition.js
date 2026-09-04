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
    top: '#7FD1E8',
    wall: '#2e93ab',
    ink: true,
    enables:
      'The same governed answer lands in the pack, the dashboard, and the agent — not four versions of “the number.”',
  },
  {
    id: 'decision',
    title: 'Decision model',
    sub: 'Business question + ownership',
    top: '#1E5FEE',
    wall: '#143fa8',
    ink: false,
    enables:
      'Each customer question is a governed object: who owns it, when it changed, and which journey it serves.',
  },
  {
    id: 'ontology',
    title: 'Living ontology',
    sub: 'Metrics · slices · reports · sources',
    top: '#243656',
    wall: '#152033',
    ink: false,
    enables:
      'Meaning is versioned. When the market, the product, or the customer changes, the object moves — it is not a silent spreadsheet edit.',
  },
  {
    id: 'mapping',
    title: 'Platform mapping',
    sub: 'Agents + native semantics',
    top: '#1a6b78',
    wall: '#0f454e',
    ink: false,
    enables:
      'The object compiles into Snowflake, Databricks, dbt, and BigQuery as native views — the stack the team already runs.',
  },
  {
    id: 'sources',
    title: 'Sources',
    sub: 'Warehouse · CRM · product events',
    top: '#5ec8dc',
    wall: '#2a8aa0',
    ink: true,
    enables:
      'Lineage starts where the journey happened: CRM, product analytics, and the warehouse models behind them.',
  },
];

export const EVOLUTION_TRIGGERS = [
  {
    id: 'market',
    label: 'Market shifts',
    hint: 'New region, segment, or competitor pressure',
  },
  {
    id: 'sku',
    label: 'SKU changes',
    hint: 'New product, bundle, or pricing model',
  },
  {
    id: 'customer',
    label: 'Customer demand',
    hint: 'Usage, churn, or buying behaviour moves',
  },
];

export const JOURNEY_NODES = [
  {
    id: 'grow',
    parent: null,
    stage: 'model',
    shift: 'market',
    short: 'How do we grow?',
    label: 'How do we grow — and still trust the number?',
    pain: 'Every team has a growth story. Few share one meaning for churn, pipeline, or adoption.',
    was: 'Growth means a different number in every deck.',
    now: 'One governed growth model every team can question and extend.',
    change: 'The living ontology is the process model: it absorbs a new market, a new SKU, or a new customer demand without splitting the truth.',
    atom: 'metric',
    layer: 'decision',
  },
  {
    id: 'pre-sales',
    parent: 'grow',
    stage: 'pre-sales',
    shift: 'market',
    short: 'Win the number',
    label: 'Win on a number we can stand behind',
    pain: 'Coverage, win rate, and “real pipeline” disagree before the deal is even signed.',
    was: 'Pipeline counts change when a new region opens.',
    now: 'New segment = new approved slice — same forecast meeting, same truth.',
    change: 'A new segment or region is a new approved slice — not a new spreadsheet column in sales ops.',
    atom: 'slice',
    layer: 'decision',
  },
  {
    id: 'product',
    parent: 'grow',
    stage: 'product',
    shift: 'sku',
    short: 'Ship real demand',
    label: 'Ship against what customers actually demand',
    pain: 'Roadmaps chase anecdotes. Usage, NPS, and revenue each tell a different product story.',
    was: 'Feature demand lives in Slack threads and one-off dashboards.',
    now: 'Named metrics and slices the moment product and finance agree.',
    change: 'New product needs become named metrics and slices the moment the business agrees they matter.',
    atom: 'metric',
    layer: 'ontology',
  },
  {
    id: 'post-sales',
    parent: 'grow',
    stage: 'post-sales',
    shift: 'customer',
    short: 'Keep & expand',
    label: 'Keep, expand, and win them back',
    pain: 'Churn is explained after the customer is gone. Expansion is argued in three QBRs.',
    was: '“Active customer” means something different in CS, finance, and product.',
    now: 'Dormant, active, and former are governed lenses that move with demand.',
    change: 'Dormant, active, and former customers are governed lenses — they move when the customer’s demand moves.',
    atom: 'slice',
    layer: 'ontology',
  },
  {
    id: 'pipeline-real',
    parent: 'pre-sales',
    stage: 'pre-sales',
    shift: 'market',
    short: 'Real coverage?',
    label: 'Which pipeline is real coverage?',
    pain: 'Sales, finance, and RevOps cannot sit in the same forecast meeting.',
    was: 'Coverage = whatever helps hit quota this quarter.',
    now: 'One coverage metric. Stage and segment are slices. Report = forecast pack.',
    change: 'Coverage is one metric. Stage and segment are slices. The report is the forecast pack.',
    atom: 'report',
    layer: 'consumption',
  },
  {
    id: 'win-rate',
    parent: 'pre-sales',
    stage: 'pre-sales',
    shift: 'market',
    short: 'Whose win rate?',
    label: 'Why does win rate disagree by team?',
    pain: 'Each region “fixes” the definition so they can hit the number.',
    was: 'Win rate excludes deals that “don’t count” locally.',
    now: 'Quota, competitor, and season are decisions on the object — not local SQL.',
    change: 'External pressure (quota, competitor, season) is a decision on the object — not a local SQL tweak.',
    atom: 'metric',
    layer: 'mapping',
  },
  {
    id: 'usage',
    parent: 'product',
    stage: 'product',
    shift: 'customer',
    short: 'What they use',
    label: 'What are customers actually using?',
    pain: 'Product analytics and the board pack do not share a customer count.',
    was: 'Usage metrics live only in the product warehouse.',
    now: 'Feature adoption is a governed slice every report can reference.',
    change: 'New feature demand is captured as a slice the ontology already knows how to govern.',
    atom: 'source',
    layer: 'sources',
  },
  {
    id: 'fund',
    parent: 'product',
    stage: 'product',
    shift: 'sku',
    short: 'What to fund',
    label: 'Which new demand should we fund?',
    pain: 'The loudest customer wins. The living model should say who the number is for.',
    was: 'Roadmap bets justified with anecdotes, not shared demand.',
    now: 'Approved lens + owner before engineering starts — visible in every report.',
    change: 'A new demand is an approved lens plus an owner — then it can show up in every report.',
    atom: 'slice',
    layer: 'ontology',
  },
  {
    id: 'dormant-early',
    parent: 'post-sales',
    stage: 'post-sales',
    shift: 'customer',
    short: 'See dormant early',
    label: 'How do we see dormant customers early?',
    pain: 'Dormancy is a hunch in CS until renewal is already at risk.',
    was: 'Dormant = a campaign list someone exported last week.',
    now: '“Dormant” is a governed slice with a source and an owner.',
    change: '“Dormant” is a governed slice with a source, not a one-off campaign list.',
    atom: 'slice',
    layer: 'sources',
  },
  {
    id: 'win-back',
    parent: 'post-sales',
    stage: 'post-sales',
    shift: 'customer',
    short: 'Win them back',
    label: 'How do we attract and retain dormant customers?',
    pain: 'Win-back spend cannot be tied to the same churn definition the board used.',
    was: 'Churn in the board pack ≠ churn in the win-back campaign.',
    now: 'Loyalty, win-back, and expansion share one customer meaning as it lives.',
    change: 'Loyalty, win-back, and expansion all hang off one customer meaning as it lives.',
    atom: 'metric',
    layer: 'decision',
  },
  {
    id: 'loyalty',
    parent: 'win-back',
    stage: 'post-sales',
    shift: 'sku',
    short: 'Loyalty offer?',
    label: 'Should we change the loyalty offer?',
    pain: 'Offers launch from a slide. Nobody can say what “retained” meant last quarter.',
    was: '“Retained” = anyone who logged in once last quarter.',
    now: 'Retained = active usage + renewal intent — versioned when the offer changes.',
    change: 'The offer is a decision on a living metric — product need and customer demand, versioned together.',
    atom: 'report',
    layer: 'consumption',
  },
  {
    id: 'behaviour',
    parent: 'win-back',
    stage: 'post-sales',
    shift: 'customer',
    short: 'What they stopped',
    label: 'What did dormant customers stop doing?',
    pain: 'Behaviour sits in the product warehouse. Churn sits in finance. They never meet.',
    was: 'Product events and finance churn never share a customer ID story.',
    now: 'Behaviour and business name resolve through the same source lineage.',
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

/** Depth-first order of visible nodes for the active strategy subtree. */
export function visibleJourneyOrder(activeId) {
  const visible = visibleJourneyIds(activeId);
  const root = JOURNEY_NODES.find((node) => !node.parent);
  const chain = ancestorsOf(activeId);
  const strategy = chain.find((node) => node.parent === root.id) || childrenOf(root.id)[2];
  const order = [root.id, ...childrenOf(root.id).map((node) => node.id)];
  const walk = (id) => {
    childrenOf(id).forEach((child) => {
      if (visible.has(child.id)) {
        order.push(child.id);
        walk(child.id);
      }
    });
  };
  walk(strategy.id);
  return order.filter((id, index) => order.indexOf(id) === index);
}
