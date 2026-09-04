import React from 'react';
import { BUSINESS_TOPIC_GROUPS, TECHNICAL_TOPIC_ROWS, pairOf } from '@/data/experienceTaxonomy';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import { ArrowRight } from 'lucide-react';

const ONTOLOGY = ['Metrics', 'Slices', 'Reports', 'Sources'];

const Stage = ({ id }) => {
  if (id === 'business-meaning') {
    return (
      <div className="stage-bento">
        {ONTOLOGY.map((name) => (
          <div key={name} className="stage-bento-cell">
            <span>{name}</span>
            <em>Shared</em>
          </div>
        ))}
      </div>
    );
  }
  if (id === 'context-rot') {
    return (
      <div className="stage-meter">
        <p>Context health</p>
        <div className="stage-meter-track">
          <span className="stage-meter-fill is-rot" />
        </div>
        <ol>
          <li>Owned last quarter</li>
          <li>Used in three reports</li>
          <li className="is-fade">Definition unread this year</li>
        </ol>
      </div>
    );
  }
  if (id === 'context-slip') {
    return (
      <div className="stage-diff">
        <div>
          <span>v2.1</span>
          <code>revenue = booked</code>
        </div>
        <div className="is-alert">
          <span>v2.2</span>
          <code>revenue = booked − returns</code>
        </div>
        <p>One silent change. Twelve broken dashboards.</p>
      </div>
    );
  }
  if (id === 'metric-governance') {
    return (
      <div className="stage-owner">
        <div className="stage-owner-row">
          <span className="stage-avatar">IC</span>
          <div>
            <strong>MOIC</strong>
            <em>Investment committee · Approved</em>
          </div>
          <span className="stage-lock">Owned</span>
        </div>
        <div className="stage-owner-row is-muted">
          <span className="stage-avatar">CS</span>
          <div>
            <strong>Net retention</strong>
            <em>Customer success · Review</em>
          </div>
          <span className="stage-lock">Control</span>
        </div>
      </div>
    );
  }
  if (id === 'context-drift') {
    return (
      <div className="stage-drift">
        <span>Q1 meaning</span>
        <i />
        <span>Q2 questions</span>
        <i />
        <span className="is-warn">Ungoverned AI</span>
      </div>
    );
  }
  if (id === 'institutional-knowledge') {
    return (
      <div className="stage-tenure">
        <div className="is-out">In someone’s head</div>
        <div className="is-in">In the organization</div>
      </div>
    );
  }
  if (id === 'ai-business-question') {
    return (
      <div className="stage-ask">
        <p>“What changed MOIC — and can I trust it?”</p>
        <small>Named owner · Agreed definition · Board-ready answer</small>
      </div>
    );
  }
  if (id === 'metric-ontology') {
    return (
      <pre className="stage-code">{`agent.model({
  metric: "MOIC",
  from: ["slices", "reports", "sources"]
})`}</pre>
    );
  }
  if (id === 'ai-governance') {
    return (
      <div className="stage-policy">
        <span className="ok">allow</span> governed context
        <span className="no">deny</span> guessed schema
      </div>
    );
  }
  if (id === 'semantic-layer') {
    return (
      <div className="stage-layer">
        <em>Business meaning</em>
        <b />
        <em>Integration agents</em>
        <b />
        <em>Snowflake · dbt · BI</em>
      </div>
    );
  }
  if (id === 'data-lineage') {
    return (
      <div className="stage-lineage">
        define → formula → source → ship
      </div>
    );
  }
  if (id === 'ai-reliability') {
    return (
      <div className="stage-mcp">
        <kbd>MCP</kbd>
        <kbd>Native apps</kbd>
        <kbd>Same objects</kbd>
      </div>
    );
  }
  return null;
};

const TopicSection = ({ row, index }) => {
  const n = String(index + 1).padStart(2, '0');
  const { openExperience } = useExperience();
  const pair = pairOf(row);
  const nextExperience = row.experience === 'business' ? EXPERIENCES.technical : EXPERIENCES.business;

  return (
    <article className="topic-section chapter" id={row.id} data-testid={`topic-${row.id}`}>
      <div className="chapter-index" aria-hidden>
        {n}
      </div>
      <div className="chapter-copy">
        <p className="topic-section-kicker">
          {row.group === row.subGroup ? row.group : `${row.group} — ${row.subGroup}`}
          {row.atom ? <span className="topic-atom-tag">{row.atom}</span> : null}
        </p>
        <h3 className="topic-section-title">{row.category}</h3>
        <p className="topic-section-purpose">{row.purpose}</p>
        {row.experience === 'business' && row.pain ? (
          <p className="topic-section-pain">
            <span className="topic-card-tools-label">What it costs</span>
            {row.pain}
          </p>
        ) : null}
        {row.experience === 'technical' && row.tools ? (
          <p className="topic-card-tools">
            <span className="topic-card-tools-label">Tool feature</span>
            {row.tools}
          </p>
        ) : null}
        {pair && row.experience !== 'business' ? (
          <button
            type="button"
            className="topic-pair-link"
            data-testid={`topic-pair-${row.id}`}
            onClick={() => openExperience(nextExperience, pair.id)}
          >
            {row.experience === 'business' ? 'Technical connection' : 'Business connection'}
            <span>{pair.category}</span>
            <ArrowRight size={14} />
          </button>
        ) : null}
      </div>
      <div className="chapter-stage" aria-hidden>
        <Stage id={row.id} />
      </div>
    </article>
  );
};

const BusinessTopics = () => {
  let n = 0;
  return (
    <div>
      <header className="chapter-head">
        <p>What leaders feel</p>
        <h2>Seven pains. One root cause.</h2>
        <p className="chapter-lede">
          Misaligned meaning shows up everywhere — in meetings, in reports, in AI answers, and in the decisions that follow.
        </p>
      </header>
      <nav className="experience-topics-nav" aria-label="Business topics">
        {BUSINESS_TOPIC_GROUPS.map((group) => (
          <a key={group.id} href={`#${group.id}`} className="experience-topics-nav-link">
            {group.subGroup}
          </a>
        ))}
      </nav>
      {BUSINESS_TOPIC_GROUPS.map((group) => (
        <section key={group.id} id={group.id} className="experience-topic-group" data-testid={`topic-group-${group.id}`}>
          {group.items.map((row) => {
            const section = <TopicSection key={row.id} row={row} index={n} />;
            n += 1;
            return section;
          })}
        </section>
      ))}
    </div>
  );
};

const TechnicalTopics = () => (
  <div>
    <header className="chapter-head">
      <p>Technical experience</p>
      <h2>Five layers you actually ship.</h2>
      <p className="chapter-lede">
        Ontology, governance, semantics, lineage, reliability — a pipeline, not a brochure.
      </p>
    </header>
    <nav className="experience-topics-nav" aria-label="Technical topics">
      {TECHNICAL_TOPIC_ROWS.map((row) => (
        <a key={row.id} href={`#${row.id}`} className="experience-topics-nav-link">
          {row.category}
        </a>
      ))}
    </nav>
    <div className="tech-pipeline">
      {TECHNICAL_TOPIC_ROWS.map((row, index) => (
        <TopicSection key={row.id} row={row} index={index} />
      ))}
    </div>
  </div>
);

const ExperienceTopics = () => {
  const { isBusiness } = useExperience();

  return (
    <section id="experience" className="experience-topics py-20 md:py-28" data-testid="home-experience-topics">
      <div className="max-w-[1180px] mx-auto px-6">
        {isBusiness ? <BusinessTopics /> : <TechnicalTopics />}
      </div>
    </section>
  );
};

export default ExperienceTopics;
