# OM-004 — working draft

*Not a publication. This is the drafting document for OM-004: the argument, the
set structure, the addition to the template, and the Presence half written out
in full. The Provisional half is deliberately held — see §8.*

Status: 2026-08-14. Evidence in `om-004-evidence-2026-08-14.md`. Nothing here has
been published, and one earlier attempt was reverted (see §10).

**2026-08-15 (a).** Darkness as Alarm and The Night Cap drafted into §7, from the
change log and the renderer's own documentation rather than from the evidence
pass, which left both ungathered by instruction. Both carry *reported*, and both
state what has not been observed. **The Presence half is now complete at seven
entries.**

**2026-08-15 (b).** The commissioned measurement returned
(`om-004-evidence-2026-08-15.md`). **The Provisional half is unblocked** and §8 is
rewritten around the answer. Three claims this document made are corrected, all
of them ours and none of them cosmetic: the thirty-second revision claim it called
falsified **is true** (§10); the configuration it called deployed was never
deployed (§5); and the field it calls the strongest of the four template additions
has a failure mode we walked into before publishing (§4).

---

## 1. The finding that sets the shape

**OM-001 already contains this pattern.** Ambient Activity Channel (Turn 9,
Part IV) proposes exactly the peripheral channel that has since been built:

> Signal the agent's state through a channel the principal perceives without
> attending to it, so presence and progress cost no screen and no focus.

It even names the palette that was eventually built — violet thinking, cyan
tool, warm speaking, amber consent — and states three of the rules this paper
was going to claim as new:

- *the channel reports state, never instructions*
- *the renderer owns presentation and a priority stack*
- *must obey Honest Gauge — a peripheral signal that lies is worse than a
  transcript that lies, because it is trusted without being read*

So OM-004 is **not a new language beside OM-001**. It is the first paper that
returns to a published pattern with measurements from having built it. That is a
better thing to be, and it is what the evidence actually supports.

And the return is not a victory lap. Two of Turn 9's implementation notes turn
out to be **insufficient in practice**, and the paper's job is to say so:

| Turn 9 says | What building it showed |
|---|---|
| "Give every state a time-to-live so a lost 'off' decays rather than stranding the device." | A TTL decays a stale *live cue*. It does nothing for a *resting* state, which is sent once and stays wrong forever. The lamp came up white and no timer would have fixed it. **→ Standing Assertion** |
| "The renderer owns presentation and a priority stack." | There are **two** stacks, in two structures of different shape, neither able to see the other, with no test on the composite — and the written composite states the first step backwards. **→ Single Precedence** |

A pattern language that can be corrected by its own practice, in public, with the
measurement that did it, is doing the thing this programme says it is for.

Mode Legibility (Turn 2) is the second seed, and it was resolved rather than
refined: the persistent Agent/Dictation mode was **deleted** and replaced by which
key you hold. The pattern said make the mode visible at the moment of use; the
answer that worked was to remove the mode so there is nothing to make visible.

---

## 2. The claim

Everything published so far grows **outward in span**: Turn → Fleet →
Arrangements → Yard, one agent to many, seconds to days. OM-001 begins at the
moment a turn is submitted, and every one of its fourteen patterns assumes a
completed input and a bounded reply.

OM-004 goes the other direction. There are two regimes the turn does not cover:

- **before you address the machine at all** — is anyone there, and what are they
  doing? The lamp answers this, and it answers it when there is no turn in
  progress and may never be one.
- **while you are still forming the input** — the machine is already responding,
  its output is provisional, and both are changing at once.

Both are the same discipline: **a machine running continuously alongside a person
has to report itself outside the exchange, honestly, on channels that cannot be
scrolled back.** The lamp is that sentence at one hue of bandwidth; the
settled/volatile seam is the same sentence at full text bandwidth.

Working title: **Presence, and the Provisional**. Two levels in one document, on
OM-003's precedent, written to be separable — if either half grows evidence of
its own it becomes its own numbered paper and the split is a dated revision here.

---

## 3. Two sets, and the axis nobody had named

Explorer sets: **Presence** and **Provisional**, beside Turn / Fleet /
Arrangements / Yard.

OM-001, 002 and 003 are implicitly **focal and single-channel** — they assume a
surface you are looking at. Nobody wrote that down because there was no
alternative to contrast it with. Turn 9 introduced the alternative in one entry;
this is what it looks like as a set.

| | Focal surface | Peripheral surface |
|---|---|---|
| Bandwidth | high | one hue, one rhythm, one brightness |
| Cost to consult | a focus shift | none — already in the eye |
| Persistence | scrolls away | always on |
| History | scrollback | none. The light has no log |
| Audience | you | the room |

