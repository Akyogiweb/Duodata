/**
 * Source of truth for landing experience sections.
 * Rows match the product table: Group, Sub Group, Category, Tool Feature, Purpose.
 * pairId is the counterpart section in the other experience.
 * atom is Metric | Slice | Report | Source on the Decision Atom.
 */
export const EXPERIENCE_TAXONOMY = [
  {
    id: 'business-meaning',
    experience: 'business',
    group: 'Business',
    subGroup: 'Purpose',
    category: 'Business meaning, definition, and goal',
    tools: 'Metric ontology — metrics, slices, reports, and sources',
    purpose: 'Explain conflicting definitions across teams.',
    pairId: 'metric-ontology',
    atom: 'metric',
  },
  {
    id: 'context-rot',
    experience: 'business',
    group: 'Business',
    subGroup: 'Metric consistency',
    category: 'Context rot',
    tools: 'Governance platform',
    purpose: 'Explain how business context degrades over time.',
    pairId: 'semantic-layer',
    atom: 'report',
  },
  {
    id: 'context-slip',
    experience: 'business',
    group: 'Business',
    subGroup: 'Metric consistency',
    category: 'Context slip',
    tools: 'Governance platform',
    purpose: 'Explain how small definition changes create downstream errors.',
    pairId: 'data-lineage',
    atom: 'source',
  },
  {
    id: 'metric-governance',
    experience: 'business',
    group: 'Business',
    subGroup: 'Clarity',
    category: 'Metric governance',
    tools: 'Governance',
    purpose: 'Establish why metrics need ownership and controls.',
    pairId: 'metric-ontology',
    atom: 'metric',
  },
  {
    id: 'context-drift',
    experience: 'business',
    group: 'Business',
    subGroup: 'AI',
    category: 'Context drift',
    tools: 'Value driver and governance',
    purpose: 'Explain how business context degrades over time.',
    pairId: 'ai-reliability',
    atom: 'slice',
  },
  {
    id: 'institutional-knowledge',
    experience: 'business',
    group: 'Business',
    subGroup: 'AI',
    category: 'Institutional knowledge and tenure-proof data',
    tools: 'Metric ontology',
    purpose:
      'Reduce the dependency on experienced employees. Document the organization’s knowledge beyond individuals.',
    pairId: 'semantic-layer',
    atom: 'report',
  },
  {
    id: 'ai-business-question',
    experience: 'business',
    group: 'Business',
    subGroup: 'AI',
    category: 'AI business question and context',
    tools: 'Value driver, lineage',
    purpose: 'Give AI the business question and the governed context it needs — tied to value drivers and lineage.',
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
