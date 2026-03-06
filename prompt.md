# Modern Blog Platform — Next.js App (Product + Engineering Prompt)

Build a production-grade, SEO-first blogging platform using the latest Next.js App Router and modern tooling. The application should deliver exceptional performance, accessible UX, consistent editorial controls, and tight integration with Google Drive for image assets. Replace any dummy content with database-backed data. Aim for top-tier Core Web Vitals and robust content discoverability.

## Goals
- High ranking across search engines via technical SEO, structured data, and fast performance.
- Consistent text editing styles: Content, H1, H2, H3, Bold, Italic, Quote, Bulleted, Numbered, Image, Link, Image Left/Right/Center.
- Seamless Google Drive sync to browse, pick, and attach images to posts; proxy safely and optimize delivery.
- PostgreSQL (Neon) backed posts, categories, and users; no dummy data in UI.
- Admin capabilities to create, edit, and feature content with confidence.

## Technology Stack (Latest, SEO-Focused)
- Framework: Next.js (App Router, React Server Components, Server Actions), TypeScript.
- Styling: Tailwind CSS + shadcn/ui for accessible, consistent components.
- Data Layer: Neon PostgreSQL with Drizzle ORM for typed queries.
- Validation: Zod for input and API schema validation.
- Auth: next-auth (Google provider with Drive scopes) + session storage using JWT.
- SEO: Next.js `metadata` API + next-seo (optional) + next-sitemap.
- Content: Markdown-first with React Markdown (remark/rehype), `remark-gfm`, `remark-directive`, `rehype-sanitize` for safe rich content; optional MDX for advanced components.
- Images: next/image with optimized delivery, responsive sizes, and lazy loading.
- State: Server Components + Server Actions; client-side hydration with TanStack Query for admin forms where needed.
- Testing: Playwright (e2e), Vitest + Testing Library (unit/integration).
- Analytics: Vercel Analytics or Plausible.
- Security & Headers: next-safe-middleware, rate limiting (Upstash), CSRF for mutating forms if not using server actions.

## Data Model (Neon / Postgres)
- `posts`
  - `id` (uuid), `title`, `slug` (unique), `excerpt`, `content` (markdown),
  - `cover_image` (text), `images` (jsonb array of strings), `tags` (text[]),
  - `author_name` (text), `category_id` (uuid FK), `category_slug` (indexed),
  - `is_trending` (boolean), `is_featured` (boolean), `read_time` (int), `date` (timestamp default now()).
- `categories`
  - `id` (uuid), `name` (text), `slug` (unique, indexed).
- `users`
  - `id` (uuid), `name`, `email` (unique), `role` (`admin|editor|author`), `photo_url` (text), `bio` (text), `created_at` (timestamp).

Drizzle schema should define relations and indexes. Use migrations for reproducibility.

## Routing & Pages (Next.js App Router)
- Public
  - `/` Home: category sections and latest posts.
  - `/blog/[slug]` Post page: render markdown with images, tags, author, category.
  - `/category/[slug]` Category listing with pagination.
  - `/search` Search posts by title, content, tags.
  - `/sitemap.xml`, `/robots.txt`, and `/.well-known/` as needed.
- Admin (protected via next-auth, role-based)
  - `/admin/posts` List, inline actions (Edit, Feature, Trend, Delete with guard).
  - `/admin/posts/new` New Post form + markdown editor + Drive image picker.
  - `/admin/posts/[slug]/edit` Edit Post with full toolbar and live preview.
  - `/admin/categories` CRUD for categories.
  - `/admin/users` Manage authors/editors; limited to `admin`.

## API Route Handlers (App Router: `app/api/*/route.ts`)
- Posts
  - `GET /api/posts` → list with joined category details.
  - `GET /api/posts/[slug]` → single post with category.
  - `POST /api/posts` → create; validate with Zod; cast `images` to jsonb, `tags` to `text[]`.
  - `PATCH /api/posts/[slug]` → update via COALESCE on changed fields.
  - `DELETE /api/posts/[slug]` → soft delete or hard delete (configurable).
- Categories
  - `GET /api/categories` → list; `{ id, name, slug }`.
  - `POST /api/categories` → create; 409 on duplicate `slug`.
  - `PATCH /api/categories/[id]` → update name/slug.
- Users
  - `GET /api/users` → list.
  - `POST /api/users` → create.
  - `PATCH /api/users/[id]` → profile updates.

All handlers must:
- Use Drizzle prepared statements against Neon; no string concatenation.
- Validate input via Zod; return typed JSON responses.
- Attach `Cache-Control` headers on GET; leverage ISR where pages consume these APIs.

## Editor Requirements (Consistent Styles)
Provide a Markdown-first editor with a clear toolbar mapping:
- Content (paragraph)
- Headings: H1 `#`, H2 `##`, H3 `###`
- Bold `**bold**`, Italic `*italic*`
- Quote `> quoted text`
- Bulleted `- item` (GFM), Numbered `1. item`
- Link `[text](https://url)` with prompt dialog
- Image `![Alt text](https://url)`
- Image Alignment: support Left/Right/Center via directives (markdown-compatible)
  - Syntax: `![Alt](url){.align-left}` / `{.align-right}` / `{.align-center}`
  - Implement with `remark-directive` + custom rehype handler to apply `className` on `<img>` wrappers.
  - Align via Tailwind classes: `.align-left` → `float-left mr-4`, `.align-right` → `float-right ml-4`, `.align-center` → `mx-auto block`.