Every rule in the Presence set falls out of that table, which is the evidence
that it is the right axis. *No history* is why re-assertion beats change
detection. *One slot* is why precedence is the entire safety model. *The room* is
why two more lamps break darkness-as-alarm.

Patterns whose forces are about **attention** rather than code structure are
precisely what OM-001 §6 argues the Gang of Four template cannot express.

---

## 4. The addition to the template

OM-001 adds one field to the Gang of Four form: **the seam** — which side of the
harness/agent boundary a pattern is implemented on. OM-003 adds two: *What it
changes* and *Evidence*.

OM-004 adds one, and it is the strongest of the four:

> **How you would know this is unnecessary.**

Every entry states the condition under which it should be deleted. Not "when not
to use it" — the condition that would make the pattern *pointless*, named
precisely enough to be checked.

This is not a formatting choice. It recovers Alexander's *forces*: each answer
names the pressure that generates the pattern rather than restating the
solution. Four worked examples, all from the Presence half:

- re-assertion is unnecessary if the transport were reliable **and** a consumer
  could ask for current state on connect
- a presence indicator is unnecessary if failure were visible at the moment of
  acting — it exists because push-to-talk costs you a whole utterance before you
  learn the channel is dead
- a closed vocabulary is unnecessary if the actuator were incapable of harm
- deference is unnecessary if the renderer were the only controller of the device

And it gives the language something the Gang of Four form has no slot for at all:
a pattern that specifies the test that retires it. The Provisional half ran one.
*Whether the scribe is still needed* was a running experiment with a measurable
outcome rather than a matter of taste, and on 2026-08-15 it returned: the scribe
stays, and the corrector's continuous cadence is what the evidence deletes (§8).

Where we cannot state the condition, the entry says so.

### ⚠️ The field has a failure mode, and we hit it before publishing

Naming a retirement condition makes it checkable. It does not make the check
sound, and the two are easy to confuse — a fact this paper established the
expensive way, against itself.

The 2026-08-14 pass checked one such condition — *does a revision ever reach
thirty seconds back?* — against a corpus of three short segments, found nothing
at that depth, and rescaled the pattern to seconds. This document then hardened
that into "does not happen." The 2026-08-15 pass, on a corpus deliberately
over-sampled long, found a revision **35.6 s back rewriting the first word**
(§10).

**A null result from a corpus incapable of exhibiting the condition is
indistinguishable from a true negative**, and it arrives wearing the same
authority — a measurement, a method, a number. The field's whole value is that it
lets a pattern be retired on evidence; that is exactly what makes a false
retirement cheap to act on and expensive to notice.

So the field carries an obligation the other five do not: **state the condition,
and state what a corpus would have to contain to test it.** An entry whose
retirement condition has been checked should say against what, and whether that
corpus could have produced the other answer. This is the strongest of the four
template additions across the language, and it is the one that can do harm.

---

## 5. Evidence position

This is the first language in the programme with **designed** evidence, and the
narrowest base of any of them. Both facts go on the page.

- One machine, one speaker, one microphone (Elgato Wave:3), one room.
- Every WER figure derives from a single 229-second read of a 24-line script.
- The 405/492/494/1502-utterance corpora are one person's real dictation over
  roughly a day.
- Nothing is cross-speaker or cross-device.

Entries carry the evidence pass's own labels, mapped onto the programme's
provenance vocabulary: **verified** (measured on the machine, method stated) →
*measured*; **testimony** (from the change log or a doc comment, not re-derived)
→ *reported*. Anything scaled from a measurement at a different magnitude is
*derived* and says so. The `~10 µs` postpass figure is the worked example of what
we will not print: it was scaled from 82 µs over a 317-word input, and the
defensible statement is the measured one.

**The commitment that gets us out of n=1**: publish the read-aloud script, the
term list and the scoring method alongside the paper as a reproducible acceptance
corpus, with our numbers on it as the reference. Anyone with a microphone can
then disagree with us. That is not a workaround for a small sample — it is the
programme's own stated position about public capability, applied to our own
claims, and it is a better answer than hedging.

### ⚠️ 2026-08-15 — three corrections, and the commitment stops being aspirational

**The deployed configuration was α1.0, not α2.0.** The 2026-08-14 pass labelled
its α2.0 column *"(deployed)"* and this document repeated it. Nothing sets α2.0:
the dictation path hardcodes `1.0`, both other paths default to `1.0`, and the
live service reports `alpha: 1` with 47 seed terms. The accuracy consequence sits
inside the bias sweep's own declared noise, so no conclusion moves — but the word
*deployed* was doing real work in a paper whose argument is that you should
measure what runs, and it was wrong.

**The n=1502 corpus cannot be re-measured.** The tray log retains final text and a
refinement count; samples are dropped at end of utterance. So the largest number
in our evidence base supports *duration* claims and can never support an acoustic
one. Every WER and revision figure rests on the single 229-second read.

