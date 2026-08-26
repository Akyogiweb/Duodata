import React from 'react';

/**
 * Global vertical grid backdrop applied to every page — matches the Duodata
 * page design (tall vertical column dividers running full-height). Fixed
 * behind all content, non-interactive.
 *
 * Renders 12 columns on desktop and 6 on mobile.
 */
const GridBackdrop = ({ opacity = 0.5, cols = 12, mobileCols = 6 }) => {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden="true"
      style={{ opacity }}
    >
      <div className="h-full w-full max-w-[1440px] mx-auto relative">
        {/* Desktop */}
        <div className="hidden md:grid h-full grid-cols-12">
          {Array.from({ length: cols }).map((_, i) => (
            <div
              key={i}
              className={i === 0 ? '' : 'border-l border-slate-200/60'}
            />
          ))}
        </div>
        {/* Mobile */}
        <div className="md:hidden grid h-full grid-cols-6">
          {Array.from({ length: mobileCols }).map((_, i) => (
            <div
              key={i}
              className={i === 0 ? '' : 'border-l border-slate-200/60'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridBackdrop;
