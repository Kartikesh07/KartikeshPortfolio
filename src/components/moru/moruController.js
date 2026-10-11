import { gsap } from "gsap";
import { initialMoruState, transitionMoru } from "./moruMachine";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const intersects = (a, b) =>
  a.left < b.right + 6 &&
  a.right > b.left - 6 &&
  a.top < b.bottom + 6 &&
  a.bottom > b.top - 6;

// Compact hide/show controls use the same placement safety as the companion.
export function createMoruDock(node) {
  let frame;
  const place = () => {
    frame = undefined;
    const width = node.offsetWidth;
    const height = window.visualViewport?.height || window.innerHeight;
    const bottom = parseFloat(getComputedStyle(node).bottom) || 14;
    const obstacles = [
      ...document.querySelectorAll(
        "a, button, input, textarea, select, summary",
      ),
    ]
      .filter((item) => item !== node)
      .map((item) => item.getBoundingClientRect())
      .filter(
        (rect) =>
          rect.width && rect.height && rect.bottom > 0 && rect.top < height,
      );
    const xs = [
      18,
      Math.max(18, document.documentElement.clientWidth - width - 18),
    ];
    for (let offset = 0; offset < height - 60; offset += 52)
      for (const x of xs) {
        const box = {
          left: x,
          right: x + width,
          bottom: height - bottom - offset,
          top: height - bottom - offset - 44,
        };
        if (!obstacles.some((rect) => intersects(box, rect))) {
          gsap.set(node, { x, y: -offset });
          return;
        }
      }
    gsap.set(node, { x: 18, y: 0 });
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
      gsap.killTweensOf(node);
    },
  };
}