**The instrument that produced the 2026-08-14 revision-depth figures no longer
exists.** It was built in a session scratchpad — a directory designed to be
discarded — and went with it. The document was rescued into this repo; the rig was
not. The consequence is not hypothetical: the two passes' depth numbers **cannot
be reconciled**, because the earlier definition of "back" is unrecoverable, and
the disagreement has to be recorded as open rather than resolved.

That converts the acceptance-corpus commitment from a good intention into a
**precondition**. A number whose instrument is unreproducible is testimony
wearing the costume of measurement, however carefully it was taken — and it stays
in the record forever, uncontestable, until someone spends a day rebuilding a rig
to disagree with it. The 2026-08-15 pass committed its instrument
(`prefix_replay.py`, with six of its own defects documented in the source where
they bit), which is the first time a figure in this paper can be argued with. It
should be the last time one cannot.

---

## 6. Entry roster

**Presence** — the peripheral channel. Elaborates Turn 9.

| # | Entry | Evidence | Drafted |
|---|---|---|---|
| 1 | Standing Assertion | code verified, two incidents reported | §7 |
| 2 | Verified Presence | code verified, behaviour verified both directions | §7 |
| 3 | Closed Vocabulary | code verified, incident verified by review | §7 |
| 4 | Deference at Rest | code verified, **behaviour never observed** | §7 |
| 5 | Single Precedence | verified, **and its own instance fails it** | §7 |
| 6 | Darkness as Alarm | reported; reasoned, with one accidental observation | §7 |
| 7 | The Night Cap | reported; constants verified, **never observed at night** | §7 |

**Provisional** — the sub-turn. Elaborates Streaming Turn and Honest Gauge.

Revised 2026-08-15, after the commissioned measurement returned (§8).

| # | Entry | Evidence | Drafted |
|---|---|---|---|
| 1 | Draft and Record | verified, and **stated more purely** by the result | unblocked |
| 2 | No Frozen Prefix | verified; governs the **live view only**, whose instance is proposed for deletion | unblocked |
| 3 | The Visible Seam | structure verified; **perception now decides an architecture**, not a preference | unblocked |
| 4 | Churn Is Not Correction | verified twice, with a measured gradient — **the strongest in the half** | unblocked |
| 5 | Deterministic Last Mile | verified: fires on 1.2% of utterances | unblocked |
| 6 | One Exemplar, Two Injections | verified, with an asymmetry; **cost re-measured at α1.0** | unblocked |
| 7 | Split the Substrate | boundary established | unblocked |

---

## 7. The Presence half

### 1 · Standing Assertion

**Intent.** Re-send a resting state on a timer rather than on change, because an
ambient channel has no history and no acknowledgement, and both of its failure
modes are silent.

**Motivation.** A live cue repaints every frame, so a lost packet self-corrects
in 66 ms and nobody notices. A *resting* state is sent once. If that single
datagram is lost, or arrives before the device is ready, or the consumer restarts
afterwards, the state is wrong forever and the producer believes it succeeded.

Both failures happened, one layer apart, within a single session. A Govee lamp
restores its own default on power-cycle; the renderer's colour frame went out
microseconds later in the same tick, `emit()` sent only on change, and the lamp
sat white while every log line said violet. Diagnosing it required querying the
device directly — which itself only works with the renderer stopped, because the
renderer holds the fixed reply port. Fixing it exposed the identical bug one
level up: the tray also announced presence only on change, so a renderer started
*after* the tray never learned there was anyone to be present.

**Applicability.** Any state that is long-lived, ambient, and sent over a
transport without acknowledgement, to a consumer that can restart independently.

**Consequences.** *Gain:* the two silent failures become self-healing within one
period. *Cost:* traffic proportional to time rather than to events, and a period
that is a guess. *Trap:* it looks like belt-and-braces until you have watched a
resting state be wrong for an hour while the producer reported success.

**Implementation.** Renderer re-asserts colour and brightness every 3 s by
clearing its last-sent cache; the tray heartbeats presence every 5 s. Neither is
a retry — there is nothing to retry, because nothing failed as far as either
knows.

**How you would know this is unnecessary.** If the transport were reliable and
ordered **and** a consumer could ask for current state on connect. A renderer
that issued "what is the present state?" at startup would not need the heartbeat;
a lamp protocol with acknowledgements would not need the re-assert timer. The
rule is a consequence of fire-and-forget datagrams to a device that can
power-cycle underneath you, plus consumers that restart independently.

**Corrects.** Turn 9's implementation note that a time-to-live is sufficient. It
is sufficient for a live cue and does nothing for a resting state.

**Relations.** corrects → Ambient Activity Channel · governed by → Honest Gauge ·
enables → Verified Presence

