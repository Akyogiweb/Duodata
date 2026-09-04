/**
 * Source of truth for landing experience sections.
 * Business rows emphasize pain and stakes; technical rows cover tools and implementation.
 */
export const EXPERIENCE_TAXONOMY = [
  {
    id: 'business-meaning',
    experience: 'business',
    group: 'Business',
    subGroup: 'Purpose',
    category: 'When everyone uses the same word for different things',
    tools: 'Metric ontology — metrics, slices, reports, and sources',
    purpose: 'Sales, finance, and product walk into the room with three different definitions of the same metric — and no one knows which one the board is looking at.',
    pain: 'Meetings stall on “what do we mean by revenue?” instead of what to do about it.',
    pairId: 'metric-ontology',
    atom: 'metric',
  },
  {
    id: 'context-rot',
    experience: 'business',
    group: 'Business',
    subGroup: 'Metric consistency',
    category: 'When the number outlives the person who defined it',
    tools: 'Governance platform',
    purpose: 'The analyst who knew what EBITDA “really meant” left. The dashboard still says EBITDA. Nobody is sure it still matches the board pack.',
    pain: 'Institutional memory walks out the door; the metric stays on the slide.',
    pairId: 'semantic-layer',
    atom: 'report',
  },
  {
    id: 'context-slip',
    experience: 'business',
    group: 'Business',
    subGroup: 'Metric consistency',
    category: 'When a small change breaks everyone’s story',
    tools: 'Governance platform',
    purpose: 'Someone quietly changed how returns are counted. Twelve dashboards still say “Revenue.” Half the company is now making decisions on a number that moved.',
    pain: 'A silent spreadsheet edit becomes a company-wide misread.',
    pairId: 'data-lineage',
    atom: 'source',
  },
  {
    id: 'metric-governance',
    experience: 'business',
    group: 'Business',
    subGroup: 'Clarity',
    category: 'When no one owns the answer',
    tools: 'Governance',
    purpose: 'The CFO asks who owns Net Retention. Three people point at each other. The metric has no name on it — so no one is accountable when it changes.',
    pain: 'Without a named owner, every debate becomes a turf war.',
    pairId: 'metric-ontology',
    atom: 'metric',
  },
  {
    id: 'context-drift',
    experience: 'business',
    group: 'Business',
    subGroup: 'AI',
    category: 'When AI answers faster than your team can verify',
    tools: 'Value driver and governance',
    purpose: 'An executive asks the copilot a question in the board meeting. It answers confidently — with last quarter’s definition. Nobody catches it until after the decision.',
    pain: 'AI moves at the speed of software; your definitions move at the speed of meetings.',
    pairId: 'ai-reliability',
    atom: 'slice',
  },
  {
    id: 'institutional-knowledge',
    experience: 'business',
    group: 'Business',
    subGroup: 'AI',
    category: 'When expertise lives in people, not the organization',
    tools: 'Metric ontology',
    purpose: 'Your best operators carry years of “how we actually count this” in their heads. New hires, new regions, and new leaders start from zero every time.',
    pain: 'Growth shouldn’t mean re-learning what the numbers mean.',
    pairId: 'semantic-layer',
    atom: 'report',
  },
  {
    id: 'ai-business-question',
    experience: 'business',
    group: 'Business',
    subGroup: 'AI',
    category: 'When you can’t trust what the machine tells the room',
    tools: 'Value driver, lineage',
    purpose: 'Leadership wants AI in every workflow — but no one will sign off on answers they can’t explain to the board, auditors, or customers.',
    pain: 'The blocker isn’t data volume. It’s whether anyone trusts the answer.',
    pairId: 'ai-governance',
    atom: 'source',
  },
  {
    id: 'metric-ontology',
    experience: 'technical',
    group: 'Technical',
    subGroup: 'Technical',
    category: 'Metric ontology',
    tools: 'Lightweight data modeling integration via Duo Data agents',
    purpose: 'Connect context quality to AI outcomes.',
    pairId: 'business-meaning',
    atom: 'metric',
  },
  {
    id: 'ai-governance',
    experience: 'technical',
    group: 'Technical',
    subGroup: 'Technical',
    category: 'AI governance',
    tools: 'Governed business context for models and agents',
    purpose: 'Explain why AI needs governed business context.',
    pairId: 'ai-business-question',
    atom: 'source',
  },
  {
    id: 'semantic-layer',
    experience: 'technical',
    group: 'Technical',
    subGroup: 'Technical',
    category: 'Semantic layer',
    tools: 'Integration agents / layer',
    purpose: 'Explain the category and concept.',
    pairId: 'context-rot',
    atom: 'report',
  },
  {
    id: 'data-lineage',
    experience: 'technical',
    group: 'Technical',
    subGroup: 'Technical',
    category: 'Data lineage',
    tools: 'Lineage and governance',
    purpose: 'Explain traceability and accountability.',
    pairId: 'context-slip',
    atom: 'source',
  },
  {
    id: 'ai-reliability',
    experience: 'technical',
    group: 'Technical',
    subGroup: 'Technical',
    category: 'AI reliability',
    tools: 'MCP, platform-native apps',
    purpose: 'Connect context quality to AI outcomes.',
    pairId: 'context-drift',
    atom: 'slice',
  },
];

export const BUSINESS_TOPIC_ROWS = EXPERIENCE_TAXONOMY.filter((row) => row.experience === 'business');
export const TECHNICAL_TOPIC_ROWS = EXPERIENCE_TAXONOMY.filter((row) => row.experience === 'technical');

export const taxonomyById = (id) => EXPERIENCE_TAXONOMY.find((row) => row.id === id);

export const pairOf = (row) => taxonomyById(row?.pairId);

const GROUP_ANCHORS = {
  Purpose: 'purpose',
  'Metric consistency': 'metric-consistency',
  Clarity: 'clarity',
  AI: 'business-ai',
};

export const BUSINESS_TOPIC_GROUPS = BUSINESS_TOPIC_ROWS.reduce((groups, row) => {
  const last = groups[groups.length - 1];
  if (!last || last.subGroup !== row.subGroup) {
    groups.push({
      id: GROUP_ANCHORS[row.subGroup] || row.subGroup.toLowerCase().replace(/\s+/g, '-'),
      subGroup: row.subGroup,
      items: [row],
    });
  } else {
    last.items.push(row);
  }
  return groups;
}, []);
