import { Component, lazy, Suspense, useCallback, useEffect, useRef, useState } from "react";
import { SculptureFallback } from "./Illustrations";
const PlayScene = lazy(() => import("./PlayScene"));
class ArtworkBoundary extends Component {
  state = {
    failed: false
  };
  static getDerivedStateFromError() {
    return {
      failed: true
    };
  }
  componentDidCatch() {
    this.props.onFailure();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function HeroArtwork({
  paused
}) {
  const container = useRef(null);
  const [supported, setSupported] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const onReady = useCallback(() => setReady(true), []);
  const onFailure = useCallback(() => {
    setReady(false);
    setSupported(false);
  }, []);
  useEffect(() => {
    const canvas = document.createElement("canvas");
    try {
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupported(Boolean(gl));
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch {
      setSupported(false);
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "60px"
    });
    observer.observe(container.current);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return <div ref={container} className="hero-artwork" aria-hidden="true">
    <div className={`artwork-fallback ${ready ? "is-hidden" : ""}`}>
      <SculptureFallback />
    </div>
    {supported && <ArtworkBoundary onFailure={onFailure}>
      <Suspense fallback={null}>
        <PlayScene running={!paused && visible && pageVisible} onReady={onReady} onFailure={onFailure} />
      </Suspense>
    </ArtworkBoundary>}
  </div>;
}
