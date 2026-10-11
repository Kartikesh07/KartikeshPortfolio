// Animation completion carries an epoch so an interrupted timeline cannot
// accidentally finish a newer animation. Add new gestures here, not in listeners.
export const initialMoruState = { value: "idle", epoch: 0 };
const gestures = {
  ENTER: "entering",
  SCROLL: "scrolling",
  PROJECT: "curious",
  LOOK: "curious",
  HOVER: "hovering",
  BLINK: "blinking",
  BREATHE: "breathing",
  PREEN: "preening",
  STRETCH: "stretching",
  SLEEP: "sleepy",
  WAKE: "waking",
};

export function transitionMoru(state, event) {
  let next = state.value;
  if (event.type === "HIDE") next = "hidden";
  else if (event.type === "PAUSE") next = "paused";
  else if (event.type === "SUSPEND") next = "suspended";
  else if (["SHOW", "RESUME"].includes(event.type)) {
    if (["hidden", "paused", "suspended"].includes(state.value)) next = "idle";
  } else if (!["hidden", "paused", "suspended"].includes(state.value)) {
    if (event.type === "FAN") next = "fanning";
    else if (event.type === "WAKE" && state.value === "sleepy") next = "waking";
    else if (state.value === "idle" && gestures[event.type])
      next = gestures[event.type];
    if (
      event.type === "COMPLETE" &&
      event.epoch === state.epoch &&
      !["idle", "sleepy"].includes(state.value)
    )
      next = "idle";
  }
  return next === state.value ? state : { value: next, epoch: state.epoch + 1 };
}
