import { BUSINESS_TOPIC_ROWS, EXPERIENCE_TAXONOMY, TECHNICAL_TOPIC_ROWS } from './experienceTaxonomy';

/** Exact rows from the product sheet (normalized spelling). */
const SHEET = [
  ['business', 'Purpose', 'Business meaning, definition, and goal', 'Metric ontology — metrics, slices, reports, and sources', 'Explain conflicting definitions across teams.'],
  ['business', 'Metric consistency', 'Context rot', 'Governance platform', 'Explain how business context degrades over time.'],
  ['business', 'Metric consistency', 'Context slip', 'Governance platform', 'Explain how small definition changes create downstream errors.'],
  ['business', 'Clarity', 'Metric governance', 'Governance', 'Establish why metrics need ownership and controls.'],
  ['business', 'AI', 'Context drift', 'Value driver and governance', 'Explain how business context degrades over time.'],
  ['business', 'AI', 'Institutional knowledge and tenure-proof data', 'Metric ontology', 'Reduce the dependency on experienced employees. Document the organization’s knowledge beyond individuals.'],
  ['business', 'AI', 'AI business question and context', 'Value driver, lineage', 'Give AI the business question and the governed context it needs — tied to value drivers and lineage.'],
  ['technical', 'Technical', 'Metric ontology', 'Lightweight data modeling integration via Duo Data agents', 'Connect context quality to AI outcomes.'],
  ['technical', 'Technical', 'AI governance', 'Governed business context for models and agents', 'Explain why AI needs governed business context.'],
  ['technical', 'Technical', 'Semantic layer', 'Integration agents / layer', 'Explain the category and concept.'],
  ['technical', 'Technical', 'Data lineage', 'Lineage and governance', 'Explain traceability and accountability.'],
  ['technical', 'Technical', 'AI reliability', 'MCP, platform-native apps', 'Connect context quality to AI outcomes.'],
];

describe('experience taxonomy cross-check', () => {
  test('has 7 business rows and 5 technical rows', () => {
    expect(BUSINESS_TOPIC_ROWS).toHaveLength(7);
    expect(TECHNICAL_TOPIC_ROWS).toHaveLength(5);
    expect(EXPERIENCE_TAXONOMY).toHaveLength(12);
  });

  test('every sheet row is present with category, tools, and purpose', () => {
    const actual = EXPERIENCE_TAXONOMY.map((row) => [
      row.experience,
      row.subGroup,
      row.category,
      row.tools,
      row.purpose,
    ]);
    expect(actual).toEqual(SHEET);
  });

  test('every row has a unique section id', () => {
    const ids = EXPERIENCE_TAXONOMY.map((row) => row.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('every row pairs to the other experience and an atom part', () => {
    EXPERIENCE_TAXONOMY.forEach((row) => {
      const pair = EXPERIENCE_TAXONOMY.find((item) => item.id === row.pairId);
      expect(pair).toBeTruthy();
      expect(pair.experience).not.toBe(row.experience);
      expect(['metric', 'slice', 'report', 'source']).toContain(row.atom);
    });
  });
});
