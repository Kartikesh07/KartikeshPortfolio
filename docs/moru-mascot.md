# Moru

Moru is an original SVG peacock companion using the portfolio's sapphire, turquoise, emerald, marigold and orange palette. The artwork has separate tail, head, eyes, crest, wing and leg groups. No external artwork or new dependencies are required.

## Implementation

`src/components/moru/Moru.jsx` provides accessible controls and integrates the existing motion setting. `MoruArtwork.jsx` owns the vector illustration, `moruController.js` owns GSAP animation and positioning, and `moruMachine.js` defines the expandable state machine. App loads the companion separately and suspends it while a project dialog or navigation menu is open.

The states are idle, walking, curious, blinking, fanning, paused, suspended and hidden. Feather fanning takes priority over scroll and idle gestures. Completion events carry an epoch so an interrupted gesture cannot finish a newer animation. State conflict tests use Node's built-in test runner.

The fan sequence anticipates, spreads nine feathers, briefly releases six particles, holds and settles. Finite idle timers alternate blinks with occasional head tilts. Scrolling creates delayed movement and a temporary walking cycle. Mouse proximity controls subtle head and pupil transforms independently of gestures. Project hover and keyboard focus trigger curiosity without modifying the project handlers.

Positioning checks visible interactive elements and chooses a clear lower-edge location. While moving, pointer input passes through to the page. In crowded layouts, the illustration becomes translucent and its body button is disabled; the hide control searches for a clear location. The SVG itself never captures pointer input.

## Accessibility and lifecycle

The body is a native button supporting click, tap, Enter and Space. Hide/show controls have 44px touch targets, preserve keyboard focus and remember visibility within the session. Live announcements describe user actions only.

Manual pause and the OS reduced-motion preference stop walking, idle gestures, cursor tracking and particles. The fan remains usable as a static toggle. Focus in a form field and a hidden document suspend the companion. Resizing recalculates placement. Cleanup removes listeners, timers, scheduled frames and GSAP animations. There is no permanent custom animation frame loop or React state update per frame.

## Validation

Run `node --test src/components/moru/moruMachine.test.js`, `npm run lint` and `npm run build`.

Browser checks cover desktop cursor reaction, scroll walking, project focus reactions, dialog suspension, keyboard hide/show, paused static fanning and form-focus suspension. Mobile viewport checks at 390px and 320px cover fan containment, touch-sized controls and horizontal overflow. These are browser viewport checks; physical-device touch and OS preference changes still warrant device testing.

Preening and sleeping are intentionally left as future state-machine extensions.
