# Urbania — React Microsite

A React + Vite reimplementation of the Force Motors Urbania concept microsite, ported 1:1 from the
`Urbania.dc.html` / `urbania-film.js` source spec (copy, structure and interaction behaviour preserved).

## Stack

- React 18 + Vite 5
- Plain CSS Modules (no Tailwind/UI kit) — colours, spacing and easing tokens mirror the source's inline
  design system, centralised in `src/index.css` (`--c-red`, `--c-bg`, `--ease-out`, etc.)
- No animation libraries — scroll-reveal, the marquee, the exploded-parts tour and the in-page "film" are
  all hand-rolled with `IntersectionObserver`, `requestAnimationFrame` and CSS transitions/keyframes.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # outputs to dist/
npm run preview   # serve the production build locally
```

## Structure

```
src/
  components/       One component per section (Nav, Hero, Marquee, Overview, InDetail, Film,
                     FeaturesAnatomy, Variants, Gallery, Lightbox, Pricing, Enquiry, Footer, Reveal)
  data/site.js       All copy, specs, gallery items, variants, pricing and film-scene data —
                     transcribed verbatim from the source spec
  hooks/             useInView (scroll-reveal), useReducedMotion
  styles/            One *.module.css per component
  App.jsx            Assembles all sections in document order
  main.jsx           React root
```

## Behaviour parity notes

- **Reveal-on-scroll**: `Reveal.jsx` + `useInView` reproduce the source's `[data-reveal]` /
  `data-reveal-delay` fade/slide-up, one-shot per element.
- **The Film** (`Film.jsx`): a self-contained, rAF-driven Ken-Burns sequence rebuilt from
  `urbania-film.js`'s scene/cue timings — restarts each time it scrolls into view, respects
  `prefers-reduced-motion`.
- **Anatomy tour** (`FeaturesAnatomy.jsx`): auto-advancing exploded-view spotlight with the same
  4.5s-per-part cadence as the source, pausable via hover/click.
- **Detail carousel**: horizontal snap-scroll with prev/next buttons, mirroring the source's
  `detailScroll` behaviour.
- **Gallery + Lightbox**: masonry grid opens a modal with prev/next/escape navigation.
- **Enquiry form**: client-side validation (name, email, 10-digit Indian mobile, state/city, consent)
  matching the source's `errors()` logic exactly; state selection filters the city list; submission is a
  simulated 1.4s delay into a success state (no network call — this is a demo microsite).

## Deployment

`vercel.json` is included for a zero-config Vercel deploy (`npm run build` → `dist/`, SPA rewrite to
`index.html`).

## Disclaimer

This is a portfolio concept microsite. It is not an official Force Motors property; all contact details,
pricing and specifications are placeholders shown for demonstration purposes only.
