"use client";

// Frase de impacto en vez de un párrafo largo: cada palabra se revela
// (opacidad/blur) a medida que la sección atraviesa el centro del viewport
// durante el scroll. Sustituye bloques de texto por algo más visual.

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./Manifesto.module.css";

const WORDS = "Un estudio. Un juego a la vez. Sin humo, sin atajos.".split(" ");

function Word({ word, index, total, progress }: { word: string; index: number; total: number; progress: import("framer-motion").MotionValue<number> }) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span className={styles.word} style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],
  });

  return (
    <section ref={ref} className={`section ${styles.wrap}`}>
      <div className="container">
        <p className={styles.text}>
          {WORDS.map((w, i) => (
            <Word key={`${w}-${i}`} word={w} index={i} total={WORDS.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>
    </section>
  );
}
