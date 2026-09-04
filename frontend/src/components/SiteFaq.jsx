import React, { useState } from 'react';
import { SITE_FAQS } from '@/data/featureConnections';

const SiteFaq = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-20 md:py-28" data-testid="home-faq">
      <div className="max-w-[800px] mx-auto px-6">
        <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">FAQ</p>
        <h2 className="hero-headline text-[36px] md:text-[52px] text-slate-950">Questions teams ask before they start.</h2>
        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
          {SITE_FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-testid={`home-faq-${i + 1}`}
                >
                  <span className="text-[16px] font-semibold text-slate-950">{item.q}</span>
                  <span className="mt-1 text-slate-400">{isOpen ? '–' : '+'}</span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-[14px] leading-relaxed text-slate-600">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SiteFaq;
