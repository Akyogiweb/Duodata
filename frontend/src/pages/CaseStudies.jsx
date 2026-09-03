import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { caseStudies } from '@/mockCaseStudies';
import { ArrowRight, ArrowLeft, Quote, CheckCircle2, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDemoModal } from '@/context/DemoModalContext';

const CardTag = ({ children }) => (
  <span className="text-[11px] font-medium text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-full">
    {children}
  </span>
);

const CaseStudiesIndex = () => {
  const demo = useDemoModal();
  return (
    <div className="min-h-screen relative">
      <Nav />
      <div className="pt-32 pb-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">Resources — Case studies</p>
          <h1 className="hero-headline text-[48px] md:text-[80px] text-slate-950 max-w-4xl">
            Enterprises that stopped fighting about <span style={{ color: '#1E5FEE' }}>numbers.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-slate-600 text-[15px] leading-relaxed">
            In-depth stories from private markets and enterprise data teams. Every case study is downloadable and safe to share with your CDO, procurement or board.
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6 pb-24">
        {caseStudies.map((c) => (
          <Link
            to={`/case-studies/${c.slug}`}
            key={c.slug}
            className="group rounded-2xl border border-black/10 hover:border-black/25 hover:shadow-lg transition-all bg-white p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[13px] font-bold"
                style={{ background: c.logoColor }}
              >
                {c.company.split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-slate-900">{c.company}</div>
                <div className="text-[12px] text-slate-500">{c.industry}</div>
              </div>
            </div>
            <h2 className="hero-headline text-[24px] md:text-[28px] text-slate-950 mb-4">{c.headline}</h2>
            <p className="text-[14px] leading-relaxed text-slate-600 mb-6 flex-1">{c.excerpt}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {c.stats.map((s) => (
                <div key={s.label} className="text-center rounded-xl bg-slate-50 border border-slate-100 py-3">
                  <div className="text-[18px] font-bold text-slate-900">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {c.tags.slice(0, 3).map((t) => <CardTag key={t}>{t}</CardTag>)}
              </div>
              <span className="arrow-link text-[13px]">Read case study <ArrowRight size={14} /></span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA banner */}
      <div className="bg-slate-50 border-y border-black/5 py-16">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h3 className="hero-headline text-[32px] md:text-[44px] text-slate-950">Want a copy for your team?</h3>
          <p className="mt-4 text-slate-600 text-[15px]">Every case study has a PDF version, sanitized for procurement, security and board review.</p>
          <Button onClick={demo.open} className="mt-6 bg-slate-900 hover:bg-slate-800 text-white rounded-full px-5">
            Request PDF pack <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export const CaseStudyDetail = () => {
  const { slug } = useParams();
  const demo = useDemoModal();
  const c = caseStudies.find((x) => x.slug === slug);

  if (!c) {
    return (
      <div className="min-h-screen relative">
        <Nav />
        <div className="pt-40 pb-32 text-center">
          <p className="text-slate-500">Case study not found.</p>
          <Link to="/case-studies" className="arrow-link mt-4 inline-flex">Back to case studies</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const highlights = [
    'Governed metric ontology owned by the business, not engineering.',
    'Definitions, owners, lifecycle status, formulas and lineage in one system.',
    'Projected into Snowflake, Databricks, dbt/MetricFlow and BI tools.',
    'AI copilots and agents grounded in enterprise-approved meaning.',
  ];

  return (
    <div className="min-h-screen relative">
      <Nav />
      <div className="pt-32 pb-10">
        <div className="max-w-[900px] mx-auto px-6">
          <Link to="/case-studies" className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-900 mb-8">
            <ArrowLeft size={14} /> All case studies
          </Link>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white text-[13px] font-bold" style={{ background: c.logoColor }}>
              {c.company.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </div>
            <div>
              <div className="text-[15px] font-semibold text-slate-900">{c.company}</div>
              <div className="text-[12px] text-slate-500">{c.industry}</div>
            </div>
          </div>
          <h1 className="hero-headline text-[38px] md:text-[56px] text-slate-950">{c.headline}</h1>
          <div className="flex flex-wrap gap-2 mt-6">
            {c.tags.map((t) => <CardTag key={t}>{t}</CardTag>)}
          </div>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-3 gap-4 mb-14">
          {c.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-slate-900 text-white py-8 px-6 text-center">
              <div className="text-[36px] font-bold tracking-tight">{s.value}</div>
              <div className="text-[11px] uppercase tracking-widest text-slate-400 mt-2">{s.label}</div>
            </div>
          ))}
        </div>

        <article className="prose max-w-none text-slate-700">
          <h2 className="hero-headline text-[24px] text-slate-950 mt-4 mb-4">The situation</h2>
          <p className="text-[15px] leading-relaxed">{c.excerpt}</p>
          <p className="text-[15px] leading-relaxed mt-4">
            {c.company}’s data platform team had rolled out modern tools — a warehouse, dbt models, BI dashboards — but the business still couldn’t agree on definitions. Executive reviews turned into definition debates instead of decisions. AI experiments stalled because copilots kept quoting the wrong version of the number.
          </p>

          <h2 className="hero-headline text-[24px] text-slate-950 mt-10 mb-4">Why Duodata</h2>
          <ul className="space-y-2 mt-2">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-[15px] leading-relaxed">
                <CheckCircle2 size={16} className="text-emerald-600 mt-1 shrink-0" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <h2 className="hero-headline text-[24px] text-slate-950 mt-10 mb-4">The rollout</h2>
          <p className="text-[15px] leading-relaxed">
            Andreas and the Duodata team ran a 6-week alignment sprint: define the top 40 metrics, assign business owners, capture lineage from source to consumer, and project the governed ontology into {c.tags.filter((t) => ['Snowflake', 'Databricks', 'dbt', 'Tableau', 'Power BI', 'MetricFlow'].includes(t)).join(', ') || 'the existing stack'}. AI agents and BI tools were re-pointed to the governed layer with zero downstream migration.
          </p>

          <blockquote className="my-10 border-l-4 border-slate-900 pl-5 py-2">
            <Quote className="w-5 h-5 text-slate-400 mb-2" />
            <p className="text-[20px] leading-relaxed text-slate-900 font-medium">“{c.quote}”</p>
            <div className="text-[13px] text-slate-500 mt-3">— {c.quoteAuthor}</div>
          </blockquote>

          <h2 className="hero-headline text-[24px] text-slate-950 mt-10 mb-4">The outcome</h2>
          <p className="text-[15px] leading-relaxed">
            Within a quarter, {c.company} had aligned executive dashboards, faster reporting cycles and, for the first time, AI answers the CDO would sign off on. The metric ontology is now a foundation the business — not just data engineering — owns.
          </p>
        </article>

        <div className="mt-14 flex items-center justify-between rounded-2xl bg-slate-50 border border-slate-100 p-6">
          <div>
            <div className="text-[13px] font-semibold text-slate-900">Share with your team</div>
            <div className="text-[12px] text-slate-500">Send the sanitized PDF to your CDO, procurement or board.</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full">
              <Share2 size={14} className="mr-2" /> Copy link
            </Button>
            <Button onClick={demo.open} className="bg-slate-900 hover:bg-slate-800 text-white rounded-full">
              Book a demo <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CaseStudiesIndex;
