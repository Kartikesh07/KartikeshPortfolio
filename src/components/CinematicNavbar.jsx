import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Download, Menu, X } from 'lucide-react';
import { sfx } from '../utils/soundEffects';

const CinematicNavbar = ({ activeSection, onNavigate }) => {
  const [isMuted, setIsMuted] = useState(sfx.muted);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', number: '01', label: 'PROLOGUE' },
    { id: 'origin', number: '02', label: 'ORIGIN' },
    { id: 'arsenal', number: '03', label: 'ARSENAL' },
    { id: 'missions', number: '04', label: 'MISSIONS' },
    { id: 'campaign', number: '05', label: 'CAMPAIGN' },
    { id: 'contact', number: '06', label: 'TRANSMISSION' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const muted = sfx.toggleMute();
    setIsMuted(muted);
    if (!muted) sfx.playClick();
  };

  const handleNavClick = (id) => {
    sfx.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-void-950/90 backdrop-blur-md border-b border-cinematic-border py-3 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Insignia */}
        <button
          onClick={() => handleNavClick('hero')}
          onMouseEnter={() => sfx.playHover()}
          className="flex items-center gap-3 group text-left focus-visible:ring-1 focus-visible:ring-ember"
          aria-label="Kartikesh Showreel Home"
        >
          <div className="w-8 h-8 border border-cinematic-borderBright bg-void-800 flex items-center justify-center relative group-hover:border-ember group-hover:shadow-[0_0_15px_rgba(255,107,26,0.6)] transition-all">
            <div className="w-2 h-2 bg-ember rotate-45 group-hover:scale-125 transition-transform" />
            <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-ember opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-ember opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="flex flex-col">
            <span className="font-cinematic text-lg tracking-widest text-cinematic-white group-hover:text-ember transition-colors leading-tight">
              KARTIKESH
            </span>
            <span className="font-mono text-[9px] tracking-widest text-cinematic-muted uppercase leading-none">
              GAME DEVELOPER &bull; SHOWREEL
            </span>
          </div>
        </button>

        {/* Desktop Chapter Navigation */}
        <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
          {navItems.map(({ id, number, label }) => {
            const isActive = activeSection === id;
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                onMouseEnter={() => sfx.playHover()}
                className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all rounded-sm flex items-center gap-1.5 ${
                  isActive
                    ? 'text-cinematic-white bg-void-700/80 border border-ember/50 shadow-[0_0_15px_rgba(255,107,26,0.2)]'
                    : 'text-cinematic-muted hover:text-cinematic-white hover:bg-void-800/40 border border-transparent'
                }`}
              >
                <span className={`text-[10px] ${isActive ? 'text-ember font-bold' : 'text-cinematic-darkMuted'}`}>
                  {number}
                </span>
                <span>{label}</span>
                {isActive && (
                  <span className="absolute -bottom-[13px] left-1/2 -translate-x-1/2 w-3 h-[2px] bg-ember shadow-[0_0_6px_#FF6B1A]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Sound FX Audio Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => sfx.playHover()}
            title={isMuted ? "Enable Audio Effects" : "Mute Audio"}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
            className={`p-2 border rounded-sm transition-colors ${
              isMuted
                ? 'border-cinematic-border text-cinematic-darkMuted hover:text-cinematic-white hover:border-cinematic-borderBright'
                : 'border-ember/40 text-ember bg-ember/10 shadow-[0_0_12px_rgba(255,107,26,0.3)]'
            }`}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>

          {/* Itch.io CTA Button */}
          <a
            href="https://kartikesh007.itch.io"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sfx.playHover()}
            onClick={() => sfx.playClick()}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-void-700 hover:bg-void-600 border border-cinematic-border hover:border-ember text-cinematic-white text-xs font-mono tracking-wider transition-all"
          >
            <Download size={13} className="text-ember" />
            <span>ITCH.IO</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-cinematic-muted hover:text-cinematic-white border border-cinematic-border bg-void-800"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-void-900 border-b border-cinematic-border px-6 py-6 space-y-3">
          {navItems.map(({ id, number, label }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`w-full text-left flex items-center justify-between p-3 border ${
                activeSection === id
                  ? 'border-ember text-ember bg-ember/5'
                  : 'border-cinematic-border text-cinematic-muted hover:text-cinematic-white'
              }`}
            >
              <span className="font-cinematic text-lg tracking-wider">{label}</span>
              <span className="font-mono text-xs">{number}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default CinematicNavbar;
