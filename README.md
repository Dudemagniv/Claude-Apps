# Netlify Web App Template

A reusable starting point: git repo + `netlify.toml` already configured so that
**every `git push` to `main` auto-builds and deploys to Netlify** — no manual
drag-and-drop uploads.

## One-time setup (do this once per new web app)

1. **Copy this folder** for your new project (or use it as a GitHub "template
   repository" — see below — to start with clean history).
2. Replace `index.html` with your actual app, and update `netlify.toml` if
   you're using a bundler (Vite, CRA, Next static export — see comments in
   the file).
3. Create a new GitHub repo and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
4. On [app.netlify.com](https://app.netlify.com): **Add new site → Import an
   existing project → GitHub** → pick the repo → confirm build settings (they
   auto-fill from `netlify.toml`) → **Deploy**.

That's it — Netlify is now watching the repo. From then on:

```bash
git add .
git commit -m "..."
git push
```

...and the live site updates automatically, no manual step.

## Making this an actual GitHub template repo (recommended)

Push this folder to GitHub once, then in the repo's **Settings → General →
Template repository**, check the box. After that, "Use this template" on
GitHub gives you a fresh copy with no shared git history for every new app —
repeat step 4 above to connect each new repo to Netlify.

## Optional: deploy previews for pull requests

Netlify does this automatically once the repo is connected — every PR gets
its own preview URL, no extra config needed.
