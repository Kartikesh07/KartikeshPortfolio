import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Play, ArrowRight } from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import TextScramble from './TextScramble';
import HeroFloatingIsland from './3d/HeroFloatingIsland';

const CinematicHero = ({ onExplore }) => {
  const containerRef = useRef(null);

  // 3D Mouse Parallax Tilt Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const bgShiftX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const bgShiftY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  // Magnetic Button state
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const handleMagneticMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.35;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.35;
    setBtnOffset({ x, y });
  };

  const handleMagneticLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: 60, opacity: 0, filter: 'blur(10px)' },
    visible: {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const hudVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen relative flex items-center justify-center pt-24 pb-16 overflow-hidden select-none perspective-1000"
      aria-label="Prologue - Title Card"
    >
      {/* 3D WebGL Floating Island Centerpiece (Lazy Loaded with WebGL Detection) */}
      <HeroFloatingIsland />

      {/* Background Depth Grids & Anamorphic Glow responding to mouse parallax */}
      <motion.div
        style={{ x: bgShiftX, y: bgShiftY }}
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Central Ember Atmosphere Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-ember/10 blur-[150px] rounded-full pointer-events-none" />

        {/* Horizon Anamorphic Light Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ember/30 to-transparent shadow-[0_0_20px_#FF6B1A]" />
      </motion.div>

      {/* Cinematic HUD Corner Framing */}
      <div className="absolute top-28 left-6 sm:left-12 w-8 h-8 border-t-2 border-l-2 border-cinematic-borderBright pointer-events-none" aria-hidden="true" />
      <div className="absolute top-28 right-6 sm:right-12 w-8 h-8 border-t-2 border-r-2 border-cinematic-borderBright pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-12 left-6 sm:left-12 w-8 h-8 border-b-2 border-l-2 border-cinematic-borderBright pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-12 right-6 sm:right-12 w-8 h-8 border-b-2 border-r-2 border-cinematic-borderBright pointer-events-none" aria-hidden="true" />

      {/* Hero Content Staging with 3D Tilt */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="max-w-6xl mx-auto px-6 relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col items-center"
        >
          {/* Eyebrow / Production Sting */}
          <motion.div
            variants={hudVariants}
            className="inline-flex items-center gap-3 px-4 py-1.5 mb-6 bg-void-800/80 border border-cinematic-border rounded-none shadow-hud-panel"
          >
            <span className="w-2 h-2 bg-ember rotate-45 shadow-[0_0_8px_#FF6B1A]" />
            <span className="font-mono text-xs tracking-[0.25em] text-cinematic-silver uppercase">
              CHAPTER 01 &bull; SHOWREEL
            </span>
            <span className="text-cinematic-darkMuted">|</span>
            <span className="font-mono text-xs tracking-widest text-ember">
              ACT 2026
            </span>
          </motion.div>

          {/* Main Cinematic Name Title */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              variants={titleVariants}
              className="font-cinematic text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] leading-[0.88] tracking-tight text-cinematic-white drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            >
              <TextScramble text="KARTIKESH" />
            </motion.h1>
          </div>

          {/* Subtitle / Role Designation */}
          <motion.div variants={titleVariants} className="mb-6 flex items-center justify-center gap-3 flex-wrap">
            <div className="h-[1px] w-12 bg-ember/60 hidden sm:block" />
            <p className="font-display text-xl sm:text-2xl md:text-3xl tracking-[0.18em] text-ember uppercase font-semibold">
              GAME DEVELOPER &amp; FULL-STACK ENGINEER
            </p>
            <div className="h-[1px] w-12 bg-ember/60 hidden sm:block" />
          </motion.div>

          {/* Narrative Logline / Tagline */}
          <motion.p
            variants={titleVariants}
            className="max-w-2xl text-cinematic-muted text-base sm:text-lg leading-relaxed mb-10 font-normal"
          >
            Crafting tactile virtual worlds in <span className="text-cinematic-white font-medium">Godot</span> &amp; <span className="text-cinematic-white font-medium">Unreal Engine 5</span>, engineered with custom C++ runtime tooling, procedural generation, and full-stack AI data architectures. Currently Game Developer Intern at <span className="text-cinematic-white font-medium">GameWise</span>.
          </motion.p>

          {/* Action CTAs with Magnetic Effect */}
          <motion.div variants={hudVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <motion.button
              animate={{ x: btnOffset.x, y: btnOffset.y }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              onMouseMove={handleMagneticMove}
              onMouseLeave={handleMagneticLeave}
              onClick={() => {
                sfx.playSting();
                onExplore('missions');
              }}
              onMouseEnter={() => sfx.playHover()}
              className="btn-cinematic group"
              data-cursor="view"
            >
              <Play size={16} className="fill-current text-void-950" />
              <span>LAUNCH SHOWREEL</span>
            </motion.button>

            <button
              onClick={() => {
                sfx.playClick();
                onExplore('origin');
              }}
              onMouseEnter={() => sfx.playHover()}
              className="btn-ghost"
              data-cursor="open"
            >
              <span>DEVELOPER DOSSIER</span>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Press Start / Scroll Indicator */}
          <motion.div
            variants={hudVariants}
            className="flex flex-col items-center gap-2 cursor-pointer group pt-4"
            onClick={() => {
              sfx.playWhoosh();
              onExplore('origin');
            }}
          >
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-cinematic-muted uppercase group-hover:text-ember transition-colors">
              <span className="inline-block w-1.5 h-1.5 bg-ember rounded-full animate-ping" />
              <span>SCROLL TO INITIALIZE</span>
            </div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="p-1 text-cinematic-muted group-hover:text-ember transition-colors"
            >
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Side Meta Telemetry */}
      <div className="absolute left-6 bottom-8 hidden xl:flex flex-col gap-1 text-left font-mono text-[10px] text-cinematic-darkMuted">
        <span>COORDINATES: 18.5204° N, 73.8567° E</span>
        <span>SPECIALTY: GODOT • UE5 • C++ • GDSCRIPT</span>
        <span>ROLE: GAME DEVELOPER INTERN @ GAMEWISE</span>
      </div>

      <div className="absolute right-6 bottom-8 hidden xl:flex flex-col items-end gap-1 text-right font-mono text-[10px] text-cinematic-darkMuted">
        <span>DEGREE: B.TECH IN AI &amp; DATA SCIENCE</span>
        <span>TARGET: AAA SHOWCASE</span>
        <span className="text-ember">STATUS: READY TO DEPLOY</span>
      </div>
    </section>
  );
};

export default CinematicHero;