export function createMoruController(root, { paused }) {
  const get = (selector) => root.querySelector(selector);
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
    gsap.set(parts.gait, { svgOrigin: "120 220" });
    gsap.set(parts.body, { svgOrigin: "120 220" });
    gsap.set([parts.head, parts.aim], { svgOrigin: "141 111" });
    gsap.set(parts.eyes, { svgOrigin: "147 102" });
    gsap.set(parts.wing, { svgOrigin: "111 179" });
    gsap.set(parts.crest, { svgOrigin: "141 89" });
    gsap.set(parts.frontLeg, { svgOrigin: "109 219" });
    gsap.set(parts.backLeg, { svgOrigin: "132 219" });
  }, root);
  const position = { x: 32, y: 0 };
  const setX = gsap.quickSetter(root, "x", "px");
  const setY = gsap.quickSetter(root, "y", "px");
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
  let state = initialMoruState;
  let timeline, movement, idleTimer, settleTimer, frame;
  let destroyed = false,
    placementDirty = true,
    scrollDirty = false,
    cursorDirty = false;
  let lastScroll = window.scrollY,
    lastCard = null,
    idleCount = 0,
    staticFan = false;
  let cursor = null;
  let viewport = {
    width: document.documentElement.clientWidth,
    height: window.innerHeight,
  };
  let baseBottom = 16;

  function resetGesture() {
    timeline?.kill();
    staticFan = false;
    root.dataset.fanOpen = "false";
    gsap.set(
      [
        parts.gait,
        parts.body,
        parts.head,
        parts.wing,
        parts.crest,
        parts.frontLeg,
        parts.backLeg,
      ],
      { rotation: 0, y: 0, scale: 1 },
    );
    gsap.set(parts.eyes, { scaleY: 1 });
    gsap.set(feathers, {
      rotation: (i) => Number(feathers[i].dataset.angle) / 9,
      scaleY: 0.62,
    });
    gsap.set(particles, { opacity: 0, x: 0, y: 0, scale: 1 });
  }
  function scheduleIdle() {
    clearTimeout(idleTimer);
    if (paused || state.value !== "idle" || destroyed) return;
    idleTimer = setTimeout(
      () => {
        idleCount += 1;
        send({ type: idleCount % 3 === 0 ? "LOOK" : "BLINK" });
      },
      4200 + Math.random() * 2800,
    );
  }
  function animateState() {
    clearTimeout(idleTimer);
    resetGesture();
    root.dataset.moruState = state.value;
    root.dataset.moruPhase =
      state.value === "fanning" ? "anticipation" : "rest";
    if (["paused", "suspended", "hidden"].includes(state.value)) {
      movement?.kill();
      root.dataset.moving = "false";
      aim.tween.pause();
      gazeX.tween.pause();
      gazeY.tween.pause();
      gsap.set([parts.aim, parts.gaze], { rotation: 0, x: 0, y: 0 });
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
    if (state.value === "walking") {
      timeline
        .repeat(-1)
        .to(
          parts.gait,
          { y: -3, rotation: -1, duration: 0.2, ease: "sine.inOut" },
          0,
        )
        .to(parts.frontLeg, { rotation: 17, duration: 0.2 }, 0)
        .to(parts.backLeg, { rotation: -14, duration: 0.2 }, 0)
        .to(
          parts.gait,
          { y: 0, rotation: 1, duration: 0.2, ease: "sine.inOut" },
          0.2,
        )
        .to(parts.frontLeg, { rotation: -14, duration: 0.2 }, 0.2)
        .to(parts.backLeg, { rotation: 17, duration: 0.2 }, 0.2);
    } else if (state.value === "blinking") {
      timeline
        .to(parts.eyes, { scaleY: 0.08, duration: 0.085 })
        .to(parts.eyes, { scaleY: 1, duration: 0.13 });
    } else if (state.value === "curious") {
      timeline
        .to(parts.head, { rotation: -8, duration: 0.3, ease: "sine.inOut" }, 0)
        .to(parts.crest, { rotation: 8, duration: 0.3 }, 0)
        .to(parts.wing, { rotation: -5, duration: 0.3 }, 0)
        .to(parts.head, { rotation: 3, duration: 0.35 }, 0.65)
        .to(
          [parts.head, parts.crest, parts.wing],
          { rotation: 0, duration: 0.35 },
          1,
        );
    } else if (state.value === "fanning") {
      aim(0);
      gazeX(0);
      gazeY(0);
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
    if (destroyed) return;
    const next = transitionMoru(state, event);
    if (next === state) return;
    state = next;
    animateState();
    if (state.value === "idle" && movement?.isActive())
      send({ type: "SCROLL" });
  }

  function safePosition() {
    viewport = {
      width: document.documentElement.clientWidth,
      height: window.visualViewport?.height || window.innerHeight,
    };
    baseBottom = parseFloat(getComputedStyle(root).bottom) || 16;
    const width = root.offsetWidth;
    const height = root.offsetHeight;
    const margin = viewport.width <= 600 ? 66 : 74;
    const maxX = Math.max(margin, viewport.width - width - margin);
    const range = Math.max(0, Math.min(520, maxX - margin));
    const progress = clamp(
      window.scrollY /
        Math.max(1, document.documentElement.scrollHeight - window.innerHeight),
      0,
      1,
    );
    const preferred = clamp(
      paused ? position.x : margin + progress * range,
      margin,
      maxX,
    );
    const xs = [preferred, margin, maxX];
    for (let x = margin; x < maxX; x += 80) xs.push(x);
    xs.sort((a, b) => Math.abs(a - preferred) - Math.abs(b - preferred));
    // Only Moru's body button and badge receive input. The spreading tail and
    // particles never do. Yield occupied space rather than stealing page clicks.
    const obstacles = [
      ...document.querySelectorAll(
        "a, button, input, textarea, select, summary",
      ),
    ]
      .filter((node) => !root.contains(node))
      .map((node) => node.getBoundingClientRect())
      .filter(
        (rect) =>
          rect.width &&
          rect.height &&
          rect.bottom > 0 &&
          rect.top < viewport.height,
      );
    const find = (footprint, offsets) => {
      for (const offset of offsets)
        for (const x of xs) {
          const box = {
            left: x,
            right: x + width,
            bottom: viewport.height - baseBottom - offset,
            top: viewport.height - baseBottom - offset - footprint,
          };
          if (box.top >= 8 && !obstacles.some((rect) => intersects(box, rect)))
            return { x, y: -offset };
        }
    };
    const actor = find(height, [0, 56, 112]);
    root.dataset.occluded = actor ? "false" : "true";
    get(".moru-trigger").disabled = !actor;
    const offsets = [];
    for (let y = 0; y < viewport.height - 60; y += 56) offsets.push(y);
    return actor || find(44, offsets) || { x: 20, y: 0 };
  }
  function writePosition() {
    setX(position.x);
    setY(position.y);
  }
  function updateGaze() {
    if (paused || ["fanning", "suspended", "hidden"].includes(state.value))
      return;
    const dx = cursor ? cursor.x - (position.x + root.offsetWidth * 0.61) : 0;
    const dy = cursor
      ? cursor.y -
        (viewport.height - baseBottom + position.y - root.offsetHeight * 0.66)
      : 0;
    const nearby = cursor && Math.hypot(dx, dy) < 280;
    aim(nearby ? clamp(dx / 30, -7, 7) : 0);
    gazeX(nearby ? clamp(dx / 75, -2.1, 2.1) : 0);
    gazeY(nearby ? clamp(dy / 85, -1.7, 1.7) : 0);
  }
  function isSuppressed() {
    return (
      document.hidden ||
      document.activeElement?.matches(
        "input, textarea, select, [contenteditable='true']",
      )
    );
  }
  function flush() {
    frame = undefined;
    if (destroyed) return;
    const suppressed = isSuppressed();
    root.dataset.suppressed = suppressed ? "true" : "false";
    if (suppressed) {
      send({ type: "SUSPEND" });
      return;
    }
    if (state.value === "suspended")
      send({ type: paused ? "PAUSE" : "RESUME" });
    if (placementDirty) {
      placementDirty = false;
      const target = safePosition();
      movement?.kill();
      root.dataset.moving = "false";
      const changed =
        Math.abs(position.x - target.x) + Math.abs(position.y - target.y) > 1;
      if (!paused && changed) {
        if (scrollDirty) send({ type: "SCROLL" });
        root.dataset.moving = "true";
        movement = gsap.to(position, {
          ...target,
          duration: 0.72,
          delay: 0.055,
          ease: "power2.out",
          onUpdate: writePosition,
          onComplete: () => {
            root.dataset.moving = "false";
            send({ type: "SETTLED" });
          },
        });
      } else {
        Object.assign(position, target);
        writePosition();
        if (state.value === "walking") send({ type: "SETTLED" });
      }
    }
    if (cursorDirty || scrollDirty) updateGaze();
    cursorDirty = false;
    scrollDirty = false;
  }
  function request() {
    if (!frame && !destroyed) frame = requestAnimationFrame(flush);
  }
  function scroll() {
    const delta = window.scrollY - lastScroll;
    lastScroll = window.scrollY;
    if (Math.abs(delta) < 0.5) return;
    placementDirty = true;
    scrollDirty = true;
    clearTimeout(settleTimer);
    settleTimer = setTimeout(() => {
      if (!movement?.isActive()) send({ type: "SETTLED" });
    }, 240);
    request();
  }
  function resize() {
    placementDirty = true;
    request();
  }
  function pointer(event) {
    if (event.pointerType !== "mouse" || paused) return;
    cursor = { x: event.clientX, y: event.clientY };
    cursorDirty = true;
    request();
  }
  function project(event) {
    const card =
      event.target instanceof Element
        ? event.target.closest(".project-card")
        : null;
    if (card && card !== lastCard) send({ type: "PROJECT" });
    lastCard = card;
  }
  function focus(event) {
    project(event);
    placementDirty = true;
    request();
  }
  function leave(event) {
    if (!event.relatedTarget) {
      cursor = null;
      cursorDirty = true;
      request();
    }
  }
  function visibility() {
    placementDirty = true;
    if (isSuppressed()) {
      root.dataset.suppressed = "true";
      send({ type: "SUSPEND" });
    } else request();
  }

  // Position once without an entrance flight; no permanent requestAnimationFrame
  // loop is installed. The only repeated timeline is gait while actually moving.
  Object.assign(position, safePosition());
  writePosition();
  root.dataset.moving = "false";
  root.dataset.fanOpen = "false";
  root.dataset.suppressed = String(Boolean(isSuppressed()));
  if (isSuppressed()) {
    root.dataset.suppressed = "true";
    send({ type: "SUSPEND" });
  } else if (paused) send({ type: "PAUSE" });
  else {
    root.dataset.moruState = "idle";
    scheduleIdle();
  }
  window.addEventListener("scroll", scroll, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  window.visualViewport?.addEventListener("resize", resize, { passive: true });
  document.addEventListener("pointermove", pointer, { passive: true });
  document.addEventListener("pointerover", project, { passive: true });
  document.addEventListener("pointerout", leave, { passive: true });
  document.addEventListener("focusin", focus);
  document.addEventListener("focusout", visibility);
  document.addEventListener("visibilitychange", visibility);

  return {
    fan() {
      if (destroyed || isSuppressed() || state.value === "fanning")
        return false;
      if (paused) {
        staticFan = !staticFan;
        gsap.set(feathers, {
          rotation: (i) =>
            Number(feathers[i].dataset.angle) / (staticFan ? 1 : 9),
          scaleY: staticFan ? 1 : 0.62,
        });
        root.dataset.fanOpen = String(staticFan);
      } else send({ type: "FAN" });
      return true;
    },
    destroy() {
      destroyed = true;
      timeline?.kill();
      movement?.kill();
      aim.tween.kill();
      gazeX.tween.kill();
      gazeY.tween.kill();
      clearTimeout(idleTimer);
      clearTimeout(settleTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerover", project);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("focusin", focus);
      document.removeEventListener("focusout", visibility);
      document.removeEventListener("visibilitychange", visibility);
      gsap.killTweensOf([
        root,
        ...Object.values(parts),
        ...feathers,
        ...particles,
      ]);
      context.revert();
    },
  };
}
