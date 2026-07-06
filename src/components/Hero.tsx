import { Phone3DClient } from "./Phone3DClient";
import styles from "./Hero.module.css";

const stats = [
  { value: "01", label: "Título en desarrollo activo" },
  { value: "100%", label: "Autofinanciado, sin atajos" },
  { value: "1", label: "Persona detrás de todo esto" },
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`eyebrow ${styles.eyebrow}`}>Agalar Studio</p>
          <h1 className={styles.title}>
            Hacemos un juego,
            <br />
            <span className={styles.accent}>no una promesa.</span>
          </h1>
          <p className={styles.lead}>
            Nexus es un puzzle narrativo de ciencia ficción, y ya se puede
            jugar de principio a fin. Nada de conceptos bonitos sin nada
            detrás, esto es un estudio construyendo su primer título en
            serio.
          </p>
          <div className={styles.actions}>
            <a href="#demo" className="btn btn--solid">
              Juega el demo
            </a>
            <a href="/games/nexus" className="btn">
              Descubre Nexus
            </a>
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

        <div className={styles.visual}>
          <Phone3DClient accent="#4fd6c0" />
        </div>
      </div>
    </section>
  );
}
