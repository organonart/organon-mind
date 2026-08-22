# STYLE.md: writing an entry

`site/README.md` says what each page is and how it is built. This says how the
prose inside one is written. It is short on purpose; a guide nobody rereads is
worth nothing.

Every rule below comes from a defect that is in this catalogue now, or was until
the commit that added this file. The examples are ours.

---

## 1. The metaphor lives in the name. The body is literal.

Gang of Four names are pure metaphor (Bridge, Facade, Flyweight, Visitor,
Memento), and the prose under them never asks you to decode anything. A facade
is described as an object providing one interface to a subsystem. The picture is
spent on the name; the body pays cash.

Ours are the same kind of name: Barge-In, Darkness as Alarm, Scout then Swarm,
Cap the Decoration. Spend the figure there. Below the heading, write what the
thing does.

**Before.** *Cap the Decoration*, Intent:

> Bound the layer's *taste* by context and leave its *instruments* alone, so
> that a decorative capability never becomes a reason to switch the whole
> channel off.

Two undefined metaphors in fourteen words, in the one line whose job is to say
what the pattern is. Worse, *taste* first appears in this catalogue in a
different paper meaning ordinary aesthetic judgement, and *instrument* is a word
this programme has already retired once.

**After:**

> Constrain an ambient channel's decorative output by context and exempt its
> status output from the constraint, so that carrying decoration never becomes a
> reason to switch the whole channel off.

The catalogue has made this ruling twice already and then not applied it:

- OM-001 Rev. 2 renamed *Honest Instrument* to *Honest Gauge* because
  "instrument" collided with another sense. OM-004 then made *instrument* a
  load-bearing category anyway.
- OM-004 renamed *The Visible Seam* to *Show the Handover*, on the grounds that
  "two meanings for one word, both ours, is exactly what a plain name is for."

Both rulings are right. Follow them.

## 2. A coined term is defined at first use, or it does not exist

Sometimes a word has to be ours. Then it gets a plain copula sentence (*an X is
a Y*) at its first appearance in the paper, in **Motivation**, and is used
literally everywhere after. Gang of Four introduce *flyweight* and *strategy*
exactly this way, in the Motivation, before either does any work.

This catalogue does it correctly for *rung*, in OM-001 · Progressive Autonomy:

> Autonomy is better modelled as a ladder whose rungs are defined by
> reversibility …

One sentence, and the word is safe for the rest of the paper.

**The test:** find the term's first appearance in the paper. If that sentence
does not also define it, either define it there or delete the word. A term
half-explained three entries later is not a term; it is a private joke with a
delay on it.

## 3. A borrowed term of art is used in its own field's sense, or not at all

**Before.** *Deference at Rest*, Intent:

> A person's hand on the device always wins — implemented only where *wins* is
> decidable, which is when nothing is moving.

*decidable* is borrowed from computability to mean "the system can tell", and
*wins* is a bare italicised noun that exists only in this sentence. Write what
was meant.

The same entry gets it right two fields down, in **Structure**:

> the comparison is not *disabled* during activity so much as *undefined*,
> because during activity there is no single commanded state to compare against

The borrowed word arrives with its reason attached in the same breath. That is
the permitted form.

## 4. The clear sentence is usually already in the document, in the wrong field

Both defects above have the same shape: a compressed line sits in an early
field, and the plain version of it sits two fields below where fewer people
read. *Deference at Rest*'s Structure explains its Intent. *Cap the
Decoration*'s Implementation explains its Consequences.

So: **if a sentence cannot be parsed without a later field, move the later
field's sentence up.** Do not compress it on the way.

## 5. What each field is for

The template is Gang of Four's, with *Sample interaction* standing in for their
*Sample code* and three fields of our own. Each field answers one question and
refuses the others.

