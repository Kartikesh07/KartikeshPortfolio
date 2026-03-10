import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Gamepad, Code, Trophy, Rocket,
  Star, ChevronDown, MessageCircle,
  Anchor, Target, Zap
} from 'lucide-react';
import cyberRunImage from './img/CyberRun.png';
import nftImage from './img/NFTPic.jpeg';
import brickBreakerImage from './img/BrickBreakerIMG.webp';
import blogImage from './img/BlogImage.jpeg';

const BlogSection = () => {
  const [expandedMilestone, setExpandedMilestone] = useState(null);

  const milestones = [
    {
      year: "2019",
      title: "MISSION START",
      subtitle: "From Player to Creator",
      icon: <Gamepad size={24} />,
      region: "INITIATION",
      status: "COMPLETE",
      color: "sea",
      content: `After 10th grade, my perspective on gaming transformed completely.
      What started as pure entertainment became a gateway to creation.
      I realized that every game I played was someone's creative vision brought to life through code.`,
      achievements: [
        "Started learning Python",
        "Created first Snake Game",
        "Discovered passion for game development"
      ],
      chaos: 20,
      image: blogImage
    },
    {
      year: "2020",
      title: "SKILL ACQUISITION",
      subtitle: "Learning the Art of Code",
      icon: <Code size={24} />,
      region: "TRAINING",
      status: "COMPLETE",
      color: "beacon",
      content: `Diving deep into programming fundamentals, I began with Java and Python.
      Every small success fueled my motivation. Creating simple games helped me understand
      core programming concepts in a practical, engaging way.`,
      achievements: [
        "Mastered Java basics",
        "Developed Brick Breaker game",
        "Learned about game physics"
      ],
      chaos: 40,
      image: brickBreakerImage
    },
    {
      year: "2021",
      title: "ZONE EXPANSION",
      subtitle: "Exploring New Dimensions",
      icon: <Rocket size={24} />,
      region: "ESCALATION",
      status: "COMPLETE",
      color: "explosion",
      content: `The discovery of Blender and Unreal Engine opened up a whole new dimension.
      3D modeling and game development became my new frontier. The learning curve was steep,
      but the possibilities were endless.`,
      achievements: [
        "Learned Blender basics",
        "Started Unreal Engine journey",
        "Created first 3D assets"
      ],
      chaos: 60,
      image: cyberRunImage
    },
    {
      year: "2022",
      title: "MAJOR OPERATION",
      subtitle: "Cyber Run Development",
      icon: <Trophy size={24} />,
      region: "LIBERATION",
      status: "COMPLETE",
      color: "chaos",
      content: `Cyber Run became my most ambitious project yet. This 3D adventure platformer
      combined everything I'd learned about game development, design, and user experience.
      Publishing it on itch.io was a major milestone in my journey.`,
      achievements: [
        "Completed Cyber Run development",
        "Published on itch.io",
        "Received player feedback"
      ],
      chaos: 85,
      image: cyberRunImage
    },
    {
      year: "2023",
      title: "REGIME CHANGE",
      subtitle: "Blockchain & NFTs",
      icon: <Star size={24} />,
      region: "DOMINATION",
      status: "ACTIVE",
      color: "bavarium",
      content: `Venturing into the world of NFTs marked a new chapter in my journey.
      Creating and publishing a collection on OpenSea showed me how game development skills
      could translate into other exciting technologies.`,
      achievements: [
        "Created NFT collection",
        "Published on OpenSea",
        "Explored blockchain technology"
      ],
      chaos: 95,
      image: nftImage
    }
  ];

  const getColorStyles = (color) => {
    const styles = {
      sea: {
        border: 'border-jc3-sea',
        text: 'text-jc3-sea',
        bg: 'bg-jc3-sea',
        glow: 'rgba(0, 174, 239, 0.5)',
        gradient: 'from-jc3-sea to-jc3-azure'
      },
      beacon: {
        border: 'border-jc3-beacon',
        text: 'text-jc3-beacon',
        bg: 'bg-jc3-beacon',
        glow: 'rgba(255, 215, 0, 0.5)',
        gradient: 'from-jc3-beacon to-jc3-explosion'
      },
      explosion: {
        border: 'border-jc3-explosion',
        text: 'text-jc3-explosion',
        bg: 'bg-jc3-explosion',
        glow: 'rgba(255, 140, 0, 0.5)',
        gradient: 'from-jc3-explosion to-jc3-chaos'
      },
      chaos: {
        border: 'border-jc3-chaos',
        text: 'text-jc3-chaos',
        bg: 'bg-jc3-chaos',
        glow: 'rgba(255, 69, 0, 0.5)',
        gradient: 'from-jc3-chaos to-jc3-explosion'
      },
      bavarium: {
        border: 'border-jc3-bavarium',
        text: 'text-jc3-bavarium',
        bg: 'bg-jc3-bavarium',
        glow: 'rgba(138, 43, 226, 0.5)',
        gradient: 'from-jc3-bavarium via-jc3-sea to-jc3-chaos'
      }
    };
    return styles[color] || styles.sea;
  };

  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 25,
  };

  return (
    <motion.section
      id="blog"
      className="py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-96 h-96 bg-jc3-sea/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-jc3-chaos/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 border border-jc3-sea/30 bg-jc3-night/50">
            <Anchor size={18} className="text-jc3-sea" />
            <span className="font-mono text-xs text-jc3-muted tracking-wider">GRAPPLE_LOGS.DAT</span>
          </div>

          <h2 className="font-military text-4xl md:text-5xl tracking-wider text-white mb-4">
            LIBERATION <span className="text-jc3-sea">TIMELINE</span>
          </h2>

          <p className="font-tech text-jc3-muted">
            Follow my transformation from an enthusiastic gamer to a passionate game developer.
            Each milestone represents a step forward in my liberation journey.
          </p>
        </motion.div>

        {/* Journey Timeline - Grapple Hook Style */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Grapple Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1">
            {/* Main cable */}
            <div className="absolute inset-0 bg-gradient-to-b from-jc3-sea via-jc3-explosion to-jc3-chaos opacity-60" />
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-jc3-sea via-jc3-explosion to-jc3-chaos blur-md opacity-30" />
            {/* Animated pulse traveling down the line */}
            <motion.div
              className="absolute left-0 right-0 h-8 bg-gradient-to-b from-transparent via-jc3-sea to-transparent"
              animate={{ top: ['0%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Milestones */}
          {milestones.map((milestone, index) => {
            const colorStyles = getColorStyles(milestone.color);
            const isExpanded = expandedMilestone === index;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ ...springConfig, delay: index * 0.15 }}
                className={`relative mb-16 flex ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
              >
                {/* Year Bubble - Grapple Anchor Point */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 z-20"
                  whileHover={{ scale: 1.2 }}
                >
                  <div
                    className={`w-16 h-16 border-2 ${colorStyles.border}
                      bg-jc3-night flex items-center justify-center relative`}
                    style={{
                      boxShadow: `0 0 20px ${colorStyles.glow}`,
                      clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                    }}
                  >
                    {/* Inner icon */}
                    <span className={colorStyles.text}>
                      {milestone.icon}
                    </span>
                    {/* Pulsing ring */}
                    <motion.div
                      className={`absolute inset-[-8px] border ${colorStyles.border} opacity-50`}
                      style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  {/* Year label */}
                  <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2
                    font-military text-sm ${colorStyles.text} tracking-wider whitespace-nowrap`}>
                    {milestone.year}
                  </div>
                </motion.div>

                {/* Content Card - Mission Briefing Style */}
                <motion.div
                  className={`w-full md:w-[calc(50%-3rem)] ${isEven ? 'md:pr-8' : 'md:pl-8'}
                    ${isEven ? 'md:text-right' : 'md:text-left'}`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className={`bg-gradient-to-b from-jc3-slate/90 to-jc3-night/95 p-6 cursor-pointer relative
                      border ${isExpanded ? colorStyles.border : 'border-jc3-steel'}`}
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 15px) 0, 100% 15px, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                      boxShadow: isExpanded ? `0 0 30px ${colorStyles.glow}` : 'none'
                    }}
                    onClick={() => setExpandedMilestone(isExpanded ? null : index)}
                  >
                    {/* Region/Status indicator */}
                    <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-military tracking-wider mb-3
                      ${colorStyles.bg} text-jc3-night`}>
                      <Target size={12} />
                      {milestone.region}
                    </div>

                    {/* Header */}
                    <div className={`flex items-center gap-4 mb-4 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      <div className={`p-3 bg-jc3-night border ${colorStyles.border}
                        ${colorStyles.text}`}
                        style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                      >
                        {milestone.icon}
                      </div>
                      <div className={isEven ? 'md:text-right' : ''}>
                        <h3 className="font-military text-xl tracking-wider text-white">
                          {milestone.title}
                        </h3>
                        <p className={`${colorStyles.text} font-tech text-sm`}>
                          {milestone.subtitle}
                        </p>
                      </div>
                      <motion.div
                        className={`ml-auto ${colorStyles.text}`}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </div>

                    {/* Chaos Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs text-jc3-muted">CHAOS PROGRESS</span>
                        <span className="font-military text-sm text-jc3-chaos">{milestone.chaos}%</span>
                      </div>
                      <div className="h-1 bg-jc3-night rounded-sm overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${milestone.chaos}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-full bg-gradient-to-r ${colorStyles.gradient}`}
                        />
                      </div>
                    </div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          {/* Content */}
                          <p className="text-jc3-muted mb-4 font-tech leading-relaxed text-left">
                            {milestone.content}
                          </p>

                          {/* Achievements - Mission Objectives */}
                          <div className="space-y-2 text-left">
                            <h4 className={`font-military ${colorStyles.text} mb-2 tracking-wider text-sm`}>
                              OBJECTIVES COMPLETE:
                            </h4>
                            {milestone.achievements.map((achievement, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-center gap-2 text-jc3-light font-tech text-sm"
                              >
                                <Zap size={14} className={colorStyles.text} />
                                {achievement}
                              </motion.div>
                            ))}
                          </div>

                          {/* Status Badge */}
                          <div className={`mt-4 inline-flex items-center gap-2 px-3 py-1
                            border ${colorStyles.border} text-xs font-military tracking-wider ${colorStyles.text}`}>
                            <div className={`w-2 h-2 rounded-full ${colorStyles.bg} animate-pulse`} />
                            STATUS: {milestone.status}
                          </div>

                          {/* Decorative bottom line */}
                          <div className={`mt-4 h-[2px] bg-gradient-to-r ${colorStyles.gradient} opacity-50`} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Grapple connection line to center */}
                  <div
                    className={`hidden md:block absolute top-1/2 ${isEven ? 'right-[calc(50%-2rem)]' : 'left-[calc(50%-2rem)]'}
                      w-8 h-[2px] bg-gradient-to-r ${colorStyles.gradient} opacity-70`}
                    style={{ transform: 'translateY(-50%)' }}
                  >
                    {/* Grapple hook effect */}
                    <motion.div
                      className={`absolute ${isEven ? 'left-0' : 'right-0'} top-1/2 transform -translate-y-1/2
                        w-2 h-2 ${colorStyles.bg}`}
                      style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
                    />
                  </div>
                </motion.div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block w-[calc(50%-3rem)]" />
              </motion.div>
            );
          })}
        </div>

        {/* Footer Call to Action - Command Center Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={springConfig}
          className="text-center mt-16"
        >
          <div className="max-w-xl mx-auto bg-gradient-to-b from-jc3-slate/90 to-jc3-night/95 p-8 border border-jc3-sea/30"
            style={{ clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)' }}
          >
            {/* Status indicators */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-jc3-sea animate-pulse" />
                <span className="font-mono text-xs text-jc3-sea">CONNECTED</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-jc3-beacon" />
                <span className="font-mono text-xs text-jc3-beacon">5 REGIONS</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-jc3-chaos animate-pulse" />
                <span className="font-mono text-xs text-jc3-chaos">ACTIVE</span>
              </div>
            </div>

            <p className="text-jc3-muted mb-6 font-tech">
              This liberation continues as I explore new territories and develop greater creations.
            </p>

            <motion.a
              href="https://wa.me/919405545631"
              className="inline-flex items-center gap-2 px-6 py-3
                bg-jc3-chaos text-white font-military tracking-wider"
              style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={20} />
              JOIN THE REBELLION
            </motion.a>

            <p className="mt-6 font-military text-jc3-muted/60 text-sm tracking-wider">
              &ldquo;VIVA MEDICI!&rdquo;
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default BlogSection;
