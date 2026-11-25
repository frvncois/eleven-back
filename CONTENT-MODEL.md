# Eleven — Strapi content model

**Decisions locked:** all content and media in Strapi · **layout geometry is not content** and lives in
`eleven-front/lib/layout.ts` · EN only, no i18n plugin · Strapi Cloud + Vercel.

> Coordinates were in Strapi at first and came back out: nobody places a tile on a 4975 × 3598 field,
> or crops a room photo, by typing numbers into a CMS. Geometry now lives in `lib/layout.ts`, joined
> to this content by slug (archive tiles, wedge names) or by order (rooms, party pictures). Sizes that
> are only a file's own pixel dimensions are read off the upload by the pull script, so replacing a
> picture keeps its proportions.

Source today: `eleven-front/data/*.json` (9 files, ~61 KB, 26 import sites) plus ~60 strings
hardcoded in components. `eleven-back/src/api` is empty — nothing exists yet.

**Shape:** 2 collection types · 9 single types · 16 components · 161 media files.

---

## 1. Collection types

### 1.1 `Project` — `api::project.project` · 66 entries

`projects.json` merged with `index.json.tiles` (1:1 by slug, all 66 match).

| Field | Type | Notes |
|---|---|---|
| `slug` | uid (target `title`) | required, unique |
| `title` | string | "Lucid - Driven" |
| `short` | string | "Driven" — card + player label |
| `client` | string | "Lucid" |
| `agency` | string | nullable → player credit row "Agency" |
| `director` | string | nullable → "Director" |
| `production` | string | nullable, longform only → "Production" |
| `description` | text | nullable, longform only |
| `kind` | enum `spot` \| `longform` | 48 spots / 18 longform |
| `mixer` | relation manyToOne → `Team` | all 48 spots (9/9/9/6/6/9) **+ 12 longform credited to Jordan**; 6 longform uncredited |
| `duration` | integer (s) | always set |
| `previewStart` | integer (s) | all 48 spots; null on longform |
| `vimeo` | string | full private URL incl. `/hash` |
| `vimeoId` | string | |
| `poster` | media (single image) | required |
| `onLanding` | boolean | JSON has `true`/`false`/`null` → default `false` |
| `order` | integer | replaces array position (mixer spot order) |
| `archiveTile` | component `work.archive-tile` | required, non-repeatable |

**`work.archive-tile`** — the tile's labels and its place in the order:
`order` int · `label` string · `clientLabel` string
(where it sits on the field is `ARCHIVE_TILES` in `lib/layout.ts`, by slug)

> `label` / `clientLabel` are deliberate overrides: **26 of 66** differ from the project's own
> `short` / `client` (e.g. slug `comfortable-sb-social-web-mix-16x9-titled` → "Comfortable" /
> "Uber Eats"). `app/(site)/archive/page.tsx` already overwrites both with the tile's values.

### 1.2 `Team` — `api::person.person` · 7 entries

> Shown as **Team** in the admin. The API id stays `api::person.person` (`/api/people`), so endpoints,
> relations and the pull script are untouched — renaming those would move the table for no gain.

`team.json` + the About team-bar presentation (`about.json.team.rows`). The Mixers-banner
coordinates stay in `MixersBanner.tsx` (`NAMES` / `ICONS`), beside the wedge geometry they are tuned to.

| Field | Type | Notes |
|---|---|---|
| `slug` | uid | required, unique |
| `name` | string | |
| `role` | string | "Sound Designer / Mixer" |
| `email` | **string** (not `email`) | nullable — only Jordan + Adrea; see the placeholder note below |
| `instagram` | string | nullable |
| `linkedin` | string | nullable |
| `isMixer` | boolean | 6 true, 1 false (Adrea) |
| `order` | integer | **replaces the hardcoded `MIXER_ORDER` array in `lib/content.ts`** |
| `photo` | media (image) | nullable — Adrea has none |
| `icon` | component `people.icon` | nullable — `name`, `white` media, `black` media |
| `teamBar` | component `people.team-bar` | `bg` enum, `ink` enum, `roles` repeatable `people.role` |

