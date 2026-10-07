"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const mq = window.matchMedia("(display-mode: standalone)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getSnapshot() {
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    nav.standalone === true // iOS
  );
}

export function useStandalone() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}