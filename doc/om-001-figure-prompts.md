# OM-001 — figure prompts

Source prompts for the fourteen figures in *Conversational Agent Control
Surfaces*. Kept here because if the figures are generated rather than drawn,
**these prompts are the source** — the images are the rendering, and a figure
that cannot be regenerated is a figure that can never be corrected.

Target: ChatGPT Image 2. Landscape, highest resolution offered.

---

## How to use this

1. **Paste the style block before every prompt, unchanged.** Consistency across
   fourteen figures is the whole risk with generated imagery — each generation
   drifts, and a catalogue whose diagrams don't match reads as assembled rather
   than authored. Identical style text every time is the only lever you have.
2. **Generate them in one sitting** if you can. Style tends to hold better
   within a session than across days.
3. **Check every label against the prompt, character by character.** This is not
   optional. The labels *are* the content — "reads FAILED", "consent granted",
   "blast radius" — and a garbled or invented word turns a figure into a
   confident lie. Regenerate rather than accept a near miss.
4. **Reject anything with extra text.** Image models like to add titles,
   captions, legends and signatures. Nothing should appear that isn't in the
   prompt.
5. Save as PNG. Name them `om-001-fig-01.png` … `om-001-fig-14.png`.

---

## Style block — prepend to every prompt

```
Minimal technical specification diagram in the style of an engineering
document. Pure white background. Thin uniform dark grey strokes, consistent
weight throughout. Square-cornered rectangles only — no rounded corners, no
drop shadows, no shading, no gradients, no 3D, no texture. Flat 2D vector.
Orthogonal connector lines with small solid triangular arrowheads. All labels
in a clean grotesque sans-serif, dark grey, sentence case, small and evenly
sized. Generous white space, everything aligned to a grid. No colour anywhere.
No title, no caption, no legend, no watermark, no text of any kind beyond the
exact labels specified below.
```

---

## 1 · The map

```
A closed loop of five boxes connected by arrows reading left to right then
wrapping around: "Orientation" → "Intent" → "Execution" → "Authority" →
"Truth and continuity", with a long arrow from the last back to the first
labelled "next task". A separate box labelled "Turn" sits below the loop,
joined to "Execution" by a dashed line labelled "governs every stage". Use
exactly these labels and no others.
```

## 2 · Capability Disclosure

```
A sequence diagram with three vertical lanes headed "Principal", "Agent",
"Environment", each with a thin dashed vertical lifeline beneath it. Horizontal
arrows between lanes, ordered top to bottom: Agent to Environment "resolve
position"; Environment to Agent "actual state"; Agent to Principal "disclose
capability and limits"; Principal to Agent "first request, correctly scoped".
```

## 3 · Mode Legibility

```
A box on the left labelled "identical input", an arrow to a diamond labelled
"active mode". Two arrows leave the diamond rightward: the upper labelled
"dictation" to a box "text at cursor"; the lower labelled "agent" to a box
"spoken reply". A dashed arrow curves from the diamond back to the input box,
labelled "must be visible here".
```

## 4 · Streaming Turn

```
Two stacked rows for comparison, each row a horizontal chain of boxes. Upper
row labelled "batched": "generate" → "synthesise" → "first word at 11.8s".
Lower row labelled "streamed": "generate s1" → "synthesise s1" → "first word
at 1.1s", with a second short chain below it, "generate s2" → "synthesise s2",
joined to the row above by a dashed line labelled "overlaps".
```

## 5 · Barge-In

```
A state diagram of square boxes. "Idle" → "Thinking" → "Speaking" → back to
"Idle". Two separate arrows, one from "Thinking" and one from "Speaking", both
labelled "barge-in", converge on a box labelled "Cancelled". From "Cancelled"
an arrow labelled "capture next" leads to "Listening", and from "Listening" an
arrow returns to "Thinking".
```

## 6 · Scope-on-Uncertainty

```
A vertical decision tree. Top box "ambiguous request" leads to a diamond "do
the readings differ in blast radius?". Its left branch, labelled "no", goes to
a box "proceed, state the assumption". Its right branch, labelled "yes", goes
to a second diamond "can inspection resolve it?", whose "yes" leads to
"read-only inspection" and whose "no" leads to "ask one question". Both rejoin
the "proceed" box.
```

