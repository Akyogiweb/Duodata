import {
  DEFAULT_JOURNEY_ID,
  JOURNEY_NODES,
  VALUE_LAYERS,
  ancestorsOf,
  childrenOf,
  journeyById,
  layerById,
  visibleJourneyIds,
} from './journeyProposition';

describe('journey proposition', () => {
  test('covers pre-sales, product, and post-sales plus a living model root', () => {
    const stages = new Set(JOURNEY_NODES.map((node) => node.stage));
    expect(stages).toEqual(new Set(['model', 'pre-sales', 'product', 'post-sales']));
  });

  test('every question maps to a value-proposition layer and an atom part', () => {
    const layerIds = VALUE_LAYERS.map((layer) => layer.id);
    JOURNEY_NODES.forEach((node) => {
      expect(layerIds).toContain(node.layer);
      expect(['metric', 'slice', 'report', 'source']).toContain(node.atom);
      expect(node.pain).toBeTruthy();
      expect(node.change).toBeTruthy();
      expect(node.short.length).toBeLessThan(28);
    });
  });

  test('the default path drills post-sales to a loyalty decision', () => {
    const chain = ancestorsOf(DEFAULT_JOURNEY_ID).map((node) => node.id);
    expect(chain[0]).toBe('grow');
    expect(chain).toContain('post-sales');
    expect(chain).toContain('win-back');
    expect(visibleJourneyIds(DEFAULT_JOURNEY_ID).has('loyalty')).toBe(true);
    expect(visibleJourneyIds(DEFAULT_JOURNEY_ID).has('behaviour')).toBe(true);
    expect(visibleJourneyIds('pre-sales').has('pipeline-real')).toBe(true);
    expect(visibleJourneyIds('pre-sales').has('loyalty')).toBe(false);
  });

  test('tree edges resolve and layers have Duo copy', () => {
    JOURNEY_NODES.filter((node) => node.parent).forEach((node) => {
      expect(journeyById(node.parent)).toBeTruthy();
    });
    expect(childrenOf('grow')).toHaveLength(3);
    expect(VALUE_LAYERS).toHaveLength(5);
    VALUE_LAYERS.forEach((layer) => {
      expect(layerById(layer.id).enables).toBeTruthy();
    });
  });
});
