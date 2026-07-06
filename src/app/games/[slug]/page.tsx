import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGame, getAllGameSlugs, statusLabel } from "@/data/games";
import { Phone3DClient } from "@/components/Phone3DClient";
import styles from "./game.module.css";

// Genera una página estática por cada juego en build time.
export function generateStaticParams() {
  return getAllGameSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) return { title: "Juego no encontrado" };
  return {
    title: game.title,
    description: game.tagline,
    openGraph: {
      title: `${game.title}, Agalar Studio`,
      description: game.tagline,
    },
  };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const game = getGame(slug);
  if (!game) notFound();

  return (
    <article
      className={styles.page}
      style={{ ["--game-accent" as string]: game.accent }}
    >
      <div className="container">
        <Link href="/#juegos" className={styles.back}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 8H3M7 4L3 8l4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Todos los juegos
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.status}>
              <span className={styles.dot} />
              {statusLabel[game.status]}
            </span>
            <span className={styles.sep}>·</span>
            <span>{game.year}</span>
            <span className={styles.sep}>·</span>
            <span>{game.platforms.join(", ")}</span>
          </div>
          <h1 className={styles.title}>{game.title}</h1>
          <p className={styles.tagline}>{game.tagline}</p>
          <div className={styles.tags}>
            {game.genres.map((g) => (
              <span key={g} className={styles.tag}>
                {g}
              </span>
            ))}
          </div>
        </header>

        {/* Mientras no haya capturas reales, mostramos la mecánica del juego */}
        <div className={styles.visual}>
          <div className={styles.visualGlow} aria-hidden="true" />
          <Phone3DClient accent={game.accent} />
        </div>

        <div className={styles.body}>
          {game.description.map((para, i) => (
            <p key={i} className={styles.para}>
              {para}
            </p>
          ))}
        </div>

        {game.links && game.links.length > 0 && (
          <div className={styles.links}>
            {game.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="btn btn--solid"
                target="_blank"
                rel="noopener"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
