"use client";

import { useEffect, useRef } from "react";

function sendEvent(xPct: number, yPct: number, page: string, type: "click" | "hover") {
  fetch("/api/track/click", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ xPct, yPct, page, type }),
    keepalive: true,
  }).catch(() => {});
}

export function AnalyticsTracker({ page }: { page: string }) {
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const xPct = e.clientX / window.innerWidth;
      const pageH = document.documentElement.scrollHeight;
      const yPct = pageH > 0 ? (e.clientY + window.scrollY) / pageH : e.clientY / window.innerHeight;
      sendEvent(xPct, yPct, page, "click");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => {
        const xPct = e.clientX / window.innerWidth;
        const pageH = document.documentElement.scrollHeight;
        const yPct = pageH > 0 ? (e.clientY + window.scrollY) / pageH : e.clientY / window.innerHeight;
        sendEvent(xPct, yPct, page, "hover");
      }, 600);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, [page]);

  return null;
}
