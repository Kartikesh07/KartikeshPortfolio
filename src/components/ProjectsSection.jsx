import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Code, Layout, Box, Gamepad, Target, AlertTriangle } from 'lucide-react';
import cyberRunImage from './img/CyberRun.png';
import nftImage from './img/NFTPic.jpeg';
import brickBreakerImage from './img/BrickBreakerIMG.webp';
import snakeGameImage from './img/SnakeGameIMG.webp';
import pomodoroImage from './img/PomodoroTracker.webp';
import quizImage from './img/QuizIMG.webp';
import blackjackImage from './img/BlackJackIMG.webp';

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);

  const categories = [
    { id: 'all', label: 'All Targets', icon: <Layout size={16} /> },
    { id: 'game', label: 'Game Dev', icon: <Gamepad size={16} /> },
    { id: 'web', label: '3D/NFT', icon: <Box size={16} /> },
    { id: 'python', label: 'Python Apps', icon: <Code size={16} /> }
  ];

  const projects = [
    {
      id: 1,
      title: "CYBER RUN",
      subtitle: "3D Adventure Platformer Game",
      description: "An immersive cyberpunk-themed platformer built with advanced game mechanics and stunning visuals.",
      tech: ["Unreal Engine", "Blender", "3D Modeling"],
      image: cyberRunImage,
      category: "game",
      link: "https://kartikesh007.itch.io/cyber-run",
      highlights: ["Published on itch.io", "Dynamic gameplay", "Custom 3D assets"],
      threat: "HIGH",
      chaos: 95
    },
    {
      id: 2,
      title: "NFT COLLECTION",
      subtitle: "Digital Art Collection",
      description: "A unique collection of digital artworks published as NFTs on the OpenSea marketplace.",
      tech: ["Digital Art", "Blockchain", "OpenSea"],
      image: nftImage,
      category: "web",
      link: "https://opensea.io/kartikesh007",
      highlights: ["5 unique pieces", "Successfully traded", "Blockchain integration"],
      threat: "MEDIUM",
      chaos: 75
    },
    {
      id: 3,
      title: "BRICK BREAKER",
      subtitle: "Classic Arcade Game",
      description: "A modern take on the classic brick breaker game with enhanced graphics and gameplay mechanics.",
      tech: ["Java", "Game Physics", "UI Design"],
      image: brickBreakerImage,
      category: "game",
      highlights: ["Custom physics engine", "Progressive difficulty", "Score system"],
      threat: "MEDIUM",
      chaos: 70
    },
    {
      id: 4,
      title: "SNAKE GAME",
      subtitle: "Python Gaming Classic",
      description: "A reimagined version of the classic snake game with modern features and smooth controls.",
      tech: ["Python", "Turtle", "Game Design"],
      image: snakeGameImage,
      category: "python",
      highlights: ["Smooth controls", "Progressive difficulty", "High score tracking"],
      threat: "LOW",
      chaos: 60
    },
    {
      id: 5,
      title: "POMODORO TIMER",
      subtitle: "Productivity Tool",
      description: "A sleek productivity timer implementing the Pomodoro technique with task tracking.",
      tech: ["Python", "Tkinter", "Time Logic"],
      image: pomodoroImage,
      category: "python",
      highlights: ["Task management", "Statistics tracking", "Customizable intervals"],
      threat: "LOW",
      chaos: 55
    },
    {
      id: 6,
      title: "QUIZ APPLICATION",
      subtitle: "Educational Tool",
      description: "An interactive quiz platform with dynamic question generation and score tracking.",
      tech: ["Python", "Database", "UI/UX"],
      image: quizImage,
      category: "python",
      highlights: ["Multiple categories", "Score analytics", "Progress tracking"],
      threat: "LOW",
      chaos: 50
    },
    {
      id: 7,
      title: "BLACKJACK GAME",
      subtitle: "Card Game Simulation",
      description: "A detailed implementation of the classic BlackJack card game with realistic gameplay.",
      tech: ["Python", "OOP", "Game Logic"],
      image: blackjackImage,
      category: "python",
      highlights: ["Real card mechanics", "Betting system", "AI dealer logic"],
      threat: "MEDIUM",
      chaos: 65
    }
  ];

  const getThreatColor = (threat) => {
    switch (threat) {
      case 'HIGH': return { bg: 'bg-jc3-chaos', text: 'text-jc3-chaos', border: 'border-jc3-chaos' };
      case 'MEDIUM': return { bg: 'bg-jc3-explosion', text: 'text-jc3-explosion', border: 'border-jc3-explosion' };
      case 'LOW': return { bg: 'bg-jc3-sea', text: 'text-jc3-sea', border: 'border-jc3-sea' };
      default: return { bg: 'bg-jc3-muted', text: 'text-jc3-muted', border: 'border-jc3-muted' };
    }
  };

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const springConfig = {
    type: "spring",
    stiffness: 400,
    damping: 25,
  };

  return (
    <motion.section
      id="projects"
      className="py-20 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-jc3-chaos/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-jc3-sea/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={springConfig}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4 px-4 py-2 border border-jc3-chaos/30 bg-jc3-night/50">
            <Target size={18} className="text-jc3-chaos" />
            <span className="font-mono text-xs text-jc3-muted tracking-wider">CHAOS_OBJECTS.LOG</span>
          </div>

          <h2 className="font-military text-4xl md:text-5xl tracking-wider text-white mb-4">
            FEATURED <span className="text-jc3-chaos">TARGETS</span>
          </h2>

          <p className="font-tech text-jc3-muted max-w-2xl mx-auto">
            High-value targets and chaos objects marked for liberation
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ...springConfig, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={`flex items-center gap-2 px-5 py-2 font-military tracking-wider text-sm
                transition-all duration-300
                ${activeFilter === category.id
                  ? 'bg-jc3-sea text-jc3-night'
                  : 'bg-transparent text-jc3-muted border border-jc3-steel hover:border-jc3-sea hover:text-jc3-sea'
                }`}
              style={{
                clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {category.icon}
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid - Mission Dossier Style */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='wait'>
            {filteredProjects.map((project, index) => {
              const threatColors = getThreatColor(project.threat);
              const isHovered = hoveredProject === project.id;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ ...springConfig, delay: index * 0.1 }}
                  className="relative group"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Target Lock Effect on Hover */}
                  <AnimatePresence>
                    {isHovered && (
                      <>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-jc3-chaos z-20"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-jc3-chaos z-20"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-jc3-chaos z-20"
                        />
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.2 }}
                          className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-jc3-chaos z-20"
                        />
                      </>
                    )}
                  </AnimatePresence>

                  {/* Card Container - Dossier Style */}
                  <motion.div
                    className={`relative bg-gradient-to-b from-jc3-slate/90 to-jc3-night/95
                      border ${isHovered ? 'border-jc3-chaos' : 'border-jc3-steel'}
                      overflow-hidden transition-all duration-300`}
                    style={{
                      clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
                      boxShadow: isHovered ? '0 0 30px rgba(255, 69, 0, 0.3)' : 'none'
                    }}
                    whileHover={{ y: -8 }}
                  >
                    {/* Threat Level Badge */}
                    <div className={`absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1
                      ${threatColors.bg} text-jc3-night font-military text-xs tracking-wider`}>
                      <AlertTriangle size={12} />
                      {project.threat}
                    </div>

                    {/* Project Image - Polaroid Style */}
                    <div className="relative h-48 overflow-hidden bg-jc3-night p-2">
                      <div className="relative h-full overflow-hidden">
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          style={{ filter: 'contrast(1.1) saturate(0.9)' }}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.5 }}
                        />

                        {/* Scan line effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-b from-jc3-sea/10 to-transparent h-1"
                          animate={{ top: ['0%', '100%'] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Bottom gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-jc3-night via-transparent to-transparent" />

                        {/* Tech Tags on hover */}
                        <AnimatePresence>
                          {isHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1"
                            >
                              {project.tech.map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-jc3-night/90 text-jc3-sea px-2 py-0.5
                                    border border-jc3-sea/30 font-mono"
                                >
                                  {tech}
                                </span>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Project Info */}
                    <div className="p-5">
                      {/* Title */}
                      <h3 className="font-military text-xl tracking-wider text-white mb-1">
                        {project.title}
                      </h3>

                      <p className="font-tech text-sm text-jc3-sea mb-3">
                        {project.subtitle}
                      </p>

                      <p className="font-tech text-jc3-muted text-sm mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Chaos Meter */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-xs text-jc3-muted">CHAOS LEVEL</span>
                          <span className="font-military text-sm text-jc3-chaos">{project.chaos}%</span>
                        </div>
                        <div className="h-1 bg-jc3-night rounded-sm overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${project.chaos}%` }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-jc3-sea via-jc3-explosion to-jc3-chaos"
                          />
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-1 mb-4">
                        {project.highlights.map((highlight, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-jc3-light font-tech"
                          >
                            <div className="w-1 h-1 bg-jc3-sea" />
                            {highlight}
                          </div>
                        ))}
                      </div>

                      {/* Action Button */}
                      {project.link && (
                        <motion.a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2
                            bg-jc3-sea text-jc3-night font-military tracking-wider text-sm"
                          style={{
                            clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)'
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          ENGAGE TARGET
                          <ExternalLink size={14} />
                        </motion.a>
                      )}
                    </div>

                    {/* Bottom accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r
                      ${isHovered ? 'from-jc3-chaos via-jc3-explosion to-jc3-beacon' : 'from-jc3-steel to-transparent'}`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ...springConfig, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 border border-jc3-chaos/30 bg-jc3-night/50">
            <div className="text-center">
              <span className="font-military text-2xl text-jc3-chaos">{projects.length}</span>
              <p className="font-mono text-xs text-jc3-muted">TARGETS</p>
            </div>
            <div className="w-[1px] h-8 bg-jc3-steel" />
            <div className="text-center">
              <span className="font-military text-2xl text-jc3-explosion">{projects.filter(p => p.threat === 'HIGH').length}</span>
              <p className="font-mono text-xs text-jc3-muted">HIGH VALUE</p>
            </div>
            <div className="w-[1px] h-8 bg-jc3-steel" />
            <div className="text-center">
              <span className="font-military text-2xl text-jc3-sea">100%</span>
              <p className="font-mono text-xs text-jc3-muted">LIBERATED</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
