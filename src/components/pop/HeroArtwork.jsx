import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Flower, Kite } from "./Illustrations";

const PlayScene = lazy(() => import("./PlayScene"));

class ArtworkBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function HeroArtwork({ paused }) {
  const container = useRef(null);
  const [supported, setSupported] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    let gl;
    try {
      gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupported(Boolean(gl));
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setSupported(false);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    observer.observe(container.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return (
    <div
      ref={container}
      className="hero-artwork"
      role="img"
      aria-label="Original 3D artwork: a pink handheld game console with a pixel flower, a colorful kite, and playful sculptural shapes"
    >
      <div
        className={`artwork-fallback ${ready ? "is-hidden" : ""}`}
        aria-hidden="true"
      >
        <Kite className="fallback-kite" />
        <div className="fallback-console">
          <div className="fallback-screen">
            <Flower />
          </div>
          <div className="fallback-controls">
            <span>✚</span>
            <i />
            <i />
          </div>
          <span className="fallback-console-label">a little play</span>
        </div>
        <Flower className="fallback-flower" />
      </div>
      {supported && (
        <ArtworkBoundary
          onFailure={() => {
            setReady(false);
            setSupported(false);
          }}
        >
          <Suspense fallback={null}>
            <PlayScene
              running={!paused && visible && pageVisible}
              onReady={() => setReady(true)}
              onFailure={() => {
                setReady(false);
                setSupported(false);
              }}
            />
          </Suspense>
        </ArtworkBoundary>
      )}
    </div>
  );
}
