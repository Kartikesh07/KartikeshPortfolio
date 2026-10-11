# Rebuild validation — 2026-10-11

- `npm run lint`: passed.
- `npm run build`: passed. Vite reports its size advisory for the lazy Three.js scene (approximately 219 KB compressed), plus an existing stale Browserslist database advisory.
- `git diff --check`: passed; Git reports the repository's existing Windows line-ending normalization notices.
- Browser: original 3D console, kite, and sculptural ornaments rendered successfully; no captured console errors.
- Layouts inspected at 1440, 1264, 768, 390, and 320-pixel viewport widths. The 320-pixel horizontal-overflow issue was corrected; the document width matches the available viewport. 3D composition now scales to narrow canvases.
- Project filter: Tools shows one matching project; All work restores all four.
- Project dialog: desktop and mobile display, Escape dismissal, and focus restoration to the opener verified.
- Mobile menu: opens and closes when a navigation link is selected.
- Motion button: changes to Play motion with its pressed state enabled.
- Experience: expanding GameWise reveals its description.
- Contact: empty submission is prevented by native validation and focuses the name field. No email was sent; real service delivery remains unverified.
- Local images loaded without broken-image errors.

Desktop screenshot: `previews/portfolio-desktop.jpg`.

These are focused implementation checks, not a full accessibility audit or a test across every browser/device. Reduced-motion initialization, context-loss fallback, offscreen pausing, and form timeout/error behavior are implemented but were not all simulated in browser QA.

## Motion and interactivity pass

- Console colour switching and pixel-art cycling verified on desktop and at 390px and 320px phone widths.
- Spin action visibly turns the 3D composition. Pausing during a turn returns the screen to face the visitor, disables Spin, and removes the decorative burst.
- Animated filtering leaves the expected two Games projects and one Tools project. Opening a filtered project and closing it with Escape restores focus to its opener.
- About-section content reaches full opacity when navigating with motion paused; content remains available.
- Narrow-screen controls fit without document overflow. Touch targets have been enlarged for phone/tablet layouts.
- No browser console errors or warnings were captured during these interactions.
- Project pointer tilt, OS reduced-motion initialization, direct clicking of model buttons, and the non-WebGL fallback were implemented but not all independently simulated in browser QA.

## Moru companion MVP

- Lint, production build, and four state-machine conflict tests pass.
- Desktop scroll movement, cursor head/eye tracking, project focus curiosity, feather fanning, dialog suspension, and keyboard hide/show with focus restoration verified.
- At 390px and 320px viewport widths, the feather fan stays inside the viewport and the document has no horizontal overflow.
- Pausing leaves the static feather toggle available with all particles hidden. Focus in contact fields suspends Moru; leaving the fields restores him.
- No browser console errors or warnings captured. Build retains the existing Three.js chunk-size and stale Browserslist advisories.
- Timed idle gestures, OS reduced-motion integration and teardown are implemented; the short idle blink was not independently captured in browser QA. Physical touch devices were not tested.

Preview: `previews/moru-desktop.png`. Architecture and extension points: `moru-mascot.md`.
