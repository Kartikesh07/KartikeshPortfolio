import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { sfx } from '../utils/soundEffects';
import TextScramble from './TextScramble';

const CampaignTimeline = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  const operations = [
    {
      level: 'LEVEL 05 &bull; CURRENT ROLE',
      role: 'GAME DEVELOPER INTERN',
      organization: 'GAMEWISE',
      period: '2024 — PRESENT',
      status: 'ACTIVE OPERATION',
      badge: 'GAME DEV',
      desc: 'Designing and engineering core gameplay mechanics, player movement physics, and real-time interaction systems. Integrating engine asset pipelines and refining build performance.',
      deliverables: [
        'Engineering responsive gameplay loops and character mechanics',
        'Collision optimization, input handling, and runtime stability',
        'Collaborating on sprint milestones, asset integration, and playtesting'
      ]
    },
    {
      level: 'LEVEL 04 &bull; ENTERPRISE AI',
      role: 'FULL STACK AI DEVELOPER INTERN',
      organization: 'KRAVOS TECH',
      period: '2024',
      status: 'MISSION COMPLETE',
      badge: 'FULL STACK AI',
      desc: 'Architecting full-stack AI data solutions. Developed backend data ingestion pipelines in Python, connected machine learning models to production REST APIs, and designed responsive React analytics dashboards.',
      deliverables: [
        'Production AI inference integration with low-latency APIs',
        'Scalable React and Next.js dashboard UI architectures',
        'Optimized data schema modeling and caching layers'
      ]
    },
    {
      level: 'LEVEL 03 &bull; MOBILE CAMPAIGN',
      role: 'DEVELOPMENT LEAD INTERN',
      organization: 'RURAL GAMES (MOBILE TITLE)',
      period: '2023 — 2024',
      status: 'MISSION COMPLETE',
      badge: 'GAME LEADERSHIP',
      desc: 'Directed core gameplay architecture and mechanics implementation for a mobile title. Led junior developers, established Git branching protocols, and tuned mobile frame rates for steady 60 FPS performance.',
      deliverables: [
        'Led gameplay loop implementation and touch input responsiveness',
        'Optimized texture atlases and draw calls for mobile hardware',
        'Enforced Git workflows, PR reviews, and sprint delivery milestones'
      ]
    },
    {
      level: 'LEVEL 02 &bull; SOFTWARE ENGINEERING',
      role: 'SOFTWARE ENGINEERING INTERN',
      organization: 'CODENUCLEUS SOLUTIONS',
      period: '2023',
      status: 'MISSION COMPLETE',
      badge: 'SYSTEMS DEV',
      desc: 'Engineered web applications and modular UI components. Implemented clean state management, integrated third-party REST services, and optimized client-side bundle performance.',
      deliverables: [
        'Built full-stack web features using modern JavaScript frameworks',
        'Designed database schemas and resolved API query bottlenecks',
        'Collaborated in Agile sprints with continuous CI/CD integration'
      ]
    },
    {
      level: 'LEVEL 01 &bull; PUBLIC SYSTEMS',
      role: 'TECHNICAL SYSTEMS INTERN',
      organization: 'SOLAPUR MUNICIPAL CORPORATION',
      period: '2022 — 2023',
      status: 'MISSION COMPLETE',
      badge: 'CIVIC DATA',
      desc: 'Collaborated on digital transformation initiatives, civic data reporting systems, and administrative record management interfaces for municipal digital services.',
      deliverables: [
        'Assisted in data migration and digital verification workflows',
        'Developed administrative reporting tools and query scripts',
        'Ensured data integrity across multi-departmental records'
      ]
    }
  ];

  return (
    <section
      id="campaign"
      ref={sectionRef}
      className="py-28 relative overflow-hidden bg-void-950 border-b border-cinematic-border"
      aria-label="Campaign - Career Timeline"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-10" aria-hidden="true">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'radial-gradient(circle at 10% 80%, rgba(255, 107, 26, 0.1) 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-void-800 border border-cinematic-border text-ember font-mono text-xs tracking-[0.2em] uppercase mb-3">
            <span className="w-1.5 h-1.5 bg-ember rounded-full" />
            CHAPTER 05 &bull; CAMPAIGN PROGRESSION
          </div>
          <h2 className="font-cinematic text-5xl sm:text-6xl md:text-7xl text-cinematic-white tracking-tight leading-none">
            <TextScramble text="OPERATION TIMELINE" />
          </h2>
          <p className="font-mono text-xs text-cinematic-muted tracking-widest uppercase mt-2">
            MISSION SELECT &bull; INDUSTRY ROLES &amp; TECHNICAL INTERNSHIPS
          </p>
        </div>

        {/* Campaign Timeline Map */}
        <div className="relative pl-6 sm:pl-10 space-y-12">
          {/* Vertical Tactical Rail */}
          <div className="absolute left-[7px] sm:left-[11px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-ember via-ember/40 to-cinematic-border" />

          {operations.map((op, idx) => (
            <motion.div
              key={op.organization}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.12 * idx, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => sfx.playHover()}
              className="relative group text-left"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[30px] sm:-left-[47px] top-6 w-5 h-5 bg-void-950 border-2 border-ember flex items-center justify-center group-hover:scale-125 group-hover:shadow-[0_0_12px_#FF6B1A] transition-all">
                <div className="w-1.5 h-1.5 bg-ember" />
              </div>

              {/* Mission Card Panel */}
              <div className="cinematic-panel p-6 sm:p-8 relative hover:border-ember group-hover:bg-void-900/90 transition-all">
                <div className="reticle-corner-tr" />
                <div className="reticle-corner-br" />

                {/* Level / Status Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-cinematic-border pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-ember font-bold tracking-wider" dangerouslySetInnerHTML={{ __html: op.level }} />
                    <span className="px-2 py-0.5 bg-void-800 text-cinematic-silver font-mono text-[10px] border border-cinematic-border">
                      {op.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs text-cinematic-muted">
                    <span>{op.period}</span>
                    <span className="text-cinematic-darkMuted">•</span>
                    <span className="text-ember font-semibold">{op.status}</span>
                  </div>
                </div>

                {/* Role & Org */}
                <div className="mb-4">
                  <h3 className="font-cinematic text-2xl sm:text-3xl text-cinematic-white group-hover:text-ember transition-colors leading-tight">
                    {op.role}
                  </h3>
                  <h4 className="font-display text-base text-cinematic-silver font-semibold tracking-wide">
                    {op.organization}
                  </h4>
                </div>

                <p className="text-sm text-cinematic-muted leading-relaxed mb-5 font-normal">
                  {op.desc}
                </p>

                {/* Key Deliverables */}
                <div className="space-y-1.5 pt-4 border-t border-cinematic-border/60">
                  <span className="font-mono text-[10px] text-cinematic-darkMuted uppercase block mb-2">
                    OPERATION DELIVERABLES
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {op.deliverables.map((item, i) => (
                      <div
                        key={i}
                        className="p-2 bg-void-950/70 border border-cinematic-border text-xs font-mono text-cinematic-silver flex items-start gap-1.5"
                      >
                        <span className="text-ember">›</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampaignTimeline;
