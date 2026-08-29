import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sfx } from '../utils/soundEffects';

const FLAVOR_LINES = [
  'COMPILING SHADER PIPELINES [VULKAN 1.3]...',
  'STREAMING RUNTIME VOXEL MESHES...',
  'CALIBRATING LOCOMOTION STATE MACHINE...',
  'BAKING PROCEDURAL SKY-RUINS SEED...',
  'SYSTEM ARMED // LAUNCHING SHOWREEL...'
];

const BootSequenceScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [flavorIndex, setFlavorIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Fast boot counter ~1.2s total
    const startTime = performance.now();
    const duration = 1250;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      const fIdx = Math.min(Math.floor((pct / 100) * FLAVOR_LINES.length), FLAVOR_LINES.length - 1);
      setFlavorIndex(fIdx);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsDone(true);
          sfx.playSting();
          setTimeout(onComplete, 600);
        }, 150);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100000] bg-void-950 flex flex-col items-center justify-center p-6 select-none cursor-wait"
        >
          {/* Subtle Background HUD Grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(255, 107, 26, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 107, 26, 0.3) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="w-full max-w-md relative z-10 space-y-6">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between font-mono text-xs text-cinematic-muted border-b border-cinematic-border pb-3">
              <span className="flex items-center gap-2 text-ember">
                <span className="w-2 h-2 bg-ember animate-ping rounded-full" />
                AZROPHIX_BOOT_v2.6
              </span>
              <span className="tabular-nums">{progress}%</span>
            </div>

            {/* Title Sting */}
            <div className="space-y-1 text-left">
              <h2 className="font-cinematic text-3xl sm:text-4xl text-cinematic-white tracking-wide">
                INITIALIZING SHOWREEL
              </h2>
              <p className="font-mono text-xs text-ember tracking-wider">
                KARTIKESH &bull; GAME DEVELOPER &amp; FULL-STACK ENGINEER
              </p>
            </div>

            {/* Level Loading Progress Bar */}
            <div className="w-full h-2 bg-void-800 border border-cinematic-border p-[1px] relative overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-ember-dark via-ember to-ember-glow shadow-[0_0_12px_#FF6B1A]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Dynamic Flavor Console Line */}
            <div className="flex items-center justify-between font-mono text-[11px] text-cinematic-silver pt-1">
              <span className="truncate text-cinematic-muted">
                &gt; {FLAVOR_LINES[flavorIndex]}
              </span>
              <span className="text-cinematic-darkMuted pl-2">
                [OK]
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BootSequenceScreen;
