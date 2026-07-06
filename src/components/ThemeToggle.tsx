"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import styles from "./ThemeToggle.module.css";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <svg
        className={`${styles.icon} ${styles.sun}`}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
        <path
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.55 1.55M18.25 18.25l1.55 1.55M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.55-1.55M18.25 5.75l1.55-1.55"
        />
      </svg>
      <svg
        className={`${styles.icon} ${styles.moon}`}
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a.6.6 0 0 0-.75-.75A9.8 9.8 0 1 0 21.25 15.35a.6.6 0 0 0-.75-.75Z"
        />
      </svg>
    </button>
  );
}
