export function Flower({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <g fill="currentColor">
        {Array.from({ length: 8 }, (_, i) => (
          <ellipse
            key={i}
            cx="50"
            cy="24"
            rx="13"
            ry="24"
            transform={`rotate(${i * 45} 50 50)`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="14" fill="var(--paper, #fff9ed)" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  );
}

export function Kite({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 190"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M60 5L110 65L60 125L10 65Z"
        fill="#e869a1"
        stroke="#173b32"
        strokeWidth="2"
      />
      <path d="M60 5L60 125L10 65Z" fill="#f8bd43" />
      <path d="M60 5V125M10 65Q60 32 110 65" stroke="#173b32" strokeWidth="2" />
      <path d="M60 125C90 148 28 150 60 185" stroke="#173b32" strokeWidth="2" />
      <path d="M54 147L39 137L43 158Z" fill="#3a65ce" />
      <path d="M52 165L71 156L70 176Z" fill="#e869a1" />
    </svg>
  );
}

export function ProjectArt({ type, image }) {
  if (type === "cyber")
    return (
      <div className="cyber-poster">
        <span className="poster-caption">A game by Kartikesh</span>
        <strong>
          CYBER
          <br />
          <span>RUN</span>
        </strong>
        <div className="game-screen">
          <div className="screen-top">
            <i />
            <i />
            <i />
            <span>Ready, set, run.</span>
          </div>
          <img
            src={image}
            alt="Cyber Run gameplay showing an obstacle course of raised platforms"
            width="347"
            height="195"
            loading="lazy"
          />
        </div>
        <span className="poster-star">✳</span>
        <span className="poster-bottom">Jump in. Find your flow.</span>
      </div>
    );
  if (type === "islands")
    return (
      <div className="island-poster">
        <span className="poster-caption">World-building experiments</span>
        <strong>
          Somewhere
          <br />
          <em>above the ordinary.</em>
        </strong>
        <svg
          viewBox="0 0 520 260"
          role="img"
          aria-label="Illustration of procedural floating islands"
        >
          <g fill="none" stroke="#e7f0ff" strokeWidth="1" opacity=".35">
            <ellipse cx="260" cy="190" rx="200" ry="40" />
            <ellipse cx="260" cy="190" rx="150" ry="28" />
          </g>
          <g transform="translate(230 65)">
            <path d="M-104 56L-38 11L83 24L122 57L49 100Z" fill="#cddd83" />
            <path d="M-104 56L-70 125L7 177L49 100Z" fill="#d38a69" />
            <path d="M49 100L7 177L96 130L122 57Z" fill="#a6536f" />
            <path
              d="M-53 44V-7L-12-28L24-10V63"
              stroke="#eee2bc"
              strokeWidth="15"
            />
            <path
              d="M-12-28V29M-54-7L24-10"
              stroke="#c4b684"
              strokeWidth="12"
            />
            <path
              d="M55 37V5L81-8L101 8V51"
              stroke="#f5e8c6"
              strokeWidth="10"
            />
            <ellipse cx="-42" cy="65" rx="29" ry="9" fill="#80a96f" />
          </g>
          <g transform="translate(61 137) scale(.44)">
            <path d="M-40 0L40-27L92 0L40 35Z" fill="#cddd83" />
            <path d="M-40 0L30 88L92 0L40 35Z" fill="#d38a69" />
          </g>
          <g transform="translate(415 71) scale(.55)">
            <path d="M-40 0L40-27L92 0L40 35Z" fill="#cddd83" />
            <path d="M-40 0L30 88L92 0L40 35Z" fill="#d38a69" />
          </g>
          <circle cx="431" cy="199" r="17" fill="#f8bd43" />
          <path d="M75 61H110M92 44V78" stroke="#f1cecd" strokeWidth="3" />
        </svg>
        <span className="poster-bottom">Sky-Ruins · Generative worlds</span>
      </div>
    );
  if (type === "gizmo")
    return (
      <div className="gizmo-poster">
        <span className="poster-caption">Built for the builders</span>
        <strong>
          Make room
          <br />
          for <em>possibility.</em>
        </strong>
        <svg
          viewBox="0 0 520 260"
          role="img"
          aria-label="Illustration of a colorful 3D transform gizmo"
        >
          <g stroke="#a27928" strokeWidth="1" opacity=".2">
            {Array.from({ length: 9 }, (_, i) => (
              <path
                key={i}
                d={`M${i * 65 - 140} 260L${i * 65 + 50} 80M${i * 65 + 100} 260L${i * 65 - 90} 80`}
              />
            ))}
          </g>
          <path
            d="M180 128L260 83L340 128L260 173Z"
            fill="#f28ab3"
            stroke="#193d34"
            strokeWidth="2"
          />
          <path
            d="M180 128V211L260 256V173Z"
            fill="#db4d89"
            stroke="#193d34"
            strokeWidth="2"
          />
          <path
            d="M260 173V256L340 211V128Z"
            fill="#b32b6e"
            stroke="#193d34"
            strokeWidth="2"
          />
          <path d="M260 161V29" stroke="#285a48" strokeWidth="10" />
          <path d="M242 45L260 14L278 45" fill="#285a48" />
          <path d="M260 161L395 216" stroke="#e96334" strokeWidth="10" />
          <path d="M378 195L418 225L374 225" fill="#e96334" />
          <path d="M260 161L126 216" stroke="#3562bc" strokeWidth="10" />
          <path d="M145 195L103 225L148 225" fill="#3562bc" />
          <circle cx="260" cy="161" r="16" fill="#fff9ed" />
        </svg>
        <span className="poster-bottom">
          Move it. Rotate it. Make it yours.
        </span>
      </div>
    );
  return (
    <div className="web-poster">
      <span className="poster-caption">A meeting of minds &amp; machines</span>
      <strong>
        Good data.
        <br />
        <em>Better possibilities.</em>
      </strong>
      <div className="browser-illustration">
        <div className="browser-toolbar">
          <i />
          <i />
          <i />
          <span>A little intelligence, by design</span>
        </div>
        <div className="browser-content">
          <div className="data-bars">
            {[35, 60, 45, 80, 65, 96].map((value, i) => (
              <span key={i} style={{ height: `${value}%` }} />
            ))}
          </div>
          <Flower />
          <div className="code-lines">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <span className="poster-bottom">
        Python on the inside. Possibility on the outside.
      </span>
    </div>
  );
}
