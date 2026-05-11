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
  const xPct = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
      // Normalize Y against the heatmap design reference height so recorded
      // events map correctly to the admin wireframe. The original page
      // mockup was designed at ~2479px height and the canvas is scaled to
      // 1080px in the admin heatmap. Using this reference keeps points
      // consistent across different client viewport heights.
      const DESIGN_PAGE_H = 2479; // px (design baseline)
      const absoluteY = e.clientY + window.scrollY;
  const yPct = Math.min(1, Math.max(0, absoluteY / DESIGN_PAGE_H));
      sendEvent(xPct, yPct, page, "click");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      hoverTimer.current = setTimeout(() => {
  const xPct = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
        const DESIGN_PAGE_H = 2479;
        const absoluteY = e.clientY + window.scrollY;
  const yPct = Math.min(1, Math.max(0, absoluteY / DESIGN_PAGE_H));
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
