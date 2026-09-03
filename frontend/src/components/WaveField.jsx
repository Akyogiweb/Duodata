import React from 'react';

const ribbon = (y, amp) =>
  `M0,${y} C360,${y - amp} 1080,${y + amp} 1440,${y} C1800,${y - amp} 2520,${y + amp} 2880,${y}`;

const filled = (y, amp) => `${ribbon(y, amp)} L2880,900 L0,900 Z`;

const WaveField = () => (
  <div className="wave-field" aria-hidden>
    <svg className="wave-field-svg wave-flow-slow" viewBox="0 0 2880 900" preserveAspectRatio="none">
      <path className="wave-fill wave-fill-a" d={filled(520, 90)} />
      <path className="wave-fill wave-fill-b" d={filled(640, 70)} />
      <path className="wave-stroke wave-stroke-a" d={ribbon(280, 100)} />
      <path className="wave-stroke wave-stroke-b" d={ribbon(450, 120)} />
      <path className="wave-stroke wave-stroke-c" d={ribbon(620, 90)} />
      <path className="wave-link" d="M720,280 C720,360 800,360 800,450 C800,530 720,530 720,620" />
      <path className="wave-link" d="M2160,280 C2160,360 2080,360 2080,450 C2080,530 2160,530 2160,620" />
    </svg>
    <svg className="wave-field-svg wave-flow-fast" viewBox="0 0 2880 900" preserveAspectRatio="none">
      <path className="wave-stroke wave-stroke-d" d={ribbon(360, 80)} />
      <path className="wave-stroke wave-stroke-e" d={ribbon(540, 70)} />
      <path className="wave-link wave-link-soft" d="M1440,360 C1440,430 1520,430 1520,540" />
    </svg>
  </div>
);

export default WaveField;
