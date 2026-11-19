# Nines

Learn site reliability engineering (SRE), one short lesson at a time.

Nines is a small browser game in the style of a language-learning app. It starts from zero ("is the app working?") and builds up to the vocabulary and judgement SRE teams use every day. Each lesson takes a few minutes. Wrong answers come with an explanation in plain language, using everyday situations instead of jargon.

The name comes from how reliability is talked about in the field: "three nines" is 99.9%, "five nines" is 99.999%.

## Status

This is an early preview.

| Part | State |
|---|---|
| Unit 1: Does it work? (3 lessons) | Playable |
| Checkpoint A (exam, 10 questions) | Playable |
| Unit 2: Set a target | First lesson playable |
| Units 3 to 13, Checkpoints B to E, final exam | Planned |

## Play

Open `index.html` in a browser. There is nothing to install and nothing to build.

To host it, enable GitHub Pages for this repository (Settings, Pages, deploy from the main branch). The game is then available at the Pages address of the repository.

## How it works

- **Lessons**: six questions each. A question you get wrong comes back before the lesson ends.
- **Question types**: pick one answer, sort items into two groups, put items in order.
- **Checkpoints**: exams with no second tries and an 80% pass mark. If you miss questions, the result names the lessons to practise.
- **Scoring**: 10 points for a first-time correct answer, 5 on a repeat, a bonus from three correct in a row, and a bonus for a perfect lesson. Each lesson awards one to three stars.
- **Ranks**: earned by passing checkpoints, so each rank says what you can now do.

| Earned by | Rank | What it certifies |
|---|---|---|
| Starting | Newcomer | Nothing yet |
| Checkpoint A | Observer | You can say what "reliable" means from the user's side |
| Checkpoint B | Planner | You can set a target and read an error budget |
| Checkpoint C | Watchkeeper | You know what to monitor and what deserves an alarm |
| Checkpoint D | Responder | You can run an incident and learn from it |
| Checkpoint E | Practitioner | You understand safe change, resilient design and team setup |
| Final exam | Reliability Engineer | The whole picture |

## Saved progress

Progress is stored in the browser's local storage, on the device you play on. Clearing site data for the page erases it. "Reset progress" in the footer does the same on purpose.

The same page also runs as a Claude artifact, where progress syncs to the player's account. That code path does nothing when the page is served from anywhere else.

## Accessibility

- Works with keyboard only: A to D or 1 to 4 pick an answer, Enter checks it.
- Right and wrong answers are marked with icons and text, not colour alone.
- A "Larger text" switch in the footer.
- Light and dark themes follow the system setting.
- Animations are skipped when the system asks for reduced motion.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole game: styles, lesson content and code in one page |

The lesson content sits at the top of the script in `index.html`, in the `COURSE` list. Splitting it into separate content files is planned for when the full course is written.

## Sources and credits

The questions and explanations are original writing. The ideas they teach come from Google's published SRE material, which is the recommended further reading:

- [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/) (Beyer, Jones, Petoff and Murphy, 2016)
- [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents/) (Beyer, Murphy, Rensin, Kawahara and Thorne, 2018)
- [Google SRE resources](https://sre.google/resources/)

Those books are published under CC BY-NC-ND 4.0. Nines does not reproduce their text.

## Licence

No licence has been chosen yet. Until one is added, all rights are reserved by the repository owner.
