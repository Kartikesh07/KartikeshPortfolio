import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Copy,
  Gamepad2,
  Github,
  Linkedin,
  Menu,
  Pause,
  Play,
  X,
} from "lucide-react";
import HeroArtwork from "./components/pop/HeroArtwork";
import Reveal from "./components/pop/Reveal";
import ProjectCard from "./components/pop/ProjectCard";
import { Flower, Kite, ProjectArt } from "./components/pop/Illustrations";
import { projects, experience } from "./data/portfolio";
import portrait from "./assets/portrait.jpg";

const email = "kartibelamkar@gmail.com";
const filters = ["All work", "Games", "Tools", "Web & AI"];
const Moru = lazy(() => import("./components/moru/Moru"));

function ProjectDialog({ project, onClose }) {
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
  return (
    <dialog
      ref={dialog}
      className="project-dialog"
      aria-labelledby="project-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={`dialog-art project-art ${project.color}`}>
        <ProjectArt type={project.art} image={project.image} />
        <button
          className="icon-button dialog-close"
          onClick={onClose}
          aria-label="Close project"
        >
          <X />
        </button>
      </div>
      <div className="dialog-body">
        <span className="eyebrow">
          {project.category} / {project.status}
        </span>
        <h2 id="project-title">{project.title}</h2>
        <p>{project.description}</p>
        <h3>Inside the project</h3>
        <ul className="project-details">
          {project.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className="tags">
          {project.tools.map((tool) => (
            <span key={tool}>{tool}</span>
          ))}
        </div>
        <a
          className="button button-green"
          href={project.url}
          target="_blank"
          rel="noreferrer"
        >
          {project.linkLabel}
          <ArrowUpRight size={18} />
        </a>
      </div>
    </dialog>
  );
}

function Contact({ paused }) {
  const [copyStatus, setCopyStatus] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
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
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formValues,
          _subject: `Portfolio message from ${formValues.name}`,
          _template: "table",
        }),
      });
      const data = await response.json();
      if (!response.ok || ![true, "true"].includes(data.success))
        throw new Error("Message not delivered");
      setFormStatus("success");
      setFormValues({ name: "", email: "", message: "" });
    } catch {
      setFormStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }
  const mailto = `mailto:${email}?subject=${encodeURIComponent(`Hello from ${formValues.name || "your portfolio"}`)}&body=${encodeURIComponent(formValues.message)}`;
  return (
    <section id="contact" className="contact-section">
      <div className="page-width contact-grid">
        <Reveal className="contact-copy" paused={paused}>
          <span className="eyebrow">Good things start with a hello</span>
          <h2>
            Got a spark?
            <br />
            Let’s make
            <br />
            <span>something.</span>
          </h2>
          <p>
            A game, an interesting problem, or an idea that won’t leave you
            alone. I’d love to hear it.
          </p>
          <div className="email-line">
            <a href={`mailto:${email}`}>{email}</a>
            <button
              className="icon-button"
              onClick={copyEmail}
              aria-label="Copy email address"
            >
              {copyStatus === "Email copied!" ? (
                <Check size={19} />
              ) : (
                <Copy size={19} />
              )}
            </button>
          </div>
          <p className="copy-status" role="status">
            {copyStatus}
          </p>
          <div className="social-links">
            <a
              href="https://github.com/Kartikesh07"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={17} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/kartikesh-belamkar"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={17} />
              LinkedIn
            </a>
            <a
              href="https://kartikesh007.itch.io"
              target="_blank"
              rel="noreferrer"
            >
              <Gamepad2 size={18} />
              itch.io
            </a>
          </div>
        </Reveal>
        <Reveal className="contact-card" paused={paused} delay={0.12}>
          <Flower className="contact-flower" />
          <h3>A little note, a big possibility.</h3>
          <form onSubmit={sendMessage}>
            <label htmlFor="contact-name">Your name</label>
            <input
              id="contact-name"
              name="name"
              autoComplete="name"
              required
              maxLength={100}
              placeholder="What should I call you?"
              value={formValues.name}
              onChange={(event) =>
                setFormValues({ ...formValues, name: event.target.value })
              }
            />
            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={200}
              placeholder="you@example.com"
              value={formValues.email}
              onChange={(event) =>
                setFormValues({ ...formValues, email: event.target.value })
              }
            />
            <label htmlFor="contact-message">What are you thinking?</label>
            <textarea
              id="contact-message"
              name="message"
              rows={3}
              required
              maxLength={5000}
              placeholder="Tell me a little about your idea…"
              value={formValues.message}
              onChange={(event) =>
                setFormValues({ ...formValues, message: event.target.value })
              }
            />
            <button
              type="submit"
              className="button button-pink"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending your note…" : "Send a hello"}
              <ArrowUpRight size={20} />
            </button>
            <div className="form-status" role="status">
              {formStatus === "success" &&
                "Your message is on its way. Thank you for saying hello!"}
              {formStatus === "error" && (
                <span>
                  Your note couldn’t be sent.{" "}
                  <a href={mailto}>Open it in your email app</a> and send it
                  directly.
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>
      <footer className="page-width footer">
        <a className="wordmark" href="#home">
          kartikesh<span>✳</span>
        </a>
        <p>Made with curiosity. And a little Indian colour.</p>
        <a href="#home">
          Back to top <ArrowUpRight size={16} />
        </a>
      </footer>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All work");
  const [selectedProject, setSelectedProject] = useState(null);
  const [motionPaused, setMotionPaused] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const menuButton = useRef(null);
  const projectTrigger = useRef(null);
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
    const change = (event) => setMotionPaused(event.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    if (motionPaused) root.style.scrollBehavior = "auto";
    return () => {
      root.style.scrollBehavior = previous;
    };
  }, [motionPaused]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);
  const visibleProjects = projects.filter(
    (project) => filter === "All work" || project.category === filter,
  );
  return (
    <MotionConfig reducedMotion={motionPaused ? "always" : "user"}>
      <div className={`portfolio ${motionPaused ? "motion-paused" : ""}`}>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <header className="site-header page-width">
          <a href="#home" className="wordmark" aria-label="Kartikesh, home">
            kartikesh<span>✳</span>
          </a>
          <button
            ref={menuButton}
            className="mobile-menu icon-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav
            id="main-nav"
            className={menuOpen ? "navigation is-open" : "navigation"}
            aria-label="Main navigation"
          >
            <a href="#work" onClick={() => setMenuOpen(false)}>
              The work
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              The person
            </a>
            <a href="#experience" onClick={() => setMenuOpen(false)}>
              The journey
            </a>
            <a
              className="nav-contact"
              href="#contact"
              onClick={() => setMenuOpen(false)}
            >
              Let’s talk <ArrowUpRight size={17} />
            </a>
          </nav>
        </header>
        <main id="main">
          <section
            id="home"
            className="hero page-width"
            aria-labelledby="hero-heading"
          >
            <motion.div
              className="hero-copy"
              initial={motionPaused ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: motionPaused ? 0 : 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="greeting">
                <span lang="hi">नमस्ते</span>
                <span className="greeting-line" /> Hello, I’m Kartikesh
              </p>
              <h1 id="hero-heading">
                Serious code.
                <br />
                <span className="playful-word">
                  Playful soul.
                  <svg
                    viewBox="0 0 500 20"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path d="M4 12 Q240 -8 496 10 M38 18 Q280 4 456 18" />
                  </svg>
                </span>
              </h1>
              <p className="hero-description">
                Game developer. Full-stack engineer.
                <br />
                Turning curious ideas into worlds you can play
                <br className="desktop-break" /> and experiences you can feel.
              </p>
              <div className="hero-actions">
                <a href="#work" className="button button-green">
                  Explore my work <ArrowDown size={18} />
                </a>
                <a className="text-link" href="#about">
                  A little about me <ArrowUpRight size={17} />
                </a>
              </div>
              <div className="hero-location">
                <span className="tiny-flower">✳</span> Rooted in India. Building
                for everywhere.
              </div>
            </motion.div>
            <motion.div
              className="hero-visual"
              initial={motionPaused ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: motionPaused ? 0 : 0.9,
                delay: motionPaused ? 0 : 0.15,
              }}
            >
              <div className="sunburst" aria-hidden="true" />
              <div className="art-note">
                a little play goes a long way
                <svg viewBox="0 0 70 50" aria-hidden="true">
                  <path d="M2 3Q60 0 56 42M43 32L56 44L68 31" />
                </svg>
              </div>
              <HeroArtwork paused={motionPaused} />
              <div className="art-stamp">
                <span>Made of</span>
                <strong>curiosity</strong>
                <Flower />
              </div>
              <button
                className="motion-control"
                onClick={() => setMotionPaused(!motionPaused)}
                aria-pressed={motionPaused}
              >
                {motionPaused ? <Play size={13} /> : <Pause size={13} />}{" "}
                {motionPaused ? "Play motion" : "Pause motion"}
              </button>
            </motion.div>
            <div className="hero-bottom">
              <span>Code with purpose. Create with joy.</span>
              <a href="#work">
                Come on in <ArrowDown size={14} />
              </a>
            </div>
          </section>
          <div
            className="craft-ribbon"
            aria-label="Games, code, art, and a little jugaad"
          >
            <div>
              <span>Games</span>
              <Flower />
              <span>Code</span>
              <Flower />
              <span>Art</span>
              <Flower />
              <span>A little jugaad</span>
              <Flower />
              <span aria-hidden="true">Games</span>
              <Flower />
            </div>
          </div>
          <section
            id="work"
            className="work-section page-width"
            aria-labelledby="work-heading"
          >
            <Reveal className="section-heading" paused={motionPaused}>
              <div>
                <p className="eyebrow">A few things I’ve made</p>
                <h2 id="work-heading">
                  Built with a<br />
                  <span className="serif-word">bit of wonder.</span>
                </h2>
              </div>
              <p>
                From the first line of code to the last little detail.
                <br /> A collection of games, tools, and experiments.
              </p>
            </Reveal>
            <div className="work-toolbar">
              <div className="filter-list" aria-label="Filter projects">
                {filters.map((item) => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    aria-pressed={filter === item}
                    className={filter === item ? "filter active" : "filter"}
                  >
                    {item}
                    {item === "All work" && <span>{projects.length}</span>}
                  </button>
                ))}
              </div>
              <span className="project-count" aria-live="polite">
                {visibleProjects.length}{" "}
                {visibleProjects.length === 1 ? "project" : "projects"} to
                explore
              </span>
            </div>
            <div className="project-grid">
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    onOpen={openProject}
                    paused={motionPaused}
                  />
                ))}
              </AnimatePresence>
            </div>
            <a
              className="text-link more-work"
              href="https://github.com/Kartikesh07"
              target="_blank"
              rel="noreferrer"
            >
              There’s more on GitHub <ArrowUpRight size={18} />
            </a>
          </section>
          <section
            id="about"
            className="about-section"
            aria-labelledby="about-heading"
          >
            <div className="page-width about-grid">
              <Reveal className="portrait-composition" paused={motionPaused}>
                <div className="portrait-frame">
                  <img
                    src={portrait}
                    alt="Kartikesh smiling outdoors"
                    width="600"
                    height="652"
                    loading="lazy"
                  />
                  <span className="portrait-caption">
                    The person behind the pixels.
                  </span>
                </div>
                <Flower className="portrait-flower" />
                <div className="portrait-sticker">
                  Always
                  <br />
                  <strong>curious.</strong>
                </div>
                <Kite className="portrait-kite" />
              </Reveal>
              <Reveal className="about-copy" paused={motionPaused} delay={0.1}>
                <p className="eyebrow">A little about me</p>
                <h2 id="about-heading">
                  Engineer by training.
                  <br />
                  <span className="serif-word">Maker at heart.</span>
                </h2>
                <p>
                  I’m Kartikesh, a game developer and full-stack engineer with a
                  B.Tech in Artificial Intelligence &amp; Data Science.
                </p>
                <p>
                  I like the place where logic meets imagination: a satisfying
                  game mechanic, a world built from a seed, or a thoughtful
                  interface that just feels right.
                </p>
                <p>
                  My work brings together game development, engine tooling, and
                  AI-powered web experiences. This corner of the internet brings
                  a little of my Indian roots along for the ride.
                </p>
                <a className="text-link" href="#contact">
                  Let’s make something interesting <ArrowUpRight size={18} />
                </a>
              </Reveal>
            </div>
          </section>
          <section
            className="skills-section page-width"
            aria-labelledby="skills-heading"
          >
            <Reveal className="skills-intro" paused={motionPaused}>
              <p className="eyebrow">Many tools. One curious mind.</p>
              <h2 id="skills-heading">
                What’s in
                <br />
                my <span className="serif-word">toolbox?</span>
              </h2>
              <Flower className="toolbox-flower" />
            </Reveal>
            <div className="skill-list">
              <Reveal className="skill-row" paused={motionPaused}>
                <span className="skill-icon pink">
                  <Gamepad2 size={25} />
                </span>
                <div>
                  <h3>Worlds worth playing</h3>
                  <p>Gameplay systems, procedural worlds &amp; engine tools</p>
                  <div className="skill-tools">
                    Godot · Unreal Engine · Unity · C++ · GDScript
                  </div>
                </div>
              </Reveal>
              <Reveal className="skill-row" paused={motionPaused} delay={0.08}>
                <span className="skill-icon yellow">
                  <Code2 size={25} />
                </span>
                <div>
                  <h3>Ideas made interactive</h3>
                  <p>
                    Thoughtful interfaces, APIs &amp; full-stack applications
                  </p>
                  <div className="skill-tools">
                    React · JavaScript · TypeScript · Python · Supabase
                  </div>
                </div>
              </Reveal>
              <Reveal className="skill-row" paused={motionPaused} delay={0.16}>
                <span className="skill-icon blue">
                  <Flower />
                </span>
                <div>
                  <h3>A little extra dimension</h3>
                  <p>
                    3D objects, visual experiments &amp; motion with character
                  </p>
                  <div className="skill-tools">
                    Blender · Three.js · GSAP · Framer Motion
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
          <section
            id="experience"
            className="experience-section page-width"
            aria-labelledby="experience-heading"
          >
            <Reveal className="section-heading" paused={motionPaused}>
              <div>
                <p className="eyebrow">Learning by making</p>
                <h2 id="experience-heading">
                  The journey <span className="serif-word">so far.</span>
                </h2>
              </div>
              <span className="handwritten">
                Still curious. Still building.
              </span>
            </Reveal>
            <div className="experience-list">
              {experience.map((item) => (
                <details className="experience-item" key={item.company}>
                  <summary>
                    <span className="experience-period">{item.period}</span>
                    <span className="experience-role">
                      <strong>{item.role}</strong>
                      <span>{item.company}</span>
                    </span>
                    <span className="experience-tag">{item.field}</span>
                    <ChevronDown size={22} />
                  </summary>
                  <div className="experience-description">
                    <p>{item.description}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>
          <Contact paused={motionPaused} />
        </main>
        {selectedProject && (
          <ProjectDialog project={selectedProject} onClose={closeProject} />
        )}
        <Suspense fallback={null}>
          <Moru
            paused={motionPaused}
            suspended={Boolean(selectedProject) || menuOpen}
          />
        </Suspense>
      </div>
    </MotionConfig>
  );
}
