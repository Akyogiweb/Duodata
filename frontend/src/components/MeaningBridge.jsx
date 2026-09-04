import React from 'react';

const DECK = 'M 48 214 H 752';
const DECK_BACK = 'M 752 214 H 48';

const Packet = ({ fill, delay, reverse }) => (
  <circle r="5" cx={reverse ? 752 : 48} cy="214" fill={fill}>
    <animateMotion
      dur="4.8s"
      begin={delay}
      repeatCount="indefinite"
      path={reverse ? DECK_BACK : DECK}
    />
  </circle>
);

const MeaningBridge = ({ lean }) => (
  <svg
    className={`meaning-bridge ${lean ? `is-${lean}` : ''}`}
    viewBox="0 0 800 280"
    fill="none"
    role="img"
    aria-labelledby="meaning-bridge-title"
  >
    <title id="meaning-bridge-title">One shared meaning connecting business and technical teams</title>
    <path className="bridge-draw bridge-cable" d="M 168 78 Q 400 168 632 78" pathLength="1" />
    <path className="bridge-draw bridge-cable" d="M 168 102 Q 400 198 632 102" pathLength="1" />
    <path className="bridge-draw bridge-cable" d="M 168 126 Q 400 222 632 126" pathLength="1" />
    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
      const x = 200 + i * 50;
      const dip = Math.sin((i / 8) * Math.PI) * 52;
      return (
        <path
          key={i}
          className="bridge-draw bridge-hanger"
          d={`M ${x} ${92 + dip} V 214`}
          pathLength="1"
          style={{ animationDelay: `${400 + i * 40}ms` }}
        />
      );
    })}
    <path className="bridge-draw bridge-deck" d={DECK} pathLength="1" />
    <g className="bridge-tower is-left">
      <path d="M 148 214 V 62" />
      <path d="M 188 214 V 62" />
      <path d="M 140 62 H 196" />
      <path d="M 140 78 H 196" />
    </g>
    <g className="bridge-tower is-right">
      <path d="M 612 214 V 62" />
      <path d="M 652 214 V 62" />
      <path d="M 604 62 H 660" />
      <path d="M 604 78 H 660" />
    </g>
    <g className="bridge-packets">
      <Packet fill="#1E5FEE" delay="0s" />
      <Packet fill="#1E5FEE" delay="1.6s" />
      <Packet fill="#1E5FEE" delay="3.2s" />
      <Packet fill="#7FD1E8" delay="0.8s" reverse />
      <Packet fill="#7FD1E8" delay="2.4s" reverse />
      <Packet fill="#7FD1E8" delay="4s" reverse />
    </g>
  </svg>
);

export default MeaningBridge;
