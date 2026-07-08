# Wanda's 30th Birthday Quiz — Project Story

A behind-the-scenes account of how a birthday party trivia quiz became a full-stack web app with live scoring, a results dashboard, and a Spotify Wrapped–style animated recap.

---

## The Idea

Wanda's 30th birthday party (Wanda's Worldwide Wine Tours™, 2026) had both an in-person NYC soirée and a remote contingent joining from around the world. The goal was a quiz that:

- Guests could take on their phone before or during the party
- Mixed trivia about Wanda with opinion questions (wine, cheese, grapes) and personality prompts (scams, advice, wishes)
- Showed everyone's results together — scores, rankings, fun stats — as a party moment
- Felt polished and personal, not like a Google Form

---

## The Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Frontend | React + Vite | Fast iteration, component-based quiz flow |
| Styling | Vanilla CSS | No framework overhead; full control over animations |
| Backend | Supabase (Postgres + realtime) | Instant setup, free tier, excellent JS client |
| Hosting | Vercel | Auto-deploys from `main`; zero config |
| Fonts | DM Sans (Google Fonts) | Clean, modern, works great at large weights |
| Brand colors | `#d95c88` (pink) · `#f0a356` (orange) | Warm, celebratory, distinct |

---

## The Questions

Twelve questions across several custom types:

| # | Question | Type |
|---|----------|------|
| 1 | Which city are you in? | City search (autocomplete) |
| 2 | In person or remote? | Choice |
| 3 | What was Wanda's favourite fruit before grapefruit? | Free text |
| 4 | If you were a wine, which wine would you be and why? | Wine search (Vivino-style) |
| 5 | Rank these wine vessels (most → least preferred) | Drag-to-rank with images |
| 6 | Rank Wanda's favourite wines | Drag-to-rank |
| 7 | Green grapes or red grapes, and why? | Choice + explanation |
| 8 | Rank Wanda's favourite cheeses | Drag-to-rank |
| 9 | If you had to become a scamfluencer, what would your scam be? | Free text |
| 10 | Which veggie on a charcuterie board does Wanda hate? | Multiple choice |
| 11 | Advice for Wanda at 30 (or hopes for your own 30s) | Free text |
| 12 | Wishes for Wanda in her new decade | Free text |

### Scoring system

- Correct-answer questions (fruit, veggie, glass ranking, wine ranking, cheese ranking, grape choice) contributed points
- Max score: **18 points**
- Scoring calculated on submission and stored alongside all answers in Supabase

---

## The Quiz App

### Screen flow

```
Welcome → Nickname → [12 Questions] → Outro (score reveal + confetti)
```

### Custom question components

- **`CitySearch.jsx`** — live autocomplete for city entry
- **`WineSearch.jsx`** — free-text wine search with name + reason fields
- **`RankQuestion.jsx`** — tap-arrows reorder list; tap image to enlarge
- **`ChoiceExplain.jsx`** — radio choice + open text explanation
- **`ScammerHint.jsx`** — animated hint that expands on tap

### Gated results

The read-only results view was locked until **July 10, 2026 at 12:00pm EST** — after the party. The gate lives in both `QuizScreen.jsx` and `OutroScreen.jsx`:

```js
const REVEAL = new Date('2026-07-10T16:00:00Z');
const insightsUnlocked = new Date() >= REVEAL;
```

---

## The Dashboard (Owner-Only)

`public/dashboard.html` — a standalone HTML page (no build step) that reads live data from Supabase and shows:

- **Scoreboard** — every submission ranked by score, with city, attendance tag, and answer breakdown
- **Personality Responses** — all "if you were a wine" answers
- **Heartfelt Responses** — scamfluencer picks, advice, and birthday wishes side by side
- **Summary stats** — total players, avg/top score, in-person vs. remote split

Password-protected via a simple passphrase prompt. Styled to match the quiz's pink/orange brand.

---

## The Quiz Wrapped

`public/wrapped.html` — a Spotify Wrapped–style animated slideshow, publicly accessible after the reveal date.

### 11 slides

| Slide | Content |
|-------|--------|
| 0 | Opener — "Quiz Wrapped 2026" |
| 1 | Turnout — total players, in-person vs. remote |
| 2 | Scores — average and top score |
| 3 | Grape Debate — animated split bar, winner highlighted |
| 4 | Cities — unique city count, country pills, top cities list |
| 5 | Wine Identities — animated bar chart of "if you were a wine" answers |
| 6 | Scamfluencer picks — 3 random quote cards |
| 7 | Advice for Wanda — 3 random quote cards |
| 8 | Leaderboard: In Person — top 3 NYC soirée players (🥇🥈🥉) |
| 9 | Leaderboard: Remote — top 3 global players |
| 10 | Closer — "Happy Birthday Wanda" |

### Key interactions

- **Stories-style progress bar** — 11 segments, each fills linearly over 6 seconds
- **Tap to navigate** — left 30% of screen goes back, right 70% goes forward
- **Hold to pause** — hold anywhere for 200ms to freeze the slide; release to resume from exactly where it paused (essential for the longer text slides)
- **Keyboard** — `→` / `Space` advance, `←` goes back

### Design

- Dark warm-tinted backgrounds (deep burgundy/plum/near-black) — never cold
- Every slide has at least one pink blob and one orange blob
- All stats and scores rendered in the pink→orange gradient
- Animated entrance: slide-up, fade-in, and scale-in keyframes with staggered delays
- Data pulled live from Supabase on load; test entries filtered out

---

## Infrastructure Notes

- **Supabase table**: `submissions` — one row per quiz taker, stores nickname, city, attendance, all answers as JSON columns, score, and `submitted_at`
- **Vercel**: auto-deploys `main` branch; `public/` folder served at URL root (so `public/wrapped.html` → `/wrapped.html`)
- **No server**: everything is client-side; Supabase anon key is safe for read-only public access

---

## Timeline

| Date | Milestone |
|------|----------|
| Pre-July | Quiz app built and deployed |
| July 9 | Results coming in; Wrapped built and refined |
| July 10, 12pm EST | Results view unlocks for guests |
| July 10 (party) | Quiz Wrapped played at the soirée |

---

## Pending (as of build)

- [ ] Add "Red Red Wine" by UB40 (`public/red-red-wine.mp3`) — upload via GitHub, then wire autoplay with fade-in on load and fade-out on closing slide
- [ ] Consider a stripped public dashboard linked from the read-only results flow ("See Results Dashboard" button)
