import React from 'react';

const DarkBanner = ({ index, eyebrow, title, subtitle, children, testId }) => (
  <section
    className="dark-banner-shell border-y border-white/10 bg-[#050505] text-white"
    data-testid={testId}
  >
    <div className="mx-auto max-w-[1200px] px-6 py-20 md:py-28">
      <header className="grid gap-8 border-b border-white/10 pb-10 md:grid-cols-[180px_minmax(0,1fr)] md:gap-16 md:pb-14">
        <div className="flex items-start gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          <span className="text-cyan-400" data-testid={`${testId}-index`}>{index}</span>
          <span data-testid={`${testId}-eyebrow`}>{eyebrow}</span>
        </div>
        <div className="max-w-4xl">
          <h2
            className="hero-headline text-4xl leading-none text-white sm:text-5xl lg:text-6xl"
            data-testid={`${testId}-title`}
          >
            {title}
          </h2>
          <p
            className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base"
            data-testid={`${testId}-subtitle`}
          >
            {subtitle}
          </p>
        </div>
      </header>

      <div
        className="relative mt-10 min-h-[360px] overflow-hidden border border-white/10 bg-[#090909] md:mt-14 md:min-h-[560px]"
        data-testid={`${testId}-stage`}
      >
        {children}
      </div>
    </div>
  </section>
);

export default DarkBanner;