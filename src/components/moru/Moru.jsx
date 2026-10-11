import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Feather, X } from "lucide-react";
import MoruArtwork from "./MoruArtwork";
import { createMoruController, createMoruDock } from "./moruController";
import "./moru.css";

export default function Moru({ paused, suspended = false }) {
  const reducedMotion = useReducedMotion();
  const motionStopped = paused || reducedMotion;
  const root = useRef(null);
  const controller = useRef(null);
  const toggleButton = useRef(null);
  const restoreFocus = useRef(false);
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem("portfolio:moru-hidden") !== "true";
    } catch {
      return true;
    }
  });
  const [message, setMessage] = useState("");
  // Survives effect restarts (pause, dialogs, StrictMode), but resets on reload.
  const memory = useRef({
    entered: !visible,
    lastDialogue: -Infinity,
    lastActivity: performance.now(),
    lastContext: "home",
  });
  useEffect(() => {
    if (suspended) {
      memory.current.entered = true;
      return;
    }
    if (!root.current) return;
    controller.current = visible
      ? createMoruController(root.current, {
          paused: motionStopped,
          memory: memory.current,
          announce: setMessage,
        })
      : createMoruDock(root.current);
    return () => {
      controller.current?.destroy();
      controller.current = null;
    };
  }, [visible, motionStopped, suspended]);
  useEffect(() => {
    if (restoreFocus.current && !suspended) {
      toggleButton.current?.focus({ preventScroll: true });
      restoreFocus.current = false;
    }
  }, [visible, suspended]);
  function toggle() {
    memory.current.entered = true;
    const next = !visible;
    restoreFocus.current = true;
    setVisible(next);
    setMessage(next ? "Moru is back." : "Moru is hidden.");
    try {
      sessionStorage.setItem("portfolio:moru-hidden", String(!next));
    } catch {
      /* The preference still works when browser storage is unavailable. */
    }
  }
  function fan() {
    controller.current?.fan?.();
  }
  return (
    <>
      {!suspended &&
        (visible ? (
          <div ref={root} className="moru-companion" data-moru-state="idle">
            <div id="moru-artwork" className="moru-stage">
              <MoruArtwork />
              <button
                className="moru-trigger"
                onClick={fan}
                aria-label="Moru, fan your feathers"
                aria-describedby="moru-hint"
                title="Say hello to Moru — tap to fan his feathers"
              />
            </div>
            <div className="moru-dialogue" aria-hidden="true" hidden />
            <button
              ref={toggleButton}
              className="moru-toggle"
              onClick={toggle}
              aria-label="Hide Moru"
              aria-controls="moru-artwork"
            >
              <span>Moru</span>
              <Feather
                className="moru-compact-icon"
                size={18}
                aria-hidden="true"
              />
              <X size={12} aria-hidden="true" />
            </button>
            <span id="moru-hint" className="sr-only">
              Your peacock companion. Click, tap, or press Enter to see his
              feathers. Use Hide Moru to dismiss him.
            </span>
          </div>
        ) : (
          <button
            ref={(node) => {
              root.current = node;
              toggleButton.current = node;
            }}
            className="moru-show"
            onClick={toggle}
            aria-label="Show Moru"
          >
            <Feather size={15} aria-hidden="true" />
            <span className="moru-show-label">Show Moru</span>
          </button>
        ))}
      <span className="sr-only" role="status">
        {message}
      </span>
    </>
  );
}
