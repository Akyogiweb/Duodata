import React from 'react';

/**
 * Duodata brand mark.
 * Two interlocking rounded capsules forming a stylised S:
 *   - Top-left capsule: deep royal blue (#1E5FEE)
 *   - Bottom-right capsule: bright cyan   (#22D3EE)
 * A thin white arc between them creates the interlock illusion.
 */
const DuodataMark = ({ size = 24, className = '' }) => {
  const h = Math.round(size * (72 / 64));
  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 64 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Duodata"
    >
      {/* Bottom cyan capsule (rendered first) */}
      <rect x="12" y="32" width="50" height="38" rx="19" ry="19" fill="#22D3EE" />
      {/* Top blue capsule */}
      <rect x="2" y="2" width="50" height="38" rx="19" ry="19" fill="#1E5FEE" />
      {/* White interlock arc where the two lobes cross */}
      <path
        d="M 12 32 Q 32 32 32 42 Q 32 52 52 40"
        stroke="#ffffff"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export const DuodataLogo = ({ size = 22, textClass = 'text-slate-900' }) => (
  <div className="flex items-center gap-2">
    <DuodataMark size={size} />
    <span
      className={`font-semibold tracking-tight ${textClass}`}
      style={{ fontSize: Math.round(size * 0.72) }}
    >
      Duodata
    </span>
  </div>
);

export default DuodataMark;
