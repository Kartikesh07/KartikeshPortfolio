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
