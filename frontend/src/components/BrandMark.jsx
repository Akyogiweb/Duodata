import React from 'react';

export const BrandMark = ({ slug, color, size = 28, label }) => (
  <span
    role="img"
    aria-label={label}
    className="brand-mark"
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      WebkitMaskImage: `url(/logos/${slug}.svg)`,
      maskImage: `url(/logos/${slug}.svg)`,
      WebkitMaskRepeat: 'no-repeat',
      maskRepeat: 'no-repeat',
      WebkitMaskPosition: 'center',
      maskPosition: 'center',
      WebkitMaskSize: 'contain',
      maskSize: 'contain',
    }}
  />
);

export default BrandMark;
