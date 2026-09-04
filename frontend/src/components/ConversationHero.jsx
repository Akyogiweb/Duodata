import React, { useMemo, useState } from 'react';
import { Plus, Mic, ChevronDown, ArrowUp } from 'lucide-react';
import { FEATURE_CONNECTIONS } from '@/data/featureConnections';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';

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
  },
];

const ConversationHero = () => {
  const { openExperience } = useExperience();
  const [query, setQuery] = useState('');
  const [activeId, setActiveId] = useState(null);

  const active = useMemo(
    () => CONVERSATIONS.find((c) => c.id === activeId) || null,
    [activeId]
  );

  const ask = (text) => {
    const raw = (typeof text === 'string' ? text : query).trim();
    const match =
      CONVERSATIONS.find((c) => c.question.toLowerCase() === raw.toLowerCase()) ||
      CONVERSATIONS.find((c) => raw.toLowerCase().includes('moic')) ||
      CONVERSATIONS.find((c) => raw.toLowerCase().includes('trust')) ||
      CONVERSATIONS.find((c) => raw.toLowerCase().includes('feedback') || raw.toLowerCase().includes('recommend')) ||
      CONVERSATIONS.find((c) => raw.toLowerCase().includes('sell') || raw.toLowerCase().includes('customer')) ||
      CONVERSATIONS[0];
    setQuery(match.question);
    setActiveId(match.id);
  };

  const openTechnical = () => {
    const pair = FEATURE_CONNECTIONS.find((p) => p.conversationId === activeId) || FEATURE_CONNECTIONS[0];
    openExperience(EXPERIENCES.technical, pair.technicalSection);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ask();
  };

  return (
    <div className="gemini-ask" data-testid="home-business-conversation">
      <div className="gemini-glow" aria-hidden />
      <h1 className="gemini-heading">Ask the number. Trust the meaning.</h1>
      <form className="gemini-bar" onSubmit={onSubmit}>
        <button
          type="button"
          className="gemini-icon-btn"
          aria-label="Suggested questions"
          onClick={() => ask(CONVERSATIONS[0].question)}
        >
          <Plus size={20} strokeWidth={1.75} />
        </button>
        <label htmlFor="duo-ask" className="sr-only">
          Ask Duo Data
        </label>
        <input
          id="duo-ask"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask Duo Data"
          className="gemini-input"
          autoComplete="off"
        />
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
          aria-label="Ask Duo Data"
        >
          <ArrowUp size={18} strokeWidth={2.2} />
        </button>
      </form>

      <div className="gemini-chips">
        {CONVERSATIONS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => ask(c.question)}
            className={`gemini-chip ${activeId === c.id ? 'is-active' : ''}`}
          >
            {c.chip}
          </button>
        ))}
      </div>

      {active && (
        <div className="gemini-answer" data-testid="home-conversation-answer">
          <h3 className="text-[18px] md:text-[20px] font-semibold text-slate-950 mb-3">{active.answerTitle}</h3>
          <p className="text-[13px] text-slate-500 mb-2">The primary drivers were:</p>
          <ul className="space-y-2 mb-5">
            {active.bullets.map((b) => (
              <li key={b} className="text-[14px] text-slate-800 flex gap-2">
                <span className="text-[#1E5FEE] mt-0.5">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] font-medium">
            <button type="button" onClick={openTechnical} className="text-[#1E5FEE] hover:underline">
              See calculation
            </button>
            <button type="button" onClick={openTechnical} className="text-[#1E5FEE] hover:underline">
              See sources
            </button>
            <button type="button" onClick={openTechnical} className="text-[#1E5FEE] hover:underline">
              See lineage
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationHero;
