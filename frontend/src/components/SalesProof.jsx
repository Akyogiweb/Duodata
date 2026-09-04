import React from 'react';
import { Link } from 'react-router-dom';
import { caseStudies } from '@/mockCaseStudies';
import { EXPERIENCES, useExperience } from '@/context/ExperienceContext';
import { ArrowRight } from 'lucide-react';

const BUY_REASONS = [
  {
    n: '01',
    title: 'Kill the alignment tax',
    body: 'Sales, finance, and product each defend a different Revenue. High-performing teams stop reconciling and name one object — owner, formula, where it is allowed to appear.',
  },
  {
    n: '02',
    title: 'Decide at the speed of the quarter',
    body: 'Board packs slip because meaning still lives in Slack. When the object is live, the pack, the QBR, and the agent quote the same number the same day.',
  },
  {
    n: '03',
    title: 'Let the model live',
    body: 'A new SKU, a new segment, a new customer demand is not another spreadsheet. It is a versioned change to the ontology the company already runs on.',
  },
  {
    n: '04',
    title: 'Put AI on a leash you can audit',
    body: 'Ungoverned copilots guess the schema. Governed ones answer with lineage, an owner, and the question the business actually asked.',
  },
];

const OUTCOMES = [
  { value: 'One', label: 'business meaning', detail: 'The same metric in the board pack, the warehouse, and the agent.' },
  { value: '−48%', label: 'reporting cycle', detail: 'Meridian stopped reconciling four versions of MOIC.' },
  { value: '94%', label: 'AI answer accuracy', detail: 'Copilots quote the governed definition, not a schema guess.' },
];

const SalesProof = () => {
  const { isBusiness, openExperience } = useExperience();
  const stories = caseStudies.slice(0, 3);

  return (
    <section id="proof" className="py-20 md:py-28" data-testid="home-sales-proof">
      <div className="mx-auto max-w-[1180px] px-6">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Why teams buy Duo</p>
        <h2 className="hero-headline text-[36px] md:text-[56px] text-slate-950 max-w-4xl leading-[1.02]">
          Stop arguing about the number.
          <br />
          Start running the business.
        </h2>
        <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-slate-600">
          {isBusiness
            ? 'Teams do not buy another dashboard. They buy one governed meaning that product, sales, finance, and AI can stand behind — and that still moves when the market, the SKU, or the customer does.'
            : 'Data teams do not buy another dictionary. They buy a living object that compiles into the warehouse, Git, and agents — the same meaning the business already named.'}
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 md:grid-cols-2">
          {BUY_REASONS.map((item) => (
            <article key={item.n} className="bg-white px-7 py-8">
              <p className="font-mono text-[11px] tracking-[0.18em] text-[#1E5FEE]">{item.n}</p>
              <h3 className="mt-3 text-[20px] font-semibold tracking-tight text-slate-950">{item.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-slate-600">{item.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            className="text-[13px] font-medium text-[#1E5FEE]"
            onClick={() => openExperience(isBusiness ? EXPERIENCES.business : EXPERIENCES.technical, isBusiness ? 'journey' : 'proposition')}
          >
            See how the model stays live
            <ArrowRight size={14} className="ml-1 inline" />
          </button>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {OUTCOMES.map((item) => (
            <div key={item.label} className="rounded-2xl border border-black/10 bg-white px-6 py-7">
              <p className="hero-headline text-[40px] md:text-[48px] text-[#1E5FEE]">{item.value}</p>
              <p className="mt-1 text-[15px] font-semibold text-slate-950">{item.label}</p>
              <p className="mt-3 text-[13px] leading-relaxed text-slate-600">{item.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.slug}
              to={`/case-studies/${story.slug}`}
              className="group flex flex-col rounded-2xl border border-black/10 bg-white p-7 transition-shadow hover:shadow-[0_20px_44px_rgba(30,95,238,0.12)]"
              data-testid={`home-proof-story-${story.slug}`}
            >
              <p className="text-[11px] uppercase tracking-[0.18em] text-slate-500">{story.industry}</p>
              <p className="mt-3 hero-headline text-[24px] text-slate-950">{story.stats[0].value}</p>
              <p className="text-[13px] text-slate-500">{story.stats[0].label}</p>
              <h3 className="mt-4 text-[16px] font-semibold leading-snug text-slate-900">{story.headline}</h3>
              <p className="mt-auto pt-5 inline-flex items-center gap-1 text-[13px] font-medium text-[#1E5FEE]">
                Read the story <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SalesProof;
