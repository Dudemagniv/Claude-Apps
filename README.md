# Claude Apps

A monorepo: one GitHub repo hosting multiple small web apps, each deployed as
its own Netlify site. Every `git push` to `main` auto-builds and redeploys
whichever app(s) changed — no manual drag-and-drop uploads.

## Structure

Each app lives in its own subfolder with its own `netlify.toml`:

```
Claude Apps/
  modlist-manager/
    index.html
    netlify.toml
  <next-app>/
    index.html
    netlify.toml
```

Each subfolder is connected to Netlify as a separate site, using that
subfolder as the site's **base directory**. Sites don't interfere with each
other — they just share one repo.

## Adding a new app

One-time, per machine: install [Node.js](https://nodejs.org), then the
Netlify CLI:
```bash
npm install -g netlify-cli
netlify login
```
(`login` opens a browser once to authorize the CLI — after that no more
dashboard visits are needed.)

For every new app:
```bash
mkdir new-app-name
cp your-app.html "new-app-name/index.html"
cp modlist-manager/netlify.toml new-app-name/netlify.toml   # reuse/adjust
git add new-app-name
git commit -m "Add new-app-name"
git push
cd new-app-name
netlify init
```
`netlify init` creates the Netlify site, links it to this repo, sets the
base directory to the current folder, and picks up build settings from
`netlify.toml` — answer its 2-3 prompts and it's live. From then on, pushes
to `main` that touch `new-app-name/` redeploy it automatically.

## netlify.toml

Default assumes a plain static site (no build step) served from the
subfolder root. If an app uses a bundler, update `command` and `publish`
accordingly, e.g.:

- Vite: `command = "npm run build"`, `publish = "dist"`
- Create React App: `command = "npm run build"`, `publish = "build"`
- Next.js (static export): `command = "npm run build"`, `publish = "out"`

## GitHub Pages

Some apps are also published on GitHub Pages by `.github/workflows/pages.yml`,
on every push to `main`:

- guitar-inversions → https://dudemagniv.github.io/Claude-Apps/guitar-inversions/

To publish another app there, add its folder name to `PAGES_APPS` in the
workflow. (One-time repo setting: Settings → Pages → Source: **GitHub Actions**.)

## Deploy previews for pull requests

Netlify does this automatically once a site is connected — every PR touching
that site's subfolder gets its own preview URL, no extra config needed.
