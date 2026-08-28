import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import DarkBanner from './DarkBanner';

const ORBIT = 'M 278 300 A 322 112 0 1 0 922 300 A 322 112 0 1 0 278 300';
const components = [
  { label: 'METRIC', detail: 'what changes', x: 150, y: 120 },
  { label: 'SLICE', detail: 'for whom', x: 1050, y: 120 },
  { label: 'REPORT', detail: 'where it appears', x: 150, y: 500 },
  { label: 'SOURCE', detail: 'how it resolves', x: 1050, y: 500 },
];

const AtomicOntologyBanner = () => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const reduced = useReducedMotion();
  const angles = [-42, 0, 42, 90];

  return (
    <DarkBanner
      index="02"
      eyebrow="The decision atom"
      title={<>Every decision resolves into <span className="text-cyan-400">four governed parts.</span></>}
      subtitle="Metric, slice, report, and source orbit one decision model—distinct responsibilities, one semantic core."
      testId="atomic-ontology-banner"
    >
      <div ref={ref} className="absolute inset-0" data-testid="atomic-ontology-visualization">
        <svg
          viewBox="0 0 1200 620"
          className="h-full w-full"
          role="img"
          aria-labelledby="atomic-title atomic-description"
          data-testid="atomic-ontology-svg"
        >
          <title id="atomic-title">Four components of a governed decision</title>
          <desc id="atomic-description">Four precise orbital paths connect metric, slice, report, and source around a central decision.</desc>
          <defs>
            <filter id="atomic-glow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <circle cx="600" cy="300" r="214" fill="none" stroke="white" strokeOpacity="0.05" />
          {angles.map((angle, index) => (
            <g key={angle} transform={`rotate(${angle} 600 300)`}>
              <motion.path
                id={`atomic-orbit-${index}`}
                d={ORBIT}
                fill="none"
                stroke={index === 1 ? '#06B6D4' : 'white'}
                strokeOpacity={index === 1 ? 0.52 : 0.16}
                strokeWidth={index === 1 ? 1.6 : 1}
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: reduced ? 0 : 1.5, delay: index * 0.16, ease: [0.16, 1, 0.3, 1] }}
                data-testid={`atomic-orbit-path-${index + 1}`}
              />
              {inView && (
                <circle
                  cx={reduced ? 278 : 0}
                  cy={reduced ? 300 : 0}
                  r={index === 1 ? 6 : 4}
                  fill={index === 1 ? '#06B6D4' : '#FFFFFF'}
                  filter={index === 1 ? 'url(#atomic-glow)' : undefined}
                  data-testid={`atomic-orbit-dot-${index + 1}`}
                >
                  {!reduced && (
                    <animateMotion begin={`${index * -2.6}s`} dur={`${12 + index * 2}s`} repeatCount="indefinite">
                      <mpath href={`#atomic-orbit-${index}`} />
                    </animateMotion>
                  )}
                </circle>
              )}
            </g>
          ))}

          <g data-testid="atomic-decision-core">
            <circle cx="600" cy="300" r="72" fill="#090909" stroke="white" strokeOpacity="0.14" />
            <circle cx="600" cy="300" r="52" fill="none" stroke="#06B6D4" strokeOpacity="0.8" />
            <circle cx="600" cy="300" r="4" fill="#06B6D4" filter="url(#atomic-glow)" />
            <text x="600" y="286" textAnchor="middle" fill="white" fontSize="12" letterSpacing="2">GOVERNED</text>
            <text x="600" y="320" textAnchor="middle" fill="white" fontSize="25" fontWeight="700">Decision</text>
          </g>

          {components.map((item, index) => (
            <g key={item.label} data-testid={`atomic-component-${item.label.toLowerCase()}`}>
              <line x1={item.x < 600 ? item.x : item.x - 78} y1={item.y - 20} x2={item.x < 600 ? item.x + 78 : item.x} y2={item.y - 20} stroke="#06B6D4" strokeOpacity="0.55" />
              <text x={item.x} y={item.y} textAnchor={item.x < 600 ? 'start' : 'end'} fill="white" fontSize="15" fontWeight="700" letterSpacing="1.5">0{index + 1} / {item.label}</text>
              <text x={item.x} y={item.y + 24} textAnchor={item.x < 600 ? 'start' : 'end'} fill="white" fillOpacity="0.42" fontSize="12">{item.detail}</text>
            </g>
          ))}
        </svg>
      </div>
    </DarkBanner>
  );
};

export default AtomicOntologyBanner;