import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, Github, X, Gamepad2 } from 'lucide-react';
import cyberRunImage from './img/CyberRun.png';
import nftImage from './img/NFTPic.jpeg';
import brickBreakerImage from './img/BrickBreakerIMG.webp';
import blogImage from './img/BlogImage.jpeg';
import { sfx } from '../utils/soundEffects';
import ProjectTiltCard from './ProjectTiltCard';
import TextScramble from './TextScramble';

const MissionsSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [selectedMission, setSelectedMission] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'games', 'tooling', 'ai-web'

  const missions = [
    {
      id: 'aether-ruins',
      codename: 'OP. AETHER-RUINS',
      title: 'SKY-RUINS PROCEDURAL GENERATOR',
      engine: 'GODOT 4 • GDSCRIPT',
      category: 'games',
      status: 'ACTIVE DEVELOPMENT',
      classification: 'CLASS-A TACTICAL',
      image: blogImage,
      summary: 'A procedural floating-islands level generation suite built in Godot 4. Features custom GDScript @tool editor scripts, noise-driven spatial island clustering, and dynamic sky ruins placement.',
      fullBriefing: `Engineered as an indie world-generation pipeline for floating-island adventure titles. The system utilizes 3D Simplex noise maps combined with Voronoi distance fields to generate natural archipelago clusters in real-time. Includes custom editor tools for level designers to adjust seed parameters, ruin structure density, and floating terrain chunking with zero runtime hitching.`,
      highlights: [
        'Custom @tool Editor Script Generation Suite',
        '3D Simplex & Voronoi Noise Clustered Archipelagoes',
        'Real-time Spatial Collision & Navmesh Baking',
        'Custom Sky Atmosphere & Volumetric Fog Shaders'
      ],
      tech: ['Godot 4', 'GDScript', 'Procedural Generation', '3D Shaders', 'Level Design Tooling'],
      links: {
        itch: 'https://kartikesh007.itch.io',
        github: 'https://github.com/Kartikesh07'
      }
    },
    {
      id: 'apex-locomotion',
      codename: 'OP. APEX-LOCOMOTION',
      title: 'UE5 THIRD-PERSON CHARACTER FRAMEWORK',
      engine: 'UNREAL ENGINE 5 • C++ & BLUEPRINTS',
      category: 'tooling',
      status: 'PROTOTYPE COMPLETE',
      classification: 'CORE ARCHITECTURE',
      image: cyberRunImage,
      summary: 'High-fidelity third-person locomotion system with seamless turn-in-place state machines, sprint-to-slide physics transitions, and dynamic camera damping.',
      fullBriefing: `Engineered in Unreal Engine 5 to achieve AAA character responsiveness. The architecture decouples character state logic from animation blend spaces, implementing orientation warping, distance matching for starts/stops, and a custom spring-arm camera system that intelligently occludes geometry while dampening high-speed velocity shifts.`,
      highlights: [
        'Turn-in-Place & Distance Matching State Machine',
        'Momentum-Preserving Sprint, Slide & Vault Physics',
        'Dynamic Camera Spring-Arm with Occlusion Avoidance',
        'Hybrid C++ Backend with Blueprint-Exposed Modifiers'
      ],
      tech: ['Unreal Engine 5', 'C++', 'Animation Blueprints', 'State Machines', 'Camera Rigging'],
      links: {
        github: 'https://github.com/Kartikesh07'
      }
    },
    {
      id: 'cyber-run',
      codename: 'OP. CYBER-RUN',
      title: 'CYBER RUN: 3D ACTION PLATFORMER',
      engine: 'UNREAL ENGINE • BLENDER 3D',
      category: 'games',
      status: 'SHIPPED ON ITCH.IO',
      classification: 'PUBLIC RELEASE',
      image: cyberRunImage,
      summary: 'A fast-paced 3D cyberpunk parkour platformer published on itch.io, featuring custom hard-surface 3D assets, dynamic hazard systems, and responsive movement mechanics.',
      fullBriefing: `Shipped to itch.io under username kartikesh007. Built from concept to full playable release: all cyberpunk neon skyscrapers, modular obstacle platforms, and player character models were modeled and UV-mapped in Blender. Programmed with responsive physical momentum, jump buffers, checkpoint telemetry, and optimized 60fps rendering.`,
      highlights: [
        'Published & Playable Globally on itch.io',
        'Hand-Crafted 3D Cyberpunk Assets in Blender',
        'Precise Jump-Buffer & Velocity Ramp Physics',
        'Dynamic Moving Obstacles & Hazard Collision Handlers'
      ],
      tech: ['Unreal Engine', 'Blender', '3D Modeling', 'Game Physics', 'itch.io Deployment'],
      links: {
        itch: 'https://kartikesh007.itch.io/cyber-run',
        github: 'https://github.com/Kartikesh07'
      }
    },
    {
      id: 'runtime-gizmo',
      codename: 'OP. GIZMO-CORE',
      title: 'UE4 RUNTIME TRANSFORM GIZMO FRAMEWORK',
      engine: 'UNREAL ENGINE 4 • C++',
      category: 'tooling',
      status: 'MODULE COMPLETE',
      classification: 'SYSTEM TOOLKIT',
      image: brickBreakerImage,
      summary: 'In-game 3D coordinate transform gizmo (Translate, Rotate, Scale) engineered in C++ for runtime level editing, sandbox mechanics, and spatial debugging.',
      fullBriefing: `Developed a lightweight C++ plugin for runtime spatial manipulation. Implements custom screen-to-world raycasting for precise axis selection, planar constraints for 2-axis dragging, and visual debug lines rendered directly through the Unreal drawing pipeline without third-party editor dependencies.`,
      highlights: [
        'Full 3-Axis Translation, Rotation & Scale Handles',
        'Screen-to-World Coordinate Math & Hit Raycasts',
        'Zero External Asset Overhead — Lightweight C++',
        'Multi-Object Snapping & Coordinate Space Toggles'
      ],
      tech: ['Unreal Engine 4', 'C++', 'Spatial Mathematics', 'Raycasting', 'Engine Tooling'],
      links: {
        github: 'https://github.com/Kartikesh07'
      }
    },
    {
      id: 'ai-data-systems',
      codename: 'OP. NEURAL-NEXUS',
      title: 'FULL-STACK AI & SMART ASSET PLATFORM',
      engine: 'PYTHON • REACT • SUPABASE',
      category: 'ai-web',
      status: 'PRODUCTION DEPLOYED',
      classification: 'INTELLIGENCE PIPELINE',
      image: nftImage,
      summary: 'Full-stack AI analytics platform and generative on-chain collectible architecture built with Python machine learning pipelines and modern React.',
      fullBriefing: `Combines Kartikesh's AI & Data Science coursework with full-stack execution. Implements automated dataset classification pipelines, predictive algorithms, and an on-chain digital artwork engine traded on OpenSea with smart contract verification.`,
      highlights: [
        'Generative Algorithmic Artwork Engine on OpenSea',
        'Automated Python Prediction & Analysis Pipeline',
        'High-Performance React & Tailwind UI Interface',
        'Cloud Database Integration with Supabase'
      ],
      tech: ['Python', 'AI/Data Science', 'React', 'OpenSea Web3', 'Supabase'],
      links: {
        itch: 'https://opensea.io/kartikesh007',
        github: 'https://github.com/Kartikesh07'
      }
    }
  ];

  const filteredMissions = filter === 'all'
    ? missions
    : missions.filter(m => m.category === filter);

  const openMissionModal = (mission) => {
    sfx.playClick();
    setSelectedMission(mission);
  };

  const closeMissionModal = () => {
    sfx.playClick();
    setSelectedMission(null);
  };

  return (
    <section
      id="missions"
      ref={sectionRef}
      className="py-28 relative overflow-hidden bg-void-900 border-b border-cinematic-border"
      aria-label="Missions - Featured Projects"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none opacity-15" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 26, 0.08) 0%, transparent 65%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-void-800 border border-cinematic-border text-ember font-mono text-xs tracking-[0.2em] uppercase mb-3">
              <span className="w-1.5 h-1.5 bg-ember rounded-full" />
              CHAPTER 04 &bull; MISSION BRIEFINGS
            </div>
            <h2 className="font-cinematic text-5xl sm:text-6xl md:text-7xl text-cinematic-white tracking-tight leading-none">
              <TextScramble text="FEATURED MISSIONS" />
            </h2>
            <p className="font-mono text-xs text-cinematic-muted tracking-widest uppercase mt-2">
              SHOWCASE &bull; GODOT PROCEDURAL GENERATION, UE5 ARCHITECTURE &amp; SHIPPED TITLES
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'ALL MISSIONS' },
              { id: 'games', label: 'GAME TITLES' },
              { id: 'tooling', label: 'ENGINE TOOLING' },
              { id: 'ai-web', label: 'AI & FULL-STACK' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  sfx.playClick();
                  setFilter(tab.id);
                }}
                onMouseEnter={() => sfx.playHover()}
                className={`px-3 py-1.5 font-mono text-xs tracking-wider uppercase transition-all ${
                  filter === tab.id
                    ? 'bg-ember text-void-950 font-bold shadow-[0_0_12px_rgba(255,107,26,0.5)]'
                    : 'bg-void-800 text-cinematic-muted hover:text-cinematic-white border border-cinematic-border'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Missions Grid Showcase with 3D Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMissions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              <ProjectTiltCard mission={mission} onSelect={openMissionModal} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Mission Dossier Modal */}
      <AnimatePresence>
        {selectedMission && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-void-950/90 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="cinematic-panel w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-void-900 border-2 border-ember p-6 sm:p-8 relative text-left"
            >
              <div className="reticle-corner-tl" />
              <div className="reticle-corner-tr" />
              <div className="reticle-corner-bl" />
              <div className="reticle-corner-br" />

              {/* Modal Header */}
              <div className="flex items-start justify-between border-b border-cinematic-border pb-4 mb-6">
                <div>
                  <span className="font-mono text-xs text-ember tracking-widest uppercase block mb-1">
                    {selectedMission.codename} &bull; {selectedMission.classification}
                  </span>
                  <h3 className="font-cinematic text-3xl sm:text-4xl text-cinematic-white leading-tight">
                    {selectedMission.title}
                  </h3>
                  <p className="font-mono text-xs text-cinematic-muted mt-1">
                    ENGINE: {selectedMission.engine}
                  </p>
                </div>

                <button
                  onClick={closeMissionModal}
                  className="p-2 bg-void-800 hover:bg-ember hover:text-void-950 text-cinematic-white border border-cinematic-border transition-colors"
                  aria-label="Close Dossier"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Media Preview */}
              <div className="relative w-full h-64 sm:h-80 bg-void-950 mb-6 border border-cinematic-border overflow-hidden">
                <img
                  src={selectedMission.image}
                  alt={selectedMission.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void-900 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-void-950/90 border border-cinematic-border text-xs font-mono text-ember">
                  STATUS: {selectedMission.status}
                </div>
              </div>

              {/* Full Technical Briefing */}
              <div className="space-y-6 text-sm text-cinematic-silver leading-relaxed mb-8">
                <div>
                  <h4 className="font-mono text-xs text-ember uppercase tracking-wider mb-2">
                    EXECUTIVE TECHNICAL BRIEFING
                  </h4>
                  <p>{selectedMission.fullBriefing}</p>
                </div>

                <div>
                  <h4 className="font-mono text-xs text-ember uppercase tracking-wider mb-2">
                    KEY BLUEPRINT SPECIFICATIONS
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedMission.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-void-950 border border-cinematic-border text-xs font-mono text-cinematic-silver flex items-start gap-2"
                      >
                        <span className="text-ember font-bold">›</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Full Strip */}
                <div>
                  <h4 className="font-mono text-xs text-cinematic-darkMuted uppercase tracking-wider mb-2">
                    INSTRUMENTATION &amp; TECH
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMission.tech.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-void-800 text-cinematic-white text-xs font-mono border border-cinematic-border"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-cinematic-border">
                {selectedMission.links?.itch && (
                  <a
                    href={selectedMission.links.itch}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sfx.playHover()}
                    onClick={() => sfx.playClick()}
                    className="btn-cinematic"
                  >
                    <Gamepad2 size={16} />
                    <span>LAUNCH ON ITCH.IO</span>
                    <ExternalLink size={14} />
                  </a>
                )}

                {selectedMission.links?.github && (
                  <a
                    href={selectedMission.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sfx.playHover()}
                    onClick={() => sfx.playClick()}
                    className="btn-ghost"
                  >
                    <Github size={16} />
                    <span>SOURCE REPOSITORY</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MissionsSection;