> **Adrea's details are TBC placeholders** written as `"[Role]"` and `"[adrea@elevensound.com]"`.
> The site shows the brackets verbatim and strips them only for the `mailto:` href, so the brackets
> are meaningful content — `email` is therefore a plain `string`, not Strapi's `email` type, on both
> `Team` and `shared.person-contact`.
>
> `teamBar.roles` ≠ `role` — Jordan is Partner / Sound designer / Mixer on the About bar but
> `"Sound Designer / Mixer"` elsewhere. Both kept.
> The wedge's name and icon spots are hand-tuned against its fixed geometry (lower edge
> 179.7 → 581.9), where moving one overlaps the diagonal — which is why they are code
> (`MixersBanner.tsx`), not fields.

---

## 2. Single types

### 2.1 `Site Settings`
From `site.json` (nav, footer, player) + `app/layout.tsx` metadata.

- `nav` — repeatable `shared.nav-item` ×5: `key` enum, `label`, `href`, `match`, `color` enum,
  plus this page's own two sounds, each media (audio, many):
  — `hoverSound`: hovering this link in the nav (`NavBar.tsx`; on the phone, opening the Mixers
    drawer)
  — `transitionSound`: the sweep that *lands on* this page, so clicking through to Archive can
    sound different from clicking through to About. Matched the way the sweep picks its colour —
    the link whose `match` is the longest prefix of the destination (`PageTransition.tsx`,
    `lib/sound.ts` `sweepSound`)
  Several files in one field are *takes*: one at random per play, never the same twice in a row. An
  empty field plays the kit bundled in `public/sounds` (`lib/sound.ts` `CUES`), so the site always
  has sound even before any of this is filled.
  The other cues — the button click, menu open, the gate count, the About plucks, the Longform
  notes, the Archive/Mixers scramble — stay in `lib/sound.ts`. The click is global (every button,
  `ClickSound.tsx`), so there is nothing to split it by.
- `footer` — `site.footer`:
  `copyright` ("©2026 Eleven") · `legal` repeatable `shared.link` ×1 · `creditsLabel` ("Credits") ·
  `credits` repeatable `shared.credit` ×2 · `social` repeatable `shared.social-link` ×2
- `player` — `site.player-labels`: `play`, `pause`, `close`
- `seo` — `shared.seo`: `defaultTitle` ("Eleven") · `titleTemplate` ("%s · Eleven") ·
  `description` · `siteName` · `locale` ("en_US") · `themeColor` ("#fdfcfc") ·
  `ogImage` + `ogImageAlt` · `twitterImage` + `twitterImageAlt`

> ⚠️ **`key` / `platform` fields are new and load-bearing.** `MenuCard.tsx:78,82` branches on
> `item.label === "Mixers"` and `:26` finds the social link by `x.label === "Instagram"`. Once
> labels are editable, matching on them breaks. Add `nav-item.key`
> (`mixers`\|`archive`\|`longform`\|`about`\|`contact`) and `social-link.platform`
> (`linkedin`\|`instagram`) and branch on those instead.

### 2.2 `Home Page` — from `home.json`
- `gate` — `home.gate`: `line1` · `line2` (two inputs, not a JSON array) · `cursor` · `skip` ·
  `hint` · `tap` text (contains `\n`)
  — the count's ten words stay in `GateLoader.tsx`: the loader counts to ten in English and its
  timing is tuned to exactly ten steps, so there is nothing there to edit
- `reel` — `shared.video`: `src` media (mp4) + `poster` media
- `reelPhone` — `shared.video`: the 9:16 cut
- `wordmarkAlt` string ("Eleven") · `logoAriaLabel` ("Eleven, back to the sound gate")

### 2.3 `About Page` — from `about.json` (the largest)
- `story` — `about.story`:
  - `intro` text
  - `paragraphs` repeatable `about.story-paragraph` ×2: `text` (holds `{01}` note markers),
    `note` → `shared.note`
  - `sticker` → `shared.sized-image` (now just `image` + `alt`; both pages draw it at their own size)
  - `globe` → `about.globe`: `image` media · `alt` ("Snow globe of the old Santa Monica studio") ·
    `note` → `shared.note` — its proportions come off the upload
- `servicesLabel` ("services") · `services` repeatable `about.service` ×6:
  `name` · `note` (holds `[[hotword]]` markers) · `sounds` repeatable `about.service-sound`
  → **`about.service-sound`** = `word` + `files` (media, multiple). A service can carry **several**
  hotwords — "Sound Design" has three ("boom", "splash", "vroom"), each with its own takes — and
  `sound.play()` takes an array and picks a random take. This replaces the page-level
  `services.sounds` word→file map, scoping each sound to the service that uses it.
