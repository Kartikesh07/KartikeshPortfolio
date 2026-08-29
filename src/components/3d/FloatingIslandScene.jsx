import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleConstellation from './ParticleConstellation';

const FloatingIslandScene = ({ isInView = true }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

    const handleMouseMove = (e) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 pointer-events-none select-none overflow-hidden">
      <Canvas
        frameloop={isInView ? 'always' : 'never'}
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        className="w-full h-full absolute inset-0"
      >
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <ParticleConstellation mousePos={mousePos} isReducedMotion={isReducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default FloatingIslandScene;
