"use client";

// Mockup de móvil plano (CSS puro, sin 3D) que hace crossfade entre las
// capturas reales del juego. Bisel, notch y sombra dura a juego con el
// resto del sistema de diseño "sticker".

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ScreenshotPhone.module.css";

const HOLD_MS = 2800;

export function ScreenshotPhone({ shots, accent }: { shots: string[]; accent: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shots.length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % shots.length), HOLD_MS);
    return () => clearInterval(id);
  }, [shots.length]);

  return (
    <div className={styles.frame} style={{ ["--phone-accent" as string]: accent }}>
      <div className={styles.notch} aria-hidden="true" />
      <div className={styles.screen}>
        <AnimatePresence mode="sync">
          {shots.length > 0 && (
            <motion.img
              key={shots[index]}
              src={shots[index]}
              alt=""
              className={styles.shot}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </div>
      <div className={styles.sideButton} aria-hidden="true" />
    </div>
  );
}
