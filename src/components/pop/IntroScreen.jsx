import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import { Flower } from "./Illustrations";
import "./intro.css";

const letters = Array.from("kartikesh");

export default function IntroScreen({ contentRef, onReveal, onComplete }) {
  const screen = useRef(null);
  const skip = useRef(() => {});
  const focusFrame = useRef(0);

  useLayoutEffect(() => {
    const element = screen.current;
    const content = contentRef.current;
    const html = document.documentElement;
    const body = document.body;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const previousFocus = document.activeElement;
    const previousInert = content.inert;
    const initialHash = window.location.hash;
    const position = { x: window.scrollX, y: window.scrollY };
    const contentWidth = html.clientWidth;
    const previousStyles = {
      htmlOverflow: html.style.overflow,
      htmlGutter: html.style.scrollbarGutter,
      bodyOverflow: body.style.overflow,
      width: body.style.width,
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
    };
    let complete = false;
    let timeline;
    let context;
    let deadline;
    cancelAnimationFrame(focusFrame.current);

    // Fixed-body locking also prevents background touch scrolling on iOS.
    html.dataset.intro = "active";
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `${-position.y}px`;
    body.style.left = "0";
    body.style.right = "0";
    // Preserve the page width while letting the curtain cover the scrollbar gutter.
    body.style.width = `${contentWidth}px`;
    html.style.scrollbarGutter = "auto";
    content.inert = true;
    element.focus({ preventScroll: true });

    function finish() {
      if (complete) return;
      complete = true;
      timeline?.kill();
      clearTimeout(deadline);
      onComplete();
    }
    skip.current = finish;
    const keydown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        finish();
      } else if (event.key === "Tab") {
        // Only the immediate skip control participates in this short modal.
        event.preventDefault();
        element.querySelector("button").focus({ preventScroll: true });
      }
    };
    const preference = (event) => { if (event.matches) finish(); };
    const visibility = () => { if (document.hidden) finish(); };
    const restore = (event) => { if (event.persisted) finish(); };
    document.addEventListener("keydown", keydown);
    document.addEventListener("visibilitychange", visibility);
    reducedMotion.addEventListener("change", preference);
    window.addEventListener("hashchange", finish);
    window.addEventListener("pagehide", finish);
    window.addEventListener("pageshow", restore);
    window.addEventListener("resize", finish);

    // This is an animation deadline, never a wait for fonts, assets, or loading.
    deadline = window.setTimeout(finish, 3000);
    if (reducedMotion.matches || document.hidden) {
      finish();
    } else {
      try {
        context = gsap.context(() => {
          timeline = gsap.timeline({ onComplete: finish });
          timeline
            .from(".intro-letter", { yPercent: 115, rotation: 5, duration: 0.8, stagger: 0.035, ease: "power4.out" }, 0.08)
            .from(".intro-rosette", { scale: 0.35, rotation: -100, duration: 1.1, ease: "power3.out" }, 0.15)
            .from(".intro-orbit", { scale: 0.88, rotation: -12, opacity: 0, duration: 1.15, ease: "power2.out" }, 0.1)
            .from(".intro-caption", { y: 12, opacity: 0, duration: 0.65, ease: "power2.out" }, 0.35)
            .to(".intro-wordmark", { scale: 0.96, duration: 0.65, ease: "power2.inOut" }, 1.05)
            .to(".intro-brand-mask", { y: -25, opacity: 0, duration: 0.45, ease: "power2.in" }, 1.5)
            .to(".intro-surface", { yPercent: -101, duration: 0.82, ease: "power4.inOut" }, 1.65)
            .to(".intro-accent", { yPercent: -101, duration: 0.78, ease: "power4.inOut" }, 1.77)
            .to(".intro-greeting, .intro-caption", { opacity: 0, duration: 0.2 }, 1.65)
            .call(onReveal, [], 2.08);
        }, element);
      } catch {
        finish();
      }
    }

    return () => {
      complete = true;
      skip.current = () => {};
      clearTimeout(deadline);
      context?.revert();
      document.removeEventListener("keydown", keydown);
      document.removeEventListener("visibilitychange", visibility);
      reducedMotion.removeEventListener("change", preference);
      window.removeEventListener("hashchange", finish);
      window.removeEventListener("pagehide", finish);
      window.removeEventListener("pageshow", restore);
      window.removeEventListener("resize", finish);
      delete html.dataset.intro;
      html.style.overflow = previousStyles.htmlOverflow;
      html.style.scrollbarGutter = previousStyles.htmlGutter;
      body.style.overflow = previousStyles.bodyOverflow;
      body.style.width = previousStyles.width;
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.left = previousStyles.left;
      body.style.right = previousStyles.right;
      content.inert = previousInert;
      // Explicit instant restoration avoids the site's smooth anchor scrolling.
      window.scrollTo({ left: position.x, top: position.y, behavior: "instant" });
      focusFrame.current = requestAnimationFrame(() => {
        // Ignore React Strict Mode's simulated unmount and superseded intros.
        if (document.querySelector(".intro-screen")) return;
        if (window.location.hash !== initialHash) {
          const id = window.location.hash.slice(1);
          document.getElementById(id)?.scrollIntoView({ behavior: "instant" });
        }
        if (document.activeElement === body || element.contains(document.activeElement)) {
          const target = previousFocus !== body && previousFocus?.isConnected
            ? previousFocus : content.querySelector("#hero-heading");
          target?.focus({ preventScroll: true });
        }
      });
    };
  }, [contentRef, onReveal, onComplete]);

  return (
    <div ref={screen} className="intro-screen" role="dialog" aria-modal="true" aria-label="Welcome to Kartikesh’s portfolio" tabIndex={-1}>
      <div className="intro-curtain intro-accent" aria-hidden="true" />
      <div className="intro-curtain intro-surface">
        <div className="intro-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="intro-brand-mask">
          <div className="intro-wordmark" aria-label="kartikesh ✳">
            <span className="intro-name" aria-hidden="true">{letters.map((letter, index) => <span className="intro-letter" key={index}>{letter}</span>)}</span>
            <span className="intro-rosette" aria-hidden="true"><Flower /></span>
          </div>
        </div>
      </div>
      <div className="intro-chrome">
        <span className="intro-greeting" lang="hi">नमस्ते</span>
        <button className="intro-skip" onClick={() => skip.current()}>Skip intro <ArrowUpRight size={16} aria-hidden="true" /></button>
        <p className="intro-caption">Code. Play. Possibility.</p>
      </div>
      <p className="sr-only">A short introduction. Press Escape or choose Skip intro to enter the portfolio immediately.</p>
    </div>
  );
}