---

### 2 · Verified Presence

**Intent.** An indicator asserts only what it has actually checked — because
adding a confident signal makes you responsible for everything it appears to
claim, including things nobody was measuring before you added it.

**Motivation.** The resting glow originally meant "Agent mode is selected". It
read as "she can hear you". Those diverge the moment the channel dies — service
restarted, port lost, session gone — and a dead agent looked identical to a live
one until you had spoken an entire sentence into nothing.

While the tray was silent about reachability this was a **gap**. The moment the
lamp began asserting a confident resting glow, the same gap became a **lie**. The
indicator did not create the blindness; it made it load-bearing.

**Applicability.** Whenever a new signal is added to a surface a person will
trust without reading — which is every peripheral channel, by definition.

**Consequences.** *Gain:* the question you have *before* pressing a key gets an
answer, from across the room. *Cost:* a probe, its cadence, and its own failure
modes. *Trap:* the probe must not run on the thread that draws the interface. The
health check has a 2 s timeout and the tray loop is the message pump; probing
inline freezes the icon and the overlay for two seconds every time the channel
accepts a connection and then hangs.

**Implementation.** Probe every 10 s on a dedicated thread, unconditionally.
"Unconditionally" is the load-bearing word: the probe originally ran only in
Agent mode, and when modes were deleted it would never have run again — leaving
the lamp asserting something that was no longer being checked by anything.

**How you would know this is unnecessary.** If failure were immediate and visible
at the moment of acting. The indicator exists because push-to-talk gives no
feedback until after you have spoken, so the cost of discovering unreachability
is a whole utterance. On a surface where the attempt itself reports failure
synchronously, an ambient reachability signal is redundant.

**Relations.** obeys → Honest Gauge · specialises → Ambient Activity Channel ·
needs → Standing Assertion

---

### 3 · Closed Vocabulary

**Intent.** Let the agent name a state from a fixed list and let the renderer own
what that looks like, so unsafe output is not *rejected* but **inexpressible**.

**Motivation.** An agent that can ask a light for a colour, a brightness and a
waveform can ask it to strobe. The obvious defence is a validator — and a
validator is a check somebody has to remember to write, can be bypassed by a
second code path, and drifts the moment it is duplicated.

A vocabulary with no field for a waveform cannot carry one. So "never allow
agent-generated strobing" stops being a rule anyone enforces and becomes a fact
about what is sayable. The agent asks for `focus` or `evening`; pigment, ramp and
dynamics never leave the renderer.

This is Turn 9's *"the channel reports state, never instructions"* promoted from
a design note to the thing that makes the layer safe to leave unsupervised.

**Applicability.** Whenever an unsupervised agent drives an actuator in a shared
physical space, and the harmful states are a describable class.

**Consequences.** *Gain:* the safety property is a property of the protocol, so
it holds for every producer including ones written later. *Gain:* the palette can
be retuned without touching the agent. *Cost:* the agent cannot express something
the vocabulary lacks, and adding a word is a deliberate act. *Trap:* the relay
must **not** re-validate. The renderer is the single choke point at the hardware
and a second copy of the policy drifts from the first.

**Implementation.** Lookup returns an optional over a static table; an unknown
name is refused and the known list is logged, never approximated. Treat the
obvious near-misses as clears — `off`, `none`, `clear`, `normal`, `default` —
because the agent side maps a model's word to the wire, and a missed mapping
would see a literal "off" refused as unknown while both halves believed they had
agreed.

**How you would know this is unnecessary.** If the actuator were incapable of
harm — a display that physically cannot strobe — or if agent output were reviewed
by a person before reaching the hardware. The rule exists because the actuator is
in the room, the agent is unsupervised, and the failure mode is not recoverable
by noticing it.

**Incident.** The relay shipped parsing the wrong key: the tray matched `type`
where the contract, written in the same session, specified `t`. Symptom: none
whatsoever. The line arrived, matched nothing, fell into the catch-all and did
nothing — no error, no log, no lamp. Found by code review, not by test. The
tray→renderer wire is pinned byte-for-byte; the channel→tray wire is a different
boundary and had no test at all, and **a pass-through event is precisely the kind
that cannot report its own absence.**

**Relations.** realises → Ambient Activity Channel · bounded by → Single
Precedence

---

### 4 · Deference at Rest

**Intent.** A person's hand on the device always wins — implemented only where
"wins" is decidable, which is when nothing is moving.

**Motivation.** The lamp has other controllers: a vendor app, a schedule, a
switch. The floor lamp was observed changing state on its own mid-session, which
is also why capture-and-restore was rejected — it would have fought whatever else
was driving it.

