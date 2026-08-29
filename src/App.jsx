import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Components
import FilmGrainOverlay from './components/FilmGrainOverlay';
import CustomCursor from './components/CustomCursor';
import CursorSpotlight from './components/CursorSpotlight';
import AmbientEmbersCanvas from './components/AmbientEmbersCanvas';
import BootSequenceScreen from './components/BootSequenceScreen';
import LevelScrollProgress from './components/LevelScrollProgress';
import AchievementToast from './components/AchievementToast';
import EasterEggBanner from './components/EasterEggBanner';
import CinematicNavbar from './components/CinematicNavbar';
import CinematicHero from './components/CinematicHero';
import OriginSection from './components/OriginSection';
import ArsenalSection from './components/ArsenalSection';
import MissionsSection from './components/MissionsSection';
import CampaignTimeline from './components/CampaignTimeline';
import NextLevelContact from './components/NextLevelContact';

// Audio
import { sfx } from './utils/soundEffects';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [bootCompleted, setBootCompleted] = useState(false);
  const mainRef = useRef(null);

  // Initial audio preload trigger on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      sfx.init();
    };

    window.addEventListener('pointerdown', handleFirstInteraction);
    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('pointerdown', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // GSAP ScrollTrigger active section tracking and parallax effects
  useGSAP(() => {
    const sections = ['hero', 'origin', 'arsenal', 'missions', 'campaign', 'contact'];

    sections.forEach((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveSection(sectionId),
        onEnterBack: () => setActiveSection(sectionId),
      });
    });

    // Parallax depth motion on mission cards and background elements
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1024px)', () => {
      gsap.utils.toArray('.cinematic-panel').forEach((panel) => {
        gsap.fromTo(
          panel,
          { y: 20 },
          {
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              start: 'top 85%',
              end: 'top 50%',
              scrub: 1,
            },
          }
        );
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, { scope: mainRef });

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div ref={mainRef} className="min-h-screen bg-void-900 text-cinematic-white relative selection:bg-ember selection:text-void-950">
      {/* a11y: Skip to main content */}
      <a href="#hero" className="skip-link">
        Skip to main content
      </a>

      {/* Boot Sequence Game Loading Screen */}
      {!bootCompleted && (
        <BootSequenceScreen onComplete={() => setBootCompleted(true)} />
      )}

      {/* Cinematic Film Grain & Edge Vignette */}
      <FilmGrainOverlay />

      {/* 2D Canvas Lightweight Ambient Embers */}
      <AmbientEmbersCanvas />

      {/* Dynamic Cursor Spotlight Follower */}
      <CursorSpotlight />

      {/* Director's Viewfinder Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Vertical Level Progress Rail */}
      <LevelScrollProgress activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Achievement Unlocked Toast System */}
      <AchievementToast activeSection={activeSection} />

      {/* Konami Code Easter Egg Listener & Banner */}
      <EasterEggBanner />

      {/* Fixed HUD Navigation Header */}
      <CinematicNavbar
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Chapter Showreel Flow */}
      <main id="main-content" className="relative z-10">
        {/* CH. 01: Hero Title Sting */}
        <CinematicHero onExplore={scrollToSection} />

        {/* CH. 02: Origin / Developer Log & Live Stats */}
        <OriginSection />

        {/* CH. 03: Arsenal / Technical Loadout */}
        <ArsenalSection />

        {/* CH. 04: Featured Missions / Project Briefings */}
        <MissionsSection />

        {/* CH. 05: Campaign Progression / Operation Map */}
        <CampaignTimeline />

        {/* CH. 06: Transmission Terminal / Contact Closing */}
        <NextLevelContact onBackToTop={() => scrollToSection('hero')} />
      </main>
    </div>
  );
};

export default App;