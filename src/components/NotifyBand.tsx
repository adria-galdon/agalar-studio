import { NotifyForm } from "./NotifyForm";
import { Reveal } from "./Reveal";
import styles from "./NotifyBand.module.css";

export function NotifyBand() {
  return (
    <section id="notificame" className={`section ${styles.band}`}>
      <div className="container">
        <Reveal className={styles.inner}>
          <div className={styles.copy}>
            <p className="eyebrow">Novedades</p>
            <h2 className={styles.title}>
              Avísame cuando haya
              <br />
              algo nuevo.
            </h2>
            <p className={styles.text}>
              Deja tu correo para recibir avisos de lanzamientos y betas abiertas.
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