So the renderer watches for its commanded state and the device's actual state
disagreeing, and treats the disagreement as a person. But it can only do that at
rest. A live cue repaints every frame; comparing observed state against a moving
target registers a mismatch almost immediately, and agent control would suspend
itself permanently within seconds of the first conversation. **The at-rest
restriction is not a shortcut — it is what makes the feature possible at all.**

**Applicability.** Any actuator with more than one controller, where one of them
is a person and cannot be asked.

**Consequences.** *Gain:* the agent yields without needing to be told. *Cost:* a
poll, and a cooldown that is a guess. *Trap:* scope. The suspension covers scenes
only. Dimming a lamp by hand is a preference about the room; it is not a wish to
stop being told the agent is unreachable. **A hand silences taste and leaves the
instrument alone** — the same rule that puts presence above ambient.

**Implementation.** Poll device status every 20 s against the last commanded
state; a mismatch drops the current scene and refuses new ones for 30 minutes.
Gate the comparison on a believed-resting-state accessor that returns nothing
unless the renderer is idle.

**How you would know this is unnecessary.** If the renderer were the only
controller — no vendor app, no schedules, no physical switch.

⚠️ **Evidence.** This is the weakest-evidenced entry in the set. It is
unit-tested and has **never been confirmed against a real hand on the device.**
Everything above is what the code does, not what has been observed to happen.
That goes on the page.

**Relations.** yields to → the principal · bounds → Closed Vocabulary

---

### 5 · Single Precedence

**Intent.** A one-slot channel can show one thing, so the order of precedence
*is* the design — and it has to live in one place a person can read in five
seconds, or it is not a safety property at all.

**Motivation.** Turn 9 says the renderer owns "a priority stack", singular. What
was built has two, in two structures of different shape: an if/else chain over
time-to-lived live cues, and a separate sequence of early returns for the resting
look, reached only when no live cue is active. Neither can see the other. No test
asserts the composite.

And the written composite is wrong at the first step. The documentation records
`presence-off > live cue`; the code executes `live cue > presence-off`, because
the resting chain is never reached while a cue is live.

The code is probably right — if a cue is arriving then something is demonstrably
happening, so "nobody is listening" is stale information. That is not the point.
The point is that **two people could each change one structure, each preserve
their own invariant, and break the joint one, and nothing would say so.**

**Applicability.** Any channel narrow enough that states compete for the only
slot — which is every peripheral channel.

**Consequences.** *Gain:* an alarm cannot queue behind a flourish. *Gain:* taste
cannot outrank an instrument, which is what makes a decorative layer safe to add.
*Cost:* every new state must be placed, and placing it is a safety decision.
*Trap:* the ranking split across two structures, which is the state this instance
is actually in.

**Implementation.** One ordering, one expression, one test that asserts the
composite order end to end rather than each half separately.

**How you would know this is unnecessary.** If the channel could carry more than
one state at once without ambiguity — two devices, or a surface with room for a
second mark. Note that this is exactly what the multi-lamp question opens, and it
is not obviously an improvement: see §9.

⚠️ **This entry's own instance fails it.** Published that way deliberately. We
found it by looking rather than in review, and a pattern demonstrated by its
reference implementation falling short is worth more than one demonstrated by a
tidy listing.

**Relations.** corrects → Ambient Activity Channel · bounds → Closed Vocabulary ·
ranks → Verified Presence

---

### 6 · Darkness as Alarm

**Intent.** Keep the resting state *lit*, so that the channel's most perceptible
transition — to zero — is reserved for the one condition worth interrupting for.

**Motivation.** Peripheral vision is rod-dominated: acutely sensitive to
luminance change, poor at hue. A violet-versus-amber distinction beside the
monitor has to be *looked at*, which is the one thing a peripheral channel is
supposed not to require. Brightness is also the only **ordered** dimension the
channel has — more is more, with no legend to learn. So the largest signal
available is going dark, and there is exactly one of it to spend.

What made it spendable was **deleting the mode**. While the resting glow meant
"Agent mode is selected", dark meant *Dictation* far more often than it meant
*broken*: the commonest state in the day occupied the loudest signal on the
channel and drowned the only one worth having. Once the chord carried the intent
— one chord dictates, another talks to the agent — there was no mode to be in,
presence became "reachable and not paused", and the lamp is normally on. Darkness
became rare, and rare is the whole mechanism.

The question the glow answers moved with it, from "is she listening?" to **"could
I talk to her right now?"** — which is the question you have *before* pressing a
key, and therefore the one an always-on surface should be answering.

**Applicability.** A peripheral channel with one ordered dimension, in a space
that is normally lit, where exactly one condition warrants interruption.

