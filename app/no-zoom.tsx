"use client";

import { useEffect } from "react";

export default function NoZoom() {
  useEffect(() => {
    const block = (e: Event) => e.preventDefault();
    document.addEventListener("gesturestart", block);
    document.addEventListener("gesturechange", block);
    return () => {
      document.removeEventListener("gesturestart", block);
      document.removeEventListener("gesturechange", block);
    };
  }, []);

  return null;
}