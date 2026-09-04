import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Mic, ChevronDown, ArrowUp } from 'lucide-react';

export const CONVERSATIONS = [
  {
    id: 'moic',
    question: 'What is driving the change in MOIC this quarter?',
    chip: 'MOIC this quarter',
    answerTitle: 'MOIC increased 0.4x this quarter',
    bullets: [
      'EBITDA multiple ↑',
      'Net leverage ratio ↓',
      'Invested capital remained relatively stable',
    ],
    details: {
      calculation: 'MOIC = Total Value ÷ Invested Capital, using the definition your investment committee approved.',
      sources: 'Portfolio valuation system and fund accounting — the same sources in your Q2 board pack.',
      ownership: 'Investment committee · Approved for executive reporting',
    },
  },
  {
    id: 'trust',
    question: 'Can I trust this number, and do I understand what it means?',
    chip: 'Can I trust this number?',
    answerTitle: 'Yes — this number is owned, calculated, and used the same way everywhere.',
    bullets: [
      'Owned by the investment committee with a named business owner',
      'Calculated as Total Value ÷ Invested Capital',
      'Used in the Q2 board pack, LP report, and portfolio review',
    ],
    details: {
      calculation: 'One agreed formula — not three versions hiding in different dashboards.',
      sources: 'Every report that uses this metric points back to the same definition.',
      ownership: 'A named owner stands behind the number when it changes.',
    },
  },
  {
    id: 'feedback',
    question: 'What should we recommend next from post-purchase feedback?',
    chip: 'Post-purchase next step',
    answerTitle: 'Customers are asking for faster onboarding — that is the highest-confidence next move.',
    bullets: [
      'Support tickets and NPS comments cluster around time-to-value',
      'Accounts with a guided first week renew at a higher rate',
      'Sales can now lead with the same recommendation the product team is shipping',
    ],
    details: {
      calculation: 'Recommendation strength comes from feedback volume, renewal lift, and segment fit.',
      sources: 'Post-purchase surveys, support tickets, and customer success notes.',
      ownership: 'Customer success · Shared with product and sales',
    },
  },
  {
    id: 'sales',
    question: 'How should we sell to a more diverse customer mix this quarter?',
    chip: 'Sell to a diverse mix',
    answerTitle: 'Win rate improves when the story matches the buyer’s definition of success.',
    bullets: [
      'Enterprise buyers ask about trust and ownership of the number',
      'Growth buyers ask how quickly meaning reaches the product and the customer',
      'One shared definition lets every team speak with the same intelligence',
    ],
    details: {
      calculation: 'Pipeline and win-rate views use the same customer and revenue definitions.',
      sources: 'CRM, finance, and product usage — aligned to one customer story.',
      ownership: 'Sales leadership · Aligned with finance and product',
    },
  },
];

const TYPE_MS = 34;
const PAUSE_BEFORE_ANSWER = 500;
const ANSWER_HOLD = 4200;
const GAP_BETWEEN = 600;

