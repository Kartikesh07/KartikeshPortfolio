import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sparkles, X, ShieldAlert } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

const EasterEggBanner = () => {
  const [inputSequence, setInputSequence] = useState([]);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expectedKey = KONAMI_CODE[inputSequence.length];

      if (key === expectedKey || key.toLowerCase() === expectedKey?.toLowerCase()) {
        const nextSeq = [...inputSequence, key];
        if (nextSeq.length === KONAMI_CODE.length) {
          triggerEasterEgg();
          setInputSequence([]);
        } else {
          setInputSequence(nextSeq);
        }
      } else {
        // Reset sequence if incorrect key pressed
        setInputSequence(key === 'ArrowUp' ? ['ArrowUp'] : []);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence]);

  const triggerEasterEgg = () => {
    setActivated(true);
    sfx.playEasterEgg();

    // Trigger subtle screen shake on body
    document.body.classList.add('screen-shake-fx');
    setTimeout(() => {
      document.body.classList.remove('screen-shake-fx');
    }, 600);

    setTimeout(() => {
      setActivated(false);
    }, 5000);
  };

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[99999] max-w-lg w-[90%] bg-void-950 border-2 border-ember p-5 shadow-[0_0_50px_rgba(255,107,26,0.6)] text-center select-none"
        >
          <div className="flex items-center justify-between border-b border-cinematic-border pb-2 mb-3">
            <span className="font-mono text-xs text-ember font-bold tracking-widest uppercase flex items-center gap-2">
              <Sparkles size={14} />
              CHEAT CODE UNLOCKED: 30 LIVES
            </span>
            <button onClick={() => setActivated(false)} className="text-cinematic-muted hover:text-cinematic-white">
              <X size={14} />
            </button>
          </div>

          <h3 className="font-cinematic text-2xl sm:text-3xl text-cinematic-white mb-1">
            GOD MODE &bull; DEVELOPER OVERRIDE
          </h3>
          <p className="font-mono text-xs text-cinematic-silver">
            Konami Code recognized. Unlimited ammo, 60 FPS physics locks, and secret showreel clearance unlocked!
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEggBanner;
