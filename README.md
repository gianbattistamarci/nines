# Nines

Learn site reliability engineering (SRE), one short lesson at a time.

Nines is a small browser game in the style of a language-learning app. It starts from zero ("is the app working?") and builds up to the vocabulary and judgement SRE teams use every day. Each lesson takes a few minutes. Wrong answers come with an explanation in plain language, using everyday situations instead of jargon.

The name comes from how reliability is talked about in the field: "three nines" is 99.9%, "five nines" is 99.999%.

## The course

13 units, 29 lessons, 5 checkpoints and a final exam.

| Unit | Title | Lessons |
|---|---|---|
| 1 | Does it work? | It just works, Three ways to fail, Good enough, **Checkpoint A** |
| 2 | Set a target | Measure then aim, Why not 100%, The error budget, Spend it or save it, **Checkpoint B** |
| 3 | Watching the system | Four things to watch, Symptoms and causes |
| 4 | Alarms worth waking up for | Alert, ticket or log, Too many alarms, **Checkpoint C** |
| 5 | Boring work, and how to get rid of it | Spot the toil, Automate with care |
| 6 | On call without burning out | Being on call, A healthy rota |
| 7 | When it breaks | First stop the harm, Who does what |
| 8 | Learning without blame | The review afterwards, No blame, **Checkpoint D** |
| 9 | Changing things safely | It worked yesterday, Roll out slowly |
| 10 | Built to bend, not break | Always a spare, Too much at once |
| 11 | Teams and trust | Builders and runners, Ready for launch, **Checkpoint E** |
| 12 | The hard parts | When numbers mislead, Hard choices |
| 13 | AI at the controls | AI as a helper, Humans in charge, **Final exam** |

## Play

Open `index.html` in a browser, with the other files next to it. There is nothing to install and nothing to build.

To host it, enable GitHub Pages for this repository (Settings, Pages, deploy from the main branch). The game is then available at the Pages address of the repository.

## How it works

- **Lessons**: six questions each. A question you get wrong comes back before the lesson ends.
- **Question types**: pick one answer, sort items into groups, put items in order.
- **Feedback**: after every answer, right or wrong, you get the point in one plain sentence and an everyday picture of the same idea.
- **Variety**: an idea can have several versions of its question. Each play draws one version per idea and avoids the one you saw last time. Lessons keep their order, from easy to hard. Checkpoints shuffle it.
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

Progress is stored in the browser's local storage, on the device you play on. It is not sent anywhere.

"Clear game data" in the footer erases the saved progress and settings with one click, refreshes the browser's stored copies of the game files, and reloads the page. Until you close the tab, an "Undo" button puts the old progress back.

## Privacy and security

- **No accounts, no tracking, no cookies.** The game stores two small entries in local storage (progress and the text-size setting) and nothing else.
- **No outside requests.** The page loads only its own files. The fonts are served from the `fonts` folder instead of from a font provider.
- **No secrets.** There are no keys, tokens or passwords in the code, and the game calls no API.
- **Content security policy.** `index.html` tells the browser to load scripts, fonts and data from this site only, to run no inline scripts, and to allow no forms or plugins.
- **No HTML from strings.** Everything on screen is built as text and DOM nodes, so question text or a saved file can never be run as code.
- **Saved data is checked on load.** Only known lessons and sensible numbers are accepted. Anything else is dropped.

To report a security problem, open an issue in this repository.

## Accessibility

- Works with keyboard only: A to D or 1 to 4 pick an answer, Enter checks it.
- Right and wrong answers are marked with icons and text, not colour alone.
- A "Larger text" switch in the footer.
- Light and dark themes follow the system setting.
- Animations are skipped when the system asks for reduced motion.

## Files

| File | Purpose |
|---|---|
| `index.html` | The page: layout, styles and the security policy |
| `game.js` | The game code |
| `questions.js` | The course: every lesson, exam, question and explanation |
| `fonts/` | The two fonts and their licence |

To add or change questions, edit `questions.js` only. The format and the writing rules are described at the top of that file. When you publish a change, raise `VERSION` at the top of `game.js`, so the footer shows which version a player has.

## Sources and credits

The questions and explanations are original writing. The ideas they teach come from Google's published SRE material, which is the recommended further reading:

- [Site Reliability Engineering](https://sre.google/sre-book/table-of-contents/) (Beyer, Jones, Petoff and Murphy, 2016)
- [The Site Reliability Workbook](https://sre.google/workbook/table-of-contents/) (Beyer, Murphy, Rensin, Kawahara and Thorne, 2018)
- [AI in SRE: How Google is Engineering the Future of Reliable Operations](https://sre.google/resources/practices-and-processes/ai-engineering-reliable-operations/) (Unit 13)
- [Google SRE resources](https://sre.google/resources/)

The books are published under CC BY-NC-ND 4.0. Nines does not reproduce their text.

Fonts: Inter (The Inter Project Authors) and Plus Jakarta Sans (The Plus Jakarta Sans Project Authors), both under the SIL Open Font License 1.1. See `fonts/LICENSE.txt`.

## Licence

No licence has been chosen yet. Until one is added, all rights are reserved by the repository owner.