- `teamSection` — `about.team-section`: `label` ("These are our humans") ·
  `members` repeatable `about.team-member`: relation → `Team` + `row` int (rows of 4 and 3)
- `rooms` — repeatable `about.room` ×5: `name` ("Studio C · Outside") · `photo` media ·
  `preset` enum `studio`\|`lobby`\|`outside` · `audio` media (nullable, all 5 null today)
  — card heights are designed crops, `ROOM_HEIGHTS` in `lib/layout.ts`, in this order
- `contactCta` — `about.contact-cta`: `title` · `line` · `aside` · `cursor` ("contact us") · `href`

**`shared.note`**: `n` ("01") · `text` (may hold `[[…]]`) · `photo` media (nullable) · `photoAlt`
— the photo's width/height come off the upload

### 2.4 `Legal Page` — from `legal.json`
- `title`
- `sections` repeatable `legal.section` ×3: `sectionId` ("privacy") ·
  `label` ("01  Privacy" — **the double space is significant**, rendered `whitespace-pre`) ·
  `paragraphs` repeatable `shared.paragraph` · `note` (nullable; effective date on §01)

### 2.5 `Contact Page` — from `site.json.contact`
- `title`
- `image` media + `imageAlt` ("Dr. Steve Brule holding a microphone") — *both hardcoded in the page today*
- `people` repeatable `shared.person-contact` ×2: `name`, `role`, `email`, `phone` (nullable)
- `studio` — `contact.studio`: `label` ("Studio") · `line1` ("2255 Barry Avenue") · `line2`
  ("Los Angeles, CA 90064") · `map` url · `phone`
- `reps` — `contact.reps`: `label` ("Rep") · `people` repeatable `shared.person-contact` ×2

> ⚠️ The page destructures `contact.people` as `[jordan, adrea]` and drops them into fixed grid
> columns (`left-col-6` / `left-col-8`). Order matters and the layout assumes **exactly 2**.
> Same for `reps.people` (`i ? left-col-8 : left-col-6`). Set min/max 2 on both.

### 2.6 `Archive Page`
- `ariaLabel` ("Archive, drag to explore") — not pulled; the front uses `ui.regions.archiveDrag`
- (the field's size is `ARCHIVE_FIELD` in `lib/layout.ts`; the tiles' labels live on `Project.archiveTile`)

### 2.7 `Longform Page` — from `longform.json`
- `films` repeatable `longform.film` ×10, ordered: relation → `Project` ·
  `label` ("HP · Wake Up") · `color` enum · `objectPosition` (nullable, "64% 50%")

> Curated list, not all longform: **10 of the 18** `kind: longform` projects appear here; the
> other 8 only show in the Archive.

### 2.8 `Party Mode` — from `party.json` (easter egg)
- `items` repeatable `party.item` ×6: `image` media · `bg` enum ·
  `video` media (nullable) · `audio` media (nullable)
- `ariaLabel` ("Easter egg") · `closeCursor` ("close")

> Which corner each picture opens in and how wide it runs is `PARTY_PLACEMENT` in `lib/layout.ts`,
> in this order; the shape comes off the picture itself. Item 5's `y` of `0.1878` — a decimal share of
> the frame height — is why this was never a sensible field.

### 2.9 `UI Labels` — new; the ~60 strings currently in components

| Group | Fields |
|---|---|
| `views` | `list` ("List"), `grid` ("Grid") — used in 4 files |
| `dock` | `menu` ("Menu"), `close` ("Close"), `sound` ("Sound"), `on`, `off` |
| `gate` | `soundAria` ("Sound"), `skipAria` ("Continue without sound"), `onAria` ("Turn sound on") |
| `cursors` | `play`, `close`, `listen`, `clickMe` ("click me") |
| `credits` | `mixerTbc` ("Mixer to confirm"), `roleMix` ("Mix"), `roleMixSound` ("Mix / Sound design"), `roleAgency`, `roleProduction`, `roleDirector` |
| `player` | `seek` ("Seek"), `nextFilm` ("Next film"), `play`, `pause` |
| `regions` | `main` ("Main"), `projects` ("Projects"), `films` ("Films"), `mixers` ("Mixers"), `closeMenu` ("Close the menu"), `homeAria` ("Eleven, home") |
| `notFound` | `title` ("Sorry we lost you.") |
| `error` | `title` ("Oops"), `body` ("Something on this page went wrong."), `cta` ("Back to the homepage") |