| Field | Answers | Must not carry |
|---|---|---|
| **Intent** | What does this do, and what problem does it address? One or two declarative sentences. | Coined terms. Scope hedges. How far it happens to be implemented here. |
| **Also known as** | Other names in circulation. | Argument. |
| **Motivation** | One concrete situation, named specifically. The only place a coined term may be introduced. | Generalities. |
| **Applicability** | How do I recognise I am in this situation? | The argument for the pattern. |
| **Structure** | The mechanism, in the fewest moving parts. | Justification. |
| **Participants** | The parts, each a noun and a responsibility. | Behaviour over time. |
| **Collaborations** | How the parts and the neighbouring patterns act on each other. | New mechanism. |
| **Consequences** | What does this cost me? `Gain:` / `Cost:` / `Trap:` | **Epigrams.** See below. |
| **Implementation** | Numbers, thresholds, ordering, and the bug someone will write. | Restated intent. |
| **Sample interaction** | One transcript or trace. | Commentary between the lines. |
| **Known uses** | Where this has been seen, named. | Plausibility. |
| **Failure signature** | What it looks like when it is missing or half-done. Symptoms. | Diagnosis. |
| **How you would know this is unnecessary** | The condition that makes the pattern pointless, precise enough to check. | Reassurance. |
| **Evidence** | Where the practice came from and how narrow it is. | Results of testing, unless there were some. |
| **Related patterns** | Names, numbers, and the relation. | Fresh claims. |

**Consequences is where a reader decides whether to pay.** It is the worst place
in the entry for a flourish, and it is where ours keep appearing. A `Trap:`
must be a statement, not a label:

> *Trap:* the failure direction of the clock.

names a topic and warns nobody. What it meant is in Implementation, plainly, and
belongs here:

> *Trap:* a clock reading that fails toward day lifts the cap instead of
> applying it.

## 6. The audience test

**An entry must read top to bottom for someone who knows Gang of Four and has
never read another entry in this catalogue.**

That is the bar, and it is checkable. Two consequences:

- Anything that requires knowing how this programme works (its repositories,
  its machines, its sessions, its habits) is a defect. Named instances are
  welcome and are most of the evidence here; named instances the reader is
  expected to *already recognise* are not.
- A cross-reference carries the relation and the number, so the sentence still
  works for someone who has not read the other entry: *Shares its cut with
  **Cap the Decoration** (7)*. Then say what the shared cut is.

## 7. Settled words

**Replaced.**

| Not | Use | Why |
|---|---|---|
| principal | **person**, **people**; the role noun in Participants is *Person* | An ordinary word for an ordinary thing. "User" is not the replacement. |
| squad, fleet | **team**, defined at first use in each paper that uses it: *several agents working on one task for one person* | The section is already called Many Teams and the subtitle already says groups. |
| taste (meaning decorative output) | **decoration** | The pattern is called Cap the Decoration. The literal word is right there. |
| instrument (meaning status output) | **status**, or name the signal | Retired by OM-001 Rev. 2 and then used anyway. |
| slot, where it means a display position (OM-004, 7 uses) | **single-channel**, the words that paper already uses of itself | Two of our own senses for one word is what the *Show the Handover* ruling forbids. The other sense cannot move; see below. |

**Kept.** These are domain vocabulary a software architect either knows or can
take from one definition: *agent, harness, turn, unit, actuator, renderer,
gauge, cue, seam, rung, arrangement, commission*. Define each once, at first use
in the paper, and then use it flatly.

**`unit` is kept, and must be defined** at first use in every paper that uses
it. It is the most-used house noun in the catalogue (225 uses, 185 of them in
OM-002 and OM-003), and it was defined nowhere until OM-002 Rev. 6:

> A unit is a piece of work one agent can run to completion on its own.

⚠️ The definition must say **work, not people**. Now that a group of agents is a
*team*, "unit" is one step from reading as an organisational unit, which is the
opposite of what it means.

⚠️ Do not "clarify" it by expanding it. **`unit of work` is Fowler's Unit of
Work pattern**, which means something else entirely, and the reader this
catalogue is written for is exactly the person who knows it. The phrase appears
zero times today; keep it that way. `task` is taken as well: One Agent's
subtitle is "one task, start to finish", so a task is the whole job rather than
a piece of one.

