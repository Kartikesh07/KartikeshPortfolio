import test from "node:test";
import assert from "node:assert/strict";
import { initialMoruState, transitionMoru } from "./moruMachine.js";

test("scroll, project hover, and repeated taps cannot interrupt a feather fan", () => {
  const fan = transitionMoru(initialMoruState, { type: "FAN" });
  for (const type of ["SCROLL", "PROJECT", "BLINK", "FAN", "SETTLED"]) {
    assert.equal(transitionMoru(fan, { type }), fan);
  }
  assert.equal(
    transitionMoru(fan, { type: "COMPLETE", epoch: fan.epoch }).value,
    "idle",
  );
});

test("completion of an interrupted gesture cannot cancel a newer gesture", () => {
  const curious = transitionMoru(initialMoruState, { type: "PROJECT" });
  const fan = transitionMoru(curious, { type: "FAN" });
  assert.equal(
    transitionMoru(fan, { type: "COMPLETE", epoch: curious.epoch }),
    fan,
  );
});

test("pause, hide, and background suspension suppress gesture events", () => {
  for (const type of ["PAUSE", "HIDE", "SUSPEND"]) {
    const stopped = transitionMoru(initialMoruState, { type });
    for (const input of ["FAN", "SCROLL", "PROJECT", "BLINK", "COMPLETE"]) {
      assert.equal(
        transitionMoru(stopped, { type: input, epoch: stopped.epoch }),
        stopped,
      );
    }
    assert.equal(
      transitionMoru(stopped, { type: type === "HIDE" ? "SHOW" : "RESUME" })
        .value,
      "idle",
    );
  }
});

test("project curiosity cannot replace a scroll reaction and settling cannot finish a fan", () => {
  const scrolling = transitionMoru(initialMoruState, { type: "SCROLL" });
  assert.equal(scrolling.value, "scrolling");
  assert.equal(transitionMoru(scrolling, { type: "PROJECT" }), scrolling);
  const fan = transitionMoru(scrolling, { type: "FAN" });
  assert.equal(transitionMoru(fan, { type: "SETTLED" }), fan);
});

test("expressive gestures run exclusively and pause cancels an entrance", () => {
  for (const type of ["ENTER", "PREEN", "STRETCH", "BREATHE", "HOVER"]) {
    const gesture = transitionMoru(initialMoruState, { type });
    assert.notEqual(gesture.value, "idle");
    for (const input of ["SCROLL", "PROJECT", "BLINK", "PREEN", "HOVER"]) {
      assert.equal(transitionMoru(gesture, { type: input }), gesture);
    }
    assert.equal(
      transitionMoru(gesture, { type: "COMPLETE", epoch: gesture.epoch }).value,
      "idle",
    );
    const paused = transitionMoru(gesture, { type: "PAUSE" });
    assert.equal(
      transitionMoru(paused, { type: "COMPLETE", epoch: gesture.epoch }),
      paused,
    );
  }
});

test("sleep holds its pose until visitor activity wakes Moru", () => {
  const asleep = transitionMoru(initialMoruState, { type: "SLEEP" });
  assert.equal(asleep.value, "sleepy");
  assert.equal(
    transitionMoru(asleep, { type: "COMPLETE", epoch: asleep.epoch }),
    asleep,
  );
  assert.equal(transitionMoru(asleep, { type: "SCROLL" }), asleep);
  const awake = transitionMoru(asleep, { type: "WAKE" });
  assert.equal(awake.value, "waking");
  assert.equal(
    transitionMoru(awake, { type: "COMPLETE", epoch: awake.epoch }).value,
    "idle",
  );
});
