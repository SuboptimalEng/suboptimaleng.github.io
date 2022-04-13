# 🗿 Gamedex Setup Guide

## Gamedex.dev Homepage

- update gamedex website and link to game example

  - Frantic Architect
  - code, video

## Individual Game

### GitHub README Format

- 🗿 Game Name
- < screenshot >
- Description - Demo (link)
  - 3-4 statements
- Updates
  - v0.2 updates
  - v0.1 updates
- TODO
  - list of future updates

### GitHub Checklist

- About - 🗿 Game Name
- tags

### Code

- properly import tailwind css

- link to gamedex.dev home page in each game

- enforce https (should happen automatically)

- set up title and meta tags

```
<title><GAMENAME> | Gamedex</title>
<meta property="og:title" content="<GAMENAME> | Gamedex" />
<meta
  property="og:image"
  content="https://suboptimaleng.github.io/gdx_channel_art.png"
/>
<meta
  property="description"
  content="3D game dev experiments built for the web with Three.js and React. Maintained by (Indian Software Engineer + YouTuber) SuboptimalEng."
/>
```

- index.html - gtag script

```
<script
    async
    src="https://www.googletagmanager.com/gtag/js?id=<GTAG_ID>"
></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag() {
    dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', '<GTAG_ID>', {
    page_path: window.location.pathname,
    });
</script>
```

- vite config

```
export default defineConfig({
  base: '/frantic-architect/',
  plugins: [react()],
});
```

- deploy steps

```
npm run build
git add dist -f
git commit -m "Update dist folder."
git subtree push --prefix dist origin gh-pages
```