**`slot` keeps its OM-003 sense and loses its OM-004 one**, and that direction
is forced rather than preferred. `slot-1` to `slot-8` are published ids in
OM-003, linked from ten sections and from another document, and harness check 3
asserts all eight resolve and scroll. Those anchors are owed forever, so the
seven uses in OM-004 are the ones that give way.

Ordinary English is not in scope: "the Gang of Four template has no slot for
this" is idiom, not a term.

The test for any candidate is not whether it is vivid. It is: **would a reader
who has never seen this project understand it, or is it ours?**

### Where a sweep reaches, and where it stops

Replacing a word across a published paper is not a find-and-replace over the
file. Three boundaries, each of which OM-002 found the hard way.

**Revision histories are never swept.** They record what was true on the day
each was written, and are owed the same way a published anchor is. OM-002's
Rev. 3 still reads "*Fleet* is gone, replaced throughout by *squad*", which has
been false of the document since the sweep and remains true of 15 Aug 2026.
Leave it, and say in your own revision line that you did.

**A quotation is left alone; an authored mockup is prose and tracks the
vocabulary.** Both appear under *Sample interaction*, and **the difference
cannot be read off the markup**: two `<pre>` blocks look identical whether they
reproduce what a real surface printed or illustrate what one might. The author
has to know which they wrote. In OM-002, Proposed Dispatch's suggested-task
card is a reproduction and keeps its wording; Status Board's board is a mockup,
so `squad · 4 units` became `team · 4 units`. A `<blockquote>` is always a
quotation.

**Figures are swept, and they are where the words hide.** Go through SVG
`<text>`, `aria-label` and `<figcaption>` with the prose, and **match
case-insensitively**: OM-002's row label `A SQUAD` survived a lowercase
replacement and was caught by counting occurrences afterwards, not by reading.
Check the box when a label gets longer, and remember that an `aria-label` is
usually a whole sentence.

## 8. The em dash is not banned; overusing it is

Overuse of the em dash is a hallmark of machine-written prose, and this
catalogue had it badly. Normalised against the book the template comes from:

| | words | em dashes | per 1,000 words |
|---|---|---|---|
| Gang of Four | 108,228 | 109 | **1.0** |
| our five papers | 47,474 | 537 | **11.3** |

Eleven times the rate, in prose no denser than theirs. Read Facade's Motivation
for the model: technical exposition, clauses joined by semicolons, colons and
full stops, and not a dash in it.

The house voice survives this, and there is proof on this site. `/why` is the
most recently rewritten page here, 3,703 words, and it contains **no prose em
dash at all**, only the two structural separators in its revision lines. It
does not read clipped. Nobody noticed until it was counted.

**Treat 1 per 1,000 words as a smell test, not a quota.** A paper that lands at
two and reads well has passed. A sentence mangled to hit a number has not.

**Keep a dash when it earns its place.** A genuine break in thought, sharper
than a comma can carry. An emphatic tail the sentence was built to arrive at
(Rule 18). A parenthetical that itself contains commas, where more commas would
be ambiguous.

**Replace or delete it otherwise**, and this is the overwhelming majority of
ours. The tell is the dash used as a general-purpose connector, so the writer
never has to decide which relation actually holds:

| The dash was doing | Use |
|---|---|
| a parenthetical aside | commas (Rule 3); parentheses if the aside contains commas |
| joining two independent clauses, usually cause or consequence | a semicolon (Rule 5) |
| introducing an amplification, an explanation or a list | a colon |
| introducing a co-ordinate clause with *and* or *but* | a comma before the conjunction (Rule 4) |
| holding together a sentence that has grown too long | recast, often into parallel form (Rule 15), and use no mark at all |
| nothing at all | delete it and close the gap (Rule 13) |

That fifth row is the one people forget. Sometimes no mark is the answer:
*reconstructing by hand a fraction of what the agent already holds — and does
the decomposition themselves* became *reconstructing … and doing the
decomposition themselves*, and the parallel participles carry what the dash had
been carrying.

