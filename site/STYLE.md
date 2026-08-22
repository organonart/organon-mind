# STYLE.md — writing an entry

`site/README.md` says what each page is and how it is built. This says how the
prose inside one is written. It is short on purpose; a guide nobody rereads is
worth nothing.

Every rule below comes from a defect that is in this catalogue now, or was until
the commit that added this file. The examples are ours.

---

## 1. The metaphor lives in the name. The body is literal.

Gang of Four names are pure metaphor — Bridge, Facade, Flyweight, Visitor,
Memento — and the prose under them never asks you to decode anything. A facade
is described as an object providing one interface to a subsystem. The picture is
spent on the name; the body pays cash.

Ours are the same kind of name: Barge-In, Darkness as Alarm, Scout then Swarm,
Cap the Decoration. Spend the figure there. Below the heading, write what the
thing does.

**Before** — *Cap the Decoration*, Intent:

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

Sometimes a word has to be ours. Then it gets a plain copula sentence — *an X is
a Y* — at its first appearance in the paper, in **Motivation**, and is used
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

**Before** — *Deference at Rest*, Intent:

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

- Anything that requires knowing how this programme works — its repositories,
  its machines, its sessions, its habits — is a defect. Named instances are
  welcome and are most of the evidence here; named instances the reader is
  expected to *already recognise* are not.
- A cross-reference carries the relation and the number, so the sentence still
  works for someone who has not read the other entry: *Shares its cut with
  **Cap the Decoration** (7)* — and say what the shared cut is.

## 7. Settled words

**Replaced.**

| Not | Use | Why |
|---|---|---|
| principal | **person**, **people**; the role noun in Participants is *Person* | An ordinary word for an ordinary thing. "User" is not the replacement. |
| squad, fleet | **team** — *several agents working on one task for one person*, defined at first use in each paper that uses it | The section is already called Many Teams and the subtitle already says groups. |
| taste (meaning decorative output) | **decoration** | The pattern is called Cap the Decoration. The literal word is right there. |
| instrument (meaning status output) | **status**, or name the signal | Retired by OM-001 Rev. 2 and then used anyway. |

**Kept.** These are domain vocabulary a software architect either knows or can
take from one definition: *agent, harness, turn, unit, actuator, renderer,
gauge, cue, seam, rung, arrangement, commission*. Define each once, at first use
in the paper, and then use it flatly.

The test for any candidate is not whether it is vivid. It is: **would a reader
who has never seen this project understand it, or is it ours?**

## 8. Four Strunk rules that catch most of what is left

1. **Omit needless words.** Rule 13. Every entry gets shorter under it.
2. **Definite, specific, concrete.** Rule 12. Name the device, the number, the
   morning.
3. **Positive form.** Rule 11. `not visible` is `hidden`.
4. **Emphatic word last.** Rule 18. The cost goes at the end of the sentence,
   not in the middle of a clause about something else.

And one point of punctuation, because it recurs in `Consequences` lists: two
independent clauses take a semicolon, not a comma.

Spelling is British: *colour*, *judgement*, *recognise*, *catalogue*.

## 9. Before you commit

- **A published document that changes carries a dated revision line** saying
  what changed and why. Follow the convention already in the paper; newest
  first.
- **An Intent exists in three hand-authored places.** The paper is canonical;
  `patterns.html` carries a rail-index blurb and an `intent:` string in the `P`
  literal. Change one, reconcile all three. The copy in `#store` is generated —
  leave it alone and rebuild.
- Rebuild and verify:

```bash
node scripts/build_poster.mjs
cd scripts/verify && npm install && node verify.mjs
```

- **Never change an entry's name or an `id=`.** If you think one must change,
  stop and say so.
