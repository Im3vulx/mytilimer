"use client";

import { useEffect, useRef } from "react";

type Point = { xPct: number; yPct: number };

// Canvas dimensions
const W = 960;
const H = 1080;

// Layout constants (desktop, scale 0.436 from 2479px page height)
const PX = 40;   // horizontal page margin
const CW = 880;  // content width
const LW = 513;  // left hero col  (7/12 of CW)
const COL_GAP = 32;
const RX = PX + LW + COL_GAP; // 585 — right col start
const RW = CW - LW - COL_GAP; // 335 — right col width

// Section Y boundaries (real px × 0.436)
const Y = {
  navEnd: 25,
  heroGridStart: 53,
  heroImgEnd: 313,    // image bottom (clipped by section)
  heroCtaCard: 323,
  heroCtaCardEnd: 394,
  heroEnd: 422,
  dosageHeaderStart: 450,
  dosageCalcStart: 529,
  dosageCalcEnd: 729,
  dosageEnd: 757,
  ppHeaderStart: 785,
  ppCardsStart: 867,
  ppCardsEnd: 991,
  ppCtaStart: 1008,
  ppCtaEnd: 1052,
  ppEnd: 1080,
};

// PP cards: gap-4 (16px → 7px at scale), 4 equal cards
const PP_GAP = 7;
const PP_CARD_W = Math.round((CW - PP_GAP * 3) / 4); // ~214px
const PP_PHOTO_H = 77; // h-44=176px × 0.436

// Dosage intensity buttons: 4 in a row inside calculator
const CALC_INNER_X = PX + 12;
const CALC_INNER_W = CW - 24;
const BTN_W = Math.round((CALC_INNER_W - 3 * 4) / 4); // ~214px each

function Line({ x1, y1, x2, y2, dash }: { x1: number; y1: number; x2: number; y2: number; dash?: boolean }) {
  return (
    <line
      x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="rgba(255,255,255,0.07)"
      strokeWidth="0.5"
      strokeDasharray={dash ? "4 4" : undefined}
    />
  );
}

function Rect({ x, y, w, h, rx = 4, fill = "rgba(255,255,255,0.025)", stroke = "rgba(255,255,255,0.09)", strokeWidth = 0.5 }: {
  x: number; y: number; w: number; h: number; rx?: number;
  fill?: string; stroke?: string; strokeWidth?: number;
}) {
  return <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth={strokeWidth} />;
}

function Label({ x, y, text, anchor = "middle", size = 8, opacity = 0.45 }: {
  x: number; y: number; text: string; anchor?: "middle" | "start" | "end"; size?: number; opacity?: number;
}) {
  return (
    <text
      x={x} y={y}
      fontSize={size}
      fontFamily="monospace"
      textAnchor={anchor}
      fill={`rgba(160,210,255,${opacity})`}
      letterSpacing="1.2"
    >
      {text.toUpperCase()}
    </text>
  );
}

// Sketched text lines (mimics text content)
function TextLines({ x, y, w, lines }: { x: number; y: number; w: number; lines: number[] }) {
  return (
    <g>
      {lines.map((pct, i) => (
        <rect key={i} x={x} y={y + i * 9} width={Math.round(w * pct)} height={4} rx="2" fill="rgba(255,255,255,0.10)" />
      ))}
    </g>
  );
}

