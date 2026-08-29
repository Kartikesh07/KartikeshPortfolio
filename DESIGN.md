# DESIGN SYSTEM: JUST CAUSE 3 — MEDICI REBELLION

## 1. Visual Archetype & Identity
- **Archetype**: Military HUD & High-Octane Action (Just Cause 3 / Medici Rebellion)
- **Aesthetic Tone**: Tactile Military Tech, Glassmorphism Surfaces, High-Voltage Action Accents (Chaos Fire & Bavarium Spark).
- **Core Contrast**: Deep dark obsidian/slate backing with vivid cyan/azure telemetry and explosive orange/gold highlights.

---

## 2. Color Palette & Semantic Tokens

### Primary Brand & Telemetry
- `--color-sea`: `#00AEEF` (Medici Sea Azure — Primary HUD, telemetry & active markers)
- `--color-sky`: `#0099D6` (Sky Blue Accent)
- `--color-azure`: `#00D4FF` (Electric Cyan Highlight)

### Action & Chaos Tokens
- `--color-chaos`: `#FF4500` (Chaos Orange-Red — Critical actions, high threat badges)
- `--color-explosion`: `#FF8C00` (Explosion Amber — Medium threat & power surges)
- `--color-fire`: `#FF6B35` (Fire Glow)
- `--color-beacon`: `#FFD700` (Rebel Drop Beacon Yellow — Unlocks & milestones)
- `--color-bavarium`: `#8A2BE2` (Bavarium Energy Violet — Secret tech & energy cores)

### Surface & Depth
- `--bg-night`: `#0D1117` (Deep Obsidian Base)
- `--bg-slate`: `#1A1F2E` (Military Tactical Surface)
- `--bg-steel`: `#2D3748` (Elevated Panel & Borders)
- `--border-hud`: `rgba(0, 174, 239, 0.25)` (Tactical HUD Border)
- `--border-inner-light`: `rgba(255, 255, 255, 0.08)` (1px Glass Edge Reflection)

---

## 3. Typography Hierarchy
- **Headings & Display**: `Barlow Condensed`, sans-serif (Weights: 600, 700, 800) — Bold military stenciled impact.
- **Sub-headers & Tech Specs**: `Rajdhani`, sans-serif (Weights: 500, 600, 700) — Futuristic aerospace HUD.
- **Body & Editorial Copy**: `Inter`, sans-serif (Weights: 300, 400, 500) — Clean, legible reading experience.
- **Telemetry & Data**: `JetBrains Mono`, monospace (Weights: 400, 500) — Coordinates, version tags, numeric metrics (`tabular-nums`).

---

## 4. Geometry & Surface Rules
- **Chamfered Cuts**: 45-degree angled clipped corners (`clip-path: polygon(...)`) representing armored tech panels.
- **Glassmorphic Depth**: Multi-stop backdrops with `backdrop-filter: blur(16px)` paired with inner 1px highlights (`box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1)`).
- **Target Locks**: Animated corner brackets on hover for focused elements.

---

## 5. Animation Physics
- **Springs**: `cubic-bezier(0.16, 1, 0.3, 1)` for snappy military feedback.
- **Accessibility**: All animations automatically disabled or simplified under `@media (prefers-reduced-motion: reduce)`.
