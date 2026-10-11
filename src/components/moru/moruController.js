
import { gsap } from "gsap";
import { initialMoruState, transitionMoru } from "./moruMachine";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const interactiveSelector =
  "a, button, input, textarea, select, summary, [role='button']";

const inputFocused = () => {
  const active = document.activeElement;
  if (!active?.matches("input, textarea, select, [contenteditable='true']")) {
    return false;
  }
  const rect = active.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
};

const isSuppressed = () => document.hidden || inputFocused();

const uiIsOpen = () =>
  Boolean(document.querySelector("dialog[open], #main-nav.is-open"));

function overlaps(a, b) {
  return (
    a.left < b.right + 4 &&
    a.right > b.left - 4 &&
    a.top < b.bottom + 4 &&
    a.bottom > b.top - 4
  );
}

// Never move or collapse the pet.
// Only disable buttons that overlap page controls.
function inspectDock(root, full = true) {
  const controls = [...document.querySelectorAll(interactiveSelector)]
    .filter((element) => !root.contains(element))
    .filter((element) => {
      const style = getComputedStyle(element);
      return style.visibility !== "hidden" && style.display !== "none";
    })
    .map((element) => element.getBoundingClientRect())
    .filter(
      (rect) =>
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < window.innerHeight,
    );

  const toggle = full ? root.querySelector(".moru-toggle") : root;
  const trigger = full ? root.querySelector(".moru-trigger") : null;

  const blocked = (node) =>
    Boolean(
      node &&
      controls.some((rect) =>
        overlaps(node.getBoundingClientRect(), rect),
      ),
    );

  const toggleBlocked = blocked(toggle);

  root.dataset.collapsed = "false";
  root.dataset.blocked = String(toggleBlocked);

  if (toggle) toggle.disabled = toggleBlocked;
  if (trigger) trigger.disabled = blocked(trigger);

  return false;
}

export function createMoruDock(node) {
  let frame = null;

  function update() {
    frame = null;
    inspectDock(node, false);
  }

  function request() {
    if (frame === null) frame = requestAnimationFrame(update);
  }

  update();

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request, { passive: true });
  window.visualViewport?.addEventListener("resize", request, {
    passive: true,
  });

  return {
    destroy() {
      if (frame !== null) cancelAnimationFrame(frame);

      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.visualViewport?.removeEventListener("resize", request);
    },
  };
}

