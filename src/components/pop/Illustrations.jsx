import arcchain from "../../assets/arcchain.svg";
import shield from "../../assets/reactive-shield.svg";
import visionforge from "../../assets/visionforge.svg";
import sculpture from "../../assets/hero-sculpture.svg";
export function Flower({
  className = ""
}) {
  return <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    <g fill="currentColor">
      {Array.from({
        length: 8
      }, (_, i) => <ellipse key={i} cx="50" cy="25" rx="13" ry="24" transform={`rotate(${i * 45} 50 50)`} />)}
    </g>
    <circle cx="50" cy="50" r="15" fill="var(--paper, #fff8eb)" />
  </svg>;
}
export function SculptureFallback() {
  return <img src={sculpture} width="680" height="680" alt="" />;
}
const illustrations = {
  arcchain: {
    src: arcchain,
    alt: "Original illustration of lightning branching between four sculptural conductor nodes"
  },
  shield: {
    src: shield,
    alt: "Original illustration of an energy shield with an impact ripple, surface fractures, and drifting fragments"
  },
  visionforge: {
    src: visionforge,
    alt: "Original illustration of scratched steel surfaces, a Grad-CAM heatmap, and a classification network"
  }
};
export function ProjectArt({
  type,
  image
}) {
  if (type === "cyber") return <div className="cyber-poster">
    <span className="cyber-title" aria-hidden="true">CYBER<br />RUN</span>
    <div className="game-screen">
      <div className="screen-top">
        <span />
        <span />
        <span />
        <p>Cyber Run / In-game capture</p>
      </div>
      <img src={image} alt="Cyber Run gameplay showing an obstacle course of raised platforms" width="347" height="195" loading="lazy" />
    </div>
    <span className="cyber-caption">Find your flow.</span>
    <svg className="cyber-path" viewBox="0 0 700 580" fill="none" aria-hidden="true">
      <path d="M-40 480L70 420L170 465L610 200L740 260" stroke="currentColor" strokeWidth="2" />
      <path d="M-40 510L70 450L170 495L610 230L740 290" stroke="currentColor" strokeWidth="2" />
    </svg>
  </div>;
  const art = illustrations[type];
  return art ? <img className="project-illustration" src={art.src} alt={art.alt} width="720" height="580" loading="lazy" /> : null;
}
