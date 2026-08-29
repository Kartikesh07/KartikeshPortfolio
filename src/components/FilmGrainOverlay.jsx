import React from 'react';

const FilmGrainOverlay = () => {
  return (
    <>
      {/* Dynamic Animated Film Grain Layer */}
      <svg className="film-grain" aria-hidden="true">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>

      {/* Cinematic Edge Vignette */}
      <div className="cinematic-vignette" aria-hidden="true" />
    </>
  );
};

export default FilmGrainOverlay;
