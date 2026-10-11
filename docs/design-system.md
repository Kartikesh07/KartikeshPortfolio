# Festive Indian pop-art portfolio

Implemented on 2026-10-11 following the user's direction: a complete visual rebuild with festive, playful Indian pop art and original 3D artwork.

## Visual identity

- Warm paper background, deep green typography, rani pink, marigold yellow, cobalt blue, and terracotta accents.
- Bricolage Grotesque headlines, DM Sans body text, and restrained italic serif accents. Fonts load through Google Fonts with local fallback stacks.
- Kite shapes, floral rosettes, a sunburst, sign-painter-inspired lettering, and printed-poster compositions bring cultural character without religious imagery or a collage of unrelated regional styles.
- The hero's pink handheld console, pixel flower, kite, and sculptural ornaments connect the owner's game-development work to the playful identity. Geometry is authored locally in React Three Fiber; no remote model assets are required.
- Project artwork is original illustration, except the actual Cyber Run gameplay image. Illustrations must not be described as screenshots of shipped interfaces.

## Structure and editing

- `src/App.jsx`: navigation, sections, project dialogs, motion control, and contact form.
- `src/data/portfolio.js`: project content, links, technologies, and experience history.
- `src/components/pop/Illustrations.jsx`: reusable SVG and project poster compositions.
- `src/components/pop/HeroArtwork.jsx`: lazy loading, visibility handling, WebGL detection, and static fallback.
- `src/components/pop/PlayScene.jsx`: 3D geometry, lighting, and animation.
- `src/components/pop/Reveal.jsx`: once-per-visit scroll entrances.
- `src/components/pop/ProjectCard.jsx`: spring-based pointer tilt, tap feedback, and animated grid changes.
- `src/index.css`: design tokens, layouts, responsive rules, and reduced-motion styles.
- `public/flower.svg`: matching favicon.

The portrait is an optimized local derivative of the existing source photograph. Original source images remain available in the repository. Personal facts and employment dates are retained from the prior portfolio; update the data file when these change. Links without a verified individual project destination explicitly lead to the owner's GitHub profile.

## Interaction and accessibility

The page uses native links, buttons, a modal dialog, and expandable experience details. Project filters announce their result count. Dialog dismissal restores focus to its opener. Mobile navigation supports Escape. The form has visible labels, required-field and email validation, and live status messages. A skip link and visible focus outlines support keyboard navigation.

Reduced motion is respected on initial load and when the OS preference changes. A visible motion button allows manual control. The 3D scene stops its continuous frame loop when paused, offscreen, or in a hidden tab. Pixel ratio is capped at 1.5; the Three.js scene loads separately from the main application. A CSS/SVG console composition remains available when WebGL cannot initialize or its context is lost.

The console is interactive: three swatches change its shell colour, Press play cycles between flower, kite, and heart pixel art, and Spin turns the composition. The blue and yellow buttons on the 3D model also cycle the display. A short flower burst accompanies play when motion is enabled. All these actions have equivalent keyboard-accessible DOM controls. The static fallback responds to colour, screen, and spin choices too. Pausing disables Spin, removes bursts, and restores a front-facing console while keeping colour and display changes available.

Hero entrances, drawn underlines, staggered section reveals, spring-based project tilt, filter transitions, dialog entrances, and smaller hover/tap feedback use the existing Framer Motion dependency and CSS. Tilt is limited to mouse pointers; touch scrolling is preserved. Manual pause disables CSS animations, tilt, animated layout changes, and smooth scrolling. Avoid adding scroll hijacking or making navigation wait for an animation to finish.

## Contact delivery

The existing FormSubmit AJAX destination is preserved. Requests time out after 15 seconds; failures retain the visitor's text and provide an email-app fallback. Successful responses clear the form. Delivery depends on the existing FormSubmit account activation and service availability. Browser QA checks local required-field validation without sending an email.

## Moru companion

Moru extends the festive identity with an original SVG peacock and the same five core colours. Its independently animated parts use GSAP, a prioritised state machine and finite idle timers. The companion respects motion preferences, yields to dialogs and form focus, and provides keyboard-accessible fan and hide/show controls. Implementation and validation details are in `moru-mascot.md`.

## Research references

The researched skills and cultural sources are recorded in `portfolio-design-research.md` and `indian-pop-art-rebuild-brief.md`. External skills were studied, not installed. This implementation applies their guidance on distinctive art direction, typography, hierarchy, responsive behavior, accessibility, and economical React Three Fiber rendering.
