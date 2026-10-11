const feathers = [-72, -54, -36, -18, 0, 18, 36, 54, 72];

// Original vector artwork. Nested groups separate gaze from gestures and gait,
// so each animation channel owns its own transforms.
export default function MoruArtwork() {
  return (
    <svg
      className="moru-svg"
      viewBox="0 0 240 260"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse
        className="moru-shadow"
        cx="120"
        cy="247"
        rx="32"
        ry="4"
        fill="#174c3d"
        opacity=".13"
      />
      <g className="moru-gait">
        <g className="moru-tail" data-part="tail">
          {feathers.map((angle, index) => (
            <g
              key={angle}
              className="moru-feather"
              data-angle={angle}
              transform={`rotate(${angle / 9} 120 208) translate(0 79) scale(1 .62)`}
            >
              <path
                d="M120 208C108 165 82 111 99 57C106 34 119 21 120 19C121 21 135 34 142 57C159 111 132 165 120 208Z"
                fill={index % 2 ? "#168e75" : "#12735d"}
                stroke="#105842"
                strokeWidth="2"
              />
              <path
                d="M120 196C116 150 104 108 108 64C112 41 120 27 120 27C120 27 129 41 132 64C137 108 124 150 120 196Z"
                fill={index % 2 ? "#43c5b3" : "#2aaf9b"}
              />
              <path
                d="M120 195V109"
                stroke="#d5e8a5"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
              <path
                d="M120 49C111 56 106 67 106 79C106 91 112 100 120 105C128 100 134 91 134 79C134 67 129 56 120 49Z"
                fill="#ffc843"
              />
              <ellipse cx="120" cy="79" rx="10" ry="15" fill="#ee8437" />
              <path
                d="M120 65C112 72 110 84 120 93C130 84 128 72 120 65Z"
                fill="#254ea5"
              />
              <ellipse cx="122" cy="76" rx="3" ry="5" fill="#8adecf" />
              <path
                d="M108 120L115 126M132 132L125 138M111 145L117 150"
                stroke="#f6ca63"
                strokeWidth="1.6"
                strokeLinecap="round"
                opacity=".8"
              />
            </g>
          ))}
          <path
            d="M120 208V238"
            stroke="#12735d"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
        <g
          className="moru-legs"
          data-part="legs"
          fill="none"
          stroke="#dc7931"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <g className="moru-leg moru-leg-back">
            <path d="M132 218L129 241L120 245M129 241L139 245M129 241L130 247" />
          </g>
          <g className="moru-leg moru-leg-front">
            <path d="M109 218L108 241L98 245M108 241L117 245M108 241L108 247" />
          </g>
        </g>
        <g className="moru-body-motion">
          <path
            d="M107 160C84 166 77 188 86 208C95 230 126 234 145 216C163 199 156 174 137 164C128 159 117 158 107 160Z"
            fill="#254ea5"
            stroke="#183b74"
            strokeWidth="2.2"
          />
          <path
            d="M113 175C107 152 110 134 126 115C134 106 135 98 144 102C155 108 145 125 138 138C132 151 138 166 143 179C133 191 120 187 113 175Z"
            fill="#2a62bb"
            stroke="#183b74"
            strokeWidth="2"
          />
          <path
            d="M133 119C119 141 117 156 122 170"
            fill="none"
            stroke="#50c5bd"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <g className="moru-wing" data-part="wings">
            <path
              d="M109 176C120 167 140 174 140 188C140 202 125 219 103 211C110 204 114 196 109 176Z"
              fill="#24a99c"
              stroke="#173f78"
              strokeWidth="2"
            />
            <path
              d="M119 181C129 184 128 193 114 205M126 183C137 188 132 201 119 207"
              fill="none"
              stroke="#97d7af"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M111 181C107 189 106 196 105 199"
              fill="none"
              stroke="#ffc843"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
          <g className="moru-head-aim">
            <g className="moru-head" data-part="head">
              <g
                className="moru-crest"
                data-part="crest"
                fill="none"
                stroke="#183b74"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M137 90Q125 75 125 69M141 89Q139 73 140 63M145 90Q151 77 156 72" />
                <path
                  d="M125 70C117 64 119 59 125 57C132 59 133 66 125 70Z"
                  fill="#22ac9f"
                />
                <path
                  d="M140 64C133 58 135 51 141 50C148 53 148 60 140 64Z"
                  fill="#22ac9f"
                />
                <path
                  d="M155 73C149 65 152 59 158 60C165 65 163 71 155 73Z"
                  fill="#22ac9f"
                />
                <path
                  d="M124 62H126M140 55H142M156 65H158"
                  stroke="#ffc843"
                  strokeWidth="3"
                />
              </g>
              <g className="moru-beak" data-part="beak">
                <path
                  d="M158 101L179 106L159 111Z"
                  fill="#ffc843"
                  stroke="#bc672c"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path d="M160 106L175 107L160 112Z" fill="#ec8438" />
              </g>
              <path
                d="M128 105C127 92 135 85 146 87C158 88 165 97 160 110C157 120 143 126 134 118C130 115 128 111 128 105Z"
                fill="#2a62bb"
                stroke="#183b74"
                strokeWidth="2"
              />
              <path
                d="M139 112Q148 119 155 111"
                fill="none"
                stroke="#59cbbb"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <g className="moru-eyes" data-part="eyes">
                <path
                  d="M139 101C141 94 151 93 155 101C154 109 143 111 139 101Z"
                  fill="#fff4d9"
                />
                <g className="moru-gaze">
                  <ellipse cx="148" cy="102" rx="3.6" ry="5" fill="#17334d" />
                  <circle cx="149.2" cy="100.2" r="1.3" fill="#fffaf0" />
                </g>
              </g>
              <path
                d="M139 94Q145 90 151 93"
                fill="none"
                stroke="#183b74"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </g>
          </g>
          <path
            d="M95 217Q115 228 132 216"
            fill="none"
            stroke="#5985c9"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </g>
      <g className="moru-particles" data-part="particles" opacity="1">
        {Array.from({ length: 6 }, (_, i) => (
          <g
            className="moru-particle"
            key={i}
            opacity="0"
            transform="translate(120 145)"
          >
            {i % 2 ? (
              <path
                d="M0-4L3 0L0 4L-3 0Z"
                fill={i % 3 ? "#ef8436" : "#24a99c"}
              />
            ) : (
              <circle r="3" fill="#ffc843" />
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
