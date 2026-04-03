# AGENTS.md — Codebase Orientation for AI Coding Agents

Read this file at the start of every session. It is the authoritative reference for working in this repository.

---

## Project Purpose

Personal portfolio website for **Sofus Skovgaard**. It showcases work experience, education, and a blog, and provides a contact form. Content is managed via Prismic CMS and served through a Next.js application with Incremental Static Regeneration (ISR).

---

## Tech Stack

| Technology            | Version                                      | Purpose                                                                  |
| --------------------- | -------------------------------------------- | ------------------------------------------------------------------------ |
| **Next.js**           | 16 (Pages Router)                            | Framework — SSR/ISR, routing, API routes                                 |
| **TypeScript**        | 5.6 (strict)                                 | Language — all code must be fully typed                                  |
| **MobX**              | 6 + mobx-react 9                             | Client-side state management                                             |
| **Prismic**           | `@prismicio/client` v5, `prismic-reactjs` v1 | Headless CMS — content source for bio, posts, work experience, education |
| **Tailwind CSS**      | 3 + `@tailwindcss/typography`                | Utility-first styling; `prose` classes available for rich text           |
| **Postmark**          | —                                            | Transactional email — powers the `/api/contact` route                    |
| **Google Analytics**  | `gtag`                                       | Analytics — injected server-side in `_document.tsx`                      |
| **Font Awesome Free** | 5                                            | Icon library                                                             |
| **date-fns**          | 2                                            | Date formatting utilities                                                |
| **pnpm**              | 9.12.3                                       | Package manager                                                          |
| **classnames**        | —                                            | Conditional class name composition (aliased as `cx` by convention)       |
| **ESLint**            | 9 (flat config)                              | Linting — `eslint.config.mjs` with `next/typescript` + `prettier` rules  |
| **Prettier**          | 3                                            | Code formatting — config in `.prettierrc`                                |
| **Husky**             | —                                            | Pre-commit hooks — runs `lint-staged` before every commit                |
| **lint-staged**       | —                                            | Runs ESLint + Prettier on staged files only                              |

---

## Directory Structure

```
src/
  base/store.ts               Abstract MobX BaseStore — all stores extend this
  components/
    container/index.tsx       Responsive page-width wrapper component
    education/index.tsx       Education entry card component
    introduction/index.tsx    Prismic-powered bio/portrait block
    list/index.tsx            Generic typed list renderer
    post/index.tsx            Blog post card (handles image/no-image variants)
    work-experience/index.tsx Work experience card with tenure calculation
  enums/ComponentTypes.ts     ComponentTypes enum (Introduction, Work_Experience, …)
  pages/
    _app.tsx                  App shell — StoreProvider, Google Analytics init, FA icons
    _document.tsx             Custom HTML document — fonts, GA <script> injection
    404.tsx                   Custom 404 error page
    500.tsx                   Custom 500 error page
    index.tsx                 Homepage (ISR) — work experience + education + posts
    contact.tsx               Contact form page — MobX ViewState + Postmark API
    sitemap.tsx               HTML sitemap (noindex meta)
    blog/index.tsx            Blog listing page (ISR, 10 posts)
    blog/[slug]/index.tsx     Dynamic blog post page (ISR, prev/next links, sidebar)
    api/contact.ts            POST handler — validates fields + sends via Postmark
  services/prismic-service.ts Singleton MobX-observable Prismic CMS client
  stores/index.ts             RootStore — composes UIStore (and any future stores)
  stores/ui-store.ts          UIStore — holds app_name, navbar open/close state
  styles/core.css             Tailwind directives + custom utility classes
  utils/
    date-format.ts            formatDate / formatDateWithoutDay / formatLongDate helpers
    is-server.ts              `typeof window === "undefined"` shorthand
    stores.tsx                React context for MobX stores — StoreProvider + useStores()
    types/modify.ts           Modify<T, R> utility type for partial type overrides
    types/nameof.ts           nameof<T>() compile-time safe property name helper
```

---

## Key Patterns

### 1. Component Structure

One component per subdirectory. The entry point is always `index.tsx`. Never put components directly in the `components/` root.

```
components/
  post/
    index.tsx   ← only file (or add sub-files here, never alongside index.tsx at root)
```

