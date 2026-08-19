You maintain `claude-help-center-thai-deck` — a Thai-language web slide deck (50 slides, static
HTML/CSS/JS, no build step) that summarises Anthropic's official Claude Help Center. Your job today is
a content-accuracy audit against the source documentation.

**Read `CLAUDE.md` in the repo root before touching anything.** It documents the slide contract (four
data-attributes that drive the table-of-contents overlay) and the CSS/JS invariants that each caused a
real bug and that all look like removable duplication. Respect them.

## The one hard rule

`https://support.claude.com/` is the ONLY permitted source of fact. Do not use your own memory, other
Anthropic properties (anthropic.com, docs.claude.com, code.claude.com, the API docs), blog posts,
release notes elsewhere, news, or general search results as evidence for any content change. If a
claim cannot be confirmed on a support.claude.com page today, leave the slide exactly as it is. If you
use WebSearch at all, restrict it with `allowed_domains: ["support.claude.com"]` — and note that a
search snippet is a paraphrase, not article text, so it is never sufficient evidence on its own.

If support.claude.com is unreachable, make no changes at all: no branch, no commit, no PR, no
CHANGELOG entry, no date refresh. Report the blocker plainly and stop. Do not substitute another
source, and do not treat an unverifiable slide as confirmed.

## Read structure, not flattened text

When a claim depends on the membership or the count of a list — how many actions always require
approval, which plans are covered, which permission scopes are requested, which OS versions qualify —
verify it against the page's HTML structure, not against text you have stripped tags from. Look at the
actual `<ul>`/`<ol>` and its `<li>` children.

This is not hypothetical. In the first audit of this deck the run read the Chrome permissions guide as
listing four protected actions and proposed changing the slide from three to four; the `<ul>` in fact
holds three `<li>`, and the supposed fourth item was the `<h3>` heading of the next section, which is
indistinguishable from a bullet once the tags are gone. The slide was already correct. A heading, a
table cell, a sidebar link and a list item all collapse to the same bare line in stripped text — so
for any counted or enumerated claim, go back to the markup.

## Two files restate the deck's facts — keep all three in step

`SPEAKER-NOTES.md` is a rehearsal script for presenting this deck. Its section
*ข้อเท็จจริงที่ห้ามพูดผิด* duplicates five claims that also live in the slides: computer use being
Pro/Max only, Cowork's availability per surface and plan, the scheduled-task plan coverage, artifact
sharing and whose usage it bills, and how quota is shared across surfaces. `README.md` restates the
slide count, the link counts and the audit date.

Whenever a change to `index.html` touches one of those claims, grep `SPEAKER-NOTES.md` for it and fix
it in the same commit — a stale line there gets read aloud to a room, which is worse than a stale web
page. The notes also carry per-slide deep links (`#s14`, `#s19`, …); if slide numbering ever moves,
those move too. Mention any speaker-notes edit in the CHANGELOG entry and the PR body.

## Steps

1. Branch off `main`: `content-refresh/YYYY-MM-DD` using today's date.

2. Collect every cited article:
   `grep -o 'https://support\.claude\.com/en/[^"]*' index.html | sort -u`  (81 URLs as of the last audit).

3. Fetch each one and compare it against what the slide citing it actually claims. Look for:
   - facts that moved: prices, plan availability, minimum OS / app versions, limits and quotas,
     counts, keyboard shortcuts, settings paths, command names, supported IDEs
   - status changes: something labelled beta or research preview becoming generally available, or the
     reverse
   - a URL that no longer returns 200, or that redirects to a different article
   - a materially new capability described inside an already-cited article that its slide should mention

4. Also enumerate the seven collection index pages, looking for genuinely new articles that deserve a
   mention on an existing slide:
   https://support.claude.com/en/collections/4078531-claude
   https://support.claude.com/en/collections/19667525-claude-cowork
   https://support.claude.com/en/collections/14445694-claude-code
   https://support.claude.com/en/collections/16163169-claude-desktop
   https://support.claude.com/en/collections/9387080-claude-mobile-apps
   https://support.claude.com/en/collections/15399129-connectors
   https://support.claude.com/en/collections/18031491-claude-in-chrome

   Two traps here, both already hit on earlier runs:
   - **The page markup carries the site-wide navigation.** Grepping a collection page for
     `/en/articles/` links returns roughly 346 hits — every article in the entire help centre,
     identical for all seven collections — not that collection's contents. Scope to the collection's
     own listing region before drawing any conclusion about what it holds.
   - **Several collections list sub-collections instead of articles.** Claude, Claude Desktop,
     Connectors and Claude Mobile apps all do, through pages such as
     `/en/collections/17879657-desktop-extensions`, `/en/collections/17879441-custom-connectors`,
     `/en/collections/17879307-pre-built-connectors` and their `-general` siblings. Follow those links
     and enumerate them too, otherwise you will report "no new articles" for a collection whose
     articles you never actually read.

