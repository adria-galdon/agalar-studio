"use client";

import { motion, useScroll } from "framer-motion";
import styles from "./ScrollProgress.module.css";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
