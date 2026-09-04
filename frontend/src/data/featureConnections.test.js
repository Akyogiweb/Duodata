import { FEATURE_CONNECTIONS, GET_STARTED_STEPS, SITE_FAQS } from './featureConnections';

describe('feature connections', () => {
  test('pairs every business question with a technical section', () => {
    expect(FEATURE_CONNECTIONS).toHaveLength(4);
    FEATURE_CONNECTIONS.forEach((pair) => {
      expect(pair.businessQuestion).toBeTruthy();
      expect(pair.technicalQuestion).toBeTruthy();
      expect(pair.businessSection).toBeTruthy();
      expect(pair.technicalSection).toBeTruthy();
      expect(pair.slug).toBeTruthy();
    });
  });

  test('get-started walkthrough has five steps', () => {
    expect(GET_STARTED_STEPS).toHaveLength(5);
    GET_STARTED_STEPS.forEach((step) => {
      expect(step.business).toBeTruthy();
      expect(step.technical).toBeTruthy();
    });
  });

  test('faq covers getting started and the nav switcher', () => {
    expect(SITE_FAQS.length).toBeGreaterThanOrEqual(4);
    expect(SITE_FAQS.some((item) => /get started/i.test(item.q))).toBe(true);
    expect(SITE_FAQS.some((item) => /switch/i.test(item.q) || /switch/i.test(item.a))).toBe(true);
  });
});
