"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AgalarLogo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" aria-label="Agalar Studio, inicio">
          <AgalarLogo />
        </Link>
        <div className={styles.right}>
          <nav className={styles.nav} aria-label="Principal">
            <Link href="/#juegos">Juegos</Link>
            <Link href="/#demo">Jugar</Link>
            <Link href="/#estudio">Estudio</Link>
            <Link href="/#contacto">Contacto</Link>
          </nav>
          <ThemeToggle />
          <Link href="/#notificame" className={`btn btn--solid ${styles.cta}`}>
            Notifícame
          </Link>
        </div>
      </div>
    </header>
  );
}
