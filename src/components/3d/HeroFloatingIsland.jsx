import { useState, useEffect, lazy, Suspense, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Lazy-load the WebGL R3F canvas
const FloatingIslandScene = lazy(() => import('./FloatingIslandScene'));

// WebGL Feature Detection
const checkWebGLSupport = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

const HeroFloatingIsland = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '200px' });
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    setHasWebGL(checkWebGLSupport());
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full z-[1] flex items-center justify-center pointer-events-none overflow-visible"
      aria-hidden="true"
    >
      {hasWebGL ? (
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-96 h-96 rounded-full bg-ember/10 blur-3xl animate-pulse" />
            </div>
          }
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full absolute inset-0 flex items-center justify-center"
          >
            <FloatingIslandScene isInView={isInView} />
          </motion.div>
        </Suspense>
      ) : (
        /* Graceful Non-WebGL Fallback */
        <div className="w-96 h-96 rounded-full bg-gradient-to-tr from-void-950 via-ember/15 to-void-950 border border-ember/20 shadow-[0_0_80px_rgba(255,107,26,0.15)] flex items-center justify-center">
          <div className="w-36 h-36 rotate-45 border border-ember/40 bg-void-900/80" />
        </div>
      )}
    </div>
  );
};

export default HeroFloatingIsland;
