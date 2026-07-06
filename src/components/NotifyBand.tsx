import { NotifyForm } from "./NotifyForm";
import { Reveal } from "./Reveal";
import styles from "./NotifyBand.module.css";

export function NotifyBand() {
  return (
    <section id="notificame" className={`section ${styles.band}`}>
      <div className="container">
        <Reveal className={styles.inner}>
          <div className={styles.copy}>
            <p className="eyebrow">No te lo pierdas</p>
            <h2 className={styles.title}>
              Sé el primero en enterarte
              <br />
              de lo que lanzamos.
            </h2>
            <p className={styles.text}>
              Déjame tu correo y te aviso cuando haya novedades de verdad:
              lanzamientos, betas abiertas, hitos del estudio. Nada más.
            </p>
          </div>
          <div className={styles.formWrap}>
            <NotifyForm source="band" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
