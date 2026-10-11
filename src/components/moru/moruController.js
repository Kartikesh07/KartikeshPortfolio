import { gsap } from "gsap";
import { initialMoruState, transitionMoru } from "./moruMachine";

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
const intersects = (a, b) =>
  a.left < b.right + 4 &&
  a.right > b.left - 4 &&
  a.top < b.bottom + 4 &&
  a.bottom > b.top - 4;
const suppressed = () =>
  document.hidden ||
  document.activeElement?.matches(
    "input, textarea, select, [contenteditable='true']",
  );

// Collision checks change presentation and hit-testing, never dock position.
function inspectDock(root, full = true) {
  const box = root.getBoundingClientRect();
  const obstacles = [
    ...document.querySelectorAll(
      "a, button, input, textarea, select, summary, [role='button']",
    ),
  ]
    .filter((node) => !root.contains(node))
    .map((node) => ({ node, rect: node.getBoundingClientRect() }))
    .filter(
      ({ node, rect }) =>
        rect.width &&
        rect.height &&
        rect.bottom > 0 &&
        rect.top < innerHeight &&
        getComputedStyle(node).visibility !== "hidden",
    );
  const badge = full ? root.querySelector(".moru-toggle") : root;
  const compact = {
    left: box.right - 44,
    right: box.right,
    top: box.bottom - 44,
    bottom: box.bottom,
  };
  const footprint = { ...compact, left: box.left - 35, top: box.top };
  const collapsed =
    full && obstacles.some(({ rect }) => intersects(footprint, rect));
  root.dataset.collapsed = String(collapsed);
  const badgeBox = collapsed || !full ? compact : badge.getBoundingClientRect();
  const blocked = obstacles.some(({ rect }) => intersects(badgeBox, rect));
  root.dataset.blocked = String(blocked);
  badge.disabled = blocked;
  if (full) {
    const trigger = root.querySelector(".moru-trigger");
    trigger.disabled = collapsed;
    trigger.tabIndex = collapsed ? -1 : 0;
  }
  return collapsed || blocked;
}

export function createMoruDock(node) {
  let frame;
  const place = () => {
    frame = undefined;
    inspectDock(node, false);
  };
  const request = () => {
    if (!frame) frame = requestAnimationFrame(place);
  };
  place();
  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request, { passive: true });
  window.visualViewport?.addEventListener("resize", request, { passive: true });
  return {
    destroy() {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      window.visualViewport?.removeEventListener("resize", request);
    },
  };
}

