import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Gamepad2, Code2, Cpu } from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import TextScramble from './TextScramble';

const ArsenalSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const categories = [
    {
      id: 'engines',
      label: 'GAME ENGINES & SPATIAL TECH',
      icon: <Gamepad2 size={16} />,
      items: [
        {
          name: 'Godot Engine 4',
          level: 'PROFICIENT • ADVANCED',
          score: 94,
          desc: 'Primary engine for indie development. Custom GDScript procedural generation tools, tilemap baking, spatial physics, and custom visual shaders.',
          specs: ['Procedural Generation', 'Custom GDScript Tooling', '2D/3D Lighting', 'Export Pipelines']
        },
        {
          name: 'Unreal Engine 5 & 4',
          level: 'PROFICIENT • TECHNICAL',
          score: 90,
          desc: 'Third-person character controllers, turn-in-place state machines, C++ runtime gizmo tooling, Blueprints visual scripting, and Lumen/Nanite scene optimization.',
          specs: ['C++ & Blueprints', 'Locomotion State Machines', 'Runtime Gizmos', 'Physics Simulation']
        },
        {
          name: 'Unity 3D',
          level: 'INTERMEDIATE • GAMEPLAY',
          score: 82,
          desc: 'C# gameplay mechanics, physics collision layers, UI canvas orchestration, and mobile build pipelines.',
          specs: ['C# Scripting', 'Prefab Systems', 'Collision Layers', 'Mobile Optimization']
        },
        {
          name: 'Blender 3D',
          level: 'SPECIALIST • PIPELINE',
          score: 86,
          desc: 'Hard-surface 3D modeling, UV unwrapping, modular environment tile generation, and GLTF/FBX export pipeline for game engines.',
          specs: ['Hard-Surface Modeling', 'Modular Kitbashing', 'PBR Material Setup', 'Engine Asset Pipeline']
        }
      ]
    },
    {
      id: 'languages',
      label: 'CORE CODE & ARCHITECTURE',
      icon: <Code2 size={16} />,
      items: [
        {
          name: 'C & C++',
          level: 'SYSTEM ARCHITECTURE',
          score: 88,
          desc: 'Memory-safe algorithms, low-level engine integration, Unreal Engine C++ modules, spatial math, and runtime debug gizmos.',
          specs: ['Engine Plugins', 'Memory Allocation', 'Vector Math', 'Pointer Optimization']
        },
        {
          name: 'GDScript',
          level: 'NATIVE ENGINE LOGIC',
          score: 95,
          desc: 'High-speed game loop execution, procedural level generation algorithms, custom editor tool scripts (@tool), and event-driven signals.',
          specs: ['Editor Tool Scripts', 'Signal Architectures', 'Procedural Math', 'Tilemap Algorithms']
        },
        {
          name: 'Python',
          level: 'AI & DATA SYSTEMS',
          score: 92,
          desc: 'AI & Data Science pipelines, automated simulation scripts, procedural math, and backend microservices.',
          specs: ['Machine Learning', 'Data Pipelines', 'Automation Scripts', 'FastAPI & PyTorch']
        },
        {
          name: 'C# (.NET)',
          level: 'GAMEPLAY ARCHITECTURE',
          score: 84,
          desc: 'Object-oriented architecture for Unity games and tool scripts with strong design patterns.',
          specs: ['Design Patterns', 'Async/Await', 'Event Systems', 'Data Serialization']
        },
        {
          name: 'TypeScript & JavaScript',
          level: 'FULL-STACK FRONTEND',
          score: 90,
          desc: 'High-performance interactive web apps, React/Next.js interfaces, GSAP scroll-driven animations, and typed data schemas.',
          specs: ['Type Safety', 'GSAP Animation', 'React Ecosystem', 'Component Design']
        },
        {
          name: 'Java',
          level: 'OOP FOUNDATIONS',
          score: 88,
          desc: 'Custom physics engines, collision resolution matrices, multi-threaded algorithms, and desktop software.',
          specs: ['Custom Collision Matrices', 'Multithreading', 'OOP Hierarchy', 'Algorithm Design']
        }
      ]
    },
    {
      id: 'pipeline',
      label: 'FULL-STACK & SYSTEM PIPELINE',
      icon: <Cpu size={16} />,
      items: [
        {
          name: 'React & Next.js',
          level: 'FRONTEND ARCHITECTURE',
          score: 92,
          desc: 'Production web applications, component architectures, Tailwind CSS styling systems, and Vercel-optimized rendering.',
          specs: ['Next.js App Router', 'State Management', 'Tailwind CSS', 'Vercel Deployment']
        },
        {
          name: 'GSAP & Framer Motion',
          level: 'CINEMATIC MOTION',
          score: 92,
          desc: 'Scroll-driven parallax, ScrollTrigger pinning, micro-interactions, responsive spring physics, and zero-jank DOM rendering.',
          specs: ['ScrollTrigger Pinning', 'Scrubbed Parallax', 'Spring Transitions', 'A11y Motion Rules']
        },
        {
          name: 'Supabase & PostgreSQL',
          level: 'DATABASE & BACKEND',
          score: 85,
          desc: 'Relational data modeling, SQL queries, row-level security, auth workflows, and cloud database administration.',
          specs: ['Postgres SQL', 'Row Level Security', 'Auth & Storage', 'REST / Realtime APIs']
        },
        {
          name: 'Git & Version Control',
          level: 'DEV OPERATIONS',
          score: 90,
          desc: 'Multi-branch feature workflows, Git LFS for large binary game assets, CI/CD actions, and GitHub repository hygiene.',
          specs: ['Git LFS (Large Assets)', 'Branching Workflows', 'CI/CD Actions', 'Merge Conflict Resolution']
        }
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedSkill, setSelectedSkill] = useState(categories[0].items[0]);

  const handleSelectSkill = (skill) => {
    sfx.playClick();
    setSelectedSkill(skill);
  };

  return (
    <section
      id="arsenal"
      ref={sectionRef}
      className="py-28 relative overflow-hidden bg-void-950 border-b border-cinematic-border"
      aria-label="Arsenal - Technical Loadout"
    >
      {/* Background HUD Grid Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-10" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255, 107, 26, 0.12) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-void-800 border border-cinematic-border text-ember font-mono text-xs tracking-[0.2em] uppercase mb-3">
            <span className="w-1.5 h-1.5 bg-ember rounded-full" />
            CHAPTER 03 &bull; TECHNICAL ARSENAL
          </div>
          <h2 className="font-cinematic text-5xl sm:text-6xl md:text-7xl text-cinematic-white tracking-tight leading-none">
            <TextScramble text="EQUIPMENT LOADOUT" />
          </h2>
          <p className="font-mono text-xs text-cinematic-muted tracking-widest uppercase mt-2">
            FIELD TOOLS &bull; ENGINES, RUNTIME LANGUAGES &amp; FULL-STACK PIPELINES
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 border-b border-cinematic-border pb-4">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sfx.playClick();
                  setActiveCategory(idx);
                  setSelectedSkill(cat.items[0]);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs tracking-wider transition-all uppercase rounded-none border ${
                  isActive
                    ? 'border-ember bg-ember/10 text-ember shadow-[0_0_15px_rgba(255,107,26,0.25)]'
                    : 'border-cinematic-border bg-void-900 text-cinematic-muted hover:text-cinematic-white hover:border-cinematic-borderBright'
                }`}
              >
                <span className={isActive ? 'text-ember' : 'text-cinematic-darkMuted'}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Loadout Grid & Inspector Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Weapon/Skill Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories[activeCategory].items.map((skill) => {
              const isSelected = selectedSkill.name === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleSelectSkill(skill)}
                  onMouseEnter={() => sfx.playHover()}
                  className={`cinematic-panel p-5 cursor-pointer text-left relative transition-all ${
                    isSelected
                      ? 'border-ember bg-void-800/90 shadow-card-lift ring-1 ring-ember/40'
                      : 'hover:border-cinematic-borderBright'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-cinematic text-xl sm:text-2xl text-cinematic-white leading-tight">
                      {skill.name}
                    </h3>
                    <span className="font-mono text-xs text-ember font-bold">
                      {skill.score}%
                    </span>
                  </div>

                  <div className="font-mono text-[10px] text-cinematic-darkMuted tracking-wider uppercase mb-3">
                    {skill.level}
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1 bg-void-950 overflow-hidden mb-3 border border-cinematic-border">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.score}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-ember-amber to-ember"
                    />
                  </div>

                  <p className="text-xs text-cinematic-muted line-clamp-2">
                    {skill.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Dedicated HUD Weapon Inspector */}
          <div className="lg:col-span-5">
            <div className="cinematic-panel p-6 sm:p-8 relative border-t-2 border-t-ember text-left bg-void-900/95 sticky top-28">
              <div className="reticle-corner-tl" />
              <div className="reticle-corner-tr" />
              <div className="reticle-corner-bl" />
              <div className="reticle-corner-br" />

              <div className="flex items-center justify-between border-b border-cinematic-border pb-3 mb-5">
                <span className="font-mono text-[10px] text-ember tracking-widest uppercase">
                  INSPECTOR &bull; TECHNICAL TELEMETRY
                </span>
                <span className="font-mono text-[10px] text-cinematic-darkMuted">
                  STATUS: OPERATIONAL
                </span>
              </div>

              <h4 className="font-cinematic text-3xl sm:text-4xl text-cinematic-white tracking-wide mb-1">
                {selectedSkill.name}
              </h4>
              <p className="font-mono text-xs text-ember font-semibold tracking-wider uppercase mb-5">
                {selectedSkill.level}
              </p>

              <div className="mb-6">
                <div className="flex justify-between font-mono text-xs text-cinematic-silver mb-1.5">
                  <span>MASTERY CALIBRATION</span>
                  <span className="text-ember">{selectedSkill.score} / 100</span>
                </div>
                <div className="w-full h-2 bg-void-950 border border-cinematic-border p-[1px]">
                  <div
                    className="h-full bg-ember transition-all duration-500 shadow-[0_0_10px_#FF6B1A]"
                    style={{ width: `${selectedSkill.score}%` }}
                  />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="font-mono text-[10px] text-cinematic-darkMuted uppercase block mb-1">
                    TACTICAL SUMMARY
                  </span>
                  <p className="text-xs sm:text-sm text-cinematic-silver leading-relaxed">
                    {selectedSkill.desc}
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[10px] text-cinematic-darkMuted uppercase block mb-2">
                    KEY CAPABILITIES &amp; PROTOCOLS
                  </span>
                  <div className="space-y-1.5">
                    {selectedSkill.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-xs font-mono text-cinematic-muted bg-void-950/60 px-2.5 py-1.5 border border-cinematic-border"
                      >
                        <span className="w-1 h-1 bg-ember" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-cinematic-border flex items-center justify-between text-[11px] font-mono text-cinematic-darkMuted">
                <span>DEPLOYMENT: PRODUCTION READY</span>
                <span className="text-ember">ARMED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArsenalSection;
