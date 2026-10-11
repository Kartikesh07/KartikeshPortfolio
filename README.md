# Kartikesh's portfolio

A React portfolio with a festive Indian pop-art identity, original 3D artwork, illustrated project posters, and a responsive layout.

## Local development

```sh
npm install
npm run dev
```

## Verification and production

```sh
npm run lint
npm run build
npm run preview
```

The production output is in `dist/`. The Vite base remains relative for the existing GitHub Pages setup. Building does not publish the site.

The Three.js artwork is a separate lazy-loaded chunk. Vite may report that this chunk exceeds its default size advisory; the main application and static artwork fallback can render independently.

## Updating content

Edit `src/data/portfolio.js` for projects and experience. The page layout and contact address are in `src/App.jsx`; styles are in `src/index.css`. See `docs/design-system.md` for the visual system, interaction behavior, and artwork implementation.

The contact form retains the original FormSubmit email destination. Activation and successful real email delivery need to be verified by the owner before relying on the form in production. A direct email link is also available.