---

## 3. Components (16)

| Component | Fields | Used by |
|---|---|---|
| `shared.link` | `label`, `href` | footer legal |
| `shared.social-link` | `platform` enum, `label`, `href` | footer social |
| `shared.nav-item` | `key` enum, `label`, `href`, `match`, `color` enum, `hoverSound`, `transitionSound` media | site nav |
| `shared.credit` | `name`, `role`, `href` | footer credits |
| `shared.person-contact` | `name`, `role`, `email` (string), `phone` | contact people + reps |
| `shared.note` | `n`, `text`, `photo` | about story ×2 + globe |
| `shared.sized-image` | `image`, `alt` | sticker |
| `shared.video` | `src`, `poster` | home reel ×2 |
| `shared.paragraph` | `text` | legal |
| `shared.seo` | see §2.1 | site settings |
| `work.archive-tile` | `order`, `label`, `clientLabel` | Project |
| `people.icon` | `name`, `white`, `black` | Team |
| `people.team-bar` | `bg`, `ink`, `roles` → `people.role` | Team |
| `people.role` | `label` | one row per role on a team bar |

*(plus the single-use page components named inline in §2: `site.footer`, `site.player-labels`,
`home.gate`, `about.*` ×6, `legal.section`, `contact.*` ×2, `longform.film`, `party.item`)*

### Shared color enum — from `app/globals.css`
`aqua` `red` `pink` `purple` `yellow` `royal-blue` `bright-green` `dark-green` `light-grey`
`ink` `bg` `neutral-0` `neutral-300` `neutral-1000`

In use: nav (5) · longform (9) · team bars (`bg` 7, `ink` 2) · party (`bg` 6).

---

## 4. Media — all 161 files into the Strapi Cloud library

| Folder | n | Target |
|---|---|---|
| `media/work` | 48 | `Project.poster` (spots) |
| `media/longform` | 18 | `Project.poster` (longform) |
| `media/icons` | 12 | `Team.icon` (white + black pairs) |
| `media/team` | 6 | `Team.photo` |
| `media/studio` | 5 | `About.rooms[].photo` |
| `media/party` | 7 | `PartyMode.items[].image` |
| `media/home` | 4 | `Home.reel` + `reelPhone` (mp4 + webp poster) |
| `media/about` | 3 | sticker, snow globe, hot-dog note photo |
| `media/contact` | 1 | `Contact.image` (gif) |
| `sounds/eleven` | 42 | 8 → `About.services[].sound`; 34 (plucks, longform notes) → §5 |
| `sounds/placeholder-auge` | 15 | → §5 |

**Consequences of the Strapi Cloud library:**
- `next.config.ts` needs `images.remotePatterns` for the Strapi Cloud media host.
- Posters are `next/image`-able; the `.gif`, `.mp4` and `.m4a` files are served as plain URLs.
- The gif and the `<img>` tags in About/Contact already bypass `next/image` (`eslint-disable
  @next/next/no-img-element`), so they just take the absolute URL.

---

## 5. Stays in code

Everything editorial is in Strapi. What's left is engine and geometry:

- **`lib/sound.ts` `CUES`** — the UI sound engine: 9 cues × takes, each with a synthesized
  Web Audio fallback (`tone`/`whoosh` with frequency + duration args). The 57 files under
  `sounds/placeholder-auge` and the pluck/longform sets in `sounds/eleven` are bound to this
  engine, not to any page. Staying in `/public`.
- **Layout math** — `lib/grid.ts`, `lib/motion.ts`, `lib/perspective.ts`, the `WEDGE` geometry,
  `TEAM_WORD_CELLS`, the per-page `L` objects, `SCALE_BEFORE_PAINT`.
- **`PacificClock`** — an `Intl.DateTimeFormat` on `America/Los_Angeles`, no copy.
- **`components/dev/ReviewNotes.tsx`** — dev-only (`NODE_ENV === "development"`), ~15 strings
  that never ship.
- **Fonts** (`public/fonts`, 4) and the `app/` icon/favicon files.

