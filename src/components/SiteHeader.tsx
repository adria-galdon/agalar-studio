"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AgalarLogo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { games } from "@/data/games";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [gamesOpen, setGamesOpen] = useState(false);
  const gamesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!gamesOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (gamesRef.current && !gamesRef.current.contains(e.target as Node)) {
        setGamesOpen(false);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, [gamesOpen]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" aria-label="Agalar Studio, inicio">
          <AgalarLogo />
        </Link>
        <div className={styles.right}>
          <nav className={styles.nav} aria-label="Principal">
            <div className={styles.dropdown} ref={gamesRef}>
              <button
                type="button"
                className={styles.dropdownTrigger}
                aria-expanded={gamesOpen}
                onClick={() => setGamesOpen((v) => !v)}
              >
                Juegos
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {gamesOpen && (
                <div className={styles.dropdownMenu}>
                  {games.map((game) => (
                    <Link
                      key={game.slug}
                      href={`/games/${game.slug}`}
                      onClick={() => setGamesOpen(false)}
                    >
                      {game.title}
                    </Link>
                  ))}
                  <Link
                    href="/juegos"
                    className={styles.dropdownAll}
                    onClick={() => setGamesOpen(false)}
                  >
                    Ver todos
                  </Link>
                </div>
              )}
            </div>
            <Link href="/#estudio">Estudio</Link>
            <Link href="/#roadmap">Roadmap</Link>
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
