import { useCallback, useEffect, useRef, useState } from "react";
// import { lazy, Suspense } from "react"; // Restore when reactivating Moru.
import { MotionConfig } from "framer-motion";
import { ArrowDown, ArrowUpRight, Check, ChevronDown, Code2, Copy, Gamepad2, Github, Linkedin, Menu, Pause, Play, X } from "lucide-react";
import HeroArtwork from "./components/pop/HeroArtwork";
import Reveal from "./components/pop/Reveal";
import ProjectCard from "./components/pop/ProjectCard";
import { Flower, ProjectArt } from "./components/pop/Illustrations";
import Magnetic from "./components/pop/Magnetic";
import usePortfolioMotion from "./components/pop/usePortfolioMotion";
import IntroScreen from "./components/pop/IntroScreen";
import { projects, experience } from "./data/portfolio";
import portrait from "./assets/portrait.jpg";
const email = "kartibelamkar@gmail.com";

// Moru initialization is temporarily disabled; all companion source files are retained.
// const Moru = lazy(() => import("./components/moru/Moru"));

function ProjectDialog({
  project,
  onClose
}) {
  const dialog = useRef(null);
  useEffect(() => {
    const node = dialog.current;
    const previousOverflow = document.body.style.overflow;
    node.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      node.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onCancel={onClose} onClick={event => {
    if (event.target === event.currentTarget) onClose();
  }}>
    <div className={`dialog-art project-art ${project.color}`}>
      <ProjectArt type={project.art} image={project.image} />
      <button className="icon-button dialog-close" onClick={onClose} aria-label="Close project">
        <X />
      </button>
    </div>
    <div className="dialog-body">
      <span className="eyebrow">
          {project.image ? "Gameplay image" : "Original illustration"} / {project.category} / {project.status}
        </span>
      <h2 id="project-title">
        {project.title}
      </h2>
      <p>
        {project.description}
      </p>
      <h3>Inside the project</h3>
      <ul className="project-details">
        {project.details.map(detail => <li key={detail}>
          {detail}
        </li>)}
      </ul>
      <div className="tags">
        {project.tools.map(tool => <span key={tool}>
          {tool}
        </span>)}
      </div>
      <a className="button button-green" href={project.url} target="_blank" rel="noreferrer">
        {project.linkLabel}
        <ArrowUpRight size={18} />
      </a>
    </div>
  </dialog>;
}
function Contact({
  paused
}) {
  const [copyStatus, setCopyStatus] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: ""
  });
  const abortRef = useRef(null);
  useEffect(() => () => abortRef.current?.abort(), []);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus("Email copied!");
    } catch {
      setCopyStatus("Please select and copy the email address.");
    }
  }
  async function sendMessage(event) {
    event.preventDefault();
    if (formStatus === "sending") return;
    const controller = new AbortController();
    abortRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setFormStatus("sending");
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          ...formValues,
          _subject: `Portfolio message from ${formValues.name}`,
          _template: "table"
        })
      });
      const data = await response.json();
      if (!response.ok || ![true, "true"].includes(data.success)) throw new Error("Message not delivered");
      setFormStatus("success");
      setFormValues({
        name: "",
        email: "",
        message: ""
      });
    } catch {
      setFormStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }
  const mailto = `mailto:${email}?subject=${encodeURIComponent(`Hello from ${formValues.name || "your portfolio"}`)}&body=${encodeURIComponent(formValues.message)}`;
  return <section id="contact" className="contact-section" aria-labelledby="contact-heading">
    <div className="page-width contact-grid">
      <Reveal className="contact-copy" paused={paused}>
        <span className="eyebrow">Have something in mind?</span>
        <h2 id="contact-heading">Let’s make<br />it happen.</h2>
        <p>
            A game, an interesting problem, or an idea that won’t leave you
            alone. I’d love to hear it.
          </p>
        <div className="email-line">
          <a href={`mailto:${email}`}>
            {email}
          </a>
          <button className="icon-button" onClick={copyEmail} aria-label="Copy email address">
            {copyStatus === "Email copied!" ? <Check size={19} /> : <Copy size={19} />}
          </button>
        </div>
        <p className="copy-status" role="status">
          {copyStatus}
        </p>
        <div className="social-links">
          <a href="https://github.com/Kartikesh07" target="_blank" rel="noreferrer">
              <Github size={17} />
              GitHub
            </a>
          <a href="https://www.linkedin.com/in/kartikesh-belamkar" target="_blank" rel="noreferrer">
              <Linkedin size={17} />
              LinkedIn
            </a>
          <a href="https://kartikesh007.itch.io" target="_blank" rel="noreferrer">
              <Gamepad2 size={18} />
              itch.io
            </a>
        </div>
      </Reveal>
      <Reveal className="contact-card" paused={paused} delay={0.12}>
        <span className="form-note">A conversation starts here</span>
        <h3>Tell me about it.</h3>
        <form onSubmit={sendMessage}>
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" autoComplete="name" required maxLength={100} placeholder="What should I call you?" value={formValues.name} onChange={event => setFormValues({
            ...formValues,
            name: event.target.value
          })} />
          <label htmlFor="contact-email">Email address</label>
          <input id="contact-email" name="email" type="email" spellCheck={false} autoComplete="email" required maxLength={200} placeholder="you@example.com" value={formValues.email} onChange={event => setFormValues({
            ...formValues,
            email: event.target.value
          })} />
          <label htmlFor="contact-message">What are you thinking?</label>
          <textarea id="contact-message" name="message" rows={3} required maxLength={5000} placeholder="Tell me a little about your idea…" value={formValues.message} onChange={event => setFormValues({
            ...formValues,
            message: event.target.value
          })} />
          <button type="submit" className="button button-pink" disabled={formStatus === "sending"}>
            {formStatus === "sending" ? "Sending your note…" : "Send a hello"}
            <ArrowUpRight size={20} />
          </button>
          <div className="form-status" role="status">
            {formStatus === "success" && "Your message is on its way. Thank you for saying hello!"}
            {formStatus === "error" && <span>
                  Your note couldn’t be sent.{" "}
                  <a href={mailto}>Open it in your email app</a> and send it
                  directly.
                </span>}
          </div>
        </form>
      </Reveal>
    </div>
    <footer className="page-width footer">
      <a className="wordmark" href="#home">
          kartikesh<span>✳</span>
        </a>
      <p>Built with intention. Rooted in India.</p>
      <a href="#home">
          Back to top <ArrowUpRight size={16} />
        </a>
    </footer>
  </section>;
}
export default function App() {
  const [introPhase, setIntroPhase] = useState(() => document.documentElement.dataset.intro === "pending" ? "playing" : "complete");
  const introActive = introPhase !== "complete";
  const revealPortfolio = useCallback(() => setIntroPhase("revealing"), []);
  const completeIntro = useCallback(() => setIntroPhase("complete"), []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSection, setActiveSection] = useState("home");
  const [motionPaused, setMotionPaused] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const root = useRef(null);
  const menuButton = useRef(null);
  const projectTrigger = useRef(null);
  usePortfolioMotion(root, motionPaused, introPhase !== "playing");
  function openProject(project, event) {
    projectTrigger.current = event.currentTarget;
    setSelectedProject(project);
  }
  function closeProject() {
    setSelectedProject(null);
    requestAnimationFrame(() => projectTrigger.current?.focus());
  }
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = event => setMotionPaused(event.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("reduce-motion", motionPaused);
    return () => document.documentElement.classList.remove("reduce-motion");
  }, [motionPaused]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, {
      rootMargin: "-20% 0px -55% 0px"
    });
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!menuOpen) return;
    const close = event => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  const navigation = [["work", "Work"], ["about", "About"], ["skills", "Expertise"], ["experience", "Experience"]];
  return <MotionConfig reducedMotion={motionPaused ? "always" : "user"}>
    <div ref={root} aria-hidden={introActive || undefined} className={`portfolio ${motionPaused ? "motion-paused" : ""}`}>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="page-width header-inner">
          <a href="#home" className="wordmark" aria-label="Kartikesh, home"><Flower />kartikesh<span className="wordmark-dot">.</span></a>
          <nav id="main-nav" className={`navigation ${menuOpen ? "is-open" : ""}`} aria-label="Main navigation">
            {navigation.map(([id, label]) => <a key={id} href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} onClick={() => setMenuOpen(false)}>
              {label}
            </a>)}
            <a className="nav-contact" href="#contact" onClick={() => setMenuOpen(false)}>Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
          </nav>
          <div className="header-controls">
            <button className="icon-button motion-control" onClick={() => setMotionPaused(!motionPaused)} aria-pressed={motionPaused} aria-label={motionPaused ? "Enable animations" : "Pause animations"} title={motionPaused ? "Enable animations" : "Pause animations"}>
              {motionPaused ? <Play size={16} /> : <Pause size={16} />}
            </button>
            <button ref={menuButton} className="mobile-menu icon-button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main">
        <section id="home" className="hero page-width" aria-labelledby="hero-heading">
          <div className="hero-intro">
            <p><span lang="hi">नमस्ते</span> I’m Kartikesh Belamkar</p>
            <span>Game developer & full-stack engineer</span>
          </div>
          <div className="hero-main">
            <div className="hero-copy">
              <h1 id="hero-heading" tabIndex={-1}>
                <span className="hero-line">
                  <span>Made to</span>
                </span>
                <span className="hero-line">
                  <span>move you.</span>
                </span>
              </h1>
              <p className="hero-description">I turn curious ideas into worlds you can play,<br className="desktop-break" /> systems that respond, and experiences that stay with you.</p>
              <div className="hero-actions">
                <Magnetic href="#work" className="button button-green" paused={motionPaused}>Explore the work <ArrowDown size={19} aria-hidden="true" /></Magnetic>
                <a href="#about" className="text-link">Meet the maker <ArrowUpRight size={17} aria-hidden="true" /></a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-art-shift">
                <HeroArtwork paused={motionPaused || introPhase === "playing"} />
              </div>
              <span className="art-caption">Form, colour & a little curiosity.</span>
            </div>
          </div>
          <div className="hero-foot">
            <span><i /> Rooted in India. Building for everywhere.</span>
            <a href="#work">Scroll to discover <ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </section>
        <div className="craft-ribbon" aria-label="Gameplay. Engineering. Imagination.">
          <div>
            <span>Gameplay.</span>
            <Flower />
            <span>Engineering.</span>
            <Flower />
            <span>Imagination.</span>
            <Flower />
            <span className="ribbon-extra" aria-hidden="true">Gameplay.</span>
          </div>
        </div>
        <section id="work" className="work-section page-width" aria-labelledby="work-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Selected work / Four explorations</p>
              <h2 id="work-heading" className="section-title">
                <span className="title-line">
                  <span>Proof of</span>
                </span>
                <span className="title-line">
                  <span>possibility.</span>
                </span>
              </h2>
            </div>
            <p>A playable world. A chain reaction.<br />A shield that feels alive. A different way to see.<br /><span>Explore what’s under the surface.</span></p>
          </div>
          <div className="project-grid">
            {projects.map(project => <ProjectCard key={project.id} project={project} onOpen={openProject} paused={motionPaused} />)}
          </div>
          <a className="text-link more-work" href="https://github.com/Kartikesh07" target="_blank" rel="noreferrer">More from the workshop <Github size={18} aria-hidden="true" /><ArrowUpRight size={18} aria-hidden="true" /></a>
        </section>
        <section id="about" className="about-section" aria-labelledby="about-heading">
          <div className="page-width about-grid">
            <Reveal className="portrait-composition" paused={motionPaused}>
              <div className="portrait-frame">
                <img src={portrait} alt="Kartikesh smiling outdoors" width="600" height="652" loading="lazy" />
              </div>
              <div className="portrait-caption">
                <span>Kartikesh Belamkar</span>
                <span>The person behind the pixels.</span>
              </div>
              <Flower className="portrait-flower" />
            </Reveal>
            <div className="about-copy">
              <p className="eyebrow">A little about me</p>
              <h2 id="about-heading" className="section-title">
                <span className="title-line">
                  <span>A builder.</span>
                </span>
                <span className="title-line">
                  <span>By nature.</span>
                </span>
              </h2>
              <p>I’m a game developer and full-stack engineer with a B.Tech in Artificial Intelligence & Data Science.</p>
              <p>I’m drawn to the space between logic and imagination. A satisfying game mechanic. An unexpected interaction. The small detail that makes something feel right.</p>
              <p>My work spans gameplay, engine tooling, and AI-powered web experiences. My Indian roots bring the colour. Curiosity does the rest.</p>
              <a href="#contact" className="text-link">Let’s build something interesting <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
        <section id="skills" className="skills-section" aria-labelledby="skills-heading">
          <div className="page-width skills-grid">
            <div className="skills-intro">
              <p className="eyebrow">The craft behind the colour</p>
              <h2 id="skills-heading" className="section-title">
                <span className="title-line">
                  <span>Many tools.</span>
                </span>
                <span className="title-line">
                  <span>One mind.</span>
                </span>
              </h2>
              <p>Different disciplines.<br />The same care for how it feels.</p>
            </div>
            <div className="skill-list">
              <Reveal className="skill-row" paused={motionPaused}>
                <Gamepad2 className="skill-symbol" size={32} aria-hidden="true" />
                <div>
                  <h3>Worlds worth playing</h3>
                  <p>Gameplay systems, procedural worlds, and engine tools.</p>
                  <div className="skill-tools">
                    {["Unreal Engine", "C++", "Godot", "Unity", "GDScript"].map(tool => <span key={tool}>
                      {tool}
                    </span>)}
                  </div>
                </div>
              </Reveal>
              <Reveal className="skill-row" paused={motionPaused}>
                <Code2 className="skill-symbol" size={32} aria-hidden="true" />
                <div>
                  <h3>Ideas made interactive</h3>
                  <p>Thoughtful interfaces, connected systems, and AI.</p>
                  <div className="skill-tools">
                    {["React", "TypeScript", "Python", "PyTorch", "Supabase"].map(tool => <span key={tool}>
                      {tool}
                    </span>)}
                  </div>
                </div>
              </Reveal>
              <Reveal className="skill-row" paused={motionPaused}>
                <Flower className="skill-symbol" />
                <div>
                  <h3>An extra dimension</h3>
                  <p>3D objects, expressive motion, and visual experiments.</p>
                  <div className="skill-tools">
                    {["Blender", "Three.js", "GSAP", "Framer Motion"].map(tool => <span key={tool}>
                      {tool}
                    </span>)}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
        <section id="experience" className="experience-section page-width" aria-labelledby="experience-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Experience</p>
              <h2 id="experience-heading" className="section-title">
                <span className="title-line">
                  <span>Always in</span>
                </span>
                <span className="title-line">
                  <span>the making.</span>
                </span>
              </h2>
            </div>
            <p>Real teams. Real problems.<br />A practice built by doing.</p>
          </div>
          <div className="experience-list">
            {experience.map(item => <details className="experience-item" key={item.company}>
              <summary>
                <span className="experience-period">
                  {item.period}
                </span>
                <span className="experience-role">
                  <strong>
                    {item.role}
                  </strong>
                  <span>
                    {item.company}
                  </span>
                </span>
                <span className="experience-tag">
                  {item.field}
                </span>
                <ChevronDown size={22} aria-hidden="true" />
              </summary>
              <div className="experience-description">
                <p>
                  {item.description}
                </p>
              </div>
            </details>)}
          </div>
        </section>
        <Contact paused={motionPaused} />
      </main>
      {selectedProject && <ProjectDialog project={selectedProject} onClose={closeProject} />}
      {/* Moru rendering is temporarily disabled. Restore with its lazy import above.
       <Suspense fallback={null}>
        <Moru paused={motionPaused} suspended={Boolean(selectedProject) || menuOpen} />
       </Suspense>
       */}
    </div>
    {/* Mount after the page so its ref is attached before scroll/focus locking. */}
    {introActive && <IntroScreen contentRef={root} onReveal={revealPortfolio} onComplete={completeIntro} />}
  </MotionConfig>;
}