---

## 6. Deployment — Strapi Cloud + Vercel

The front is fully static: `generateStaticParams` + `dynamicParams = false` on
`/mixers/[slug]`, `sitemap.ts` derived from the mixer list.

Recommended:
1. **Build-time fetch.** One typed client (`lib/strapi.ts`) with `fetch(..., { cache: "force-cache" })`,
   replacing each `@/data/*.json` import. `lib/content.ts` keeps its API (`mixers`,
   `mixerBySlug`, `spotsOf`, `splitCaption`) so components don't change.
2. **Rebuild on publish.** Strapi Cloud webhook (`entry.publish` / `entry.unpublish` /
   `media.*`) → Vercel Deploy Hook.
3. **Read-only API token** (Strapi Cloud → Settings → API Tokens) in
   `STRAPI_API_TOKEN` + `STRAPI_URL` on Vercel. Server-side only — not `NEXT_PUBLIC_`.
4. **Draft & Publish on** for `Project`, `Team` and all 9 single types. Published-only at
   build; optionally a Vercel preview env that reads drafts (`?status=draft`).
5. **`lib/archive-preload.ts`** dynamically `import()`s the two biggest JSON files to keep them
   off the first load — the generated static props need the same treatment (it's ~45 KB of the 61 KB).
6. Drop `netlify.toml`; move its `X-Robots-Tag` block to `vercel.json` headers, keeping the
   `INDEXABLE` / `NEXT_PUBLIC_SITE_URL` logic in `lib/site.ts` as-is.

---

## 7. Content conventions to preserve

These are plain-text markers the front parses. Keeping them as conventions in plain
long-text fields (no rich text), documented in each field's help text:

| Marker | Where | Parsed by |
|---|---|---|
| `{01}` | About story paragraphs | `NoteNumber` / `StoryText` |
| `[[hotword]]` | About service notes + story notes | `ServiceText`, `NoteText` — triggers the sound |
| ` · ` | Longform labels, "Client · Title" | `splitCaption` in `lib/content.ts` |
| `\n` | `home.gate.tap` | rendered as two lines |
| `01  Privacy` (2 spaces) | Legal section labels | `whitespace-pre` |

---

## 8. Migration order

1. Scaffold the components, then `Team` → `Project` (relation direction matters).
2. Scaffold the 9 single types.
3. Upload the 104 images/videos + 8 service sounds; keep a `filename → Strapi id` map.
4. Seed script (`eleven-back/scripts/seed.ts`) reading the 9 JSON files through the map.
5. Front: add `lib/strapi.ts`, swap the 26 `@/data/*` import sites, delete `data/`.
6. Verify the 3 derived shapes: archive tile overrides (26 differ), the 10-of-18 longform
   curation, and mixer spot ordering (9/9/9/6/6/9).

---

## 9. Build status — backend complete

Done and verified against a local SQLite database:

- **39 components** under `src/components/` (10 categories).
- **11 content types** under `src/api/` (2 collection, 9 single), each with the standard
  core controller / router / service. `strapi build` passes.
- **`scripts/seed.js`** — one-shot import from `eleven-front/data/*.json`. Re-runnable: it empties
  every type and the media library first, so a second run replaces rather than duplicates. Media is
  copied to a tmp dir before upload, because the upload service optimizes images in place and the
  originals in `eleven-front/public` must not be touched.
- **Seeded**: 7 people · 66 projects · 9 single types · **111 media files**
  (100 webp, 2 mp4, 8 m4a, 1 gif).
- **`src/index.ts` bootstrap** grants the Public role `find`/`findOne` on all 11 types at every
  boot. A fresh Strapi Cloud database therefore serves the front end with no admin clicking and
  no API token to rotate. Read-only, and the Public role never sees drafts.
- All 11 REST endpoints return 200 anonymously; `/api/projects` reports 66, `/api/people` 7.

### Verified round-trips
- 26 of 66 archive tiles keep a label/client that differs from their project's own.
- Mixer spot ordering preserved exactly (9/9/9/6/6/9, sequence matches source).
- Nested media inside nested components resolves: `services[].sounds[].files[].url`,
  `storyParagraphs[].note.photo.url`, `icon.white/black.url`.
- Party `y` keeps its mixed keyword/decimal values (`"top"`, `"center"`, `"0.1878"`).
- Legal labels keep their significant double space (`"01  Privacy"`).

### Note
`public/media/party/la-brea-circus.webp` is referenced by nothing (a leftover duplicate of
`egg-05-la-brea-circus.webp`) and was **not** uploaded. Every one of the other 111 referenced
files existed on disk.

---

## 10. Front end — complete

**Data flow: build-time snapshot.** `eleven-front/scripts/pull-content.mjs` fetches all 11
endpoints and writes `data/*.json` in the exact shapes the components already imported, so no
component had to change the *way* it reads content. It runs as `prebuild`, which means a Vercel
build always ships the published content and **Strapi is never in a visitor's path**.

`data/` is now generated and gitignored; the original hand-written files are frozen in
`eleven-back/scripts/seed-data/` so the seed stays reproducible. One generated file is new:
`ui.json` (the UI Labels type).

### Verified: the content survives the round trip
Generated `data/*.json` was diffed against the pre-migration files. `index.json` and
`longform.json` are **byte-identical**. Every other difference is accounted for:

| Difference | Count | Why |
|---|---|---|
| media paths → absolute Strapi URLs | 111 | intended |
| `onLanding: null` → `false` | 48 | Strapi booleans default to false; the field is read nowhere |
| newly CMS-managed values added | 7 | `seo`, `globe.alt`, contact `image`/`imageAlt`, party `ariaLabel`/`closeCursor` |
| `projects.json` global array order | — | spots are now grouped in roster order. All 66 projects are field-for-field identical as a set, and per-mixer spot order plus longform order are identical. Only the group *sequence* differs, which nothing reads (`spotsOf` filters by mixer). |

### Also wired to the CMS
The ~60 strings that were hardcoded now come from `ui.json`: view toggles, dock, sound toggle,
cursor tags, player transport, credit role labels (incl. the `Mixer to confirm` placeholder),
region aria-labels, the 404 line and the error page. Plus both `alt` texts, the Contact gif,
and the root metadata.

### The "Reset Entry" trash icon
Strapi's Content Manager puts a trash icon labelled **Reset Entry** beside the label of every
*non-repeatable* component field (`@strapi/content-manager` → `FormInputs/Component/Input`). It sets
that whole component to `null`, and it cannot be hidden per field — it checks only
`!repeatable && value != null && !disabled`, not whether the field is required.

So every single component is marked **`required: true`** (23 of the 24; `Team.icon` stays optional
because Adrea has none). The icon still shows, but the save is rejected by validation, which is what
stops an editor emptying the gate, the footer or a page's CTA with one click. The front end
dereferences all of these without guards, so a saved `null` would break the build.

### Hidden in the admin
`plugin::users-permissions.user` is hidden from the Content Manager and the Content-Type Builder
(`src/extensions/users-permissions/content-types/user/schema.json`). The site has no front-end
accounts; the only logins are Strapi admins, which live under Settings. Delete that file to bring
the collection back.

**Two label-matching bugs fixed while wiring:** `MenuCard` branched on `item.label === "Mixers"`
and found the social link by `label === "Instagram"`. With editable labels that breaks, so nav
items now carry `key` and social links carry `platform`, and the component matches on those.

### Checks that pass
- `tsc --noEmit` clean · `eslint` clean · `next build` succeeds from a deleted `data/` and `.next/`.
- All 22 routes prerender, including the 6 mixer pages.
- 95 distinct Strapi media URLs appear in the prerendered HTML.
- Legal's `id="privacy"` anchors survive; `Hot Dog-On-A-Stick`, `2255 Barry Avenue`,
  `Sorry we lost you`, `McMillions` all present.
- The production CSP emits `img-src`/`media-src` with the media origin — without this, every
  image and sound would be blocked. **`STRAPI_URL` must be set in Vercel.**

### Deployment
`netlify.toml` replaced by `vercel.json` (keeping the pre-launch `X-Robots-Tag`).
`.env.example` and `README.md` added. Rebuild-on-publish is a Strapi Cloud webhook
(`entry.publish`/`entry.unpublish`/`media.*`) → a Vercel Deploy Hook.

### One thing deliberately left alone
`app/api/review-notes/route.ts` and `components/dev/ReviewNotes.tsx` are the dev-only review tool
(`NODE_ENV === "development"`). Its ~15 strings never ship, so they stay in code.
