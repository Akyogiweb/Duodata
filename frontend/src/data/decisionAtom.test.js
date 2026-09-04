import { DECISION_ATOM } from './decisionAtom';
import { EXPERIENCE_TAXONOMY } from './experienceTaxonomy';

describe('decision atom', () => {
  test('has four governed parts', () => {
    expect(DECISION_ATOM.map((p) => p.id)).toEqual(['metric', 'slice', 'report', 'source']);
    DECISION_ATOM.forEach((part) => {
      expect(part.businessTopic).toBeTruthy();
      expect(part.technicalTopic).toBeTruthy();
      expect(part.tag).toBeTruthy();
    });
  });

  test('each part connects to real business and technical taxonomy rows', () => {
    DECISION_ATOM.forEach((part) => {
      const business = EXPERIENCE_TAXONOMY.find((row) => row.id === part.businessTopic);
      const technical = EXPERIENCE_TAXONOMY.find((row) => row.id === part.technicalTopic);
      expect(business?.experience).toBe('business');
      expect(technical?.experience).toBe('technical');
      expect(business?.atom).toBe(part.id);
      expect(technical?.atom).toBe(part.id);
    });
  });
});
