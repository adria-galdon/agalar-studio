import Link from "next/link";
import styles from "./Hero.module.css";

const stats = [
  { value: "iOS + Android", label: "Nuestras plataformas" },
  { value: "Indie", label: "Independiente y autofinanciado" },
  { value: "01", label: "Juego en camino, más por venir" },
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p className={`eyebrow ${styles.eyebrow}`}>
          Estudio indie de videojuegos, Android e iOS
        </p>

        <h1 className={styles.title}>
          Hacemos juegos para el móvil
          <br />
          <span className={styles.accent}>que de verdad queremos jugar.</span>
        </h1>

        <p className={styles.lead}>
          Agalar Studio es un estudio independiente y pequeño. Diseñamos,
          programamos y publicamos nuestros propios juegos para Android e iOS,
          uno a uno y sin prisa. Esto no va de un solo título: va de construir
          un estudio que dure.
        </p>

        <div className={styles.actions}>
          <Link href="#juegos" className="btn btn--solid">
            Ver nuestros juegos
          </Link>
          <Link href="#roadmap" className="btn">
            Nuestro roadmap
          </Link>
        </div>

        <dl className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statValue}>{s.value}</dt>
              <dd className={styles.statLabel}>{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
