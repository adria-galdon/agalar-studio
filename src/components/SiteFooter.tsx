import { AgalarMark } from "./Logo";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="contacto" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <AgalarMark size={34} />
          <p className={styles.tagline}>
            Un estudio independiente construyendo su primer juego, en serio.
          </p>
        </div>

        <div className={styles.col}>
          <span className="eyebrow">Contacto</span>
          <a href="mailto:hola@agalarstudio.com">hola@agalarstudio.com</a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>© {year} Agalar Studio</span>
        <span>Hecho con cuidado</span>
      </div>
    </footer>
  );
}
