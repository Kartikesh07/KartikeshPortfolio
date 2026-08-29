import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, X } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

const AchievementToast = ({ activeSection }) => {
  const [showToast, setShowToast] = useState(false);
  const [achievement, setAchievement] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hasSeen = localStorage.getItem('portfolio_achievement_seen');
    if (hasSeen) return;

    // Trigger on reaching missions section or 25s idle time
    if (activeSection === 'missions') {
      triggerAchievement({
        title: 'MISSION EXPLORER',
        desc: 'Inspected game developer showreel blueprints',
        xp: '+500 XP'
      });
    }

    const timer = setTimeout(() => {
      const alreadyShown = localStorage.getItem('portfolio_achievement_seen');
      if (!alreadyShown) {
        triggerAchievement({
          title: 'DEEP DIVE OPERATOR',
          desc: 'Explored tactical dossiers for 25+ seconds',
          xp: '+250 XP'
        });
      }
    }, 25000);

    return () => clearTimeout(timer);
  }, [activeSection]);

  const triggerAchievement = (data) => {
    setAchievement(data);
    setShowToast(true);
    localStorage.setItem('portfolio_achievement_seen', 'true');
    sfx.playAchievement();

    setTimeout(() => {
      setShowToast(false);
    }, 5500);
  };

  const handleDismiss = () => {
    setShowToast(false);
  };

  return (
    <AnimatePresence>
      {showToast && achievement && (
        <motion.div
          initial={{ opacity: 0, y: -40, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-20 right-6 z-50 max-w-sm bg-void-900/95 border-2 border-ember p-4 shadow-card-lift backdrop-blur-md select-none text-left"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-ember/15 border border-ember flex items-center justify-center text-ember shrink-0 shadow-[0_0_12px_rgba(255,107,26,0.4)]">
              <Trophy size={20} />
            </div>

            <div className="flex-1 pr-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-ember tracking-widest uppercase font-bold">
                  ACHIEVEMENT UNLOCKED
                </span>
                <span className="font-mono text-[9px] text-cinematic-darkMuted">
                  {achievement.xp}
                </span>
              </div>
              <h4 className="font-cinematic text-lg text-cinematic-white leading-tight">
                {achievement.title}
              </h4>
              <p className="font-mono text-[11px] text-cinematic-muted leading-tight mt-0.5">
                {achievement.desc}
              </p>
            </div>

            <button
              onClick={handleDismiss}
              className="text-cinematic-muted hover:text-cinematic-white p-1"
              aria-label="Dismiss Achievement"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;
