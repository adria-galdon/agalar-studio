import { NotifyForm } from "./NotifyForm";
import { Reveal } from "./Reveal";
import styles from "./NotifyBand.module.css";

export function NotifyBand() {
  return (
    <section id="notificame" className={`section ${styles.band}`}>
      <div className="container">
        <Reveal className={styles.inner}>
          <div className={styles.copy}>
            <p className="eyebrow">Sigue al estudio</p>
            <h2 className={styles.title}>
              Entérate de lo que
              <br />
              estamos construyendo.
            </h2>
            <p className={styles.text}>
              Déjanos tu correo y te avisamos cuando lancemos un juego o haya
              novedades importantes del estudio. Sin spam: solo cuando de verdad
              importe.
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
