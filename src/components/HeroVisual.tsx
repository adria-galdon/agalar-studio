"use client";

// Visual del Hero: una red de nodos que se conecta sola, en bucle.
// Hace de eco visual a la mecánica de Nexus (conectar nodos) sin
// depender de WebGL/three.js — solo SVG + framer-motion, ligero y fiable.

import { useMemo } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import styles from "./HeroVisual.module.css";

interface Node {
  x: number;
  y: number;
}

const NODES: Node[] = [
  { x: 20, y: 18 },
  { x: 62, y: 10 },
  { x: 85, y: 34 },
  { x: 50, y: 46 },
  { x: 14, y: 55 },
  { x: 40, y: 78 },
  { x: 76, y: 70 },
  { x: 90, y: 92 },
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [1, 3],
  [3, 0],
  [3, 4],
  [4, 5],
  [5, 6],
  [3, 6],
  [2, 6],
  [6, 7],
];

const COLORS = ["var(--accent)", "var(--accent-3)", "var(--accent-4)"];

interface HeroVisualProps {
  /** 0→1: cuánto ha avanzado el scroll del Hero. Dispersa el grafo desde el centro. */
  spread?: MotionValue<number>;
}

export function HeroVisual({ spread }: HeroVisualProps) {
  const fallbackSpread = useMotionValue(0);
  const s = spread ?? fallbackSpread;
  const scale = useTransform(s, (v) => 1 + v * 0.35);

  const edgeMeta = useMemo(
    () =>
      EDGES.map(([a, b], i) => ({
        a: NODES[a],
        b: NODES[b],
        color: COLORS[i % COLORS.length],
        delay: i * 0.18,
      })),
    []
  );

  return (
    <div className={styles.wrap}>
      <svg
        className={styles.svg}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <motion.g style={{ scale, transformOrigin: "52px 50px" }}>
          {edgeMeta.map((e, i) => (
            <motion.line
              key={i}
              x1={e.a.x}
              y1={e.a.y}
              x2={e.b.x}
              y2={e.b.y}
              stroke={e.color}
              strokeWidth={0.9}
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{
                duration: 1.1,
                delay: e.delay,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 2.4,
                ease: "easeInOut",
              }}
            />
          ))}

          {NODES.map((n, i) => (
            <motion.g key={i}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                fill={COLORS[i % COLORS.length]}
                opacity={0.18}
                initial={{ r: 3.4 }}
                animate={{ r: [3.4, 5.2, 3.4] }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
              <circle cx={n.x} cy={n.y} r={1.6} fill={COLORS[i % COLORS.length]} />
              <circle cx={n.x} cy={n.y} r={0.6} fill="#fff" />
            </motion.g>
          ))}
        </motion.g>
      </svg>
    </div>
  );
}