**Consequences.** *Gain:* the alarm needs no legend, no colour memory and no
focus; it works from across the room and out of the corner of the eye. *Gain:* it
costs nothing extra — no second device, no second mark, no screen. *Cost:* the
resting state must be on, continuously, which makes the resting look a real
constraint rather than a flourish — it has to be quiet enough to live beside all
day (here: a dim violet-white slow breath at brightness 1). *Cost:* you get
**one** alarm. A second condition deserving interruption has nowhere to go.
*Trap:* the room must be normally lit; the signal is a luminance *change*, so in
a dark room it inverts and there is nothing to spend. *Trap:* silence must not
be darkness — see below, because this is the one that would quietly destroy it.

**Implementation.** Presence is three-valued, not boolean. *No producer has ever
reported* — an older tray, a scripted replay — falls back to ambient exactly as
before; *presence reported and off* goes dark. That distinction is what lets
darkness carry meaning while staying backward compatible, and it has a safety
consequence beyond compatibility: **darkness is only ever asserted, never
defaulted into.** Had silence resolved to dark, the alarm would fire on a missing
producer rather than on the condition it names, and the first thing anyone would
learn is to ignore it.

**How you would know this is unnecessary.** If a second condition deserved
interruption. The moment there are two alarms the loudest signal has to be
shared, darkness stops naming one thing, and a legend comes back. Also
unnecessary where the resting state cannot be on — a channel that is off by
default has no darkness to spend — or in a room that is normally dark.

⚠️ **Evidence.** *Reported.* The physiology and the design reasoning are stated
in the renderer's own documentation and the change log; the mode deletion that
made darkness rare is verified. **The claim that a real presence-off is
unmissable has not been tested** — nobody has been in the room, not expecting it,
when the channel actually died.

One observation points the right way and is offered as no more than that. The
thinking state was originally ended when the reply arrived rather than when
playback did; because a reply exists 5.1–5.4 s before it is audible, the lamp
went dark for five seconds at precisely the moment it should have been saying
*nearly there*. It was noticed at once in live use, treated as a defect, and
closed by adding a state to cover the gap. That is not evidence that darkness
alarms. It is evidence that **a spurious darkness is not tolerated**, which is
the discipline this pattern requires of whoever holds it.

**Relations.** specialises → Ambient Activity Channel · relies on → Verified
Presence — darkness means *unreachable* only because reachability is actually
checked · ranked by → Single Precedence · at risk from → the multi-lamp question
(§9): one dark lamp beside one lit lamp is not an alarm, it reads as a lamp that
broke

---

### 7 · The Night Cap

**Intent.** Bound the layer's *taste* by context and leave its *instruments*
alone, so that a decorative capability never becomes a reason to switch the whole
channel off.

**Motivation.** An agent that can name a scene can name a bright one at 2am. The
obvious defence is a global brightness ceiling by hour — simple, and wrong,
because it caps the alarm too. **Capping taste is protective; capping an
instrument is just breaking it quietly.** An error you cannot see at 2am is
exactly the failure this layer exists to prevent.

So the clamp is applied at one point — a scene's brightness on its way to the
device — and conversation cues pass it untouched. They last seconds, they are
responses to something you just did, and they are the entire reason the channel
is trusted at all.

This is the same cut as Deference at Rest, one axis over. A hand on the lamp
silences taste and leaves the instrument alone; the hour silences taste and
leaves the instrument alone. Two unrelated pressures, and the boundary lands in
the same place both times — which is the best evidence available that it is the
right boundary and not a convenience.

**Applicability.** Any ambient layer carrying both decoration and signal, whose
acceptable intensity varies with a context the layer can observe — hour,
occupancy, a presentation, a meeting.

**Consequences.** *Gain:* the layer stays on at night. Without the cap the honest
choice is to disable the whole thing after hours, which disables the alarm — the
capability would have cost the instrument. *Cost:* two classes of output now
exist and every new state must be classified, silently wrong in both directions:
a capped instrument is unreadable at night, an uncapped decoration is a light in
your eyes. *Trap:* the failure direction of the clock. *Trap:* the boundaries are
guesses — 22:00, 07:00 and brightness 30 are unmeasured, and a fixed window is
wrong for a household on other hours and wrong twice a year.

**Implementation.** Clamp scene brightness to 30 between 22:00 and 07:00 local,
on the scene path only. The window wraps midnight, so it is a union and not a
range. Local hour comes from a six-line `GetLocalTime` binding rather than a date
crate, because that crate commits to exactly one dependency and pulling a
calendar library in to read one integer is the worse trade.

The detail worth copying is the failure direction: the FFI struct is zeroed
before the call, and a zeroed struct reads as **hour 0 — inside the night
window**. If the call does nothing whatsoever, the cap engages rather than lifts.
A cap that fails open is not a cap. (The non-deployed platform stub deliberately
does *not* cap, on the stated grounds that a guessed timezone offset is worse
than none — a different judgement, applying only where the renderer does not
run.)

