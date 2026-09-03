import React, { useMemo, useState } from 'react';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';

export const CONVERSATIONS = [
  {
    id: 'moic',
    question: 'What is driving the change in MOIC this quarter?',
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
    answerTitle: 'Win rate improves when the story matches the buyer’s definition of success.',
    bullets: [
      'Enterprise buyers ask about trust and ownership of the number',
      'Growth buyers ask how quickly meaning reaches the product and the customer',
      'One shared definition lets every team speak with the same intelligence',
    ],
  },
];

const ConversationHero = () => {
  const { setExperience } = useExperience();
  const [query, setQuery] = useState(CONVERSATIONS[0].question);
  const [activeId, setActiveId] = useState(null);

  const active = useMemo(
    () => CONVERSATIONS.find((c) => c.id === activeId) || null,
    [activeId]
  );

  const ask = (text) => {
    const match =
      CONVERSATIONS.find((c) => c.question.toLowerCase() === (text || query).trim().toLowerCase()) ||
      CONVERSATIONS.find((c) => (text || query).toLowerCase().includes('moic')) ||
      CONVERSATIONS.find((c) => (text || query).toLowerCase().includes('trust')) ||
      CONVERSATIONS.find((c) => (text || query).toLowerCase().includes('feedback') || (text || query).toLowerCase().includes('recommend')) ||
      CONVERSATIONS.find((c) => (text || query).toLowerCase().includes('sell') || (text || query).toLowerCase().includes('customer')) ||
      CONVERSATIONS[0];
    setQuery(match.question);
    setActiveId(match.id);
  };

  const openTechnical = () => {
    setExperience(EXPERIENCES.technical);
    const el = document.getElementById('product');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="w-full max-w-[640px] mx-auto space-y-4" data-testid="home-business-conversation">
      <div className="conversation-card">
        <p className="text-[11px] tracking-[0.22em] uppercase text-slate-500 font-medium mb-3">
          Ask about your business
        </p>
        <label htmlFor="duo-ask" className="sr-only">
          Ask Duo Data
        </label>
        <textarea
          id="duo-ask"
          rows={3}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full resize-none bg-transparent text-[16px] md:text-[18px] text-slate-900 leading-relaxed outline-none"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="pill-btn-dark"
            data-testid="home-ask-duo-data"
            onClick={() => ask()}
          >
            Ask Duo Data
          </button>
        </div>
      </div>

      {active && (
        <div className="conversation-card conversation-answer" data-testid="home-conversation-answer">
          <h3 className="text-[18px] md:text-[20px] font-semibold text-slate-950 mb-4">{active.answerTitle}</h3>
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

      <div className="flex flex-wrap gap-2 justify-center pt-1">
        {CONVERSATIONS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => ask(c.question)}
            className={`text-[12px] px-3 py-1.5 rounded-full border transition-colors ${
              activeId === c.id
                ? 'border-[#1E5FEE] text-[#1E5FEE] bg-blue-50'
                : 'border-black/10 text-slate-600 hover:border-black/25'
            }`}
          >
            {c.id === 'moic' ? 'MOIC this quarter' : c.id === 'trust' ? 'Can I trust this number?' : c.id === 'feedback' ? 'Post-purchase next step' : 'Sell to a diverse mix'}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConversationHero;