5. Apply only what you can cite. Editing rules:
   - Content accuracy only. Do not redesign, restyle, reorder or restructure the deck, and do not
     change the slide count unless a collection genuinely gained or lost a topic.
   - Thai body copy, English technical terms — match the surrounding voice exactly. Product names,
     feature names, UI labels, settings paths and jargon stay in English; avoid transliteration that
     reads oddly (`แอป native`, not `แอปเนทีฟ`).
   - Every slide keeps its `.ref` footer, and any fact you change must still be supported by the link
     cited on that slide. If the supporting article moved, update the link too.
   - Refresh the audit dates ONLY if you actually completed the audit: the `index.html` cover, the
     `index.html` sources slide, and the two dates in README. Grep for the current values rather than
     assuming them.
   - The two asset URLs in `index.html` carry a `?v=` query. Bump it only if you changed
     `assets/style.css` or `assets/deck.js`.

6. Verification suite — run every check and record the result of each, because the merge in step 10 is
   gated on all of them passing:
   - HTML tags balance (parse `index.html` with Python's `html.parser`; assert no unclosed or
     mismatched tags)
   - every `<section class="slide">` still contains a `.ref` footer
   - the slide count still matches the counter placeholder in the dock and the numbers quoted in README
   - every cited URL returns HTTP 200
   If Playwright is available and your edits added text, measure layout against a baseline rather than
   an absolute threshold: stash your changes, measure `main`, restore them, measure again, and require
   that no slide overflows that did not already overflow. Some slides legitimately scroll at high
   zoom; what matters is that you did not make it worse. Check 1512x982 across the zoom levels and
   390x844. If Playwright is not installed, say so and skip only that check.

7. Update `CHANGELOG.md`: insert a new dated section at the top, directly below the `---` separator,
   following the existing house style and categories — `เปลี่ยน` (facts that differ), `เพิ่ม` (new
   content from the source), `ลบ` (things the source removed), `แก้` (broken links, typos, other
   corrections). Write it in Thai to match the file. Every bullet must name the specific fact and link
   the support.claude.com article that proves it. If you considered a change and rejected it on
   inspection, record that too — an existing entry has a `ไม่เปลี่ยน (ตรวจแล้วของเดิมถูก)` section
   showing the format.

8. Update `README.md` if any counts changed (slides, total links, unique URLs) or the audit date
   moved, and `SPEAKER-NOTES.md` if any fact it restates changed.

9. Commit, push the branch, and open a pull request to `main` with `gh pr create`. The PR body must
   summarise what changed, cite the source article for each item, and list the step-6 checks with
   their results.

10. Merge it automatically — but ONLY if every check in step 6 passed. Then run:
    `gh pr merge --squash --delete-branch`
    `main` is published straight to GitHub Pages, so merging puts these edits in front of readers
    within about a minute; that is exactly why the merge is gated on the verification suite instead of
    being unconditional. If any check failed, or you could not run one, do NOT merge: leave the pull
    request open, comment on it saying which check failed and why, and make that the headline of your
    final message. A blocked PR waiting for a human is a good outcome; a merged broken deck is not.

If pushing or opening the PR fails, do not silently drop the work: leave the local branch in place,
say plainly that nothing was published and why, and make that the headline of your final message.

## If nothing changed

If the audit finds no discrepancy, do NOT open a pull request, do NOT commit a date-only change, and
do not leave a branch behind. Finish with a one-line statement that the deck is still accurate as of
today. A weekly stream of empty pull requests is worse than silence.

## If you are unsure

Leave the slide alone. An uncertain edit must not go into the PR at all, because the PR merges itself
— there is no human reading it before it goes live. Note the uncertainty in your final message
instead. The whole value of this deck is that every claim traces back to an official page.

Report honestly at the end: how many URLs you checked, how many changes you made, whether you merged,
and anything you could not verify.
