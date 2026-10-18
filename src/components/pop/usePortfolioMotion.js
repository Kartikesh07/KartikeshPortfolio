import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function usePortfolioMotion(root, paused) {
  useEffect(() => {
    if (paused) return;
    const context = gsap.context(() => {
      const entrance = gsap.timeline({
        defaults: {
          ease: "power3.out"
        }
      });
      entrance.from(".hero-line > span", {
        yPercent: 110,
        rotate: 3,
        duration: 1.15,
        stagger: 0.13
      }).from(".hero-intro, .hero-description, .hero-actions, .hero-foot", {
        opacity: 0,
        y: 16,
        duration: 0.65,
        stagger: 0.08
      }, 0.3).from(".hero-visual", {
        opacity: 0,
        scale: 0.88,
        rotate: -8,
        duration: 1.3
      }, 0.1);
      const media = gsap.matchMedia();
      media.add("(min-width: 800px)", () => {
        gsap.to(".hero-art-shift", {
          y: -75,
          rotate: 5,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
          }
        });
        gsap.fromTo(".portrait-frame img", {
          yPercent: 4,
          scale: 1.12
        }, {
          yPercent: -4,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      });
      gsap.utils.toArray(".section-title").forEach(heading => {
        gsap.from(heading.querySelectorAll(".title-line > span"), {
          yPercent: 105,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            once: true
          }
        });
      });
      let disposed = false;
      document.fonts?.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
      return () => {
        disposed = true;
        media.revert();
      };
    }, root);
    return () => context.revert();
  }, [root, paused]);
}
