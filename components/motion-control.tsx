"use client";

import { useState } from "react";

export function MotionControl({ locale }: { locale: Locale }) {
  const [paused, setPaused] = useState(false);
  function toggle() {
    setPaused((value) => {
      const next = !value;
      document.documentElement.dataset.motion = next ? "paused" : "playing";
      return next;
    });
  }
  return <button className="motion-control" type="button" onClick={toggle} aria-pressed={paused} data-paused={paused ? "true" : "false"}>
    <span>{paused ? "▶" : "Ⅱ"}</span>{locale === "ko" ? (paused ? "모션 재생" : "모션 정지") : (paused ? "Play motion" : "Pause motion")}
  </button>;
}

type Locale = "ko" | "en";
