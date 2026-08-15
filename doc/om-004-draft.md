# OM-004 — working draft

*Not a publication. This is the drafting document for OM-004: the argument, the
set structure, the addition to the template, and the Presence half written out
in full. The Provisional half is deliberately held — see §8.*

Status: 2026-08-14. Evidence in `om-004-evidence-2026-08-14.md`. Nothing here has
been published, and one earlier attempt was reverted (see §10).

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
a pattern that specifies the test that retires it. The Provisional half has a
live instance — whether the scribe is still needed is a running experiment with a
measurable outcome, not a matter of taste.

Where we cannot state the condition, the entry says so.

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
| 6 | Darkness as Alarm | not gathered — reasoned or observed is unanswered | — |
| 7 | The Night Cap | not gathered | — |

**Provisional** — the sub-turn. Elaborates Streaming Turn and Honest Gauge.

| # | Entry | Evidence | Drafted |
|---|---|---|---|
| 1 | Draft and Record | WER tables reported | held |
| 2 | No Frozen Prefix | **verified, and rescaled** | held |
| 3 | The Visible Seam | structure verified; perception untested | held |
| 4 | Churn Is Not Correction | verified — the finding nobody went looking for | held |
| 5 | Deterministic Last Mile | verified: fires on 1.2% of utterances | held |
| 6 | One Exemplar, Two Injections | verified, with a measured cost and an asymmetry | held |
| 7 | Split the Substrate | boundary established | held |

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

## 8. The Provisional half is held, and why

One measurement can restructure it. If only 2 of 39 deep revisions are
unambiguous improvements, then continuous re-reading may be buying **liveness
only** in the final transcript — which is precisely what the scribe exists for,
and two of the four roles would be doing one job.

That test is commissioned: run a single corrector pass over each complete
utterance in the logged corpus and diff it against what continuous re-reading
produced. Until it returns, drafting the Provisional entries risks writing an
arrangement that is about to lose a role.

Everything else needed for that half is a gathering task, not a decision:
incidents for the six entries, and the two remaining Presence rules.

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

**Whether the amber highlight survives contact with churn.** The display marks a
corrected word amber for one refinement cycle, and has never been evaluated. On
the measured revision behaviour it would flash repeatedly on `15`/`fifteen` while
carrying no information.

**Whether the scribe is still needed** — and the fact that this is *measurable*
rather than a matter of taste is the point.

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
interval. That entry is superseded on two counts and both should be recorded
rather than quietly dropped: it placed an arrangement of six patterns as a single
Turn pattern, and it asserted *"a pass thirty seconds in may rewrite a word from
the first sentence"*, which the evidence pass has since shown does not happen and
cannot happen in 99.4% of real utterances.

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
