// Animation completion carries an epoch so an interrupted timeline cannot
// accidentally finish a newer animation. Add new gestures here, not in listeners.
export const initialMoruState = { value: "idle", epoch: 0 };

export function transitionMoru(state, event) {
  let next = state.value;
  if (event.type === "HIDE") next = "hidden";
  else if (event.type === "PAUSE") next = "paused";
  else if (event.type === "SUSPEND") next = "suspended";
  else if (["SHOW", "RESUME"].includes(event.type)) {
    if (["hidden", "paused", "suspended"].includes(state.value)) next = "idle";
  } else if (!["hidden", "paused", "suspended"].includes(state.value)) {
    if (event.type === "FAN") next = "fanning";
    else if (state.value !== "fanning") {
      if (event.type === "SCROLL") next = "walking";
      else if (event.type === "SETTLED" && state.value === "walking")
        next = "idle";
      else if (event.type === "PROJECT" && state.value === "idle")
        next = "curious";
      else if (event.type === "BLINK" && state.value === "idle")
        next = "blinking";
      else if (event.type === "LOOK" && state.value === "idle")
        next = "curious";
    }
    if (
      event.type === "COMPLETE" &&
      event.epoch === state.epoch &&
      ["fanning", "curious", "blinking"].includes(state.value)
    )
      next = "idle";
  }
  return next === state.value ? state : { value: next, epoch: state.epoch + 1 };
}