Pages should import components via `dynamic()` for code splitting (see below).

---

### 2. Path Aliases

`tsconfig.json` maps `"*"` → `"./src/*"`. Always use bare-path aliases — **never** relative paths for `src/`-based imports and **never** the `@/` prefix.

```ts
// ✅ Correct
import Container from "components/container";
import { formatDate } from "utils/date-format";
import { useStores } from "utils/stores";

// ❌ Wrong — relative path
import Container from "../../components/container";

// ❌ Wrong — @/ prefix
import Container from "@/components/container";
```

---

### 3. Prismic Data Fetching

All CMS data comes from the `PrismicService` singleton in `src/services/prismic-service.ts`. Call its methods inside `getStaticProps`. Every data page must include `revalidate: 60` (ISR).

```ts
import PrismicService from "services/prismic-service";

export const getStaticProps: GetStaticProps = async () => {
  const posts = await PrismicService.getBlogPosts();
  return {
    props: { posts },
    revalidate: 60,
  };
};
```

Do **not** call the Prismic client directly from components or other files. Always go through `PrismicService`.

---

### 4. MobX Stores

Access stores exclusively via the `useStores()` hook from `utils/stores`. Never instantiate stores directly inside components. `RootStore` (in `stores/index.ts`) composes all sub-stores.

```ts
import { useStores } from "utils/stores";
import { observer } from "mobx-react";

// Wrap any component that reads observable state with observer()
const MyComponent = observer(() => {
  const { uiStore } = useStores();
  return <div>{uiStore.app_name}</div>;
});
```

---

### 5. Dynamic Imports

Use `next/dynamic` for all component imports in pages. This enables code splitting per route.

```ts
import dynamic from "next/dynamic";

const Post = dynamic(() => import("components/post"));
const Introduction = dynamic(() => import("components/introduction"));
```

---

### 6. Conditional Class Names

Import `classnames` as `cx` (the established convention in this codebase). Never concatenate class strings manually.

```ts
import cx from "classnames";

const className = cx("base-class", {
  "active-class": isActive,
  "disabled-class": isDisabled,
});
```

---

### 7. Date Formatting

Always use the helpers from `utils/date-format.ts`. Never import from `date-fns` directly in components or pages, and never hand-roll date formatting.

```ts
import { formatDate, formatDateWithoutDay, formatLongDate } from "utils/date-format";

formatDate(new Date()); // e.g. "Jan 2024"
formatDateWithoutDay(new Date()); // e.g. "January 2024"
formatLongDate(new Date()); // e.g. "1 January 2024"
```

---

### 8. MobX Observer Wrapping

Any component that reads MobX observable state **must** be wrapped with `observer()` from `mobx-react`. Forgetting this will cause the component to not re-render on state changes.

```ts
import { observer } from "mobx-react";

const NavBar = observer(() => {
  const { uiStore } = useStores();
  // uiStore.isNavOpen is observable — observer() ensures re-renders
  return <nav className={cx({ open: uiStore.isNavOpen })} />;
});
```

---

## Environment Variables

Most environment variables are **server-side only** and are accessed directly via `process.env` in server-side code (API routes, `getStaticProps`, `_document.tsx`). The one exception is `NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY`, which uses the `NEXT_PUBLIC_` prefix so it is bundled and available in the browser for client-side route-change tracking.

Server-side variables (no `NEXT_PUBLIC_` prefix — never exposed to the browser):

```ts
// In API routes, getStaticProps, or _document.tsx (server-only contexts)
const apiKey = process.env.POSTMARK_APIKEY;
const prismicUrl = process.env.PRISMIC_URL;
```

Client-accessible variable (bundled into the browser bundle at build time):

```ts
// Safe to read client-side because GA measurement IDs are inherently public
const gaKey = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY;
```