Two other tests, both cheap. **More than one dash in a sentence is almost
always wrong**, with one exemption: a paired aside is a single construction
using two marks, not two dashes. More than one in a paragraph: look hard at the
second. And where *so* is doing the joining, Strunk's own remedy is to recast
with *as* or *since*, or to start a new sentence.

**The paired aside has three answers, and choosing between them is most of the
work.** Use **parentheses** when it is genuinely an aside the sentence could
survive without, and in *Participants*, where Gang of Four parenthesise:
*Other controllers (a vendor app, a schedule, a switch), which are not
observable*. Use **commas** (Rule 3) when it reads inside the sentence rather
than beside it, which is the default and covers most cases: *every claim here,
including the claim that any of this is worth doing, is argued rather than
demonstrated*. **Recast** when it is neither, which is what the dashes were
signalling when the aside carries the point rather than qualifying it:
*Keep an irreducible set that no dispatch may pre-authorise: anything
outward-facing, anything that publishes, anything that cannot be undone. Route
those back to a live human.* OM-002 needed all three answers in eight entries.

**Do not answer every dash with the same mark.** Any one mark repeated becomes
the defect the dash was. All full stops turns the page to gravel (Rule 14); all
semicolons is that failure wearing a second mark; all colons is it wearing a
third. This is not a list of two bad choices; it is a property of repetition,
and it applies to whichever mark you happen to reach for.

The unit is the paragraph, not the paper. Three colons in one paragraph of
OM-002's *The Return Path* read worse than the dashes they replaced. So
**re-read each paragraph for mark variety after you have fixed its dashes, and
count rather than trusting your ear**: the five-semicolon sentence this
catalogue had to fix was written by someone who had just finished warning about
semicolons, and it was the count that caught it, not the re-reading.

**Before.** *Cap the Decoration*, Consequences:

> *Trap:* the boundaries are guesses — the hours and the ceiling are unmeasured

**After:**

> *Trap:* the boundaries are guesses; the hours and the ceiling are unmeasured

Structural dashes are appropriate use and stay. Three forms, all typography
rather than punctuation:

- the `Rev. 3 — 22 Aug 2026` separator in a revision line, 22 of them across
  the five papers;
- the same separator in a page title, a heading or a diagram label;
- the bibliographic `Author, Title — annotation` in a *Sources and lineage*
  list, which is a citation convention and is used consistently down each
  list. OM-002 §13 has three and they stay.

The test is whether the dash separates two *fields* rather than joining two
parts of a sentence. If every sibling in the list uses it, it is a form. If one
row uses it and the others use a comma, it is a stray, and OM-002 had one of
those in its retired-ids table.

Only `—` is in scope here. En dashes in ranges (`§7–§12`) and hyphens in
compounds are unaffected.

⚠️ **Counting them needs both spellings.** The papers use the literal
character; `why.html` uses `&mdash;`. A grep for one silently misses the other,
which is how `/why` first measured as having no dashes at all rather than two.

## 9. Four Strunk rules that catch most of what is left

1. **Omit needless words.** Rule 13. Every entry gets shorter under it.
2. **Definite, specific, concrete.** Rule 12. Name the device, the number, the
   morning.
3. **Positive form.** Rule 11. `not visible` is `hidden`.
4. **Emphatic word last.** Rule 18. The cost goes at the end of the sentence,
   not in the middle of a clause about something else.

And one point of punctuation, because it recurs in `Consequences` lists: two
independent clauses take a semicolon, not a comma.

Spelling is British: *colour*, *judgement*, *recognise*, *catalogue*.

## 10. Before you commit

- **A published document that changes carries a dated revision line** saying
  what changed and why. Follow the convention already in the paper; newest
  first.
- **An Intent exists in three hand-authored places.** The paper is canonical;
  `patterns.html` carries a rail-index blurb and an `intent:` string in the `P`
  literal. Change one, reconcile all three. The copy in `#store` is generated;
  leave it alone and rebuild.
- Rebuild and verify:

```bash
node scripts/build_poster.mjs
cd scripts/verify && npm install && node verify.mjs
```

- **Never change an entry's name or an `id=`.** If you think one must change,
  stop and say so.
