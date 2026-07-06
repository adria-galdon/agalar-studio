"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroVisual } from "./HeroVisual";
import styles from "./Hero.module.css";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const spread = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.glow2} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`}>Agalar Studio</p>
          <h1 className={styles.title}>
            Estudio indie de videojuegos.
          </h1>
          <p className={styles.lead}>
            Un desarrollador, diseñando y programando cada juego de principio a fin.
          </p>
          <div className={styles.actions}>
            <a href="#demo" className="btn btn--solid">
              Juega ahora
            </a>
            <a href="/juegos" className="btn">
              Ver juegos
            </a>
          </div>
        </div>

        <motion.div className={styles.visual} style={{ y, rotate, opacity, scale }}>
          <HeroVisual spread={spread} />
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollCue}
        aria-hidden="true"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
          <rect x="1" y="1" width="16" height="26" rx="8" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="9" cy="8" r="2.2" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