const ConversationHero = () => {
  const [cycleIndex, setCycleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [phase, setPhase] = useState('typing');
  const [isAuto, setIsAuto] = useState(true);
  const [manualQuery, setManualQuery] = useState('');
  const [detailKey, setDetailKey] = useState(null);
  const charIndex = useRef(0);

  const active = useMemo(
    () => CONVERSATIONS[cycleIndex] || CONVERSATIONS[0],
    [cycleIndex]
  );

  const showAnswer = phase === 'answer';

  useEffect(() => {
    if (!isAuto) return undefined;

    const question = CONVERSATIONS[cycleIndex].question;

    if (phase === 'typing') {
      charIndex.current = 0;
      setTypedText('');
      setDetailKey(null);

      const timer = window.setInterval(() => {
        charIndex.current += 1;
        setTypedText(question.slice(0, charIndex.current));
        if (charIndex.current >= question.length) {
          window.clearInterval(timer);
          window.setTimeout(() => setPhase('answer'), PAUSE_BEFORE_ANSWER);
        }
      }, TYPE_MS);

      return () => window.clearInterval(timer);
    }

    if (phase === 'answer') {
      const timer = window.setTimeout(() => setPhase('gap'), ANSWER_HOLD);
      return () => window.clearTimeout(timer);
    }

    if (phase === 'gap') {
      const timer = window.setTimeout(() => {
        setCycleIndex((i) => (i + 1) % CONVERSATIONS.length);
        setPhase('typing');
      }, GAP_BETWEEN);
      return () => window.clearTimeout(timer);
    }

    return undefined;
  }, [phase, cycleIndex, isAuto]);

  const selectConversation = (conv) => {
    const index = CONVERSATIONS.findIndex((c) => c.id === conv.id);
    setIsAuto(false);
    setCycleIndex(index >= 0 ? index : 0);
    setManualQuery(conv.question);
    setTypedText(conv.question);
    setPhase('answer');
    setDetailKey(null);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const raw = (isAuto ? active.question : manualQuery).trim();
    const match =
      CONVERSATIONS.find((c) => c.question.toLowerCase() === raw.toLowerCase()) ||
      CONVERSATIONS[0];
    selectConversation(match);
  };

  const kicker = active.id === 'moic' ? 'The primary drivers were:' : 'What this means:';

  const detailLabels = {
    calculation: 'See calculation',
    sources: 'See sources',
    ownership: 'See who owns it',
  };

  return (
    <div className="gemini-ask gemini-ask-hero" data-testid="home-business-conversation">
      <p className="gemini-eyebrow">Ask about your business</p>
      <h1 className="gemini-heading">
        Understand your business data.<br />
        <span className="gemini-heading-accent">Ask better questions.</span>
      </h1>

      <form className="gemini-bar" onSubmit={onSubmit}>
        <button
          type="button"
          className="gemini-icon-btn"
          aria-label="Suggested questions"
          onClick={() => selectConversation(CONVERSATIONS[0])}
        >
          <Plus size={20} strokeWidth={1.75} />
        </button>
        <label htmlFor="duo-ask" className="sr-only">
          Ask Duodata
        </label>
        <div
          className="gemini-input-wrap"
          onClick={() => {
            if (isAuto) {
              setIsAuto(false);
              setManualQuery(active.question);
            }
          }}
        >
          {isAuto ? (
            <div
              className="gemini-input gemini-input-typed"
              aria-live="polite"
              data-testid="home-ask-input"
            >
              {typedText ? (
                <span className="gemini-input-text">{typedText}</span>
              ) : (
                <span className="gemini-input-placeholder">Ask Duodata a business question…</span>
              )}
              {phase === 'typing' && <span className="gemini-cursor" aria-hidden />}
            </div>
          ) : (
            <input
              id="duo-ask"
              type="text"
              value={manualQuery}
              onChange={(e) => setManualQuery(e.target.value)}
              onFocus={() => setIsAuto(false)}
              placeholder="Ask Duodata a business question…"
              className="gemini-input"
              autoComplete="off"
              data-testid="home-ask-input"
            />
          )}
        </div>
        <span className="gemini-mode" title="Business experience">
          Trusted
          <ChevronDown size={14} strokeWidth={2} />
        </span>
        <button type="button" className="gemini-icon-btn" aria-label="Voice input (coming soon)" disabled>
          <Mic size={18} strokeWidth={1.75} />
        </button>
        <button
          type="submit"
          className="gemini-send"
          data-testid="home-ask-duo-data"
          aria-label="Ask Duodata"
        >
          <ArrowUp size={18} strokeWidth={2.2} />
        </button>
      </form>

      <div className="gemini-chips">
        {CONVERSATIONS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => selectConversation(c)}
            className={`gemini-chip ${active.id === c.id && showAnswer ? 'is-active' : ''}`}
          >
            {c.chip}
          </button>
        ))}
      </div>

      {showAnswer && (
        <div className="gemini-answer gemini-answer-pop" data-testid="home-conversation-answer">
          <p className="gemini-answer-question">{active.question}</p>
          <h3 className="gemini-answer-title">{active.answerTitle}</h3>
          <p className="gemini-answer-kicker">{kicker}</p>
          <ul className="gemini-answer-list">
            {active.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="gemini-answer-links">
            {Object.entries(detailLabels).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setDetailKey(detailKey === key ? null : key)}
                className={detailKey === key ? 'is-active' : ''}
              >
                {label}
              </button>
            ))}
          </div>
          {detailKey && active.details?.[detailKey] && (
            <p className="gemini-answer-detail">{active.details[detailKey]}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ConversationHero;
