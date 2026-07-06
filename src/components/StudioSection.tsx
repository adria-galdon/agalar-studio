import { Reveal } from "./Reveal";
import styles from "./StudioSection.module.css";

const principles = [
  {
    title: "Cada lanzamiento sube el listón",
    body: "No repetimos fórmula. Cada juego que hacemos exige más de nosotros que el anterior, en diseño, en producción y en ambición.",
  },
  {
    title: "Autofinanciado, sin atajos",
    body: "No hay inversores marcando plazos. Eso significa decisiones más lentas a veces, pero ninguna decisión que no sea la correcta para el juego.",
  },
  {
    title: "Construimos para quedarnos",
    body: "Esto no es un proyecto de un juego. Es un estudio que está empezando y que piensa seguir aquí dentro de diez años.",
  },
];

export function StudioSection() {
  return (
    <section id="estudio" className={`section ${styles.wrap}`}>
      <div className="container">
        <Reveal className={styles.layout}>
          <div className={styles.intro}>
            <p className="eyebrow">Nuestra visión</p>
            <h2 className={styles.title}>
              Pequeños ahora.
              <br />
              No por mucho tiempo.
            </h2>
            <p className={styles.text}>
              Ahora mismo, Agalar Studio soy yo. Diseño, programo, escribo la
              historia y respondo cada mensaje que llega. No lo digo para
              excusar nada, lo digo porque es la verdad y porque creo que un
              proyecto pequeño hecho con criterio vale más que uno grande
              hecho a medias.
            </p>
            <p className={styles.text}>
              Nexus es la prueba de ese criterio. Cuando el estudio crezca,
              crecerá para sostener esa misma exigencia, no para diluirla.
            </p>
          </div>

          <ul className={styles.principles}>
            {principles.map((p, i) => (
              <li key={p.title} className={styles.principle}>
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className={styles.pTitle}>{p.title}</h3>
                  <p className={styles.pBody}>{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