**How you would know this is unnecessary.** If the layer carried no decoration.
A channel that only ever reports state has nothing to cap, because everything on
it is an instrument and an instrument you cannot see is broken. The cap exists
**because** Closed Vocabulary let taste onto the channel; it is the price of that
capability, and the whole design is that the price is charged to taste alone.

⚠️ **Evidence.** *Reported*, with the constants read from source. **Never
observed at night.** Nobody has recorded whether 30 is the right ceiling, and the
uncapped-cue decision is untested in precisely the case it exists for — no one
has watched an error state arrive at 2am and judged whether it read.

**Relations.** priced by → Closed Vocabulary — the cap is what that capability
costs · shares its cut with → Deference at Rest · must not reach → Darkness as
Alarm · ranked by → Single Precedence

---

## 8. The Provisional half was held, and the measurement has returned

**2026-08-15.** The commissioned test is in (`om-004-evidence-2026-08-15.md`).
The half is unblocked, and the answer is sharper than the question.

**Continuous re-reading cannot change the final text.** Not "did not" — *cannot*,
by construction. The captured audio buffer has exactly one write site, inside the
hold loop; at release the corrector waits for any pass still in flight, **discards
it**, and issues one fresh pass over every captured sample whose text replaces
everything the continuous stream produced. The diff the commission asked for is
zero before it is measured. The empirical half supplies what the structural
argument needs: the corrector is a function of its input — 51/51 clips gave one
answer over three passes, and 51/51 were unchanged by whether a dozen continuous
requests had preceded them.

So the commission's framing survives: continuous re-reading buys **liveness
only**, at 11.1× the corrector time the release pass costs.

**But the deletion is the other one.** The expectation was that the scribe would
go. It should not. The corrector's stream runs a cadence plus an inference behind
the microphone — median 0.54 s — and had reached the release pass's answer before
release in only 12 of 51 utterances, at a median 97% of the way through. Against
the scribe's 50 ms that is *a different kind of feedback, not a slower one*.
Delete the continuous re-reading; keep the scribe.

### What that does to the seven entries

**No role dies.** That is the finding's real shape and it is worth stating
carefully, because the commission was framed as "two of four roles doing one job"
and the resolution is not a role at all. Scribe, corrector, house style and
exemplar all survive. What turns out to do nothing for the artifact of record is
the corrector's **cadence** — a mode of operation that was never named as a role,
did not appear in the arrangement, and is the most expensive thing in it.

- **Draft and Record** is stated more purely, not weakened: the record is one
  authoritative pass at release, the draft is the scribe, and the continuous
  re-reading was a third thing that was neither.
- **Churn Is Not Correction** is now the strongest entry in the half, carrying a
  measured gradient rather than an anecdote.
- **No Frozen Prefix** and **The Visible Seam** govern the *live view only* —
  the final text has no prefix to freeze, being one pass over complete audio. And
  the live view is precisely what the evidence proposes to delete. So both
  patterns are about to have their reference instance retired.

That last point is the template addition working, and it is the **second** time in
this paper: Single Precedence is failed by its own instance, and now two
Provisional entries have their "how you would know this is unnecessary" condition
answered *by their own reference implementation*. Neither pattern dies with it —
they are claims about live-revising surfaces in general, which is why this
language is deliberately not named for the modality. But the exemplar goes, and
saying so is the discipline the field exists to enforce.

### What still needs a person

The evidence names its own falsification test and it is not a rig question:
**§5 flips if someone, in a blind comparison, prefers the hold with continuous
correction to the hold without it.** Eleven times the corrector time may be worth
it for accurate text appearing while you hold. Nothing measures taste. That is
the deferred perception experiment, and it now decides an architecture rather
than a preference.

---

## 9. Open questions, for the page

**The room.** Two floor lamps behind the desk would make the *room* the surface,
and it can then carry a composed look — red and blue key — which is taste
occupying the slot the alarm needs. Not built. Four failure modes, in the order
they are expected to bite:

1. **Presence has no addressee.** The event says *who* is present, not *where*.
   With two lamps you must decide whether presence is a property of the room or
   of a surface, and there is nowhere to put that. An agent→lamp mapping would
   put topology into the protocol, which is the thing Closed Vocabulary exists to
   keep out.
2. **Precedence is per-renderer, not per-room.** Two renderers resolving
   independently can disagree, and the room then asserts two contradictory things
   at once. This breaks darkness-as-alarm specifically: that signal depends on
   *the room* going dark. One dark lamp beside one lit lamp is not an alarm — it
   reads as a lamp that broke.
3. **Deference becomes ambiguous.** A hand on lamp A should suspend agent control
   of lamp A. Should it suspend lamp B? If yes, one touch silences an instrument
   across the room. If no, "a person always wins" is true of a bulb and not of
   the room.
