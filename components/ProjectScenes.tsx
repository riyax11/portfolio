"use client";

import { useEffect, useState, type ComponentType } from "react";

function VeriJobScene() {
  return (
    <div className="scene">
      <p className="text-mute">job_posting.txt</p>
      <p className="mt-2 text-ink">
        Work from home and earn <span className="sc-flag">₹50,000/week</span>. No experience
        required.
      </p>
      <p className="text-ink">
        Send a <span className="sc-flag d2">₹500 registration fee</span> to get started.
      </p>
      <div className="mt-4 flex items-end gap-4">
        <svg viewBox="0 0 120 70" className="w-28" aria-hidden="true">
          <path
            d="M10 62 A50 50 0 0 1 110 62"
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            className="sc-gauge"
            d="M10 62 A50 50 0 0 1 110 62"
            fill="none"
            stroke="var(--color-danger)"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
        <span className="sc-badge rounded border border-danger px-2 py-1 text-danger">
          FRAUD DETECTED
        </span>
      </div>
    </div>
  );
}

function FinSightScene() {
  const bars = [92, 74, 58, 44, 30];
  return (
    <div className="scene">
      <p className="text-teal">&gt; Top 5 accounts by balance</p>
      <p className="mt-1 text-mute">
        <span className="sc-type sc-t1">SELECT account_id, MAX(balance)</span>
      </p>
      <p className="text-mute">
        <span className="sc-type sc-t2">FROM core_transaction GROUP BY 1 LIMIT 5;</span>
      </p>
      <div className="mt-3 flex h-16 items-end gap-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className="sc-bar flex-1 rounded-t bg-teal/70"
            style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function ChainGuardScene() {
  const xs = [14, 66, 118, 170];
  return (
    <div className="scene">
      <p className="text-mute">risk_engine → AMLRegistry.sol</p>
      <svg viewBox="0 0 230 80" className="mt-2 w-full" aria-hidden="true">
        {xs.slice(0, -1).map((x, i) => (
          <line
            key={x}
            x1={x + 34}
            y1="38"
            x2={xs[i + 1]}
            y2="38"
            stroke="var(--color-line)"
            strokeWidth="2"
          />
        ))}
        {xs.map((x, i) => (
          <g key={x}>
            <rect
              className="sc-risk"
              style={{ animationDelay: `${i * 0.9}s` }}
              x={x}
              y="20"
              width="34"
              height="36"
              rx="6"
              fill="none"
              strokeWidth="2"
            />
            <text x={x + 17} y="42" textAnchor="middle" fontSize="9" fill="var(--color-mute)">
              {`#${i + 1}`}
            </text>
          </g>
        ))}
        <circle r="3.5" fill="var(--color-teal)">
          <animateMotion dur="3.2s" repeatCount="indefinite" path="M31 38 H187" />
        </circle>
      </svg>
      <p className="text-mute">
        status: <span className="sc-blink text-danger">FLAGGED</span>
      </p>
    </div>
  );
}

function DataForgeScene() {
  const steps = ["profile", "plan", "approve", "publish"];
  return (
    <div className="scene">
      <p className="text-mute">pipeline / customer_export.csv</p>
      <div className="mt-4 flex items-center gap-1.5">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-1.5">
            <div
              className="sc-node w-full rounded-md border px-1 py-2 text-center"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              {s}
            </div>
            {i < steps.length - 1 ? <span className="text-line">─</span> : null}
          </div>
        ))}
      </div>
      <div className="relative mt-4 h-5">
        <span className="sc-wait absolute left-0 text-amber">⏸ awaiting approval</span>
        <span className="sc-ok absolute left-0 text-teal">✓ approved by reviewer</span>
      </div>
    </div>
  );
}

const QR = ["1110111", "1010101", "1110111", "0001000", "1101101", "0110010", "1011101"];

function InventoryScene() {
  return (
    <div className="scene">
      <div className="flex gap-5">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md border border-line p-1.5">
          <div className="grid h-full w-full grid-cols-7 gap-px">
            {QR.flatMap((row, r) =>
              row.split("").map((c, k) => (
                <i key={`${r}-${k}`} className={c === "1" ? "bg-ink" : "bg-transparent"} />
              ))
            )}
          </div>
          <span className="sc-scan" />
        </div>
        <div>
          <p className="text-mute">scan product</p>
          <p className="text-ink">SKU-0042</p>
          <p className="mt-2 text-mute">rack</p>
          <p className="text-ink">A-03</p>
          <p className="sc-badge mt-3 text-teal">✓ location verified</p>
        </div>
      </div>
    </div>
  );
}

function ChairScene() {
  const [t, setT] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setT((v) => (v + 1) % 14), 1000);
    return () => clearInterval(id);
  }, []);

  const chairs = [
    { name: "chair 1", label: "EMPTY", cls: "border-teal text-teal" },
    { name: "chair 2", label: `OCCUPIED ${t}s`, cls: "sc-pulse border-danger text-danger" },
    { name: "chair 3", label: "EMPTY", cls: "border-teal text-teal" },
    { name: "chair 4", label: "SITTING DOWN", cls: "border-amber text-amber" },
  ];

  return (
    <div className="scene">
      <p className="text-ink">
        Occupied chairs: 1/4 <span className="ml-3 text-mute">t = {t + 8}s</span>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {chairs.map((c) => (
          <div key={c.name} className={`rounded-md border-2 px-2 py-2 ${c.cls}`}>
            <p className="text-mute">{c.name}</p>
            <p className="font-semibold">{c.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const SCENES: Record<string, ComponentType> = {
  "verijob-ai": VeriJobScene,
  "finsight-ai": FinSightScene,
  chainguard: ChainGuardScene,
  "dataforge-ai": DataForgeScene,
  inventoryqr: InventoryScene,
  "chair-occupancy": ChairScene,
};
