import { Reveal } from "./Reveal";
import styles from "./Roadmap.module.css";

const steps = [
  {
    tag: "Ahora",
    title: "Primer juego en beta jugable",
    body: "Nexus, nuestro primer título, ya se puede jugar de principio a fin. Puedes conocerlo en el catálogo de juegos.",
    active: true,
    pending: false,
  },
  {
    tag: "Próximo hito",
    title: "Pendiente de definir",
    body: "Todavía no está cerrado. Se anunciará aquí en cuanto tome forma.",
    active: false,
    pending: true,
  },
  {
    tag: "Más adelante",
    title: "Pendiente de definir",
    body: "El estudio sigue creciendo. Este hueco se irá rellenando con lo que venga después.",
    active: false,
    pending: true,
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Hoja de ruta</p>
          <h2 className={styles.title}>Esto es a lo que nos comprometemos.</h2>
        </Reveal>

        <ol className={styles.list}>
          {steps.map((s, i) => (
            <li
              key={`${s.title}-${i}`}
              className={`${styles.step} ${s.active ? styles.active : ""} ${s.pending ? styles.pending : ""}`}
            >
              <div className={styles.marker}>
                <span className={styles.dot} />
                {i < steps.length - 1 && <span className={styles.line} />}
              </div>
              <div className={styles.content}>
                <span className={styles.tag}>{s.tag}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>
                  {s.body}
                  {i === 0 && (
                    <>
                      {" "}
                      <a href="/juegos" className={styles.link}>
                        Ver juegos →
                      </a>
                    </>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
