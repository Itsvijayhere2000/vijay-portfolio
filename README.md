# Vijay Rajan — Portfolio

Personal portfolio built with plain HTML5, CSS3 and vanilla JavaScript. No framework, no build step, no npm,no packages.

## Run

Open `index.html` in a browser. That's all.

Fonts (Inter, JetBrains Mono) load from Google Fonts; offline, the page falls back to system fonts.

## Structure

```
vijay-portfolio/
  index.html        markup for every section
  css/style.css     design tokens, components, responsive rules
  js/script.js      nav, scroll reveal, typing effect, footer year
  assets/
    icons/          favicon.svg
    images/         (empty — og:image etc.)
    resume/         (empty — put the resume PDF here)
```

## Placeholders to replace

- **Resume**: `assets/resume/Vijay-Rajan-Resume.pdf` is a placeholder. Overwrite it with the final PDF (same file name, no HTML change needed).
- `[ADD TECH STACK]`: search `index.html` for this and add the technology tags to the Event Management System project card.

Also:

- **Personal Project card** (Projects section) is a "Coming Soon" placeholder.
- **Open Graph**: add `og:url` and `og:image` in `<head>` once the site is hosted.
- **Favicon**: `assets/icons/favicon.svg` is a simple "VR" monogram.

## Customising

- **Colours**: edit the variables at the top of `css/style.css`. `--accent`, `--accent-soft` and `--accent-border` control the accent everywhere.
- **Terminal text**: edit the `.terminal__line` elements in `index.html`; the typing effect picks up whatever is there.
- **Nav links**: a link is highlighted automatically when its `href="#id"` matches a section `id`.

Animations are disabled when the visitor has `prefers-reduced-motion` enabled.
