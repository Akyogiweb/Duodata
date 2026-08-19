import React from 'react';

// Official Duodata logo asset (CDN-hosted)
export const DUODATA_LOGO_URL =
  'https://customer-assets-0z36b82j.emergentagent.net/job_duodata-metrics/artifacts/4g4xfpik_Logo.png';

/**
 * DuodataMark
 * Renders ONLY the blue+cyan "S" symbol portion of the logo image
 * by scaling the image to a fixed height and clipping to a square container.
 * Works on both light and dark backgrounds because the mark is a
 * self-contained coloured graphic.
 */
const DuodataMark = ({ size = 28, className = '' }) => {
  // The S mark occupies roughly the left ~22% of the source image.
  // We render the image at `height = size` (scaling width proportionally)
  // and clip the container to `size x size` so only the mark shows.
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        overflow: 'hidden',
        flexShrink: 0,
        display: 'inline-block',
      }}
      aria-label="Duodata"
      role="img"
    >
      <img
        src={DUODATA_LOGO_URL}
        alt=""
        style={{
          height: size,
          width: 'auto',
          maxWidth: 'none',
          display: 'block',
          objectFit: 'contain',
        }}
        draggable={false}
      />
    </div>
  );
};

/**
 * DuodataFullLogo
 * Renders the complete brand lockup image (mark + wordmark).
 * Use only on light backgrounds \u2014 the wordmark is black.
 */
export const DuodataFullLogo = ({ height = 26, className = '' }) => (
  <img
    src={DUODATA_LOGO_URL}
    alt="Duodata"
    className={className}
    style={{ height, width: 'auto', display: 'block' }}
    draggable={false}
  />
);

export default DuodataMark;
