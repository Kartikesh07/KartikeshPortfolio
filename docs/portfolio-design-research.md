# Portfolio design and development research

Researched: 11 October 2026. Scope: learn and select useful guidance before changing the portfolio. The recommendations below are a synthesis for this project, not a completed visual audit or an approved redesign.

## Updated user direction

The user subsequently requested a complete replacement of the current visual identity: a new theme and design representing colorful Indian culture, including 3D art. Their selected direction is **festive, playful Indian pop art**. This supersedes any suggestions below about refining or preserving the cinematic appearance. Read [the current rebuild brief](indian-pop-art-rebuild-brief.md) before future design work.

## Project context

The inspected source uses React 18, Vite 5, Tailwind CSS 3, Framer Motion 11, GSAP, Three.js, and React Three Fiber 8. It presents Kartikesh as a game developer and full-stack engineer through a cinematic interface, ember colors, HUD navigation, project missions, a timeline, and a WebGL hero.

These are observations from package.json and the source, not confirmation of the owner's current role or preferred future direction. Audience, hiring goals, preferred art style, and which work deserves prominence still need to be established before implementation.

## Skills worth using

| Skill and original source | What it contributes | Fit and limits for this portfolio |
| --- | --- | --- |
| [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md) | Subject-specific art direction, intentional typography, composition, and self-critique. | Primary design guidance. Build identity around Kartikesh's actual work; keep the brief authoritative over general aesthetic preferences. |
| [Impeccable](https://github.com/pbakaus/impeccable) and its [skill entry point](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/SKILL.md) | A structured toolset for shaping, reviewing, adapting, and polishing interfaces. | Useful for systematic refinement. Its current distribution includes scripts, an engine, and optional hooks; reading it is separate from installing and executing it. |
| [Vercel web-design-guidelines](https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md) | Interface review against [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md). | Strong implementation checklist for semantics, focus, input, motion, media, and responsive behavior. It does not choose the portfolio's artistic identity. |
| [Vercel React best practices](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/SKILL.md) | Prioritized guidance on bundles, rendering, events, and data loading. | Apply the React client rules. Next.js server components, server actions, and framework-specific loading APIs do not directly apply to this Vite app. Check newer React APIs against React 18 before use. |
| [UI/UX Pro Max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) and its [skill document](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/blob/main/.claude/skills/ui-ux-pro-max/SKILL.md) | Searchable style, palette, typography, UX, and stack guidance. | A secondary reference for comparing options. Treat catalog suggestions as starting points; the portfolio's content should determine the final design. Full search requires its supporting data and scripts. |

Recommended working combination: frontend-design for direction, selected Impeccable methods for review, Vercel guidelines for interface quality, and Vercel React rules for implementation. Use UI/UX Pro Max when a particular design decision needs alternatives. Loading every framework's rules into every task would add conflicting advice and unnecessary work.

## Design lessons to apply

### Establish a clear brief

First identify the visitor's main decision: hiring, commissioning, collaboration, or exploring games. Rank the content around that decision. Confirm whether game development or full-stack engineering should lead. A portfolio can support both while giving its opening a clear emphasis.

### Make the work carry the identity

Anthropic's guidance emphasizes deriving visual choices from the subject, planning before building, and concentrating visual boldness. For this project, the most promising raw material is the actual games, worlds, tools, and technical experiments. A signature visual should connect to a featured project or process. [Source](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md)

My proposed standard: a visitor should be able to describe both the visual idea and one concrete achievement after browsing. A decorative floating scene alone cannot communicate what Kartikesh built or contributed.

### Give typography and layout deliberate roles

Define a small set of type roles, spacing values, content widths, colors, and interaction states. Review heading wraps and reading comfort at real widths. Google's typography guidance addresses text size, line length, leading, and user preferences; these matter alongside font selection. [Source](https://web.dev/learn/design/typography)

For the replacement design, establish a new typography hierarchy rather than inheriting the current HUD treatment. Keep essential information readable even when decorative metadata is quiet. Consistent cropping of project images and clear alignment can do more for polish than another overlay.

### Build project stories with evidence

My portfolio-specific recommendation is to curate a few substantial projects before showing the full collection. Each featured project should explain the problem, Kartikesh's contribution, a meaningful technical decision, the result, and a usable demo or source link. Use accurate screenshots and verified claims. Different projects can have different presentations while sharing a consistent interaction model.

### Review the visitor's experience

Impeccable's critique reference examines specificity, hierarchy, cognitive load, discoverability, and the visitor's journey. These are useful questions to bring to a later review. Its formal critique command has its own orchestration requirements; that command was not run during this research. [Source](https://github.com/pbakaus/impeccable/blob/main/.agents/skills/impeccable/reference/critique.md)

For the replacement portfolio, test whether a first-time visitor can reach work, resume, and contact directly. Design the new navigation, motion, and atmosphere around that journey. The current boot screen, achievements, cursor, and ambient effects are not requirements for the rebuild.

## Engineering standards

- **Accessible foundations:** use semantic links and buttons, meaningful labels, visible focus, appropriate image alternatives, and operable navigation. Audit overlays and sticky navigation for obscured focus. [Vercel interface guidelines](https://github.com/vercel-labs/web-interface-guidelines/blob/main/command.md)
- **WCAG 2.2 AA as a target:** check contrast, keyboard access, reflow, and target size. Normal text generally needs 4.5:1 contrast, large text 3:1. The AA target-size criterion is 24 by 24 CSS pixels with exceptions; 44 by 44 is the enhanced AAA criterion and a useful comfort target. Compliance requires a broader review. [W3C quick reference](https://www.w3.org/WAI/WCAG22/quickref/)
- **Motion preferences across systems:** inspect Framer Motion, GSAP, CSS, canvas, and audio separately. Motion's guidance supports user reduced-motion preferences and alternatives to parallax and autoplay. Do not assume a CSS media query controls JavaScript animation. [Motion accessibility](https://motion.dev/docs/react-accessibility)
- **Animation lifecycle:** scope GSAP work to its component and clean it up correctly, including work started later by handlers. React development Strict Mode makes cleanup especially relevant. [GSAP React guidance](https://gsap.com/resources/React/)
- **Frequent updates:** profile pointer-driven React state. Temporary pointer coordinates can use refs or motion values when semantic UI does not need a render for each event. [Vercel transient-value rule](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/rules/rerender-use-ref-transient-values.md)
- **WebGL budget:** keep meaningful content independent of canvas, provide a deliberate fallback, and pause unnecessary rendering. Demand rendering suits scenes that can rest; continuously animated scenes need another strategy. Reuse geometry/materials and avoid React state updates in frame loops. [R3F scaling](https://r3f.docs.pmnd.rs/advanced/scaling-performance), [R3F pitfalls](https://r3f.docs.pmnd.rs/advanced/pitfalls)
- **Measured performance:** target LCP at or below 2.5 seconds, INP at or below 200 ms, and CLS at or below 0.1 at the 75th percentile, separated by device category. Lighthouse is a development diagnostic; its default load test does not measure field INP. [Google Web Vitals](https://web.dev/articles/vitals)

## How to use this research when implementation begins

1. Use the confirmed replacement direction in the current rebuild brief. Confirm any remaining audience, desired-action, and factual-content decisions; the choice to replace the existing identity is settled.
2. Inspect the running portfolio at desktop and mobile widths; record strengths and priority problems before choosing fixes.
3. Compare two or three content-specific visual concepts using the same real project material. Choose a direction before expanding it across the page.
4. Define design tokens and build the hero plus one featured project as a representative slice. Review readability, image treatment, navigation, and motion together.
5. Complete the remaining sections with consistent behavior and verified content.
6. Run build and lint, then inspect relevant browsers, keyboard use, narrow screens, zoom, reduced motion, touch behavior, failed media, and WebGL fallback. Measure loading and responsiveness before making performance claims.

## Research status

The original skill documents, selected references, and official engineering sources were read. This file records the resulting project-specific guidance. No external skills were installed or activated, no external installer or skill script was executed, and no application code or dependencies were changed for this research. The current portfolio was inspected through source only; visual quality and performance remain unmeasured.