- Live preview panel side-by-side.
- Sanitize with `rehype-sanitize` to prevent XSS.

If switching to a WYSIWYG is preferred later, use TipTap with Markdown extension, ensuring exported markdown matches the above syntax.

## Google Drive Sync (Attach Images Safely)
Objective: Let authenticated users browse their Google Drive, select images, and insert them into posts without copyright issues (user-owned assets).

Implementation:
1. Auth
   - Configure next-auth Google provider with scopes: `openid email profile https://www.googleapis.com/auth/drive.readonly`.
   - Request `access_type=offline` to obtain refresh tokens (Drive requires long-lived access).
2. Server Integration
   - Use `googleapis` Node client in Next route handlers: `/api/drive/list` (query by folder/mimeType=image), `/api/drive/file/[id]`.
   - Store minimal file metadata on selection: `fileId`, `name`, `mimeType`, `thumbnailLink`.
   - Proxy images through Next (`/api/drive/file/[id]`) to add caching, headers, and optional resizing.
3. UI
   - Modal picker: search, folder browse, thumbnails grid, select → returns public proxy URL, inserts markdown: `![Alt](https://site.com/api/drive/file/<id>)`.
   - Validate mime type is image; show file size and dimensions.
4. next/image
   - Configure remote patterns to allow `/api/drive/file/*`.
   - Apply `sizes` for responsive images; lazy load; set priority for cover images.
5. Compliance
   - Use user’s own Google account assets; no external copyrighted images.
   - Cache with ETag; respect access permissions; never expose raw Drive tokens client-side.

## SEO & Ranking Strategy
- Metadata
  - Use Next `generateMetadata` per route: titles, descriptions, OG/Twitter cards, canonical URLs.
  - Dynamic OG images using `/api/og` for posts.
- Structured Data (JSON-LD)
  - `BlogPosting` on post pages with `headline`, `image`, `datePublished`, `author`, `keywords`.
  - `BreadcrumbList` on posts and categories.
- Sitemaps & Robots
  - `next-sitemap` to generate `sitemap.xml` with ISR-friendly revalidation; robots with `Allow` rules.
- Performance
  - RSC for data fetching; ISR (`revalidate`) for post pages; static home/category with smart revalidation.
  - `next/image` everywhere; defer non-critical scripts; prefetch links.
- Content Hygiene
  - Clean, descriptive slugs; unique titles; internal linking from category and related posts; tag pages optional.
- Accessibility
  - Proper heading hierarchy; alt text for all images; focus-visible; color contrast.

## Admin UX Details
- New Post
  - Title, auto-generated slug preview, Category (from DB), Author (from DB), Tags (comma-separated → `text[]`), Excerpt, Content (Markdown + toolbar), Cover Image (Drive picker), Additional Images (list), Trending/Featured toggles.
  - Submit → creates in Neon; optimistic UI with toast.
- Edit Post
  - Same controls; server action PATCH with COALESCE; maintain read-only fields where applicable.
- Categories
  - Add/Edit with unique slug enforcement; 409 returned on duplicates.
- Users
  - Add/Edit roles; photos via Drive; rich bio.

## Security
- Input validation with Zod on all mutations.
- Sanitize markdown; disallow dangerous HTML.
- Rate limit write endpoints; CSRF token on non-server-action forms.
- Secure headers via next-safe-middleware.
- Use Neon connection options optimized for serverless (fetch connection cache).

## Deployment & Env
- Deploy on Vercel; Neon for Postgres.
- Env vars:
  - `DATABASE_URL` (Neon)
  - `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`
  - `NEXT_PUBLIC_BASE_URL`
- Configure `images.remotePatterns` for `/api/drive/file/*`.

## Testing & QA
- Unit: Vitest + Testing Library for components and utils.
- Integration: route handler tests for validation and DB integration (mock Neon).
- E2E: Playwright flows for admin create/edit/publish and public consumption.

## Migration Notes (Vite → Next)
- Recreate pages in App Router; convert client routes to server components where possible.
- Move Express server logic into Next route handlers; replace ad-hoc SQL with Drizzle.
- Replace `react-query` data hooks with Server Actions / RSC; keep react-query only for select client forms.
- Map existing markdown editor into a `client` component under admin routes.
- Preserve schema and data; write Drizzle migrations.

## Acceptance Criteria
- No dummy data in UI; categories, posts, users all from Neon.
- Editor toolbar matches specified styles and outputs valid markdown with alignment directives.
- Google Drive picker works end-to-end; selected images render via `next/image` through a proxy route.
- All public pages have proper metadata, JSON-LD, and pass basic Lighthouse SEO checks.
- Home and category pages render fast, with ISR and caching headers configured.
- Admin flows are protected and role-based.

## Stretch Enhancements
- RSS feed `/rss.xml` and Atom.
- Related posts by tags and category.
- Content scheduling and drafts.
- Webhooks to pre-render or purge caches on publish.

---
Use this prompt to implement or generate the Next.js application. Ensure choices favor long-term maintainability, security, and top-tier SEO performance.