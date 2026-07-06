import { Reveal } from "./Reveal";
import styles from "./Roadmap.module.css";

const steps = [
  {
    tag: "Ahora",
    title: "Beta jugable de principio a fin",
    body: "La historia completa de Nexus ya se puede jugar. Estamos afinando niveles, ritmo de dificultad y los detalles finales.",
    active: true,
  },
  {
    tag: "Próximo trimestre",
    title: "Pulido y balance",
    body: "Un grupo reducido de jugadores prueba la beta a fondo. Ajustamos dificultad, rendimiento y accesibilidad antes del lanzamiento público.",
    active: false,
  },
  {
    tag: "Más adelante",
    title: "Lanzamiento en Android",
    body: "Nexus llega a Google Play. El primer título de Agalar Studio, disponible para todo el mundo.",
    active: false,
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