export function createMoruController(root, { paused, memory, announce }) {
  const get = (selector) => root.querySelector(selector);
  const feathers = [...root.querySelectorAll(".moru-feather")];
  const particles = [...root.querySelectorAll(".moru-particle")];
  const bubble = get(".moru-dialogue");
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
      x: 0,
      y: 0,
    });
    gsap.set([parts.gait, parts.body], { svgOrigin: "120 220" });
    gsap.set(parts.tail, { svgOrigin: "120 208" });
    gsap.set([parts.head, parts.aim], { svgOrigin: "141 111" });
    gsap.set(parts.eyes, { svgOrigin: "147 102" });
    gsap.set(parts.beak, { svgOrigin: "160 106" });
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
  let state = initialMoruState,
    timeline,
    bubbleTween,
    idleTimer,
    dialogueTimer,
    settleTimer,
    frame;
  let destroyed = false,
    staticFan = false,
    collapsed = false,
    lastScroll = window.scrollY,
    scrollDirection = 1,
    lastScrollGesture = -Infinity,
    lastCard = null;
  let cursor = null,
    dockDirty = true;

  function hideDialogue() {
    clearTimeout(dialogueTimer);
    bubbleTween?.kill();
    bubble.hidden = true;
    bubble.style.opacity = "0";
  }
  function say(text, immediate = false) {
    if (destroyed || suppressed() || root.dataset.blocked === "true")
      return false;
    const now = performance.now();
    if (!immediate && now - memory.lastDialogue < 30000) return false;
    memory.lastDialogue = now;
    hideDialogue();
    bubble.textContent = text;
    bubble.hidden = false;
    if (immediate) announce(text);
    if (paused) bubble.style.opacity = "1";
    else
      bubbleTween = gsap.fromTo(
        bubble,
        { opacity: 0, y: 4 },
        { opacity: 1, y: 0, duration: 0.25 },
      );
    dialogueTimer = setTimeout(() => {
      if (paused) hideDialogue();
      else
        bubbleTween = gsap.to(bubble, {
          opacity: 0,
          y: -3,
          duration: 0.25,
          onComplete: hideDialogue,
        });
    }, 3300);
    return true;
  }
  function resetGesture() {
    timeline?.kill();
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
      ],
      { rotation: 0, y: 0, scaleX: 1, scaleY: 1 },
    );
    gsap.set(parts.eyes, { scaleY: 1 });
    gsap.set(feathers, {
      rotation: (i) => Number(feathers[i].dataset.angle) / 9,
      scaleY: 0.62,
    });
    gsap.set(particles, { opacity: 0, x: 0, y: 0, scale: 1 });
    staticFan = false;
    root.dataset.fanOpen = "false";
    if (paused) get(".moru-trigger").setAttribute("aria-pressed", "false");
  }
  function scheduleIdle() {
    clearTimeout(idleTimer);
    if (paused || collapsed || state.value !== "idle" || destroyed) return;
    idleTimer = setTimeout(
      () => {
        if (performance.now() - memory.lastActivity > 75000)
          send({ type: "SLEEP" });
        else {
          const r = Math.random();
          send({
            type:
              r < 0.48
                ? "BLINK"
                : r < 0.7
                  ? "BREATHE"
                  : r < 0.85
                    ? "PREEN"
                    : r < 0.95
                      ? "STRETCH"
                      : "LOOK",
          });
        }
      },
      9000 + Math.random() * 7000,
    );
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
    gsap.set([parts.aim, parts.gaze], { rotation: 0, x: 0, y: 0 });
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
        .to(parts.eyes, { scaleY: 0.08, duration: 0.085 }, at)
        .to(parts.eyes, { scaleY: 1, duration: 0.13 }, at + 0.085);
    if (state.value === "entering") {
      // Only the SVG rig peeks/hops. The fixed dock never receives transforms.
      timeline
        .fromTo(
          parts.gait,
          { y: 235, scaleX: 0.92, scaleY: 1.05 },
          { y: 80, scaleX: 1, scaleY: 1, duration: 0.4, ease: "power2.out" },
          0,
        )
        .to(parts.head, { rotation: -12, duration: 0.25 }, 0.3)
        .to(
          parts.gait,
          { y: 96, scaleX: 1.12, scaleY: 0.88, duration: 0.18 },
          0.56,
        )
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
        .to(
          parts.gait,
          {
            y: 0,
            scaleX: 1.06,
            scaleY: 0.94,
            duration: 0.22,
            ease: "power2.in",
          },
          1.09,
        )
        .to(
          parts.gait,
          { scaleX: 1, scaleY: 1, duration: 0.3, ease: "back.out(2)" },
          1.31,
        )
        .to(
          parts.wing,
          { rotation: -22, duration: 0.13, repeat: 3, yoyo: true },
          0.8,
        )
        .to(
          parts.crest,
          { rotation: 14, duration: 0.14, repeat: 3, yoyo: true },
          1.05,
        )
        .to(parts.head, { rotation: 5, duration: 0.3 }, 1.2)
        .to(parts.head, { rotation: 0, duration: 0.25 }, 1.55)
        .call(() => say("Namaste! I'm Moru 🦚", true), [], 1.65);
      blink(1.35);
    } else if (state.value === "blinking") {
      blink(0);
    } else if (["curious", "hovering"].includes(state.value)) {
      timeline
        .to(parts.head, { rotation: -9, duration: 0.3 }, 0)
        .to(parts.crest, { rotation: 7, duration: 0.3 }, 0)
        .to([parts.head, parts.crest], { rotation: 0, duration: 0.4 }, 0.85);
      if (state.value === "hovering") blink(0.4);
    } else if (state.value === "breathing") {
      timeline
        .to(
          parts.body,
          {
            scaleX: 1.02,
            scaleY: 1.025,
            y: -1,
            duration: 1,
            ease: "sine.inOut",
          },
          0,
        )
        .to(parts.crest, { rotation: 3, duration: 1 }, 0)
        .to(
          [parts.body, parts.crest],
          {
            scaleX: 1,
            scaleY: 1,
            y: 0,
            rotation: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          1,
        );
    } else if (state.value === "preening") {
      timeline
        .to(
          parts.head,
          { rotation: 36, y: 32, duration: 0.45, ease: "sine.inOut" },
          0,
        )
        .to(parts.wing, { rotation: -13, duration: 0.4 }, 0)
        .to(
          parts.head,
          { rotation: 43, y: 36, duration: 0.2, repeat: 3, yoyo: true },
          0.55,
        )
        .to(
          [parts.head, parts.wing],
          { rotation: 0, y: 0, duration: 0.5 },
          1.45,
        );
      blink(0.45);
    } else if (state.value === "stretching") {
      timeline
        .to(
          parts.wing,
          { rotation: -38, scaleX: 1.17, duration: 0.5, ease: "back.out(1.4)" },
          0,
        )
        .to(parts.body, { rotation: -4, scaleY: 1.04, duration: 0.5 }, 0)
        .to(parts.head, { rotation: -12, duration: 0.5 }, 0)
        .to(parts.crest, { rotation: 10, duration: 0.4 }, 0.3)
        .to(
          [parts.wing, parts.body, parts.head, parts.crest],
          {
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.6,
            ease: "sine.inOut",
          },
          1.15,
        );
    } else if (state.value === "sleepy") {
      timeline
        .to(parts.beak, { scaleY: 1.65, duration: 0.45 }, 0)
        .to(parts.head, { rotation: -10, y: -3, duration: 0.45 }, 0)
        .to(parts.beak, { scaleY: 1, duration: 0.4 }, 0.65)
        .to(parts.head, { rotation: 24, y: 9, duration: 0.7 }, 0.8)
        .to(parts.eyes, { scaleY: 0.06, duration: 0.5 }, 0.9)
        .to(parts.crest, { rotation: 12, duration: 0.5 }, 1);
    } else if (state.value === "waking") {
      timeline
        .fromTo(parts.eyes, { scaleY: 0.06 }, { scaleY: 1, duration: 0.25 }, 0)
        .fromTo(
          parts.head,
          { rotation: 24, y: 9 },
          { rotation: -7, y: -3, duration: 0.4 },
          0,
        )
        .to(
          parts.crest,
          { rotation: -10, duration: 0.2, repeat: 1, yoyo: true },
          0.15,
        )
        .to(parts.head, { rotation: 0, y: 0, duration: 0.4 }, 0.5);
      say("Oh! You're still here!");
    } else if (state.value === "scrolling") {
      timeline
        .to(parts.body, { rotation: scrollDirection * 3, duration: 0.2 }, 0)
        .to(parts.head, { rotation: scrollDirection * -5, duration: 0.2 }, 0)
        .to(parts.tail, { rotation: scrollDirection * 3, duration: 0.25 }, 0)
        .to(
          [parts.body, parts.head, parts.tail],
          { rotation: 0, duration: 0.4, ease: "sine.inOut" },
          0.25,
        );
    } else if (state.value === "fanning") {
      timeline
        .to(
          parts.body,
          { scaleY: 0.94, y: 2, duration: 0.22, ease: "power2.in" },
          0,
        )
        .to(parts.head, { rotation: -9, duration: 0.22 }, 0)
        .to(parts.wing, { rotation: -12, duration: 0.25 }, 0.12)
        .to(
          feathers,
          {
            rotation: (i) => Number(feathers[i].dataset.angle),
            scaleY: 1,
            duration: 0.65,
            stagger: { each: 0.035, from: "center" },
            ease: "back.out(1.35)",
          },
          0.22,
        )
        .to(
          parts.body,
          { scaleY: 1.03, y: -3, duration: 0.35, ease: "back.out(1.5)" },
          0.3,
        )
        .to(parts.crest, { rotation: 9, duration: 0.3 }, 0.45)
        .to(
          particles,
          { opacity: 1, scale: 1.15, duration: 0.12, stagger: 0.025 },
          0.72,
        )
        .to(
          particles,
          {
            x: (i) => Math.cos((i / 6) * Math.PI * 2) * 76,
            y: (i) => Math.sin((i / 6) * Math.PI * 2) * 58 - 24,
            opacity: 0,
            scale: 0.5,
            duration: 0.65,
            stagger: 0.025,
            ease: "power2.out",
          },
          0.86,
        )
        .to(parts.head, { rotation: 5, duration: 0.35 }, 1.05)
        .call(
          () => {
            root.dataset.moruPhase = "display";
          },
          [],
          1.1,
        )
        .to(parts.wing, { rotation: -4, duration: 0.3 }, 1.3)
        .call(
          () => {
            root.dataset.moruPhase = "settling";
          },
          [],
          2.05,
        )
        .to(
          feathers,
          {
            rotation: (i) => Number(feathers[i].dataset.angle) / 9,
            scaleY: 0.62,
            duration: 0.55,
            stagger: { each: 0.022, from: "edges" },
            ease: "power2.inOut",
          },
          2.05,
        )
        .to(
          [parts.body, parts.head, parts.wing, parts.crest],
          { scaleY: 1, rotation: 0, y: 0, duration: 0.4 },
          2.4,
        );
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
    if (state.value === "sleepy") send({ type: "WAKE" });
  }
  function updateGaze() {
    if (
      paused ||
      collapsed ||
      !["idle", "curious", "hovering"].includes(state.value)
    )
      return;
    const rect = get(".moru-trigger").getBoundingClientRect();
    const dx = cursor ? cursor.x - (rect.left + rect.width / 2) : 0;
    const dy = cursor ? cursor.y - (rect.top + rect.height * 0.25) : 0;
    const nearby = cursor && Math.hypot(dx, dy) < 220;
    aim(nearby ? clamp(dx / 35, -6, 6) : 0);
    gazeX(nearby ? clamp(dx / 75, -2.1, 2.1) : 0);
    gazeY(nearby ? clamp(dy / 85, -1.7, 1.7) : 0);
  }
  function contextual() {
    if (suppressed() || root.dataset.blocked === "true") return;
    const sections = [
      document.getElementById("home"),
      document.getElementById("work"),
      document.getElementById("skills-heading")?.closest("section"),
      document.getElementById("contact"),
    ].filter(Boolean);
    const section = sections.find((node) => {
      const r = node.getBoundingClientRect();
      return r.top < innerHeight * 0.55 && r.bottom > innerHeight * 0.55;
    });
    if (!section) return;
    const key = section.id || "skills";
    if (memory.lastContext === key) return;
    const texts = {
      home: "Another tour? I'm ready!",
      work: "These creations are worth a peek!",
      skills: "Brains, code, and a little magic!",
      contact: "Got an idea? Say hello!",
    };
    if (say(texts[key] || texts.skills)) memory.lastContext = key;
  }
  function flush() {
    frame = undefined;
    if (destroyed) return;
    root.dataset.suppressed = String(Boolean(suppressed()));
    if (suppressed()) {
      send({ type: "SUSPEND" });
      hideDialogue();
      return;
    }
    const wasCollapsed = collapsed;
    if (dockDirty) {
      collapsed = inspectDock(root);
      dockDirty = false;
    }
    if (collapsed) {
      send({ type: "SUSPEND" });
      if (root.dataset.blocked === "true") hideDialogue();
      memory.entered = true;
      return;
    }
    if (!memory.entered) {
      memory.entered = true;
      if (paused) send({ type: "PAUSE" });
      else {
        if (state.value === "suspended") send({ type: "RESUME" });
        send({ type: "ENTER" });
      }
    } else if (state.value === "suspended" || wasCollapsed)
      send({ type: paused ? "PAUSE" : "RESUME" });
    updateGaze();
  }
  function request() {
    if (!frame && !destroyed) frame = requestAnimationFrame(flush);
  }
  function resize() {
    dockDirty = true;
    request();
  }
  function scroll() {
    activity();
    dockDirty = true;
    scrollDirection = window.scrollY >= lastScroll ? 1 : -1;
    const now = performance.now();
    if (
      memory.entered &&
      !paused &&
      !collapsed &&
      now - lastScrollGesture > 1000
    ) {
      if (send({ type: "SCROLL" })) lastScrollGesture = now;
    }
    lastScroll = window.scrollY;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(contextual, 1200);
    request();
  }
  function pointer(event) {
    activity();
    if (event.pointerType !== "mouse" || paused) return;
    cursor = { x: event.clientX, y: event.clientY };
    request();
  }
  function project(event) {
    const card =
      event.target instanceof Element
        ? event.target.closest(".project-card")
        : null;
    if (memory.entered && card && card !== lastCard) {
      send({ type: "PROJECT" });
      if (event.type === "focusin")
        say(
          card.textContent.includes("Games")
            ? "Games are my favorite too!"
            : "These creations are worth a peek!",
        );
      else {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          if (lastCard === card)
            say(
              card.textContent.includes("Games")
                ? "Games are my favorite too!"
                : "These creations are worth a peek!",
            );
        }, 1400);
      }
    }
    lastCard = card;
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
    if (suppressed()) {
      root.dataset.suppressed = "true";
      send({ type: "SUSPEND" });
      hideDialogue();
    } else request();
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
  if (window.visualViewport)
    listeners.push([window.visualViewport, "resize", resize]);
  listeners.forEach(([target, type, fn]) =>
    target.addEventListener(type, fn, { passive: true }),
  );
  resetGesture();
  root.dataset.moruState = "idle";
  root.dataset.moruPhase = "rest";
  if (paused) {
    memory.entered = true;
    get(".moru-trigger").setAttribute("aria-pressed", "false");
    send({ type: "PAUSE" });
  } else get(".moru-trigger").removeAttribute("aria-pressed");
  request();
  if (!paused) scheduleIdle();
  return {
    fan() {
      activity();
      if (destroyed || suppressed() || collapsed || state.value === "fanning")
        return false;
      if (paused) {
        staticFan = !staticFan;
        gsap.set(feathers, {
          rotation: (i) =>
            Number(feathers[i].dataset.angle) / (staticFan ? 1 : 9),
          scaleY: staticFan ? 1 : 0.62,
        });
        root.dataset.fanOpen = String(staticFan);
        get(".moru-trigger").setAttribute("aria-pressed", String(staticFan));
      } else send({ type: "FAN" });
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
      resetGesture();
      bubbleTween?.kill();
      aim.tween.kill();
      gazeX.tween.kill();
      gazeY.tween.kill();
      clearTimeout(idleTimer);
      clearTimeout(dialogueTimer);
      clearTimeout(settleTimer);
      cancelAnimationFrame(frame);
      listeners.forEach(([target, type, fn]) =>
        target.removeEventListener(type, fn),
      );
      hideDialogue();
      gsap.killTweensOf([
        ...Object.values(parts),
        ...feathers,
        ...particles,
        bubble,
      ]);
      context.revert();
    },
  };
}
