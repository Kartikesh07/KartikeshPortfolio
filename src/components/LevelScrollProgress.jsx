import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { sfx } from '../utils/soundEffects';

const chapters = [
  { id: 'hero', number: '01', title: 'PROLOGUE' },
  { id: 'origin', number: '02', title: 'ORIGIN' },
  { id: 'arsenal', number: '03', title: 'ARSENAL' },
  { id: 'missions', number: '04', title: 'MISSIONS' },
  { id: 'campaign', number: '05', title: 'CAMPAIGN' },
  { id: 'contact', number: '06', title: 'TRANSMISSION' },
];

const LevelScrollProgress = ({ activeSection, onNavigate }) => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 });

  return (
    <aside
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 select-none"
      aria-label="Chapter Progression Rail"
    >
      {/* Chapter Nodes */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Background Track Line */}
        <div className="absolute top-2 bottom-2 w-[1px] bg-cinematic-border -z-10" />

        {/* Dynamic Progress Fill Line */}
        <motion.div
          style={{ scaleY, originY: 0 }}
          className="absolute top-2 bottom-2 w-[2px] bg-ember shadow-[0_0_8px_#FF6B1A] -z-10"
        />

        {chapters.map((ch) => {
          const isActive = activeSection === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => {
                sfx.playClick();
                onNavigate(ch.id);
              }}
              onMouseEnter={() => sfx.playHover()}
              className="group relative flex items-center justify-center p-1 focus-visible:ring-1 focus-visible:ring-ember"
              aria-label={`Jump to Chapter ${ch.number}: ${ch.title}`}
            >
              {/* Floating Tooltip Label */}
              <div className="absolute right-7 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-void-950 border border-cinematic-border px-2.5 py-1 text-[10px] font-mono text-cinematic-white whitespace-nowrap shadow-lg flex items-center gap-2">
                <span className="text-ember font-bold">{ch.number}</span>
                <span>{ch.title}</span>
              </div>

              {/* Pip Dot Indicator */}
              <div
                className={`w-3 h-3 rotate-45 border transition-all ${
                  isActive
                    ? 'border-ember bg-ember shadow-[0_0_10px_#FF6B1A] scale-125'
                    : 'border-cinematic-border bg-void-950 group-hover:border-cinematic-white'
                }`}
              />
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default LevelScrollProgress;
