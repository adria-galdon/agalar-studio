import { Reveal } from "./Reveal";
import styles from "./StudioSection.module.css";

const principles = [
  {
    title: "Cada lanzamiento sube el listón",
    body: "No repetimos fórmula. Cada juego que hacemos exige más que el anterior, en diseño, en producción y en ambición.",
  },
  {
    title: "Autofinanciado, sin atajos",
    body: "No hay inversores marcando plazos. A veces las decisiones son más lentas, pero ninguna se toma en contra del juego.",
  },
  {
    title: "Android e iOS, sin excusas",
    body: "Diseñamos pensando en el móvil desde el primer día. La meta es que cada juego llegue bien acabado a las dos tiendas.",
  },
  {
    title: "Construimos para quedarnos",
    body: "Esto no es un proyecto de un solo juego. Es un estudio que empieza pequeño y que piensa seguir aquí dentro de diez años.",
  },
];

export function StudioSection() {
  return (
    <section id="estudio" className={`section ${styles.wrap}`}>
      <div className="container">
        <Reveal className={styles.layout}>
          <div className={styles.intro}>
            <p className="eyebrow">El estudio</p>
            <h2 className={styles.title}>
              Un estudio pequeño.
              <br />
              Indie de verdad.
            </h2>
            <p className={styles.text}>
              Agalar Studio es un estudio independiente y pequeño. Ahora mismo,
              en la práctica, soy yo: diseño, programo, escribo y respondo cada
              mensaje que llega. No lo digo para excusar nada, lo digo porque es
              la verdad y porque un juego pequeño hecho con criterio vale más
              que uno grande hecho a medias.
            </p>
            <p className={styles.text}>
              El objetivo es crecer sin perder eso. Cuando el estudio sea más
              grande, será para sostener la misma exigencia, no para diluirla.
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
