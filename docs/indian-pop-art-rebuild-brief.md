# Indian pop art portfolio rebuild brief

Recorded: 11 October 2026. Status: research and preparation; implementation has not begun.

## Confirmed user intent

- Rebuild the portfolio's visual experience from scratch with a new theme, composition, design language, and art style.
- Represent colorful Indian culture.
- Use **festive, playful Indian pop art**, selected by the user during research.
- Include 3D art as part of the new experience.
- Research and remember relevant design and development skills before starting the rebuild.

The current cinematic game/HUD appearance is not visual authority for future work. Verified personal information, project evidence, working links, and useful infrastructure can be reused; presentation should be newly designed. A specific region, language, festival, palette, motif, or scene has not been selected.

## Recommended skill set

| Source | Role in the rebuild | Assessment |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | Develop a distinctive identity, typography, and composition tied to the subject. | Primary art-direction reference. Use the confirmed Indian pop art brief to guide choices. |
| [Impeccable new-work reference](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/new-work.md) | Reason about replacing an entire visual identity and planning its first expression. | Relevant to a redesign rather than a polish task. Studied as guidance; its scripts and formal workflow were not executed. |
| [React Three Fiber Patterns](https://github.com/agents-inc/skills/blob/main/src/skills/web-3d-react-three-fiber/SKILL.md) | Scene structure, geometry, materials, lighting, asset loading, animation, and interaction. | Useful community skill for building real 3D art in the React page. Check API details against installed packages and official docs. |
| [R3F best practices](https://github.com/emalorenzo/three-agent-skills/blob/main/skills/r3f-best-practices/SKILL.md) | Review performance, render loops, loading, and resource management. | Secondary engineering checklist. Validate individual rules rather than treating examples as universally correct. |
| [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines) | Review semantics, focus, navigation, responsive layout, and motion. | Retain as the interface quality floor for the new design. |
| [Vercel React best practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices) | Keep loading and React rendering efficient. | Apply the client-side guidance appropriate to this Vite project. |

These resources describe complementary disciplines. A 3D skill supplies implementation patterns; the cultural research and personal brief supply the artwork's character.

### Compatibility decisions

The project declares React 18, R3F 8, Drei 9, and Three.js 0.160. Official R3F documentation pairs R3F 8 with React 18 and R3F 9 with React 19. Rebuilding the design does not itself require changing those versions. [Official introduction](https://r3f.docs.pmnd.rs/getting-started/introduction)

The reviewed [Picaresco Three.js skill](https://github.com/Picaresco/threejs-skill/blob/main/SKILL.md) explicitly targets r185 and prioritizes WebGPU/TSL. Its assumptions do not match this project's r160-era setup. Keep it as a possible reference for a deliberate future migration, not the default implementation guide for this rebuild.

## Cultural references studied

These are inspiration sources, not asset licenses or a requirement to use every tradition.

- **Indian vehicle sign painting:** an IDC, IIT Bombay design case study documents expressive letterforms, layered shadows, ornamental panels, and vivid color in Kerala truck nameboards. This suggests a source for custom name lettering and illustrated frames. [D'source case-study PDF](https://www.dsource.in/sites/default/files/case-study/adaptation-driver-interface-volvo-trucks-india/introduction/file/jinesh_bhaskaran-adaptation_driver_interface_VOLVO_trucks_india.pdf)
- **Indian movie posters:** D'source's archive provides historical poster references across multiple Indian languages. Study composition, lettering, illustration, and hierarchy; create original project artwork using Kartikesh's work. [Poster archive](https://www.dsource.in/dcontent/design-india/communication_design-next.php?mcat=Indian+Movie+Posters)
- **Rangoli:** D'source's resource offers another vocabulary of floor-art pattern and color. It can inform a selected ornamental detail if it fits the concept. [Rangoli resource](https://www.dsource.in/resource/rangoli)

No single reference stands for all Indian culture. The design proposal should name the influences it actually uses and give them a coherent role. The user selected a playful pop art direction, so regional craft research remains optional supporting material.

## Proposed visual direction

The following is design exploration, not additional confirmed user preferences.

**Concept: a colorful maker's mela.** Present Kartikesh's work as a lively collection of things made, explored, and played. Use an expressive opening, sculptural objects, and original illustrated project posters. Give project stories space to read and contact a clear place in the composition.

Possible color roles: mango yellow, rani pink, cobalt blue, leaf green, coral, and a legible dark ink. Use a consistent palette with different dominant colors across selected surfaces; test text contrast rather than placing every color behind every paragraph.

Possible typography: custom sign-inspired display lettering for the name or one headline, paired with readable text typography. Decorative lettering should be deliberate and localized. A script or language should be introduced through meaningful, accurate wording if selected.

Possible layout: an asymmetric opening with an art object beside the introduction, followed by a curated poster wall for projects, an illustrated story section, and a clear contact invitation. Reconsider the page order and section names around the portfolio's purpose.

## 3D art concepts to explore

Choose one main scene rather than implementing every idea:

1. A miniature creative workshop with painted geometric objects and game-making tools, connecting the cultural visual language to Kartikesh's work.
2. A sculptural paper-kite composition with original graphic patterns, a designed camera angle, and subtle user-controlled movement.
3. An original illustrated character or painted toy sculpture representing the maker, surrounded by a few objects tied to featured projects.

Develop silhouette, form, material, lighting, and framing together. The scene should read as intentionally authored artwork. A raster illustration can support a texture or a fallback, but is distinct from the real 3D scene requested.

## Engineering plan for the artwork

- Keep headings, navigation, project information, and contact actions in semantic DOM content.
- Load the 3D scene independently so useful content appears without waiting for WebGL or large assets.
- Choose procedural geometry or a designed GLB model according to the artwork's needs. Check asset provenance and usage terms when selecting third-party files.
- Use ref-based frame updates and delta time for continuous movement; use React state for discrete selection or UI changes. [R3F Patterns](https://github.com/agents-inc/skills/blob/main/src/skills/web-3d-react-three-fiber/SKILL.md)
- Tune pixel ratio, shadows, geometry, and draw calls to measured mobile performance. Demand rendering is appropriate when a scene can rest; animated scenes require explicit pausing or another rendering strategy. [Official R3F performance guidance](https://r3f.docs.pmnd.rs/advanced/scaling-performance)
- Provide a visually considered static fallback and a reduced-motion experience. Test touch behavior so the artwork does not interfere with scrolling or portfolio navigation.

## Next implementation workflow

Use this brief as the starting point. Explore a small number of materially different compositions using real portfolio content; decide the artwork and typography treatment before building every section. Create fresh tokens and components, integrate the chosen 3D scene, then verify mobile layout, keyboard use, reduced motion, asset failure, WebGL fallback, build, lint, and measured performance.

## Remembered state

This brief and the root AGENTS.md record the user's direction for future work in this repository. External skills have been researched, not installed or activated. No skill scripts, installers, hooks, or application changes were executed for this research. Recheck mutable API details when implementation begins.