function PageWireframe() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      className="absolute inset-0 w-full h-auto pointer-events-none select-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── NAVBAR ─────────────────────────────── */}
      <Rect x={0} y={0} w={W} h={Y.navEnd} rx={0} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.0)" />
      <line x1={0} y1={Y.navEnd} x2={W} y2={Y.navEnd} stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
      {/* logo placeholder */}
      <Rect x={PX} y={8} w={72} h={9} rx={2} fill="rgba(255,255,255,0.15)" stroke="none" />
      {/* nav links */}
      <Rect x={W - PX - 180} y={9} w={36} h={7} rx={2} fill="rgba(255,255,255,0.07)" stroke="none" />
      <Rect x={W - PX - 136} y={9} w={36} h={7} rx={2} fill="rgba(255,255,255,0.07)" stroke="none" />
      {/* theme toggle */}
      <circle cx={W - PX - 76} cy={13} r={8} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.09)" strokeWidth="0.5" />
      {/* CTA button */}
      <Rect x={W - PX - 60} y={6} w={60} h={13} rx={6} fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.15)" />

      {/* ── HERO SECTION ───────────────────────── */}
      {/* Left column */}
      <Rect x={PX} y={Y.heroGridStart} w={LW} h={Y.heroImgEnd - Y.heroGridStart} rx={4} />
      {/* Mytilimer Pro logo inside hero */}
      <Rect x={PX + 12} y={Y.heroGridStart + 8} w={90} h={11} rx={2} fill="rgba(255,255,255,0.10)" stroke="none" />
      {/* Badge pill */}
      <Rect x={PX + 12} y={Y.heroGridStart + 24} w={110} h={8} rx={4} fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.10)" />
      {/* h1 — two lines */}
      <Rect x={PX + 12} y={Y.heroGridStart + 38} w={380} h={10} rx={2} fill="rgba(255,255,255,0.13)" stroke="none" />
      <Rect x={PX + 12} y={Y.heroGridStart + 52} w={330} h={10} rx={2} fill="rgba(255,255,255,0.13)" stroke="none" />
      {/* gradient subtitle */}
      <Rect x={PX + 12} y={Y.heroGridStart + 68} w={260} h={7} rx={2} fill="rgba(46,206,206,0.20)" stroke="none" />
      {/* description paragraph */}
      <TextLines x={PX + 12} y={Y.heroGridStart + 82} w={440} lines={[0.9, 0.85, 0.7]} />
      {/* 3 feature badge cards */}
      {[0, 1, 2].map((i) => {
        const bw = Math.round((LW - 24 - 8) / 3);
        const bx = PX + 12 + i * (bw + 4);
        return (
          <g key={i}>
            <Rect x={bx} y={Y.heroGridStart + 116} w={bw} h={45} rx={6} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" />
            <circle cx={bx + 14} cy={Y.heroGridStart + 130} r={6} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />
            <Rect x={bx + 26} y={Y.heroGridStart + 126} w={bw - 34} h={5} rx={1} fill="rgba(255,255,255,0.12)" stroke="none" />
            <Rect x={bx + 26} y={Y.heroGridStart + 135} w={bw - 42} h={4} rx={1} fill="rgba(255,255,255,0.07)" stroke="none" />
          </g>
        );
      })}

      {/* Right column — product photo (4:5 ratio, clipped) */}
      <clipPath id="heroClip">
        <rect x={RX} y={Y.heroGridStart} width={RW} height={Y.heroImgEnd - Y.heroGridStart} />
      </clipPath>
      <Rect
        x={RX} y={Y.heroGridStart}
        w={RW} h={Math.round(RW * 1.25)}
        rx={10}
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth={0.75}
      />
      <Label x={RX + RW / 2} y={Y.heroGridStart + (Y.heroImgEnd - Y.heroGridStart) / 2 + 4} text="photo produit" />
      {/* gradient overlay at bottom of photo */}
      <rect
        x={RX} y={Y.heroImgEnd - 28}
        width={RW} height={28}
        fill="rgba(10,10,60,0.55)"
        clipPath="url(#heroClip)"
      />
      {/* caption text */}
      <Rect x={RX + 8} y={Y.heroImgEnd - 18} w={RW - 16} h={5} rx={1} fill="rgba(255,255,255,0.18)" stroke="none" />

      {/* CTA strip */}
      <Rect
        x={PX} y={Y.heroCtaCard}
        w={CW} h={Y.heroCtaCardEnd - Y.heroCtaCard}
        rx={10}
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth={0.75}
      />
      {/* Left: small badge + h2 + desc */}
      <Rect x={PX + 20} y={Y.heroCtaCard + 10} w={80} h={6} rx={3} fill="rgba(255,255,255,0.08)" stroke="none" />
      <Rect x={PX + 20} y={Y.heroCtaCard + 21} w={200} h={9} rx={2} fill="rgba(255,255,255,0.13)" stroke="none" />
      <TextLines x={PX + 20} y={Y.heroCtaCard + 36} w={280} lines={[0.85, 0.7]} />
      {/* Right: 3 spec badges + 2 buttons */}
      {[0, 1, 2].map((i) => (
        <Rect key={i} x={PX + CW - 220 + i * 52} y={Y.heroCtaCard + 12} w={46} h={22} rx={4} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
      ))}
      <Rect x={PX + CW - 220} y={Y.heroCtaCard + 40} w={70} h={16} rx={8} fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.15)" />
      <Rect x={PX + CW - 144} y={Y.heroCtaCard + 40} w={60} h={16} rx={8} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" />

      {/* Section separator */}
      <Line x1={0} y1={Y.heroEnd} x2={W} y2={Y.heroEnd} dash />

      {/* ── DOSAGE SECTION ─────────────────────── */}
      {/* Section header */}
      <Rect x={PX} y={Y.dosageHeaderStart} w={90} h={8} rx={4} fill="rgba(46,206,206,0.12)" stroke="rgba(46,206,206,0.20)" />
      <Rect x={PX} y={Y.dosageHeaderStart + 13} w={320} h={12} rx={2} fill="rgba(255,255,255,0.12)" stroke="none" />
      <TextLines x={PX} y={Y.dosageHeaderStart + 31} w={420} lines={[0.85, 0.6]} />

      {/* DosageCalculator card */}
      <Rect
        x={PX} y={Y.dosageCalcStart}
        w={CW} h={Y.dosageCalcEnd - Y.dosageCalcStart}
        rx={12}
        fill="rgba(46,206,206,0.03)"
        stroke="rgba(46,206,206,0.20)"
        strokeWidth={0.75}
      />

      {/* Calculator header row: left content + right result box */}
      <Rect x={PX + 12} y={Y.dosageCalcStart + 12} w={72} h={7} rx={3} fill="rgba(46,206,206,0.15)" stroke="rgba(46,206,206,0.20)" />
      <Rect x={PX + 12} y={Y.dosageCalcStart + 24} w={250} h={11} rx={2} fill="rgba(255,255,255,0.13)" stroke="none" />
      <TextLines x={PX + 12} y={Y.dosageCalcStart + 41} w={300} lines={[0.8, 0.6]} />

      {/* Result box (right side) */}
      <Rect
        x={PX + CW - 208} y={Y.dosageCalcStart + 10}
        w={196} h={66}
        rx={8}
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth={0.75}
      />
      <Rect x={PX + CW - 196} y={Y.dosageCalcStart + 20} w={80} h={5} rx={1} fill="rgba(255,255,255,0.10)" stroke="none" />
      <Rect x={PX + CW - 196} y={Y.dosageCalcStart + 29} w={110} h={11} rx={2} fill="rgba(255,255,255,0.17)" stroke="none" />
      <Rect x={PX + CW - 196} y={Y.dosageCalcStart + 45} w={80} h={5} rx={1} fill="rgba(255,255,255,0.10)" stroke="none" />
      <Rect x={PX + CW - 196} y={Y.dosageCalcStart + 54} w={90} h={8} rx={2} fill="rgba(255,255,255,0.12)" stroke="none" />

      {/* "Intensité souhaitée" label */}
      <Rect x={PX + 12} y={Y.dosageCalcStart + 86} w={90} h={5} rx={1} fill="rgba(255,255,255,0.12)" stroke="none" />

      {/* 4 intensity buttons */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Rect
            x={CALC_INNER_X + i * (BTN_W + 4)} y={Y.dosageCalcStart + 96}
            w={BTN_W} h={42}
            rx={8}
            fill={i === 1 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)"}
            stroke={i === 1 ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}
          />
          {/* intensity label lines */}
          <Rect x={CALC_INNER_X + i * (BTN_W + 4) + 8} y={Y.dosageCalcStart + 104} w={BTN_W - 16} h={5} rx={1} fill="rgba(255,255,255,0.12)" stroke="none" />
          <Rect x={CALC_INNER_X + i * (BTN_W + 4) + 8} y={Y.dosageCalcStart + 113} w={BTN_W - 24} h={4} rx={1} fill="rgba(255,255,255,0.07)" stroke="none" />
          <Rect x={CALC_INNER_X + i * (BTN_W + 4) + 8} y={Y.dosageCalcStart + 121} w={32} h={4} rx={1} fill="rgba(46,206,206,0.18)" stroke="none" />
        </g>
      ))}

      {/* Weight input */}
      <Rect x={PX + 12} y={Y.dosageCalcStart + 148} w={90} h={5} rx={1} fill="rgba(255,255,255,0.10)" stroke="none" />
      <Rect x={PX + 12} y={Y.dosageCalcStart + 158} w={130} h={18} rx={6} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" />

      {/* Taux slider toggle */}
      <Rect x={PX + 12} y={Y.dosageCalcStart + 183} w={100} h={5} rx={2} fill="rgba(255,255,255,0.07)" stroke="none" />

      {/* Section separator */}
      <Line x1={0} y1={Y.dosageEnd} x2={W} y2={Y.dosageEnd} dash />

      {/* ── PRODUCT PROCESS ────────────────────── */}
      {/* Section header */}
      <Rect x={PX} y={Y.ppHeaderStart} w={100} h={8} rx={4} fill="rgba(240,178,122,0.12)" stroke="rgba(240,178,122,0.22)" />
      <Rect x={PX} y={Y.ppHeaderStart + 14} w={340} h={12} rx={2} fill="rgba(255,255,255,0.12)" stroke="none" />
      <Rect x={PX} y={Y.ppHeaderStart + 30} w={240} h={9} rx={2} fill="rgba(255,255,255,0.07)" stroke="none" />
      <TextLines x={PX} y={Y.ppHeaderStart + 44} w={430} lines={[0.8, 0.6]} />

      {/* 4 product cards */}
      {[0, 1, 2, 3].map((i) => {
        const cx = PX + i * (PP_CARD_W + PP_GAP);
        const cardH = Y.ppCardsEnd - Y.ppCardsStart;
        return (
          <g key={i}>
            {/* Full card */}
            <Rect x={cx} y={Y.ppCardsStart} w={PP_CARD_W - PP_GAP} h={cardH} rx={8} fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" />
            {/* Photo area */}
            <Rect x={cx} y={Y.ppCardsStart} w={PP_CARD_W - PP_GAP} h={PP_PHOTO_H} rx={8} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.0)" />
            {/* Gradient overlay on photo */}
            <rect x={cx} y={Y.ppCardsStart + PP_PHOTO_H - 20} width={PP_CARD_W - PP_GAP} height={20} fill="rgba(10,10,60,0.6)" />
            {/* Step badge */}
            <Rect x={cx + 5} y={Y.ppCardsStart + 5} w={18} h={8} rx={4} fill="rgba(10,10,60,0.7)" stroke="rgba(246,222,184,0.20)" />
            {/* Card text */}
            <Rect x={cx + 8} y={Y.ppCardsStart + PP_PHOTO_H + 8} w={PP_CARD_W - PP_GAP - 16} h={7} rx={2} fill="rgba(255,255,255,0.14)" stroke="none" />
            <TextLines x={cx + 8} y={Y.ppCardsStart + PP_PHOTO_H + 20} w={PP_CARD_W - PP_GAP - 16} lines={[0.85, 0.75, 0.6]} />
          </g>
        );
      })}

      {/* Bottom CTA strip */}
      <Rect
        x={PX} y={Y.ppCtaStart}
        w={CW} h={Y.ppCtaEnd - Y.ppCtaStart}
        rx={8}
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.09)"
        strokeWidth={0.75}
      />
      <Rect x={PX + 16} y={Y.ppCtaStart + 10} w={140} h={8} rx={2} fill="rgba(255,255,255,0.12)" stroke="none" />
      <TextLines x={PX + 16} y={Y.ppCtaStart + 24} w={220} lines={[0.7]} />
      <Rect x={PX + CW - 110} y={Y.ppCtaStart + 10} w={94} h={24} rx={12} fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.15)" />

      {/* ── SECTION LABELS (left edge) ───────────── */}
      {[
        { y: (Y.heroGridStart + Y.heroEnd) / 2, text: "HERO" },
        { y: (Y.dosageCalcStart + Y.dosageCalcEnd) / 2, text: "DOSAGE" },
        { y: (Y.ppCardsStart + Y.ppCardsEnd) / 2, text: "PROCESS" },
      ].map(({ y, text }) => (
        <g key={text}>
          <line x1={8} y1={y - 48} x2={8} y2={y + 48} stroke="rgba(255,255,255,0.10)" strokeWidth={0.75} strokeLinecap="round" />
          <text x={12} y={y + 3} fontSize="7" fontFamily="monospace" fill="rgba(160,210,255,0.38)" letterSpacing="2">
            {text}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function HeatmapCanvas({ points }: { points: Point[] }) {
  const blurRef = useRef<HTMLCanvasElement>(null);
  const sharpRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const radius = Math.min(W, H) * 0.05;

    function paint(canvas: HTMLCanvasElement | null) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      for (const { xPct, yPct } of points) {
        const x = xPct * W;
        const y = yPct * H;
        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, "rgba(255, 60, 0, 0.55)");
        grad.addColorStop(0.3, "rgba(255, 160, 0, 0.30)");
        grad.addColorStop(0.65, "rgba(30, 120, 255, 0.12)");
        grad.addColorStop(1, "rgba(0, 80, 200, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    paint(blurRef.current);
    paint(sharpRef.current);
  }, [points]);

  return (
    <div className="relative overflow-hidden rounded-xl" style={{ background: "#070f1e", aspectRatio: `${W} / ${H}` }}>
      <PageWireframe />
      <canvas
        ref={blurRef}
        width={W}
        height={H}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(18px) saturate(1.6)", mixBlendMode: "screen" }}
      />
      <canvas
        ref={sharpRef}
        width={W}
        height={H}
        className="absolute inset-0 w-full h-full opacity-45"
        style={{ filter: "blur(3px)", mixBlendMode: "screen" }}
      />
    </div>
  );
}