4. **The reply port is a single resource.** Replies arrive on a fixed port
   whatever port the request left from, so two renderers on one host contend
   directly.

Offered as a hypothesis and not more: one renderer driving many lamps, with lamps
carrying **roles** — instrument versus ambience — rather than one renderer per
lamp. That keeps precedence single, keeps the room speaking with one voice, and
gives presence somewhere to land without the protocol learning about topology.
Untested.

**Whether the amber highlight survives contact with churn.** *Answered, and the
answer is unpublished.* The display marked a word amber whenever it differed from
the previous pass, so every `15`↔`fifteen` flip fired it again on the same word,
alternating, carrying nothing — a signal firing often enough to be ignored, after
which the real corrections it exists to show go past unseen. The repair is a
clean one and belongs in the half: **a word returning to a value that position
has already held is not a correction.** The first transition still shows, because
that one is news; a word finding genuinely new readings keeps reporting.
Suppression is keyed on *returning to something known*, not on having changed
before.

⚠️ It is committed on an unpushed branch and is not in the running binary, so it
is **not** citable yet — a measurement proves the code you measured, and this
paper has now been caught once on exactly that distinction (§5). It also
decorates the live view, which §8's evidence proposes to delete; if that deletion
happens, this is a fix to something that goes away.

**Whether the scribe is still needed.** *Answered 2026-08-15: yes* — and the
evidence deletes the corrector's continuous cadence instead (§8). The point stands
and is strengthened: it was settled by measurement rather than taste. What
remains open is the half of it that is **not** measurable by rig — whether anyone
prefers the hold with continuous correction — and that now decides an
architecture.

---

## 10. Decisions still open, and one correction to the record

- **Where the prose is canonical.** Recommendation: this set is born canonical in
  `/patterns` and OM-004 is written as an argument from the start — the shape
  OM-001 only reached at Rev. 3. Free if decided now, expensive if not. Fleet,
  Arrangements and Yard are already committed to that migration.
- **Whether this is one paper or two.** Recommendation: one, on OM-003's
  precedent, written to be separable.
- **The set names.** Presence and Provisional. `presence` and `provisional` as
  `lang` keys.
- **Nothing ships until both halves exist.** Half a language on the site, with no
  paper to point at, is worse than nothing.

⚠️ **A previous attempt was published and reverted.** On 2026-08-14 the
Scriptorium was merged into `/patterns` as Turn pattern 15 in Part VI and
reverted two minutes later; the live site never carried it for any meaningful
interval. It placed an arrangement of six patterns as a single Turn pattern,
which is the reason it was reverted and remains a good one.

⚠️ **2026-08-15 — the second charge against it was wrong, and this document made
it twice.** Rev. 1 of this section said the entry "asserted *'a pass thirty
seconds in may rewrite a word from the first sentence'*, which the evidence pass
has since shown does not happen and cannot happen in 99.4% of real utterances."
**The sentence is true.** The 2026-08-15 pass observed a revision reaching
**35.6 s back, rewriting the utterance's first word.**

Two claims had been fused, and only one of them was ever supported:

- *"does not happen"* — inferred from absence in a three-segment corpus that was
  too short to contain the case. A possibility claim cannot be refuted by a
  corpus incapable of exhibiting it. **Falsified by direct observation.**
- *"cannot happen in 99.4% of real utterances"* — a frequency claim off n=1502
  logged durations. **Still true, and untouched.**

What fails is the *implication*, and the repair is better than either version:
**churn scales with reach.** A revision reaching 0–1 s back is a word returning
to a value that position already held 1% of the time; beyond 10 s, 94%. All six
of the deepest events were one word alternating `Pi`↔`Py` and never settling. So
the reach is real and its content is almost entirely oscillation, and the two
facts scale against each other.

The source document is corrected in place with that table rather than deleted.
The two passes' depth numbers **cannot be reconciled** — the 2026-08-14
instrument was built in a session scratchpad and no longer exists, so its
definition of "back" cannot be inspected. That is recorded as open, not resolved.

One finding from that attempt survives and is **not** in the evidence pass or in
the source document — it exists only in the reverted commit's message, which is
the most fragile place a finding can live, so it is recorded here:

> The two injection points fail **asymmetrically**. The house style can be
> hand-immunised against a stale exemplar and should be; the corrector cannot,
> because a term is either in the file it reads or it is not, and there is no
> hand-written fallback for *hearing*. A divergent copy therefore degrades the
> system in one direction and says nothing — still spelling the word correctly,
> no longer able to hear it.

So "one source, two mechanisms, no drift possible" is a claim about the file, not
about the filesystem. That belongs in One Exemplar, Two Injections when the
Provisional half is drafted.
