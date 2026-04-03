# sofusskovgaard.com

Personal portfolio website for Sofus Skovgaard. Showcases work experience, education, and a blog, with a contact form powered by Postmark. Content is managed via Prismic CMS and served through Next.js with Incremental Static Regeneration (ISR).

---

## Prerequisites

- **Node.js** 22+
- **pnpm** 9+

---

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/sofusskovgaard/sofusskovgaard.com.git
cd sofusskovgaard.com

# 2. Install dependencies
pnpm install

# 3. Configure environment variables
#    Create a .env.local file in the repo root and populate it with the
#    variables listed in the Environment Variables section below.
#    See that section for the full list of required keys.
cp .env.local .env   # or create the file manually in your editor

# 4. Start the development server
pnpm dev
```

The dev server starts at **http://localhost:3000**.

---

## Environment Variables

All variables must be added to `.env.local` locally; provide them as secrets in production. Do **not** commit `.env.local`.

`PRISMIC_URL` and `POSTMARK_APIKEY` are **server-side only** — they have no `NEXT_PUBLIC_` prefix and are never sent to the browser. `NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY` uses the `NEXT_PUBLIC_` prefix so it is bundled client-side for route-change tracking (GA measurement IDs are inherently public).

| Variable                           | Description                                                      |
| ---------------------------------- | ---------------------------------------------------------------- |
| `PRISMIC_URL`                      | Prismic repository URL (e.g. `https://your-repo.prismic.io`)     |
| `POSTMARK_APIKEY`                  | Postmark API key used by the `/api/contact` route to send emails |
| `NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY` | Google Analytics measurement ID (e.g. `G-XXXXXXXXXX`)            |

Example `.env.local`:

```dotenv
PRISMIC_URL=https://your-repo.prismic.io
POSTMARK_APIKEY=your-postmark-server-api-key
NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY=G-XXXXXXXXXX
```

---

## Architecture

| Concern          | Choice                                     | Notes                                                                                                                   |
| ---------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Framework**    | Next.js 16 (Pages Router)                  | ISR (`revalidate: 60`) on all data-fetching pages keeps content fresh without a full rebuild                            |
| **Content**      | Prismic CMS                                | Bio, blog posts, work experience, and education are all managed in Prismic and fetched via a singleton `PrismicService` |
| **Client state** | MobX 6 + mobx-react 9                      | Manages UI state (navbar, contact form) through a `RootStore` accessed via the `useStores()` hook                       |
| **Styling**      | Tailwind CSS 3 + `@tailwindcss/typography` | Utility-first; `prose` classes are available for Prismic rich-text content                                              |
| **Email**        | Postmark                                   | The `/api/contact` API route validates the request body and sends transactional email via Postmark                      |
| **Analytics**    | Google Analytics (`gtag`)                  | Injected server-side in `_document.tsx`; the measurement ID is read from `process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_KEY` |

---

## Available Scripts

| Command      | Description                                                                                  |
| ------------ | -------------------------------------------------------------------------------------------- |
| `pnpm dev`   | Start the development server at http://localhost:3000 with hot reload (Turbopack by default) |
| `pnpm build` | Compile a production build                                                                   |
| `pnpm start` | Serve the production build on **port 3000**                                                  |
| `pnpm lint`  | Run ESLint across the codebase via the Next.js lint runner                                   |

---

## Deployment

Run a production build and start the server:

```bash
pnpm build
pnpm start  # listens on port 3000
```

Ensure your reverse proxy or hosting environment forwards traffic to port 3000.
