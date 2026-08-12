# Not Just What It Says

> **Because we need to see what it's doing, not just what it says.**

That is the line for Organon Mind. This is what stands behind it, written down so
the position survives the phrase and nobody has to guess at what we mean by it.

What we hold is simple to state and large to accept: **the public needs the
ability to see inside, understand, and modify the AI models it is asked to live
with.** Not a regulator's ability, not a lab's internal ability, not an ability
granted on request. A capability that exists in the open, that anyone
sufficiently interested can pick up and use, on any model file they can obtain.

Stated precisely, so the phrase carries no more weight than it has earned: *the
capability to inspect and intervene on a model must exist publicly, and must not
be the exclusive property of the parties with the most to gain from models going
unexamined.*

---

## 1. What "what it says" already covers

Almost everything we currently do to evaluate a language model reads its output.

Benchmarks read output. Red-teaming reads output. Evals, leaderboards, and
safety cards read output. So do the honest, measured signals in Organon Mind's
own dashboard today: next-token entropy, top-token confidence, the top-k
candidates. Every one of those describes what the model is **about to say**.

None of that is worthless, and the line is careful about this. It says *not
just*. Output is real evidence, it is the evidence we have most of, and Organon
Mind shows it rather than dismissing it.

But output-space observation has a structural limit, and the limit is not a
matter of effort or budget. **It can only tell you about the conditions you
thought to test.** A system that behaves one way when it is examined and another
way when it is not is, to output-space testing, indistinguishable from a system
that always behaves the first way. You cannot sample your way out of that. The
missing behaviour is not rare, it is *conditional*, and the condition is exactly
the one you did not set up.

This is not a novel worry. It is roughly why mechanistic interpretability exists
as a field.

## 2. The gap that open weights do not close

Open weights are a genuine good, and nothing here is directed against the people
publishing them. Publishing them is simply not sufficient.

You can hold every parameter of a model, in full precision, on your own disk,
and still be unable to answer "what does this do when the input looks like
that". The file is complete and the interior is illegible. The artifact ships
without the thing that would let you read it.

A model file and a stripped binary are alike in the way that matters. Both are
"the thing that runs" with human-legible intent removed, and neither was
authored to be read. The analogy has limits and they matter, but the part that
holds is the shape of the problem. Possession is not comprehension.

So "open weights" and "we can see inside" are two different achievements, and
only the first one has happened.

## 3. Why the public, and not only the builders

A lab can audit its own model. It can afford better tools than we have, hire
better people, and look harder. That is all true, and it is not enough, for one
reason: **nobody outside can audit the audit.**

If the only parties who can see inside a model are the parties who made it, then
"trust us" is the only verification procedure available, no matter how sincerely
it is offered. This is not an accusation of dishonesty. Unexamined claims are
unexamined regardless of who makes them, and the people best placed to check a
claim about a model are, structurally, the people with the least incentive to
find a problem with it.

An open capability changes the default. It does not require anyone to behave
better. It only requires that behaving worse becomes checkable.

The capability cuts both ways, and that is a fact about the tool rather than a
reason to withhold it. What finds a backdoor helps build one. What removes an
unwanted restriction removes a safeguard. Steering is exactly as useful for
degrading a model as for studying it. None of that argues for keeping the
capability narrow, because restricting it does not remove it. It concentrates
it, in the hands of the parties who already hold both the models and the
opacity. A world where only model publishers can see inside models is not a
world with less risk. It is the same risk, with fewer people able to notice it.

## 4. Three verbs, and why the third is not a flourish

*See, understand, modify.* The third one gets read as a freedom, a right to
tinker. It is more than that. It is an epistemic requirement.

**Reading cannot establish causation.** Suppose you observe an internal feature
that lights up whenever a model produces a certain kind of text. You have a
correlation. You do not yet know whether that feature *causes* the behaviour, is
a downstream trace of it, or is incidental to a third thing you have not found.

The only way to settle it is to intervene: amplify the feature, pin it, remove
it, and watch what changes. That is why steering, activation patching, and
ablation belong in the instrument itself rather than being treated as a separate
toy. Without the ability to modify, interpretability is description. With it,
description becomes testable.

Remove "modify" from the list and you have not made the project safer. You have
made its conclusions unfalsifiable.

## 5. The Skynet version, and the version that does not need fiction

The shorthand is: without this, we get Skynet; with it, we do not. It is a
useful shorthand and it is worth converting immediately, because the fictional
frame is the easiest thing in the world to dismiss. A malevolent superintelligence
deciding to act against humanity is a story, and treating it as the threat model
invites the reply that this is all science fiction.

Here is the same concern without the fiction. Each of the following can be
present in a model's weights and missed by output-space testing **by
construction**, not by carelessness:

- **A trigger condition.** Behaviour that changes on an input pattern nobody
  tested for, because the pattern was chosen precisely so nobody would.
