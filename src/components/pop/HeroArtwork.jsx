import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import { Flower, Kite } from "./Illustrations";
import { Play, RotateCw } from "lucide-react";

const PlayScene = lazy(() => import("./PlayScene"));
const themes = [
  { name: "Gulabi pink", shell: "#ed70a4", edge: "#c73f77" },
  { name: "Marigold yellow", shell: "#ffc843", edge: "#d89824" },
  { name: "Cobalt blue", shell: "#547ae4", edge: "#304baa" },
];
const screens = ["Flower power", "Flying high", "Made with heart"];

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
  const [themeIndex, setThemeIndex] = useState(0);
  const [screen, setScreen] = useState(0);
  const [spin, setSpin] = useState(0);
  const [playCount, setPlayCount] = useState(0);
  const theme = themes[themeIndex];
  function play() {
    setScreen((current) => (current + 1) % screens.length);
    setPlayCount((current) => current + 1);
  }
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
      className="hero-playground"
      style={{ "--console-shell": theme.shell, "--console-edge": theme.edge }}
    >
      <div
        className="hero-artwork"
        role="img"
        aria-label={`Original 3D artwork: a ${theme.name.toLowerCase()} handheld console displaying ${screens[screen].toLowerCase()}, surrounded by a kite and sculptural flowers`}
      >
        <div
          className={`artwork-fallback ${ready ? "is-hidden" : ""}`}
          aria-hidden="true"
        >
          <Kite className="fallback-kite" />
          <div
            className="fallback-console"
            style={{
              transform: `translateX(-50%) rotate(${spin * 360 - 12}deg)`,
            }}
          >
            <div className="fallback-screen">
              {screen === 0 ? (
                <Flower />
              ) : screen === 1 ? (
                <Kite />
              ) : (
                <span className="fallback-heart">♥</span>
              )}
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
                theme={theme}
                screen={screen}
                spin={spin}
                onPlay={play}
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
      {playCount > 0 && !paused && (
        <div key={playCount} className="play-burst" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              style={{
                "--angle": `${i * 36}deg`,
                "--petal-color": ["#ef80ac", "#f6c451", "#365dcc"][i % 3],
              }}
            >
              ✳
            </span>
          ))}
        </div>
      )}
      <div className="art-controls">
        <span className="art-controls-label">Make it yours</span>
        <div className="art-control-row">
          <div
            className="console-colours"
            role="group"
            aria-label="Console colour"
          >
            {themes.map((item, index) => (
              <button
                key={item.name}
                className="colour-swatch"
                aria-label={item.name}
                aria-pressed={index === themeIndex}
                onClick={() => setThemeIndex(index)}
                title={item.name}
                style={{ "--swatch": item.shell }}
              />
            ))}
          </div>
          <button className="art-play-button" onClick={play}>
            <Play size={13} fill="currentColor" />
            Press play
          </button>
          <button
            className="art-spin-button"
            onClick={() => setSpin((current) => current + 1)}
            disabled={paused}
            title={
              paused
                ? "Enable motion to spin the console"
                : "Spin the 3D artwork"
            }
          >
            <RotateCw size={13} />
            Spin
          </button>
        </div>
        <span className="sr-only" role="status">
          {screens[screen]} · {theme.name}
        </span>
      </div>
    </div>
  );
}
