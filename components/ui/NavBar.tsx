"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

type ClickBubble = {
  id: number;
  left: string;
  size: number;
  dur: number;
  delay: number;
};

let uid = 0;

export function NavBar() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [clickBubbles, setClickBubbles] = useState<ClickBubble[]>([]);
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalEl(document.getElementById("bubble-portal"));
  }, []);

  const spawnBubbles = useCallback(() => {
    const batch: ClickBubble[] = Array.from({ length: 22 }, () => ({
      id: ++uid,
      left: `${2 + Math.random() * 96}%`,
      size: 5 + Math.random() * 20,
      dur: 6 + Math.random() * 6,
      delay: Math.random() * 0.6,
    }));
    setClickBubbles((prev) => [...prev, ...batch]);
    setTimeout(
      () => setClickBubbles((prev) => prev.filter((b) => !batch.includes(b))),
      13000
    );
  }, []);

  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      spawnBubbles();
      if (pathname === "/") {
        e.preventDefault();
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [pathname, spawnBubbles]
  );

  const anchor = (id: string) => (pathname === "/" ? `#${id}` : `/#${id}`);

  return (
    <>
      {/* Burst bubbles portalled into z:1 layer — content at z:2 paints over them */}
      {portalEl && createPortal(
        <>
          {clickBubbles.map((b) => (
            <span
              key={b.id}
              className="pointer-events-none absolute bottom-0 rounded-full"
              style={{
                left: b.left,
                width: b.size,
                height: b.size,
                border: "1.5px solid rgba(46,206,206,0.5)",
                background: "rgba(46,206,206,0.07)",
                animation: `bubble-rise ${b.dur}s ${b.delay}s ease-in both`,
              }}
            />
          ))}
        </>,
        portalEl
      )}

      <header
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{
          background: "var(--nav-bg)",
          borderColor: "var(--border-faint)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
          aria-label="Navigation principale"
        >
          <Link href="/" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/logotype_mytilimer_RVB_blanc.png"
              alt="Mytilimer Groupe"
              className="block h-9 w-auto object-contain dark-logo"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/logotype_mytilimer_RVB.png"
              alt="Mytilimer Groupe"
              className="hidden h-9 w-auto object-contain light-logo"
            />
          </Link>

          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              href={anchor("product-process")}
              className="hidden text-sm font-medium opacity-[0.65] transition-opacity hover:opacity-100 sm:block"
              style={{ color: "var(--color-brand)" }}
              onClick={(e) => handleAnchorClick(e, "product-process")}
            >
              Process
            </Link>
            <Link
              href={anchor("dosage")}
              className="hidden text-sm font-medium opacity-[0.65] transition-opacity hover:opacity-100 sm:block"
              style={{ color: "var(--color-brand)" }}
              onClick={(e) => handleAnchorClick(e, "dosage")}
            >
              Dosage
            </Link>

            {/* Theme toggle */}
            <button
              onClick={() => { toggle(); spawnBubbles(); }}
              aria-label={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80"
              style={{ background: "var(--border-faint)", color: "var(--color-brand)" }}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4" aria-hidden="true" />
              )}
            </button>

            <Link
              href="/contact"
              className="rounded-full px-4 py-2 text-sm font-semibold transition-opacity hover:opacity-85"
              style={{ background: "var(--color-brand)", color: "var(--color-canvas)" }}
              onClick={() => spawnBubbles()}
            >
              Contact B2B
            </Link>
          </div>
        </nav>
      </header>
      <div className="h-[57px]" aria-hidden="true" />
    </>
  );
}