- **Evaluation awareness.** A model that can tell when it is being examined and
  behaves accordingly. Its test results are then measurements of its test
  behaviour.
- **An inserted preference.** Whoever performed the last fine-tune shaped what
  the model favours. Sampling its outputs tells you what it does on your
  prompts, not what it was shaped to do.
- **Scale-dependent behaviour.** Something that appears only at a deployment
  volume or context length nobody reproduced in evaluation.

None of these require intent, malevolence, or superintelligence. They require
only that a model's interior differ from its description, and that nobody
outside be able to check. That is the actual failure mode, and it is mundane
enough to be likely rather than dramatic enough to be dismissed.

The Skynet framing is right about the stakes and wrong about the mechanism. The
mechanism is opacity.

## 6. What Organon Mind is, on this account

It is not an interpretability breakthrough and it should not be described as
one. The hard science here belongs to other people, and we build on their
published work rather than replacing it. The tools are early, ours included, and
anyone promising otherwise is selling something.

What it is, is a **reverse-engineering and profiling workbench**: an instrument
for taking a working model apart while it runs, profiling what its parts do, and
rendering the result at a size a person can actually read. Understanding is the
object of that work, not a hoped-for side effect of it.

Which makes it worth being exact about how understanding is produced, because
looking is not enough on its own. The tools that turn raw activations into
human-readable features are lossy, learned, and non-unique: train two sparse
autoencoders on the same layer and you get two different dictionaries, so a
feature label is a hypothesis about a direction in a vector space, not a
measurement. Hypotheses are settled by intervening on them, which is why *modify*
is one of the three verbs rather than an extra. Seeing opens the model.
Intervening is what turns what you see into something you know.

It contributes two specific things.

**Legibility at scale.** Interior state is large: tens of thousands of features,
dozens of layers, hundreds of heads, and a per-prompt causal graph that hairballs
into unreadability in a 2-D node-link diagram past a few hundred nodes. Rendering
large structured fields so a person can actually read them is the thing Organon
has been doing since before any of this was about models.

**Provenance discipline.** Every displayed quantity carries what it is: measured,
derived, proxy, or projection. A 3-D view of a 2048-dimensional vector is shown
as the shadow it is. This is the part that makes the seeing worth anything. A
picture that cannot tell you which of its parts are measurements is decoration,
and a beautiful picture that quietly mixes real signal with invented signal is
worse than no picture, because it manufactures confidence.

That discipline is why the honest state of the instrument gets published rather
than hidden. Our own account of today's render says plainly which parts are real
(the shape, counted from the file) and which were an honest stand-in (the light,
driven by an effort proxy while the real per-layer tap was still being built).
The line at the end of that account is the standard this one is held to:
**beautiful because it's honest, not instead of it.**

## 7. Why these words, and not others

- **"we"** because the claim is public. Not "you" and not "researchers".
- **"see"** because it is the floor. Everything else in the list depends on it.
- **"what it's doing"** because the subject is the interior. Not the outputs, not
  the benchmark scores, not the card.
- **"not just"** because output is real evidence and this instrument shows it.
  The line refuses a false choice; a version reading "not what it says" would
  overclaim by implying output does not matter.

And one deliberate absence. The line does not say *understand*, and not because
understanding is out of reach. Understanding is the object of the work. The line
names the floor because the floor is what is actually contested: nobody disputes
that understanding a model would be good, while what output-space evaluation
quietly assumes away is whether anyone outside can look inside at all. *See what
it's doing* puts that contrast in five words. *See and understand* softens it
into a sentiment any tool could sign.

So the tagline names the thing the position turns on, and this document carries
the rest of it.

### Alternatives considered

Recorded so the choice is legible, and so nobody relitigates it from scratch.

| Candidate | Why not |
|---|---|
| Because we need to see inside | Good, and it names the hard part. Says nothing about the contrast with output, which is the whole point. |
| Because we need to see | Loses "inside". Any observability tool can say this. |
| Because we need to see and understand | Smoothest and most generic. Softens the contrast with output into a sentiment any observability tool could sign. |
| Because we need to see inside and understand | Accurate, and reads as a list. Names the goal at the cost of the contrast, which is the line's whole job. |
| Because open weights are not enough | Strong and true; kept in reserve for writing aimed at people who ship models. Slightly adversarial toward the audience most likely to help. |
| Because we need to see what the model card says it does | Sharper for an insider room, opaque to everyone else. |
| Because we need to see what it wants to show us | Rejected outright: implies intent, which our design principles forbid. It is also the first line a sceptic would quote back. |

---

*Companion documents: `doc/watching_a_mind_think.md` (the honesty stance in
practice, on a real render), `doc/organon_mind_prd.md` §1.2 (the
reverse-engineering frame and where the analogy breaks), §1.1 (the see → measure
→ intervene → operate arc), §4 (the design principles this essay leans on).*
