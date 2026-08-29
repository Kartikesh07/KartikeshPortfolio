import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleConstellation = ({ mousePos, isReducedMotion = false }) => {
  const pointsRef = useRef();
  const linesRef = useRef();

  // Generate volumetric 3D particle positions and colors
  const { particleCount, originalPositions, currentPositions, velocities, colors } = useMemo(() => {
    const particleCount = 140;
    const originalPositions = new Float32Array(particleCount * 3);
    const currentPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const emberColor = new THREE.Color('#FF6B1A');
    const goldColor = new THREE.Color('#FFA540');
    const cyanColor = new THREE.Color('#38bdf8');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spread across volumetric 3D space
      const x = (Math.random() - 0.5) * 14;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 6;

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      currentPositions[i3] = x;
      currentPositions[i3 + 1] = y;
      currentPositions[i3 + 2] = z;

      velocities[i3] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.008 + 0.004; // Gentle upward drift
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.008;

      // Color distribution: 70% ember/gold, 30% cyan
      const col = Math.random() > 0.3 ? (Math.random() > 0.5 ? emberColor : goldColor) : cyanColor;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    return { particleCount, originalPositions, currentPositions, velocities, colors };
  }, []);

  // Pre-allocate line segments buffer
  const maxLines = 180;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const posArray = posAttr.array;

    const mx = (mousePos?.x || 0) * 6;
    const my = (mousePos?.y || 0) * 4;

    let lineIndex = 0;
    const connectionDist = 2.2;
    const connectionDistSq = connectionDist * connectionDist;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      if (!isReducedMotion) {
        // Slow drifting physics
        posArray[i3] += velocities[i3];
        posArray[i3 + 1] += velocities[i3 + 1];
        posArray[i3 + 2] += velocities[i3 + 2];

        // Boundary wrap
        if (posArray[i3] > 7) posArray[i3] = -7;
        if (posArray[i3] < -7) posArray[i3] = 7;
        if (posArray[i3 + 1] > 4.5) posArray[i3 + 1] = -4.5;
        if (posArray[i3 + 1] < -4.5) posArray[i3 + 1] = 4.5;
        if (posArray[i3 + 2] > 3) posArray[i3 + 2] = -3;
        if (posArray[i3 + 2] < -3) posArray[i3 + 2] = 3;

        // Subtle mouse repulsion / attraction
        const dx = posArray[i3] - mx;
        const dy = posArray[i3 + 1] - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < 9 && distSq > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (3 - dist) * 0.003;
          posArray[i3] += (dx / dist) * force;
          posArray[i3 + 1] += (dy / dist) * force;
        }
      }

      // Constellation proximity lines
      for (let j = i + 1; j < particleCount && lineIndex < maxLines; j++) {
        const j3 = j * 3;
        const dx = posArray[i3] - posArray[j3];
        const dy = posArray[i3 + 1] - posArray[j3 + 1];
        const dz = posArray[i3 + 2] - posArray[j3 + 2];
        const dSq = dx * dx + dy * dy + dz * dz;

        if (dSq < connectionDistSq) {
          const l6 = lineIndex * 6;
          linePositions[l6] = posArray[i3];
          linePositions[l6 + 1] = posArray[i3 + 1];
          linePositions[l6 + 2] = posArray[i3 + 2];
          linePositions[l6 + 3] = posArray[j3];
          linePositions[l6 + 4] = posArray[j3 + 1];
          linePositions[l6 + 5] = posArray[j3 + 2];
          lineIndex++;
        }
      }
    }

    // Zero out unused line segments
    for (let l = lineIndex; l < maxLines; l++) {
      const l6 = l * 6;
      linePositions[l6] = 0;
      linePositions[l6 + 1] = 0;
      linePositions[l6 + 2] = 0;
      linePositions[l6 + 3] = 0;
      linePositions[l6 + 4] = 0;
      linePositions[l6 + 5] = 0;
    }

    posAttr.needsUpdate = true;

    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Volumetric 3D Glow Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={currentPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={particleCount}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          vertexColors={true}
          transparent={true}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* 2. Constellation Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={maxLines * 2}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#FF6B1A"
          transparent={true}
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

export default ParticleConstellation;
