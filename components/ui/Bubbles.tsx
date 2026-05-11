const BUBBLES = [
  { left: "7%",  size: 5,  delay: 0,   dur: 8    },
  { left: "14%", size: 9,  delay: 1.8, dur: 11   },
  { left: "22%", size: 4,  delay: 3.2, dur: 9    },
  { left: "31%", size: 7,  delay: 0.5, dur: 12   },
  { left: "40%", size: 13, delay: 2.4, dur: 10   },
  { left: "49%", size: 5,  delay: 4.1, dur: 8.5  },
  { left: "58%", size: 8,  delay: 1.3, dur: 13   },
  { left: "67%", size: 4,  delay: 3.7, dur: 9.5  },
  { left: "75%", size: 11, delay: 0.9, dur: 11.5 },
  { left: "84%", size: 6,  delay: 2.6, dur: 10.5 },
  { left: "92%", size: 3,  delay: 1.1, dur: 7.5  },
];

export function Bubbles({ prominent = false }: { prominent?: boolean }) {
  const scale = prominent ? 2.4 : 1;
  const borderOpacity = prominent ? 0.7 : 0.45;
  const bgOpacity = prominent ? 0.14 : 0.07;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full"
          style={{
            left: b.left,
            width: `${b.size * scale}px`,
            height: `${b.size * scale}px`,
            border: `${prominent ? 2 : 1.5}px solid rgba(46,206,206,${borderOpacity})`,
            background: `rgba(46,206,206,${bgOpacity})`,
            animation: `bubble-rise ${b.dur}s ${b.delay}s infinite ease-in backwards`,
          }}
        />
      ))}
    </div>
  );
}
