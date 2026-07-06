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
              Nexus está a punto.
              <br />
              Que no te pille de nuevas.
            </h2>
            <p className={styles.text}>
              Déjame tu correo y te aviso el día que se pueda descargar. Nada más:
              un único mensaje cuando de verdad importe.
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