export function createMoruController(root, { paused, memory, announce }) {
  const get = (selector) => root.querySelector(selector);

  const bubble = get(".moru-dialogue");
  const trigger = get(".moru-trigger");
  const feathers = [...root.querySelectorAll(".moru-feather")];
  const particles = [...root.querySelectorAll(".moru-particle")];

  const parts = {
    gait: get(".moru-gait"),
    body: get(".moru-body-motion"),
    head: get(".moru-head"),
    aim: get(".moru-head-aim"),
    eyes: get(".moru-eyes"),
    gaze: get(".moru-gaze"),
    wing: get(".moru-wing"),
    crest: get(".moru-crest"),
    tail: get(".moru-tail"),
    beak: get(".moru-beak"),
    frontLeg: get(".moru-leg-front"),
    backLeg: get(".moru-leg-back"),
  };

  const context = gsap.context(() => {
    gsap.set(feathers, {
      svgOrigin: "120 208",
      rotation: (i) => Number(feathers[i].dataset.angle) / 9,
      scaleY: 0.62,
    });

    gsap.set([parts.gait, parts.body], {
      svgOrigin: "120 220",
    });

    gsap.set(parts.tail, { svgOrigin: "120 208" });
    gsap.set([parts.head, parts.aim], { svgOrigin: "141 111" });
    gsap.set(parts.eyes, { svgOrigin: "147 102" });

    if (parts.beak) {
      gsap.set(parts.beak, { svgOrigin: "160 106" });
    }

    gsap.set(parts.wing, { svgOrigin: "111 179" });
    gsap.set(parts.crest, { svgOrigin: "141 89" });
    gsap.set(parts.frontLeg, { svgOrigin: "109 219" });
    gsap.set(parts.backLeg, { svgOrigin: "132 219" });
  }, root);

  const aim = gsap.quickTo(parts.aim, "rotation", {
    duration: 0.4,
    ease: "power2.out",
  });

  const gazeX = gsap.quickTo(parts.gaze, "x", {
    duration: 0.3,
    ease: "power2.out",
  });

  const gazeY = gsap.quickTo(parts.gaze, "y", {
    duration: 0.3,
    ease: "power2.out",
  });

  const sectionMessages = [
    [
      "home",
      () => document.getElementById("home"),
      "Another tour? I'm ready!",
    ],
    [
      "work",
      () => document.getElementById("work"),
      "These creations are worth a peek!",
    ],
    [
      "about",
      () => document.getElementById("about"),
      "Meet the human behind the code!",
    ],
    [
      "experience",
      () => document.getElementById("experience"),
      "Every adventure has a story!",
    ],
    [
      "skills",
      () => document.getElementById("skills-heading")?.closest("section"),
      "Brains, code, and a little magic!",
    ],
    [
      "contact",
      () => document.getElementById("contact"),
      "Got an idea? Say hello!",
    ],
  ];

  let state = initialMoruState;
  let timeline = null;
  let bubbleTween = null;
  let idleTimer = null;
  let dialogueTimer = null;
  let projectTimer = null;
  let frame = null;
  let destroyed = false;
  let staticFan = false;
  let dockDirty = true;
  let cursor = null;
  let lastCard = null;
  let lastScroll = window.scrollY;
  let scrollDirection = 1;
  let lastScrollGesture = -Infinity;
  let entranceFinished = Boolean(memory.entered);

  function hideDialogue() {
    clearTimeout(dialogueTimer);
    bubbleTween?.kill();
    bubbleTween = null;
    bubble.hidden = true;
    bubble.style.opacity = "0";
  }

  // Forced dialogue bypasses cooldown.
  // Suppression still takes priority.
  function say(text, force = false) {
    if (destroyed || isSuppressed() || uiIsOpen()) return false;

    const now = performance.now();

    if (
      !force &&
      now - (memory.lastDialogue ?? -Infinity) < 30000
    ) {
      return false;
    }

    if (!force) {
      memory.lastDialogue = now;
    }

    hideDialogue();

    bubble.textContent = text;
    bubble.hidden = false;

    if (force) announce(text);

    if (paused) {
      bubble.style.opacity = "1";
    } else {
      bubbleTween = gsap.fromTo(
        bubble,
        { opacity: 0, y: 4 },
        {
          opacity: 1,
          y: 0,
          duration: 0.22,
          overwrite: true,
        },
      );
    }

    dialogueTimer = setTimeout(() => {
      if (paused) {
        hideDialogue();
      } else {
        bubbleTween = gsap.to(bubble, {
          opacity: 0,
          y: -4,
          duration: 0.22,
          onComplete: hideDialogue,
        });
      }
    }, 3400);

    return true;
  }

  function resetGesture() {
    timeline?.kill();
    timeline = null;

    gsap.set(
      [
        parts.gait,
        parts.body,
        parts.head,
        parts.wing,
        parts.crest,
        parts.tail,
        parts.beak,
        parts.frontLeg,
        parts.backLeg,
      ].filter(Boolean),
      {
        rotation: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
      },
    );

    gsap.set(parts.eyes, { scaleY: 1 });

    gsap.set(feathers, {
      rotation: (i) => Number(feathers[i].dataset.angle) / 9,
      scaleY: 0.62,
    });

    gsap.set(particles, {
      opacity: 0,
      x: 0,
      y: 0,
      scale: 1,
    });

    staticFan = false;
    root.dataset.fanOpen = "false";

    if (paused) {
      trigger.setAttribute("aria-pressed", "false");
    }
  }

  function scheduleIdle() {
    clearTimeout(idleTimer);

    if (destroyed || paused || state.value !== "idle") return;

    idleTimer = setTimeout(() => {
      if (isSuppressed() || uiIsOpen()) {
        scheduleIdle();
        return;
      }

      if (performance.now() - memory.lastActivity > 75000) {
        send({ type: "SLEEP" });
        return;
      }

      const random = Math.random();

      send({
        type:
          random < 0.43
            ? "BLINK"
            : random < 0.65
              ? "BREATHE"
              : random < 0.82
                ? "PREEN"
                : random < 0.94
                  ? "STRETCH"
                  : "LOOK",
      });
    }, 8000 + Math.random() * 6000);
  }

  function animateState() {
    clearTimeout(idleTimer);
    resetGesture();

    root.dataset.moruState = state.value;
    root.dataset.moruPhase =
      state.value === "fanning" ? "anticipation" : "rest";

    aim.tween.pause();
    gazeX.tween.pause();
    gazeY.tween.pause();

    gsap.set([parts.aim, parts.gaze], {
      rotation: 0,
      x: 0,
      y: 0,
    });

    if (["paused", "suspended", "hidden"].includes(state.value)) {
      hideDialogue();
      return;
    }

    if (state.value === "idle") {
      scheduleIdle();
      return;
    }

    const epoch = state.epoch;

    timeline = gsap.timeline({
      onComplete: () => send({ type: "COMPLETE", epoch }),
    });

    const blink = (at) =>
      timeline
        .to(parts.eyes, {
          scaleY: 0.07,
          duration: 0.085,
        }, at)
        .to(parts.eyes, {
          scaleY: 1,
          duration: 0.13,
        }, at + 0.085);

    switch (state.value) {
      case "entering":
        timeline
          .fromTo(
            parts.gait,
            {
              y: 235,
              scaleX: 0.92,
              scaleY: 1.05,
            },
            {
              y: 80,
              scaleX: 1,
              scaleY: 1,
              duration: 0.4,
              ease: "power2.out",
            },
            0,
          )
          .to(parts.head, {
            rotation: -12,
            duration: 0.25,
          }, 0.3)
          .to(parts.gait, {
            y: 96,
            scaleX: 1.12,
            scaleY: 0.88,
            duration: 0.18,
          }, 0.56)
          .to(
            parts.gait,
            {
              y: -17,
              scaleX: 0.92,
              scaleY: 1.08,
              duration: 0.35,
              ease: "power2.out",
            },
            0.74,
          )
          .to(parts.gait, {
            y: 0,
            scaleX: 1.06,
            scaleY: 0.94,
            duration: 0.22,
          }, 1.09)
          .to(parts.gait, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.3,
            ease: "back.out(2)",
          }, 1.31)
          .to(parts.wing, {
            rotation: -22,
            duration: 0.13,
            repeat: 3,
            yoyo: true,
          }, 0.8)
          .to(parts.crest, {
            rotation: 14,
            duration: 0.14,
            repeat: 3,
            yoyo: true,
          }, 1.05)
          .to(parts.head, {
            rotation: 5,
            duration: 0.3,
          }, 1.2)
          .to(parts.head, {
            rotation: 0,
            duration: 0.25,
          }, 1.55)
          .call(() => {
            entranceFinished = true;
            say("Namaste! I'm Moru 🦚", true);
          }, [], 1.65);

        blink(1.35);
        break;

      case "blinking":
        blink(0);
        break;

      case "curious":
      case "hovering":
        timeline
          .to(parts.head, {
            rotation: -9,
            duration: 0.3,
          }, 0)
          .to(parts.crest, {
            rotation: 7,
            duration: 0.3,
          }, 0)
          .to([parts.head, parts.crest], {
            rotation: 0,
            duration: 0.4,
          }, 0.85);

        if (state.value === "hovering") {
          blink(0.4);
        }
        break;

      case "breathing":
        timeline
          .to(parts.body, {
            scaleX: 1.02,
            scaleY: 1.025,
            y: -1,
            duration: 1,
          }, 0)
          .to(parts.crest, {
            rotation: 3,
            duration: 1,
          }, 0)
          .to([parts.body, parts.crest], {
            scaleX: 1,
            scaleY: 1,
            y: 0,
            rotation: 0,
            duration: 1,
          }, 1);
        break;

      case "preening":
        timeline
          .to(parts.head, {
            rotation: 36,
            y: 32,
            duration: 0.45,
          }, 0)
          .to(parts.wing, {
            rotation: -13,
            duration: 0.4,
          }, 0)
          .to(parts.head, {
            rotation: 43,
            y: 36,
            duration: 0.2,
            repeat: 3,
            yoyo: true,
          }, 0.55)
          .to([parts.head, parts.wing], {
            rotation: 0,
            y: 0,
            duration: 0.5,
          }, 1.45);

        blink(0.45);
        break;

      case "stretching":
        timeline
          .to(parts.wing, {
            rotation: -38,
            scaleX: 1.17,
            duration: 0.5,
            ease: "back.out(1.4)",
          }, 0)
          .to(parts.body, {
            rotation: -4,
            scaleY: 1.04,
            duration: 0.5,
          }, 0)
          .to(parts.head, {
            rotation: -12,
            duration: 0.5,
          }, 0)
          .to(parts.crest, {
            rotation: 10,
            duration: 0.4,
          }, 0.3)
          .to(
            [
              parts.wing,
              parts.body,
              parts.head,
              parts.crest,
            ],
            {
              rotation: 0,
              scaleX: 1,
              scaleY: 1,
              duration: 0.6,
            },
            1.15,
          );
        break;

      case "sleepy":
        timeline
          .to(parts.head, {
            rotation: -10,
            y: -3,
            duration: 0.45,
          }, 0)
          .to(parts.head, {
            rotation: 24,
            y: 9,
            duration: 0.7,
          }, 0.8)
          .to(parts.eyes, {
            scaleY: 0.06,
            duration: 0.5,
          }, 0.9)
          .to(parts.crest, {
            rotation: 12,
            duration: 0.5,
          }, 1);
        break;

      case "waking":
        timeline
          .fromTo(
            parts.eyes,
            { scaleY: 0.06 },
            { scaleY: 1, duration: 0.25 },
            0,
          )
          .fromTo(
            parts.head,
            { rotation: 24, y: 9 },
            { rotation: -7, y: -3, duration: 0.4 },
            0,
          )
          .to(parts.crest, {
            rotation: -10,
            duration: 0.2,
            repeat: 1,
            yoyo: true,
          }, 0.15)
          .to(parts.head, {
            rotation: 0,
            y: 0,
            duration: 0.4,
          }, 0.5);

        say("Oh! You're still here!");
        break;

      case "scrolling":
        timeline
          .to(parts.body, {
            rotation: scrollDirection * 3,
            duration: 0.2,
          }, 0)
          .to(parts.head, {
            rotation: scrollDirection * -5,
            duration: 0.2,
          }, 0)
          .to(parts.tail, {
            rotation: scrollDirection * 3,
            duration: 0.25,
          }, 0)
          .to(
            [parts.body, parts.head, parts.tail],
            {
              rotation: 0,
              duration: 0.4,
            },
            0.25,
          );
        break;

      case "fanning":
        timeline
          .to(parts.body, {
            scaleY: 0.94,
            y: 2,
            duration: 0.22,
          }, 0)
          .to(parts.head, {
            rotation: -9,
            duration: 0.22,
          }, 0)
          .to(parts.wing, {
            rotation: -12,
            duration: 0.25,
          }, 0.12)
          .to(feathers, {
            rotation: (i) =>
              Number(feathers[i].dataset.angle),
            scaleY: 1,
            duration: 0.65,
            stagger: {
              each: 0.035,
              from: "center",
            },
            ease: "back.out(1.35)",
          }, 0.22)
          .to(parts.body, {
            scaleY: 1.03,
            y: -3,
            duration: 0.35,
          }, 0.3)
          .to(parts.crest, {
            rotation: 9,
            duration: 0.3,
          }, 0.45)
          .to(particles, {
            opacity: 1,
            scale: 1.15,
            duration: 0.12,
            stagger: 0.025,
          }, 0.72)
          .to(particles, {
            x: (i) =>
              Math.cos((i / 6) * Math.PI * 2) * 76,
            y: (i) =>
              Math.sin((i / 6) * Math.PI * 2) * 58 - 24,
            opacity: 0,
            scale: 0.5,
            duration: 0.65,
            stagger: 0.025,
          }, 0.86)
          .to(parts.head, {
            rotation: 5,
            duration: 0.35,
          }, 1.05)
          .call(() => {
            root.dataset.moruPhase = "display";
          }, [], 1.1)
          .to(parts.wing, {
            rotation: -4,
            duration: 0.3,
          }, 1.3)
          .call(() => {
            root.dataset.moruPhase = "settling";
          }, [], 2.05)
          .to(feathers, {
            rotation: (i) =>
              Number(feathers[i].dataset.angle) / 9,
            scaleY: 0.62,
            duration: 0.55,
            stagger: {
              each: 0.022,
              from: "edges",
            },
          }, 2.05)
          .to(
            [
              parts.body,
              parts.head,
              parts.wing,
              parts.crest,
            ],
            {
              scaleY: 1,
              rotation: 0,
              y: 0,
              duration: 0.4,
            },
            2.4,
          );
        break;

      default:
        break;
    }
  }

  function send(event) {
    if (destroyed) return false;

    const next = transitionMoru(state, event);

    if (next === state) return false;

    state = next;
    animateState();

    return true;
  }

  function activity() {
    memory.lastActivity = performance.now();

    if (state.value === "sleepy") {
      send({ type: "WAKE" });
    }
  }

  function updateGaze() {
    if (
      paused ||
      !["idle", "curious", "hovering"].includes(state.value)
    ) {
      return;
    }

    const rect = trigger.getBoundingClientRect();

    const dx = cursor
      ? cursor.x - (rect.left + rect.width / 2)
      : 0;

    const dy = cursor
      ? cursor.y - (rect.top + rect.height * 0.25)
      : 0;

    const nearby = cursor && Math.hypot(dx, dy) < 220;

    aim(nearby ? clamp(dx / 35, -6, 6) : 0);
    gazeX(nearby ? clamp(dx / 75, -2.1, 2.1) : 0);
    gazeY(nearby ? clamp(dy / 85, -1.7, 1.7) : 0);
  }

  // Immediate section detection.
  // No scroll-settle timeout or cross-section cooldown.
  function contextual() {
    if (!memory.entered || isSuppressed() || uiIsOpen()) {
      return;
    }

    const sightLine = window.innerHeight * 0.58;

    const active = sectionMessages.find(([, resolve]) => {
      const element = resolve();

      if (!element) return false;

      const rect = element.getBoundingClientRect();

      return (
        rect.top <= sightLine &&
        rect.bottom > sightLine
      );
    });

    if (!active) return;

    const [key, , text] = active;

    if (memory.lastContext === key) return;

    memory.lastContext = key;

    if (key === "home" && !entranceFinished) return;

    say(text, true);
  }

  function flush() {
    frame = null;

    if (destroyed) return;

    const suppressed = isSuppressed();

    root.dataset.suppressed = String(suppressed);

    if (dockDirty) {
      inspectDock(root);
      dockDirty = false;
    }

    if (suppressed) {
      send({ type: "SUSPEND" });
      hideDialogue();
      return;
    }

    if (!memory.entered) {
      memory.entered = true;

      if (paused) {
        send({ type: "PAUSE" });
      } else {
        if (state.value === "suspended") {
          send({ type: "RESUME" });
        }

        send({ type: "ENTER" });
      }
    } else if (state.value === "suspended") {
      send({
        type: paused ? "PAUSE" : "RESUME",
      });
    }

    updateGaze();
    contextual();
  }

  function request() {
    if (frame === null && !destroyed) {
      frame = requestAnimationFrame(flush);
    }
  }

  function resize() {
    dockDirty = true;
    request();
  }

  function scroll() {
    activity();
    dockDirty = true;

    scrollDirection =
      window.scrollY >= lastScroll ? 1 : -1;

    lastScroll = window.scrollY;

    const now = performance.now();

    if (
      memory.entered &&
      !paused &&
      now - lastScrollGesture > 1100
    ) {
      if (send({ type: "SCROLL" })) {
        lastScrollGesture = now;
      }
    }

    request();
  }

  function pointer(event) {
    activity();

    if (event.pointerType !== "mouse" || paused) return;

    cursor = {
      x: event.clientX,
      y: event.clientY,
    };

    request();
  }

  function project(event) {
    const card =
      event.target instanceof Element
        ? event.target.closest(".project-card")
        : null;

    if (card === lastCard) return;

    lastCard = card;

    clearTimeout(projectTimer);

    if (
      !card ||
      !memory.entered ||
      isSuppressed() ||
      uiIsOpen()
    ) {
      return;
    }

    send({ type: "PROJECT" });

    const text = card.textContent.includes("Games")
      ? "Games are my favorite too!"
      : "These creations are worth a peek!";

    if (event.type === "focusin") {
      say(text);
    } else {
      projectTimer = setTimeout(() => {
        if (lastCard === card) {
          say(text);
        }
      }, 1000);
    }
  }

  function focus(event) {
    activity();
    project(event);
    dockDirty = true;
    visibility();
  }

  function leave(event) {
    if (!event.relatedTarget) {
      cursor = null;
      request();
    }
  }

  function visibility() {
    dockDirty = true;

    if (isSuppressed()) {
      root.dataset.suppressed = "true";
      send({ type: "SUSPEND" });
      hideDialogue();
    } else {
      request();
    }
  }

  function hover(event) {
    if (
      memory.entered &&
      event.pointerType === "mouse" &&
      event.target.closest?.(".moru-trigger")
    ) {
      activity();
      send({ type: "HOVER" });
    }
  }

  const listeners = [
    [window, "scroll", scroll],
    [window, "resize", resize],
    [window, "hashchange", request],
    [document, "pointermove", pointer],
    [document, "pointerover", project],
    [document, "pointerout", leave],
    [document, "pointerdown", activity],
    [document, "keydown", activity],
    [document, "focusin", focus],
    [document, "focusout", visibility],
    [document, "visibilitychange", visibility],
    [root, "pointerover", hover],
  ];

  if (window.visualViewport) {
    listeners.push([
      window.visualViewport,
      "resize",
      resize,
    ]);
  }

  listeners.forEach(([target, type, fn]) =>
    target.addEventListener(type, fn, {
      passive: true,
    }),
  );

  resetGesture();

  root.dataset.moruState = "idle";
  root.dataset.moruPhase = "rest";
  root.dataset.collapsed = "false";

  if (paused) {
    memory.entered = true;
    trigger.setAttribute("aria-pressed", "false");
    send({ type: "PAUSE" });
  } else {
    trigger.removeAttribute("aria-pressed");
  }

  request();

  return {
    fan() {
      activity();

      if (
        destroyed ||
        isSuppressed() ||
        uiIsOpen() ||
        state.value === "fanning"
      ) {
        return false;
      }

      if (paused) {
        staticFan = !staticFan;

        gsap.set(feathers, {
          rotation: (i) =>
            Number(feathers[i].dataset.angle) /
            (staticFan ? 1 : 9),
          scaleY: staticFan ? 1 : 0.62,
        });

        root.dataset.fanOpen = String(staticFan);

        trigger.setAttribute(
          "aria-pressed",
          String(staticFan),
        );
      } else {
        send({ type: "FAN" });
      }

      say(
        paused && !staticFan
          ? "A little rest for my feathers."
          : "Behold my magnificent feathers!",
        true,
      );

      return true;
    },

    destroy() {
      destroyed = true;

      clearTimeout(idleTimer);
      clearTimeout(dialogueTimer);
      clearTimeout(projectTimer);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }

      listeners.forEach(([target, type, fn]) =>
        target.removeEventListener(type, fn),
      );

      resetGesture();
      hideDialogue();

      aim.tween.kill();
      gazeX.tween.kill();
      gazeY.tween.kill();

      gsap.killTweensOf([
        ...Object.values(parts).filter(Boolean),
        ...feathers,
        ...particles,
        bubble,
      ]);

      context.revert();
    },
  };
}
