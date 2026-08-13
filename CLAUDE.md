# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page Thai-language web slide deck (50 slides) summarising the seven official
[Claude Help Center](https://support.claude.com/en/) collections. Static HTML/CSS/JS — no build step, no
dependencies, no external fonts or CDN requests. Deployed via GitHub Pages from `main` root:
https://suphakornp.github.io/claude-help-center-thai-deck/

Three files carry everything: `index.html` (all 50 slides as static markup), `assets/style.css`
(design system + responsive + print), `assets/deck.js` (navigation controller).

## Running and verifying

There is nothing to build, lint, or test. Open `index.html` directly, or serve it:

```bash
python3 -m http.server 8000
```

**When verifying changes in a headless browser, serve with caching disabled.** `http.server` sends
`Last-Modified`, so Chrome answers with 304 / memory-cache and you will spend cycles debugging a stale
`style.css` or `deck.js` that no longer matches the file on disk. Two specific traps:

- Navigating to a URL that differs only by `#hash` is a same-document navigation — the document, CSS
  and JS are **not** re-fetched. Change the query string (`?rev=2`) to force a real reload.
- Force-reloading only the stylesheet (rewriting `link.href`) leaves stale JS in place. If the DOM
  lacks something `deck.js` should have injected, suspect cache before suspecting the code.

The deck has no test suite; verify by driving the page and asserting layout invariants instead of
eyeballing screenshots. The checks worth re-running after any structural or copy change:

- every slide has a `.ref` footer (`slides.filter(s => !s.querySelector('.ref'))` must be empty)
- no slide overflows: `scrollHeight - clientHeight` and `scrollWidth - clientWidth` ≈ 0 at 1512×982
- at 390px wide, no `.ref` sits below `.dock`'s top edge, and `document.body.scrollWidth === innerWidth`
- `Home` / `End` / a menu jump land on an exactly-aligned `scrollLeft` matching the counter

Reference links are the deck's core promise. To re-check them all:

```bash
grep -o 'https://support\.claude\.com/en/[^"]*' index.html | sort -u | while read -r u; do printf '%s %s\n' "$(curl -s -o /dev/null -w '%{http_code}' -L "$u")" "$u"; done | grep -v '^200'
```

## Slide contract

Each slide is a `<section class="slide">` with four attributes that `deck.js` reads at boot:

| attribute | drives |
|---|---|
| `id="sN"` | deep link (`#s17`) and boot position; must stay sequential with DOM order |
| `data-chapter="0..7"` | accent colour (`--c1..--c7`); `0` = cover/chapter-less |
| `data-group` | menu section heading — **consecutive slides sharing a value form one group** |
| `data-nav` | menu row label |

The table-of-contents overlay is built entirely from these attributes, so adding a slide means
inserting the `<section>` in the right position and nothing else. Slide count is read from the DOM;
the `01 / 50` in the dock markup is only a pre-JS placeholder.

Chapter dividers additionally carry `class="slide chapter"`. Content elements marked `.reveal` get a
staggered entrance; `deck.js` assigns each one a `--i` index, so ordering is positional.

## CSS invariants that will silently break the deck

These four were each the cause of a real bug. They look like cleanups; they are not.

1. **`--accent-soft` / `--accent-line` are declared on `.slide` (style.css:82), not only `:root`.**
   A custom property substitutes `var(--accent)` using the computed value *on the element where it is
   declared*. Declared only in `:root`, every chapter renders chapter 1's terracotta regardless of its
   `data-chapter`. The `:root` copies at style.css:29 are inert leftovers — do not "de-duplicate" by
   deleting the `.slide` block.

2. **`.deck` must not set `scroll-behavior: smooth`.** `deck.js` picks smooth (adjacent step) vs instant
   (multi-slide jump) per call, and `behavior: 'auto'` defers to the CSS value. With CSS smooth, an
   `End` press animates across ~50 slides while the scroll-sync handler rewrites `index` mid-flight, so
   the counter and the visible slide desync.

3. **`.inner` centres with `margin: auto`, not `justify-content: center` on `.slide`.** Flex centring
   pushes overflow past the scroll origin, making the top of a long slide unreachable. `margin: auto`
   centres when there is room and degrades to normal scrolling when there isn't.

4. **Slide bottom padding is `--dock-h + 30px + env(safe-area-inset-bottom)`.** Less than that and the
   per-slide reference links disappear under the floating dock on phones.

Related: `deck.js` disables `scroll-snap-type` for the duration of a programmatic jump, because
`scroll-snap-stop: always` (needed so touch swipes advance one slide at a time) otherwise halts the
scroll at the very next snap point.

## Content conventions

- **Thai body copy, English technical terms.** Product names, feature names, UI labels, settings paths
  and jargon (`connector`, `sandbox`, `usage limit`, `research preview`) stay in English. Transliteration
  is avoided where it reads oddly — `แอป native`, not `แอปเนทีฟ`.
- **Every slide ends with a `.ref` footer** linking to the specific support.claude.com article the slide
  paraphrases — including the cover and the seven chapter dividers, which link to their collection.
- **Facts come from the source article, never from memory.** Plan availability, prices, OS minimums and
  research-preview status change; when editing a claim, re-fetch the linked article and mirror it.
  Features the source marks beta / research preview are labelled as such in the slide.
- Thai display type needs a taller line box than Latin — upper vowels and tone marks (`ใช้`, `ให้`) clip
  at the tight line-heights that look right for English. Headings sit at 1.18–1.32.
- Wide tables live in `.tblwrap` (`min-width: 560px`) and scroll inside themselves; `deck.js` appends a
  Thai scroll hint to any wrapper that actually overflows.

## Deploying

`main` is served directly by GitHub Pages (root, no workflow). Pushing to `main` publishes; a rebuild
takes roughly 20–40s. Asset URLs carry `?v=1.0` — bump both in `index.html` when shipping a CSS or JS
change, or returning visitors keep the cached copy.
