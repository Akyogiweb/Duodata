import React from 'react';
import { BUSINESS_TOPIC_GROUPS, TECHNICAL_TOPIC_ROWS } from '@/data/experienceTaxonomy';
import { useExperience } from '@/context/ExperienceContext';

const TopicSection = ({ row }) => (
  <article className="topic-section" id={row.id} data-testid={`topic-${row.id}`}>
    <p className="topic-section-kicker">
      {row.group === row.subGroup ? row.group : `${row.group} — ${row.subGroup}`}
    </p>
    <h3 className="hero-headline topic-section-title">{row.category}</h3>
    <p className="topic-section-purpose">{row.purpose}</p>
    {row.tools ? (
      <p className="topic-card-tools">
        <span className="topic-card-tools-label">Tool feature</span>
        {row.tools}
      </p>
    ) : null}
  </article>
);

const BusinessTopics = () => (
  <div>
    <header className="max-w-3xl mb-10">
      <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Business experience</p>
      <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950">
        A section for every job the business needs to do.
      </h2>
      <p className="mt-5 text-slate-600 text-[15px] leading-relaxed">
        Seven sections from the product table: purpose, metric consistency, clarity, and AI.
      </p>
    </header>
    <nav className="experience-topics-nav" aria-label="Business topics">
      {BUSINESS_TOPIC_GROUPS.map((group) => (
        <a key={group.id} href={`#${group.id}`} className="experience-topics-nav-link">
          {group.subGroup}
        </a>
      ))}
    </nav>
    <div className="flex flex-col gap-10">
      {BUSINESS_TOPIC_GROUPS.map((group) => (
        <section key={group.id} id={group.id} className="experience-topic-group" data-testid={`topic-group-${group.id}`}>
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-5">
            Business — {group.subGroup}
          </p>
          <div className="flex flex-col gap-5">
            {group.items.map((row) => (
              <TopicSection key={row.id} row={row} />
            ))}
          </div>
        </section>
      ))}
    </div>
  </div>
);

const TechnicalTopics = () => (
  <div>
    <header className="max-w-3xl mb-10">
      <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Technical experience</p>
      <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950">
        A section for every layer you ship.
      </h2>
      <p className="mt-5 text-slate-600 text-[15px] leading-relaxed">
        Five sections from the product table: ontology, AI governance, semantic layer, lineage, and reliability.
      </p>
    </header>
    <nav className="experience-topics-nav" aria-label="Technical topics">
      {TECHNICAL_TOPIC_ROWS.map((row) => (
        <a key={row.id} href={`#${row.id}`} className="experience-topics-nav-link">
          {row.category}
        </a>
      ))}
    </nav>
    <div className="flex flex-col gap-5">
      {TECHNICAL_TOPIC_ROWS.map((row) => (
        <TopicSection key={row.id} row={row} />
      ))}
    </div>
  </div>
);

const ExperienceTopics = () => {
  const { isBusiness } = useExperience();

  return (
    <section id="experience" className="experience-topics py-24 md:py-32" data-testid="home-experience-topics">
      <div className="max-w-[1200px] mx-auto px-6">
        {isBusiness ? <BusinessTopics /> : <TechnicalTopics />}
      </div>
    </section>
  );
};

export default ExperienceTopics;
