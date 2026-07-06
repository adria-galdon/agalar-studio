"use client";

// Sección "pinned": en vez de desplazarse como un bloque más, se queda
// fija en pantalla mientras el scroll recorre una pista más larga, y los
// tres principios se van sustituyendo unos a otros en el mismo sitio
// (crossfade), como en las páginas de producto tipo Apple/Stripe.
//
// El principio activo se deriva del progreso de scroll como un índice
// discreto (no una interpolación continua por tramos): es más robusto y
// evita los saltos raros de una interpolación multi-punto con scroll
// instantáneo (anclas, teclado, "Volver arriba").

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./StudioSection.module.css";

const principles = [
  {
    title: "Cada lanzamiento sube el listón",
    body: "Nunca repetimos fórmula.",
  },
  {
    title: "Autofinanciado, sin atajos",
    body: "Ningún inversor marca los plazos.",
  },
  {
    title: "Construimos para quedarnos",
    body: "Pensado para durar diez años.",
  },
];

export function StudioSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(principles.length - 1, Math.floor(latest * principles.length));
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const current = principles[active];

  return (
    <section id="estudio" ref={ref} className={styles.wrap}>
      <div className={styles.sticky}>
        <div className={`container ${styles.inner}`}>
          <p className="eyebrow">Nuestra visión</p>
          <h2 className={styles.title}>
            Pequeños ahora.
            <br />
            No por mucho tiempo.
          </h2>
          <p className={styles.text}>
            Ahora mismo, Agalar Studio soy yo. Un proyecto pequeño hecho con
            criterio vale más que uno grande hecho a medias.
          </p>

          <div className={styles.stageWrap}>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                className={styles.stage}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.96 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <span className={styles.num}>{String(active + 1).padStart(2, "0")}</span>
                <h3 className={styles.stageTitle}>{current.title}</h3>
                <p className={styles.stageBody}>{current.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.progress}>
            {principles.map((p, i) => (
              <span key={p.title} className={`${styles.dot} ${i === active ? styles.dotActive : ""}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
