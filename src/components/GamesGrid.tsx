import Link from "next/link";
import { games, statusLabel } from "@/data/games";
import { Reveal } from "./Reveal";
import styles from "./GamesGrid.module.css";

export function GamesGrid() {
  return (
    <section id="juegos" className="section">
      <div className="container">
        <Reveal className={styles.head}>
          <p className="eyebrow">Nuestros juegos</p>
          <h2 className={styles.title}>Lo que estamos construyendo.</h2>
          <p className={styles.intro}>
            Un catálogo que empieza pequeño y crece con cada lanzamiento. Estos
            son los juegos en los que trabaja el estudio ahora mismo.
          </p>
        </Reveal>

        <Reveal className={styles.grid}>
          {games.map((game) => (
            <Link
              key={game.slug}
              href={`/games/${game.slug}`}
              className={styles.card}
              style={{ ["--card-accent" as string]: game.accent }}
            >
              <div className={styles.cardTop}>
                <span className={styles.status}>
                  <span className={styles.dot} />
                  {statusLabel[game.status]}
                </span>
                <span className={styles.year}>{game.year}</span>
              </div>

              <h3 className={styles.cardTitle}>{game.title}</h3>
              <p className={styles.platforms}>{game.platforms.join(" · ")}</p>
              <p className={styles.tagline}>{game.tagline}</p>

              <div className={styles.tags}>
                {game.genres.map((g) => (
                  <span key={g} className={styles.tag}>
                    {g}
                  </span>
                ))}
              </div>

              <span className={styles.more}>
                Ver el juego
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}

          {/* Marcador de "más por venir" — refuerza que el estudio escala */}
          <div className={`${styles.card} ${styles.soon}`}>
            <div className={styles.soonInner}>
              <span className="eyebrow">Próximamente</span>
              <p>
                Ya hay más ideas sobre la mesa. Este catálogo va a crecer, un
                juego cuidado cada vez.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