## 7 · Plan · Approve · Execute · Receipt

```
A sequence diagram with three vertical lanes headed "Principal", "Agent",
"Tools", each with a thin dashed lifeline. Horizontal arrows top to bottom:
Principal to Agent "intent"; Agent to Principal "plan"; Principal to Agent
"approve"; Agent to Tools "execute", with a small loop arrow beside it
labelled "each step"; Tools to Agent "result"; Agent to Principal "receipt".
```

## 8 · Tool-Call Transparency

```
A horizontal chain: box "Agent", arrow labelled "why" to a box "tool event"
drawn with a slightly heavier stroke, arrow labelled "what and where" to a box
"Tool", a return arrow labelled "result" back to "tool event", then an arrow
labelled "anchored claim" to a box "Principal". A dashed arrow runs from
"Principal" back to "Tool" labelled "can verify".
```

## 9 · Ambient Activity Channel

```
A horizontal flow of four boxes: "Agent, in a sandbox", arrow labelled "state
events" to "Renderer, loopback only", arrow labelled "colour and motion" to
"Peripheral device", dashed arrow labelled "perceived without attention" to
"Principal". A separate dashed line from "Agent" to "Renderer" runs beneath,
labelled "never sends colour".
```

## 10 · Approval Gate

```
A vertical decision flow. Box "proposed step" to a diamond "reversible?". Its
"yes" branch goes left to a box "proceed". Its "no" branch goes down to a
diamond "outward-facing?", whose "no" leads to "proceed, stated plainly" and
whose "yes" leads to a box with a noticeably heavier stroke labelled "gate,
explicit consent". From that gate, "granted" leads to "proceed" and "refused"
leads to "stop".
```

## 11 · Progressive Autonomy

```
Five boxes arranged as ascending steps left to right, each slightly higher than
the last, connected by arrows: "read", "propose", "reversible write", "local
irreversible", "outward-facing". Small numerals 1 to 5 above the boxes. A long
dashed arrow curves from the fifth box back to the second, labelled "surprise,
drop a rung".
```

## 12 · Honest Gauge

```
Two panels side by side, separated by a thin vertical line. Left panel headed
"dishonest": two boxes, "healthy" and "genuine failure", both with arrows into
a single box "reads FAILED", which has an arrow to a box "cannot distinguish".
Right panel headed "honest": "healthy" has an arrow to "reads OK", and
"genuine failure" has an arrow to "reads FAILED", as two separate parallel
paths that never meet.
```

## 13 · Recoverable Execution

```
A horizontal flow: "before-state captured" → "action" → "after-state" →
"diff". From "diff", two arrows: the upper labelled "accept" to a box "keep";
the lower labelled "reject" to a box "restore". A long dashed arrow curves from
"restore" back to "before-state", labelled "task survives the undo".
```

## 14 · Continuity as Memory

```
A vertical flow. Top box "transcript, ephemeral" leads to a diamond "worth
keeping?". Its left branch, labelled "resolved detail", goes to a box "let it
go". Its right branch, labelled "decision or trap", goes to a box with a
heavier stroke labelled "memory, durable and editable". From that box an arrow
leads down to "next session starts oriented", which arrows back up to the
transcript box, closing the loop.
```

---

## What to watch for

**Label fidelity is the whole game.** Every figure above carries labels that
are load-bearing claims. `reads FAILED` becoming `reads FAILURE`, or
`blast radius` becoming `blast radios`, does not read as a rendering artefact —
it reads as the author not knowing their own terms.

**Drift between figures.** Compare each new render against figure 1 rather than
against the prompt. Stroke weight, box proportion and label size wandering
across fourteen images is the most likely way this goes wrong, and it is
invisible one figure at a time.

**Alt text is not optional here.** A drawn SVG carries its labels as real text;
a generated image does not. Every one of these needs alt text carrying the
figure's actual claim — not "diagram of the approval gate" but what the diagram
asserts. Written separately once the renders are chosen.
