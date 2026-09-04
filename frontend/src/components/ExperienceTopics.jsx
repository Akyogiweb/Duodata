import React from 'react';
import { businessExperienceGroups, technicalExperienceTopics } from '@/mock';
import { useExperience } from '@/context/ExperienceContext';

const TopicCard = ({ item }) => (
  <article className="topic-card" id={item.id} data-testid={`topic-${item.id}`}>
    <h3 className="topic-card-title">{item.category}</h3>
    <p className="topic-card-purpose">{item.purpose}</p>
    <p className="topic-card-tools">
      <span className="topic-card-tools-label">In Duo Data</span>
      {item.tools}
    </p>
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
        Purpose, consistency, clarity, and AI — each with the category, the Duo Data capability, and why it exists.
      </p>
    </header>
    <nav className="experience-topics-nav" aria-label="Business topics">
      {businessExperienceGroups.map((group) => (
        <a key={group.id} href={`#${group.id}`} className="experience-topics-nav-link">
          {group.subGroup}
        </a>
      ))}
    </nav>
    <div className="flex flex-col gap-16 md:gap-20">
      {businessExperienceGroups.map((group) => (
        <section key={group.id} id={group.id} className="experience-topic-group" data-testid={`topic-group-${group.id}`}>
          <div className="max-w-2xl mb-8">
            <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">{group.kicker}</p>
            <h3 className="hero-headline text-[28px] md:text-[36px] text-slate-950">{group.title}</h3>
            <p className="mt-3 text-slate-600 text-[15px] leading-relaxed">{group.lede}</p>
          </div>
          <div className={`grid grid-cols-1 ${group.items.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-5`}>
            {group.items.map((item) => (
              <TopicCard key={item.id} item={item} />
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
        Ontology, AI governance, the semantic layer, lineage, and reliability — each mapped to Duo Data agents, integrations, and platform apps.
      </p>
    </header>
    <nav className="experience-topics-nav" aria-label="Technical topics">
      {technicalExperienceTopics.map((item) => (
        <a key={item.id} href={`#${item.id}`} className="experience-topics-nav-link">
          {item.category}
        </a>
      ))}
    </nav>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {technicalExperienceTopics.map((item) => (
        <TopicCard key={item.id} item={item} />
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
