import React from 'react';

/**
 * Reusable dark-mode banner shell used for the three baseline visuals.
 * - eyebrow / title / subtitle sit above the visualization on light bg
 * - the dark stage renders inside a rounded card with generous padding
 */
const DarkBanner = ({ eyebrow, title, subtitle, children, className = '', stageClassName = '' }) => (
  <section className={`py-16 md:py-24 bg-white ${className}`}>
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-3xl mx-auto mb-8">
        {eyebrow && (
          <p className="text-[11px] tracking-[0.28em] uppercase text-slate-500 font-medium mb-3">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="hero-headline text-[32px] md:text-[52px] text-slate-950 leading-[0.98]">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-4 text-slate-600 text-[15px] leading-relaxed">{subtitle}</p>
        )}
      </div>

      <div
        className={`relative rounded-[28px] overflow-hidden ${stageClassName}`}
        style={{
          background: 'radial-gradient(80% 100% at 50% 50%, #0f172a 0%, #050912 70%, #030509 100%)',
        }}
      >
        {children}
      </div>
    </div>
  </section>
);

export default DarkBanner;
