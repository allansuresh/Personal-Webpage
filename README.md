# allansuresh.com

Personal portfolio + research writing, built with [Astro](https://astro.build).

## Structure

```
src/
  content/
    projects/   ← one .md file per project (shows on /projects/)
    blog/       ← one .md file per post (shows on /blog/)
  pages/        ← routes (index, projects, blog, resume, contact)
  layouts/      ← BaseLayout wraps every page
  components/   ← Header, Footer
  styles/       ← global.css — all design tokens live at the top
public/
  resume.pdf    ← replace with your real résumé (same filename)
  CNAME         ← custom domain for GitHub Pages (allansuresh.com)
```

## Adding a new project

Create a new file in `src/content/projects/`, e.g. `my-new-project.md`:

```md
---
title: "Project Title"
summary: "One or two sentences for the card and page meta."
date: 2026-08-01
stack: ["Inspect AI", "Docker"]
status: active        # active | complete | archived
featured: true         # show on homepage (max 3 shown)
repoUrl: "https://github.com/you/repo"    # optional
demoUrl: "https://..."                     # optional
writeupUrl: "https://..."                  # optional, e.g. a LessWrong post
---

Write the project write-up here in markdown.
```

## Adding a new blog post

Create a new file in `src/content/blog/`, e.g. `my-post.md`:

```md
---
title: "Post Title"
summary: "Standfirst shown on the index page."
date: 2026-08-01
project: my-new-project   # optional — links back to a project entry by filename (no .md)
tags: ["evaluations"]
draft: false               # set true to hide from the site until ready
---

Write the post here in markdown.
```

## Local development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
npm run preview   # preview the production build locally
```

## Deploying (GitHub Pages)

This repo includes `.github/workflows/deploy.yml`, which builds and deploys
automatically on every push to `main`.

**One-time setup:**

1. Push this repo to GitHub, named `allansuresh.github.io` **or** any name —
   the workflow works either way since the custom domain is set via `public/CNAME`.
2. In the repo, go to **Settings → Pages** → set **Source** to
   **"GitHub Actions"**.
3. Still in **Settings → Pages**, confirm **Custom domain** shows
   `allansuresh.com` (it's pre-set via `public/CNAME`, but GitHub needs to
   verify it once). Check **Enforce HTTPS** once available.
4. At your domain registrar (GoDaddy), point DNS at GitHub Pages:
   - Four `A` records for `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record for `www` → `<your-github-username>.github.io`
   - Remove any old GoDaddy-hosting default A/CNAME records.
5. Push to `main`. The Actions tab shows build + deploy progress. DNS
   propagation can take minutes to a few hours.

## Design system

All colors, fonts, and spacing are defined as CSS custom properties at the
top of `src/styles/global.css`. The recurring visual motif is a monospace
"field label" (`.field`, `.tag`, `.dot`) used for status/metadata — echoing
the monitored/unmonitored, status-tagged framing of the eval work itself.
Change the values there to retheme the whole site consistently.

## Known placeholders to replace
- Homepage portrait currently points at the old Imgur-hosted headshot —
  swap the `src` in `src/pages/index.astro` once you have a new photo
  (drop it in `public/images/` and reference it as `/images/filename.jpg`).
- A few project entries have commented-out `repoUrl` lines — fill in real
  GitHub links once repos are public.
