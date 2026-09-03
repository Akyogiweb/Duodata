import React from 'react';

const WaveField = () => (
  <div className="wave-field" aria-hidden>
    <svg className="wave-field-svg" viewBox="0 0 1440 900" preserveAspectRatio="none">
      <path
        className="wave-path wave-a"
        d="M0,520 C180,470 320,610 520,560 C720,510 820,430 1020,480 C1220,530 1320,500 1440,470 L1440,900 L0,900 Z"
      />
      <path
        className="wave-path wave-b"
        d="M0,580 C220,640 380,500 600,540 C820,580 980,680 1180,620 C1320,580 1380,600 1440,630 L1440,900 L0,900 Z"
      />
      <path
        className="wave-path wave-c"
        d="M0,430 C260,390 420,510 640,470 C860,430 980,360 1180,400 C1320,430 1400,410 1440,390 L1440,900 L0,900 Z"
      />
    </svg>
  </div>
);

export default WaveField;
