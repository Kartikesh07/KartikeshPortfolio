import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

const ProjectTiltCard = ({ mission, onSelect }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position normalized (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D rotation
  const springConfig = { damping: 20, stiffness: 220, mass: 0.5 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-7, 7]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['0%', '100%']);

  // Magnetic button pull
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = cardRef.current.getBoundingClientRect();
    const mouseXPos = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseYPos = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(mouseXPos);
    y.set(mouseYPos);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sfx.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    setBtnOffset({ x: 0, y: 0 });
  };

  const handleMagneticMove = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const bx = (e.clientX - (rect.left + rect.width / 2)) * 0.4;
    const by = (e.clientY - (rect.top + rect.height / 2)) * 0.4;
    setBtnOffset({ x: bx, y: by });
  };

  const handleMagneticLeave = (e) => {
    e.stopPropagation();
    setBtnOffset({ x: 0, y: 0 });
  };

  return (
    <div className="perspective-1000 w-full h-full">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(mission)}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        data-cursor="view"
        className="cinematic-panel group cursor-pointer text-left flex flex-col justify-between overflow-hidden relative w-full h-full transition-shadow duration-300"
      >
        {/* Reticle Brackets */}
        <div className="reticle-corner-tl" />
        <div className="reticle-corner-tr" />
        <div className="reticle-corner-bl" />
        <div className="reticle-corner-br" />

        {/* Dynamic Specular Gloss / Glare Layer */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none z-30 opacity-25"
            style={{
              background: `radial-gradient(400px circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.4), transparent 80%)`,
            }}
          />
        )}

        <div>
          {/* Image Header with Scanline & Animated Shimmer */}
          <div className="relative w-full h-52 bg-void-950 overflow-hidden">
            <img
              src={mission.image}
              alt={mission.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-void-900/40 to-transparent" />

            {/* Hover Scanline Shimmer */}
            <div
              className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: 'linear-gradient(rgba(255, 107, 26, 0.15) 1px, transparent 1px)',
                backgroundSize: '100% 4px',
              }}
            />

            {/* Top HUD Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
              <span className="px-2 py-0.5 bg-void-950/90 border border-cinematic-border font-mono text-[9px] text-ember uppercase">
                {mission.codename}
              </span>
            </div>

            <div className="absolute top-3 right-3 z-10">
              <span className="px-2 py-0.5 bg-ember/15 border border-ember/40 font-mono text-[9px] text-ember uppercase">
                {mission.classification}
              </span>
            </div>
          </div>

          {/* Content Dossier Body */}
          <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
            <div className="font-mono text-[10px] text-ember tracking-widest uppercase mb-1">
              {mission.engine}
            </div>
            <h3 className="font-cinematic text-2xl sm:text-3xl text-cinematic-white group-hover:text-ember transition-colors leading-tight mb-3">
              {mission.title}
            </h3>
            <p className="text-xs sm:text-sm text-cinematic-muted line-clamp-3 leading-relaxed mb-6 font-normal">
              {mission.summary}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {mission.tech.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] font-mono px-2 py-0.5 bg-void-950 text-cinematic-silver border border-cinematic-border"
                >
                  {tag}
                </span>
              ))}
              {mission.tech.length > 3 && (
                <span className="text-[10px] font-mono px-2 py-0.5 bg-void-950 text-cinematic-darkMuted border border-cinematic-border">
                  +{mission.tech.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Card Footer Action with Magnetic Pull */}
        <div
          className="p-6 pt-0 flex items-center justify-between border-t border-cinematic-border/60"
          style={{ transform: 'translateZ(25px)' }}
        >
          <span className="font-mono text-[10px] text-cinematic-muted uppercase tracking-wider group-hover:text-cinematic-white transition-colors">
            INSPECT DOSSIER
          </span>

          <motion.div
            animate={{ x: btnOffset.x, y: btnOffset.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="w-8 h-8 rounded-none bg-void-800 border border-cinematic-border group-hover:border-ember group-hover:bg-ember group-hover:text-void-950 flex items-center justify-center transition-all"
          >
            <ChevronRight size={16} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectTiltCard;
