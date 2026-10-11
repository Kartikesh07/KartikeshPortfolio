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
  const walking = transitionMoru(curious, { type: "SCROLL" });
  const fan = transitionMoru(walking, { type: "FAN" });
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

test("project curiosity cannot replace walking and settling cannot finish a fan", () => {
  const walking = transitionMoru(initialMoruState, { type: "SCROLL" });
  assert.equal(transitionMoru(walking, { type: "PROJECT" }), walking);
  const fan = transitionMoru(walking, { type: "FAN" });
  assert.equal(transitionMoru(fan, { type: "SETTLED" }), fan);
});
