import { Reveal } from "./Reveal";
import styles from "./Roadmap.module.css";

const steps = [
  {
    tag: "Ahora",
    title: "Terminando nuestro primer juego",
    body: "El primer título del estudio ya es jugable de principio a fin. Afinamos niveles, ritmo y los últimos detalles antes de publicarlo.",
    active: true,
  },
  {
    tag: "Siguiente",
    title: "Lanzamiento en Android e iOS",
    body: "Publicación en Google Play y App Store. Nuestro objetivo es que cada juego del estudio llegue a las dos plataformas.",
    active: false,
  },
  {
    tag: "Después",
    title: "El segundo juego",
    body: "Con el primero fuera, arranca el siguiente proyecto. Cada juego nuevo sube el listón del anterior en diseño y ambición.",
    active: false,
  },
  {
    tag: "A largo plazo",
    title: "Un estudio que dure",
    body: "Crecer poco a poco, sin perder el criterio: un catálogo de juegos hechos con cuidado y un equipo que pueda sostenerlo.",
    active: false,
  },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Roadmap del estudio</p>
          <h2 className={styles.title}>Hacia dónde vamos.</h2>
        </Reveal>

        <ol className={styles.list}>
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`${styles.step} ${s.active ? styles.active : ""}`}
            >
              <div className={styles.marker}>
                <span className={styles.dot} />
                {i < steps.length - 1 && <span className={styles.line} />}
              </div>
              <div className={styles.content}>
                <span className={styles.tag}>{s.tag}</span>
                <h3 className={styles.stepTitle}>{s.title}</h3>
                <p className={styles.stepBody}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
