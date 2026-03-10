import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Linkedin, Instagram, MessageCircle, MapPin, Crosshair } from 'lucide-react';
import pic from './img/Portarait_Photo_JC3.png';
import SkillsSection from './SkillsSection';
import ProjectsSection from './ProjectsSection';
import BlogSection from './BlogSection';

// Floating debris particles for parallax effect
const DebrisParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
    size: Math.random() * 20 + 10,
    rotation: Math.random() * 360,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute opacity-5"
          style={{
            left: particle.left,
            top: particle.top,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [particle.rotation, particle.rotation + 180, particle.rotation],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="border-l-[10px] border-r-[10px] border-b-[17px] border-l-transparent border-r-transparent border-b-jc3-sea"
            style={{ transform: `scale(${particle.size / 20})` }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// HUD Divider component
const HudDivider = ({ className = "" }) => (
  <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-jc3-sea" />
    <div className="w-3 h-3 rotate-45 border border-jc3-sea bg-jc3-night" />
    <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-jc3-sea" />
  </div>
);

// Spring animation for "snap" effect
const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

const airDropVariants = {
  hidden: {
    y: -100,
    opacity: 0,
    scale: 0.8
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: springConfig
  }
};

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { ...springConfig, delay: 0.2 }
  }
};

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { ...springConfig, delay: 0.3 }
  }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [coordinates] = useState({ lat: '42.7087', lng: '12.5648' });

  const navItems = [
    { display: 'Gear Mods', id: 'skills', icon: '◇' },
    { display: 'Chaos Objects', id: 'projects', icon: '◇' },
    { display: 'Intel', id: 'blog', icon: '◇' }
  ];

  useEffect(() => {
    setIsLoaded(true);

    const handleScroll = () => {
      const sections = ['hero', 'skills', 'projects', 'blog'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-jc3-night relative overflow-hidden">
      {/* Debris Parallax Background */}
      <DebrisParticles />

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-jc3-night via-jc3-slate/30 to-jc3-night" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-jc3-sea/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-jc3-chaos/5 blur-[150px] rounded-full" />
      </div>

      {/* Navigation - HUD Compass Style */}
      <AnimatePresence>
        {isLoaded && (
          <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={springConfig}
            className="fixed w-full hud-nav z-50"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                {/* Logo - Mission Marker Style */}
                <motion.a
                  href="#"
                  className="flex items-center gap-3 group"
                  whileHover={{ scale: 1.05 }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('hero');
                  }}
                >
                  <div className="w-8 h-8 border-2 border-jc3-sea rotate-45 flex items-center justify-center group-hover:border-jc3-azure group-hover:shadow-glow-sea transition-all">
                    <span className="font-military text-jc3-sea text-sm -rotate-45 group-hover:text-jc3-azure">K</span>
                  </div>
                  <span className="font-military text-xl tracking-widest text-white group-hover:text-jc3-sea transition-colors">
                    KARTIKESH
                  </span>
                </motion.a>

                {/* Nav Links - Objective Markers */}
                <div className="hidden md:flex items-center space-x-8">
                  {navItems.map(({ display, id }, index) => (
                    <motion.a
                      key={id}
                      href={`#${id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(id);
                      }}
                      className={`nav-link ${activeSection === id ? 'active' : ''}`}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 + index * 0.1, ...springConfig }}
                      whileHover={{ y: -2 }}
                    >
                      {display}
                    </motion.a>
                  ))}
                </div>

                {/* Social Links & Status */}
                <div className="flex items-center space-x-4">
                  {/* Coordinates Display */}
                  <div className="hidden lg:flex items-center gap-2 text-jc3-muted font-mono text-xs">
                    <MapPin size={12} className="text-jc3-sea" />
                    <span>{coordinates.lat}°N, {coordinates.lng}°E</span>
                  </div>

                  <div className="w-[1px] h-6 bg-jc3-steel hidden lg:block" />

                  {[
                    { icon: <Linkedin size={18} />, url: "https://www.linkedin.com/in/kartikesh-belamkar" },
                    { icon: <Instagram size={18} />, url: "https://www.instagram.com/kartikesh04" }
                  ].map((social, index) => (
                    <motion.a
                      key={social.url}
                      href={social.url}
                      target="_blank"
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1, ...springConfig }}
                      whileHover={{
                        scale: 1.2,
                        color: '#00AEEF'
                      }}
                      className="text-jc3-muted hover:text-jc3-sea transition-colors"
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero Section - The Drop */}
      <motion.section
        id="hero"
        className="min-h-screen relative overflow-hidden flex items-center"
        initial="hidden"
        animate="visible"
      >
        {/* HUD Corner brackets */}
        <div className="absolute top-24 left-6 w-16 h-16 border-l-2 border-t-2 border-jc3-sea/30" />
        <div className="absolute top-24 right-6 w-16 h-16 border-r-2 border-t-2 border-jc3-sea/30" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-jc3-sea/30" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-jc3-sea/30" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-12 py-20">
            {/* Left Content - Air Drop Text */}
            <motion.div
              className="md:w-1/2 text-left"
              variants={staggerChildren}
            >
              {/* Status indicator */}
              <motion.div
                variants={airDropVariants}
                className="flex items-center gap-3 mb-6"
              >
                <div className="status-active text-jc3-sea font-tech text-sm tracking-wider">
                  REBEL DROP INCOMING
                </div>
              </motion.div>

              {/* Main Title - Hero Typography */}
              <motion.div variants={slideInLeft} className="mb-6">
                <h1 className="font-military text-6xl md:text-8xl font-bold tracking-wide text-white leading-none">
                  KARTIKESH
                </h1>
                <h2 className="font-military text-4xl md:text-6xl font-bold tracking-wide text-jc3-sea mt-2">
                  BELAMKAR
                </h2>
                {/* Underline accent */}
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1 w-24 bg-jc3-sea" />
                  <div className="h-1 w-12 bg-jc3-chaos" />
                  <div className="h-1 w-6 bg-jc3-beacon" />
                </div>
              </motion.div>

              {/* Description - Tech Specs */}
              <motion.div
                variants={airDropVariants}
                className="mb-8 space-y-3"
              >
                <p className="font-tech text-lg text-jc3-light flex items-center gap-3">
                  <Crosshair size={18} className="text-jc3-sea" />
                  Passionate Game Developer crafting immersive digital experiences
                </p>
                <p className="font-tech text-lg text-jc3-light flex items-center gap-3">
                  <Crosshair size={18} className="text-jc3-chaos" />
                  AI & Data Science Student exploring the future of technology
                </p>
              </motion.div>

              {/* CTA Buttons - Rebel Drop Style */}
              <motion.div
                variants={airDropVariants}
                className="flex flex-wrap gap-4"
              >
                <motion.a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                  className="btn-rebel"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Chaos Objects
                </motion.a>
                <motion.a
                  href="https://wa.me/919405545631"
                  className="btn-chaos"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle size={18} className="inline mr-2" />
                  Call for Backup
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right Content - Profile with Target Lock */}
            <motion.div
              className="md:w-1/2 flex justify-center"
              variants={slideInRight}
            >
              <div className="relative">
                {/* Targeting rings */}
                <motion.div
                  className="absolute inset-[-30px] border-2 border-jc3-sea/30 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-[-50px] border border-jc3-sea/20 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />

                {/* Corner brackets - Target Lock */}
                <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-jc3-sea" />
                <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-jc3-sea" />
                <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-jc3-sea" />
                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-jc3-sea" />

                {/* Main image container */}
                <motion.div
                  className="relative w-64 h-64 md:w-80 md:h-80 overflow-hidden"
                  style={{
                    clipPath: 'polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)'
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={pic}
                    alt="Kartikesh Belamkar"
                    className="w-full h-full object-cover"
                    style={{ filter: 'contrast(1.1) saturate(1.1)' }}
                  />
                  {/* Scan line overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-jc3-sea/10 via-transparent to-jc3-night/50" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-jc3-sea/20 to-transparent h-[2px]"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Status label */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-mono text-xs text-jc3-sea bg-jc3-night/80 px-3 py-1 border border-jc3-sea/30">
                  TARGET: ACQUIRED
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-military text-xs tracking-widest text-jc3-muted">DESCEND</span>
            <div className="w-6 h-10 border border-jc3-sea/50 rounded-full flex justify-center p-2">
              <motion.div
                className="w-1 h-2 bg-jc3-sea rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        </motion.div>
      </motion.section>

      <HudDivider />

      <SkillsSection />

      <HudDivider />

      <ProjectsSection />

      <HudDivider />

      <BlogSection />

      {/* Footer - Transmission End */}
      <footer className="relative bg-gradient-to-t from-jc3-night via-jc3-slate to-jc3-night py-12 border-t border-jc3-steel">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(0, 174, 239, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 174, 239, 0.5) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Decorative elements */}
          <div className="flex justify-center gap-4 mb-6">
            <div className="w-2 h-2 rotate-45 bg-jc3-sea" />
            <div className="w-2 h-2 rotate-45 bg-jc3-chaos" />
            <div className="w-2 h-2 rotate-45 bg-jc3-beacon" />
          </div>

          <p className="text-center font-military text-jc3-light tracking-wider">
            TRANSMISSION END — BUILT WITH <span className="text-jc3-chaos">♥</span> BY KARTIKESH
          </p>

          <p className="text-center font-mono text-jc3-muted text-xs mt-2">
            // VIVA MEDICI - LIBERATION: 100%
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
