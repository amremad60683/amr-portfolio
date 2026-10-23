# Amr El Hariri — Portfolio (Angular 21)

## Run it
```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build → dist/amr-portfolio/browser
```

## Where to edit
| What | File |
|---|---|
| Links (LinkedIn, GitHub, WhatsApp, email), projects, skills, numbers, hero text | `src/app/data/site.data.ts` |
| Hero photos (base + cursor-reveal) | `public/images/hero-base.jpg`, `public/images/hero-reveal.jpg` |
| Styles (one partial per section) | `src/styles/_*.scss` |
| Sections | `src/app/sections/*.component.ts` |

## How it's built
- Standalone components, signals, zoneless change detection, OnPush everywhere.
- `core/scroll.service.ts` — Lenis smooth scroll + scroll lock for the loader, menu and modal.
- `core/ui.service.ts` — `ready` (intro finished), menu and modal state.
- `shared/reveal.directive.ts` — `appReveal` plays each entrance once when it scrolls into view (`appReveal="hero"` waits for the loader).
- `sections/liquid-reveal.component.ts` — the canvas brush that paints the second photo under the cursor.
- The contact form opens the visitor's email app with the message filled in, addressed to `EMAIL` in `site.data.ts`.

## Deploy to Vercel
Import the repo — Vercel detects Angular. Output directory: `dist/amr-portfolio/browser`.
