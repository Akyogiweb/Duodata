import { useEffect, useState } from 'react';
import { FEATURE_CONNECTIONS } from '../data/featureConnections';

export default function QuestionCycle({ experience }) {
  const isTech = experience === 'technical';
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [experience]);

  useEffect(() => {
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % FEATURE_CONNECTIONS.length);
    }, 4500);
    return () => window.clearInterval(t);
  }, []);

  const item = FEATURE_CONNECTIONS[active];
  const lead = isTech ? item.technicalQuestion : item.businessQuestion;

  return (
    <div className="question-rail" data-testid="home-question-rail">
      <p className="question-rail-kicker">
        {isTech ? 'Questions the stack answers' : 'Questions the business asks'}
      </p>
      <p className="question-rail-lead">{lead}</p>
      <div className="question-rail-row">
        {FEATURE_CONNECTIONS.map((pair, i) => (
          <button
            key={pair.id}
            type="button"
            className={i === active ? 'is-active' : ''}
            onClick={() => setActive(i)}
            data-testid={`home-question-${pair.id}`}
          >
            {isTech ? pair.technicalQuestion : pair.businessQuestion}
          </button>
        ))}
      </div>
    </div>
  );
}
