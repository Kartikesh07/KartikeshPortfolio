import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Linkedin, Github, Send, Copy, Check, Gamepad2, ArrowUp } from 'lucide-react';
import { sfx } from '../utils/soundEffects';
import TextScramble from './TextScramble';

const NextLevelContact = ({ onBackToTop }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const emailAddress = 'kartikesh.belamkar@gmail.com';

  const handleCopyEmail = () => {
    sfx.playClick();
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sfx.playSting();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-28 relative overflow-hidden bg-void-900 border-t border-cinematic-border"
      aria-label="Transmission - Contact Dispatch"
    >
      {/* Horizon Anamorphic Light Bar Accent */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-ember/40 to-transparent shadow-[0_0_25px_#FF6B1A]" />

      {/* Atmospheric Center Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-ember/8 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header — Cinematic Bookend Sting */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-void-800 border border-cinematic-border text-ember font-mono text-xs tracking-[0.2em] uppercase mb-4">
            <span className="w-1.5 h-1.5 bg-ember rounded-full" />
            CHAPTER 06 &bull; TRANSMISSION TERMINAL
          </div>
          <h2 className="font-cinematic text-6xl sm:text-7xl md:text-8xl text-cinematic-white tracking-tight leading-none mb-4">
            <TextScramble text="OPEN TRANSMISSION" />
          </h2>
          <p className="text-cinematic-muted text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Ready to collaborate on new game titles, custom engine tooling, or production software engineering? Send a direct transmission.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start max-w-5xl mx-auto mb-20">
          {/* Left: Quick Channels & Direct Copy */}
          <div className="lg:col-span-5 space-y-4 text-left">
            <div className="cinematic-panel p-6 sm:p-8 relative">
              <div className="reticle-corner-tl" />
              <div className="reticle-corner-tr" />

              <span className="font-mono text-[10px] text-ember tracking-widest uppercase block mb-2">
                DIRECT COMM PROTOCOLS
              </span>
              <h3 className="font-cinematic text-2xl sm:text-3xl text-cinematic-white mb-6 leading-tight">
                CHANNELS &amp; REPOSITORIES
              </h3>

              {/* Direct Email Card */}
              <div className="p-4 bg-void-950 border border-cinematic-border mb-6">
                <span className="font-mono text-[10px] text-cinematic-darkMuted uppercase block mb-1">
                  OFFICIAL INBOX
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs text-cinematic-white truncate">
                    {emailAddress}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={() => sfx.playHover()}
                    className="p-1.5 bg-void-800 hover:bg-ember hover:text-void-950 text-cinematic-silver border border-cinematic-border transition-colors flex items-center gap-1 font-mono text-[10px]"
                    title="Copy Email Address"
                  >
                    {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                    <span>{copied ? 'COPIED' : 'COPY'}</span>
                  </button>
                </div>
              </div>

              {/* Social Channels List */}
              <div className="space-y-2.5">
                {[
                  {
                    name: 'ITCH.IO (kartikesh007)',
                    url: 'https://kartikesh007.itch.io',
                    icon: <Gamepad2 size={16} />,
                    desc: 'Playable Game Releases'
                  },
                  {
                    name: 'GITHUB (Kartikesh07)',
                    url: 'https://github.com/Kartikesh07',
                    icon: <Github size={16} />,
                    desc: 'Code Repositories & Engine Tools'
                  },
                  {
                    name: 'LINKEDIN (kartikesh-belamkar)',
                    url: 'https://www.linkedin.com/in/kartikesh-belamkar',
                    icon: <Linkedin size={16} />,
                    desc: 'Professional Experience & Network'
                  }
                ].map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => sfx.playHover()}
                    onClick={() => sfx.playClick()}
                    className="flex items-center justify-between p-3 bg-void-950/80 hover:bg-void-800 border border-cinematic-border hover:border-ember transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-ember group-hover:scale-110 transition-transform">
                        {channel.icon}
                      </span>
                      <div>
                        <div className="font-mono text-xs text-cinematic-white group-hover:text-ember transition-colors">
                          {channel.name}
                        </div>
                        <div className="font-mono text-[10px] text-cinematic-darkMuted">
                          {channel.desc}
                        </div>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-cinematic-muted group-hover:text-ember transition-colors">
                      ↗
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Transmission Dispatch Terminal Form */}
          <div className="lg:col-span-7 text-left">
            <div className="cinematic-panel p-6 sm:p-8 relative bg-void-900/95">
              <div className="reticle-corner-tr" />
              <div className="reticle-corner-br" />

              <div className="flex items-center justify-between border-b border-cinematic-border pb-3 mb-6">
                <span className="font-mono text-[10px] text-ember tracking-widest uppercase">
                  MESSAGE DISPATCH TERMINAL
                </span>
                <span className="font-mono text-[10px] text-cinematic-darkMuted">
                  ENCRYPTION: 256-BIT
                </span>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-ember/20 border border-ember text-ember flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(255,107,26,0.5)]">
                    <Check size={24} />
                  </div>
                  <h4 className="font-cinematic text-3xl text-cinematic-white">
                    TRANSMISSION DISPATCHED
                  </h4>
                  <p className="font-mono text-xs text-cinematic-muted max-w-sm mx-auto">
                    Signal received. Kartikesh will inspect your communication and respond shortly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] text-cinematic-darkMuted uppercase mb-1.5">
                      SENDER NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name or studio"
                      className="w-full bg-void-950 border border-cinematic-border focus:border-ember focus:ring-1 focus:ring-ember px-4 py-2.5 font-mono text-xs text-cinematic-white placeholder-cinematic-darkMuted outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-cinematic-darkMuted uppercase mb-1.5">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@gamestudio.com"
                      className="w-full bg-void-950 border border-cinematic-border focus:border-ember focus:ring-1 focus:ring-ember px-4 py-2.5 font-mono text-xs text-cinematic-white placeholder-cinematic-darkMuted outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-cinematic-darkMuted uppercase mb-1.5">
                      MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Details on project inquiry, technical collaboration, or studio opportunity..."
                      className="w-full bg-void-950 border border-cinematic-border focus:border-ember focus:ring-1 focus:ring-ember px-4 py-2.5 font-mono text-xs text-cinematic-white placeholder-cinematic-darkMuted outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => sfx.playHover()}
                    className="btn-cinematic w-full mt-2"
                  >
                    <Send size={15} />
                    <span>DISPATCH TRANSMISSION</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Credit & Return Cue */}
        <div className="border-t border-cinematic-border pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="font-mono text-xs text-cinematic-darkMuted">
            © {new Date().getFullYear()} KARTIKESH BELAMKAR. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={() => {
              sfx.playClick();
              onBackToTop();
            }}
            onMouseEnter={() => sfx.playHover()}
            className="inline-flex items-center gap-2 font-mono text-xs text-cinematic-muted hover:text-ember transition-colors"
          >
            <span>RETURN TO PROLOGUE</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NextLevelContact;
