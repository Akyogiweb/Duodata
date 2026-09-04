import React from 'react';
import { Link } from 'react-router-dom';
import { caseStudies } from '@/mockCaseStudies';
import { useExperience } from '@/context/ExperienceContext';
import { ArrowRight } from 'lucide-react';

const OUTCOMES = [
  { value: 'One', label: 'business meaning', detail: 'The same metric in the board pack, the warehouse, and the agent.' },
  { value: '−48%', label: 'reporting cycle', detail: 'From a customer story: Meridian stopped reconciling four versions of MOIC.' },
  { value: '94%', label: 'AI answer accuracy', detail: 'From a customer story: copilots quote the governed definition, not a schema guess.' },
];

const SalesProof = () => {
  const { isBusiness } = useExperience();
  const stories = caseStudies.slice(0, 3);

  return (
    <section id="proof" className="py-20 md:py-28" data-testid="home-sales-proof">
      <div className="mx-auto max-w-[1200px] px-6">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Why teams buy Duo</p>
        <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950 max-w-3xl">
          {isBusiness
            ? 'Stop arguing about the number. Start running the business.'
            : 'Stop translating by hand. Ship the meaning the business already named.'}
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {OUTCOMES.map((item) => (
            <div key={item.label} className="rounded-2xl border border-black/10 bg-white px-6 py-7 shadow-[0_18px_40px_rgba(30,95,238,0.06)]">
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
