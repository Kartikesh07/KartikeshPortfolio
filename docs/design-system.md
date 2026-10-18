# Indian Neo-Pop portfolio

Updated 18 October 2026. This editorial redesign supersedes the earlier handheld-console and mascot presentation. It retains React 18, Vite 5, React Three Fiber 8, Three.js 0.160, GSAP 3, and Framer Motion 11. No dependencies were added.

## Art direction

The opening pairs oversized, tightly spaced Bricolage Grotesque type with an original sculptural rosette and orbital ring. DM Sans handles reading and interface text. Cream (#fff8eb), rani pink (#ef598d), marigold (#ffcb46), cobalt (#284ce4), and emerald (#086b50) define the palette; deep green ink (#19382d) anchors text. Broad whitespace, staggered project compositions, and full-width colour sections replace the previous poster-wall styling.

The flower is a restrained reference to the established Indian pop-art identity. No stock imagery, remote 3D models, project simulations, or fabricated performance metrics are used.

## Files and content

- `src/App.jsx`: sticky navigation, accessible project dialogs, About, Skills, Experience, contact form, and motion control.
- `src/data/portfolio.js`: exactly Cyber Run, ArcChain, Reactive Energy Shield, and VisionForge; retained employment facts.
- `src/components/pop/Illustrations.jsx`: project art selection and the static hero fallback.
- `src/assets/arcchain.svg`: original branching electricity and conductor composition.
- `src/assets/reactive-shield.svg`: original impact ripple, hexagonal shield, energy indicator, and fracture composition.
- `src/assets/visionforge.svg`: original steel texture, heatmap, and classification composition. This represents the project concept; it is not a real model output or screenshot.
- `src/assets/hero-sculpture.svg`: locally authored fallback for the 3D sculpture.
- `src/components/pop/PlayScene.jsx`: procedural extruded rosette, orbital torus, and supporting forms.
- `src/components/pop/HeroArtwork.jsx`: independent lazy loading, WebGL fallback, context-loss handling, and visibility-aware rendering.
- `src/components/pop/usePortfolioMotion.js`: scoped GSAP entrance, text reveals, and desktop scroll parallax.
- `src/components/pop/Magnetic.jsx`: small pointer-driven spring displacement for the main call to action.
- `src/components/pop/ProjectCard.jsx`: mouse-only spring tilt, artwork hover, and project entry points.
- `src/index.css`: tokens, responsive layouts, interaction states, and reduced-motion styles.
- `index.html`: page metadata and existing font loading.

Cyber Run preserves the prior description, details, and actual gameplay image. The other three visuals are explicitly identified as original illustrations. Verified project destinations are `kartikesh007.itch.io/cyber-run`, `github.com/Kartikesh07/ArcChain`, `github.com/Kartikesh07/ReactiveShield`, and `github.com/Kartikesh07/VisionForge`. VisionForge describes classification and Grad-CAM, not segmentation or a validated industrial product.

## Motion and accessibility

The hero is decorative and has no game controls. GSAP handles the coordinated text entrance and scroll triggers; Framer Motion handles responsive springs and selected section entrances. Native scrolling is preserved without pinning or scroll hijacking. Scroll parallax is limited to desktop.

The header motion control pauses GSAP, CSS animation, magnetic motion, card tilt, and continuous WebGL rendering. OS reduced-motion changes are respected. Reduced-motion scrolling uses an explicit CSS override because ScrollTrigger may restore an inline scroll-behavior value during cleanup. The canvas uses demand rendering when paused, offscreen, or in a hidden tab, with DPR capped at 1.5. Its geometry and material complexity is intentionally bounded; the Three.js chunk is loaded separately.

Navigation is semantic and highlights the visible section. Mobile navigation supports Escape and closes after selection. Native project dialogs trap focus, dismiss on Escape/backdrop, and restore focus to their opening button. The site retains a skip link, visible keyboard focus, image alternatives, and native experience accordions. Project content remains readable independently of WebGL.

## Contact and companion

The original FormSubmit AJAX destination, timeout, submission feedback, retained text on failure, email fallback, copy-email control, and social links are preserved. Form inputs retain visible labels, native required/email validation, and autocomplete. Browser validation should not send an actual email unless specifically requested.

Moru is temporarily disabled. Its React lazy/Suspense imports, lazy initialization, and rendering are commented out in `App.jsx`. All `src/components/moru/` files are preserved; restore those comments to reactivate it.

## Skills and references

Applied the local scoped-code-change skill, Anthropic frontend-design guidance, Vercel Web Interface Guidelines, and Sites presentation-led design guidance. Existing research was reused; no external skills were installed. The MetaMask reference informed scale, spacing, sculptural presence, and colour blocking rather than page content or assets. GSAP ScrollTrigger and R3F performance APIs were checked against official documentation and the installed stack.

- https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md
- https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://r3f.docs.pmnd.rs/advanced/scaling-performance
- https://metamask.io/
