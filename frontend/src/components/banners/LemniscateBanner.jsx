import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useInView from '@/hooks/useInView';
import DarkBanner from './DarkBanner';

const LEMNISCATE = 'M 600 300 C 510 128 260 118 220 300 C 260 482 510 472 600 300 C 690 128 940 118 980 300 C 940 482 690 472 600 300 Z';

const OrbitDot = ({ delay, duration, reduced, accent = false, testId }) => (
  <circle
    cx={reduced ? 600 : 0}
    cy={reduced ? 300 : 0}
    r={accent ? 6 : 4}
    fill={accent ? '#06B6D4' : '#FFFFFF'}
    filter={accent ? 'url(#lemniscate-dot-glow)' : undefined}
    data-testid={testId}
  >
    {!reduced && (
      <animateMotion begin={`${delay}s`} dur={`${duration}s`} repeatCount="indefinite" rotate="auto">
        <mpath href="#duo-lemniscate-path" />
      </animateMotion>
    )}
  </circle>
);

const LemniscateBanner = () => {
  const [ref, inView] = useInView({ threshold: 0.25 });
  const reduced = useReducedMotion();

  return (
    <DarkBanner
      index="01"
      eyebrow="Why Duo Data"
      title={<>Two systems. <span className="text-cyan-400">One continuous truth.</span></>}
      subtitle="Business meaning and technical implementation stay synchronized through a governed metric ontology."
      testId="lemniscate-banner"
    >
      <div ref={ref} className="absolute inset-0" data-testid="lemniscate-visualization">
        <svg
          viewBox="0 0 1200 600"
          className="h-full w-full"
          role="img"
          aria-labelledby="lemniscate-title lemniscate-description"
          data-testid="lemniscate-svg"
        >
          <title id="lemniscate-title">Continuous semantic synchronization</title>
          <desc id="lemniscate-description">A precise figure eight connects human business context and machine implementation through Duo Data.</desc>
          <defs>
            <filter id="lemniscate-dot-glow" x="-300%" y="-300%" width="700%" height="700%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <line x1="600" y1="72" x2="600" y2="528" stroke="white" strokeOpacity="0.08" />
          <line x1="120" y1="300" x2="1080" y2="300" stroke="white" strokeOpacity="0.08" />
          <path d={LEMNISCATE} fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="2" />
          <motion.path
            id="duo-lemniscate-path"
            d={LEMNISCATE}
            fill="none"
            stroke="#06B6D4"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.82 } : { pathLength: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 1.8, ease: [0.16, 1, 0.3, 1] }}
            data-testid="lemniscate-path"
          />

          {inView && <OrbitDot delay={0} duration={11} reduced={reduced} accent testId="lemniscate-dot-primary" />}
          {inView && <OrbitDot delay={-3.7} duration={11} reduced={reduced} testId="lemniscate-dot-secondary" />}
          {inView && <OrbitDot delay={-7.4} duration={11} reduced={reduced} testId="lemniscate-dot-tertiary" />}

          <g data-testid="lemniscate-human-node">
            <text x="350" y="282" textAnchor="middle" fill="white" fontSize="26" fontWeight="700">Human context</text>
            <text x="350" y="314" textAnchor="middle" fill="white" fillOpacity="0.46" fontSize="13">definitions · ownership · decisions</text>
          </g>
          <g data-testid="lemniscate-machine-node">
            <text x="850" y="282" textAnchor="middle" fill="white" fontSize="26" fontWeight="700">Machine context</text>
            <text x="850" y="314" textAnchor="middle" fill="white" fillOpacity="0.46" fontSize="13">models · lineage · execution</text>
          </g>
          <g data-testid="lemniscate-core-node">
            <circle cx="600" cy="300" r="46" fill="#090909" stroke="#06B6D4" strokeOpacity="0.75" />
            <circle cx="600" cy="300" r="34" fill="none" stroke="white" strokeOpacity="0.12" />
            <text x="600" y="296" textAnchor="middle" fill="white" fontSize="13" fontWeight="700">DUO</text>
            <text x="600" y="314" textAnchor="middle" fill="#67E8F9" fontSize="9" letterSpacing="1.5">ONTOLOGY</text>
          </g>
        </svg>
      </div>
    </DarkBanner>
  );
};

export default LemniscateBanner;