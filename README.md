# 3D Developer Portfolio — Md Al Amin

An interactive 3D portfolio built with **React, Three.js and React Three
Fiber**. A procedurally-built developer desk (with a live "typing" code screen)
in the hero, a rotating 3D skills globe, a 3D planet in the contact section, and
a drifting star field behind everything — while staying fast on phones.

![preview](public/og-image.png)

## Tech stack

| Area    | Tools                                                  |
| ------- | ------------------------------------------------------ |
| UI      | React 18, Vite 6, Tailwind CSS 4, Framer Motion        |
| 3D      | Three.js, @react-three/fiber, @react-three/drei, maath |
| State   | Zustand                                                |
| Contact | EmailJS (falls back to `mailto:` if not configured)    |
| Hosting | Vercel                                                 |

## Run it locally

Requires **Node.js 18+**.

```bash
npm install
npm run dev        # open http://localhost:5173
npm run build      # production build into dist/
npm run preview    # preview the production build
```

## Make it yours (edit data, not components)

All content lives in `src/data/`:

| File          | What it controls                                            |
| ------------- | ----------------------------------------------------------- |
| `profile.js`  | name, roles, bio, highlights, CV link                       |
| `projects.js` | project cards (add `image` screenshots and `liveUrl`s here) |
| `skills.js`   | skill groups, levels, concept chips, 3D globe tags          |
| `journey.js`  | education / experience timeline                             |
| `socials.js`  | GitHub, Facebook, Instagram, WhatsApp, email                |

- **Profile photo**: put `profile.jpg` in `public/` and set
  `PHOTO = "/profile.jpg"` in `src/sections/About.jsx`.
- **CV**: put `resume.pdf` in `public/` and set `resumeUrl: "/resume.pdf"` in
  `profile.js`.
- **Project screenshots**: put images in `public/projects/` and set
  `image: "/projects/name.png"`.

## Contact form (EmailJS, optional)

1. Create a free account at emailjs.com → add an Email Service (Gmail) → create
   a Template using the variables `{{from_name}}`, `{{from_email}}`,
   `{{message}}`.
2. Copy `.env.example` to `.env` and fill in the three keys.
3. On Vercel, add the same three variables under _Project → Settings →
   Environment Variables_.

Without keys, the form still works: it opens the visitor's email app with the
message filled in.

## Deploy (Vercel)

1. Push this project to GitHub.
2. On vercel.com → _Add New Project_ → import the repository. Vercel detects
   Vite automatically (build: `npm run build`, output: `dist`).
3. Every push to `main` redeploys; every other branch gets its own preview URL.

---

## Architecture

The site is a **static single-page app** — no backend, no database. Applying the
course rule _"choose the simplest style whose quality attributes fit the need"_,
it is organised as a **layered, feature-based modular SPA**.

```
src/
  data/        CONTENT layer   — single source of truth for all text & links
  hooks/       LOGIC layer     — device quality, WebGL support, active section
  store/       STATE           — Zustand store (the "ViewModel")
  canvas/      3D PRESENTATION — scenes, models, SceneShell facade
  components/  2D PRESENTATION — Navbar, Section, TiltCard, SocialLinks…
  sections/    PAGE SECTIONS   — Hero, About, Skills, Projects, Journey, Contact
```

Dependencies only flow downward:
`sections → components/canvas → hooks/store → data`.

### Design patterns used

| Pattern                    | Where                          | Why                                                                                                        |
| -------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **MVVM**                   | `store/useAppStore.js` + hooks | Components bind to state slices and re-render reactively                                                   |
| **Strategy**               | `hooks/useDeviceQuality.js`    | `high` / `low` / `calm` rendering profiles chosen per device; 3D code never checks the device itself       |
| **Facade**                 | `canvas/SceneShell.jsx`        | One component hides WebGL detection, error boundary, quality settings and lazy mounting for every 3D scene |
| **Proxy (virtual / lazy)** | `SceneShell` + `React.lazy`    | A Canvas is only created when its section nears the viewport, and its render loop pauses off-screen        |
| **Observer**               | `hooks/useActiveSection.js`    | IntersectionObserver publishes the visible section; the navbar subscribes                                  |

### Quality attributes

| Attribute                  | How it is met                                                                                                                                                                              |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Performance                | No model files to download (desk is built from primitives), lazy-mounted canvases, paused render loops off-screen, three.js split into its own chunk, lower DPR/star count on weak devices |
| Availability / reliability | 2D fallbacks when WebGL is missing or a scene crashes                                                                                                                                      |
| Accessibility              | Skip link, keyboard focus styles, ARIA labels, respects `prefers-reduced-motion`                                                                                                           |
| Maintainability            | All content in `src/data/`; adding a project = adding one object                                                                                                                           |

### Architecture Decision Records

See [`docs/decisions/`](docs/decisions/).

## License

MIT
