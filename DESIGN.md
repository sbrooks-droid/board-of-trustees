# Board of Trustees — Flint Hill Design System Project

Recreation of **https://www.flinthill.org/board-of-trustees/** built on the shared
Apply & Engage design system (same `design.css` + site header as the other 2026 pages).
All copy and photos are from the live page; all styling is from the shared system.

## Run it

```bash
npm install
npm run dev        # → http://localhost:3105  (Vite auto-bumps if 3103/3104 are taken)
npm run build      # → dist/  (asset URLs prefixed with /home/board-of-trustees/)
```

## Where the design lives

- `src/design.css` — **the** stylesheet: shared tokens + `.fh-*` classes, site header /
  full-page menu CSS, and the page-specific `.bot-*` block appended at the bottom.
  Copied from `E:\financial-aid\src\design.css` (2026-11-17) — keep in sync with siblings.
- `src/components/Header.tsx` — full-page menu overlay, ported 1:1 from financial-aid.
- `src/App.tsx` — page content + data arrays (trustees, committees, emeriti, chairs).

## Page sections (top → bottom)

1. **Hero** — `.us-hero` Visit Campus treatment (navy field, 48%/52% split, circular
   left-edge clip on the photo right). Photo: `FH-26-MARKETING-D2-241.jpg`.
2. **The Board Chair** — Eric Hemmer statement + circular headshot (white field).
3. **Meet the Board of Trustees** — 22 trustee cards (mist field): circular photo,
   name, committees, parent class(es), employer. NAIS note under the title.
4. **Chairman Emeritus + Trustees Emeriti** (gray field).
5. **Board Chairs** — timeline row since 1990; current chair highlighted green.
6. **Board Committees** — navy-field accordion reusing the `.us-belong__*` machinery
   from design.css (first item open on load, same as financial-aid's accordion).

## Conventions (same as siblings)

- Reference remote images by URL (`https://www.flinthill.org/wp-content/uploads/...`);
  never download assets into the project. No third-party CDNs/proxies.
- Fonts: Typekit `pqv5hua` (brandon-grotesque) + Google Caveat fallback; cursive accent =
  Aurelly Signature Alt woff2 (loaded in design.css). The FONT LOCK at the bottom of
  design.css forces brandon-grotesque everywhere — don't remove it.
- Buttons are square-cornered, never rounded. Desktop breakpoint: **900px**.
- Verify visual changes with headless Chrome CDP screenshots before claiming success
  (scratchpad `ywm/fullshot.js` does full-page + lazy-image-wait captures;
  run with `NODE_PATH="C:/Users/JVC13/.lmstudio/scratchpads/7z/node_modules"`).

## Publish workflow (SFTP → MyWPEngine staging) — NOT SET UP YET

- Intended live URL: https://flinthillstg.wpenginepowered.com/home/board-of-trustees/
  (`vite.config.ts` already sets `base: '/home/board-of-trustees/'` for production).
- No SFTP upload script exists yet — copy one from a sibling (e.g. the apply-engage or
  financial-aid scratchpad scripts) and point it at `/home/board-of-trustees`.
- **NEVER publish to SFTP unless the user explicitly says to.** Default: dev server only.
