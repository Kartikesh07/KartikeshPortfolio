import { useState } from 'react';
import { motion } from 'motion/react';
import { Code2, Database, Gamepad, Users, Brain, Cpu, Globe, Box, Terminal, Workflow, GitBranch, Zap } from 'lucide-react';

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const skills = [
    {
      category: "PROGRAMMING",
      icon: <Terminal size={20} />,
      color: "sea",
      items: [
        { name: "Java", icon: <Terminal size={20} />, level: 90, unlocked: true },
        { name: "Python", icon: <Terminal size={20} />, level: 85, unlocked: true },
        { name: "C/C++", icon: <Code2 size={20} />, level: 80, unlocked: true }
      ]
    },
    {
      category: "DEVELOPMENT",
      icon: <Gamepad size={20} />,
      color: "chaos",
      items: [
        { name: "Game Development", icon: <Gamepad size={20} />, level: 95, unlocked: true },
        { name: "Web Development", icon: <Globe size={20} />, level: 85, unlocked: true },
        { name: "3D Modeling", icon: <Box size={20} />, level: 80, unlocked: true }
      ]
    },
    {
      category: "TECHNICAL",
      icon: <Cpu size={20} />,
      color: "beacon",
      items: [
        { name: "DSA", icon: <GitBranch size={20} />, level: 85, unlocked: true },
        { name: "Database & SQL", icon: <Database size={20} />, level: 80, unlocked: true },
        { name: "System Architecture", icon: <Cpu size={20} />, level: 75, unlocked: true }
      ]
    },
    {
      category: "SOFT SKILLS",
      icon: <Users size={20} />,
      color: "azure",
      items: [
        { name: "Collaboration", icon: <Users size={20} />, level: 95, unlocked: true },
        { name: "Problem Solving", icon: <Brain size={20} />, level: 90, unlocked: true },
        { name: "Adaptability", icon: <Workflow size={20} />, level: 90, unlocked: true }
      ]
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      sea: {
        border: 'border-jc3-sea',
        text: 'text-jc3-sea',
        bg: 'bg-jc3-sea',
        glow: '0 0 20px rgba(0, 174, 239, 0.4)',
        gradient: 'from-jc3-sea to-jc3-azure',
      },
      chaos: {
        border: 'border-jc3-chaos',
        text: 'text-jc3-chaos',
        bg: 'bg-jc3-chaos',
        glow: '0 0 20px rgba(255, 69, 0, 0.4)',
        gradient: 'from-jc3-chaos to-jc3-explosion',
      },
      beacon: {
        border: 'border-jc3-beacon',
        text: 'text-jc3-beacon',
        bg: 'bg-jc3-beacon',
        glow: '0 0 20px rgba(255, 215, 0, 0.4)',
        gradient: 'from-jc3-beacon to-jc3-explosion',
      },
      azure: {
        border: 'border-jc3-azure',
        text: 'text-jc3-azure',
        bg: 'bg-jc3-azure',
        glow: '0 0 20px rgba(0, 212, 255, 0.4)',
        gradient: 'from-jc3-azure to-jc3-sea',
      }
    };
    return colors[color] || colors.sea;
  };

  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 25,
  };

  return (
    <motion.section
      id="skills"
      className="py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(rgba(0, 174, 239, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 174, 239, 0.5) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={springConfig}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 border border-jc3-sea/30 bg-jc3-night/50">
            <Zap size={18} className="text-jc3-sea" />
            <span className="font-mono text-xs text-jc3-muted tracking-wider">GEAR_MODS.EXE</span>
          </div>

          <h2 className="font-military text-4xl md:text-5xl tracking-wider text-white mb-4">
            SKILLS & <span className="text-jc3-sea">EXPERTISE</span>
          </h2>

          <p className="font-tech text-jc3-muted max-w-2xl mx-auto">
            Unlocked abilities and gear modifications acquired through countless missions
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {skills.map((category, idx) => {
            const colorClasses = getColorClasses(category.color);
            const isActive = activeCategory === idx;

            return (
              <motion.button
                key={category.category}
                onClick={() => setActiveCategory(idx)}
                className={`relative flex items-center gap-2 px-6 py-3 font-military tracking-wider text-sm
                  transition-all duration-300
                  ${isActive
                    ? `${colorClasses.bg} text-jc3-night`
                    : 'bg-jc3-slate/50 text-jc3-muted hover:text-white border border-jc3-steel'
                  }`}
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                  boxShadow: isActive ? colorClasses.glow : 'none'
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.icon}
                {category.category}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills Grid - Gear Mods Style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {skills[activeCategory].items.map((skill, skillIdx) => {
            const colorClasses = getColorClasses(skills[activeCategory].color);
            const isHovered = hoveredSkill === `${activeCategory}-${skillIdx}`;

            return (
              <motion.div
                key={skill.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ...springConfig, delay: skillIdx * 0.1 }}
                className="relative glass-card p-6"
                style={{
                  boxShadow: isHovered ? colorClasses.glow : 'none'
                }}
                onMouseEnter={() => setHoveredSkill(`${activeCategory}-${skillIdx}`)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Corner accent */}
                <div className={`absolute top-0 right-0 w-0 h-0
                  border-t-[30px] ${colorClasses.border} border-t-transparent
                  border-r-[30px] ${colorClasses.border}
                  opacity-30`}
                  style={{ borderTopColor: 'transparent' }}
                />

                {/* Skill Icon */}
                <motion.div
                  className={`w-14 h-14 flex items-center justify-center mb-4
                    border-2 ${colorClasses.border} bg-jc3-night/50`}
                  style={{
                    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                  }}
                  animate={{
                    rotate: isHovered ? 360 : 0,
                    scale: isHovered ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={colorClasses.text}>{skill.icon}</span>
                </motion.div>

                {/* Skill Name */}
                <h3 className="font-military text-lg tracking-wider text-white mb-2">
                  {skill.name}
                </h3>

                {/* Status */}
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-2 h-2 rounded-full ${colorClasses.bg} animate-pulse`} />
                  <span className="font-mono text-xs text-jc3-muted">
                    {skill.unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="relative h-2 bg-jc3-night rounded-sm overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: skillIdx * 0.15, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${colorClasses.gradient}`}
                    style={{ boxShadow: colorClasses.glow }}
                  />

                  {/* Animated fill on hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  )}
                </div>

                {/* Level indicator */}
                <div className="flex justify-between items-center mt-2">
                  <span className="font-mono text-xs text-jc3-muted">LEVEL</span>
                  <span className={`font-military text-lg ${colorClasses.text}`}>
                    {skill.level}%
                  </span>
                </div>

                {/* Decorative lines */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-jc3-steel to-transparent" />
              </motion.div>
            );
          })}
        </div>

        {/* Total Stats */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ...springConfig, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 border border-jc3-sea/30 bg-jc3-night/50">
            <div className="text-center">
              <span className="font-military text-2xl text-jc3-sea">12</span>
              <p className="font-mono text-xs text-jc3-muted">SKILLS</p>
            </div>
            <div className="w-[1px] h-8 bg-jc3-steel" />
            <div className="text-center">
              <span className="font-military text-2xl text-jc3-chaos">100%</span>
              <p className="font-mono text-xs text-jc3-muted">UNLOCKED</p>
            </div>
            <div className="w-[1px] h-8 bg-jc3-steel" />
            <div className="text-center">
              <span className="font-military text-2xl text-jc3-beacon">MAX</span>
              <p className="font-mono text-xs text-jc3-muted">POTENTIAL</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;
