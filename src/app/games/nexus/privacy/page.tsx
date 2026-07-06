import type { Metadata } from "next";
import styles from "./privacy.module.css";

export const metadata: Metadata = {
  title: "Política de privacidad de Nexus",
  description: "Política de privacidad de Nexus, el juego de Agalar Studio.",
  robots: { index: false, follow: false },
};

export default function NexusPrivacyPolicy() {
  return (
    <article className={`section ${styles.page}`}>
      <div className={`container ${styles.container}`}>
        <h1 className={styles.title}>Política de privacidad de Nexus</h1>
        <p className={styles.updated}>Última actualización: 4 de julio de 2026</p>

        <p>
          Esta política describe qué información trata la aplicación{" "}
          <strong>Nexus</strong> (en adelante, &quot;la app&quot;),
          desarrollada por Agalar Studio, y cómo se utiliza.
        </p>

        <h2>1. Datos que no recogemos</h2>
        <p>
          Nexus no requiere registro ni cuenta de usuario, no solicita
          nombre, email, ubicación ni ningún otro dato personal
          identificable, y no vende ni comparte información con terceros
          con fines publicitarios.
        </p>

        <h2>2. Datos almacenados solo en tu dispositivo</h2>
        <p>
          El progreso de la partida, los ajustes (idioma, sonido,
          vibración), los logros y las estadísticas de juego se guardan
          únicamente de forma local en el propio dispositivo
          (almacenamiento de la app). Esta información nunca sale del
          dispositivo salvo mediante la copia de seguridad estándar de
          Android (Auto Backup), gestionada por Google y ligada a tu
          cuenta de Google, no por nosotros.
        </p>

        <h2>3. Analítica de uso</h2>
        <p>
          La app incluye un módulo interno de analítica que registra
          eventos de interacción con el juego (por ejemplo, nivel
          completado, pista usada) con el único fin de entender qué
          partes del juego funcionan mejor y corregir errores. Estos
          eventos no incluyen datos personales identificables. Si en el
          futuro se integra un proveedor externo de analítica (como
          Firebase Analytics), esta política se actualizará para
          reflejarlo antes de que dicho envío de datos se active.
        </p>

        <h2>4. Permisos del dispositivo</h2>
        <ul>
          <li>
            <strong>Internet:</strong> reservado para funciones de red
            presentes o futuras (por ejemplo, sincronización de contenido
            o analítica); no se usa actualmente para enviar datos a
            servidores externos.
          </li>
          <li>
            <strong>Vibración:</strong> usado únicamente para el feedback
            háptico configurable en Ajustes.
          </li>
        </ul>

        <h2>5. Menores de edad</h2>
        <p>
          La app no está dirigida específicamente a niños y no recoge
          intencionadamente datos personales de menores de 13 años.
        </p>

        <h2>6. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política si cambian las funciones de la
          app (por ejemplo, al añadir compras dentro de la app, publicidad
          o analítica de terceros). La fecha de &quot;Última
          actualización&quot; en la parte superior reflejará cualquier
          cambio.
        </p>

        <h2>7. Contacto</h2>
        <p>
          Para cualquier duda sobre esta política, puedes escribir a{" "}
          <a href="mailto:hola@agalarstudio.com">hola@agalarstudio.com</a>.
        </p>
      </div>
    </article>
  );
}