| Variable                           | Scope            | Purpose                                                      |
| ---------------------------------- | ---------------- | ------------------------------------------------------------ |
| `PRISMIC_URL`                      | Server-only      | Prismic repository URL (e.g. `https://your-repo.prismic.io`) |
| `POSTMARK_APIKEY`                  | Server-only      | Postmark API key for sending contact form emails             |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY` | Browser + Server | Google Analytics measurement ID (e.g. `G-XXXXXXXXXX`)        |

These must be declared in `.env.local` locally and provided as real secrets in production. Do **not** commit `.env.local`.

---

## Dev Workflow

```bash
pnpm install           # Install all dependencies
pnpm dev               # Start dev server at http://localhost:3000 (uses Turbopack by default)
pnpm dev --webpack     # Start dev server with webpack instead of Turbopack
pnpm build             # Production build
pnpm start             # Start production server on port 3000
pnpm lint              # Run ESLint via Next.js lint runner
pnpm exec tsc --noEmit # Type-check without emitting (run this to verify types)
```

---

## Coding Conventions

- **TypeScript strict mode is on.** Every variable, parameter, and return value must be typed. No `any` unless unavoidable and explicitly commented.
- **One component per directory.** Entry point is always `index.tsx`. Sub-components live inside the same directory, not at the `components/` root.
- **Use `cx()` for class names.** Import `classnames` as `cx`. Never use string interpolation or manual concatenation for conditional Tailwind classes.
- **Date utilities only.** Use `utils/date-format.ts` helpers — never `date-fns` directly, never `new Date().toLocaleDateString()`.
- **Dynamic imports in pages.** All component imports in page files must use `dynamic()` from `next/dynamic`.
- **Observer wrapping.** MobX components that read observable state must be wrapped with `observer()` from `mobx-react`.
- **No direct store instantiation.** Always use `useStores()` from `utils/stores`.
- **ISR on all data pages.** Every `getStaticProps` that fetches CMS data must return `revalidate: 60`.
- **No `@/` prefix.** The path alias is bare (`import from "components/foo"`), not prefixed.
- **Type-only imports.** When importing only types, always use `import type` (enforced by ESLint `@typescript-eslint/consistent-type-imports`):

```ts
// ✅ Correct
import type { GetStaticProps } from "next";
import type { Document } from "@prismicio/client/types/documents";

// ❌ Wrong — value import used only as a type
import { GetStaticProps } from "next";
```

- **Unused parameters.** Prefix intentionally unused function parameters with `_` to satisfy the linter:

```ts
// ✅ Correct
hydrate(_data: StoreHydration): void {}

// ❌ Wrong — triggers no-unused-vars error
hydrate(data: StoreHydration): void {}
```

---

## Code Quality Guardrails

Pre-commit hooks run automatically via **Husky** + **lint-staged** on every `git commit`. They will:

1. Run `eslint --fix` on all staged `.ts` / `.tsx` files
2. Run `prettier --write` on all staged `.ts` / `.tsx` / `.js` / `.mjs` / `.json` / `.css` / `.md` files

**CI pipeline** (`.github/workflows/ci.yml`) runs on every push and PR to `main`:

1. `pnpm exec tsc --noEmit` — type check
2. `pnpm lint` — ESLint

If either check fails, the PR is blocked. Fix errors before requesting review.

**ESLint config** lives in `eslint.config.mjs` (flat config format — ESLint 9+). Key rules enforced:

- `@typescript-eslint/consistent-type-imports` — type-only imports must use `import type`
- `@typescript-eslint/no-unused-vars` — unused variables are errors (prefix with `_` if intentional)
- `@typescript-eslint/no-explicit-any` — `any` types are warnings; avoid where possible
- Prettier integration via `eslint-config-prettier` — no formatting conflicts

**Prettier config** lives in `.prettierrc`:

- `semi: true`, `singleQuote: false`, `tabWidth: 2`, `trailingComma: "es5"`, `printWidth: 100`

---

## What NOT to Touch

- **Prismic document type names and query predicate strings** in `prismic-service.ts` — these are contracts with the live CMS. Changing them will break data fetching silently.
- **`PRISMIC_URL` and `POSTMARK_APIKEY` env var names** — these are referenced by name throughout server-side code. Renaming them requires a global search-and-replace.
- **`@/` path alias** — do not introduce it. The project uses bare-path aliases only.
- **Direct Prismic client usage** — always go through `PrismicService`, never instantiate `@prismicio/client` elsewhere.
- **Port 3000** — the production server runs on port 3000 (`pnpm start`). Do not change this without updating any reverse proxy or hosting configuration.
