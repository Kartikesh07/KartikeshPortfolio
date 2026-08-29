import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import portraitImg from './img/Portarait_Photo.jpg';
import { sfx } from '../utils/soundEffects';
import TextScramble from './TextScramble';

// Animated Number Counter Hook with easeOutExpo Curve and Completion Glow
const StatCounter = ({ target, suffix = '', inView }) => {
  const [count, setCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const end = parseInt(target, 10) || 0;
    const duration = 1800;
    const startTime = performance.now();

    const updateCounter = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out exponential curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentVal = Math.floor(easeProgress * end);

      setCount(currentVal);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
        setIsCompleted(true);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [inView, target]);

  return (
    <span className={`tabular-nums inline-block ${isCompleted ? 'counter-glow-pulse text-ember' : ''}`}>
      {count}
      {suffix}
    </span>
  );
};

const OriginSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const stats = [
    { label: "YEARS IN GAME DEV", value: 4, suffix: "+", desc: "Crafting indie systems since 2022" },
    { label: "ENGINES MASTERED", value: 3, suffix: "", desc: "Godot 4, Unreal 5/4 & Unity" },
    { label: "SHIPPED & PROTOTYPES", value: 12, suffix: "+", desc: "itch.io titles & technical demos" },
    { label: "AI & SIMULATION PIPELINES", value: 8, suffix: "+", desc: "Full-stack AI models & tooling" },
  ];

  return (
    <section
      id="origin"
      ref={sectionRef}
      className="py-28 relative overflow-hidden bg-void-900 border-t border-b border-cinematic-border"
      aria-label="Origin - Developer Dossier"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 107, 26, 0.08) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-void-800 border border-cinematic-border text-ember font-mono text-xs tracking-[0.2em] uppercase mb-3">
            <span className="w-1.5 h-1.5 bg-ember rounded-full" />
            CHAPTER 02 &bull; DEVELOPER DOSSIER
          </div>
          <h2 className="font-cinematic text-5xl sm:text-6xl md:text-7xl text-cinematic-white tracking-tight leading-none">
            <TextScramble text="CHARACTER ORIGIN & LOGS" />
          </h2>
          <p className="font-mono text-xs text-cinematic-muted tracking-widest uppercase mt-2">
            PROFILE: KARTIKESH &bull; COMPLETED B.TECH IN AI &amp; DATA SCIENCE
          </p>
        </div>

        {/* 2-Column Character Bio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left: Bio Narrative Dossier */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            <div className="cinematic-panel p-8 relative border-l-2 border-l-ember">
              <div className="reticle-corner-tr" />
              <div className="reticle-corner-br" />

              <div className="flex items-center justify-between border-b border-cinematic-border pb-4 mb-6">
                <span className="font-mono text-xs text-ember tracking-widest uppercase">
                  OPERATOR LOG ENTRY #042
                </span>
                <span className="font-mono text-xs text-cinematic-darkMuted">
                  CLEARANCE: VERIFIED
                </span>
              </div>

              <div className="space-y-4 text-cinematic-silver leading-relaxed text-sm sm:text-base font-normal">
                <p>
                  I am a game developer and full-stack software engineer with a <strong className="text-cinematic-white">Completed B.Tech in Artificial Intelligence &amp; Data Science</strong>. Since 2022, I’ve operated across indie game development, custom engine architecture, and production full-stack systems.
                </p>
                <p>
                  Currently, I am working as a <strong className="text-cinematic-white">Game Developer Intern at GameWise</strong>, focusing on interactive game mechanics, physics tuning, and engine pipeline workflows.
                </p>
                <p>
                  My engineering workflow balances low-level mechanics and spatial aesthetics: from writing <strong className="text-cinematic-white">Godot 4 GDScript procedural sky-ruins generators</strong> and <strong className="text-cinematic-white">Unreal Engine 5 third-person locomotion state machines</strong>, to shipping published titles on <a href="https://kartikesh007.itch.io" target="_blank" rel="noopener noreferrer" className="text-ember underline decoration-ember/40 hover:decoration-ember">itch.io (kartikesh007)</a>.
                </p>
                <p>
                  Beyond game loops, I have engineered full-stack and AI data systems, having previously served as Full Stack AI Developer intern at <strong className="text-cinematic-white">Kravos Tech</strong>, and Development Lead for mobile titles at <strong className="text-cinematic-white">Rural Games</strong>.
                </p>
              </div>

              {/* Tag Badges */}
              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-cinematic-border">
                {['GameWise Intern', 'Procedural Generation', 'UE5 Locomotion', 'Godot GDScript', 'C++ Gizmo Tools', 'Full Stack AI', 'Blender 3D'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-void-800 text-cinematic-muted text-xs font-mono border border-cinematic-border hover:border-ember/40 hover:text-ember transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Holographic Profile Display */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[4/5] cinematic-panel p-2 group">
              <div className="reticle-corner-tl" />
              <div className="reticle-corner-tr" />
              <div className="reticle-corner-bl" />
              <div className="reticle-corner-br" />

              {/* Portrait container with scanline */}
              <div className="w-full h-full relative overflow-hidden bg-void-950">
                <img
                  src={portraitImg}
                  alt="Kartikesh - Game Developer"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />

                {/* Subtle Amber Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-void-950 via-void-950/20 to-transparent pointer-events-none" />

                {/* Corner HUD Telemetry */}
                <div className="absolute top-3 left-3 px-2 py-0.5 bg-void-950/80 border border-cinematic-border text-[10px] font-mono text-ember">
                  DEV ID: KARTIKESH_007
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3 bg-void-950/90 border border-cinematic-border backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-cinematic text-lg text-cinematic-white leading-tight">KARTIKESH</h4>
                      <p className="font-mono text-[10px] text-ember">GAME DEVELOPER INTERN @ GAMEWISE</p>
                    </div>
                    <ShieldCheck size={20} className="text-ember" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Live Animated Stat Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * idx }}
              onMouseEnter={() => sfx.playHover()}
              className="cinematic-panel p-6 text-left relative group hover:border-ember"
            >
              <div className="font-mono text-[10px] tracking-widest text-cinematic-darkMuted uppercase mb-1">
                METRIC_0{idx + 1}
              </div>
              <div className="font-cinematic text-4xl sm:text-5xl text-cinematic-white group-hover:text-ember transition-colors mb-1">
                <StatCounter target={stat.value} suffix={stat.suffix} inView={isInView} />
              </div>
              <div className="font-display text-sm uppercase text-cinematic-silver font-semibold mb-1">
                {stat.label}
              </div>
              <p className="font-mono text-xs text-cinematic-muted">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OriginSection;
